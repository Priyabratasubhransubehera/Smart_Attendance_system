import { useEffect, useState } from 'react';
import { User, Calendar, FileText, DollarSign, Download, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { mockApi } from '../../lib/mockApi';
import { authStorage } from '../../lib/auth';
import { LeaveRequest, AttendanceRecord, Payslip } from '../../types';
import { toast } from 'sonner';
import { format, differenceInDays } from 'date-fns';

export function EmployeeDashboard() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    type: 'casual',
    startDate: '',
    endDate: '',
    reason: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const user = authStorage.getUser();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [leaveData, attendanceData, payslipsData] = await Promise.all([
        mockApi.getLeaveRequests(user?.id),
        mockApi.getAttendance(user?.id, '2026-05'),
        mockApi.getPayslips(user?.id || '4'),
      ]);
      setLeaveRequests(leaveData);
      setAttendance(attendanceData);
      setPayslips(payslipsData);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitLeave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!leaveForm.startDate || !leaveForm.endDate || !leaveForm.reason) {
      toast.error('Please fill all required fields');
      return;
    }

    const start = new Date(leaveForm.startDate);
    const end = new Date(leaveForm.endDate);

    if (end < start) {
      toast.error('End date must be after start date');
      return;
    }

    const days = differenceInDays(end, start) + 1;

    setSubmitting(true);
    try {
      const newRequest = await mockApi.submitLeaveRequest({
        employeeId: user?.id || '4',
        employeeName: user?.name || 'Employee',
        type: leaveForm.type as any,
        startDate: leaveForm.startDate,
        endDate: leaveForm.endDate,
        days,
        reason: leaveForm.reason,
      });
      setLeaveRequests([newRequest, ...leaveRequests]);
      toast.success('Leave request submitted successfully');
      setDialogOpen(false);
      setLeaveForm({
        type: 'casual',
        startDate: '',
        endDate: '',
        reason: '',
      });
    } catch (error) {
      toast.error('Failed to submit leave request');
    } finally {
      setSubmitting(false);
    }
  };

  const leaveBalance = {
    casual: 12,
    sick: 10,
    annual: 20,
    used: leaveRequests
      .filter((r) => r.status === 'approved')
      .reduce((sum, r) => sum + r.days, 0),
  };

  const generateAttendanceCalendar = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      const date = `2026-05-${i.toString().padStart(2, '0')}`;
      const record = attendance.find((a) => a.date === date);
      days.push({ date, day: i, record });
    }
    return days;
  };

  const calendarDays = generateAttendanceCalendar();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Welcome back, {user?.name}!</h1>
          <p className="text-gray-400">Here's your overview</p>
        </div>
      </div>

      {/* Profile Card & Leave Balance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="bg-[#1a1d21] border-gray-800 lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-teal-500 text-white text-2xl">
                  {user?.name.split(' ').map((n) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold text-white mb-1">{user?.name}</h3>
              <p className="text-gray-400 mb-2">{user?.position}</p>
              <Badge className="bg-emerald-500/10 text-emerald-400 border-0 mb-4">
                {user?.department}
              </Badge>
              <div className="w-full space-y-2 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Email:</span>
                  <span className="text-sm text-white">{user?.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Employee ID:</span>
                  <span className="text-sm text-white">EMP-{user?.id}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leave Balance */}
        <Card className="bg-[#1a1d21] border-gray-800 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Leave Balance</CardTitle>
              <Button
                onClick={() => setDialogOpen(true)}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Apply Leave
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-[#0f1214] border border-gray-800">
                <p className="text-gray-400 text-sm mb-1">Casual Leave</p>
                <p className="text-2xl font-semibold text-white">{leaveBalance.casual}</p>
                <p className="text-xs text-gray-500">days available</p>
              </div>
              <div className="p-4 rounded-lg bg-[#0f1214] border border-gray-800">
                <p className="text-gray-400 text-sm mb-1">Sick Leave</p>
                <p className="text-2xl font-semibold text-white">{leaveBalance.sick}</p>
                <p className="text-xs text-gray-500">days available</p>
              </div>
              <div className="p-4 rounded-lg bg-[#0f1214] border border-gray-800">
                <p className="text-gray-400 text-sm mb-1">Annual Leave</p>
                <p className="text-2xl font-semibold text-white">{leaveBalance.annual}</p>
                <p className="text-xs text-gray-500">days available</p>
              </div>
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-emerald-400 text-sm mb-1">Used</p>
                <p className="text-2xl font-semibold text-emerald-400">{leaveBalance.used}</p>
                <p className="text-xs text-emerald-300">days this year</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leave Requests */}
        <Card className="bg-[#1a1d21] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">My Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 bg-gray-800" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {leaveRequests.slice(0, 5).map((request) => (
                  <div
                    key={request.id}
                    className="p-4 rounded-lg bg-[#0f1214] border border-gray-800"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-white font-medium capitalize">{request.type} Leave</p>
                        <p className="text-xs text-gray-400">
                          {format(new Date(request.startDate), 'MMM dd')} -{' '}
                          {format(new Date(request.endDate), 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <Badge
                        className={
                          request.status === 'approved'
                            ? 'bg-emerald-500/10 text-emerald-400 border-0'
                            : request.status === 'rejected'
                            ? 'bg-red-500/10 text-red-400 border-0'
                            : 'bg-amber-500/10 text-amber-400 border-0'
                        }
                      >
                        {request.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-300">{request.reason}</p>
                  </div>
                ))}
                {leaveRequests.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">No leave requests yet</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Attendance Calendar */}
        <Card className="bg-[#1a1d21] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">My Attendance — May 2026</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[300px] bg-gray-800" />
            ) : (
              <div>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                    <div
                      key={i}
                      className="text-center text-xs text-gray-500 font-medium py-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {/* Empty cells for alignment (May 2026 starts on Friday) */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {calendarDays.map((day) => (
                    <div
                      key={day.date}
                      className={`aspect-square rounded flex items-center justify-center text-xs font-medium ${
                        !day.record || day.record.status === 'holiday'
                          ? 'bg-gray-800 text-gray-600'
                          : day.record.status === 'present'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : day.record.status === 'leave'
                          ? 'bg-blue-500/10 text-blue-400'
                          : 'bg-red-500/10 text-red-400'
                      }`}
                    >
                      {day.day}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-emerald-500/20" />
                    <span className="text-xs text-gray-400">Present</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-blue-500/10" />
                    <span className="text-xs text-gray-400">Leave</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-red-500/10" />
                    <span className="text-xs text-gray-400">Absent</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Payslips */}
      <Card className="bg-[#1a1d21] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Payslip History</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 bg-gray-800" />
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800 hover:bg-transparent">
                  <TableHead className="text-gray-400">Month</TableHead>
                  <TableHead className="text-gray-400">Basic Salary</TableHead>
                  <TableHead className="text-gray-400">Allowances</TableHead>
                  <TableHead className="text-gray-400">Deductions</TableHead>
                  <TableHead className="text-gray-400">Net Salary</TableHead>
                  <TableHead className="text-gray-400">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payslips.slice(0, 5).map((payslip) => (
                  <TableRow key={payslip.id} className="border-gray-800 hover:bg-gray-800/50">
                    <TableCell className="text-white">
                      {payslip.month} {payslip.year}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      ₹{payslip.basicSalary.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-emerald-400">
                      +₹{payslip.allowances.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-red-400">
                      -₹{payslip.deductions.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-white font-semibold">
                      ₹{payslip.netSalary.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Apply Leave Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#1a1d21] border-gray-800 text-white sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Apply for Leave</DialogTitle>
            <DialogDescription className="text-gray-400">
              Submit a new leave request
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitLeave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="type">Leave Type</Label>
              <Select
                value={leaveForm.type}
                onValueChange={(value) => setLeaveForm({ ...leaveForm, type: value })}
              >
                <SelectTrigger className="bg-[#0f1214] border-gray-800 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1d21] border-gray-800 text-white">
                  <SelectItem value="casual">Casual Leave</SelectItem>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="annual">Annual Leave</SelectItem>
                  <SelectItem value="maternity">Maternity Leave</SelectItem>
                  <SelectItem value="paternity">Paternity Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={leaveForm.startDate}
                  onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                  className="bg-[#0f1214] border-gray-800 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={leaveForm.endDate}
                  onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                  className="bg-[#0f1214] border-gray-800 text-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason</Label>
              <Textarea
                id="reason"
                value={leaveForm.reason}
                onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                placeholder="Please provide a reason for your leave..."
                className="bg-[#0f1214] border-gray-800 text-white placeholder:text-gray-500 min-h-[100px]"
                required
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                className="bg-[#0f1214] border-gray-800 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
              >
                {submitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
