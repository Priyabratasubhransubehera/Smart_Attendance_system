import { Link, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Settings,
  ClipboardList,
  DollarSign,
  UserCircle,
  LogOut
} from 'lucide-react';
import { cn } from '../ui/utils';

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigationByRole = {
    admin: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
      { name: 'Employees', icon: Users, path: '/admin/employees' },
      { name: 'Departments', icon: ClipboardList, path: '/admin/departments' },
      { name: 'Settings', icon: Settings, path: '/admin/settings' },
    ],
    hr: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/hr' },
      { name: 'Leave Requests', icon: Calendar, path: '/hr/leave-requests' },
      { name: 'Attendance', icon: ClipboardList, path: '/hr/attendance' },
      { name: 'Payroll', icon: DollarSign, path: '/hr/payroll' },
    ],
    manager: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/manager' },
      { name: 'My Team', icon: Users, path: '/manager/team' },
      { name: 'Leave Approvals', icon: Calendar, path: '/manager/approvals' },
      { name: 'Reports', icon: FileText, path: '/manager/reports' },
    ],
    employee: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/employee' },
      { name: 'My Profile', icon: UserCircle, path: '/employee/profile' },
      { name: 'Leave', icon: Calendar, path: '/employee/leave' },
      { name: 'Payslips', icon: FileText, path: '/employee/payslips' },
    ],
  };

  const navigation = user ? navigationByRole[user.role] : [];

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-gradient-to-b from-indigo-600 to-indigo-800 text-white">
      <div className="flex items-center h-16 px-6 border-b border-indigo-500">
        <div className="flex items-center gap-2">
          <Users className="h-8 w-8" />
          <span className="text-xl font-bold">PeopleHub</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive 
                  ? 'bg-white/20 text-white' 
                  : 'text-indigo-100 hover:bg-white/10 hover:text-white'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-indigo-500">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-indigo-100 hover:bg-white/10 hover:text-white transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
