import { useAuth } from '@/contexts/AuthContext';
import { hasModuleAccess, hasPermission, getModulesForRole, getPermissionsForModule, getRoleDescription } from '@/config/permissions';

/**
 * Custom hook for role-based permission checking
 * Provides utilities to check access and permissions for the current user
 */
export const usePermissions = () => {
  const { profile } = useAuth();

  const checkModuleAccess = (module: string): boolean => {
    if (!profile?.role) return false;
    return hasModuleAccess(profile.role, module);
  };

  const checkPermission = (module: string, permission: string): boolean => {
    if (!profile?.role) return false;
    return hasPermission(profile.role, module, permission);
  };

  const getUserModules = (): string[] => {
    if (!profile?.role) return [];
    return getModulesForRole(profile.role);
  };

  const getModulePermissions = (module: string): string[] => {
    if (!profile?.role) return [];
    return getPermissionsForModule(profile.role, module);
  };

  const getUserRoleDescription = (): string => {
    if (!profile?.role) return '';
    return getRoleDescription(profile.role);
  };

  return {
    // Permission checking functions
    checkModuleAccess,
    checkPermission,
    
    // Data retrieval functions
    getUserModules,
    getModulePermissions,
    getUserRoleDescription,
    
    // Current user info
    currentRole: profile?.role,
    isLoggedIn: !!profile,
    
    // Convenience functions for common checks
    canView: (module: string) => checkPermission(module, 'view'),
    canCreate: (module: string) => checkPermission(module, 'create'),
    canEdit: (module: string) => checkPermission(module, 'edit'),
    canDelete: (module: string) => checkPermission(module, 'delete'),
    canManage: (module: string) => checkPermission(module, 'manage'),
    canApprove: (module: string) => checkPermission(module, 'approve'),
    canAssign: (module: string) => checkPermission(module, 'assign'),
    canGrade: (module: string) => checkPermission(module, 'grade')
  };
};