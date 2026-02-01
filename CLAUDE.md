# Portfolio Site V3 - Next.js + Supabase

## Project Overview
Modern vaporwave-styled portfolio website built with Next.js 16+ App Router, React Server Components, and Supabase (PostgreSQL). Migrated from MERN stack (v2) to achieve better performance, simpler architecture, and modern best practices.

## Tech Stack
- **Framework:** Next.js 16+ with App Router
- **UI Library:** React 19 with Server Components
- **Styling:** Tailwind CSS + Custom CSS (vaporwave aesthetic)
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage (images/assets)
- **Deployment:** Vercel
- **Language:** TypeScript

## Architecture

### Directory Structure
```
portfolio-site-v3/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes (Next.js API handlers)
│   │   ├── layout.tsx         # Root layout with fonts & metadata
│   │   └── page.tsx           # Home page (all sections)
│   ├── components/            # React components
│   │   ├── sections/          # Page sections (Hero, Identity, etc.)
│   │   ├── LoadingScreen.tsx  # Vaporwave loading animation
│   │   ├── Navbar.tsx         # Navigation bar
│   │   └── Footer.tsx         # Site footer
│   ├── lib/                   # Utilities and fetchers
│   │   ├── fetchers/          # External API fetchers (GitHub, LeetCode)
│   │   ├── supabase/          # Supabase clients (client/server)
│   │   └── utils/             # Helper functions
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
│   └── assets/                # Images, icons, backgrounds
├── scripts/                   # Database migration scripts
└── CLAUDE.md                  # This file
```

## Key Features

### Vaporwave Aesthetic (Non-Negotiable)
- **Colors:** Purple/pink/cyan gradients, neon accents
- **Animations:** 3D grid effects, floating geometric shapes, glowing orbs
- **Typography:** Orbitron + Space Grotesk fonts, rainbow gradients
- **Effects:** Glass morphism, backdrop blur, neon glow, shimmer effects

### Sections
1. **Hero** - Vaporwave sun, 3D grid, "JAY" with glow effect
2. **Identity (About Me)** - Vaporwave statue, 3 content cards (Curiosity, Scholarly, Passion)
3. **Location** - Cebu cityscape, location & study info
4. **Tech Stack** - 15 tech icons in 3 categories with neon glow
5. **Projects** - GitHub projects grid, commit calendar, recent commits, LeetCode submissions
6. **DataCamp** - DataCamp projects & courses with certificates
7. **Contact** - Glass morphism form with vaporwave background

### Data Flow
- **External APIs:** GitHub (commits, repos), LeetCode (submissions), DataCamp (manual)
- **Database:** Supabase PostgreSQL stores fetched data
- **Caching:** ISR (Incremental Static Regeneration) for performance
- **Refresh:** Vercel Cron jobs update data periodically

## Component Patterns

### Server vs Client Components
- **Server Components (default):** Used for data fetching at build/request time
- **Client Components (`'use client'`):** Used when:
  - Component uses React hooks (useState, useEffect, etc.)
  - Component has user interactivity (forms, buttons with onClick)
  - Component needs browser APIs

### Image Handling
- **Public Assets:** Use `/assets/...` paths (stored in `public/assets/`)
- **Example:** `<img src="/assets/vaporwave_background.png" alt="..." />`
- **DO NOT:** Use relative imports like `import image from '../../../assets/...'`

### CSS Organization
- **Global Styles:** `src/app/globals.css` (Tailwind, custom properties)
- **Component Styles:** `ComponentName.css` alongside component
- **Import in Component:** `import './ComponentName.css'`
- **Asset Paths in CSS:** Use absolute paths `url("/assets/...")`

### API Routes
- **Location:** `src/app/api/[endpoint]/route.ts`
- **Pattern:** Export `GET`, `POST`, `PUT`, `DELETE` functions
- **Response:** Use `NextResponse.json(data, { status: 200 })`
- **Example:**
```typescript
import { NextResponse } from 'next/server'

export async function GET() {
  const data = await fetchData()
  return NextResponse.json(data)
}
```

## Database Schema

### Tables
1. **github_commits** - Commit activity data
2. **github_projects** - Repository information
3. **leetcode_submissions** - LeetCode problem submissions
4. **datacamp_courses** - DataCamp courses with certificates
5. **datacamp_projects** - DataCamp project portfolio
6. **contact_submissions** - Contact form entries (with spam protection)

### Key Patterns
- All tables use UUID primary keys
- Timestamp columns: `created_at`, `updated_at`
- See `scripts/*.sql` for complete schema

## Environment Variables

### Required (.env.local)
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# External APIs
GITHUB_TOKEN=xxx
GITHUB_USERNAME=xxx
LEETCODE_USERNAME=xxx
LEETCODE_SESSION_COOKIE=xxx

# Contact Form
EMAIL_USER=xxx
EMAIL_PASS=xxx

# Security
REFRESH_TOKEN=xxx
CRON_SECRET=xxx
```

## Migration Status (v2 → v3)

### ✅ Completed
- All section components ported with vaporwave styling
- All CSS files migrated (Hero, Identity, Location, TechStack, Projects, DataCamp, Contact)
- All assets copied to `public/assets/`
- Image paths updated to Next.js public folder convention
- TypeScript types added throughout
- Contact form with glass morphism styling and validation
- Loading screen with 3-second grid animation
- Navbar and Footer components
- API route structure in place (12 endpoints)
- Supabase database schema created (6 tables)
- External API fetchers (GitHub REST, LeetCode GraphQL)

### ⚠️ Environment-Dependent (Works when configured)
- Supabase connection (requires env vars)
- GitHub data fetching (requires GITHUB_TOKEN, GITHUB_USERNAME)
- LeetCode submissions (requires LEETCODE_USERNAME)
- Contact form email sending (requires EMAIL_USER, EMAIL_PASS)
- Cron jobs (requires CRON_SECRET, Vercel Cron setup)

### 🔴 Known Issues
1. Image serving route (`/api/projects/images/[filename]`) not implemented
2. Database not seeded with initial data (populated via manual refresh or cron)
3. Rate limiting uses in-memory store (needs Redis for production)
4. Some TypeScript `any` types (should use specific interfaces)
5. No error boundaries for graceful failure handling
6. Admin dashboard incomplete

### 📊 What Works (Frontend-Only)
- ✨ Full vaporwave visual design with all effects
- ✨ All 7 sections render correctly with styling
- ✨ Responsive design (mobile, tablet, desktop)
- ✨ Animations (3D grid, floating shapes, glow effects)
- ✨ Contact form with client-side validation
- ✨ Loading screen with 3-second minimum display
- ✨ Smooth navigation and transitions

### 🔌 What Needs Backend Setup
- GitHub projects and commit calendar (requires `/api/refresh-github`)
- LeetCode submissions grid (requires `/api/refresh-leetcode`)
- DataCamp courses and projects (requires database seeding)
- Contact form email sending (requires Nodemailer + Gmail setup)
- Scheduled data refresh (requires Vercel Cron + CRON_SECRET)

## Development

### Commands
```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Adding New Sections
1. Create component in `src/components/sections/NewSection.tsx`
2. Create CSS file `src/components/sections/NewSection.css`
3. Add to `src/app/page.tsx` imports and JSX
4. Maintain vaporwave aesthetic (gradients, floating elements, glass morphism)

### Styling Guidelines
- **Always** use vaporwave color palette (cyan, magenta, purple)
- **Always** add floating elements (ellipses, stars, wireframes)
- **Always** use glass morphism for cards (`backdrop-filter: blur()`)
- **Always** add smooth animations and transitions
- **Never** use plain backgrounds or solid colors

## Deployment

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Configure build settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
4. Enable Vercel Cron for data refresh jobs

### Supabase Setup
1. Create project in Supabase dashboard
2. Run migration scripts from `scripts/` directory
3. Copy connection strings to `.env.local`
4. Set up Row Level Security (RLS) policies

## Troubleshooting

### Build Errors
- **"Module not found" for assets:** Use `/assets/...` not relative paths
- **"Invalid supabaseUrl":** Add Supabase env vars to `.env.local`
- **TypeScript errors:** Check type definitions in `src/types/`

### Styling Issues
- **CSS not loading:** Check import path in component
- **Assets not showing:** Verify file exists in `public/assets/`
- **Fonts not loading:** Check `src/app/layout.tsx` font imports

### Runtime Errors
- **API route fails:** Check environment variables
- **Data not loading:** Verify Supabase connection
- **Form submission fails:** Check `/api/contact` route configuration

## Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

---

**For detailed migration steps and original architecture, see parent directory's `CLAUDE.md`**
