import { useEffect, useState } from 'react';
import { Users, UserCheck, UserMinus, UserPlus, TrendingUp, Search, Plus, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
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
import { Label } from '../../components/ui/label';
import { mockApi } from '../../lib/mockApi';
import { DashboardMetrics, Employee } from '../../types';
import { toast } from 'sonner';

export function AdminDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [metricsData, employeesData] = await Promise.all([
        mockApi.getDashboardMetrics('admin'),
        mockApi.getEmployees(),
      ]);
      setMetrics(metricsData);
      setEmployees(employeesData);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setDialogOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setDialogOpen(true);
  };

  const handleDeactivateEmployee = async (id: string) => {
    try {
      await mockApi.updateEmployee(id, { status: 'inactive' });
      setEmployees(employees.map((e) => (e.id === id ? { ...e, status: 'inactive' } : e)));
      toast.success('Employee deactivated successfully');
    } catch (error) {
      toast.error('Failed to deactivate employee');
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || emp.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || emp.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const departments = Array.from(new Set(employees.map((e) => e.department)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Admin Dashboard</h1>
          <p className="text-gray-400">Manage your organization</p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <Card className="bg-[#1a1d21] border-gray-800 hover:border-emerald-500/50 transition-colors">
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

            <Card className="bg-[#1a1d21] border-gray-800 hover:border-emerald-500/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Present Today</p>
                    <p className="text-3xl font-semibold text-white mt-2">{metrics?.presentToday}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-0 text-xs">
                        {metrics?.attendanceRate}%
                      </Badge>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1d21] border-gray-800 hover:border-emerald-500/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">On Leave</p>
                    <p className="text-3xl font-semibold text-white mt-2">{metrics?.onLeave}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Badge className="bg-amber-500/10 text-amber-400 border-0 text-xs">
                        {metrics?.pendingLeaveRequests} pending
                      </Badge>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <UserMinus className="w-6 h-6 text-amber-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1d21] border-gray-800 hover:border-emerald-500/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">New Joiners</p>
                    <p className="text-3xl font-semibold text-white mt-2">{metrics?.newJoiners}</p>
                    <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <UserPlus className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Employee Table */}
      <Card className="bg-[#1a1d21] border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Recent Employees</CardTitle>
            <Button
              onClick={handleAddEmployee}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search by name, email, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#0f1214] border-gray-800 text-white placeholder:text-gray-500"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-[#0f1214] border-gray-800 text-white">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1d21] border-gray-800 text-white">
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-[#0f1214] border-gray-800 text-white">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1d21] border-gray-800 text-white">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="on-leave">On Leave</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
                  <TableHead className="text-gray-400">Department</TableHead>
                  <TableHead className="text-gray-400">Position</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id} className="border-gray-800 hover:bg-gray-800/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={employee.avatar} />
                          <AvatarFallback className="bg-emerald-600 text-white">
                            {employee.name.split(' ').map((n) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white font-medium">{employee.name}</p>
                          <p className="text-sm text-gray-400">{employee.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">{employee.department}</TableCell>
                    <TableCell className="text-gray-300">{employee.position}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          employee.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-400 border-0'
                            : employee.status === 'remote'
                            ? 'bg-blue-500/10 text-blue-400 border-0'
                            : employee.status === 'on-leave'
                            ? 'bg-amber-500/10 text-amber-400 border-0'
                            : 'bg-gray-500/10 text-gray-400 border-0'
                        }
                      >
                        {employee.status === 'on-leave' ? 'On Leave' : employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditEmployee(employee)}
                          className="text-gray-400 hover:text-white hover:bg-gray-800"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeactivateEmployee(employee.id)}
                          disabled={employee.status === 'inactive'}
                          className="text-gray-400 hover:text-red-400 hover:bg-gray-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Employee Dialog */}
      <EmployeeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        employee={editingEmployee}
        onSuccess={loadData}
      />
    </div>
  );
}

interface EmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee | null;
  onSuccess: () => void;
}

function EmployeeDialog({ open, onOpenChange, employee, onSuccess }: EmployeeDialogProps) {
  const [formData, setFormData] = useState<Partial<Employee>>({
    name: '',
    email: '',
    department: '',
    position: '',
    status: 'active',
    phone: '',
    joinDate: new Date().toISOString().split('T')[0],
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    } else {
      setFormData({
        name: '',
        email: '',
        department: '',
        position: '',
        status: 'active',
        phone: '',
        joinDate: new Date().toISOString().split('T')[0],
      });
    }
  }, [employee]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (employee) {
        await mockApi.updateEmployee(employee.id, formData);
        toast.success('Employee updated successfully');
      } else {
        await mockApi.addEmployee(formData as Omit<Employee, 'id'>);
        toast.success('Employee added successfully');
      }
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to save employee');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1a1d21] border-gray-800 text-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{employee ? 'Edit Employee' : 'Add New Employee'}</DialogTitle>
          <DialogDescription className="text-gray-400">
            {employee ? 'Update employee information' : 'Enter the details of the new employee'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-[#0f1214] border-gray-800 text-white"
                required
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-[#0f1214] border-gray-800 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="bg-[#0f1214] border-gray-800 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="bg-[#0f1214] border-gray-800 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-[#0f1214] border-gray-800 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="joinDate">Join Date</Label>
              <Input
                id="joinDate"
                type="date"
                value={formData.joinDate}
                onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                className="bg-[#0f1214] border-gray-800 text-white"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="bg-[#0f1214] border-gray-800 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
            >
              {saving ? 'Saving...' : employee ? 'Update' : 'Add Employee'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
