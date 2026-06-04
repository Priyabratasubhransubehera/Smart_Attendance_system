import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Users, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { authStorage, getRoleHomePath } from '../lib/auth';
import { mockApi } from '../lib/mockApi';
import { toast } from 'sonner';

export function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setLoading(true);
    try {
      const { user, token } = await mockApi.login(email);
      authStorage.setToken(token);
      authStorage.setUser(user);

      toast.success(`Welcome, ${user.name}!`);

      // Role-based redirect
      const homePath = getRoleHomePath(user.role);
      navigate(homePath, { replace: true });
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (role: string) => {
    const credentials = {
      admin: { email: 'admin@peoplehub.com' },
      hr: { email: 'hr@peoplehub.com' },
      manager: { email: 'manager@peoplehub.com' },
      employee: { email: 'employee@peoplehub.com' },
    }[role];

    if (credentials) {
      setEmail(credentials.email);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1214] via-[#1a1d21] to-[#0f1214] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">PeopleHub</h1>
          <p className="text-gray-400">Employee Management System</p>
        </div>

        <Card className="bg-[#1a1d21] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Sign In</CardTitle>
            <CardDescription className="text-gray-400">
              Enter your email to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-[#0f1214] border-gray-800 text-white placeholder:text-gray-500"
                    disabled={loading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-800"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-[#1a1d21] text-gray-500">Quick Login (Demo)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => quickLogin('admin')}
                  className="bg-[#0f1214] border-gray-800 text-gray-300 hover:bg-gray-800 hover:text-white text-xs"
                >
                  Admin
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => quickLogin('hr')}
                  className="bg-[#0f1214] border-gray-800 text-gray-300 hover:bg-gray-800 hover:text-white text-xs"
                >
                  HR
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => quickLogin('manager')}
                  className="bg-[#0f1214] border-gray-800 text-gray-300 hover:bg-gray-800 hover:text-white text-xs"
                >
                  Manager
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => quickLogin('employee')}
                  className="bg-[#0f1214] border-gray-800 text-gray-300 hover:bg-gray-800 hover:text-white text-xs"
                >
                  Employee
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-500 mt-6">
          © 2026 PeopleHub. All rights reserved.
        </p>
      </div>
    </div>
  );
}
