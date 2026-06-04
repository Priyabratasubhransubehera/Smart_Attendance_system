# 🚀 PeopleHub - Quick Start Guide

## Get Started in 30 Seconds

### 1️⃣ Login
Navigate to the application and you'll see the login page with the PeopleHub logo.

### 2️⃣ Choose a Role
Click any of the four "Quick Login" buttons:

| Button | Role | What You'll See |
|--------|------|-----------------|
| **Admin** | Full System Access | Employee management, all metrics, CRUD operations |
| **HR** | Human Resources | Leave approvals, attendance heatmap, payroll |
| **Manager** | Team Lead | Team overview, direct report leave approvals |
| **Employee** | Staff Member | Personal dashboard, leave application, payslips |

### 3️⃣ Explore Features
You'll be automatically redirected to a role-specific dashboard with all relevant features.

---

## 🎯 What to Try First

### As Admin
1. **View Dashboard Metrics** - See total employees, attendance rate, new joiners
2. **Search Employees** - Use the search bar to find employees by name or department
3. **Add New Employee** - Click "Add Employee" to open the modal form
4. **Edit Employee** - Click the edit icon on any employee row
5. **Filter Employees** - Use department and status filters

### As HR
1. **Approve Leave Requests** - See pending requests and approve/reject them
2. **View Attendance Heatmap** - Check the monthly attendance calendar
3. **Review Payroll** - See payroll summary with totals
4. **Download Reports** - Click the download button (mock action)

### As Manager
1. **View Your Team** - See all Engineering department members
2. **Approve Team Leaves** - Process leave requests from direct reports
3. **Check Team Attendance** - View attendance metrics for your team
4. **Monitor Performance** - See team performance score

### As Employee
1. **View Your Profile** - See your personal information
2. **Check Leave Balance** - View available casual, sick, and annual leave
3. **Apply for Leave** - Click "Apply Leave" to submit a new request
4. **View Attendance** - Check your attendance calendar
5. **Download Payslips** - Access your salary information

---

## 🔑 Key Features to Test

### Interactive Elements
- ✅ **Optimistic UI** - Leave approvals update instantly, then sync
- ✅ **Real-time Search** - Employee search filters as you type
- ✅ **Form Validation** - Try submitting forms with invalid data
- ✅ **Toast Notifications** - Look for success/error messages in top-right
- ✅ **Loading States** - Watch skeleton loaders during data fetch
- ✅ **Responsive Design** - Resize your browser to see mobile layout

### Navigation
- 🔄 **Sidebar Navigation** - Click different menu items
- 🔍 **Search Bar** - Global employee search in top bar
- 🔔 **Notifications** - Bell icon with badge counter
- 👤 **User Menu** - Click avatar to see profile dropdown
- 📱 **Mobile Menu** - Hamburger menu on small screens

### Role-Based Access
- 🚫 Try accessing `/admin` when logged in as Employee - you'll see 403 error
- 🚫 Try accessing `/hr` when logged in as Manager - unauthorized redirect
- ✅ Each role can only access their designated routes

---

## 💡 Pro Tips

### Test Optimistic UI
1. Login as HR
2. Go to Leave Approvals
3. Click "Approve" on a request
4. Notice it updates immediately (optimistic)
5. The mock API confirms after a delay

### Test Form Validation
1. Login as Employee
2. Click "Apply Leave"
3. Try submitting without filling all fields
4. Try setting end date before start date
5. See validation errors

### Test Filters
1. Login as Admin
2. Use the search bar to find "Sara"
3. Filter by department "Engineering"
4. Filter by status "Active"
5. See results update in real-time

### Test Responsive Design
1. Open browser dev tools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Switch to mobile view
4. Notice sidebar becomes bottom nav
5. See mobile-optimized layout

---

## 🎨 Visual Tour

### Color System
- **Primary Actions** - Emerald/Teal gradient buttons
- **Success** - Green badges and indicators
- **Warning** - Amber/Yellow for pending states
- **Error** - Red for alerts and rejections
- **Info** - Blue for informational items

### Card Types
- **Metric Cards** - Large numbers with icons (dashboard)
- **List Cards** - Scrollable lists (leave requests)
- **Form Cards** - Input forms (add employee)
- **Table Cards** - Data tables (employee list)

### Navigation Pattern
```
Login → Role Detection → Dashboard Redirect → Sidebar Nav → Feature Access
```

---

## 📊 Sample Data

The application includes realistic mock data:

- **8 Employees** across 5+ departments
- **4 Leave Requests** (pending, approved, rejected)
- **31 Days** of attendance records for May 2026
- **5 Months** of payslip history
- **Realistic Names** and generated avatars

---

## 🐛 Troubleshooting

### Can't Login?
- Make sure you're using the correct credentials
- Try clicking the Quick Login buttons instead
- Check browser console for errors

### Not Seeing Data?
- Data loads with a mock delay (300-800ms)
- Look for skeleton loaders
- Check if you're on the correct dashboard for your role

### 403 Unauthorized?
- You're trying to access a page not allowed for your role
- Click "Go Back to Dashboard" button
- Login with the appropriate role

### Page Not Found?
- Check the URL is correct
- Use the sidebar navigation instead
- Return to dashboard with the button

---

## 🎓 Learning Path

### Beginner
1. Login and explore each role
2. Click around the dashboard
3. View different types of data
4. Notice the dark theme design

### Intermediate
1. Test form submissions
2. Try filtering and searching
3. Test responsive design
4. Explore all navigation items

### Advanced
1. Open browser dev tools
2. Watch network requests (mock API)
3. Inspect localStorage for auth token
4. Test role-based access control
5. View React component structure

---

## 📞 Need Help?

### Common Questions

**Q: What are the login credentials?**  
A: See LOGIN_CREDENTIALS.md or use the Quick Login buttons

**Q: Can I add real employees?**  
A: Yes! The mock API accepts new employees, but they're stored in memory

**Q: Why is there a delay when I click approve?**  
A: Mock API simulates network delay (300-800ms) for realistic feel

**Q: Can I export data?**  
A: Download buttons are present but connect to mock functions

**Q: Is this mobile-friendly?**  
A: Yes! Fully responsive design for all screen sizes

---

## 🎉 You're Ready!

Pick a role, login, and start exploring PeopleHub - your complete employee management solution!

**Happy Testing! 🚀**
