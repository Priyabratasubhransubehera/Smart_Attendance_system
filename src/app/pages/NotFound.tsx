import { useNavigate } from 'react-router';
import { FileQuestion } from 'lucide-react';
import { Button } from '../components/ui/button';
import { authStorage, getRoleHomePath } from '../lib/auth';

export function NotFound() {
  const navigate = useNavigate();
  const user = authStorage.getUser();

  const handleGoHome = () => {
    if (user) {
      navigate(getRoleHomePath(user.role));
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1214] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-20 h-20 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="w-10 h-10 text-blue-400" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">404</h1>
        <h2 className="text-xl text-gray-300 mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button
          onClick={handleGoHome}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
