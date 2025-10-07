# Quick Start Guide

## � Current Location
Your project is located at:
```
C:\Users\DELL LATITUDE E5580\team-management
```

## � Run the Application

### Option 1: Development Mode
```bash
cd "C:\Users\DELL LATITUDE E5580\team-management"
npm run dev
```
Then open: http://localhost:3000

### Option 2: Production Build
```bash
cd "C:\Users\DELL LATITUDE E5580\team-management"
npm run build
npm start
```
Then open: http://localhost:3000

## � Using the Application

1. **View Teams**: The app automatically redirects to `/teams`
2. **Search**: Type in the search bar to filter teams by name or code
3. **Filter**: Use dropdowns to filter by Status or Entity
4. **Sort**: Click any column header to sort
5. **Create**: Click "Create New Team" button
6. **Edit**: Click the edit icon (pencil) on any row
7. **Delete**: Click the delete icon (trash) on any row

## � Key Files

### Application Code
- `src/app/teams/page.tsx` - Main teams page
- `src/stores/teamStore.ts` - State management
- `src/data/teams.ts` - Mock data (520 teams)
- `src/features/teams/components/TeamForm.tsx` - Create/Edit form
- `src/lib/validations.ts` - Form validation schemas

### Documentation
- `README.md` - Complete project documentation
- `DELIVERABLES.md` - Requirements checklist
- `PROJECT_SUMMARY.md` - Project overview
- `docs/architecture.md` - Technical decisions (ADRs)
- `docs/deployment.md` - Deployment instructions

### Configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `next.config.ts` - Next.js configuration
- `package.json` - Dependencies and scripts

## � Run Tests
```bash
npm test
```

## � Check Code Quality
```bash
npm run lint
```

## � Build for Production
```bash
npm run build
```

## � Deploy to Vercel

### Method 1: Vercel Dashboard
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import this repository
5. Click "Deploy"

### Method 2: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
```

## � Project Structure
```
team-management/
├── src/
│   ├── app/teams/          # Teams page
│   ├── features/           # Feature components
│   ├── shared/             # Shared components
│   ├── stores/             # Zustand stores
│   ├── lib/                # Utilities
│   ├── types/              # TypeScript types
│   └── data/               # Mock data
├── docs/                   # Documentation
├── README.md               # Main docs
└── package.json            # Dependencies
```

## � Features Implemented

✅ Team management (CRUD operations)
✅ Advanced table with sorting & filtering
✅ Pagination (10/20 items per page)
✅ Search by name or code
✅ Filter by status and entity
✅ Create/Edit forms with validation
✅ Delete with confirmation
✅ Responsive design
✅ Accessibility features
✅ Success/Error feedback
✅ Loading states

## � Quick Commands Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm test` | Run unit tests |
| `npm run lint` | Check code quality |

## � Troubleshooting

### Port already in use
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Dependencies issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build fails
```bash
npm run build
# Check the output for specific errors
```

## � Need Help?

Refer to:
- **README.md** for detailed documentation
- **docs/architecture.md** for technical decisions
- **docs/deployment.md** for deployment help
- **DELIVERABLES.md** for requirements checklist
- **PROJECT_SUMMARY.md** for project overview

## ✨ What's Next?

1. **Test the application** locally
2. **Push to GitHub** (if not already done)
3. **Deploy to Vercel** for production
4. **Share the deployment URL**

---

**Everything is ready! Just run `npm run dev` and start exploring!** �
