# System Architecture

## High-Level Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Layer (React)                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Pages (Home, Login, Dashboard, Health, etc.)        │  │
│  │  ├─ Routing (React Router)                           │  │
│  │  └─ Protected Routes (Authentication)                │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↓                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Context API (State Management)                      │  │
│  │  ├─ AuthContext (user, login, logout)                │  │
│  │  ├─ MedicineContext (medicines data)                 │  │
│  │  ├─ HealthContext (health logs)                      │  │
│  │  ├─ PrescriptionContext (prescriptions)              │  │
│  │  ├─ DoctorContext (doctors)                          │  │
│  │  └─ ProfileContext (user profile)                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↓                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Components (Reusable UI Elements)                   │  │
│  │  ├─ Forms (MedicineForm, HealthLogForm, etc.)        │  │
│  │  ├─ Charts (BloodPressureChart, BMIChart, etc.)      │  │
│  │  ├─ Cards (DoctorCard, PrescriptionCard, etc.)       │  │
│  │  └─ Layouts (Navbar, Dashboard Layout, etc.)         │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↓                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Custom Hooks                                        │  │
│  │  ├─ useMedicineReminder (browser notifications)      │  │
│  │  └─ useHealthLogs (health data fetching)             │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↓                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  API Client (Fetch Wrapper)                          │  │
│  │  └─ Handles requests with JWT tokens                 │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           ↓
                    HTTP/REST API
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                      Server Layer (Express)                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  API Routes                                          │  │
│  │  ├─ /api/auth (signup, login, logout)               │  │
│  │  ├─ /api/medicines (CRUD medicines)                 │  │
│  │  ├─ /api/health (CRUD health logs)                  │  │
│  │  ├─ /api/prescriptions (CRUD prescriptions)         │  │
│  │  ├─ /api/doctors (CRUD doctors)                     │  │
│  │  ├─ /api/profile (user profile)                     │  │
│  │  └─ /api/dashboard (aggregated data)                │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↓                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Middleware                                          │  │
│  │  ├─ CORS (cross-origin requests)                     │  │
│  │  ├─ JWT Authentication (auth.js)                     │  │
│  │  └─ Error Handling                                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↓                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Services (Business Logic)                           │  │
│  │  ├─ dashboardService (aggregate dashboard data)      │  │
│  │  ├─ healthSummaryService (calculate health metrics)  │  │
│  │  └─ reminderScheduler (cron-based reminders)         │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↓                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Models (Data Representation)                        │  │
│  │  ├─ User                                             │  │
│  │  ├─ Medicine                                         │  │
│  │  ├─ HealthLog                                        │  │
│  │  ├─ Prescription                                     │  │
│  │  ├─ Doctor                                           │  │
│  │  └─ Profile                                          │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↓                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Sequelize ORM                                       │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                    Data Access Layer                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  MySQL Database                                     │  │
│  │  ├─ Users table                                      │  │
│  │  ├─ Medicines table                                 │  │
│  │  ├─ HealthLogs table                                │  │
│  │  ├─ Prescriptions table                             │  │
│  │  ├─ Doctors table                                   │  │
│  │  └─ Profiles table                                  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Architectural Patterns

### 1. Client-Server Architecture
- **Client**: React Single Page Application (SPA)
- **Server**: Express.js REST API
- **Communication**: HTTP/REST with JSON payloads

### 2. State Management Pattern
- **Context API**: Used for global state management
- **Local Component State**: React hooks (useState)
- **Local Storage**: Persistent client-side storage for tokens and user data

### 3. Authentication Flow
```
User Credentials
        ↓
    Server (POST /api/auth/login)
        ↓
    Verify with bcrypt
        ↓
    Generate JWT Token
        ↓
    Client receives {token, user}
        ↓
    Store token in localStorage
    Store user in localStorage & Context
        ↓
    Include token in Authorization header
    for subsequent requests (Bearer {token})
```

### 4. Data Fetching Pattern
- **Fetch API**: Direct HTTP requests with Bearer token authentication
- **Error Handling**: Try-catch blocks with fallback UI states
- **Loading States**: Component-level loading indicators

### 5. Request/Response Format

**Request Headers**:
```
Authorization: Bearer {jwt_token}
Content-Type: application/json
CORS: allowed from frontend domain
```

**Response Format**:
```json
{
  "data": {},
  "message": "Success message",
  "status": 200
}
```

## Data Flow Architecture

### Medicine Reminder Flow
```
1. Component mounts (useMedicineReminder hook)
2. Fetch all medicines for user
3. Parse dosageTimes from medicine data
4. Compare current time with scheduled times
5. When match found:
   - Check browser notification permission
   - Send browser notification
   - Log reminder event
6. Poll every minute for updates
```

### Health Tracking Flow
```
1. User enters health metric (BP, blood sugar, BMI)
2. Form component collects data
3. API request sent to server with measurement
4. Server validates and stores in HealthLog table
5. Associated with user via userId
6. Timestamp automatically added
7. UI updates with success message
8. Chart component re-fetches data
9. Graph updates with new data point
```

### Dashboard Aggregation Flow
```
1. Dashboard page loads
2. Multiple parallel requests:
   - GET /api/dashboard/health-summary
   - GET /api/medicines (today's)
   - GET /api/health (recent entries)
   - GET /api/prescriptions
3. Data aggregated in dashboardService
4. Calculate statistics and trends
5. Format data for card components
6. Display on dashboard UI
```

## Component Communication

### Props Drilling vs Context
- **Context Used For**: Authentication state, global health data
- **Props Used For**: Component-specific data, callback functions
- **Hybrid Approach**: Context for auth, props for component-level data

### Event Handling Pattern
```javascript
// User action → Handler function → API call → State update → UI re-render

Button click
    ↓
saveMedicine() function
    ↓
POST /api/medicines
    ↓
Response received
    ↓
Update Context/State
    ↓
Component re-renders with new data
```

## API Request Lifecycle

```
User Interaction
    ↓
Component Handler invoked
    ↓
Fetch API call with Bearer token
    ↓
Server receives request
    ↓
Auth middleware validates token
    ↓
Route handler processes request
    ↓
Service layer executes business logic
    ↓
Model/ORM interacts with database
    ↓
Database operation executed
    ↓
Response formatted and sent
    ↓
Client receives response
    ↓
Parse JSON response
    ↓
Update component state/context
    ↓
Component re-renders
    ↓
UI displays new data
```

## Error Handling Architecture

### Client-Side Error Handling
- Try-catch blocks around API calls
- Error state in components
- User-friendly error messages
- Fallback UI states

### Server-Side Error Handling
- Model validation before database operations
- HTTP status codes (400, 401, 403, 404, 500)
- Error messages in response body
- Logging of errors for debugging

## Security Architecture

### Authentication
- JWT tokens with secret key
- Token stored in localStorage
- Tokens included in Authorization header
- Server validates token on every request

### Authorization
- Protected routes check for authenticated user
- Resource access tied to userId
- Cascading deletes for user data cleanup

### Password Security
- Bcryptjs for password hashing (salt rounds: 10)
- Passwords never stored in plain text
- Passwords never returned in API responses

### CORS
- Configured for frontend domain
- Prevents unauthorized cross-origin requests

## Scalability Considerations

### Frontend Scalability
- **Code Splitting**: Lazy load route components
- **Caching**: Browser caching for static assets
- **State Management**: Context API can be replaced with Redux if needed

### Backend Scalability
- **Database Indexing**: On userId and timestamps
- **Connection Pooling**: Sequelize manages connections
- **API Pagination**: Not yet implemented, future enhancement

### Performance Optimizations
- **Memoization**: React.memo for expensive components
- **Debouncing**: For search and filter inputs
- **Lazy Loading**: Charts and data visualizations

## Technology Selection Rationale

| Component | Technology | Reason |
|-----------|-----------|--------|
| Frontend Framework | React 19 | Component-based, large ecosystem, performance |
| Build Tool | Vite | Fast HMR, optimized builds, modern tooling |
| Styling | Tailwind CSS | Utility-first, rapid development, consistency |
| Routing | React Router 7 | Standard in React, smooth navigation |
| State Management | Context API | Lightweight, built-in, sufficient for current scale |
| Backend Framework | Express | Lightweight, flexible, large ecosystem |
| ORM | Sequelize | Type-safe, supports MySQL, migrations |
| Database | MySQL | Relational data model fits schema, reliability |
| Authentication | JWT + bcrypt | Stateless, scalable, industry standard |
| Task Scheduling | node-cron | Lightweight, no external dependencies |
| Charting | Chart.js | Lightweight, flexible, good for healthcare metrics |

## System Constraints & Limitations

### Current Limitations
- Single server deployment (no load balancing)
- No database replication or backup automation
- Cron-based reminders tied to server uptime
- Limited to browser storage capacity
- No offline functionality

### Future Improvements
- Microservices architecture
- Distributed caching (Redis)
- Message queues for reminders
- Service workers for PWA
- GraphQL API option

## Integration Points

### Current Integrations
- Browser Notification API (for reminders)
- LocalStorage API (data persistence)
- Fetch API (HTTP communication)
- Chart.js (data visualization)

### Future Integration Capabilities
- OAuth providers (Google, Apple)
- Wearable APIs (Fitbit, Apple Health)
- Payment processors (Stripe)
- Email services (SendGrid, Mailgun)
- SMS providers (Twilio)
- Analytics (Amplitude, Mixpanel)
