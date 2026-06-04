import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="lg:pl-64">
        <TopBar />
        
        <main className="p-6 pb-20 lg:pb-6">
          <Outlet />
        </main>
      </div>

      <MobileNav />
    </div>
  );
};
