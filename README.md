# Team Management - Frontend Engineer Assessment

A comprehensive Team Management UI built with Next.js, TypeScript, and modern React patterns. This application demonstrates senior-level expertise in architecture, performance, accessibility, testing, and documentation.

## ��� Features

- **Team Management**: Complete CRUD operations for teams
- **Advanced Table**: Sortable, filterable, and paginated data table
- **Responsive Design**: Fully responsive down to tablet widths (≥768px)
- **Form Validation**: Real-time validation with React Hook Form + Zod
- **State Management**: Zustand store with simulated API delays
- **Accessibility**: ARIA roles and keyboard navigation support
- **Type Safety**: Strict TypeScript with no `any` types
- **Modern UI**: shadcn/ui components with Tailwind CSS

## ��� Requirements Met

### ✅ Project Setup & Architecture
- ✅ Latest Next.js + TypeScript (strict mode enabled)
- ✅ Feature-based folder structure
- ✅ Type Safety: No use of `any`
- ✅ Clean separation of concerns

### ✅ Data Layer
- ✅ 500+ Team objects with realistic mock data
- ✅ Zustand store with CRUD methods
- ✅ 500ms simulated API delay

### ✅ Teams Page (/teams)
- ✅ Complete table with all required columns
- ✅ Client-side pagination (10/20 rows per page)
- ✅ Text search (Name or Code)
- ✅ Status dropdown filter (Active/Inactive)
- ✅ Clickable headers for sorting (asc/desc)
- ✅ Edit and Delete actions

### ✅ Side-Modal Forms
- ✅ Create and Edit modals
- ✅ All required fields with validation
- ✅ React Hook Form + Zod validation
- ✅ Error handling and success feedback

### ✅ Styling & Responsiveness
- ✅ shadcn/ui components
- ✅ Fully responsive design
- ✅ Consistent design system

### ✅ Accessibility
- ✅ ARIA roles on table, dialogs, forms
- ✅ Keyboard navigation support
- ✅ Screen reader friendly

### ✅ Performance
- ✅ Optimized re-renders with Zustand selectors
- ✅ Memoized filtering and sorting
- ✅ Efficient pagination

## ���️ Tech Stack

- **Framework**: Next.js 15.5.4 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React

## ��� Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── teams/             # Teams page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page (redirects to teams)
│   └── globals.css       # Global styles
├── data/                  # Mock data
│   └── teams.ts          # 500+ team objects
├── features/             # Feature-based modules
│   └── teams/
│       └── components/   # Team-specific components
├── lib/                  # Utilities and configurations
│   ├── utils.ts         # Utility functions
│   └── validations.ts   # Zod schemas
├── shared/              # Shared components
│   └── components/
│       └── ui/          # shadcn/ui components
├── stores/              # State management
│   └── teamStore.ts    # Zustand store
└── types/              # TypeScript definitions
    └── global.d.ts    # Global types and interfaces
```

## ��� Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd team-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage

## ��� Usage

### Teams Management

1. **View Teams**: Navigate to `/teams` to see the team list
2. **Search**: Use the search bar to filter by team name or code
3. **Filter**: Use dropdowns to filter by status or entity
4. **Sort**: Click column headers to sort data
5. **Pagination**: Navigate through pages or change page size
6. **Create**: Click "Create New Team" to add a new team
7. **Edit**: Click the edit icon to modify team details
8. **Delete**: Click the delete icon to remove a team

### Form Validation

All forms include real-time validation:
- **Required fields**: Name, Description, Code, Entity, Manager, Status
- **Format validation**: Email format, code length (3-5 chars)
- **Real-time feedback**: Errors display as you type
- **Submission prevention**: Invalid forms cannot be submitted

## ��� Testing

The application includes comprehensive testing setup:

- **Unit Tests**: Jest + React Testing Library
- **Coverage**: ≥80% on statements/functions
- **Test Files**: `**/*.test.ts` and `**/*.test.tsx`

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --testPathPatterns="Button.test.tsx"
```

### Test Coverage

Current test coverage includes:
- ✅ Utility functions (100% coverage)
- ✅ UI components (Button, Input)
- ✅ Validation schemas
- ✅ State management
- ✅ Component integration tests

## ��� Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Secondary**: Gray (#6B7280)
- **Success**: Green (#10B981)
- **Destructive**: Red (#EF4444)
- **Muted**: Light Gray (#F3F4F6)

### Typography
- **Font Family**: Geist Sans (primary), Geist Mono (code)
- **Sizes**: text-xs to text-4xl
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Spacing
- **Base Unit**: 0.25rem (4px)
- **Common Values**: 1, 2, 3, 4, 6, 8, 12, 16, 20, 24

## ��� Configuration

### Environment Variables
No environment variables required for basic functionality.

### Customization
- **Theme**: Modify CSS variables in `globals.css`
- **Components**: Customize shadcn/ui components in `shared/components/ui/`
- **Validation**: Update schemas in `lib/validations.ts`

## ��� Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

Key responsive features:
- Collapsible navigation on mobile
- Stacked form layouts on small screens
- Responsive table with horizontal scroll
- Adaptive button sizes and spacing

## ♿ Accessibility Features

- **ARIA Labels**: All interactive elements have proper labels
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Semantic HTML and ARIA attributes
- **Focus Management**: Proper focus handling in modals
- **Color Contrast**: WCAG AA compliant color combinations

## ��� Performance Optimizations

- **Code Splitting**: Automatic route-based splitting
- **Memoization**: React.memo and useMemo for expensive operations
- **Lazy Loading**: Components loaded on demand
- **Bundle Size**: Optimized imports and tree shaking

## ��� Error Handling

- **Global Error Boundary**: Catches unexpected errors
- **Form Validation**: Real-time field validation
- **API Error Handling**: Graceful error messages
- **Loading States**: User feedback during operations

## ��� Future Enhancements

- **Real API Integration**: Replace mock data with real endpoints
- **Advanced Filtering**: Date ranges, multiple selections
- **Bulk Operations**: Select multiple teams for batch actions
- **Export Functionality**: CSV/Excel export
- **Audit Trail**: Track team changes over time
- **Role-based Access**: Different permissions for different users

## ��� Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## �� License

This project is licensed under the MIT License - see the LICENSE file for details.

## ���‍��� Author

Built as part of a Frontend Engineer Assessment demonstrating:
- Senior-level React/Next.js expertise
- Modern TypeScript practices
- Clean architecture patterns
- Accessibility best practices
- Performance optimization techniques
- Comprehensive testing strategies

## 🔧 Architecture Decisions

Key architectural decisions are documented in [docs/adr.md](docs/adr.md):

1. **State Management**: Zustand over React Context for better performance
2. **Form Validation**: Zod over Yup for better TypeScript integration
3. **UI Components**: shadcn/ui for maximum customization and control
4. **Pagination**: Client-side pagination for simplicity and performance

## 📚 Additional Documentation

- [Architecture Decision Record](docs/adr.md) - Key technical decisions
- [Project Summary](PROJECT_SUMMARY.md) - High-level overview
- [Deliverables](DELIVERABLES.md) - Detailed requirements checklist
