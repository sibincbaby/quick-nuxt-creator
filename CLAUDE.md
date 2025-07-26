# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Artisan's Canvas** - A modern React-based artist portfolio website built for showcasing artwork and facilitating WhatsApp-based customer inquiries. Uses React 18, TypeScript, Vite, Tailwind CSS, and Sanity CMS.

## Common Commands

```bash
# Development
npm run dev              # Start dev server on port 8080
npm run build           # Production build
npm run build:dev       # Development build
npm run lint           # ESLint code linting
npm run preview        # Preview production build
```

## Architecture Overview

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite (SWC)
- **Styling**: Tailwind CSS + shadcn/ui component library (40+ components)
- **CMS**: Sanity.io for content management
- **State**: TanStack Query for server state
- **Routing**: React Router DOM v6

### Key Directories
- `src/components/ui/` - Complete shadcn/ui implementation
- `src/pages/` - Route components (Index, Shop, ArtworkDetail, Profile, Portfolio)
- `src/utils/sanityQueries.ts` - All data fetching functions
- `src/utils/whatsapp.ts` - WhatsApp integration utilities
- `src/lib/sanity.ts` - Sanity client configuration
- `src/types/sanity.ts` - TypeScript definitions for CMS schema

### Content Architecture (Sanity CMS)
- **Artwork**: Images, pricing, dimensions, categories, descriptions
- **Artist Profile**: Bio, contact info, social media, working hours
- **Site Settings**: WhatsApp integration, business details

## Development Guidelines

### Path Aliases
- Use `@/` for imports (maps to `src/`)
- Example: `import { Button } from '@/components/ui/button'`

### Component Patterns
- shadcn/ui components for consistent design system
- Mobile-first responsive design
- Custom hooks in `src/hooks/`
- Lazy loading for images via `LazyImage.tsx`

### Data Fetching
- All Sanity queries in `utils/sanityQueries.ts`
- TanStack Query for caching and state management
- No global client state management needed

### WhatsApp Integration
- Pre-filled message templates in `utils/whatsapp.ts`
- Contact forms redirect to WhatsApp with artwork details

## Environment Variables

Required for development:
```bash
VITE_SANITY_PROJECT_ID=your_sanity_project_id
VITE_SANITY_DATASET=production
```

## Configuration Notes

- **TypeScript**: Relaxed config for rapid development (unused vars/params ignored)
- **ESLint**: Modern flat config with React hooks rules
- **Vite**: React SWC plugin for fast builds
- **Tailwind**: Custom theme integrated with shadcn/ui CSS variables

## Key Features to Understand

- Search/filter across artwork (title, description, categories, mediums)
- Responsive navigation with `BottomNavigation.tsx` for mobile
- Image optimization through Sanity CDN with lazy loading
- Complete CRUD operations via Sanity queries
- Dark mode support via next-themes