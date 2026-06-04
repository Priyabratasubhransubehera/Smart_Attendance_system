import { User, Employee, LeaveRequest, AttendanceRecord, Payslip, DashboardMetrics } from '../types';

// Mock users for authentication
export const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'admin@peoplehub.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    department: 'Management',
    position: 'System Administrator',
  },
  {
    id: '2',
    email: 'hr@peoplehub.com',
    password: 'hr123',
    name: 'Priya Sharma',
    role: 'hr',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    department: 'Human Resources',
    position: 'HR Manager',
  },
  {
    id: '3',
    email: 'manager@peoplehub.com',
    password: 'manager123',
    name: 'Arjun Kapoor',
    role: 'manager',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
    department: 'Engineering',
    position: 'Engineering Manager',
  },
  {
    id: '4',
    email: 'employee@peoplehub.com',
    password: 'employee123',
    name: 'Sara Mehta',
    role: 'employee',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara',
    department: 'Design',
    position: 'UI Lead',
  },
];

// Mock employees
export const mockEmployees: Employee[] = [
  {
    id: '3',
    name: 'Arjun Kapoor',
    email: 'arjun@peoplehub.com',
    department: 'Engineering',
    position: 'Senior Dev',
    status: 'active',
    joinDate: '2023-01-15',
    phone: '+91 98765 43210',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
    salary: 95000,
  },
  {
    id: '4',
    name: 'Sara Mehta',
    email: 'sara@peoplehub.com',
    department: 'Design',
    position: 'UI Lead',
    status: 'remote',
    joinDate: '2023-03-20',
    phone: '+91 98765 43211',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara',
    salary: 85000,
  },
  {
    id: '5',
    name: 'Rahul Nair',
    email: 'rahul@peoplehub.com',
    department: 'Finance',
    position: 'Analyst',
    status: 'on-leave',
    joinDate: '2023-06-10',
    phone: '+91 98765 43212',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
    salary: 72000,
  },
  {
    id: '6',
    name: 'Pooja Tiwari',
    email: 'pooja@peoplehub.com',
    department: 'HR',
    position: 'Recruiter',
    status: 'active',
    joinDate: '2024-01-08',
    phone: '+91 98765 43213',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pooja',
    salary: 65000,
  },
  {
    id: '7',
    name: 'Vikram Bose',
    email: 'vikram@peoplehub.com',
    department: 'Engineering',
    position: 'DevOps',
    status: 'active',
    joinDate: '2024-02-12',
    phone: '+91 98765 43214',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram',
    salary: 88000,
  },
  {
    id: '8',
    name: 'Anita Rao',
    email: 'anita@peoplehub.com',
    department: 'Marketing',
    position: 'Marketing Lead',
    status: 'active',
    joinDate: '2022-11-05',
    phone: '+91 98765 43215',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anita',
    salary: 78000,
  },
  {
    id: '9',
    name: 'Karthik Singh',
    email: 'karthik@peoplehub.com',
    department: 'Sales',
    position: 'Sales Executive',
    status: 'active',
    joinDate: '2024-03-01',
    phone: '+91 98765 43216',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karthik',
    salary: 70000,
  },
  {
    id: '10',
    name: 'Meera Patel',
    email: 'meera@peoplehub.com',
    department: 'Design',
    position: 'UX Designer',
    status: 'remote',
    joinDate: '2023-08-18',
    phone: '+91 98765 43217',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Meera',
    salary: 75000,
  },
];

// Mock leave requests
export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 'lr1',
    employeeId: '5',
    employeeName: 'Rahul Nair',
    type: 'sick',
    startDate: '2026-06-02',
    endDate: '2026-06-04',
    days: 3,
    reason: 'Medical appointment and recovery',
    status: 'pending',
    appliedDate: '2026-05-28',
  },
  {
    id: 'lr2',
    employeeId: '4',
    employeeName: 'Sara Mehta',
    type: 'casual',
    startDate: '2026-06-01',
    endDate: '2026-06-01',
    days: 1,
    reason: 'Personal work',
    status: 'pending',
    appliedDate: '2026-05-27',
  },
  {
    id: 'lr3',
    employeeId: '8',
    employeeName: 'Anita Rao',
    type: 'annual',
    startDate: '2026-07-15',
    endDate: '2026-07-25',
    days: 11,
    reason: 'Family vacation',
    status: 'approved',
    appliedDate: '2026-05-20',
  },
  {
    id: 'lr4',
    employeeId: '7',
    employeeName: 'Vikram Bose',
    type: 'casual',
    startDate: '2026-06-05',
    endDate: '2026-06-05',
    days: 1,
    reason: 'House relocation',
    status: 'pending',
    appliedDate: '2026-05-28',
  },
];

// Mock attendance records
export const mockAttendance: AttendanceRecord[] = generateAttendanceForMonth('2026-05');

function generateAttendanceForMonth(monthYear: string): AttendanceRecord[] {
  const records: AttendanceRecord[] = [];
  const [year, month] = monthYear.split('-');
  const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();

  mockEmployees.forEach((employee) => {
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${monthYear}-${day.toString().padStart(2, '0')}`;
      const dayOfWeek = new Date(date).getDay();
      
      let status: AttendanceRecord['status'] = 'present';
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        status = 'holiday';
      } else if (Math.random() > 0.9) {
        status = 'absent';
      } else if (Math.random() > 0.95) {
        status = 'leave';
      }

      records.push({
        id: `att-${employee.id}-${date}`,
        employeeId: employee.id,
        date,
        status,
        checkIn: status === 'present' ? '09:00' : undefined,
        checkOut: status === 'present' ? '18:00' : undefined,
      });
    }
  });

  return records;
}

// Mock payslips
export const mockPayslips: Payslip[] = mockEmployees.flatMap((employee) => {
  const months = ['January', 'February', 'March', 'April', 'May'];
  return months.map((month, index) => ({
    id: `pay-${employee.id}-${index}`,
    employeeId: employee.id,
    month,
    year: 2026,
    basicSalary: employee.salary || 70000,
    allowances: (employee.salary || 70000) * 0.2,
    deductions: (employee.salary || 70000) * 0.1,
    netSalary: (employee.salary || 70000) * 1.1,
  }));
});

// Mock API functions
export const mockApi = {
  // Auth
  login: async (email: string): Promise<{ user: User; token: string }> => {
    await delay(800);

    // Check if email exists in mock users
    let user = mockUsers.find((u) => u.email === email);

    // If not found, create a guest employee user with the provided email
    if (!user) {
      const guestId = 'guest-' + Date.now();
      user = {
        id: guestId,
        email: email,
        password: '',
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        role: 'employee',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        department: 'General',
        position: 'Employee',
      };
    }

    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token: 'mock-jwt-token-' + user.id,
    };
  },

  // Dashboard metrics
  getDashboardMetrics: async (role: string): Promise<DashboardMetrics> => {
    await delay(500);
    const today = new Date().toISOString().split('T')[0];
    const presentToday = mockAttendance.filter(
      (a) => a.date === today && a.status === 'present'
    ).length;
    const onLeave = mockEmployees.filter((e) => e.status === 'on-leave').length;
    
    // New joiners in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newJoiners = mockEmployees.filter(
      (e) => new Date(e.joinDate) > thirtyDaysAgo
    ).length;

    return {
      totalEmployees: mockEmployees.length,
      presentToday,
      onLeave,
      newJoiners,
      pendingLeaveRequests: mockLeaveRequests.filter((r) => r.status === 'pending').length,
      attendanceRate: Math.round((presentToday / mockEmployees.length) * 100),
    };
  },

  // Employees
  getEmployees: async (): Promise<Employee[]> => {
    await delay(600);
    return mockEmployees;
  },

  addEmployee: async (employee: Omit<Employee, 'id'>): Promise<Employee> => {
    await delay(400);
    const newEmployee = { ...employee, id: Date.now().toString() };
    mockEmployees.push(newEmployee);
    return newEmployee;
  },

  updateEmployee: async (id: string, updates: Partial<Employee>): Promise<Employee> => {
    await delay(400);
    const index = mockEmployees.findIndex((e) => e.id === id);
    if (index === -1) throw new Error('Employee not found');
    mockEmployees[index] = { ...mockEmployees[index], ...updates };
    return mockEmployees[index];
  },

  // Leave requests
  getLeaveRequests: async (employeeId?: string): Promise<LeaveRequest[]> => {
    await delay(500);
    if (employeeId) {
      return mockLeaveRequests.filter((r) => r.employeeId === employeeId);
    }
    return mockLeaveRequests;
  },

  submitLeaveRequest: async (request: Omit<LeaveRequest, 'id' | 'status' | 'appliedDate'>): Promise<LeaveRequest> => {
    await delay(400);
    const newRequest: LeaveRequest = {
      ...request,
      id: 'lr-' + Date.now(),
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0],
    };
    mockLeaveRequests.push(newRequest);
    return newRequest;
  },

  updateLeaveStatus: async (id: string, status: 'approved' | 'rejected'): Promise<LeaveRequest> => {
    await delay(300);
    const request = mockLeaveRequests.find((r) => r.id === id);
    if (!request) throw new Error('Leave request not found');
    request.status = status;
    return request;
  },

  // Attendance
  getAttendance: async (employeeId?: string, month?: string): Promise<AttendanceRecord[]> => {
    await delay(500);
    let records = mockAttendance;
    if (employeeId) {
      records = records.filter((r) => r.employeeId === employeeId);
    }
    if (month) {
      records = records.filter((r) => r.date.startsWith(month));
    }
    return records;
  },

  // Payslips
  getPayslips: async (employeeId: string): Promise<Payslip[]> => {
    await delay(500);
    return mockPayslips.filter((p) => p.employeeId === employeeId);
  },
};

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
