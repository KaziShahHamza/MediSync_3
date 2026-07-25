# 🏥 Medicine & Health Tracker

A comprehensive personal healthcare management platform that helps users track their medications, monitor vital health metrics, manage medical records, and maintain relationships with healthcare providers.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Component Architecture](#component-architecture)
- [Usage Guide](#usage-guide)
- [Development](#development)
- [Contributing](#contributing)

## 🎯 Overview

Medicine & Health Tracker is a full-stack application designed to empower users to manage their personal health information in one secure place. Whether you're managing chronic conditions, tracking prescriptions, or monitoring daily vital signs, this application provides an intuitive interface to keep everything organized.

The platform combines a modern React frontend with a robust Node.js/Express backend, utilizing MySQL for persistent data storage and JWT for secure authentication.

## ✨ Features

### 🔐 User Authentication & Security
- User registration and login with secure password hashing (bcryptjs)
- JWT-based authentication for API protection
- Role-based access control with protected routes
- Session management and token validation

### 💊 Medicine Management
- **Add & Manage Medicines**: Store medicine names, dosages, and images
- **Dosage Scheduling**: Set multiple dosage times throughout the day
- **Medicine Reminders**: Automated browser notifications for scheduled dosages
- **Medicine List**: View all medicines with quick action options
- **Smart Reminders**: Background reminder engine using `node-cron` for scheduled notifications

### 📊 Health Tracking
- **Blood Pressure Monitoring**: Track systolic and diastolic readings
- **Blood Sugar (Glucose) Tracking**: Monitor diabetes and glucose levels
- **BMI Calculator & Tracking**: Calculate and track Body Mass Index over time
- **Health Charts**: Visual representation of health trends using Chart.js
- **Health History**: Complete history of all health measurements with notes
- **Health Summary**: Dashboard overview of recent health metrics

### 📋 Medical Records
- **Prescriptions Management**: Store and organize prescriptions from doctors
- **Prescription Details**: Track medications, dosages, and doctor information
- **Digital Records**: Secure storage of prescription information
- **Prescription Cards**: Easy-to-view prescription summaries

### 👨‍⚕️ Doctor Management
- **Doctor Profiles**: Store doctor names, specialties, and contact information
- **Hospital Information**: Track hospital/clinic locations and details
- **Contact Management**: Keep important contact details organized
- **Doctor Directory**: Quick access to all your healthcare providers

### 👤 User Profile Management
- **Personal Information**: Store and update personal health details
- **Medical History**: Maintain medical background information
- **Profile Dashboard**: Quick overview of your health profile
- **Information Organization**: Structured profile management

### 📈 Health Dashboard
- **Health Summary Cards**: Quick stats on your health metrics
- **Recent Activity**: Track your recent health entries
- **Today's Medicines**: View medicines scheduled for today
- **Quick Links**: Fast navigation to important features
- **Clock Widget**: Live time display on dashboard
- **Welcome Card**: Personalized greeting

## 🛠 Tech Stack

### Frontend
- **React 19**: Modern UI library for building interactive interfaces
- **Vite**: Lightning-fast build tool and dev server
- **Tailwind CSS 4**: Utility-first CSS framework for styling
- **Chart.js**: JavaScript charting library for data visualization
- **React Router 7**: Client-side routing
- **React Icons**: Icon library for UI components
- **Lucide React**: Modern icon set
- **ESLint**: Code quality and linting

### Backend
- **Node.js**: JavaScript runtime
- **Express 5**: Web application framework
- **Sequelize 6**: ORM for database operations
- **MySQL 2**: MySQL client for database connectivity
- **MySQL Database**: Relational database for data persistence
- **JWT (jsonwebtoken)**: Secure authentication tokens
- **bcryptjs**: Password hashing and encryption
- **CORS**: Cross-Origin Resource Sharing support
- **node-cron**: Task scheduler for reminders
- **dotenv**: Environment variable management

## 📁 Project Structure

```
medicine_3/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/              # Reusable React components
│   │   │   ├── auth/                # Authentication components
│   │   │   ├── dashboard/           # Dashboard components
│   │   │   ├── dashboard2/          # Alternative dashboard view
│   │   │   ├── profile/             # Profile-related components
│   │   │   ├── BloodPressureChart.jsx
│   │   │   ├── BloodPressureForm.jsx
│   │   │   ├── BloodSugarChart.jsx
│   │   │   ├── BloodSugarForm.jsx
│   │   │   ├── BMIChart.jsx
│   │   │   ├── BMIForm.jsx
│   │   │   ├── BMIResult.jsx
│   │   │   ├── DoctorCard.jsx
│   │   │   ├── HealthCharts.jsx
│   │   │   ├── HealthLogForm.jsx
│   │   │   ├── MedicineForm.jsx
│   │   │   ├── MedicineList.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PrescriptionCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/                 # React Context for state management
│   │   │   ├── AuthContext.jsx      # Authentication state
│   │   │   ├── DoctorContext.jsx    # Doctor data state
│   │   │   ├── MedicineContext.jsx  # Medicine data state
│   │   │   ├── PrescriptionContext.jsx
│   │   │   └── ProfileContext.jsx   # User profile state
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useHealthLogs.js     # Health logging hook
│   │   │   └── useMedicineReminder.js  # Medicine reminder hook
│   │   ├── pages/                   # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Dashboard2.jsx
│   │   │   ├── Doctors.jsx
│   │   │   ├── Health.jsx
│   │   │   ├── Health2.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Medicines.jsx
│   │   │   ├── Prescriptions.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── TestPage.jsx
│   │   ├── utils/                   # Utility functions
│   │   │   ├── dashboardHelpers.js
│   │   │   └── timeMap.js
│   │   ├── App.jsx                  # Root component
│   │   ├── main.jsx                 # Application entry point
│   │   └── index.css                # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
│
├── server/                          # Express Backend
│   ├── models/                      # Database models
│   │   ├── User.js                  # User model
│   │   ├── Medicine.js              # Medicine model
│   │   ├── HealthLog.js             # Health tracking model
│   │   ├── Prescription.js          # Prescription model
│   │   ├── Doctor.js                # Doctor model
│   │   ├── Profile.js               # User profile model
│   │   └── index.js                 # Model associations
│   ├── routes/                      # API routes
│   │   ├── auth.routes.js           # Authentication endpoints
│   │   ├── medicine.routes.js       # Medicine CRUD endpoints
│   │   ├── health.routes.js         # Health tracking endpoints
│   │   ├── profile.routes.js        # Profile endpoints
│   │   ├── prescription.routes.js   # Prescription endpoints
│   │   ├── doctor.routes.js         # Doctor endpoints
│   │   └── dashboard.routes.js      # Dashboard data endpoints
│   ├── services/                    # Business logic
│   │   ├── dashboardService.js      # Dashboard aggregation
│   │   ├── healthSummaryService.js  # Health summary calculations
│   │   └── reminderScheduler.js     # Reminder scheduling engine
│   ├── middleware/                  # Express middleware
│   │   └── auth.js                  # JWT authentication middleware
│   ├── config/                      # Configuration files
│   │   └── database.js              # Database connection config
│   ├── server.js                    # Application entry point
│   └── package.json
│
├── sql_queries.md                   # SQL reference queries
└── README.md                        # This file
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MySQL Server** (v5.7 or higher) - [Download](https://www.mysql.com/downloads/)
- **Git** - [Download](https://git-scm.com/)

### Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd medicine_3
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Configuration

1. **Create Environment File for Backend**

   Create a `.env` file in the `server` directory:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=medicine_db
   DB_PORT=3306

   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # JWT Secret
   JWT_SECRET=your_super_secret_jwt_key_change_this

   # API Base URL (for frontend)
   API_URL=http://localhost:5000
   ```

2. **Database Setup**

   Create MySQL database:
   ```bash
   mysql -u root -p
   ```
   ```sql
   CREATE DATABASE medicine_db;
   USE medicine_db;
   ```

   The Sequelize ORM will automatically create tables on first run.

3. **Create Frontend Configuration (Optional)**

   If needed, create a `.env` file in the `client` directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

### Running the Application

#### Start Backend Server

```bash
cd server
npm run dev
```

The server will start on `http://localhost:5000`

#### Start Frontend Development Server

In a new terminal:
```bash
cd client
npm run dev
```

The frontend will typically run on `http://localhost:5173`

#### Build for Production

Frontend:
```bash
cd client
npm run build
```

The optimized build will be in the `dist/` directory.

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Medicines
- `GET /api/medicines` - Get all medicines for user
- `POST /api/medicines` - Create new medicine
- `PUT /api/medicines/:id` - Update medicine
- `DELETE /api/medicines/:id` - Delete medicine

### Health Logs
- `GET /api/health` - Get all health logs
- `POST /api/health` - Create health log entry
- `GET /api/health/:type` - Get logs by type (bp, diabetes, bmi)
- `PUT /api/health/:id` - Update health log
- `DELETE /api/health/:id` - Delete health log

### Prescriptions
- `GET /api/prescriptions` - Get all prescriptions
- `POST /api/prescriptions` - Create prescription
- `PUT /api/prescriptions/:id` - Update prescription
- `DELETE /api/prescriptions/:id` - Delete prescription

### Doctors
- `GET /api/doctors` - Get all doctors
- `POST /api/doctors` - Add new doctor
- `PUT /api/doctors/:id` - Update doctor
- `DELETE /api/doctors/:id` - Delete doctor

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

### Dashboard
- `GET /api/dashboard` - Get dashboard summary
- `GET /api/dashboard/health-summary` - Get health summary

## 🗄️ Database Schema

### Users Table
```
- id (Primary Key)
- name
- email (Unique)
- password (Hashed)
- createdAt
- updatedAt
```

### Medicines Table
```
- id (Primary Key)
- userId (Foreign Key)
- name
- dosageTimes (JSON array of times)
- imageUrl
- createdAt
- updatedAt
```

### HealthLog Table
```
- id (Primary Key)
- userId (Foreign Key)
- type (ENUM: 'bp', 'diabetes', 'bmi')
- High (for BP)
- Low (for BP)
- glucose (for diabetes)
- height (for BMI)
- weight (for BMI)
- bmi (calculated BMI)
- note (optional notes)
- createdAt
- updatedAt
```

### Doctors Table
```
- id (Primary Key)
- userId (Foreign Key)
- name
- specialty
- hospital
- contactNumber
- email
- address
- createdAt
- updatedAt
```

### Prescriptions Table
```
- id (Primary Key)
- userId (Foreign Key)
- doctorId (Foreign Key)
- medicines (JSON array)
- notes
- prescriptionDate
- validUntil
- createdAt
- updatedAt
```

### Profile Table
```
- id (Primary Key)
- userId (Foreign Key, Unique)
- age
- gender
- bloodType
- allergies
- medicalHistory (JSON)
- emergencyContact
- createdAt
- updatedAt
```

## 🏗️ Component Architecture

### Context Providers
The application uses React Context API for global state management:

- **AuthContext**: Manages user authentication state and login/logout
- **MedicineContext**: Manages medicines and their schedules
- **ProfileContext**: Manages user profile information
- **PrescriptionContext**: Manages prescriptions data
- **DoctorContext**: Manages doctor information

### Key Components

#### Health Tracking
- `BloodPressureForm` / `BloodPressureChart` - BP tracking
- `BloodSugarForm` / `BloodSugarChart` - Blood sugar monitoring
- `BMIForm` / `BMIChart` / `BMIResult` - BMI calculation and tracking
- `HealthLogForm` - Generic health log form

#### Dashboard Components
- `HealthSummaryCard` - Quick health overview
- `StatCard` - Individual statistics
- `TodayMedicines` - Today's medication schedule
- `RecentActivity` - Recent user activity
- `QuickLinkCard` - Navigation shortcuts

#### Medicine Management
- `MedicineForm` - Add/edit medicines
- `MedicineList` - Display medicines
- `DoctorCard` - Doctor information display
- `PrescriptionCard` - Prescription display

### Custom Hooks

#### useMedicineReminder
Manages background medicine reminders and browser notifications. Automatically triggers notifications at scheduled dosage times.

#### useHealthLogs
Handles fetching and managing health log data with filtering capabilities.

## 📖 Usage Guide

### Adding Medicine
1. Navigate to the Medicines page
2. Click "Add Medicine"
3. Enter medicine name and select dosage times
4. (Optional) Upload medicine image
5. Save medicine

### Tracking Health Metrics
1. Go to Health Dashboard
2. Select metric type (Blood Pressure, Blood Sugar, or BMI)
3. Enter values and any notes
4. Submit to save

### Managing Doctors
1. Go to Doctors section
2. Click "Add Doctor"
3. Fill in doctor details (name, specialty, hospital, contact)
4. Save doctor information

### Viewing Health Insights
1. Access Dashboard
2. View health summary cards with trends
3. Charts show historical data for each metric

## 👨‍💻 Development

### Available Scripts

**Frontend:**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

**Backend:**
```bash
npm run dev      # Start Node server with nodemon
```

### Code Style
- Frontend uses ESLint with React plugin
- Follow existing code patterns
- Use functional components with hooks in React
- Implement proper error handling

### Adding New Features

1. **Backend Feature**:
   - Create model in `server/models/`
   - Create routes in `server/routes/`
   - Create service in `server/services/` if needed
   - Add middleware if authentication is needed

2. **Frontend Feature**:
   - Create component in appropriate `src/components/` folder
   - Use Context for state management
   - Create custom hook if needed
   - Add route in `App.jsx`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Check credentials in `.env` file
- Verify database exists

### Port Already in Use
- Change port in `.env` for backend
- Check if another application is using the port

### Module Not Found Errors
- Run `npm install` in both client and server directories
- Clear node_modules and reinstall if issues persist

### CORS Errors
- Ensure backend server is running
- Check CORS configuration in `server.js`
- Verify API URLs in frontend `.env`

## 📧 Support

For issues and questions, please open an issue in the repository or contact the development team.

---

**Made with ❤️ for better health management**
