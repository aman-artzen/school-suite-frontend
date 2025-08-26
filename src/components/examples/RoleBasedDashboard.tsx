import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePermissions } from '@/hooks/usePermissions';
import { PermissionGuard, ShowForRoles, HideIfNoPermission } from '@/components/PermissionGuard';
import { MODULES } from '@/config/permissions';
import { Users, BookOpen, DollarSign, Bus, Building, Package, BarChart3, Settings, UserCheck, Calendar, MessageSquare, Bell } from 'lucide-react';

/**
 * Example Dashboard Component demonstrating role-based UI rendering
 * Shows different content and actions based on user permissions
 */
export const RoleBasedDashboard: React.FC = () => {
  const { 
    currentRole, 
    getUserRoleDescription, 
    checkModuleAccess,
    canCreate,
    canEdit,
    canManage,
    getUserModules 
  } = usePermissions();

  const dashboardCards = [
    {
      title: 'Students',
      description: 'Manage student records',
      icon: Users,
      module: MODULES.STUDENTS,
      createAction: 'Add Student',
      manageAction: 'Manage Students'
    },
    {
      title: 'Staff',
      description: 'Staff management',
      icon: UserCheck,
      module: MODULES.STAFF,
      createAction: 'Add Staff',
      manageAction: 'Manage Staff'
    },
    {
      title: 'Attendance',
      description: 'Track attendance',
      icon: Calendar,
      module: MODULES.ATTENDANCE,
      createAction: 'Mark Attendance',
      manageAction: 'View Reports'
    },
    {
      title: 'Fees',
      description: 'Fee management',
      icon: DollarSign,
      module: MODULES.FEES,
      createAction: 'Create Invoice',
      manageAction: 'Manage Payments'
    },
    {
      title: 'Library',
      description: 'Book management',
      icon: BookOpen,
      module: MODULES.LIBRARY,
      createAction: 'Add Book',
      manageAction: 'Manage Library'
    },
    {
      title: 'Transport',
      description: 'Transport system',
      icon: Bus,
      module: MODULES.TRANSPORT,
      createAction: 'Add Route',
      manageAction: 'Manage Transport'
    }
  ];

  return (
    <div className="space-y-6">
      {/* User Role Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Welcome to School ERP
            <Badge variant="secondary" className="capitalize">
              {currentRole?.replace('_', ' ')}
            </Badge>
          </CardTitle>
          <CardDescription>
            {getUserRoleDescription()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            You have access to {getUserModules().length} modules
          </div>
        </CardContent>
      </Card>

      {/* Role-specific Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ShowForRoles roles={['admin', 'teacher']}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                +20 from last month
              </p>
            </CardContent>
          </Card>
        </ShowForRoles>

        <ShowForRoles roles={['admin', 'accountant']}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231</div>
              <p className="text-xs text-muted-foreground">
                +15% from last month
              </p>
            </CardContent>
          </Card>
        </ShowForRoles>

        <ShowForRoles roles={['student', 'parent']}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>
        </ShowForRoles>

        <ShowForRoles roles={['admin', 'librarian']}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Books Issued</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">
                This week
              </p>
            </CardContent>
          </Card>
        </ShowForRoles>
      </div>

      {/* Module Access Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dashboardCards.map((card) => (
          <PermissionGuard key={card.module} module={card.module}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <card.icon className="h-5 w-5" />
                  {card.title}
                </CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <HideIfNoPermission module={card.module} permission="view">
                  <Button variant="outline" size="sm" className="w-full">
                    View {card.title}
                  </Button>
                </HideIfNoPermission>
                
                <HideIfNoPermission module={card.module} permission="create">
                  <Button size="sm" className="w-full">
                    {card.createAction}
                  </Button>
                </HideIfNoPermission>
                
                <HideIfNoPermission module={card.module} permission="manage">
                  <Button variant="secondary" size="sm" className="w-full">
                    {card.manageAction}
                  </Button>
                </HideIfNoPermission>
              </CardContent>
            </Card>
          </PermissionGuard>
        ))}
      </div>

      {/* Admin-only Settings */}
      <ShowForRoles roles={['admin']}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              System Administration
            </CardTitle>
            <CardDescription>
              Administrative tools and settings
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Reports
            </Button>
            <Button variant="outline">
              <Package className="h-4 w-4 mr-2" />
              Manage Inventory
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              System Settings
            </Button>
          </CardContent>
        </Card>
      </ShowForRoles>

      {/* Debug Information (for development) */}
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-sm">Debug: Current Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs space-y-1">
            <div><strong>Role:</strong> {currentRole}</div>
            <div><strong>Modules:</strong> {getUserModules().join(', ')}</div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {dashboardCards.map((card) => (
                <div key={card.module} className="flex justify-between">
                  <span>{card.title}:</span>
                  <span className={checkModuleAccess(card.module) ? 'text-green-600' : 'text-red-600'}>
                    {checkModuleAccess(card.module) ? '✓' : '✗'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};