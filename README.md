# 🎯 PeopleHub - Employee Management System

<div align="center">

[![React](https://img.shields.io/badge/React-18.0-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-4CAF50?style=flat-square)](LICENSE)

A comprehensive React-based **Employee Management System** with role-based access control, built with TypeScript, React Router, and Tailwind CSS. Perfect for organizations looking to streamline employee management, leave approvals, and attendance tracking.

[Live Demo](#-live-demo) • [Features](#-features) • [Quick Start](#-quick-start) • [Tech Stack](#-technologies-used)

</div>

---

## 👨‍💼 About the Project

This project was created to demonstrate a production-ready employee management system with modern React practices, TypeScript, and Tailwind CSS. It showcases best practices in:
- Component architecture and reusability
- State management patterns
- API integration and error handling
- Responsive design principles
- User experience optimization
  
---

## 🚀 Live Demo

Experience the application live:

**[→ View Live Demo](https://6a21758b4b7a9a20ec49d673--bejewelled-jelly-18e5af.netlify.app)**

Try different roles using the quick login buttons or demo credentials below.

---

## ✨ Features

### 🔐 **Authentication & Authorization**
- ✅ JWT-based authentication with secure token storage
- ✅ Role-based access control (Admin, HR, Manager, Employee)
- ✅ Automatic role-aware redirects after login
- ✅ Protected routes with RequireAuth HOC wrapper
- ✅ Secure logout functionality

### 👤 **User Roles & Dashboards**

#### 🛡️ **Admin Dashboard**
- View comprehensive metrics (total employees, present today, on leave, new joiners)
- Employee management table with advanced search and filters
- Add, edit, and deactivate employees
- Filter by department and status
- Real-time employee data synchronization
- Bulk operations support

#### 📊 **HR Dashboard**
- Leave request queue with approve/reject functionality
- Interactive attendance calendar heatmap for the month
- Payroll summary cards with visual indicators
- Downloadable reports functionality
- Optimistic UI updates for leave approvals
- Advanced analytics view

#### 👔 **Manager Dashboard**
- Comprehensive team member list view
- Leave approval workflows for direct reports
- Department attendance overview
- Team performance metrics and insights
- Quick action buttons for efficiency

#### 👨‍💼 **Employee Dashboard**
- Personal profile card with complete details
- Leave balance widget (casual, sick, annual, earned)
- Leave application form with intelligent validation
- Personal attendance history calendar
- Payslip download and history tracking
- Request status tracking

### 🎨 **UI/UX Excellence**
- 🌙 Modern dark theme with emerald/teal accent colors
- 📱 Fully responsive design (desktop, tablet, mobile)
- 🎭 Smooth collapsible sidebar navigation
- ⚡ Loading skeletons for enhanced UX during data fetch
- 🔔 Smart toast notifications for success/error states
- ✔️ Real-time form validation with helpful feedback
- 🎯 Optimistic UI updates for instant feedback

### 🔄 **API Integration & State Management**
- Axios instance with smart interceptors
- Automatic JWT Bearer token attachment to requests
- Automatic 401 redirect to login on unauthorized access
- Comprehensive mock API for development and testing
- Error handling and retry logic

---

## 📸 Screenshots & UI Sections

### **Login Page**
![Login Screenshot](./src/assets/Screenshot%202026-06-04%20182637.png)
*Clean and intuitive login interface with quick login buttons for different roles*

### **Dashboard Overview**
![Dashboard Screenshot](./src/assets/Screenshot%202026-06-04%20182706.png)
*Modern dashboard with role-based widgets and analytics*

---

## 🔑 Demo Credentials

Use these credentials to test different user roles:

| Role | Email | Password | Access |
|------|-------|----------|--------|
| 🛡️ Admin | admin@peoplehub.com | admin123 | Full system access |
| 📊 HR | hr@peoplehub.com | hr123 | HR operations |
| 👔 Manager | manager@peoplehub.com | manager123 | Team management |
| 👨‍💼 Employee | employee@peoplehub.com | employee123 | Self-service portal |

### Quick Start
1. Click on any of the **"Quick Login"** buttons on the login page
2. You'll be automatically redirected to the appropriate dashboard
3. Explore features available for your role

---

## 📚 Primitive Types & Data Structures

### **TypeScript Type Definitions**

```typescript
// User & Authentication
type UserRole = 'admin' | 'hr' | 'manager' | 'employee';
type AuthStatus = 'authenticated' | 'loading' | 'unauthenticated';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department: string;
  joinDate: Date;
}

// Employee Management
interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  joinDate: Date;
  salary: number;
  status: 'active' | 'inactive' | 'on_leave';
  manager?: string;
}

// Leave Management
type LeaveType = 'casual' | 'sick' | 'annual' | 'earned';
type LeaveStatus = 'pending' | 'approved' | 'rejected';

interface LeaveRequest {
  id: string;
  employeeId: string;
  type: LeaveType;
  startDate: Date;
  endDate: Date;
  days: number;
  reason: string;
  status: LeaveStatus;
  approvedBy?: string;
  approvedDate?: Date;
}

interface LeaveBalance {
  employeeId: string;
  casual: number;
  sick: number;
  annual: number;
  earned: number;
}

// Attendance
interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: Date;
  status: 'present' | 'absent' | 'half_day' | 'on_leave';
  checkInTime?: Date;
  checkOutTime?: Date;
}

// Payroll
interface Payslip {
  id: string;
  employeeId: string;
  month: number;
  year: number;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  generatedDate: Date;
}
```

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React 18, TypeScript, React Router 7 |
| **Styling** | Tailwind CSS v4, Custom CSS Modules |
| **UI Components** | Radix UI, shadcn/ui, Lucide React Icons |
| **HTTP Client** | Axios with interceptors |
| **Date Handling** | date-fns |
| **Notifications** | Sonner Toast |
| **Build Tool** | Vite |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── ui/                    # Reusable UI components (Radix + shadcn)
│   │   ├── AppLayout.tsx          # Main layout with sidebar navigation
│   │   └── RequireAuth.tsx        # Protected route wrapper component
│   ├── lib/
│   │   ├── axios.ts               # Axios instance with JWT interceptors
│   │   ├── auth.ts                # Authentication utilities & helpers
│   │   └── mockApi.ts             # Comprehensive mock API for development
│   ├── pages/
│   │   ├── admin/                 # Admin dashboard & employee management
│   │   ├── hr/                    # HR operations & leave management
│   │   ├── manager/               # Manager dashboard & team views
│   │   ├── employee/              # Employee self-service portal
│   │   └── Login.tsx              # Authentication page
│   ├── types/
│   │   └── index.ts               # Central TypeScript type definitions
│   ├── hooks/                     # Custom React hooks
│   ├── routes.tsx                 # React Router configuration
│   └── App.tsx                    # Root application component
├── assets/
│   └── screenshots/               # UI screenshots & demo images
└── styles/
    ├── fonts.css                  # Font declarations
    ├── tailwind.css               # Tailwind utilities
    └── theme.css                  # Theme variables & custom styles
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm, yarn, or pnpm

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Priyabratasubhransubehera/Smart_Attendance_system.git
cd Smart_Attendance_system

# Install dependencies
npm install
# or
pnpm install

# Create environment file
echo "VITE_API_URL=http://localhost:3000/api" > .env

# Start development server
npm run dev
# or
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api

# Optional: Feature flags
VITE_ENABLE_MOCK_API=true
VITE_DEBUG_MODE=false
```

---

## 🎯 Key Features Implementation

### **Role-Based Redirects**
After login, users are automatically redirected based on their role:
- 🛡️ Admin → `/admin` - Full system access
- 📊 HR → `/hr` - HR operations
- 👔 Manager → `/manager` - Team management
- 👨‍💼 Employee → `/employee` - Self-service portal

### **Protected Routes**
All routes except `/login` are protected. The `RequireAuth` component validates:
1. ✅ Valid JWT token in localStorage
2. ✅ User role matches allowed roles for the route

### **Optimistic UI Updates**
- Leave approvals update the UI immediately
- Synchronizes with API in the background
- Automatically reverts if API call fails
- Provides instant user feedback

### **Advanced Form Validation**
- Leave application form validates dates and required fields
- Employee form validates email format and required fields
- Real-time validation feedback with error messages
- Client-side validation before API submission

### **Responsive Design**
- 🖥️ **Desktop**: Full sidebar navigation with rich content
- 📱 **Mobile**: Collapsible hamburger menu with bottom navigation
- 📱 **Tablet**: Optimized touch-friendly interface

---

## 📊 Mock Data

The application includes comprehensive mock data:
- 👥 8 employees across different departments
- 📋 Leave requests in various states (pending, approved, rejected)
- 📅 Complete attendance records for May 2026
- 💰 Payslip history for the past 5 months
- 📊 Performance metrics and analytics data

---

## 🚀 Future Enhancements

- [ ] Real-time API integration with backend
- [ ] Advanced filtering and sorting with performance optimization
- [ ] Export to CSV/PDF with custom templates
- [ ] Employee onboarding workflow module
- [ ] Performance reviews and feedback system
- [ ] Real-time notifications with WebSocket support
- [ ] Dark/Light mode toggle with persistence
- [ ] Multi-language support (i18n)
- [ ] Advanced analytics dashboard
- [ ] Attendance geolocation tracking
- [ ] Integration with calendar systems
- [ ] Mobile app version

---

## 📋 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

---

## 📄 License

MIT License - Feel free to use this project for learning or commercial purposes.

See the [LICENSE](LICENSE) file for more details.


## 📞 Contact & Support

**Developer**: Priyabrata Subhran Subehera

**For Questions, Issues, or Feedback:**
- 📧 Email: psubhransubehera@gmail.com
- 🐙 GitHub: [@Priyabratasubhransubehera](https://github.com/Priyabratasubhransubehera)
- 📱 LinkedIn: [Priyabrata Subhran](https://www.linkedin.com/in/priyabrata-subhransu-behera-a3992a369/)

**Found a Bug?** Please open an issue on GitHub with:
- Description of the problem
- Steps to reproduce
- Screenshots or error logs
- Your environment details

**Want to Contribute?** We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">

**[⬆ Back to Top](#-peoplehub---employee-management-system)**

Made with by [Priyabrata Subhran Subehera](https://github.com/Priyabratasubhransubehera)

</div>
