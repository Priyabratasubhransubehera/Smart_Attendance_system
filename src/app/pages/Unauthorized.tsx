import { useNavigate } from 'react-router';
import { ShieldAlert } from 'lucide-react';
import { Button } from '../components/ui/button';
import { authStorage, getRoleHomePath } from '../lib/auth';

export function Unauthorized() {
  const navigate = useNavigate();
  const user = authStorage.getUser();

  const handleGoBack = () => {
    if (user) {
      navigate(getRoleHomePath(user.role));
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1214] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-20 h-20 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-10 h-10 text-red-400" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">403</h1>
        <h2 className="text-xl text-gray-300 mb-4">Access Denied</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          You don't have permission to access this page. Please contact your administrator if you
          believe this is an error.
        </p>
        <Button
          onClick={handleGoBack}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
        >
          Go Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
