import React from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface PermissionGuardProps {
  children: React.ReactNode;
  module?: string;
  permission?: string;
  requiredRole?: string[];
  fallback?: React.ReactNode;
  showAlert?: boolean;
}

/**
 * Permission Guard Component
 * Conditionally renders content based on user permissions
 * 
 * @param module - The module to check access for
 * @param permission - Specific permission to check (optional)
 * @param requiredRole - Array of roles that can access (optional)
 * @param fallback - What to render if access is denied
 * @param showAlert - Whether to show an access denied alert
 */
export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  children,
  module,
  permission,
  requiredRole,
  fallback,
  showAlert = false
}) => {
  const { checkModuleAccess, checkPermission, currentRole } = usePermissions();

  // Check role-based access if requiredRole is specified
  if (requiredRole && currentRole) {
    if (!requiredRole.includes(currentRole)) {
      return renderFallback();
    }
  }

  // Check module access if module is specified
  if (module && !checkModuleAccess(module)) {
    return renderFallback();
  }

  // Check specific permission if both module and permission are specified
  if (module && permission && !checkPermission(module, permission)) {
    return renderFallback();
  }

  return <>{children}</>;

  function renderFallback() {
    if (fallback) return <>{fallback}</>;
    
    if (showAlert) {
      return (
        <Alert variant="destructive" className="my-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            You don't have permission to access this content.
          </AlertDescription>
        </Alert>
      );
    }
    
    return null;
  }
};

/**
 * Utility component for hiding UI elements based on permissions
 */
export const HideIfNoPermission: React.FC<{
  children: React.ReactNode;
  module: string;
  permission?: string;
}> = ({ children, module, permission }) => {
  return (
    <PermissionGuard module={module} permission={permission}>
      {children}
    </PermissionGuard>
  );
};

/**
 * Utility component for showing content only to specific roles
 */
export const ShowForRoles: React.FC<{
  children: React.ReactNode;
  roles: string[];
}> = ({ children, roles }) => {
  return (
    <PermissionGuard requiredRole={roles}>
      {children}
    </PermissionGuard>
  );
};