# API Documentation

## Base URL
```
Development: http://localhost:5000
Production: https://api.medisync.app (example)
```

## Authentication

### JWT Token Format
All protected endpoints require an `Authorization` header:
```
Authorization: Bearer {token}
```

### Token Payload
```json
{
  "id": 5,
  "iat": 1626979200,
  "exp": 1627065600
}
```

### Getting a Token
1. Register or Login to receive token
2. Token is valid for 24 hours (configurable)
3. Store in `localStorage` on client
4. Include in all subsequent requests

---

## Authentication Endpoints

### POST /api/auth/signup
Register a new user account

**Request**:
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response** (201 Created):
```json
{
  "id": 5,
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2026-07-24T10:00:00Z",
  "updatedAt": "2026-07-24T10:00:00Z"
}
```

**Error** (400 Bad Request):
```json
{
  "message": "Email already in use"
}
```

**Validation**:
- `name`: Required, non-empty string
- `email`: Required, valid email format, unique
- `password`: Required, minimum 6 characters (recommended 8+)

---

### POST /api/auth/login
Authenticate user and receive token

**Request**:
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response** (200 OK):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 5,
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-07-24T10:00:00Z",
    "updatedAt": "2026-07-24T10:00:00Z"
  }
}
```

**Error** (401 Unauthorized):
```http
401 Unauthorized
```

**Error Cases**:
- User email not found
- Incorrect password
- Missing credentials

---

### POST /api/auth/logout
Logout current user (client-side token removal recommended)

**Request**:
```http
POST /api/auth/logout
Authorization: Bearer {token}
```

**Response** (200 OK):
```json
{
  "message": "Logged out successfully"
}
```

---

## Medicines Endpoints

### GET /api/medicines
Get all medicines for authenticated user

**Request**:
```http
GET /api/medicines
Authorization: Bearer {token}
```

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "userId": 5,
    "name": "Aspirin 500mg",
    "dosageTimes": ["morning", "night"],
    "imageUrl": "https://example.com/aspirin.jpg",
    "createdAt": "2026-07-20T10:00:00Z",
    "updatedAt": "2026-07-20T10:00:00Z"
  },
  {
    "id": 2,
    "userId": 5,
    "name": "Lisinopril 10mg",
    "dosageTimes": ["morning"],
    "imageUrl": "",
    "createdAt": "2026-07-21T14:30:00Z",
    "updatedAt": "2026-07-21T14:30:00Z"
  }
]
```

**Query Parameters** (Optional):
```
GET /api/medicines?limit=10&offset=0
GET /api/medicines?sortBy=createdAt&order=desc
```

**Error** (401 Unauthorized):
Invalid or missing token

---

### POST /api/medicines
Create a new medicine

**Request**:
```http
POST /api/medicines
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Metformin 500mg",
  "dosageTimes": ["morning", "noon", "night"],
  "imageUrl": "https://example.com/metformin.jpg"
}
```

**Response** (201 Created):
```json
{
  "id": 3,
  "userId": 5,
  "name": "Metformin 500mg",
  "dosageTimes": ["morning", "noon", "night"],
  "imageUrl": "https://example.com/metformin.jpg",
  "createdAt": "2026-07-24T15:00:00Z",
  "updatedAt": "2026-07-24T15:00:00Z"
}
```

**Validation**:
- `name`: Required, unique per user
- `dosageTimes`: Array of timing strings (morning, noon, night)
- `imageUrl`: Optional URL string

---

### PUT /api/medicines/{id}
Update an existing medicine

**Request**:
```http
PUT /api/medicines/3
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Metformin 500mg - Updated",
  "dosageTimes": ["morning", "night"],
  "imageUrl": "https://example.com/metformin-new.jpg"
}
```

**Response** (200 OK):
```json
{
  "id": 3,
  "userId": 5,
  "name": "Metformin 500mg - Updated",
  "dosageTimes": ["morning", "night"],
  "imageUrl": "https://example.com/metformin-new.jpg",
  "createdAt": "2026-07-24T15:00:00Z",
  "updatedAt": "2026-07-24T16:30:00Z"
}
```

**Error** (404 Not Found):
```json
{
  "message": "Medicine not found"
}
```

---

### DELETE /api/medicines/{id}
Delete a medicine

**Request**:
```http
DELETE /api/medicines/3
Authorization: Bearer {token}
```

**Response** (204 No Content):
```
(empty response body)
```

---

## Health Logs Endpoints

### GET /api/health
Get all health logs for user

**Request**:
```http
GET /api/health
Authorization: Bearer {token}
```

**Response** (200 OK):
```json
[
  {
    "id": 101,
    "userId": 5,
    "type": "bp",
    "High": 120,
    "Low": 80,
    "glucose": null,
    "height": null,
    "weight": null,
    "bmi": null,
    "note": "After workout",
    "createdAt": "2026-07-24T14:30:00Z",
    "updatedAt": "2026-07-24T14:30:00Z"
  },
  {
    "id": 102,
    "userId": 5,
    "type": "diabetes",
    "High": null,
    "Low": null,
    "glucose": 95,
    "height": null,
    "weight": null,
    "bmi": null,
    "note": "Fasting",
    "createdAt": "2026-07-24T08:00:00Z",
    "updatedAt": "2026-07-24T08:00:00Z"
  }
]
```

**Query Parameters**:
```
GET /api/health?type=bp              # Filter by type (bp, diabetes, bmi)
GET /api/health?days=30              # Last N days
GET /api/health?sortBy=createdAt     # Sort field
```

---

### GET /api/health/:type
Get health logs by type

**Request**:
```http
GET /api/health/bp
Authorization: Bearer {token}
```

**Supported Types**:
- `bp` - Blood Pressure
- `diabetes` - Blood Sugar/Glucose
- `bmi` - Body Mass Index

**Response** (200 OK):
```json
[
  {
    "id": 101,
    "userId": 5,
    "type": "bp",
    "High": 120,
    "Low": 80,
    "note": "After workout",
    "createdAt": "2026-07-24T14:30:00Z"
  }
]
```

---

### POST /api/health
Create a new health log entry

**Blood Pressure Entry**:
```http
POST /api/health
Authorization: Bearer {token}
Content-Type: application/json

{
  "type": "bp",
  "High": 125,
  "Low": 82,
  "note": "After exercise"
}
```

**Blood Sugar Entry**:
```http
{
  "type": "diabetes",
  "glucose": 98,
  "note": "Before breakfast"
}
```

**BMI Entry**:
```http
{
  "type": "bmi",
  "height": 175,
  "weight": 75,
  "note": "Morning weight"
}
```

**Response** (201 Created):
```json
{
  "id": 103,
  "userId": 5,
  "type": "bp",
  "High": 125,
  "Low": 82,
  "glucose": null,
  "height": null,
  "weight": null,
  "bmi": null,
  "note": "After exercise",
  "createdAt": "2026-07-24T16:45:00Z",
  "updatedAt": "2026-07-24T16:45:00Z"
}
```

**Validation**:
- `type`: Required (bp, diabetes, bmi)
- Fields required per type:
  - `bp`: High, Low (systolic/diastolic)
  - `diabetes`: glucose
  - `bmi`: height, weight (server calculates BMI)

---

### PUT /api/health/{id}
Update health log entry

**Request**:
```http
PUT /api/health/103
Authorization: Bearer {token}
Content-Type: application/json

{
  "High": 128,
  "Low": 84,
  "note": "Updated measurement"
}
```

**Response** (200 OK):
Updated health log object

---

### DELETE /api/health/{id}
Delete health log entry

**Request**:
```http
DELETE /api/health/103
Authorization: Bearer {token}
```

**Response** (204 No Content):

---

## Prescriptions Endpoints

### GET /api/prescriptions
Get all prescriptions for user

**Request**:
```http
GET /api/prescriptions
Authorization: Bearer {token}
```

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "userId": 5,
    "doctorId": 1,
    "medicines": [
      {
        "name": "Aspirin 500mg",
        "dosage": "1 tablet",
        "frequency": "Twice daily"
      }
    ],
    "notes": "Take with food",
    "prescriptionDate": "2026-07-01",
    "validUntil": "2026-10-01",
    "createdAt": "2026-07-01T10:00:00Z",
    "updatedAt": "2026-07-01T10:00:00Z"
  }
]
```

---

### POST /api/prescriptions
Create new prescription

**Request**:
```http
POST /api/prescriptions
Authorization: Bearer {token}
Content-Type: application/json

{
  "doctorId": 1,
  "medicines": [
    {
      "name": "Aspirin 500mg",
      "dosage": "1 tablet",
      "frequency": "Twice daily"
    }
  ],
  "notes": "Take with food",
  "prescriptionDate": "2026-07-24",
  "validUntil": "2026-10-24"
}
```

**Response** (201 Created):
Prescription object with generated ID

---

### PUT /api/prescriptions/{id}
Update prescription

**Request**:
```http
PUT /api/prescriptions/1
Authorization: Bearer {token}
Content-Type: application/json

{
  "validUntil": "2026-11-01",
  "notes": "Updated instructions"
}
```

**Response** (200 OK):
Updated prescription object

---

### DELETE /api/prescriptions/{id}
Delete prescription

**Request**:
```http
DELETE /api/prescriptions/1
Authorization: Bearer {token}
```

**Response** (204 No Content):

---

## Doctors Endpoints

### GET /api/doctors
Get all doctors for user

**Request**:
```http
GET /api/doctors
Authorization: Bearer {token}
```

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "userId": 5,
    "name": "Dr. Smith",
    "specialty": "Cardiologist",
    "hospital": "City Medical Center",
    "contactNumber": "+1-555-0123",
    "email": "dr.smith@hospital.com",
    "address": "123 Medical Lane",
    "createdAt": "2026-07-15T09:00:00Z",
    "updatedAt": "2026-07-15T09:00:00Z"
  }
]
```

---

### POST /api/doctors
Add new doctor

**Request**:
```http
POST /api/doctors
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Dr. Johnson",
  "specialty": "Endocrinologist",
  "hospital": "Central Hospital",
  "contactNumber": "+1-555-0456",
  "email": "dr.johnson@hospital.com",
  "address": "456 Health Ave"
}
```

**Response** (201 Created):
Doctor object with ID

---

### PUT /api/doctors/{id}
Update doctor information

**Request**:
```http
PUT /api/doctors/1
Authorization: Bearer {token}
Content-Type: application/json

{
  "contactNumber": "+1-555-0999"
}
```

**Response** (200 OK):
Updated doctor object

---

### DELETE /api/doctors/{id}
Delete doctor

**Request**:
```http
DELETE /api/doctors/1
Authorization: Bearer {token}
```

**Response** (204 No Content):

---

## Profile Endpoints

### GET /api/profile
Get user profile

**Request**:
```http
GET /api/profile
Authorization: Bearer {token}
```

**Response** (200 OK):
```json
{
  "id": 1,
  "userId": 5,
  "age": 45,
  "gender": "male",
  "bloodType": "O+",
  "allergies": ["Penicillin", "Shellfish"],
  "medicalHistory": {
    "diabetes": true,
    "hypertension": true,
    "asthma": false
  },
  "emergencyContact": "Jane Doe +1-555-1000",
  "createdAt": "2026-07-15T10:00:00Z",
  "updatedAt": "2026-07-15T10:00:00Z"
}
```

---

### PUT /api/profile
Update user profile

**Request**:
```http
PUT /api/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "age": 46,
  "bloodType": "A+",
  "allergies": ["Penicillin"],
  "medicalHistory": {
    "diabetes": true,
    "hypertension": false
  }
}
```

**Response** (200 OK):
Updated profile object

---

## Dashboard Endpoints

### GET /api/dashboard
Get dashboard summary data

**Request**:
```http
GET /api/dashboard
Authorization: Bearer {token}
```

**Response** (200 OK):
```json
{
  "totalMedicines": 5,
  "todayMedicines": [
    {
      "id": 1,
      "name": "Aspirin",
      "times": ["morning", "night"]
    }
  ],
  "recentHealthLogs": [
    {
      "type": "bp",
      "High": 120,
      "Low": 80,
      "createdAt": "2026-07-24T14:30:00Z"
    }
  ],
  "totalPrescriptions": 2,
  "totalDoctors": 3,
  "lastUpdated": "2026-07-24T17:00:00Z"
}
```

---

### GET /api/dashboard/health-summary
Get aggregated health summary

**Request**:
```http
GET /api/dashboard/health-summary
Authorization: Bearer {token}
```

**Response** (200 OK):
```json
{
  "bloodPressure": {
    "latest": {"High": 120, "Low": 80},
    "average": {"High": 122, "Low": 81},
    "trend": "stable"
  },
  "bloodSugar": {
    "latest": 95,
    "average": 98,
    "trend": "improving"
  },
  "bmi": {
    "latest": 24.5,
    "category": "normal weight",
    "trend": "stable"
  },
  "lastUpdated": "2026-07-24T17:00:00Z"
}
```

---

## Error Responses

### Standard Error Format

**400 Bad Request**:
```json
{
  "message": "Invalid input data",
  "errors": [
    { "field": "email", "message": "Invalid email format" }
  ]
}
```

**401 Unauthorized**:
```json
{
  "message": "Missing or invalid authentication token"
}
```

**403 Forbidden**:
```json
{
  "message": "You do not have permission to access this resource"
}
```

**404 Not Found**:
```json
{
  "message": "Resource not found"
}
```

**500 Internal Server Error**:
```json
{
  "message": "An unexpected error occurred",
  "requestId": "req-12345"
}
```

---

## Rate Limiting (Future)

Planned rate limits per user:
- 100 requests per minute
- 5000 requests per hour

Response headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1626979260
```

---

## Pagination (Future)

**Query Parameters**:
```
GET /api/medicines?page=1&limit=20
GET /api/health?offset=0&limit=50
```

**Response Format**:
```json
{
  "data": [...],
  "pagination": {
    "total": 150,
    "page": 1,
    "limit": 20,
    "pages": 8
  }
}
```

---

## Versioning Strategy

Current API Version: **v1** (implicit)

Future versioning:
```
GET /api/v1/medicines
GET /api/v2/medicines (with different response format)
```

---

## Common Use Cases

### 1. User Registration Flow
```
POST /api/auth/signup
↓ (returns token)
GET /api/profile (create/fetch profile)
```

### 2. Add and Track Medicine with Reminder
```
POST /api/medicines
↓ (stored in system)
On scheduled time: Browser notification via useMedicineReminder hook
```

### 3. Track Health and View Trends
```
POST /api/health (record measurement)
↓
GET /api/health/bp (fetch all BP readings)
↓ (frontend renders charts)
```

### 4. View Complete Health Dashboard
```
GET /api/dashboard (all summary data in one call)
↓
GET /api/dashboard/health-summary (detailed metrics)
```

---

## Webhooks (Future Enhancement)

Planned webhooks:
- `medicine.reminder` - Medication time reached
- `health.alert` - Abnormal reading detected
- `prescription.expiring` - Prescription near expiration
- `appointment.reminder` - Doctor appointment upcoming
