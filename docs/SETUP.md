# Setup Guide - Portfolio Site V3

## No Database Required! 🎉

This portfolio uses static JSON files for projects/DataCamp data and fetches live data from GitHub/LeetCode APIs.

## Quick Setup (2 Options)

### Option A: Run Without GitHub (Fastest)
```bash
npm install
npm run dev
```
✅ Site works immediately! GitHub commits will be empty until you add a token.

### Option B: Full Setup with GitHub Commits

**1. Get a GitHub Token:**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name it "Portfolio Site"
4. **Check the `public_repo` scope** ← Important!
5. Set expiration (90 days or no expiration)
6. Generate and **copy the token immediately**

**2. Update `.env.local`:**
```env
GITHUB_TOKEN=ghp_your_token_here
GITHUB_USERNAME=your_github_username
```

**3. Run dev server:**
```bash
npm install
npm run dev
```

Visit http://localhost:3000 - GitHub commits should now load!

## What Data Lives Where

### Static Data (Edit JSON files to customize)
- **Projects Showcase:** `src/data/projects.json`
- **DataCamp Courses:** `src/data/datacamp-courses.json`
- **DataCamp Projects:** `src/data/datacamp-projects.json`

### Dynamic Data (Fetched on page load)
- **Recent Commits:** `/api/recent-commits` (GitHub API - needs token)
- **LeetCode Submissions:** `/api/leetcode-submissions` (LeetCode API - optional)

### Assets
- All images in `public/assets/`
- Reference as `/assets/filename.png` in JSON files

## Customizing Your Portfolio

### 1. Add Your Projects

Edit `src/data/projects.json`:
```json
[
  {
    "id": "my-project",
    "name": "My Awesome Project",
    "description": "What it does...",
    "image": "/assets/my-project.png",
    "github_url": "https://github.com/you/project",
    "tech_stack": ["Next.js", "TypeScript", "etc"]
  }
]
```

### 2. Add DataCamp Courses

Edit `src/data/datacamp-courses.json`:
```json
[
  {
    "id": "course-id",
    "course_title": "Course Name",
    "course_description": "What you learned...",
    "date_completed": "2024-01-15",
    "certificate_url": "https://datacamp.com/certificate/...",
    "image_url": "/assets/datacamp/course.png"
  }
]
```

### 3. Add Project Images

1. Place images in `public/assets/`
2. Reference as `/assets/image.png` in JSON files
3. Recommended size: 1200x630px (2:1 ratio)

## Optional Configuration

### LeetCode Submissions
```env
LEETCODE_USERNAME=your_leetcode_username
```

### Contact Form Email
```env
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

To get Gmail app password:
1. Enable 2FA on Google account
2. Go to https://myaccount.google.com/apppasswords
3. Generate app password for "Mail"
4. Copy 16-character password
5. Add to `.env.local`

## Deployment to Vercel

1. Push code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Add environment variables:
   - `GITHUB_TOKEN` (required for commits)
   - `GITHUB_USERNAME` (required for commits)
   - `LEETCODE_USERNAME` (optional)
   - `EMAIL_USER` (optional)
   - `EMAIL_PASS` (optional)
5. Deploy!

## Troubleshooting

### "Failed to fetch data" / Loading forever

**Cause:** GitHub API credentials not configured or invalid

**Fix:**
1. Check `.env.local` has `GITHUB_TOKEN` and `GITHUB_USERNAME`
2. Verify token is valid: https://github.com/settings/tokens
3. Token must have `public_repo` scope checked
4. Check token hasn't expired
5. **Restart dev server after adding credentials**

### GitHub commits show "Unauthorized"

**Causes:**
- Token is invalid or expired
- Token doesn't have `public_repo` scope
- Username is incorrect

**Fix:**
1. Regenerate token with `public_repo` scope
2. Update `.env.local` with new token
3. Verify username is correct (case-sensitive)
4. **Kill and restart dev server** (`Ctrl+C` then `npm run dev`)

### Images not showing
- Verify files exist: `ls public/assets/`
- Use absolute paths: `/assets/image.png` (not `./assets/...`)
- Check filename case matches exactly

### Contact form doesn't send email
- Add `EMAIL_USER` and `EMAIL_PASS` to `.env.local`
- Use Gmail app password (not regular password)
- Restart dev server

## What Works Without Configuration

✅ All sections render with vaporwave styling
✅ Static projects/DataCamp data loads
✅ Contact form UI (without email sending)
✅ Full responsive design
✅ Loading animations

## What Needs Configuration

⚠️ GitHub commits (requires `GITHUB_TOKEN` + `GITHUB_USERNAME`)
⚠️ LeetCode submissions (requires `LEETCODE_USERNAME`)
⚠️ Email sending (requires `EMAIL_USER` + `EMAIL_PASS`)

## File Structure

```
portfolio-site-v3/
├── src/
│   ├── data/                         # ← Edit your content here
│   │   ├── projects.json
│   │   ├── datacamp-courses.json
│   │   └── datacamp-projects.json
│   ├── app/api/                      # API routes
│   └── components/sections/          # Page sections
├── public/assets/                    # ← Put images here
└── .env.local                        # ← Add credentials here
```

## Next Steps

1. ✅ Add GitHub token to see live commits
2. ✅ Edit `src/data/projects.json` with your projects
3. ✅ Add project images to `public/assets/`
4. ✅ Customize DataCamp courses/projects
5. ✅ Deploy to Vercel!

## Common Questions

**Q: Do I need a database?**
A: No! Everything uses static JSON or API fetching.

**Q: Is my GitHub token secure?**
A: Yes - tokens are server-side only. Never exposed to browser.

**Q: How do I disable GitHub/LeetCode sections?**
A: Leave credentials blank in `.env.local`. Sections show empty data.

**Q: Can I add more projects?**
A: Yes - add more objects to `src/data/projects.json`. No limit!

## Support

Check:
- `docs/DATABASE_REMOVED.md` - Migration details
- `docs/INCOMPLETE_FEATURES.md` - Known limitations
