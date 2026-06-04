import { Bell, Search, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

export const TopBar = () => {
  const { user } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 gap-4">
      <button className="lg:hidden">
        <Menu className="h-6 w-6 text-gray-600" />
      </button>

      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search employees, departments..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell className="h-5 w-5 text-gray-600" />
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
          >
            3
          </Badge>
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
          <Avatar>
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
              {user ? getInitials(user.name) : 'U'}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};
