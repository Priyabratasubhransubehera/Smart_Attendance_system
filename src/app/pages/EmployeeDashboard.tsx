import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Calendar, Download, Mail, Building, CalendarDays, Plane, HeartPulse, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockPayslips, mockLeaveBalance, mockAttendance } from '../lib/mockApi';
import { toast } from 'sonner';
import { format, parseISO } from 'date-fns';

export const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [payslips, setPayslips] = useState(mockPayslips);
  const [leaveBalance, setLeaveBalance] = useState(mockLeaveBalance);
  const [isLoading, setIsLoading] = useState(true);
  const [leaveForm, setLeaveForm] = useState({
    type: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!leaveForm.type || !leaveForm.startDate || !leaveForm.endDate || !leaveForm.reason) {
      toast.error('Please fill in all fields');
      return;
    }

    const start = new Date(leaveForm.startDate);
    const end = new Date(leaveForm.endDate);
    
    if (end < start) {
      toast.error('End date must be after start date');
      return;
    }

    toast.success('Leave application submitted successfully!');
    setLeaveForm({ type: '', startDate: '', endDate: '', reason: '' });
  };

  const getAttendanceColor = (status: string) => {
    const colors: Record<string, string> = {
      present: 'bg-green-500',
      absent: 'bg-red-500',
      leave: 'bg-orange-500',
    };
    return colors[status] || 'bg-gray-300';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl">Employee Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back, {user?.name}!</p>
      </div>

      {/* Profile Card */}
      <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20 border-4 border-white/20">
              <AvatarFallback className="bg-white/20 text-white text-xl">
                {user ? getInitials(user.name) : 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl">{user?.name}</h2>
              <div className="mt-2 space-y-1 text-indigo-100">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{user?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span className="text-sm">{user?.department} Department</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leave Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Vacation Leave</CardTitle>
            <Plane className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div>
                <div className="text-2xl">{leaveBalance.vacation.remaining}</div>
                <p className="text-xs text-gray-500 mt-1">
                  {leaveBalance.vacation.used} used / {leaveBalance.vacation.total} total
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Sick Leave</CardTitle>
            <HeartPulse className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div>
                <div className="text-2xl">{leaveBalance.sick.remaining}</div>
                <p className="text-xs text-gray-500 mt-1">
                  {leaveBalance.sick.used} used / {leaveBalance.sick.total} total
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Personal Leave</CardTitle>
            <UserIcon className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div>
                <div className="text-2xl">{leaveBalance.personal.remaining}</div>
                <p className="text-xs text-gray-500 mt-1">
                  {leaveBalance.personal.used} used / {leaveBalance.personal.total} total
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Apply for Leave */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Apply for Leave
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLeaveSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Leave Type</Label>
                <Select value={leaveForm.type} onValueChange={(value) => setLeaveForm(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vacation">Vacation</SelectItem>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input 
                    type="date" 
                    value={leaveForm.startDate}
                    onChange={(e) => setLeaveForm(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input 
                    type="date" 
                    value={leaveForm.endDate}
                    onChange={(e) => setLeaveForm(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Reason</Label>
                <Textarea 
                  placeholder="Please provide a reason for your leave..."
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm(prev => ({ ...prev, reason: e.target.value }))}
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600">
                Submit Leave Application
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Payslips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Recent Payslips
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {payslips.map((payslip) => (
                  <div
                    key={payslip.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <p>{payslip.month}</p>
                      <p className="text-sm text-gray-500">${payslip.amount.toLocaleString()}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Attendance History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Attendance History (May 2026)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-32 w-full" />
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div key={day} className="text-center text-sm text-gray-600">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {mockAttendance.map((day, idx) => (
                  <div
                    key={idx}
                    className={`aspect-square rounded ${getAttendanceColor(day.status)} hover:opacity-80 transition-opacity cursor-pointer`}
                    title={`${day.date}: ${day.status}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-green-500 rounded" />
                  <span>Present</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-orange-500 rounded" />
                  <span>Leave</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-red-500 rounded" />
                  <span>Absent</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
