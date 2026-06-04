import { useEffect, useState } from 'react';
import { FileText, Users, Calendar, DollarSign, Check, X, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { ScrollArea } from '../../components/ui/scroll-area';
import { mockApi } from '../../lib/mockApi';
import { DashboardMetrics, LeaveRequest, AttendanceRecord } from '../../types';
import { toast } from 'sonner';
import { format } from 'date-fns';

export function HRDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [metricsData, leaveData, attendanceData] = await Promise.all([
        mockApi.getDashboardMetrics('hr'),
        mockApi.getLeaveRequests(),
        mockApi.getAttendance(undefined, '2026-05'),
      ]);
      setMetrics(metricsData);
      setLeaveRequests(leaveData);
      setAttendance(attendanceData);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveAction = async (id: string, status: 'approved' | 'rejected') => {
    // Optimistic UI update
    setLeaveRequests(
      leaveRequests.map((req) => (req.id === id ? { ...req, status } : req))
    );

    try {
      await mockApi.updateLeaveStatus(id, status);
      toast.success(
        `Leave request ${status === 'approved' ? 'approved' : 'rejected'} successfully`
      );
    } catch (error) {
      toast.error('Failed to update leave request');
      // Revert on error
      loadData();
    }
  };

  const pendingRequests = leaveRequests.filter((r) => r.status === 'pending');

  // Attendance heatmap data for May 2026
  const getAttendanceForDate = (date: string) => {
    const records = attendance.filter((a) => a.date === date);
    const present = records.filter((a) => a.status === 'present').length;
    const total = records.length;
    return { present, total, rate: total > 0 ? (present / total) * 100 : 0 };
  };

  const generateCalendarDays = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      const date = `2026-05-${i.toString().padStart(2, '0')}`;
      const data = getAttendanceForDate(date);
      days.push({ date, day: i, ...data });
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">HR Dashboard</h1>
          <p className="text-gray-400">Manage employee requests and payroll</p>
        </div>
        <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
          <Download className="w-4 h-4 mr-2" />
          Download Reports
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="bg-[#1a1d21] border-gray-800">
              <CardContent className="p-6">
                <Skeleton className="h-20 bg-gray-800" />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <Card className="bg-[#1a1d21] border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Pending Requests</p>
                    <p className="text-3xl font-semibold text-white mt-2">
                      {metrics?.pendingLeaveRequests}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-amber-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1d21] border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Employees</p>
                    <p className="text-3xl font-semibold text-white mt-2">{metrics?.totalEmployees}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1d21] border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Attendance Rate</p>
                    <p className="text-3xl font-semibold text-white mt-2">{metrics?.attendanceRate}%</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1d21] border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Payroll</p>
                    <p className="text-3xl font-semibold text-white mt-2">₹2.4M</p>
                    <p className="text-xs text-gray-500 mt-1">This month</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leave Approvals */}
        <Card className="bg-[#1a1d21] border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Leave Approvals</CardTitle>
              <Badge className="bg-red-500/10 text-red-400 border-0">
                {pendingRequests.length} pending
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 bg-gray-800" />
                ))}
              </div>
            ) : (
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {pendingRequests.map((request) => (
                    <div
                      key={request.id}
                      className="p-4 rounded-lg bg-[#0f1214] border border-gray-800"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-emerald-600 text-white">
                              {request.employeeName.split(' ').map((n) => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-white font-medium">{request.employeeName}</p>
                            <p className="text-xs text-gray-400 capitalize">{request.type} Leave</p>
                          </div>
                        </div>
                        <Badge
                          className={
                            request.type === 'sick'
                              ? 'bg-red-500/10 text-red-400 border-0'
                              : request.type === 'casual'
                              ? 'bg-blue-500/10 text-blue-400 border-0'
                              : 'bg-purple-500/10 text-purple-400 border-0'
                          }
                        >
                          {request.days} {request.days === 1 ? 'day' : 'days'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">{request.reason}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">
                          {format(new Date(request.startDate), 'MMM dd')} -{' '}
                          {format(new Date(request.endDate), 'MMM dd, yyyy')}
                        </p>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleLeaveAction(request.id, 'approved')}
                            className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleLeaveAction(request.id, 'rejected')}
                            className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border-0"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {pendingRequests.length === 0 && (
                    <div className="text-center py-12">
                      <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-400">No pending leave requests</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>

        {/* Attendance Heatmap */}
        <Card className="bg-[#1a1d21] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Attendance — May 2026</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[400px] bg-gray-800" />
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
                  {calendarDays.map((day) => {
                    const isWeekend = new Date(day.date).getDay() === 0 || new Date(day.date).getDay() === 6;
                    return (
                      <div
                        key={day.date}
                        className={`aspect-square rounded flex items-center justify-center text-xs font-medium ${
                          isWeekend
                            ? 'bg-gray-800 text-gray-600'
                            : day.rate >= 90
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : day.rate >= 70
                            ? 'bg-emerald-500/10 text-emerald-300'
                            : day.rate >= 50
                            ? 'bg-amber-500/10 text-amber-400'
                            : 'bg-red-500/10 text-red-400'
                        }`}
                      >
                        {day.day}
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-emerald-500/20" />
                    <span className="text-xs text-gray-400">Present</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-red-500/10" />
                    <span className="text-xs text-gray-400">Absent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gray-800" />
                    <span className="text-xs text-gray-400">Holiday</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Payroll Summary */}
      <Card className="bg-[#1a1d21] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Payroll Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-4 rounded-lg bg-[#0f1214]">
              <p className="text-gray-400 text-sm mb-1">Total Salaries</p>
              <p className="text-2xl font-semibold text-white">₹2,400,000</p>
            </div>
            <div className="p-4 rounded-lg bg-[#0f1214]">
              <p className="text-gray-400 text-sm mb-1">Allowances</p>
              <p className="text-2xl font-semibold text-white">₹480,000</p>
            </div>
            <div className="p-4 rounded-lg bg-[#0f1214]">
              <p className="text-gray-400 text-sm mb-1">Deductions</p>
              <p className="text-2xl font-semibold text-white">₹240,000</p>
            </div>
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-emerald-400 text-sm mb-1">Net Payable</p>
              <p className="text-2xl font-semibold text-emerald-400">₹2,640,000</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
