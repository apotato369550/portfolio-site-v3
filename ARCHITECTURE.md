# Portfolio Site V3 Architecture Trace

**Project**: Next.js 16+ vaporwave portfolio site
**Last Updated**: 2025-02-01
**Status**: Steps 1-7 complete; Components & Assets migrated; Backend APIs functional

---

## Table of Contents

1. [High-Level Overview](#high-level-overview)
2. [Component Hierarchy](#component-hierarchy)
3. [API Routes & Data Flow](#api-routes--data-flow)
4. [Fetchers & External APIs](#fetchers--external-apis)
5. [Data Flow Diagrams](#data-flow-diagrams)
6. [Styling & CSS Organization](#styling--css-organization)
7. [Assets Directory Structure](#assets-directory-structure)
8. [Incomplete Features & Blockers](#incomplete-features--blockers)
9. [Environment Variables Required](#environment-variables-required)

---

## High-Level Overview

**Architecture**: Next.js 16 App Router (full-stack) with Supabase PostgreSQL backend

**Tech Stack**:
- Frontend: React 19 Server/Client Components, TypeScript
- Framework: Next.js 16 App Router
- Database: Supabase (PostgreSQL)
- Styling: Tailwind CSS + Scoped CSS modules
- API: Next.js API routes (src/app/api/**/route.ts)
- External APIs: GitHub (REST v3), LeetCode (GraphQL), DataCamp (manual)
- Email: Nodemailer (Gmail)
- Cron: Vercel Cron Jobs

**Page Structure**:
- Single page (src/app/page.tsx) with 8 sections rendered in sequence
- Loading screen (3 second minimum) with vaporwave grid animations
- Client-side component for interactivity, Server Components for data fetching

---

## Component Hierarchy

All components are located in `/src/components/`. Below is the complete component tree with dependencies.

### Page & Layout Layer

**File**: `src/app/page.tsx`
**Type**: Client Component (`'use client'`)
**Purpose**: Main landing page with loading screen and all sections

**Structure**:
```
Home
├── LoadingScreen (conditional, 3s minimum)
├── Hero
│   └── Navbar
├── IdentitySection
├── LocationSection
├── TechStackSection
├── ProjectsSection
│   └── GitHubCalendar (react-github-calendar)
├── DataCampSection
├── ContactSection
└── Footer
```

**State Management**:
- `isLoading`: Tracks loading screen state
- `showContent`: Triggers fade-in animation after 3 seconds
- `useEffect`: Enforces minimum 3-second loading time

**Data Flow**: No data fetching at page level; section components fetch independently

---

### LoadingScreen

**File**: `src/components/LoadingScreen.tsx`
**Type**: Client Component
**Purpose**: Vaporwave-themed loading screen with grid animation

**Key Elements**:
- Animated progress bar (0-100%)
- Grid lines with staggered animations
- Floating geometric shapes (triangle, circle, square, hexagon)
- "Brewing coffee... Booting up..." text with fade-in
- Glitch effect overlay and scan lines
- Animated dots

**Props**:
```typescript
{ onLoadingComplete: () => void }
```

**Animation Duration**: 200ms intervals with random increments (0-15%)
**Triggers completion**: After 100% progress + 800ms delay

**CSS**: `src/components/LoadingScreen.css` (custom animations, no Tailwind)

---

### Hero

**File**: `src/components/sections/Hero.tsx`
**Type**: Client Component
**Purpose**: Landing section with "JAY." branding and role descriptions

**Key Elements**:
- Navbar (at top)
- Large "JAY." text with glowing effect
- "Hi! I'm" greeting
- Role descriptions (Fullstack Developer, Data Scientist, etc.)
- Floating decorative elements:
  - 4 ellipses
  - 4 stars
  - 4 wireframes
  - 4 shimmer effects
  - 2 cubes

**Data Flow**: None (static content)

**CSS**: `src/components/sections/Hero.css`

**Vaporwave Features**:
- Pink-to-purple gradient background
- Neon glow on "JAY." text
- Floating animations on decorative shapes
- Full-screen height with flexbox centering

---

### Navbar

**File**: `src/components/Navbar.tsx`
**Type**: Client Component
**Purpose**: Navigation bar with smooth scroll links

**Navigation Items**:
- Home (#hero)
- About Me (#identity-section)
- What I Work With (#tech-stack-section)
- What I'm Working On (#projects-section)
- Reach Out To Me (#contact-section)

**Interactions**:
- Smooth scroll on click (preventDefault + scrollIntoView)
- Hover effects with cyan underline animation
- Hidden on mobile (responsive: `hidden lg:block`)

**CSS**: `src/components/Navbar.css`

---

### IdentitySection

**File**: `src/components/sections/IdentitySection.tsx`
**Type**: Client Component
**Purpose**: "Who am I, really?" section with statue and 3 content cards

**Key Elements**:
- Left side: Vaporwave statue image with ellipse effects
- Right side: Title + 3 glass morphism cards
- Stars background (50 dynamically positioned)
- Floating geometric shapes
- Side pillars (decorative images on left/right edges)

**Content Cards**:
1. **Curiosity**: Blend of curiosity, caffeine, creativity
2. **Scholarly**: Learning with precision and diligence
3. **Passion**: Problem solving and critical thinking

**Layout**: Grid (1 column mobile, 2 columns on lg+ with 3rd card spanning full width)

**CSS**: `src/components/sections/IdentitySection.css`

**Vaporwave Features**:
- Purple gradient background
- Glowing orbs (cyan, purple, pink)
- Glass morphism cards with hover scale effect
- Animated stars with random positioning

---

### LocationSection

**File**: `src/components/sections/LocationSection.tsx`
**Type**: Client Component
**Purpose**: "Where am I?" section with location and education info

**Key Elements**:
- Left side: Cebu cityscape image
- Tree background (vaporwave palm trees)
- Right side: 2x2 grid (2 questions, 2 answers)
- Floating crystals and wireframe shapes
- Glowing orbs

**Content**:
- **Question 1**: Where am I located? → Cebu, Visayas, Philippines
- **Question 2**: Where am I studying? → University of San Carlos

**Layout**: Images section + content section (responsive grid)

**CSS**: `src/components/sections/LocationSection.css`

**Vaporwave Features**:
- Blue gradient background
- Ellipse effects behind images
- Glass morphism title boxes

---

### TechStackSection

**File**: `src/components/sections/TechStackSection.tsx`
**Type**: Client Component
**Purpose**: "What do I work with?" section showcasing tech skills

**Tech Categories** (3 cards):

1. **Languages and Frameworks** (8 icons):
   - HTML5, CSS3, JavaScript, MongoDB
   - Express.js, React, Node.js, Python

2. **Tools and Platforms** (5 icons):
   - GitHub, Firebase, Jupyter, Figma, Git

3. **Currently Exploring** (2 icons):
   - C Programming, Scikit-learn

**Layout**: 3-column grid of category cards, each with icon grid

**CSS**: `src/components/sections/TechStackSection.css`

**Vaporwave Features**:
- Purple-to-blue gradient background
- Glass morphism cards
- Icon hover effects with glow
- Floating crystals and wireframes

---

### ProjectsSection

**File**: `src/components/sections/ProjectsSection.tsx`
**Type**: Client Component
**Purpose**: Display GitHub projects, commits, and LeetCode activity

**Data Dependencies**:
- `/api/recent-projects` → Fetch GitHub projects
- `/api/recent-commits` → Fetch recent commits
- `/api/leetcode-submissions` → Fetch LeetCode submissions

**Sub-sections**:

1. **Projects Grid**:
   - 3-column layout (responsive)
   - Cards show: image, name, description, tech tags, GitHub link
   - Hover scale effect

2. **Commits Section**:
   - Left: GitHub commit activity calendar (react-github-calendar)
   - Right: Recent commits list (max 10 items)
   - Vaporwave theme applied to calendar

3. **LeetCode Section**:
   - Grid of submission cards (max 9 items)
   - Shows: problem name, status (color-coded), date
   - Status colors: Green (Accepted), Red (other)

**State Management**:
```typescript
const [projects, setProjects] = useState<any[]>([])
const [commits, setCommits] = useState<any[]>([])
const [leetcode, setLeetcode] = useState<any[]>([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)
```

**Data Fetching** (useEffect):
```typescript
// Parallel fetch
const [projectsRes, commitsRes, leetcodeRes] = await Promise.all([
  fetch('/api/recent-projects'),
  fetch('/api/recent-commits'),
  fetch('/api/leetcode-submissions')
])
```

**Error Handling**: Displays error message if any fetch fails

**CSS**: `src/components/sections/ProjectsSection.css`

**Vaporwave Features**:
- Dark purple gradient background
- Glass morphism cards
- Floating ellipses, stars, wireframes
- Custom calendar styling (vaporwave theme)

---

### DataCampSection

**File**: `src/components/sections/DataCampSection.tsx`
**Type**: Client Component
**Purpose**: Display DataCamp projects and completed courses

**Data Dependencies**:
- `/api/datacamp-projects` → Fetch projects
- `/api/datacamp-courses` → Fetch courses with certificates

**Sub-sections**:

1. **Projects Grid**:
   - Shows: image, title, description, project URL
   - Hover scale effect
   - Graceful degradation if image fails

2. **Courses & Certificates Grid**:
   - Shows: title, description, completion date
   - Dual links: "View Certificate" + "Download PDF"
   - Responsive grid

**State Management**:
```typescript
const [projects, setProjects] = useState<any[]>([])
const [courses, setCourses] = useState<any[]>([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)
const [failedImages, setFailedImages] = useState<Set<string>>(new Set())
```

**Image Error Handling**:
```typescript
onError={(e: any) => {
  const imgSrc = e.target.src;
  if (!failedImages.has(imgSrc)) {
    setFailedImages(prev => new Set(prev).add(imgSrc));
    e.target.style.display = 'none'; // Hide broken image
  }
}}
```

**CSS**: `src/components/sections/DataCampSection.css`

**Vaporwave Features**:
- Purple gradient background
- Rainbow animated "DataCamp" text emphasis
- Glass morphism cards
- Floating elements (ellipses, stars, wireframes)

---

### ContactSection

**File**: `src/components/sections/ContactSection/index.tsx`
**Type**: Client Component
**Purpose**: Contact form with vaporwave styling

**Form Fields**:
1. Name (required, 2-100 chars)
2. Email (required, valid format)
3. Message (required, 10-1000 chars)

**Form State**:
```typescript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: '',
})
const [errors, setErrors] = useState<Record<string, string>>({})
const [submitting, setSubmitting] = useState(false)
const [feedback, setFeedback] = useState('')
```

**Validation** (client-side):
- Name: Non-empty, 2-100 characters
- Email: Valid email regex (`/\S+@\S+\.\S+/`)
- Message: Non-empty, 10-1000 characters

**Submission Flow**:
```
User fills form
→ Click "Send Message"
→ Validate inputs (client)
→ POST /api/contact
→ Server validates, sanitizes, sends email
→ Returns success/error feedback
```

**CSS**: `src/components/sections/ContactSection/ContactSection.css`

**Vaporwave Features**:
- Vaporwave background image
- "Get In Touch" title in cyan italic
- Glass morphism form card
- Cyan border inputs
- Cyan gradient submit button
- Floating decorative elements

---

### Footer

**File**: `src/components/Footer.tsx`
**Type**: Functional Component (no hooks)
**Purpose**: Site footer with copyright and links

**Content**:
- Copyright text with vaporwave flair
- Navigation links (Home, Projects, Contact, GitHub)
- Social media teaser ("Made with love and lots of coffee")
- "I LOVE VAPORWAVE" tagline
- Animated bottom line "(insert coin here)"

**CSS**: `src/components/Footer.css`

**Vaporwave Features**:
- Cyan gradient background
- Neon glow text effects
- Grid background animation
- Flashy border animation
- Pulsing bottom text

---

## API Routes & Data Flow

All API routes follow Next.js App Router pattern: `src/app/api/*/route.ts`

### Data Fetching Routes (Read-Only)

#### `GET /api/recent-projects`

**Purpose**: Fetch GitHub projects from Supabase
**Called By**: ProjectsSection
**Response**:
```typescript
Array of {
  id: string (UUID)
  name: string
  description: string
  github_url: string
  image: string
  tech_stack: TechStack[]
  stars: number
  forks: number
  language: string
  created_at: string
  updated_at: string
}
```

**Data Source**: Supabase `github_projects` table
**ISR Revalidation**: 3600 seconds (1 hour)
**Error Handling**: 500 status with error message

---

#### `GET /api/recent-commits`

**Purpose**: Fetch recent GitHub commits
**Called By**: ProjectsSection
**Response**:
```typescript
Array of {
  id: string (UUID)
  name: string (repo name)
  description: string
  last_commit_message: string
  date: string (ISO 8601)
  url: string
  stars: number
  forks: number
  language: string
}
```

**Data Source**: Supabase `github_commits` table (limited to 10 most recent)
**ISR Revalidation**: 3600 seconds
**Error Handling**: 500 status with error message

---

#### `GET /api/leetcode-submissions`

**Purpose**: Fetch LeetCode problem submissions
**Called By**: ProjectsSection
**Response**:
```typescript
Array of {
  id: string (UUID)
  problem_name: string
  submission_date: string (ISO 8601)
  submission_status: string ('Accepted' | other)
}
```

**Data Source**: Supabase `leetcode_submissions` table (limited to 10 most recent)
**ISR Revalidation**: 3600 seconds
**Error Handling**: 500 status with error message

---

#### `GET /api/datacamp-projects`

**Purpose**: Fetch DataCamp projects
**Called By**: DataCampSection
**Response**:
```typescript
Array of {
  id: string (UUID)
  project_title: string
  project_description: string
  project_image?: string (URL)
  project_url?: string
  created_at: string
  updated_at: string
}
```

**Data Source**: Supabase `datacamp_projects` table
**ISR Revalidation**: 3600 seconds
**Error Handling**: 500 status with error message

---

#### `GET /api/datacamp-courses`

**Purpose**: Fetch DataCamp courses with certificates
**Called By**: DataCampSection
**Response**:
```typescript
Array of {
  id: string (UUID)
  course_title: string
  course_description: string
  date_completed: string
  certificate_url: string
  image_url: string
  created_at: string
  updated_at: string
}
```

**Data Source**: Supabase `datacamp_courses` table (ordered by date_completed DESC)
**ISR Revalidation**: 3600 seconds
**Error Handling**: 500 status with error message

---

### Form Submission Route

#### `POST /api/contact`

**Purpose**: Handle contact form submissions with validation and email sending
**Called By**: ContactSection (form submission)

**Request Body**:
```typescript
{
  name: string
  email: string
  message: string
}
```

**Response**:
```typescript
Success:
{ success: true, message: 'Email sent successfully' }

Error (400):
{ success: false, message: 'Validation error message' }

Error (429):
{ error: 'Too many requests. Please try again later.' }

Error (500):
{ success: false, message: 'Failed to send email. Please try again later.' }
```

**Validation** (server-side):

1. **Rate Limiting**: 5 requests per hour per IP (using IP from x-forwarded-for)
2. **Required Fields**: Name, Email, Message
3. **Sanitization**: Remove `<>` characters
4. **Email Format**: Regex validation
5. **Length Constraints**:
   - Name: 2-100 characters
   - Message: 10-1000 characters
6. **Spam Detection**: Pattern matching for common spam keywords
   - viagra, cialis, lottery, winner, $$$, click here

**Spam Handling**: Silently rejects (returns success to prevent enumeration)

**Email Sending**:
- Service: Nodemailer with Gmail SMTP
- From: `EMAIL_USER` environment variable
- To: `EMAIL_USER` (site owner)
- ReplyTo: Submitter email
- Format: HTML email with styled template

**Error Handling**:
- Missing env vars → 500 error
- Network/SMTP errors → 500 error
- Validation errors → 400 error
- Rate limit → 429 error

---

### Data Refresh Routes (Cron Jobs)

#### `GET /api/cron/refresh-data`

**Purpose**: Scheduled job to refresh GitHub and LeetCode data
**Authentication**: Vercel Cron header `Authorization: Bearer ${CRON_SECRET}`
**Called By**: Vercel Cron (every 6 hours)

**Actions** (parallel):
1. `fetchGitHubData()` - Fetch repos and commits
2. `fetchLeetCodeData()` - Fetch recent submissions

**Response**:
```typescript
{
  success: true,
  message: 'Data refresh completed',
  timestamp: string (ISO 8601),
  github: {
    status: 'fulfilled' | 'rejected',
    count: number,
    error: string | null
  },
  leetcode: {
    status: 'fulfilled' | 'rejected',
    count: number,
    error: string | null
  }
}
```

**Error Handling**:
- Missing/invalid CRON_SECRET → 401 Unauthorized
- Fetch failures → Graceful degradation (Promise.allSettled)
- Logs execution status to database (optional)

**ISR Revalidation**: 0 (no caching)

---

#### `GET /api/refresh-github`

**Purpose**: Manual GitHub data refresh endpoint
**Authentication**: Optional `Authorization: Bearer ${REFRESH_TOKEN}` header
**Called By**: Manual testing or external triggers

**Actions**:
1. Validate auth token (if REFRESH_TOKEN is set)
2. Call `fetchGitHubData()`
3. Return count of fetched commits

**Response**:
```typescript
{
  success: true,
  message: 'Fetched N GitHub commits',
  count: number
}
```

**Error Handling**:
- Missing/invalid token → 401 Unauthorized
- Fetch failure → 500 error

**ISR Revalidation**: 0 (no caching)

---

### Utility Routes

#### `GET /api/health`

**Status**: Stub/Not shown in code
**Purpose**: Health check for monitoring

#### `GET /api/test-db`

**Status**: Stub/Not shown in code
**Purpose**: Test Supabase database connection (dev only)

---

## Fetchers & External APIs

All external API fetchers are in `/src/lib/fetchers/`

### GitHub Fetcher

**File**: `src/lib/fetchers/github.ts`
**Function**: `fetchGitHubData() → Promise<{ count: number, data: array }>`

**External API**: GitHub REST API v3
**Endpoint**: `https://api.github.com/users/{username}/repos`

**Process**:

1. **Fetch Repositories**:
   - Query: Sorted by `pushed` date (descending), max 10 repos
   - Headers: Bearer token auth
   - Error handling: Catches 403 (rate limit) with reset time

2. **Fetch Commits** (parallel):
   - For each repo: Fetch latest commit message and date
   - Fallback: Use repo's `pushed_at` if commit fetch fails
   - Handles failures gracefully (returns repo info with fallback data)

3. **Transform Data**:
   ```typescript
   {
     name: string
     description: string
     last_commit_message: string
     date: string
     url: string
     stars: number
     forks: number
     language: string
   }
   ```

4. **Store in Supabase**:
   - Delete all existing records
   - Insert new records into `github_commits` table
   - Uses `supabaseAdmin` (service role for write access)

**Environment Variables Required**:
- `GITHUB_TOKEN`: GitHub personal access token
- `GITHUB_USERNAME`: Username to fetch repos from

**Error Handling**:
- Rate limit errors: Returns error with reset time
- Network errors: Logged and thrown
- Missing credentials: Throws error
- Partial failures: Returns whatever was successfully fetched

**Logging**: Uses `logInfo()` and `logError()` utilities

---

### LeetCode Fetcher

**File**: `src/lib/fetchers/leetcode.ts`
**Function**: `fetchLeetCodeData() → Promise<{ count: number, data: array }>`

**External API**: LeetCode GraphQL API
**Endpoint**: `https://leetcode.com/graphql`

**Process**:

1. **GraphQL Query**:
   ```graphql
   query recentSubmissions($username: String!, $limit: Int!) {
     recentSubmissionList(username: $username, limit: $limit) {
       title
       timestamp
       statusDisplay
     }
   }
   ```

2. **Fetch Submissions**:
   - Max 10 submissions
   - Optional session cookie (for private profiles)
   - Referer header for API compliance

3. **Timestamp Formatting** (robust):
   - Handles string (ISO 8601) and number (Unix timestamp)
   - Detects seconds vs. milliseconds
   - Validates date before converting
   - Fallback: Current date on error

4. **Transform Data**:
   ```typescript
   {
     problem_name: string
     submission_date: string (ISO 8601)
     submission_status: string
   }
   ```

5. **Store in Supabase**:
   - Delete all existing records
   - Insert new records into `leetcode_submissions` table

**Environment Variables Required**:
- `LEETCODE_USERNAME`: Username to fetch submissions from
- `LEETCODE_SESSION_COOKIE`: Optional session cookie for private profiles

**Error Handling**:
- API errors: Logged and thrown
- Missing username: Throws error
- Invalid timestamp: Uses fallback (current date)
- Empty results: Returns empty array
- Missing API response: Throws error

**Logging**: Uses `logInfo()` and `logError()` utilities

---

## Data Flow Diagrams

### Initialization Flow

```
User loads website
    ↓
page.tsx renders (client)
    ↓
useState: isLoading = true, showContent = false
    ↓
useEffect: Set 3-second minimum timer
    ↓
Render LoadingScreen
    ├─ Progress bar animates 0 → 100%
    ├─ Grid lines animate
    ├─ Shapes float
    └─ After 100%, wait 800ms then call onLoadingComplete()
    ↓
setIsLoading(false), setShowContent(true)
    ↓
Apply fade-in animation to app-container
    ↓
Render full page:
├─ Hero (with Navbar)
├─ IdentitySection
├─ LocationSection
├─ TechStackSection
├─ ProjectsSection [FETCH STARTS]
├─ DataCampSection [FETCH STARTS]
├─ ContactSection
└─ Footer
```

### ProjectsSection Data Flow

```
ProjectsSection mounts
    ↓
useEffect triggers
    ↓
setLoading(true)
    ↓
Promise.all([
  fetch('/api/recent-projects'),
  fetch('/api/recent-commits'),
  fetch('/api/leetcode-submissions')
])
    ↓ (each request)
    ├─ GET /api/recent-projects
    │  ├─ Query: Supabase github_projects table
    │  └─ Return: Array of projects
    ├─ GET /api/recent-commits
    │  ├─ Query: Supabase github_commits table (limit 10)
    │  └─ Return: Array of commits
    └─ GET /api/leetcode-submissions
       ├─ Query: Supabase leetcode_submissions table (limit 10)
       └─ Return: Array of submissions
    ↓
setProjects(data)
setCommits(data)
setLeetcode(data)
    ↓
setLoading(false)
    ↓
Render sections:
├─ Projects Grid
├─ Commits Section (Calendar + List)
└─ LeetCode Section
```

### ContactForm Submission Flow

```
User fills ContactSection form
    ↓
Click "Send Message"
    ↓
handleSubmit prevents default
    ↓
validateForm() [client-side]
├─ Check required fields
├─ Check email format
└─ Check lengths (2-100, 10-1000)
    ↓ [if errors]
setErrors(validationErrors)
return
    ↓ [if valid]
setSubmitting(true)
    ↓
fetch('/api/contact', {
  method: 'POST',
  body: JSON.stringify(formData)
})
    ↓
Server: /api/contact route
├─ Extract client IP
├─ Check rate limit (5/hour)
├─ Parse JSON
├─ Validate inputs (required, lengths, email format)
├─ Sanitize strings (remove <>)
├─ Check spam patterns
├─ Create nodemailer transport (Gmail)
├─ Send email with HTML template
└─ Return { success: true } or error
    ↓
[if ok] setFeedback('Message sent successfully')
[if error] setFeedback('Error message')
    ↓
setSubmitting(false)
```

### Cron Data Refresh Flow

```
Vercel Cron triggers (every 6 hours)
    ↓
GET /api/cron/refresh-data
├─ Verify: Authorization: Bearer ${CRON_SECRET}
    ↓
Promise.allSettled([
  fetchGitHubData(),
  fetchLeetCodeData()
])
    ↓ [GitHub path]
fetchGitHubData()
├─ GET GitHub API: /users/{username}/repos (max 10)
├─ For each repo: GET /repos/{user}/{repo}/commits (1 latest)
├─ Transform data
├─ DELETE old records from github_commits
├─ INSERT new records
└─ Return { count, data }
    ↓ [LeetCode path]
fetchLeetCodeData()
├─ POST LeetCode GraphQL API: recentSubmissionList query
├─ Transform data (format timestamps)
├─ DELETE old records from leetcode_submissions
├─ INSERT new records
└─ Return { count, data }
    ↓
Combine results
    ↓
logCronExecution() [log to database]
    ↓
Return { success: true, timestamp, github: {...}, leetcode: {...} }
```

---

## Styling & CSS Organization

### Global Styles

**File**: `src/app/globals.css`

**Imports**:
- Tailwind CSS (`@import "tailwindcss"`)
- Google Fonts: Poppins, Orbitron, Space Grotesk

**CSS Variables** (Vaporwave Palette):
```css
--color-primary: #ff00ff (magenta)
--color-secondary: #00ffff (cyan)
--color-accent: #ff69b4 (hot pink)
--color-neon-pink: #ff006e
--color-neon-blue: #00d9ff
--color-neon-purple: #9d00ff
--color-dark-bg: #0a0a0f
--color-dark-card: #1a1a2e

--gradient-primary: linear-gradient(135deg, #ff00ff, #00ffff)
--gradient-secondary: linear-gradient(135deg, #667eea, #764ba2)
--gradient-accent: linear-gradient(135deg, #f093fb, #f5576c)

--font-poppins: 'Poppins', sans-serif
--font-display: 'Orbitron', sans-serif
--font-body: 'Space Grotesk', sans-serif
```

**Global Utilities**:
- `.glass-morphism`: Backdrop blur + transparent background
- `.neon-glow-pink`, `.neon-glow-cyan`: Text shadow glow
- `.neon-border-pink`, `.neon-border-cyan`: Box shadow glow
- `.gradient-text`: Text with gradient fill
- `.float-animation`: Floating effect keyframe
- `.pulse-glow`: Pulsing neon glow
- `.question-emphasis`, `.datacamp-emphasis`: Rainbow gradient text

**Animations** (shared keyframes):
- `float`: Up/down movement
- `pulse-glow`: Opacity + shadow pulsing
- `gradient`: Background position animation
- `fadeIn`, `slideInLeft`, `slideInRight`: Enter animations
- `rotate`: 360° rotation
- `rainbowText`: Rainbow color shift
- `glow-pulse`: Text shadow brightness pulse

**Responsive Breakpoints**:
- Mobile: max-width 640px
- Tablet: max-width 768px
- Desktop: min-width 1024px+

**Component Scoped Styles**:
- Each section component has matching `.css` file
- Imported via `import './SectionName.css'`
- Classes prefixed with section name (e.g., `.hero-`, `.identity-`, `.tech-stack-`)

---

### Section CSS Files

| Section | File | Primary Classes |
|---------|------|-----------------|
| LoadingScreen | `LoadingScreen.css` | `.loading-screen`, `.progress-bar`, `.grid-line` |
| Hero | `sections/Hero.css` | `.hero-image-container`, `.jay-glow`, `.floating-*` |
| IdentitySection | `sections/IdentitySection.css` | `.identity-gradient-container`, `.statue-ellipse-*`, `.content-card` |
| LocationSection | `sections/LocationSection.css` | `.location-gradient-container`, `.location-ellipse-*`, `.cebu` |
| TechStackSection | `sections/TechStackSection.css` | `.tech-stack-gradient-container`, `.tech-category-card`, `.tech-stack-icon` |
| ProjectsSection | `sections/ProjectsSection.css` | `.projects-gradient-container`, `.project-card`, `.github-calendar-vaporwave` |
| DataCampSection | `sections/DataCampSection.css` | `.datacamp-gradient-container`, `.datacamp-card`, `.datacamp-emphasis` |
| ContactSection | `sections/ContactSection/ContactSection.css` | `.contact-gradient-container`, `.glass-morphism`, `.contact-input` |
| Footer | `Footer.css` | `.footer`, `.glow-text`, `.glow-link` |
| Navbar | `Navbar.css` | `.navbar`, `.navbar-item` |

---

### CSS Patterns Used

**Glass Morphism**:
```css
.glass-morphism {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}
```

**Neon Glow**:
```css
.neon-glow-cyan {
  text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff;
}
```

**Gradient Text**:
```css
.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**Floating Animation**:
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
```

---

## Assets Directory Structure

**Location**: `public/assets/`

```
public/assets/
├── vaporwave_background.png          # Main hero background
├── vaporwave_background.webp         # WebP version
├── vaporwave_background.jpeg         # Alternative format
├── vaporwave_background_2.jpg        # Secondary background
├── vaporwave_background_3.png        # Tertiary background
├── vaporwave_cube.png                # 3D cube icon
├── vaporwave_pillar.png              # Decorative pillar
├── hamburger.png                     # Mobile menu icon
├── close.png                         # Close/X icon
├── react.svg                         # React logo
├── react.png                         # React logo (PNG)
├── github_white_logo.png             # GitHub logo
│
├── TechStackSection/                 # Tech icons (15 total)
│   ├── html_5_photo.png
│   ├── css_photo.png
│   ├── js_photo.png
│   ├── mongodb.png
│   ├── express.js.png
│   ├── circle_react.png
│   ├── node.js.png
│   ├── python.png
│   ├── github-logo.png
│   ├── firebase logo.png
│   ├── Jupyter_logo.svg.png
│   ├── figma.png
│   ├── git logo.png
│   ├── c_logo.png
│   └── scikitlearn logo.png
│
├── IdentitySection/
│   ├── vaporwave statue.png          # Main identity section image
│   └── new_pillar.png                # Side pillar decoration
│
├── LocationSection/
│   ├── cebu_cropped_nobg.png         # Cebu cityscape
│   ├── vaporwave trees.png           # Background trees
│   └── grunge_pinoy_flag.png         # Philippine flag decoration
│
├── projects/                          # Project thumbnails
│   ├── image 3.png
│   ├── python.png
│   ├── dsa.png
│   ├── c_logo 2.png
│   ├── tsp.png
│   ├── tailwind.png
│   ├── cbvt.png
│   └── react 2.png
│
├── courses/                           # DataCamp course certificates
│   ├── Associate Data Scientist in Python Certificate.pdf
│   └── Machine Learning Scientist in Pytoon.pdf
│
├── certs/                             # Additional certificates
│   ├── feature_engineering_nlp_python.pdf
│   ├── intro_to_nlp_in_python.pdf
│   ├── nlp_with_spacy.pdf
│   └── hyperparameter_tuning_in_python.pdf
│
└── cebu.png                           # Additional cebu image
└── cebu_cropped.png                  # Cropped cebu image
└── html_css_js.png                   # HTML/CSS/JS group image
└── placeholder.svg                   # Fallback placeholder
```

**Asset Usage by Section**:
- **Hero**: vaporwave_background.*, vaporwave_cube.png
- **IdentitySection**: vaporwave statue.png, new_pillar.png
- **LocationSection**: cebu_cropped_nobg.png, vaporwave trees.png
- **TechStackSection**: All icons in TechStackSection/
- **ProjectsSection**: Project images in projects/
- **DataCampSection**: Course images + certificates in courses/ and certs/

**Path Convention**: All image paths use absolute paths `/assets/...` (not relative)

---

## Incomplete Features & Blockers

### Status Summary

**Complete** ✅
- All 8 section components ported with vaporwave styling
- All CSS files migrated
- All assets copied to public/assets/
- Contact form with validation and email sending
- GitHub fetcher (REST API v3)
- LeetCode fetcher (GraphQL API)
- Supabase database connections
- Loading screen with animations
- Navbar with smooth scroll

**Functional but Environment-Dependent** ⚠️
- API routes require Supabase env vars
- Cron jobs require Vercel Cron + CRON_SECRET
- Email sending requires Gmail credentials
- GitHub/LeetCode data fetch requires API tokens

**Known Issues & Gaps**:

1. **API Data Fetch in ProjectsSection**:
   - Issue: Component directly calls fetch() from client-side
   - Impact: Network requests visible in browser Network tab (not ideal for security)
   - Better approach: Use Server Components or API route middleware
   - Status: Works but not best practice

2. **No Database Seeding**:
   - Issue: Tables exist but no initial data
   - Impact: API routes return empty arrays until cron job runs
   - Workaround: Run `/api/refresh-github` manually to populate data
   - Status: Not blocking (cron handles ongoing updates)

3. **Image Paths in ProjectsSection**:
   - Line 108: `src={`/api/projects/images/${project.image.split('/').pop()}`}`
   - Issue: Assumes image serving through API route (not implemented)
   - Actual behavior: Images likely fail to load
   - Fix needed: Either implement `/api/projects/images/*` route or store full URLs in DB

4. **DataCampSection Image Error Handling**:
   - Gracefully hides broken images
   - But no fallback placeholder shown
   - Works but silent failure may confuse users

5. **Rate Limiting Implementation**:
   - Uses in-memory Map (resets on server restart)
   - Not persistent across deployments
   - For production: Consider Redis-based rate limiting
   - Current state: Works for single-server, inadequate for Vercel

6. **Missing Admin/Dashboard Page**:
   - File exists: `src/app/admin/page.tsx` (not shown in trace)
   - Purpose: Unknown (likely manual data refresh trigger)
   - Status: May be incomplete

7. **Error Boundaries Missing**:
   - No React error boundaries for sections
   - If a section crashes, entire page may fail
   - Current: Components have try-catch but not robust

8. **TypeScript Any Types**:
   - ProjectsSection: `useState<any[]>([])` for projects, commits, leetcode
   - DataCampSection: `useState<any[]>([])`
   - Should use specific interfaces from `src/types/index.ts`
   - Impact: Loss of type safety, IDE autocomplete

9. **Cron Logging Incomplete**:
   - Function: `logCronExecution()` called but not shown in code
   - Status: Likely missing implementation
   - Impact: No cron execution history stored

10. **GitHub Calendar Styling**:
    - Using external library `react-github-calendar`
    - Custom vaporwave theme applied but may not fully override defaults
    - Status: Functional, visual polish may be needed

11. **DataCamp Manual Updates**:
    - No fetcher for DataCamp (unlike GitHub/LeetCode)
    - Data must be manually entered/maintained
    - Status: By design (DataCamp has no public API)

12. **No TypeScript Strict Mode**:
    - tsconfig likely has `strict: false`
    - Contributes to `any` type usage
    - Should enable for production code quality

---

## Environment Variables Required

### Development (.env.local)

```env
# Supabase (Required for all data fetching)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# GitHub API (Required for /api/refresh-github and cron)
GITHUB_TOKEN=ghp_xxx
GITHUB_USERNAME=apotato369550

# LeetCode API (Required for /api/refresh-leetcode and cron)
LEETCODE_USERNAME=xxx
LEETCODE_SESSION_COOKIE=xxx (optional, for private profiles)

# Email (Required for /api/contact)
EMAIL_USER=xxx@gmail.com
EMAIL_PASS=xxx (Gmail app password, not account password)

# Security (Required for cron job)
CRON_SECRET=xxx
REFRESH_TOKEN=xxx (optional, for /api/refresh-github auth)

# Optional
NODE_ENV=development
```

### Supabase Database Tables

All tables must be created with following structure:

**github_commits**
```sql
id (UUID, PK)
name (Text)
description (Text)
last_commit_message (Text)
date (Timestamp)
url (Text)
stars (Integer)
forks (Integer)
language (Text)
created_at (Timestamp, auto)
updated_at (Timestamp, auto)
```

**github_projects**
```sql
id (UUID, PK)
name (Text)
description (Text)
github_url (Text)
image (Text)
tech_stack (JSONB)
stars (Integer)
forks (Integer)
language (Text)
created_at (Timestamp, auto)
updated_at (Timestamp, auto)
```

**leetcode_submissions**
```sql
id (UUID, PK)
problem_name (Text)
submission_date (Timestamp)
submission_status (Text)
created_at (Timestamp, auto)
updated_at (Timestamp, auto)
```

**datacamp_projects**
```sql
id (UUID, PK)
project_title (Text)
project_description (Text)
project_image (Text, nullable)
project_url (Text, nullable)
created_at (Timestamp, auto)
updated_at (Timestamp, auto)
```

**datacamp_courses**
```sql
id (UUID, PK)
course_title (Text)
course_description (Text)
date_completed (Timestamp)
certificate_url (Text)
image_url (Text)
created_at (Timestamp, auto)
updated_at (Timestamp, auto)
```

**contact_submissions**
```sql
id (UUID, PK)
name (Text)
email (Text)
message (Text)
created_at (Timestamp, auto)
```

---

## Summary

**Component Architecture**: 8 main sections + Navbar + Footer, all with vaporwave styling
**API Routes**: 5 data fetch endpoints, 1 form endpoint, 2 cron refresh endpoints
**Data Sources**: Supabase (source of truth), GitHub/LeetCode (periodic refresh), DataCamp (manual)
**External APIs**: GitHub REST v3, LeetCode GraphQL, Nodemailer (Gmail)
**Styling**: Tailwind CSS + scoped section CSS + global vaporwave utilities
**Assets**: 50+ images/icons in public/assets/, organized by section

**Ready for Production**: ✅ Frontend complete and functional
**Blockers for Launch**: ⚠️ Database seeding needed, image serving route missing, rate limiting needs Redis for multi-server

