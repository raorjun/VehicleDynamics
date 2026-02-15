# BobDyn Documentation

VitePress-based documentation site for BobDyn vehicle dynamics framework.

## Tech Stack

- **VitePress** - Documentation-focused static site generator
- **KaTeX** - Fast math rendering (10-100x faster than MathJax)
- **Vue 3** - VitePress framework
- **Markdown** - Content authoring

## Design

GNOME Nautilus-inspired dark theme with:
- System font stack
- 75ch max text width for readability
- Sticky navigation with Bob logo
- Clean, minimal interface

## Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## Project Structure

```
Docs/
├── .vitepress/
│   ├── config.ts           # Site configuration
│   └── theme/
│       ├── index.ts        # Theme entry point
│       └── style.css       # GNOME Nautilus theme
├── docs/
│   ├── index.md            # Home page
│   ├── metrics.md          # Vehicle performance metrics
│   └── public/
│       ├── bob.png         # Logo
│       └── CNAME           # GitHub Pages domain
└── package.json
```

## Content Editing

All content is written in Markdown:

- **docs/index.md** - Home page content
- **docs/metrics.md** - Metrics reference with math equations

### Math Equations

Use KaTeX syntax:

```markdown
Inline math: $a_y = \frac{v^2}{R}$

Display math:
$$
K = \frac{\partial \delta}{\partial a_y}
$$
```

### Custom Styling

Use HTML classes for special styling:

```markdown
<p class="section-intro">
Introductory text with muted color
</p>

<p class="closing-note">
Closing note with extra spacing
</p>
```

## Deployment

Site deploys to GitHub Pages at **bobdyn.com** via:

```bash
npm run deploy
```

This builds the site and pushes to the `gh-pages` branch.

## Features

- ✅ Dark mode only (no light mode toggle)
- ✅ Fast math rendering with KaTeX
- ✅ Clean navigation with Bob logo
- ✅ Responsive design
- ✅ Text width constraints for readability
- ✅ Sticky header
- ✅ No VitePress branding or extras
