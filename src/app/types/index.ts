export type UserRole = 'admin' | 'hr' | 'manager' | 'employee';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  position?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  status: 'active' | 'remote' | 'on-leave' | 'inactive';
  avatar?: string;
  joinDate: string;
  phone?: string;
  managerId?: string;
  salary?: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'sick' | 'casual' | 'annual' | 'maternity' | 'paternity';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  status: 'present' | 'absent' | 'holiday' | 'leave';
  checkIn?: string;
  checkOut?: string;
}

export interface Payslip {
  id: string;
  employeeId: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
}

export interface DashboardMetrics {
  totalEmployees: number;
  presentToday: number;
  onLeave: number;
  newJoiners: number;
  pendingLeaveRequests?: number;
  attendanceRate?: number;
}
