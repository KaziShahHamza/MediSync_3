# Frontend Components & UI Architecture

## Design System Overview

### Brand Colors
- **Primary Blue**: `#2563EB` (rgb: 37, 99, 235) - Main actions, links
- **Primary Hover**: `#1E4ED8` (rgb: 29, 78, 216) - Button hover state
- **Accent Cyan**: `#0EA5E9` (rgb: 14, 165, 233) - Secondary accents
- **Background**: `#F8FAFC` (rgb: 248, 250, 252) - Page background
- **Card**: `#FFFFFF` (rgb: 255, 255, 255) - Component backgrounds
- **Text Primary**: `#0F172A` (rgb: 15, 23, 42) - Main text
- **Text Secondary**: `#475569` (rgb: 71, 85, 105) - Secondary text
- **Text Muted**: `#64748B` (rgb: 100, 116, 139) - Disabled/helper text
- **Border**: `#E2E8F0` (rgb: 226, 232, 240) - Dividers, borders
- **Success**: `#16A34A` (rgb: 22, 163, 74) - Success states
- **Warning**: `#F59E0B` (rgb: 245, 158, 11) - Warning states
- **Danger**: `#DC2626` (rgb: 220, 38, 38) - Error states

### Typography
- **Font**: System font stack (default browsers)
- **Body**: 16px, line-height: 1.5
- **Heading 1**: 48px, font-weight: bold
- **Heading 2**: 36px, font-weight: bold
- **Heading 3**: 28px, font-weight: bold
- **Small**: 14px, color: text-muted

### Spacing System
- **Base Unit**: 4px
- **Scale**: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px...
- **Card Padding**: 24px (6 units)
- **Section Margin**: 48px (12 units)
- **Grid Gaps**: 16px (4 units)

### Component States
- **Default**: Normal appearance
- **Hover**: Elevated shadow, slight scale (1.02)
- **Active**: Different background/border color
- **Disabled**: Reduced opacity (0.5), cursor: not-allowed
- **Loading**: Spinner overlay
- **Error**: Red border/text, error message

## Component Tree Structure

```
App.jsx
├─ BrowserRouter
├─ AuthProvider
├─ ProfileProvider
├─ MedicineProvider
├─ PrescriptionProvider
├─ DoctorProvider
│
└─ Navbar
    └─ Logo, Navigation Links, User Menu
│
├─ Routes
│
├─ Public Routes
│  ├─ Home
│  │  └─ Hero Section, Features, CTA
│  ├─ Login
│  │  └─ AuthLayout, Form
│  └─ Signup
│     └─ AuthLayout, Form
│
├─ Protected Routes
│  ├─ Dashboard
│  │  ├─ WelcomeCard
│  │  ├─ OverviewCards (stats)
│  │  ├─ TodayMedicines
│  │  ├─ RecentActivity
│  │  └─ QuickActions
│  │
│  ├─ Medicines
│  │  ├─ MedicineForm
│  │  └─ MedicineList
│  │     └─ MedicineCard
│  │
│  ├─ Health (v1)
│  │  ├─ BloodPressureForm
│  │  ├─ BloodSugarForm
│  │  ├─ BMIForm
│  │  ├─ BloodPressureChart
│  │  ├─ BloodSugarChart
│  │  └─ BMIChart
│  │
│  ├─ Health2 (v2)
│  │  └─ HealthCharts (aggregated)
│  │
│  ├─ Prescriptions
│  │  └─ PrescriptionCard
│  │     └─ Prescription details
│  │
│  ├─ Doctors
│  │  └─ DoctorCard
│  │     └─ Doctor details
│  │
│  └─ Profile
│     ├─ ProfileSummary
│     └─ ProfileSection
│        └─ ProfileInput, ProfileSelect
│
└─ ReminderWrapper (background service)
   └─ useMedicineReminder hook
```

## Page Components

### 1. Home.jsx
**Purpose**: Landing page with features and sign-up CTA

**Features**:
- Hero section with tagline
- Feature cards (Medicine Management, Health Tracking, etc.)
- Call-to-action buttons
- Responsive grid layout

**Layout**:
```
┌──────────────────────────────────┐
│         Navigation Bar            │
├──────────────────────────────────┤
│  ┌─ Hero Section               ┐  │
│  │  • Tagline                  │  │
│  │  • Description              │  │
│  │  • CTA Buttons              │  │
│  └─────────────────────────────┘  │
│                                    │
│  ┌─ Features Grid ────────────┐   │
│  │ ┌──────┐ ┌──────┐ ┌──────┐ │   │
│  │ │Card 1│ │Card 2│ │Card 3│ │   │
│  │ └──────┘ └──────┘ └──────┘ │   │
│  │ ┌──────┐ ┌──────┐ ┌──────┐ │   │
│  │ │Card 4│ │Card 5│ │Card 6│ │   │
│  │ └──────┘ └──────┘ └──────┘ │   │
│  └─────────────────────────────┘   │
│                                    │
│  ┌─ Footer ─────────────────────┐  │
│  │ Links, Copyright             │  │
│  └──────────────────────────────┘  │
└──────────────────────────────────┘
```

---

### 2. Login.jsx & Signup.jsx
**Purpose**: Authentication pages

**Components Used**:
- AuthLayout (wrapper)
- Form inputs (email, password)
- Submit button
- Link to alternate page

**Data Flow**:
```
Form Input
    ↓
Submit Handler
    ↓
POST /api/auth/login or /signup
    ↓
Receive token + user data
    ↓
Call login() from AuthContext
    ↓
Redirect to Dashboard
```

---

### 3. Dashboard.jsx
**Purpose**: Main user hub with health overview

**Sub-components**:
- `WelcomeCard`: Greeting with user name and time
- `OverviewCards`: Stats (medicines count, recent logs, etc.)
- `TodayMedicines`: Today's scheduled medicines
- `RecentActivity`: Recent health entries and actions
- `QuickActions`: Fast navigation buttons
- `DashboardClock`: Live clock display

**State Management**:
- Fetches data from multiple API endpoints
- Aggregates data using dashboardService
- Context: MedicineContext, HealthContext

**Performance**: Parallel requests for better load time

---

### 4. Medicines.jsx
**Purpose**: Manage user's medicines list

**Layout**:
```
┌─────────────────────────────┐
│ Add Medicine Button          │
├─────────────────────────────┤
│ ┌─ MedicineForm (conditional) ┐
│ │ • Name Input                │
│ │ • Dosage Times Selector     │
│ │ • Image Upload              │
│ │ • Save/Cancel Buttons       │
│ └─────────────────────────────┘
│                               │
│ ┌─ MedicineList             ┐ │
│ │ ┌─────────────────────┐   │ │
│ │ │ Medicine Card       │   │ │
│ │ │ • Icon/Image        │   │ │
│ │ │ • Name & Dosages    │   │ │
│ │ │ • Edit/Delete Btns  │   │ │
│ │ └─────────────────────┘   │ │
│ │                            │ │
│ │ ┌─────────────────────┐   │ │
│ │ │ Medicine Card       │   │ │
│ │ └─────────────────────┘   │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

**State Management**:
- useState for editing mode
- MedicineContext for list data
- Local fetching for CRUD operations

---

### 5. Health.jsx & Health2.jsx
**Purpose**: Track and visualize health metrics

**Health.jsx (V1)** - Separate tabs:
- Blood Pressure tab
  - BloodPressureForm
  - BloodPressureChart
- Blood Sugar tab
  - BloodSugarForm
  - BloodSugarChart
- BMI tab
  - BMIForm
  - BMIResult
  - BMIChart

**Health2.jsx (V2)** - Unified view:
- HealthCharts (aggregated component)
- All charts visible simultaneously

**Components**:

#### Form Components
- Inputs for measurements
- Date/time pickers
- Optional notes field
- Submit and clear buttons

**Example - BloodPressureForm**:
```jsx
<form onSubmit={handleSubmit}>
  <input type="number" placeholder="Systolic (High)" />
  <input type="number" placeholder="Diastolic (Low)" />
  <input type="text" placeholder="Notes" />
  <button type="submit">Record</button>
</form>
```

#### Chart Components
- Chart.js integration
- Time-series visualization
- Responsive sizing
- Custom tooltips

**Example - BloodPressureChart**:
```jsx
<Line
  data={{
    labels: dates,
    datasets: [
      {
        label: 'Systolic',
        data: systolicValues,
        borderColor: '#2563EB',
        ...
      },
      {
        label: 'Diastolic',
        data: diastolicValues,
        borderColor: '#0EA5E9',
        ...
      }
    ]
  }}
  options={{
    responsive: true,
    ...
  }}
/>
```

---

### 6. Prescriptions.jsx
**Purpose**: View and manage prescriptions

**Components**:
- PrescriptionCard
  - Doctor name
  - Medicine list
  - Date range
  - Notes
  - Edit/Delete buttons

**Data Display**:
```json
{
  "id": 1,
  "doctorName": "Dr. Smith",
  "medicines": ["Aspirin", "Lisinopril"],
  "startDate": "2026-07-01",
  "endDate": "2026-10-01",
  "notes": "Take with food"
}
```

---

### 7. Doctors.jsx
**Purpose**: Manage healthcare providers

**Components**:
- DoctorCard
  - Doctor name
  - Specialty
  - Hospital
  - Contact info
  - Action buttons

**Layout**: Grid of doctor cards

---

### 8. Profile.jsx
**Purpose**: View and edit user profile

**Components**:
- ProfileSummary (read-only overview)
- ProfileSection (editable sections)
  - ProfileInput (text inputs)
  - ProfileSelect (dropdowns)

**Sections**:
- Basic Info (age, gender)
- Health Info (blood type, allergies)
- Medical History
- Emergency Contact

---

## Reusable Component Library

### Form Components

#### Input Field
```jsx
<input
  type="text"
  className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
  placeholder="Enter value"
/>
```

#### Button
```jsx
<button
  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition"
>
  Action
</button>
```

#### Card
```jsx
<div className="bg-card rounded-lg p-6 shadow-card hover:shadow-card-hover transition">
  {content}
</div>
```

#### Tabs (Health v1)
```jsx
<div className="flex border-b">
  <button className={`px-4 py-2 ${active ? 'border-b-2 border-primary' : ''}`}>
    Tab 1
  </button>
  <button className={`px-4 py-2 ${active ? 'border-b-2 border-primary' : ''}`}>
    Tab 2
  </button>
</div>
```

---

### Specialized Components

#### HealthSummaryCard
```jsx
<StatCard
  icon={<Heart />}
  title="Blood Pressure"
  value="120/80"
  unit="mmHg"
  trend="↓ 5% from last week"
/>
```

#### QuickActionCard
```jsx
<QuickLinkCard
  icon={<Pill />}
  title="Add Medicine"
  onClick={handleNavigate}
/>
```

#### Loading State
```jsx
{loading ? (
  <div className="flex items-center justify-center py-12">
    <Spinner className="animate-spin" />
  </div>
) : (
  {content}
)}
```

#### Empty State
```jsx
{data.length === 0 ? (
  <div className="text-center py-12">
    <Inbox className="mx-auto h-12 w-12 text-muted" />
    <p className="mt-4 text-secondary">No data yet</p>
    <button>Add Item</button>
  </div>
) : (
  {content}
)}
```

---

## Custom Hooks

### useMedicineReminder
**Purpose**: Trigger browser notifications for medicine dosages

**Location**: `hooks/useMedicineReminder.js`

**Behavior**:
```javascript
// Runs on component mount
// Fetches medicines every minute
// Compares current time with dosageTimes
// Sends notification when match found
// Auto-runs in background via ReminderWrapper

TIME_MAP = {
  morning: '10:00',
  noon: '13:00',
  night: '20:00'
}

// Check if current time matches any dosage time
if (TIME_MAP[dosageTime] === currentTime) {
  showNotification(`Take ${medicineName}`)
}
```

**Notification Payload**:
```javascript
new Notification('Medicine Reminder', {
  body: `Time to take ${medicineName}`,
  icon: medicineImageUrl,
  tag: 'medicine-reminder'
})
```

---

### useHealthLogs
**Purpose**: Fetch and manage health log data

**Usage**:
```javascript
const { healthLogs, loading, error } = useHealthLogs(type, filterDays);
// type: 'bp', 'diabetes', 'bmi'
// filterDays: 7, 30, 90, etc.
```

**Features**:
- Fetches from `/api/health?type={type}`
- Filters by date range
- Handles loading/error states
- Caches data with useCallback

---

## Styling Architecture

### Tailwind CSS Integration
- **Config**: Uses Tailwind 4 with vite plugin
- **Structure**: Utility-first classes
- **Customization**: CSS variables for brand colors

### CSS Variables (index.css)
```css
:root {
  --color-primary: 37 99 235;
  --color-primary-hover: 29 78 216;
  --color-accent: 14 165 233;
  /* ... more colors ... */
}
```

### Common Utility Classes
- **Layout**: `flex`, `grid`, `container`, `gap-4`
- **Spacing**: `p-6`, `m-4`, `py-2`, `px-3`
- **Text**: `text-lg`, `font-bold`, `text-center`
- **Colors**: `bg-primary`, `text-secondary`, `border-border`
- **Interactive**: `hover:shadow-lg`, `transition`, `cursor-pointer`

### Responsive Design
- **Mobile First**: Start with mobile styles, then add larger breakpoints
- **Breakpoints**: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`
- **Example**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

---

## Icon System

### Icon Libraries
- **Lucide React**: Modern icons for UI elements
  - `Heart`, `Pill`, `Activity`, `TrendingUp`, `Settings`, etc.
- **React Icons**: Alternative icon sources (if needed)

### Icon Usage Pattern
```jsx
import { Heart, Pill } from 'lucide-react';

<Heart size={24} className="text-danger" />
<Pill size={20} className="text-primary" />
```

---

## Component Communication Patterns

### Parent to Child (Props)
```jsx
// Parent
<MedicineCard
  medicine={medicineName}
  dosages={dosageTimes}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>

// Child
function MedicineCard({ medicine, dosages, onEdit, onDelete }) {
  return (...)
}
```

### Child to Parent (Callbacks)
```jsx
// Parent
const handleSave = (data) => {
  // Process form submission
}

// Child (Form)
<MedicineForm onSubmit={handleSave} />

// Form Component
const MedicineForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  }
}
```

### Global State (Context)
```jsx
// Usage in component
const { medicines, addMedicine } = useMedicines();
const { user, logout } = useAuth();
```

---

## Performance Optimizations

### Memoization
```jsx
// Prevent unnecessary re-renders
const MedicineCard = React.memo(({ medicine }) => {
  return <div>{medicine.name}</div>;
});
```

### Code Splitting
```jsx
// Lazy load pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Health = lazy(() => import('./pages/Health'));

// In routes
<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>
```

### Debouncing (Future Implementation)
```jsx
// For search and filter inputs
const debouncedSearch = useCallback(
  debounce((value) => handleSearch(value), 300),
  []
);
```

---

## Accessibility (A11y)

### Best Practices
- Semantic HTML (`<button>`, `<form>`, `<nav>`)
- ARIA labels for icons: `aria-label="Add medicine"`
- Keyboard navigation support
- Focus indicators on interactive elements
- Color contrast ratios meet WCAG AA standards
- Alt text for images and charts

### Example
```jsx
<button
  aria-label="Delete medicine"
  className="hover:bg-danger-light"
>
  <Trash2 size={20} />
</button>
```

---

## Error Handling in Components

### Try-Catch Pattern
```jsx
const fetchData = async () => {
  try {
    setLoading(true);
    const response = await fetch('/api/medicines');
    const data = await response.json();
    setMedicines(data);
  } catch (error) {
    setError('Failed to load medicines');
    console.error(error);
  } finally {
    setLoading(false);
  }
}
```

### User Feedback
```jsx
{error && (
  <div className="bg-danger-light text-danger p-4 rounded">
    {error}
  </div>
)}

{success && (
  <div className="bg-success-light text-success p-4 rounded">
    Changes saved successfully
  </div>
)}
```

---

## Testing Considerations

### Component Testing (Recommended Tools)
- React Testing Library for unit tests
- Jest for test runner
- Mock API responses
- Test user interactions (click, type, submit)

### Example Test
```javascript
test('MedicineForm submits correct data', () => {
  const handleSubmit = jest.fn();
  render(<MedicineForm onSubmit={handleSubmit} />);
  
  userEvent.type(screen.getByPlaceholder('Medicine name'), 'Aspirin');
  userEvent.click(screen.getByText('Submit'));
  
  expect(handleSubmit).toHaveBeenCalledWith(
    expect.objectContaining({ name: 'Aspirin' })
  );
});
```
