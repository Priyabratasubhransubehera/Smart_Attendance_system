import { Link, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText,
  UserCircle
} from 'lucide-react';
import { cn } from '../ui/utils';

export const MobileNav = () => {
  const { user } = useAuth();
  const location = useLocation();

  const navigationByRole = {
    admin: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
      { name: 'Employees', icon: Users, path: '/admin/employees' },
    ],
    hr: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/hr' },
      { name: 'Leaves', icon: Calendar, path: '/hr/leave-requests' },
    ],
    manager: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/manager' },
      { name: 'Team', icon: Users, path: '/manager/team' },
    ],
    employee: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/employee' },
      { name: 'Profile', icon: UserCircle, path: '/employee/profile' },
      { name: 'Leave', icon: Calendar, path: '/employee/leave' },
      { name: 'Payslips', icon: FileText, path: '/employee/payslips' },
    ],
  };

  const navigation = user ? navigationByRole[user.role] : [];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around">
        {navigation.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center gap-1 py-3 px-4 flex-1',
                isActive 
                  ? 'text-indigo-600' 
                  : 'text-gray-600'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
