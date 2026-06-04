import { useEffect, useState } from 'react';
import { Users, FileText, Calendar, TrendingUp, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { mockApi, mockEmployees } from '../../lib/mockApi';
import { DashboardMetrics, Employee, LeaveRequest, AttendanceRecord } from '../../types';
import { toast } from 'sonner';
import { format } from 'date-fns';

export function ManagerDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [teamMembers, setTeamMembers] = useState<Employee[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // In a real app, filter by manager's team
      const engineeringTeam = mockEmployees.filter((e) => e.department === 'Engineering');
      const teamLeaveRequests = leaveRequests.filter((r) =>
        engineeringTeam.some((e) => e.id === r.employeeId)
      );

      const [metricsData, allLeaveRequests, attendanceData] = await Promise.all([
        mockApi.getDashboardMetrics('manager'),
        mockApi.getLeaveRequests(),
        mockApi.getAttendance(undefined, '2026-05'),
      ]);

      setMetrics(metricsData);
      setTeamMembers(engineeringTeam);
      setLeaveRequests(allLeaveRequests.filter(r => 
        engineeringTeam.some(e => e.id === r.employeeId)
      ));
      setAttendance(
        attendanceData.filter((a) => engineeringTeam.some((e) => e.id === a.employeeId))
      );
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveAction = async (id: string, status: 'approved' | 'rejected') => {
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
      loadData();
    }
  };

  const pendingRequests = leaveRequests.filter((r) => r.status === 'pending');
  const today = new Date().toISOString().split('T')[0];
  const presentToday = attendance.filter(
    (a) => a.date === today && a.status === 'present'
  ).length;
  const attendanceRate = teamMembers.length > 0
    ? Math.round((presentToday / teamMembers.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Manager Dashboard</h1>
          <p className="text-gray-400">Manage your team</p>
        </div>
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
                    <p className="text-gray-400 text-sm">Team Members</p>
                    <p className="text-3xl font-semibold text-white mt-2">{teamMembers.length}</p>
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
                    <p className="text-gray-400 text-sm">Present Today</p>
                    <p className="text-3xl font-semibold text-white mt-2">{presentToday}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-0 text-xs">
                        {attendanceRate}%
                      </Badge>
                    </div>
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
                    <p className="text-gray-400 text-sm">Pending Approvals</p>
                    <p className="text-3xl font-semibold text-white mt-2">{pendingRequests.length}</p>
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
                    <p className="text-gray-400 text-sm">Team Performance</p>
                    <p className="text-3xl font-semibold text-white mt-2">94%</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Members */}
        <Card className="bg-[#1a1d21] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">My Team</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 bg-gray-800" />
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800 hover:bg-transparent">
                    <TableHead className="text-gray-400">Employee</TableHead>
                    <TableHead className="text-gray-400">Position</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id} className="border-gray-800 hover:bg-gray-800/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="bg-emerald-600 text-white">
                              {member.name.split(' ').map((n) => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-white">{member.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">{member.position}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            member.status === 'active'
                              ? 'bg-emerald-500/10 text-emerald-400 border-0'
                              : member.status === 'remote'
                              ? 'bg-blue-500/10 text-blue-400 border-0'
                              : 'bg-amber-500/10 text-amber-400 border-0'
                          }
                        >
                          {member.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Leave Approvals */}
        <Card className="bg-[#1a1d21] border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Leave Approvals</CardTitle>
              <Badge className="bg-amber-500/10 text-amber-400 border-0">
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
                      <Badge className="bg-blue-500/10 text-blue-400 border-0">
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
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleLeaveAction(request.id, 'rejected')}
                          className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border-0"
                        >
                          <X className="w-4 h-4" />
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
            )}
          </CardContent>
        </Card>
      </div>

      {/* Team Attendance Overview */}
      <Card className="bg-[#1a1d21] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Team Attendance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-[#0f1214]">
              <p className="text-gray-400 text-sm mb-1">Present</p>
              <p className="text-2xl font-semibold text-emerald-400">{presentToday}</p>
            </div>
            <div className="p-4 rounded-lg bg-[#0f1214]">
              <p className="text-gray-400 text-sm mb-1">On Leave</p>
              <p className="text-2xl font-semibold text-amber-400">
                {teamMembers.filter((m) => m.status === 'on-leave').length}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[#0f1214]">
              <p className="text-gray-400 text-sm mb-1">Remote</p>
              <p className="text-2xl font-semibold text-blue-400">
                {teamMembers.filter((m) => m.status === 'remote').length}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-emerald-400 text-sm mb-1">Attendance Rate</p>
              <p className="text-2xl font-semibold text-emerald-400">{attendanceRate}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
