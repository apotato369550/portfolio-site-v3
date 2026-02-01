# Incomplete Features & Known Blockers

Detailed tracking of incomplete features, known issues, and recommended improvements for Portfolio Site V3.

---

## Critical Blockers (Must Fix Before Full Launch)

### 1. Image Serving Route Missing
**Severity**: 🔴 HIGH (Visual feature broken)

**Issue**: API route `/api/projects/images/[filename]` not implemented

**Current Code** (ProjectsSection.tsx, line ~108):
```typescript
src={`/api/projects/images/${project.image.split('/').pop()}`}
```

**Impact**: Project thumbnail images fail to load (404 errors)

**Root Cause**: Assumed image serving through API route that was never implemented

**Solution Options**:
1. **Quick Fix** (Recommended):
   - Store full absolute URLs in Supabase `github_projects.image` field
   - Change to: `src={project.image_url}`
   - Update fetcher to extract full image paths from GitHub API or store as `/assets/projects/filename.png`

2. **Proper Fix**:
   - Implement `/api/projects/images/[filename]` route to serve from `public/assets/projects/`
   - Use Next.js `createReadStream()` to serve files
   - Add cache headers for performance

3. **Modern Approach**:
   - Use Next.js `Image` component with local image imports
   - Or upload images to Supabase Storage and serve from there

**Effort**: 1-2 hours for quick fix; 3-4 hours for proper fix

**Recommendation**: Go with Quick Fix option 1 (update database queries)

---

### 2. External API Credentials Not Configured
**Severity**: 🔴 HIGH (Data doesn't load without this)

**Issue**: Environment variables missing for GitHub, LeetCode, and Email services

**Missing Variables**:
- `GITHUB_TOKEN` - GitHub Personal Access Token (required scope: `repo`)
- `GITHUB_USERNAME` - GitHub username to fetch repos from
- `LEETCODE_USERNAME` - LeetCode username
- `LEETCODE_SESSION_COOKIE` - LeetCode session (optional but recommended)
- `EMAIL_USER` - Gmail address for sending emails
- `EMAIL_PASS` - Gmail app password (NOT regular password)
- `CRON_SECRET` - Secret for authenticating cron job requests
- `REFRESH_TOKEN` - Token for manual refresh endpoints

**Impact**:
- GitHub projects, commits, calendar all empty
- LeetCode submissions grid empty
- Contact form validation works but emails don't send
- Cron job cannot authenticate

**Solution**:
1. Add environment variables to `.env.local` (development)
2. Add environment variables to Vercel dashboard (production)

**Setup Time**: 30 minutes (getting tokens)

**References**:
- GitHub token: https://github.com/settings/tokens
- LeetCode cookie: Browser DevTools → Application → Cookies → `LEETCODE_SESSION`
- Gmail app password: https://myaccount.google.com/apppasswords

---

### 3. Vercel Cron Job Not Configured
**Severity**: 🟠 MEDIUM (Data becomes stale; manual refresh available as workaround)

**Issue**: Scheduled data refresh not set up in Vercel

**Current State**:
- Route exists: `/api/cron/refresh-data`
- Requires header: `Authorization: Bearer ${CRON_SECRET}`
- Intended: Automatic refresh every 6 hours
- Actual: Not running without Vercel Cron setup

**Impact**:
- Data doesn't automatically refresh
- Manual workaround: Call `/api/refresh-all?token=${REFRESH_TOKEN}` manually
- DataCamp, GitHub, LeetCode data becomes stale

**Solution**:
1. Create `vercel.json` in project root:
   ```json
   {
     "crons": [
       {
         "path": "/api/cron/refresh-data",
         "schedule": "0 */6 * * *"
       }
     ]
   }
   ```

2. Add `CRON_SECRET` environment variable in Vercel dashboard

3. Deploy to Vercel

4. Verify cron runs by checking `/api/cron/refresh-data` logs in Vercel dashboard

**Effort**: 15 minutes

**Workaround**: Use manual refresh endpoints (requires calling from somewhere)
- Frontend admin dashboard (incomplete)
- External cron service (IFTTT, Zapier)
- Manual curl commands

---

## High-Priority Issues (Should Fix Soon)

### 4. Rate Limiting Not Production-Ready
**Severity**: 🟠 MEDIUM (Works but inadequate for production)

**Issue**: Rate limiting uses in-memory store that resets on server restart

**Current Implementation** (contact/route.ts):
```typescript
const requestCounts = new Map<string, { count: number, resetTime: number }>()
// Resets entire server restart
```

**Impact**:
- Works on single server (Vercel serverless may restart frequently)
- Not persistent across deployments
- No data stored; limits lost on crash
- Doesn't scale horizontally (separate rate limit per edge function)

**Solution**:
1. **Short-term**: Accept current limitation (works for small traffic)
2. **Medium-term**: Implement Redis-based rate limiting
   ```typescript
   import { Redis } from "@upstash/redis";

   const redis = Redis.fromEnv();
   const key = `ratelimit:${ip}:${Date.now() / (1000 * 60 * 60)}`;
   const count = await redis.incr(key);
   ```
3. **Long-term**: Use Vercel Rate Limiting middleware

**Effort**: 2-3 hours (Redis approach)

**Cost**: Upstash Redis free tier sufficient (1,000 commands/day)

---

### 5. Database Not Seeded with Initial Data
**Severity**: 🟠 MEDIUM (Data missing until manual refresh)

**Issue**: Supabase tables exist but are empty until data is fetched

**Impact**:
- API endpoints return empty arrays on first deployment
- Users see empty grids and calendars
- Data appears only after cron job runs or manual refresh
- Poor first-time user experience

**Current Workaround**:
- Call `/api/refresh-github` manually to populate data
- Wait for cron job to run (6 hours)

**Solution**:
1. **One-time Setup**:
   ```bash
   curl http://localhost:3000/api/refresh-all?token=YOUR_REFRESH_TOKEN
   ```

2. **Proper Solution** (Recommended):
   - Create database migration script `scripts/seed-data.ts`
   - Run after Supabase tables created
   - Populate with example data or fetch from APIs

3. **Alternative**:
   - Run cron job immediately after deployment
   - Or add seed step to Vercel `postinstall` hook

**Effort**: 1-2 hours

**Recommendation**: Create seed script that runs on first deployment

---

## Medium-Priority Issues (Nice-to-Have)

### 6. TypeScript Type Safety
**Severity**: 🟡 LOW (Works but no IDE support)

**Issue**: Some components use `any` types instead of specific interfaces

**Affected Components**:
- ProjectsSection: `useState<any[]>([])` for projects, commits, leetcode
- DataCampSection: `useState<any[]>([])`
- Various fetch responses lack proper typing

**Impact**:
- No IDE autocomplete for data properties
- Type-checking bypassed (vulnerable to typos)
- Harder to refactor data structures

**Solution**:
Replace `any` with specific interfaces from `src/types/index.ts`:
```typescript
// Before
const [projects, setProjects] = useState<any[]>([])

// After
const [projects, setProjects] = useState<GitHubProject[]>([])
```

**Effort**: 2-3 hours

**Recommendation**: Update types gradually as components are touched

---

### 7. Error Handling & Boundaries
**Severity**: 🟡 LOW (Unlikely to crash but not robust)

**Issue**: No React error boundaries for graceful failure handling

**Current State**:
- Individual try-catch in data fetches
- No error boundaries wrapping sections
- If component crashes, page may not render

**Solution**:
1. Create `ErrorBoundary.tsx` component
2. Wrap each section with error boundary
3. Display fallback UI instead of crashing

**Effort**: 2 hours

**Recommendation**: Add after core functionality complete

---

### 8. Admin Dashboard Incomplete
**Severity**: 🟡 LOW (Exists but non-functional)

**Issue**: `src/app/admin/page.tsx` exists but implementation unclear

**Current State**: File exists, purpose unknown

**Likely Purpose**:
- Manual data refresh triggers
- View refresh job status
- Database administration UI

**Solution**:
1. Clarify requirements
2. Implement admin dashboard with:
   - Refresh buttons for GitHub, LeetCode, DataCamp
   - Last refresh timestamp and status
   - Error logs from cron jobs
   - Manual contact email test

**Effort**: 4-6 hours

**Recommendation**: Implement after core features stable

---

### 9. Image Optimization
**Severity**: 🟡 LOW (Images work but not optimized)

**Issue**: Images loaded directly; no lazy loading or optimization

**Current Approach**:
```jsx
<img src="/assets/courses/course.png" alt="..." />
```

**Optimization Opportunities**:
1. Use Next.js `Image` component for automatic optimization
2. Lazy load off-screen images
3. Serve WebP format with fallback
4. Compress images (60-70% size reduction typical)

**Impact**:
- Faster page load
- Reduced bandwidth
- Better mobile experience

**Effort**: 1-2 hours for basic optimization

**Recommendation**: Use Next.js Image component incrementally

---

### 10. Cron Execution Logging
**Severity**: 🟡 LOW (Nice to have for monitoring)

**Issue**: Cron job results not persisted (function `logCronExecution()` called but implementation unclear)

**Current State**:
- Cron job runs but execution history not stored
- Can't view past executions
- Errors not logged persistently

**Solution**:
1. Create `cron_executions` table in Supabase
2. Store execution results with timestamp
3. Add view in admin dashboard to see history

**Effort**: 1-2 hours

**Recommendation**: Implement for production monitoring

---

## Low-Priority Improvements (Polish)

### 11. GitHub Calendar Styling
**Status**: Functional but may need polish

The GitHub calendar uses `react-github-calendar` library with custom vaporwave theme applied, but visual polish may be needed to perfectly match design.

**Recommendation**: A/B test with users; adjust if needed

### 12. DataCamp Manual Updates
**Status**: By design (no public API)

DataCamp has no public API, so courses/projects must be manually entered into Supabase. This is intentional and working as designed.

**Recommendation**: Document process for future updates

### 13. PWA/Offline Support
**Status**: Not implemented

Site doesn't work offline; service workers not configured.

**Recommendation**: Low priority unless offline access required

### 14. SEO Optimization
**Status**: Basic (meta tags in place)

Site has default meta tags but could benefit from structured data, Open Graph tags, etc.

**Recommendation**: Implement after site launched

---

## Implementation Priority Matrix

| Feature | Severity | Effort | Impact | Priority | Target Date |
|---------|----------|--------|--------|----------|------------|
| Image serving route | HIGH | 2h | High | 1 | Before launch |
| API credentials | HIGH | 0.5h | High | 1 | Before launch |
| Vercel Cron setup | MEDIUM | 0.25h | High | 2 | Launch week |
| Database seeding | MEDIUM | 2h | High | 2 | Launch week |
| Rate limiting Redis | MEDIUM | 3h | Medium | 3 | After launch |
| TypeScript coverage | LOW | 2h | Low | 4 | Next sprint |
| Error boundaries | LOW | 2h | Low | 4 | Next sprint |
| Admin dashboard | LOW | 6h | Medium | 5 | Future |
| Image optimization | LOW | 1h | Low | 6 | Future |
| Cron logging | LOW | 1h | Low | 6 | Future |

---

## Testing Checklist

Before marking an issue resolved, verify:

### Frontend Tests
- [ ] Visual design unchanged (screenshot comparison)
- [ ] All animations smooth (no jank)
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] No console errors or warnings
- [ ] Load time acceptable (< 3 seconds)
- [ ] All images load correctly

### Backend Tests
- [ ] API endpoints return correct data
- [ ] Error handling works for API failures
- [ ] Rate limiting blocks requests correctly
- [ ] Email sending works end-to-end
- [ ] Database queries perform well
- [ ] Cron job runs successfully

### Integration Tests
- [ ] Loading screen → content transition smooth
- [ ] Data sections populate correctly
- [ ] Contact form submits successfully
- [ ] Navigation links scroll correctly
- [ ] Mobile menu opens/closes

---

## Escalation Path

If an issue is blocking:
1. Check this document for known workarounds
2. Reference ARCHITECTURE.md for implementation details
3. Check README.md troubleshooting section
4. Review code comments and git history for context
5. Contact team lead with issue summary + reproduction steps

---

**Last Updated**: 2026-02-01
**Status**: Work in progress (Steps 1-7 complete; Steps 8-10 pending)

For overall project context, see `/CLAUDE.md`
For implementation details, see `/ARCHITECTURE.md`
For user guide, see `/README.md`
