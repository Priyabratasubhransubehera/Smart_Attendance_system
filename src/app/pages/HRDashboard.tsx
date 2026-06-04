import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import { Calendar, Check, X, Download, DollarSign, Clock } from 'lucide-react';
import { mockLeaveRequests, mockAttendance } from '../lib/mockApi';
import { toast } from 'sonner';

export const HRDashboard = () => {
  const [leaveRequests, setLeaveRequests] = useState<typeof mockLeaveRequests>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLeaveRequests(mockLeaveRequests);
      setIsLoading(false);
    }, 800);
  }, []);

  const handleApprove = (id: string, name: string) => {
    setLeaveRequests(prev => prev.map(req =>
      req.id === id ? { ...req, status: 'approved' } : req
    ));
    toast.success(`Leave request for ${name} approved`);
  };

  const handleReject = (id: string, name: string) => {
    setLeaveRequests(prev => prev.map(req =>
      req.id === id ? { ...req, status: 'rejected' } : req
    ));
    toast.error(`Leave request for ${name} rejected`);
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
        <h1 className="text-3xl">HR Dashboard</h1>
        <p className="text-gray-500 mt-1">Manage leave requests and payroll</p>
      </div>

      {/* Payroll Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Total Payroll (May)</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className="text-2xl">$856,000</div>
            )}
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl">{leaveRequests.filter(r => r.status === 'pending').length}</div>
            )}
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download Reports
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Leave Requests Queue */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-8 w-32" /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  leaveRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.employeeName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{request.type}</Badge>
                      </TableCell>
                      <TableCell>{request.startDate}</TableCell>
                      <TableCell>{request.endDate}</TableCell>
                      <TableCell>{request.days}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            request.status === 'approved' ? 'default' :
                            request.status === 'rejected' ? 'destructive' :
                            'secondary'
                          }
                        >
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {request.status === 'pending' ? (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApprove(request.id, request.employeeName)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleReject(request.id, request.employeeName)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500 capitalize">{request.status}</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Attendance Overview (May 2026)
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
