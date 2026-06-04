# PeopleHub - Feature Guide

## 🎯 Complete Feature List

### Authentication System
- ✅ JWT-based authentication
- ✅ Token storage in localStorage
- ✅ Automatic token injection via Axios interceptor
- ✅ 401 redirect to login page
- ✅ Role-based redirect after login
- ✅ Protected routes with role validation
- ✅ Quick login buttons for demo

### Admin Dashboard Features

#### Metrics Overview
- 📊 Total Employees count
- 📊 Present Today with attendance rate percentage
- 📊 On Leave with pending requests badge
- 📊 New Joiners (last 30 days)

#### Employee Management
- 🔍 Search by name, email, or department
- 🔍 Filter by department dropdown
- 🔍 Filter by status (active, remote, on-leave, inactive)
- ➕ Add new employee modal
- ✏️ Edit employee details
- 🗑️ Deactivate employee
- 👤 Employee table with avatars
- 📱 Responsive table design

#### Employee Form
- Full name validation
- Email validation
- Department selection
- Position field
- Phone number (optional)
- Join date picker
- Status management

### HR Dashboard Features

#### Leave Management
- 📋 Pending leave requests queue
- ✅ Approve leave with optimistic UI
- ❌ Reject leave with optimistic UI
- 👤 Employee avatars in requests
- 📅 Date range display
- 💬 Leave reason display
- 🏷️ Leave type badges (sick, casual, annual)

#### Attendance Heatmap
- 📅 Monthly calendar view (May 2026)
- 🟢 Green for high attendance (>90%)
- 🟡 Yellow for medium attendance (70-90%)
- 🔴 Red for low attendance (<70%)
- ⚫ Gray for weekends/holidays
- 📊 Color-coded legend

#### Payroll Dashboard
- 💰 Total Salaries summary
- ➕ Allowances total
- ➖ Deductions total
- ✅ Net Payable amount
- 📥 Download Reports button

### Manager Dashboard Features

#### Team Overview
- 👥 Team members table
- 📊 Team size metric
- 📊 Present today count with rate
- 📊 Pending approvals count
- 📊 Team performance score

#### Leave Approvals
- 📋 Direct reports leave requests
- ✅ Quick approve button
- ❌ Quick reject button
- 🔔 Pending request counter
- 👤 Employee information display

#### Team Attendance
- 📊 Present count
- 📊 On leave count
- 📊 Remote workers count
- 📊 Overall attendance rate

### Employee Dashboard Features

#### Profile Card
- 👤 Large avatar display
- 📧 Email address
- 🆔 Employee ID
- 🏢 Department badge
- 💼 Position

#### Leave Balance
- 🎫 Casual leave available
- 🏥 Sick leave available
- 🌴 Annual leave available
- 📊 Total used this year
- ➕ Apply Leave button

#### Leave Application
- 📝 Leave type selector (casual, sick, annual, maternity, paternity)
- 📅 Start date picker
- 📅 End date picker
- ✍️ Reason text area
- ✅ Form validation
- 📤 Submit request

#### Leave History
- 📋 All submitted requests
- 🏷️ Status badges (pending, approved, rejected)
- 📅 Date range display
- 💬 Reason shown
- 📜 Scrollable list

#### Attendance Calendar
- 📅 Monthly view (May 2026)
- 🟢 Present days
- 🔵 Leave days
- 🔴 Absent days
- ⚫ Holidays/weekends
- 📊 Color legend

#### Payslip Download
- 📋 Last 5 months payslips
- 💰 Basic salary column
- ➕ Allowances column
- ➖ Deductions column
- 💵 Net salary column
- 📥 Download button per payslip

### UI/UX Features

#### Layout
- 🎨 Modern dark theme
- 🟢 Emerald/teal accent colors
- 📱 Fully responsive design
- 🔲 Collapsible sidebar (desktop)
- 📱 Bottom nav on mobile
- 🔍 Global search bar (top)
- 🔔 Notification bell with badge
- 👤 User avatar dropdown

#### Sidebar Navigation
- 🏠 Logo and app name
- 📋 Section headers
- 🔢 Badge counters on items
- ✨ Active state highlighting
- 🔄 Smooth transitions
- 👤 User info at bottom

#### Notifications
- ✅ Success toast (green)
- ❌ Error toast (red)
- ℹ️ Info toast (blue)
- ⏱️ Auto-dismiss
- 📍 Top-right position

#### Loading States
- 💀 Skeleton loaders on data fetch
- ⏳ Loading text on buttons
- 🔄 Shimmer effect
- ♿ Accessible loading states

#### Forms
- ✅ Required field validation
- 📧 Email format validation
- 📅 Date range validation
- 💬 Text area character limit
- 🔴 Error message display
- ✅ Success feedback

### Data Features

#### Mock Data Includes
- 8 diverse employees
- 5 departments (Engineering, Design, Finance, HR, Marketing, Sales)
- 4+ leave requests with various statuses
- 31 days of attendance records
- 5 months of payslip data
- Realistic names and avatars

#### API Integration
- Axios instance configuration
- Request interceptor (token injection)
- Response interceptor (401 handling)
- Mock API delay simulation
- Error handling
- Optimistic updates

### Security Features
- 🔐 JWT token validation
- 🛡️ Role-based access control
- 🚫 Unauthorized page (403)
- 🔍 Not found page (404)
- 🔄 Auto-redirect on session expire
- 🔒 Protected route components

### Performance Features
- ⚡ Optimistic UI updates
- 📦 Component code splitting ready
- 🎯 Efficient re-renders
- 💾 LocalStorage caching
- 🔄 Lazy loading ready

## 🎨 Design System

### Colors
- Background: `#0f1214` (dark)
- Surface: `#1a1d21` (dark gray)
- Primary: Emerald-Teal gradient
- Success: Emerald 500
- Warning: Amber 500
- Error: Red 500
- Info: Blue 500

### Typography
- Font: System font stack
- Headings: Medium weight
- Body: Normal weight
- Sizes: Responsive scale

### Components
- All components from Radix UI
- Custom styled with Tailwind
- Consistent spacing scale
- Rounded corners (0.625rem)
- Smooth transitions

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔄 State Management

- Local component state (useState)
- Form state (controlled components)
- Auth state (localStorage)
- No global state library needed

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## ♿ Accessibility

- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader friendly
- Focus indicators
- Semantic HTML

## 🚀 Performance

- Fast initial load
- Smooth animations
- Efficient data fetching
- Minimal re-renders
- Optimized bundle size
