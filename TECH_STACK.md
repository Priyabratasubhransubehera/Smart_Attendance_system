# 🛠️ PeopleHub - Technology Stack

## Frontend Framework

### React 18.3.1
- Modern hooks-based architecture
- Functional components throughout
- Virtual DOM for efficient updates
- Component-based architecture

## Routing

### React Router 7.13.0
- Data mode routing pattern
- Protected routes with HOC
- Role-based route guards
- Nested routing support
- Browser history API

## Styling

### Tailwind CSS v4.1.12
- Utility-first CSS framework
- Dark theme implementation
- Custom color palette
- Responsive design utilities
- @layer directives for organization

### Custom Theme
- CSS custom properties for theming
- Emerald/Teal gradient accents
- Dark mode optimized colors
- Consistent spacing scale
- Custom radius values

## UI Components

### Radix UI (Complete Suite)
- `@radix-ui/react-accordion` - Collapsible sections
- `@radix-ui/react-alert-dialog` - Confirmation dialogs
- `@radix-ui/react-avatar` - User avatars
- `@radix-ui/react-checkbox` - Form checkboxes
- `@radix-ui/react-dialog` - Modal dialogs
- `@radix-ui/react-dropdown-menu` - Dropdown menus
- `@radix-ui/react-label` - Form labels
- `@radix-ui/react-popover` - Popovers
- `@radix-ui/react-progress` - Progress bars
- `@radix-ui/react-radio-group` - Radio buttons
- `@radix-ui/react-scroll-area` - Custom scrollbars
- `@radix-ui/react-select` - Select dropdowns
- `@radix-ui/react-separator` - Visual separators
- `@radix-ui/react-slider` - Range sliders
- `@radix-ui/react-switch` - Toggle switches
- `@radix-ui/react-tabs` - Tab navigation
- `@radix-ui/react-tooltip` - Tooltips

**Why Radix UI?**
- Unstyled, accessible primitives
- ARIA compliant
- Keyboard navigation
- Focus management
- Screen reader support

## Icons

### Lucide React 0.487.0
- 1000+ consistent icons
- Tree-shakeable
- Lightweight
- Customizable size and color
- SVG-based

## State Management

### Local State
- React useState for component state
- No global state library needed
- Simple and maintainable
- Prop drilling avoided with composition

### Form State
- Controlled components
- React Hook Form 7.55.0 ready
- Form validation with HTML5 + custom logic
- Error handling and display

## Data Fetching

### Axios 1.16.1
- Promise-based HTTP client
- Request/Response interceptors
- Automatic JWT token injection
- 401 error handling
- Mock API integration ready

### Mock API
- Simulated network delays
- Realistic data structures
- CRUD operations
- Error simulation
- Promise-based responses

## Authentication

### JWT (JSON Web Tokens)
- Token stored in localStorage
- Automatic expiration handling
- Role-based access control
- Secure route protection

### Storage
- localStorage for persistence
- User data caching
- Token management
- Session handling

## Utilities

### date-fns 3.6.0
- Date formatting
- Date manipulation
- Difference calculations
- Locale support ready

### clsx 2.1.1
- Conditional className handling
- String concatenation
- Array and object support

### tailwind-merge 3.2.0
- Intelligent class merging
- Prevents style conflicts
- Optimizes output

### class-variance-authority 0.7.1
- Component variants
- Type-safe styling
- Reusable style patterns

## Notifications

### Sonner 2.0.3
- Beautiful toast notifications
- Customizable styling
- Position control
- Auto-dismiss
- Action buttons support

## Charts & Visualization

### Recharts 2.15.2
- Ready for data visualization
- Responsive charts
- Animation support
- Customizable styling
- TypeScript support

## Development Tools

### TypeScript
- Type safety
- IntelliSense support
- Interface definitions
- Compile-time error checking

### Vite 6.3.5
- Fast development server
- Hot Module Replacement (HMR)
- Optimized builds
- ES modules support

### PostCSS
- CSS processing
- Autoprefixer
- Modern CSS features

## Build Tools

### Build Process
1. Vite bundles application
2. Tailwind processes CSS
3. TypeScript compiles to JS
4. Assets optimized
5. Production bundle created

### Output
- Minified JavaScript
- Optimized CSS
- Hashed filenames
- Source maps (dev)

## Code Quality

### Type Safety
- TypeScript strict mode
- Interface definitions
- Type inference
- Generic types

### Component Structure
```
Component.tsx
├── Imports
├── Types/Interfaces
├── Component Function
├── State Management
├── Effects
├── Event Handlers
├── Render Logic
└── Export
```

## Performance Optimizations

### React
- Functional components (lighter)
- Minimal re-renders
- Efficient state updates
- Key props on lists

### CSS
- Tailwind JIT (Just-In-Time)
- Purged unused styles
- Minimal CSS bundle
- CSS custom properties

### Assets
- SVG icons (scalable)
- Lazy loading ready
- Code splitting ready
- Tree shaking enabled

## Browser APIs Used

- **localStorage** - Auth persistence
- **History API** - Routing
- **Fetch/Axios** - HTTP requests
- **CSS Custom Properties** - Theming

## Accessibility Features

### WCAG Compliance
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus indicators
- Screen reader support

### Radix UI Benefits
- Built-in accessibility
- Keyboard shortcuts
- Focus management
- ARIA attributes

## File Structure

```
src/
├── app/
│   ├── components/
│   │   ├── ui/              # Reusable UI (Radix + Tailwind)
│   │   ├── AppLayout.tsx    # Main layout
│   │   ├── RequireAuth.tsx  # Auth guard
│   │   └── LoadingScreen.tsx
│   ├── lib/
│   │   ├── axios.ts         # HTTP client config
│   │   ├── auth.ts          # Auth utilities
│   │   └── mockApi.ts       # Mock data & API
│   ├── pages/
│   │   ├── admin/
│   │   ├── hr/
│   │   ├── manager/
│   │   ├── employee/
│   │   ├── Login.tsx
│   │   ├── NotFound.tsx
│   │   └── Unauthorized.tsx
│   ├── types/
│   │   └── index.ts         # TypeScript types
│   ├── routes.tsx           # Route config
│   └── App.tsx              # Root component
├── styles/
│   ├── fonts.css            # Font imports
│   ├── tailwind.css         # Tailwind directives
│   ├── theme.css            # Theme variables
│   └── index.css            # Main CSS
└── imports/                 # Figma assets
```

## Environment Variables

```env
VITE_API_URL=http://localhost:3000/api
```

## Package Manager

### pnpm
- Faster installs
- Efficient disk usage
- Strict dependency resolution
- Workspace support

## Browser Support

- **Chrome** 90+ ✅
- **Firefox** 88+ ✅
- **Safari** 14+ ✅
- **Edge** 90+ ✅

## Mobile Support

- **iOS Safari** 14+ ✅
- **Chrome Android** 90+ ✅
- **Samsung Internet** 14+ ✅

## Future-Ready

### Easy to Add
- Real backend API
- Redux/Zustand (if needed)
- i18n (internationalization)
- Testing (Jest/Vitest)
- E2E tests (Playwright/Cypress)
- PWA features
- Analytics
- Error tracking (Sentry)

### Scalability
- Component library ready
- API integration ready
- State management ready
- Testing infrastructure ready
- CI/CD pipeline ready

## Dependencies Summary

| Category | Count | Main Packages |
|----------|-------|---------------|
| **UI Framework** | 1 | React |
| **Routing** | 1 | React Router |
| **Styling** | 1 | Tailwind CSS |
| **Components** | 20+ | Radix UI suite |
| **HTTP Client** | 1 | Axios |
| **Utilities** | 5+ | date-fns, clsx, etc. |
| **Icons** | 1 | Lucide React |
| **Notifications** | 1 | Sonner |
| **Build Tools** | 2 | Vite, TypeScript |

## Total Package Count
- **Dependencies:** 64
- **Dev Dependencies:** 3
- **Peer Dependencies:** 2

## Bundle Size (Estimated)
- **Main JS:** ~200KB (gzipped)
- **CSS:** ~20KB (gzipped)
- **Icons:** Lazy-loaded as needed
- **Total Initial Load:** ~220KB

## Why This Stack?

### Modern & Maintainable
- Latest React patterns
- TypeScript for safety
- Tailwind for speed
- Vite for performance

### Developer Experience
- Fast HMR
- Great TypeScript support
- Excellent tooling
- Active communities

### Production Ready
- Battle-tested libraries
- Excellent documentation
- Regular updates
- Security maintained

### Performance
- Small bundle size
- Fast load times
- Smooth interactions
- Optimized rendering

### Accessibility
- Radix UI compliance
- ARIA support
- Keyboard nav
- Screen readers

---

**Built with modern web technologies for a fast, accessible, and maintainable employee management system. 🚀**
