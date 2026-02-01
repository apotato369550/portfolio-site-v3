# Portfolio Site V3

A vaporwave-styled personal portfolio website built with Next.js 16+, React 19, TypeScript, Tailwind CSS, and Supabase PostgreSQL.

**Status**: Frontend complete and fully functional. Backend APIs ready (require environment configuration).

## Quick Start

### Prerequisites
- Node.js 18+ (with npm)
- Supabase account (for database)
- GitHub personal access token (optional, for GitHub data)
- Gmail account with app password (optional, for contact form emails)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd portfolio-site-v3

# Install dependencies
npm install

# Create .env.local file (see Environment Setup below)
cp .env.example .env.local
# Edit .env.local with your credentials

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site. The page auto-updates when you edit files.

## Development Commands

```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint checks
```

## Environment Setup

### Minimal Setup (Frontend Only)
The site displays with full vaporwave styling even without backend configuration. Create `.env.local`:

```env
# These are NOT required for frontend to work
# Leave them blank initially to test the UI
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### Full Setup (With Data APIs)
To display GitHub projects, LeetCode submissions, and enable contact form emails, add credentials:

```env
# Supabase (required for all data fetching)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# GitHub API (required for GitHub projects/commits)
GITHUB_TOKEN=ghp_xxxxxxxxxxxx
GITHUB_USERNAME=your-github-username

# LeetCode API (required for LeetCode submissions)
LEETCODE_USERNAME=your-leetcode-username
LEETCODE_SESSION_COOKIE=your-session-cookie    # Optional

# Email (required for contact form emails)
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password             # Not your regular password

# Security (required for cron jobs and manual refresh)
CRON_SECRET=your-secret-token
REFRESH_TOKEN=your-refresh-token
```

## What Works Now

### Frontend (No Backend Required)
- All 7 sections render with complete vaporwave aesthetic:
  - Hero section with animated "JAY" text and 3D grid
  - Identity section with statue and trait cards
  - Location section with Cebu cityscape info
  - Tech stack section with 15 technology icons
  - Projects section (layout ready, data loads when API configured)
  - DataCamp section (layout ready, data loads when API configured)
  - Contact section with form validation
- Navbar with smooth scroll navigation
- Footer with social links
- LoadingScreen with 3-second grid animation
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions

### Data APIs (Requires Backend Configuration)
- `GET /api/recent-projects` - Fetch GitHub projects from Supabase
- `GET /api/recent-commits` - Fetch GitHub commit activity
- `GET /api/leetcode-submissions` - Fetch LeetCode submissions
- `GET /api/datacamp-projects` - Fetch DataCamp projects
- `GET /api/datacamp-courses` - Fetch DataCamp courses
- `POST /api/contact` - Handle contact form submissions
- `GET /api/cron/refresh-data` - Scheduled data refresh (Vercel Cron)
- `GET /api/refresh-github` - Manual GitHub data refresh
- `GET /api/refresh-leetcode` - Manual LeetCode data refresh
- `GET /api/health` - Health check endpoint
- `GET /api/test-db` - Database connection test

## What Needs Backend

Without environment variables configured:
- GitHub projects section shows empty grid
- Commit calendar and LeetCode submissions section shows empty
- DataCamp courses and projects sections show empty
- Contact form validates locally but doesn't send emails
- Scheduled data refresh (cron) doesn't run

**To populate data:**
1. Configure environment variables in `.env.local`
2. Manually trigger refresh: `curl http://localhost:3000/api/refresh-github?token=YOUR_REFRESH_TOKEN`
3. Or wait for Vercel Cron to run (if deployed)

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes (data fetching, forms, cron jobs)
│   ├── admin/                    # Admin dashboard (incomplete)
│   ├── layout.tsx                # Root layout with fonts
│   └── page.tsx                  # Home page (all sections)
├── components/
│   ├── sections/                 # Page sections (Hero, Identity, etc.)
│   ├── Navbar.tsx                # Navigation
│   ├── Footer.tsx                # Footer
│   ├── LoadingScreen.tsx         # 3-second loading animation
│   └── [various].css             # Component styles
├── lib/
│   ├── fetchers/                 # External API integchers (GitHub, LeetCode)
│   ├── supabase.ts               # Supabase client initialization
│   └── [utilities].ts            # Helper functions and loggers
├── types/
│   └── index.ts                  # TypeScript interface definitions
└── app/
    └── globals.css               # Global styles and Tailwind imports

public/assets/
├── TechStackSection/             # 15 tech icons
├── courses/                      # DataCamp course images
├── certs/                        # Certificate images
├── projects/                     # Project thumbnails
├── IdentitySection/              # Statue images
├── LocationSection/              # Cebu cityscape images
└── [various backgrounds]         # Vaporwave background images
```

## Styling & Vaporwave Aesthetic

The site uses a strict vaporwave design system:

**Colors**: Purple (#8B00FF), Magenta (#FF0080), Cyan (#39D9FD), Dark background (#1A0033)

**Effects**:
- Glass morphism (backdrop blur + transparent backgrounds)
- Neon glow (text shadows and box shadows)
- Floating animations (ellipses, stars, wireframes, cubes)
- Gradient text and backgrounds
- Smooth transitions and hover effects

**Guidelines for Modifications**:
- Do not use plain colors or gray backgrounds
- Always add floating decorative elements
- Use glass morphism for content cards
- Apply neon glow to headings and interactive elements
- Maintain gradient backgrounds in all sections
- Test responsive design on mobile and desktop

See `ARCHITECTURE.md` for detailed CSS patterns and animations.

## Troubleshooting

### Frontend Issues

**"Module not found" errors for assets**
- Check file exists in `public/assets/`
- Use absolute paths: `/assets/image.png` (not relative `./assets/image.png`)

**CSS not loading or styling looks wrong**
- Verify CSS file is imported in component: `import './Component.css'`
- Check class names match between component and CSS file
- Ensure CSS uses absolute paths for backgrounds: `url("/assets/...")`

**Fonts not loading**
- Check `src/app/layout.tsx` imports Google Fonts
- Clear browser cache and rebuild: `npm run build`

**Animations not smooth**
- Check browser supports `backdrop-filter` (some older browsers don't)
- Reduce number of simultaneously floating elements on mobile
- Test in different browsers (Chrome, Firefox, Safari)

### API & Data Issues

**API routes return 500 error**
- Check environment variables are set correctly in `.env.local`
- Run `npm run dev` and check terminal for error logs
- Test with `curl http://localhost:3000/api/test-db` to verify database connection

**Supabase connection fails**
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct format: `https://xxx.supabase.co`
- Check `SUPABASE_SERVICE_ROLE_KEY` is a valid service role key (not anon key)
- Ensure Supabase project exists and is active

**Data sections show empty**
- Check if API endpoints return data: `curl http://localhost:3000/api/recent-projects`
- If empty array, run manual refresh: `curl http://localhost:3000/api/refresh-github?token=YOUR_TOKEN`
- Check Supabase tables have data: Log in to Supabase dashboard and query tables

**Contact form doesn't send emails**
- Verify `EMAIL_USER` and `EMAIL_PASS` are set
- Use Gmail app password (not regular password)
- Check Gmail account allows "Less secure app access" (or use 2FA + app password)
- Test in browser DevTools Console to see error: `fetch('/api/contact', {...})`

### Performance Issues

**Slow page load**
- Check DevTools Network tab for large asset files
- Images should be optimized PNG/JPG files
- Consider using Next.js Image component for large backgrounds

**Animations stuttering on mobile**
- Reduce number of floating elements
- Use `will-change: transform` on animated elements
- Test on actual device (not browser emulator)

**API responses slow**
- Check database query performance in Supabase dashboard
- Consider reducing data limits in API routes (e.g., limit results to 10 items)

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel project
3. Add environment variables in Vercel dashboard
4. Deploy with default settings
5. Enable Vercel Cron in `vercel.json` (if using scheduled refresh)

### Other Platforms

The site can deploy to any Node.js hosting (Render, Railway, Fly.io, etc.) but requires:
- Node.js 18+
- Environment variables configured
- Build command: `npm run build`
- Start command: `npm start`

## Documentation

- **ARCHITECTURE.md**: Complete implementation reference (component hierarchy, API routes, data flows, styling, assets)
- **CLAUDE.md**: Project philosophy, constraints, migration notes from v2
- **CHANGELOG.md**: Version history and changes
- **docs/INCOMPLETE_FEATURES.md**: Detailed tracking of incomplete features and blockers

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Architecture & Implementation

For detailed information about:
- Component hierarchy and data flow → See `ARCHITECTURE.md`
- Project philosophy and constraints → See `CLAUDE.md`
- Incomplete features and blockers → See `docs/INCOMPLETE_FEATURES.md`
- Version history → See `CHANGELOG.md`

## License

This project is part of a personal portfolio. All code and assets are proprietary.
