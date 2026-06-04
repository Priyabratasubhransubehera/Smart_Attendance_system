import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  Shield, 
  DollarSign, 
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { authStorage, getRoleHomePath } from '../lib/auth';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { cn } from './ui/utils';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: number;
  section?: string;
}

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = authStorage.getUser();

  const handleLogout = () => {
    authStorage.clear();
    navigate('/login');
  };

  const getNavigationItems = (): NavItem[] => {
    const role = user?.role;
    const basePath = getRoleHomePath(role || 'employee');

    const commonItems: NavItem[] = [
      {
        label: 'Dashboard',
        path: basePath,
        icon: <LayoutDashboard className="w-5 h-5" />,
        section: 'OVERVIEW',
      },
    ];

    if (role === 'admin') {
      return [
        ...commonItems,
        {
          label: 'Employees',
          path: `${basePath}/employees`,
          icon: <Users className="w-5 h-5" />,
        },
        {
          label: 'Attendance',
          path: `${basePath}/attendance`,
          icon: <Calendar className="w-5 h-5" />,
          section: 'MANAGEMENT',
        },
        {
          label: 'Leave Requests',
          path: `${basePath}/leave-requests`,
          icon: <FileText className="w-5 h-5" />,
          badge: 4,
        },
        {
          label: 'Roles & Access',
          path: `${basePath}/roles`,
          icon: <Shield className="w-5 h-5" />,
        },
        {
          label: 'Reports',
          path: `${basePath}/reports`,
          icon: <FileText className="w-5 h-5" />,
          section: 'HR TOOLS',
        },
        {
          label: 'Payroll',
          path: `${basePath}/payroll`,
          icon: <DollarSign className="w-5 h-5" />,
        },
        {
          label: 'Settings',
          path: `${basePath}/settings`,
          icon: <Settings className="w-5 h-5" />,
        },
      ];
    }

    if (role === 'hr') {
      return [
        ...commonItems,
        {
          label: 'Leave Requests',
          path: `${basePath}/leave-requests`,
          icon: <FileText className="w-5 h-5" />,
          badge: 4,
          section: 'MANAGEMENT',
        },
        {
          label: 'Attendance',
          path: `${basePath}/attendance`,
          icon: <Calendar className="w-5 h-5" />,
        },
        {
          label: 'Employees',
          path: `${basePath}/employees`,
          icon: <Users className="w-5 h-5" />,
        },
        {
          label: 'Payroll',
          path: `${basePath}/payroll`,
          icon: <DollarSign className="w-5 h-5" />,
          section: 'HR TOOLS',
        },
        {
          label: 'Reports',
          path: `${basePath}/reports`,
          icon: <FileText className="w-5 h-5" />,
        },
      ];
    }

    if (role === 'manager') {
      return [
        ...commonItems,
        {
          label: 'My Team',
          path: `${basePath}/team`,
          icon: <Users className="w-5 h-5" />,
          section: 'MANAGEMENT',
        },
        {
          label: 'Leave Approvals',
          path: `${basePath}/leave-approvals`,
          icon: <FileText className="w-5 h-5" />,
          badge: 2,
        },
        {
          label: 'Team Attendance',
          path: `${basePath}/attendance`,
          icon: <Calendar className="w-5 h-5" />,
        },
      ];
    }

    // Employee
    return [
      ...commonItems,
      {
        label: 'My Profile',
        path: `${basePath}/profile`,
        icon: <UserIcon className="w-5 h-5" />,
      },
      {
        label: 'Apply Leave',
        path: `${basePath}/apply-leave`,
        icon: <FileText className="w-5 h-5" />,
      },
      {
        label: 'My Attendance',
        path: `${basePath}/attendance`,
        icon: <Calendar className="w-5 h-5" />,
      },
      {
        label: 'Payslips',
        path: `${basePath}/payslips`,
        icon: <DollarSign className="w-5 h-5" />,
      },
    ];
  };

  const navItems = getNavigationItems();
  let currentSection = '';

  return (
    <div className="min-h-screen bg-[#0f1214]">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-[#1a1d21] border-b border-gray-800 z-50">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-white hidden md:flex"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-400 hover:text-white md:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <h1 className="text-xl font-semibold text-white hidden sm:block">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search employees..."
                className="pl-10 w-64 bg-[#0f1214] border-gray-800 text-white placeholder:text-gray-500"
              />
            </div>

            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-emerald-500 text-white text-xs">
                3
              </Badge>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:text-white">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-emerald-600 text-white">
                      {user?.name.split(' ').map((n) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline">{user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-[#1a1d21] border-gray-800 text-white">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user?.name}</span>
                    <span className="text-xs text-gray-400 font-normal">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem className="text-gray-300 focus:bg-gray-800 focus:text-white">
                  <UserIcon className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 focus:bg-gray-800 focus:text-white">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-400 focus:bg-gray-800 focus:text-red-400"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="flex pt-16">
        {/* Desktop Sidebar */}
        <aside
          className={cn(
            'fixed left-0 top-16 bottom-0 bg-[#1a1d21] border-r border-gray-800 transition-all duration-300 z-40 hidden md:block',
            sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
          )}
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-white">PeopleHub</h2>
                <p className="text-xs text-gray-400">Employee Management</p>
              </div>
            </div>

            <nav className="space-y-1">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                const showSection = item.section && item.section !== currentSection;
                if (showSection) {
                  currentSection = item.section;
                }

                return (
                  <div key={item.path}>
                    {showSection && (
                      <div className="text-xs font-semibold text-gray-500 mt-6 mb-2 px-3">
                        {item.section}
                      </div>
                    )}
                    <button
                      onClick={() => navigate(item.path)}
                      className={cn(
                        'w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all',
                        isActive
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span className="text-sm">{item.label}</span>
                      </div>
                      {item.badge && (
                        <Badge className="bg-red-500 text-white text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </button>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* User info at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
            <div className="flex items-center gap-3 px-2">
              <Avatar className="w-10 h-10">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-emerald-600 text-white">
                  {user?.name.split(' ').map((n) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-16 bg-[#1a1d21] z-40 md:hidden overflow-y-auto">
            <div className="p-6">
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const showSection = item.section && item.section !== currentSection;
                  if (showSection) {
                    currentSection = item.section;
                  }

                  return (
                    <div key={item.path}>
                      {showSection && (
                        <div className="text-xs font-semibold text-gray-500 mt-6 mb-2 px-3">
                          {item.section}
                        </div>
                      )}
                      <button
                        onClick={() => {
                          navigate(item.path);
                          setMobileMenuOpen(false);
                        }}
                        className={cn(
                          'w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all',
                          isActive
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <span className="text-sm">{item.label}</span>
                        </div>
                        {item.badge && (
                          <Badge className="bg-red-500 text-white text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </button>
                    </div>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main
          className={cn(
            'flex-1 transition-all duration-300 min-h-screen',
            sidebarOpen ? 'md:ml-64' : 'md:ml-0'
          )}
        >
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
