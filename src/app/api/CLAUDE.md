# API Routes

## Overview
Next.js App Router API routes for data fetching and form handling. All routes follow the `route.ts` convention with exported HTTP method functions.

## Route Pattern
```typescript
// src/app/api/example/route.ts
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // Handle GET request
  const data = await fetchData()
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  // Handle POST request
  const body = await request.json()
  return NextResponse.json({ success: true })
}
```

## Available Routes

### Data Fetching Routes

#### `GET /api/recent-projects`
**Purpose:** Fetch recent GitHub repositories/projects
**Returns:** Array of project objects
**Schema:**
```typescript
{
  id: string
  name: string
  description: string
  html_url: string
  homepage: string | null
  created_at: string
  updated_at: string
  language: string
  stars: number
  forks: number
  topics: string[]
}
```
**Source:** Supabase `github_projects` table
**Used by:** ProjectsSection

#### `GET /api/recent-commits`
**Purpose:** Fetch recent GitHub commit activity
**Returns:** Array of commit objects
**Schema:**
```typescript
{
  id: string
  name: string
  last_commit_message: string
  date: string
  commit_count: number
}
```
**Source:** Supabase `github_commits` table
**Used by:** ProjectsSection

#### `GET /api/datacamp-projects`
**Purpose:** Fetch DataCamp project portfolio
**Returns:** Array of project objects
**Schema:**
```typescript
{
  id: string
  title: string
  description: string
  tech_stack: string[]
  project_url: string
  image_url: string
}
```
**Source:** Supabase `datacamp_projects` table
**Used by:** DataCampSection

#### `GET /api/datacamp-courses`
**Purpose:** Fetch completed DataCamp courses with certificates
**Returns:** Array of course objects
**Schema:**
```typescript
{
  id: string
  title: string
  description: string
  completion_date: string
  certificate_url: string
  image_url: string
  hours: number
}
```
**Source:** Supabase `datacamp_courses` table
**Used by:** DataCampSection

### Form Handling Routes

#### `POST /api/contact`
**Purpose:** Handle contact form submissions
**Request Body:**
```typescript
{
  name: string       // 2-100 chars
  email: string      // Valid email
  message: string    // 10-1000 chars
}
```
**Response:**
```typescript
// Success
{ success: true, message: 'Message sent successfully' }

// Error
{ success: false, message: 'Error message' }
```
**Features:**
- Input validation (length, format)
- Rate limiting (5 requests per hour per IP)
- Spam protection (honeypot, content filtering)
- Email sending (Nodemailer)
- Database logging to `contact_submissions`
**Used by:** ContactSection

### Image Serving Routes

#### `GET /api/projects/images/[filename]`
**Purpose:** Serve project images from Supabase Storage or local files
**Parameters:** `filename` (string) - Image filename
**Response:** Image file (PNG/JPG)
**Used by:** ProjectsSection for project thumbnails

#### `GET /datacamp-images/[filename]`
**Purpose:** Serve DataCamp course/project images
**Parameters:** `filename` (string) - Image filename
**Response:** Image file (PNG/JPG)
**Used by:** DataCampSection for course thumbnails

### Utility Routes

#### `GET /api/test-db`
**Purpose:** Test Supabase database connection
**Returns:**
```typescript
{
  success: boolean
  message: string
  timestamp: string
}
```
**Use:** Development/debugging only

## Environment Variables

### Required for API Routes
```env
# Supabase (all routes)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# GitHub (data refresh)
GITHUB_TOKEN=xxx
GITHUB_USERNAME=xxx

# Email (contact form)
EMAIL_USER=xxx
EMAIL_PASS=xxx

# Security
REFRESH_TOKEN=xxx
```

## Error Handling

### Standard Error Response
```typescript
return NextResponse.json(
  { error: 'Error message', code: 'ERROR_CODE' },
  { status: 400 | 401 | 403 | 404 | 500 }
)
```

### Common Status Codes
- **200** - Success
- **400** - Bad Request (validation error)
- **401** - Unauthorized (missing/invalid auth)
- **403** - Forbidden (rate limited)
- **404** - Not Found
- **429** - Too Many Requests (rate limit exceeded)
- **500** - Internal Server Error

## Rate Limiting

### Implementation
Uses in-memory store with IP-based tracking:
```typescript
const requestCounts = new Map<string, { count: number, resetTime: number }>()

// Check limit
const clientIp = request.headers.get('x-forwarded-for') || 'unknown'
const limit = 5 // requests per hour
```

### Configured Limits
- **Contact Form:** 5 requests per hour per IP
- **Data Fetch:** No limit (public read)

## Security

### Best Practices
1. **Never expose service role key** in client-side code
2. **Validate all inputs** before database operations
3. **Sanitize user content** to prevent XSS/injection
4. **Use parameterized queries** for database access
5. **Implement rate limiting** for user-facing endpoints

### CORS Headers
```typescript
export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
```

## Testing API Routes

### Development Testing
```bash
# Test GET route
curl http://localhost:3000/api/recent-projects

# Test POST route
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
```

### Production Testing
```bash
# Replace with your Vercel deployment URL
curl https://your-site.vercel.app/api/test-db
```

## Adding New Routes

### Checklist
1. [ ] Create `route.ts` file in appropriate directory
2. [ ] Import `NextResponse` from `next/server`
3. [ ] Export HTTP method functions (GET, POST, etc.)
4. [ ] Add input validation for user data
5. [ ] Implement error handling with try-catch
6. [ ] Add rate limiting if user-facing
7. [ ] Test locally before deploying
8. [ ] Add to this documentation
9. [ ] Update TypeScript types in `src/types/`

### Template
```typescript
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const param = searchParams.get('param')

    // Validate input
    if (!param) {
      return NextResponse.json(
        { error: 'Parameter required' },
        { status: 400 }
      )
    }

    // Fetch data from database
    const supabase = createClient()
    const { data, error } = await supabase
      .from('table_name')
      .select('*')
      .eq('column', param)

    if (error) throw error

    // Return response
    return NextResponse.json(data)

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

## Troubleshooting

### Route Not Found (404)
- Check file is named `route.ts` (not `route.tsx` or `api.ts`)
- Verify directory structure matches URL path
- Ensure functions are exported (not default export)

### Database Connection Failed
- Check Supabase environment variables
- Verify service role key has correct permissions
- Test connection with `/api/test-db` route

### CORS Errors
- Add OPTIONS method handler
- Set appropriate CORS headers
- Check client request includes credentials if needed

### Rate Limit Not Working
- Verify IP extraction from headers
- Check rate limit store is not cleared on each request
- Consider using Redis for production rate limiting

---

**For overall project context, see `/CLAUDE.md` in project root**
