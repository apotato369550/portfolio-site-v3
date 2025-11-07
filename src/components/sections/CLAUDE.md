# Section Components

## Overview
This directory contains all major page sections for the portfolio site. Each section is a standalone component with its own styling and logic.

## Component Structure
Each section follows this pattern:
```
SectionName/
├── index.tsx          # Component logic (or SectionName.tsx)
└── SectionName.css    # Component styles
```

## Sections

### 1. Hero (`Hero.tsx`)
**Purpose:** Landing section with vaporwave sun and 3D grid
**Key Elements:**
- Animated JAY text with glow effect
- Vaporwave background image
- 3D perspective grid at bottom
- Floating geometric shapes (ellipses, stars, cubes, wireframes)
- Role descriptions (Fullstack Developer, Data Scientist, etc.)

**CSS Classes:**
- `.hero-image-container` - Background with grid overlay
- `.jay-container`, `.jay-glow` - Glowing text effect
- `.floating-ellipse`, `.floating-star`, etc. - Animated decorations

### 2. IdentitySection (`IdentitySection.tsx`)
**Purpose:** "Who am I, really?" - Personal traits showcase
**Key Elements:**
- Vaporwave statue image (left side)
- 3 content cards: Curiosity, Scholarly, Passion
- Night sky with animated stars
- Large ellipses behind statue
- Side pillars (hidden on mobile)

**CSS Classes:**
- `.identity-gradient-container` - Purple gradient background
- `.statue-ellipse-*` - Glowing ellipses behind statue
- `.identity-information-*` - Glass morphism content cards

### 3. LocationSection (`LocationSection.tsx`)
**Purpose:** "Where am I?" - Location and education info
**Key Elements:**
- Cebu cityscape image
- Vaporwave palm trees background
- 2 questions + 2 answers grid layout
- Floating crystals and wireframe shapes

**CSS Classes:**
- `.location-gradient-container` - Blue gradient background
- `.cebu` - City image with glow effect
- `.location-title`, `.compact-answer` - Question/answer cards

### 4. TechStackSection (`TechStackSection.tsx`)
**Purpose:** "What do I work with?" - Tech skills showcase
**Key Elements:**
- 3 category cards:
  - Languages and Frameworks (8 icons)
  - Tools and Platforms (5 icons)
  - Currently Exploring (2 icons)
- Hover effects on icons
- Floating crystals, wireframes, orbs

**CSS Classes:**
- `.tech-stack-gradient-container` - Purple to blue gradient
- `.tech-category-card` - Glass morphism card with shimmer effect
- `.tech-stack-icon` - Icon hover effects with glow

**Assets Required:**
- 15 tech icon PNGs in `/assets/TechStackSection/`

### 5. ProjectsSection (`ProjectsSection.tsx`)
**Purpose:** GitHub projects, commits, and LeetCode activity
**Key Elements:**
- Projects grid (fetched from API)
- GitHub commit calendar (react-github-calendar)
- Recent commits list
- LeetCode submissions grid
- Loading states for each subsection

**CSS Classes:**
- `.projects-gradient-container` - Dark purple gradient
- `.glass-morphism` - Cards for calendar/commits
- `.github-calendar-vaporwave` - Custom calendar styling

**Data Sources:**
- `/api/recent-projects`
- `/api/recent-commits`
- `/api/leetcode-submissions`

### 6. DataCampSection (`DataCampSection.tsx`)
**Purpose:** DataCamp courses and projects showcase
**Key Elements:**
- Projects grid (5 projects with images)
- Courses grid (multiple courses with certificates)
- Rainbow emphasis on "DataCamp" text
- Floating ellipses, stars, wireframes

**CSS Classes:**
- `.datacamp-gradient-container` - Purple gradient
- `.datacamp-emphasis` - Rainbow animated text
- `.datacamp-card` - Project/course cards with shimmer

**Data Sources:**
- `/api/datacamp-projects`
- `/api/datacamp-courses`

### 7. ContactSection (`ContactSection/index.tsx`)
**Purpose:** Contact form with vaporwave styling
**Key Elements:**
- Glass morphism form container
- Italic neon gradient title "Get In Touch"
- 3 form fields: Name, Email, Message
- Cyan-themed form inputs
- Floating ellipses, stars, wireframes
- Success/error feedback messages

**CSS Classes:**
- `.contact-gradient-container` - Vaporwave background image
- `.contact-emphasis` - Cyan-to-green gradient italic title
- `.glass-morphism` - Form card with backdrop blur
- `.contact-input` - Transparent inputs with cyan borders
- `.contact-submit-btn` - Cyan gradient button

**Form Handling:**
- Client-side validation
- POST to `/api/contact`
- Spam protection (rate limiting)

## Common Patterns

### Vaporwave Styling Requirements
All sections must include:
1. **Gradient background** - Purple/pink/cyan/blue gradients
2. **Floating elements** - At least 3 types (ellipses, stars, wireframes, orbs, crystals)
3. **Glass morphism** - Content cards with `backdrop-filter: blur()`
4. **Smooth animations** - Floating, pulsing, rotating effects
5. **Glow effects** - Text shadows, box shadows with neon colors
6. **Responsive design** - Mobile, tablet, desktop breakpoints

### CSS Animation Patterns
```css
/* Floating animation */
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0); opacity: 0.3; }
  50% { transform: translateY(-20px) rotate(180deg); opacity: 0.6; }
}

/* Pulsing glow */
@keyframes pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

/* Shimmer effect */
@keyframes shimmer {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
```

### Responsive Breakpoints
```css
/* Mobile first approach */
@media (max-width: 640px)  { /* Mobile */ }
@media (max-width: 768px)  { /* Tablet portrait */ }
@media (max-width: 1024px) { /* Tablet landscape */ }
@media (min-width: 1280px) { /* Desktop */ }
@media (min-width: 1536px) { /* Large desktop */ }
```

## Adding New Sections

### Checklist
1. [ ] Create component file in this directory
2. [ ] Create matching CSS file with vaporwave styling
3. [ ] Add 'use client' directive if using hooks/interactivity
4. [ ] Include floating elements (ellipses, stars, wireframes)
5. [ ] Add gradient background
6. [ ] Use glass morphism for content cards
7. [ ] Add smooth animations
8. [ ] Test responsive design
9. [ ] Import and add to `src/app/page.tsx`
10. [ ] Update this CLAUDE.md

### Template Structure
```tsx
'use client' // If needed

import './NewSection.css'

export default function NewSection() {
  return (
    <div id="new-section" className="relative overflow-hidden">
      <div className="gradient-container h-full w-full relative">

        {/* Floating elements */}
        <div className="floating-elements absolute inset-0 z-1">
          {/* Add ellipses, stars, wireframes, etc. */}
        </div>

        {/* Main content */}
        <div className="container relative z-10">
          {/* Your content here */}
        </div>
      </div>
    </div>
  )
}
```

## Troubleshooting

### Component Not Rendering
- Check import in `src/app/page.tsx`
- Verify CSS file is imported in component
- Check for TypeScript errors

### Styling Issues
- Verify CSS classes match between component and CSS file
- Check if CSS file path is correct in import
- Ensure vaporwave colors are used (not generic gray/black)

### Animation Not Working
- Check `@keyframes` defined in CSS
- Verify `animation` property applied to element
- Test in different browsers (some may need prefixes)

### Image Assets Not Loading
- Verify file exists in `/public/assets/SectionName/`
- Check path is absolute (`/assets/...` not relative)
- Ensure filename matches exactly (case-sensitive)

## Performance Tips
- Use `'use client'` only when necessary (prefer Server Components)
- Lazy load heavy images with Next.js Image component
- Minimize CSS animations on mobile for better performance
- Use `will-change` CSS property for animated elements
- Avoid too many simultaneous animations (max 10-15 floating elements)

---

**For overall project context, see `/CLAUDE.md` in project root**
