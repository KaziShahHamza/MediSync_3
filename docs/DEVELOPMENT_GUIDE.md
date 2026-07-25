# Development Guide

## Development Environment Setup

### Prerequisites
- **Node.js**: v16+ ([Download](https://nodejs.org/))
- **npm**: v8+ (comes with Node.js)
- **Git**: Latest version ([Download](https://git-scm.com/))
- **MySQL**: v5.7+ ([Download](https://www.mysql.com/downloads/))
- **VS Code**: Latest version ([Download](https://code.visualstudio.com/)) (Recommended)

### Recommended VS Code Extensions
```json
{
  "extensions": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "mhutchie.git-graph",
    "ms-vscode.vscode-peacock",
    "ritwickdey.live-server",
    "ms-vscode.makefile-tools"
  ]
}
```

### Project Setup Steps

#### 1. Clone Repository
```bash
git clone <repository-url>
cd medicine_3
```

#### 2. Backend Setup
```bash
cd server
npm install

# Create .env file
cp .env.example .env
# Edit .env with your configuration
```

**Backend `.env` Template**:
```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=medicine_db

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_super_secret_key_min_32_chars_long

# CORS
CORS_ORIGIN=http://localhost:5173

# Optional
DEBUG=true
LOG_LEVEL=debug
```

#### 3. Create MySQL Database
```bash
mysql -u root -p
```

```sql
CREATE DATABASE medicine_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE medicine_db;
```

The Sequelize ORM will create tables automatically on first server run.

#### 4. Frontend Setup
```bash
cd client
npm install

# Create .env file (optional)
cp .env.example .env.local
```

**Frontend `.env.local` Template** (optional):
```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME="MediSync"
```

#### 5. Start Development Servers

**Terminal 1 - Backend**:
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend**:
```bash
cd client
npm run dev
# Frontend runs on http://localhost:5173
```

Visit `http://localhost:5173` in your browser.

---

## Code Organization & Conventions

### File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `MedicineForm.jsx`, `BloodPressureChart.jsx` |
| Pages | PascalCase | `Dashboard.jsx`, `Medicines.jsx` |
| Hooks | camelCase with `use` prefix | `useMedicineReminder.js`, `useHealthLogs.js` |
| Utils | camelCase | `dashboardHelpers.js`, `timeMap.js` |
| Contexts | PascalCase with `Context` suffix | `AuthContext.jsx`, `MedicineContext.jsx` |
| Services | camelCase | `dashboardService.js`, `healthSummaryService.js` |
| Routes | kebab-case in URLs | `/api/medicines`, `/api/health-logs` |
| Database Models | PascalCase | `User.js`, `Medicine.js` |

### Directory Structure Best Practices

**Backend**:
```
server/
├── models/          # Database models
├── routes/          # API route handlers
├── services/        # Business logic
├── middleware/      # Express middleware
├── config/          # Configuration files
├── .env             # Environment variables (gitignored)
└── server.js        # Entry point
```

**Frontend**:
```
client/
├── src/
│   ├── components/  # Reusable components
│   ├── pages/       # Page-level components
│   ├── context/     # Context providers
│   ├── hooks/       # Custom hooks
│   ├── utils/       # Utility functions
│   ├── App.jsx      # Root component
│   └── main.jsx     # Entry point
└── public/          # Static assets
```

---

## Code Style Guidelines

### JavaScript/React Style

#### Variable Declaration
```javascript
// Good: const by default, let if reassignment needed
const userName = "John";
let counter = 0;

// Avoid: var keyword
var oldStyle = "deprecated";
```

#### Component Naming
```javascript
// Good: Descriptive, PascalCase
function MedicineForm() { }
const BloodPressureChart = () => { }

// Avoid: Single letter, vague names
function F() { }
const Component = () => { }
```

#### Function Arrow vs Regular
```javascript
// Good: Arrow functions for callbacks/lambdas
const handleClick = () => { }
const items = data.map(item => item.name);

// Good: Regular function for complex logic
function calculateBMI(height, weight) {
  // Multi-line logic
  return bmi;
}

// Avoid: Inconsistent mixing
```

#### Props Destructuring
```javascript
// Good: Destructure in function parameters
function MedicineCard({ medicine, onEdit, onDelete }) {
  return (...)
}

// Acceptable: Destructure in body
function MedicineCard(props) {
  const { medicine, onEdit, onDelete } = props;
  return (...)
}

// Avoid: Accessing props.x repeatedly
function MedicineCard(props) {
  return <h1>{props.medicine.name}</h1>  // Not recommended
}
```

#### Conditional Rendering
```javascript
// Good: Ternary for simple conditions
return isLoading ? <Spinner /> : <Content />;

// Good: Logical AND for single condition
return data.length > 0 && <DataList data={data} />;

// Good: if statement for complex logic
if (!user) {
  return <Redirect to="/login" />;
}
return <Dashboard />;

// Avoid: Inline complex ternaries
return a ? b ? c ? d : e : f : g;
```

### CSS/Tailwind Conventions
```javascript
// Good: Organized class lists
className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow hover:shadow-lg transition"

// Good: Use CSS variables for brand colors
className="bg-primary text-white hover:bg-primary-hover"

// Avoid: Inline style objects
style={{ backgroundColor: '#2563EB', padding: '24px' }}

// Avoid: Hard-coded colors
className="bg-blue-500"  // Instead of bg-primary
```

### Comments & Documentation

**Good Comments**:
```javascript
// Why the code does something (not what)
// API returns data in descending order, reverse for ascending
const sortedData = apiData.reverse();

// Document complex logic
// Calculate BMI: weight(kg) / (height(m))^2
const bmi = weight / (height / 100) ** 2;

// Mark TODOs
// TODO: Add pagination when dataset exceeds 100 items
```

**Avoid**:
```javascript
// Obvious comments
const name = "John";  // Set name to John (obvious!)

// Commented-out code
// const oldFunction = () => { }  // Remove this when deploying
// Use git instead!

// Vague comments
// This fixes the issue  (which issue? how?)
```

---

## Database Migration & Updates

### Adding a New Field to Existing Model

**Step 1**: Update Model Definition
```javascript
// server/models/HealthLog.js
HealthLog.define('HealthLog', {
  // existing fields...
  measurementUnit: {
    type: DataTypes.ENUM('metric', 'imperial'),
    defaultValue: 'metric'
  }
});
```

**Step 2**: Create Migration (if using migrations)
```bash
# Using Sequelize CLI
npx sequelize migration:create --name add-measurement-unit-to-health-log
```

**Step 3**: Run Sync (Development Only)
```bash
# Sequelize will sync on server start if environment allows
NODE_ENV=development npm run dev
```

**Step 4**: Verify in Database
```sql
SELECT * FROM HealthLogs LIMIT 1;  -- Should have new field
```

### Best Practices
- Always backup database before schema changes
- Test migrations in development first
- Keep database changes in version control
- Document breaking schema changes

---

## Git Workflow

### Branch Naming Convention
```
feature/add-medicine-reminder
bugfix/fix-login-error
docs/update-api-documentation
refactor/simplify-chart-component
```

### Commit Message Convention
```
feat: Add medicine reminder notifications
fix: Resolve CORS error on health endpoints
docs: Update installation guide
style: Format components with Prettier
refactor: Extract API client utility
test: Add unit tests for BMI calculator
chore: Update dependencies
```

### Commit Template
```
<type>: <subject>

<body (optional)>

<footer (optional)>
Closes #123
```

### Branching Strategy (Git Flow)
```
main (production)
├── release/v1.0.0
├── hotfix/urgent-bug-fix
│
develop (staging)
├── feature/add-login
├── feature/add-medicines
├── feature/add-charts
└── bugfix/fix-styling
```

### Pull Request Checklist
- [ ] Branch is based on latest `develop`
- [ ] Code follows style guide
- [ ] All tests passing
- [ ] No console.errors in development
- [ ] Database migrations tested
- [ ] API endpoints documented
- [ ] Commits have meaningful messages
- [ ] PR description explains changes

---

## Testing Guidelines

### Unit Testing Example (Frontend)
```javascript
// test/components/MedicineForm.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MedicineForm from '../MedicineForm';

describe('MedicineForm', () => {
  it('should submit form with correct data', async () => {
    const handleSubmit = jest.fn();
    render(<MedicineForm onSubmit={handleSubmit} />);
    
    const input = screen.getByPlaceholderText('Medicine name');
    await userEvent.type(input, 'Aspirin');
    await userEvent.click(screen.getByText('Save'));
    
    expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Aspirin' })
    );
  });
});
```

### API Testing Example (Backend)
```javascript
// test/routes/medicines.test.js
const request = require('supertest');
const app = require('../server');

describe('GET /api/medicines', () => {
  it('should return medicines for authenticated user', async () => {
    const response = await request(app)
      .get('/api/medicines')
      .set('Authorization', `Bearer ${validToken}`);
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
```

### Running Tests
```bash
# Frontend
npm test --run  # single run
npm test        # watch mode

# Backend (setup needed)
npm test
```

---

## Performance Optimization Tips

### Frontend Optimization
```javascript
// 1. Memoize expensive components
const MedicineCard = React.memo(({ medicine }) => {
  return <div>{medicine.name}</div>;
});

// 2. Use lazy loading for routes
const Dashboard = lazy(() => import('./pages/Dashboard'));

// 3. Debounce search inputs
const debouncedSearch = useCallback(
  debounce((query) => fetchResults(query), 300),
  []
);

// 4. Optimize images
// Use next-gen formats (WebP), appropriate sizes

// 5. Code splitting
// Split vendor code, route-based code splitting
```

### Backend Optimization
```javascript
// 1. Add database indexes
// Sequelize index definition
sequelize.define('HealthLog', {
  // fields...
}, {
  indexes: [
    { fields: ['userId', 'type'] },
    { fields: ['createdAt'] }
  ]
});

// 2. Implement query pagination
// GET /api/medicines?page=1&limit=20

// 3. Use connection pooling (Sequelize handles this)
// pool: { min: 2, max: 5, idle: 30000 }

// 4. Cache frequently accessed data
// Redis/in-memory cache for dashboard data

// 5. Compress API responses
app.use(compression());
```

---

## Debugging

### Frontend Debugging
```javascript
// Use React DevTools browser extension
// Network tab for API debugging
// Console for errors and warnings

// Debug prints
console.log('Medicine data:', medicine);
console.table(medicines);  // Better for arrays/objects

// Use debugger
debugger;  // Execution pauses here
```

### Backend Debugging
```javascript
// Console logging
console.log('User ID:', req.userId);
console.error('Database error:', error);

// Using debugger
// Add debugger statement and run with Node.js inspector
node --inspect server.js

// Check server logs
// PM2/Docker logs in production
```

### Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| CORS errors | Frontend/Backend on different origins | Check CORS config in server.js |
| 401 Unauthorized | Missing/invalid token | Check localStorage, token expiry |
| Database connection failed | MySQL not running | Start MySQL service |
| Module not found | Missing npm dependencies | Run `npm install` |
| Hot Reload not working | Vite not watching files | Restart dev server |

---

## Environment-Specific Configuration

### Development
```env
NODE_ENV=development
DEBUG=true
LOG_LEVEL=debug
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=dev-secret-key
```

### Production
```env
NODE_ENV=production
DEBUG=false
LOG_LEVEL=error
CORS_ORIGIN=https://medisync.app
JWT_SECRET=long-secure-random-key-from-env-vars
DATABASE_URL=mysql://prod-db-host...
```

---

## Deployment Checklist

- [ ] Environment variables configured for production
- [ ] Database migrated to production
- [ ] API endpoints tested in production environment
- [ ] HTTPS/SSL certificates installed
- [ ] Frontend build optimized (npm run build)
- [ ] Error tracking setup (Sentry, LogRocket)
- [ ] Monitoring configured (uptime checks, alerts)
- [ ] Backup strategy implemented
- [ ] Security audit completed
- [ ] Load testing done
- [ ] Documentation updated
- [ ] Release notes prepared

---

## Useful Commands Reference

### Frontend
```bash
npm run dev        # Start dev server
npm run build      # Create production build
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm test           # Run tests
npm test --run     # Single test run
```

### Backend
```bash
npm run dev        # Start server with hot reload
npm test           # Run tests
npm run db:migrate # Run migrations (when setup)
npm run db:seed    # Seed database (when setup)
```

### Git
```bash
git checkout -b feature/new-feature
git add .
git commit -m "feat: Add new feature"
git push origin feature/new-feature
git pull origin develop  # Update local from remote
git merge feature/xyz     # Merge feature into current branch
git rebase develop        # Rebase current branch on develop
```

### MySQL
```bash
mysql -u root -p medicine_db  # Connect to database
SHOW TABLES;                   # List all tables
DESC Medicines;                # Show table structure
SELECT * FROM Medicines;       # Query data
```

---

## Security Best Practices

### Frontend Security
```javascript
// 1. Never expose secrets in frontend code
// ❌ const API_KEY = "sk_live_secret";
// ✅ Use environment variables
const API_URL = import.meta.env.VITE_API_URL;

// 2. Sanitize user input before display
// Use DOMPurify or similar for HTML content

// 3. Validate data client-side
// Before sending to server

// 4. Secure token storage
// localStorage (for non-sensitive apps)
// sessionStorage (more secure, cleared on close)
// Cookies with httpOnly flag (most secure)
```

### Backend Security
```javascript
// 1. Validate all inputs
const { body, validationResult } = require('express-validator');

// 2. Use prepared statements (Sequelize does this)
// Prevents SQL injection

// 3. Hash passwords
bcrypt.hash(password, 10);

// 4. CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

// 5. Rate limiting (implement via middleware)
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100                     // limit each IP to 100 requests
}));

// 6. Input size limits
app.use(express.json({ limit: '10mb' }));
```

---

## Documentation Standards

### Code Documentation
```javascript
/**
 * Calculate Body Mass Index
 * @param {number} height - Height in centimeters
 * @param {number} weight - Weight in kilograms
 * @returns {number} Calculated BMI value
 * @example
 *   const bmi = calculateBMI(175, 75);  // Returns 24.49
 */
function calculateBMI(height, weight) {
  return weight / ((height / 100) ** 2);
}
```

### README Section for Features
```markdown
### Feature Name
Brief description of what it does.

**Usage**:
- How to access/use the feature
- Key user workflows

**Technical Details**:
- Technologies used
- Key components/files
- API endpoints involved
```

---

## Common Development Tasks

### Adding a New Medicine Feature (Example)

1. **Backend**:
   - Create API endpoint in `routes/medicine.routes.js`
   - Add business logic in service
   - Update MedicineModel if needed

2. **Frontend**:
   - Create component in `components/`
   - Add context updates in `MedicineContext`
   - Create page or integrate into existing page
   - Add route in `App.jsx`

3. **Testing**:
   - Write API tests
   - Write component tests
   - Manual testing in dev environment

4. **Documentation**:
   - Update API_DOCUMENTATION.md
   - Add code comments
   - Update README if user-facing

5. **Git**:
   - Create feature branch
   - Commit with meaningful messages
   - Create pull request
   - Code review before merge

---

## Resources & References

### Official Documentation
- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [Express.js Docs](https://expressjs.com/)
- [Sequelize Docs](https://sequelize.org/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Learning Resources
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)
- [CSS Tricks](https://css-tricks.com/)

### Tools
- [VS Code](https://code.visualstudio.com/)
- [Postman](https://www.postman.com/) - API testing
- [DBeaver](https://dbeaver.io/) - Database management
- [Git Kraken](https://www.gitkraken.com/) - Git GUI

---

## Support & Help

### Getting Help
1. Check existing documentation in `/docs`
2. Search previous GitHub issues
3. Ask in team Slack channel
4. Reference code examples in the repository
5. Check external documentation links

### Reporting Issues
1. Describe the problem clearly
2. Provide steps to reproduce
3. Include error messages/logs
4. Mention your environment (OS, Node version, etc.)
5. Create GitHub issue with `bug` label
