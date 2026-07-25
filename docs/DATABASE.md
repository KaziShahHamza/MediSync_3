# Database Schema & Design

## Database Overview
- **Type**: Relational (MySQL)
- **ORM**: Sequelize 6
- **Engine**: InnoDB (transactional support)
- **Charset**: utf8mb4 (Unicode support)

## Entity Relationship Diagram (ERD)

```
┌─────────────┐
│    User     │
├─────────────┤
│ id (PK)     │
│ name        │◄─────┐
│ email (UQ)  │      │
│ password    │      │ 1:1
│ createdAt   │      │
│ updatedAt   │      │
└─────────────┘      │
     │ 1             │
     │              ┌──────────┐
     ├─────────────►│ Profile  │
     │              ├──────────┤
     │              │ id (PK)  │
     │              │ userId   │
     │ 1            │ age      │
     │              │ gender   │
     │ N            │ bloodType
     │              │ allergies│
┌─────────────┐     │ emergencyC
│  Medicine   │     │ createdAt│
├─────────────┤     │ updatedAt│
│ id (PK)     │     └──────────┘
│ userId (FK) │
│ name        │     ┌──────────┐
│ dosageTimes │────►│ HealthLog│
│ imageUrl    │     ├──────────┤
│ createdAt   │  1  │ id (PK)  │
│ updatedAt   │     │ userId   │
└─────────────┘  N  │ type     │
                    │ High/Low │
                    │ glucose  │
                    │ height   │
                    │ weight   │
                    │ bmi      │
                    │ note     │
                    │ createdAt│
                    └──────────┘

     ┌─────────────┐
     │   Doctor    │
     ├─────────────┤
     │ id (PK)     │
     │ userId (FK) │
     │ name        │
     │ specialty   │
     │ hospital    │
     │ contactNo   │
     │ email       │
     │ address     │
     │ createdAt   │
     │ updatedAt   │
     └─────────────┘
            ▲
            │ 1
            │
     ┌──────────────────┐
     │ Prescription     │
     ├──────────────────┤
     │ id (PK)          │
     │ userId (FK)      │
     │ doctorId (FK)    │
     │ medicines (JSON) │
     │ notes            │
     │ prescDate        │
     │ validUntil       │
     │ createdAt        │
     │ updatedAt        │
     └──────────────────┘
```

## Detailed Table Schemas

### 1. Users Table
**Purpose**: Store user authentication credentials and basic info

```sql
CREATE TABLE Users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_email (email),
  INDEX idx_createdAt (createdAt)
);
```

**Fields**:
- `id`: Unique user identifier
- `name`: User's full name
- `email`: Email address (must be unique, used for login)
- `password`: Bcrypt hashed password (never plaintext)
- `createdAt`: Account creation timestamp
- `updatedAt`: Last profile update timestamp

**Constraints**:
- Primary key on `id` ensures uniqueness
- Unique constraint on `email` prevents duplicate accounts
- Indexes on `email` for login queries and `createdAt` for sorting

**Relationships**:
- One-to-One: User → Profile
- One-to-Many: User → Medicines (cascade delete)
- One-to-Many: User → HealthLogs (cascade delete)
- One-to-Many: User → Doctors (cascade delete)
- One-to-Many: User → Prescriptions (cascade delete)

---

### 2. Profiles Table
**Purpose**: Store extended user health information

```sql
CREATE TABLE Profiles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL UNIQUE,
  age INT,
  gender ENUM('male', 'female', 'other'),
  bloodType ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
  allergies JSON DEFAULT NULL,
  medicalHistory JSON DEFAULT NULL,
  emergencyContact VARCHAR(255),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
  INDEX idx_userId (userId)
);
```

**Fields**:
- `id`: Profile record identifier
- `userId`: Foreign key to Users (one-to-one relationship)
- `age`: User's age
- `gender`: Gender (ENUM restricted values)
- `bloodType`: Blood type (ENUM for common types)
- `allergies`: JSON array of allergies (structured data)
- `medicalHistory`: JSON object of medical conditions
- `emergencyContact`: Contact info for emergencies
- `createdAt`, `updatedAt`: Timestamps

**Design Decisions**:
- Separate table from Users for optional extended info
- JSON fields allow flexible data without schema changes
- ENUM fields ensure data consistency

---

### 3. Medicines Table
**Purpose**: Store user's medicines and schedules

```sql
CREATE TABLE Medicines (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  dosageTimes JSON DEFAULT '[]',
  imageUrl VARCHAR(500),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
  INDEX idx_userId (userId),
  INDEX idx_createdAt (createdAt)
);
```

**Fields**:
- `id`: Medicine record identifier
- `userId`: Foreign key to Users (many-to-one)
- `name`: Medicine name (e.g., "Aspirin 500mg")
- `dosageTimes`: JSON array of scheduled times (e.g., ["morning", "noon", "night"])
- `imageUrl`: URL to medicine image for visual identification
- `createdAt`, `updatedAt`: Timestamps

**Example Data**:
```json
{
  "id": 1,
  "userId": 5,
  "name": "Aspirin 500mg",
  "dosageTimes": ["morning", "night"],
  "imageUrl": "https://example.com/aspirin.jpg",
  "createdAt": "2026-07-20T10:00:00Z",
  "updatedAt": "2026-07-20T10:00:00Z"
}
```

**Design Decisions**:
- JSON for dosageTimes allows flexible scheduling
- Simple model focused on essential medicine info
- Cascade delete ensures cleanup when user deleted

---

### 4. HealthLogs Table
**Purpose**: Store time-series health measurements

```sql
CREATE TABLE HealthLogs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  type ENUM('bp', 'diabetes', 'bmi') NOT NULL,
  High DECIMAL(5,2),        -- Systolic pressure
  Low DECIMAL(5,2),         -- Diastolic pressure
  glucose DECIMAL(6,2),     -- Blood sugar level
  height DECIMAL(5,2),      -- Height in cm
  weight DECIMAL(6,2),      -- Weight in kg
  bmi DECIMAL(5,2),         -- Calculated BMI
  note TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
  INDEX idx_userId_type (userId, type),
  INDEX idx_createdAt (createdAt),
  INDEX idx_userId_createdAt (userId, createdAt DESC)
);
```

**Fields**:
- `id`: Health log record identifier
- `userId`: Foreign key to Users
- `type`: Type of measurement (ENUM: 'bp', 'diabetes', 'bmi')
- `High`: Systolic blood pressure (for BP type)
- `Low`: Diastolic blood pressure (for BP type)
- `glucose`: Blood glucose level (for diabetes type)
- `height`: Height in cm (for BMI type)
- `weight`: Weight in kg (for BMI type)
- `bmi`: Calculated BMI (for BMI type)
- `note`: Optional user notes
- `createdAt`, `updatedAt`: Timestamps

**Example Data**:
```json
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
}
```

**Design Decisions**:
- NULL values allow flexible schema per type
- Composite index on (userId, type) for filtering queries
- Index on createdAt for time-series queries
- Separate index (userId, createdAt DESC) for recent data queries

---

### 5. Doctors Table
**Purpose**: Store healthcare provider information

```sql
CREATE TABLE Doctors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  specialty VARCHAR(100),
  hospital VARCHAR(255),
  contactNumber VARCHAR(20),
  email VARCHAR(255),
  address TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
  INDEX idx_userId (userId),
  INDEX idx_specialty (specialty)
);
```

**Fields**:
- `id`: Doctor record identifier
- `userId`: Foreign key to Users
- `name`: Doctor's full name
- `specialty`: Medical specialty (e.g., "Cardiologist")
- `hospital`: Hospital/clinic name
- `contactNumber`: Phone number
- `email`: Doctor's email
- `address`: Office address
- `createdAt`, `updatedAt`: Timestamps

---

### 6. Prescriptions Table
**Purpose**: Store prescription information

```sql
CREATE TABLE Prescriptions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  doctorId INT,
  medicines JSON DEFAULT '[]',
  notes TEXT,
  prescriptionDate DATE,
  validUntil DATE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (doctorId) REFERENCES Doctors(id) ON DELETE SET NULL,
  INDEX idx_userId (userId),
  INDEX idx_doctorId (doctorId),
  INDEX idx_validUntil (validUntil)
);
```

**Fields**:
- `id`: Prescription record identifier
- `userId`: Foreign key to Users
- `doctorId`: Foreign key to Doctors (nullable)
- `medicines`: JSON array of prescribed medicines
- `notes`: Special notes from doctor
- `prescriptionDate`: Date prescription was issued
- `validUntil`: Expiration date of prescription
- `createdAt`, `updatedAt`: Timestamps

**Example Data**:
```json
{
  "id": 1,
  "userId": 5,
  "doctorId": 1,
  "medicines": [
    {"name": "Aspirin 500mg", "dosage": "1 tablet", "frequency": "Twice daily"},
    {"name": "Lisinopril 10mg", "dosage": "1 tablet", "frequency": "Once daily"}
  ],
  "notes": "Take with food",
  "prescriptionDate": "2026-07-01",
  "validUntil": "2026-10-01",
  "createdAt": "2026-07-01T10:00:00Z",
  "updatedAt": "2026-07-01T10:00:00Z"
}
```

---

## Database Relationships

### One-to-One
- **User → Profile**: Each user has exactly one profile
- Implemented with UNIQUE constraint on userId in Profile table

### One-to-Many
- **User → Medicines**: One user can have multiple medicines
- **User → HealthLogs**: One user can have multiple health entries
- **User → Doctors**: One user can have multiple doctors
- **User → Prescriptions**: One user can have multiple prescriptions
- Implemented with foreign key on userId in child tables

### Optional Many-to-One
- **Prescription → Doctor**: Prescription can reference a doctor (nullable)
- Allows prescriptions without specific doctor association

## Cascading Delete Strategy

```
User Deleted
    ↓
Cascade Delete:
├─ All Medicines
├─ All HealthLogs
├─ All Doctors
├─ All Prescriptions
│  └─ Note: doctorId becomes NULL if present
└─ Profile (deleted due to unique constraint)
```

**Rationale**: When user account is deleted, all associated data should be removed to protect privacy and maintain referential integrity.

## Indexing Strategy

| Table | Columns | Reason |
|-------|---------|--------|
| Users | email | Fast login queries |
| Users | createdAt | User growth reporting |
| Medicines | userId | Fetch user medicines |
| Medicines | createdAt | Recent medicines sorting |
| HealthLogs | (userId, type) | Filter by user and type |
| HealthLogs | createdAt | Time-series queries |
| HealthLogs | (userId, createdAt DESC) | Recent entries optimization |
| Doctors | userId | Fetch user doctors |
| Doctors | specialty | Filter by specialty |
| Prescriptions | userId | Fetch user prescriptions |
| Prescriptions | doctorId | Fetch prescriptions by doctor |
| Prescriptions | validUntil | Find expiring prescriptions |

## Data Type Decisions

| Data | Type | Reasoning |
|------|------|-----------|
| Blood Pressure | DECIMAL(5,2) | Medical precision needed |
| Blood Sugar | DECIMAL(6,2) | Medical measurements |
| BMI | DECIMAL(5,2) | Medical metric precision |
| Height/Weight | DECIMAL(5,2) | Physical measurements |
| Names | VARCHAR(255) | Unicode support, reasonable length |
| Notes | TEXT | Unbounded user input |
| Dosage Times | JSON | Flexible scheduling |
| Allergies | JSON | Variable list of allergies |
| Medical History | JSON | Flexible medical conditions |

## Query Patterns

### Get User's Recent Medicines
```sql
SELECT * FROM Medicines 
WHERE userId = ? 
ORDER BY createdAt DESC 
LIMIT 10;
```

### Get Health Trends for Charts
```sql
SELECT type, High, Low, glucose, weight, bmi, createdAt
FROM HealthLogs
WHERE userId = ? AND type = ? AND createdAt >= DATE_SUB(NOW(), INTERVAL 30 DAY)
ORDER BY createdAt ASC;
```

### Get Today's Medicines (requires application logic)
```sql
SELECT * FROM Medicines 
WHERE userId = ? 
AND JSON_CONTAINS(dosageTimes, JSON_QUOTE('morning'));
```

### Find Expiring Prescriptions
```sql
SELECT * FROM Prescriptions
WHERE userId = ? AND validUntil < DATE_ADD(NOW(), INTERVAL 7 DAY)
ORDER BY validUntil ASC;
```

### Get Dashboard Summary Data
```sql
SELECT 
  (SELECT COUNT(*) FROM Medicines WHERE userId = ?) as total_medicines,
  (SELECT COUNT(*) FROM HealthLogs WHERE userId = ? AND createdAt >= DATE_SUB(NOW(), INTERVAL 30 DAY)) as recent_logs,
  (SELECT COUNT(*) FROM Prescriptions WHERE userId = ?) as total_prescriptions,
  (SELECT COUNT(*) FROM Doctors WHERE userId = ?) as total_doctors;
```

## Performance Considerations

### Query Optimization
- Composite indexes for frequently used filter combinations
- DESC ordering on timestamps for recent data retrieval
- Avoid SELECT * in production (specify needed columns)

### Scaling Considerations
- **Partitioning**: HealthLogs could be partitioned by date for very large datasets
- **Archiving**: Old health logs could be moved to archive table after retention period
- **Replication**: Read replicas for analytics queries

### Connection Pooling
- Sequelize manages connection pool (default 5 connections)
- Configurable pool size in database.js

## Data Integrity

### Constraints Enforced
- NOT NULL on critical fields (name, email, userId)
- UNIQUE on email (prevents duplicate accounts)
- Foreign key constraints (referential integrity)
- ENUM constraints (valid values only)

### Transaction Support
- InnoDB engine provides ACID compliance
- Multi-row transactions supported
- Important for operations affecting multiple tables

## Backup & Recovery

### Recommended Backup Strategy
- Daily full database backups
- Hourly incremental backups
- Point-in-time recovery capability
- Off-site backup storage

### Data Retention Policy
- User data: Retained for account lifetime + 90 days grace period
- Deleted data: Permanently removed after 30 days (cascade delete)
- Audit logs: Retained for 1 year minimum

## Security Considerations

### Data Protection
- Passwords hashed with bcryptjs (never plaintext)
- HIPAA-sensitive fields (health data) in dedicated table
- No sensitive data in logs or backups
- Encryption at rest recommended for production

### Access Control
- All data queries filtered by userId at application level
- Database-level user with minimal required permissions
- No direct production database access

## Migration Strategy

### Adding New Column
```javascript
// Sequelize migration approach
sequelize.define('HealthLog', {
  // existing fields...
  prescriptionId: {
    type: DataTypes.INTEGER,
    references: { model: 'Prescriptions', key: 'id' }
  }
});
```

### Adding New Table
```javascript
// Create new model in models/ folder
// Add associations in models/index.js
// Run sequelize sync or migration
```
