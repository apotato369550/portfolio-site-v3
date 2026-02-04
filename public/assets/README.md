# Assets Organization

This folder contains all static assets (images, PDFs, and data files) organized for easy discovery and extension.

## Structure

```
assets/
├── images/                  # All image files
│   ├── identity/           # Identity/About section images
│   ├── location/           # Location section images
│   ├── techstack/          # Tech stack icons
│   ├── projects/           # Project preview images
│   ├── datacamp/           # DataCamp course/project images
│   ├── backgrounds/        # Background and decorative elements
│   └── [loose icons]       # Common icons (github logo, hamburger, etc.)
└── data/                    # Data files (JSON, PDFs, documents)
    ├── *.json              # Data files (projects, courses, etc.)
    └── *.pdf               # Certificates and documents
```

## Usage Examples

### Importing Images in Components

**In `.tsx` files (Next.js):**
```tsx
<img src="/assets/images/identity/vaporwave_statue.png" alt="..." />
```

**In CSS files:**
```css
background-image: url('/assets/images/backgrounds/vaporwave_background.png');
```

### Accessing Data Files

```typescript
// Fetch JSON data
const data = await fetch('/assets/data/projects.json').then(r => r.json());

// Link to PDFs
<a href="/assets/data/certificate.pdf">Download</a>
```

## Adding New Assets

### Images
1. Place image in appropriate subdirectory under `images/`
2. Use absolute path in code: `/assets/images/section/filename.ext`
3. If category doesn't exist, create subdirectory in `images/`

### Data Files
1. Place JSON, PDF, or document in `data/` directory
2. Reference via `/assets/data/filename.ext`
3. Keep filenames lowercase with hyphens (e.g., `new-project.json`)

### Creating New Image Categories

If you need a new section, just create a subdirectory:
```bash
mkdir -p public/assets/images/new-section/
```

Then place your images there and reference via:
```
/assets/images/new-section/filename.ext
```

## Image Naming Convention

- Use **lowercase** filenames
- Use **hyphens** for spaces (not underscores)
- Be descriptive: `vaporwave-background.png` not `bg.png`
- Example: `antarctic-penguin-species.jpg`

## Tips for Maintenance

- Delete unused files regularly
- Keep similar assets grouped in same subdirectory
- Use consistent naming across related assets
- Update this README if you create new categories
