import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PermissionGuard, ShowForRoles, HideIfNoPermission } from '@/components/PermissionGuard';
import { usePermissions } from '@/hooks/usePermissions';
import { MODULES, PERMISSIONS } from '@/config/permissions';
import { Info, Code, Users, BookOpen, DollarSign } from 'lucide-react';

/**
 * Permission Examples Component
 * Demonstrates various ways to implement role-based access control
 */
export const PermissionExamples: React.FC = () => {
  const { currentRole, checkModuleAccess, checkPermission } = usePermissions();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            RBAC Implementation Examples
          </CardTitle>
          <CardDescription>
            Examples of how to implement role-based access control in your components
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Usage</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="code">Code Examples</TabsTrigger>
          <TabsTrigger value="matrix">Permissions Matrix</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>1. Show/Hide Components by Role</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ShowForRoles roles={['admin']}>
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    This content is only visible to <Badge variant="destructive">Admin</Badge> users.
                  </AlertDescription>
                </Alert>
              </ShowForRoles>

              <ShowForRoles roles={['teacher', 'admin']}>
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    This content is visible to <Badge variant="secondary">Teacher</Badge> and <Badge variant="destructive">Admin</Badge> users.
                  </AlertDescription>
                </Alert>
              </ShowForRoles>

              <ShowForRoles roles={['student', 'parent']}>
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    This content is visible to <Badge variant="outline">Student</Badge> and <Badge variant="outline">Parent</Badge> users.
                  </AlertDescription>
                </Alert>
              </ShowForRoles>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Module-Based Access Control</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <PermissionGuard module={MODULES.STUDENTS} showAlert>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Student Management Module
                  </h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    This section is only visible if you have access to the Students module.
                  </p>
                </div>
              </PermissionGuard>

              <PermissionGuard module={MODULES.LIBRARY} showAlert>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Library Management Module
                  </h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    This section is only visible if you have access to the Library module.
                  </p>
                </div>
              </PermissionGuard>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>3. Permission-Based Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Student Management Actions</h4>
                <div className="flex flex-wrap gap-2">
                  <HideIfNoPermission module={MODULES.STUDENTS} permission={PERMISSIONS.VIEW}>
                    <Button variant="outline" size="sm">View Students</Button>
                  </HideIfNoPermission>
                  
                  <HideIfNoPermission module={MODULES.STUDENTS} permission={PERMISSIONS.CREATE}>
                    <Button size="sm">Add Student</Button>
                  </HideIfNoPermission>
                  
                  <HideIfNoPermission module={MODULES.STUDENTS} permission={PERMISSIONS.EDIT}>
                    <Button variant="secondary" size="sm">Edit Student</Button>
                  </HideIfNoPermission>
                  
                  <HideIfNoPermission module={MODULES.STUDENTS} permission={PERMISSIONS.DELETE}>
                    <Button variant="destructive" size="sm">Delete Student</Button>
                  </HideIfNoPermission>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Fee Management Actions</h4>
                <div className="flex flex-wrap gap-2">
                  <HideIfNoPermission module={MODULES.FEES} permission={PERMISSIONS.VIEW}>
                    <Button variant="outline" size="sm">
                      <DollarSign className="h-4 w-4 mr-2" />
                      View Fees
                    </Button>
                  </HideIfNoPermission>
                  
                  <HideIfNoPermission module={MODULES.FEES} permission={PERMISSIONS.CREATE}>
                    <Button size="sm">Create Invoice</Button>
                  </HideIfNoPermission>
                  
                  <HideIfNoPermission module={MODULES.FEES} permission={PERMISSIONS.APPROVE}>
                    <Button variant="secondary" size="sm">Approve Payment</Button>
                  </HideIfNoPermission>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Conditional UI Elements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 border rounded">
                  <span>Student Record #123</span>
                  <div className="flex gap-2">
                    {checkPermission(MODULES.STUDENTS, PERMISSIONS.EDIT) && (
                      <Button size="sm" variant="outline">Edit</Button>
                    )}
                    {checkPermission(MODULES.STUDENTS, PERMISSIONS.DELETE) && (
                      <Button size="sm" variant="destructive">Delete</Button>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-2 border rounded">
                  <span>Fee Invoice #456</span>
                  <div className="flex gap-2">
                    {checkPermission(MODULES.FEES, PERMISSIONS.EDIT) && (
                      <Button size="sm" variant="outline">Modify</Button>
                    )}
                    {checkPermission(MODULES.FEES, PERMISSIONS.APPROVE) && (
                      <Button size="sm">Approve</Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Code Implementation Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">1. Using PermissionGuard Component</h4>
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`<PermissionGuard module="students" permission="create">
  <Button>Add Student</Button>
</PermissionGuard>`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">2. Using ShowForRoles Component</h4>
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`<ShowForRoles roles={['admin', 'teacher']}>
  <AdminPanel />
</ShowForRoles>`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">3. Using usePermissions Hook</h4>
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`const { checkPermission, canCreate, currentRole } = usePermissions();

// Check specific permission
if (checkPermission('students', 'create')) {
  // Show create button
}

// Convenience method
if (canCreate('students')) {
  // Show create button
}`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">4. Conditional Rendering</h4>
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`{currentRole === 'admin' && <AdminSettings />}
{['teacher', 'admin'].includes(currentRole) && <TeacherTools />}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matrix" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Current Permissions</CardTitle>
              <CardDescription>
                Role: <Badge className="capitalize">{currentRole?.replace('_', ' ')}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 text-sm">
                {Object.values(MODULES).map((module) => (
                  <div key={module} className="flex items-center justify-between p-2 border rounded">
                    <span className="capitalize font-medium">{module.replace('_', ' ')}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant={checkModuleAccess(module) ? "default" : "secondary"}>
                        {checkModuleAccess(module) ? "✓ Access" : "✗ No Access"}
                      </Badge>
                      {checkModuleAccess(module) && (
                        <div className="flex gap-1">
                          {Object.values(PERMISSIONS).filter(perm => 
                            checkPermission(module, perm)
                          ).map(perm => (
                            <Badge key={perm} variant="outline" className="text-xs">
                              {perm}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};