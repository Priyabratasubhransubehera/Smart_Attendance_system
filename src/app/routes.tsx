import { createBrowserRouter, Navigate } from 'react-router';
import { RequireAuth } from './components/RequireAuth';
import { AppLayout } from './components/AppLayout';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { HRDashboard } from './pages/hr/HRDashboard';
import { ManagerDashboard } from './pages/manager/ManagerDashboard';
import { EmployeeDashboard } from './pages/employee/EmployeeDashboard';
import { Unauthorized } from './pages/Unauthorized';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/unauthorized',
    element: <Unauthorized />,
  },
  {
    path: '/',
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      // Admin routes
      {
        path: 'admin',
        element: (
          <RequireAuth allowedRoles={['admin']}>
            <AdminDashboard />
          </RequireAuth>
        ),
      },
      {
        path: 'admin/*',
        element: (
          <RequireAuth allowedRoles={['admin']}>
            <AdminDashboard />
          </RequireAuth>
        ),
      },
      // HR routes
      {
        path: 'hr',
        element: (
          <RequireAuth allowedRoles={['hr']}>
            <HRDashboard />
          </RequireAuth>
        ),
      },
      {
        path: 'hr/*',
        element: (
          <RequireAuth allowedRoles={['hr']}>
            <HRDashboard />
          </RequireAuth>
        ),
      },
      // Manager routes
      {
        path: 'manager',
        element: (
          <RequireAuth allowedRoles={['manager']}>
            <ManagerDashboard />
          </RequireAuth>
        ),
      },
      {
        path: 'manager/*',
        element: (
          <RequireAuth allowedRoles={['manager']}>
            <ManagerDashboard />
          </RequireAuth>
        ),
      },
      // Employee routes
      {
        path: 'employee',
        element: (
          <RequireAuth allowedRoles={['employee']}>
            <EmployeeDashboard />
          </RequireAuth>
        ),
      },
      {
        path: 'employee/*',
        element: (
          <RequireAuth allowedRoles={['employee']}>
            <EmployeeDashboard />
          </RequireAuth>
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);