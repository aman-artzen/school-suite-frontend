import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  Users, 
  UserCheck, 
  Calendar, 
  BookOpen, 
  CreditCard, 
  MessageSquare, 
  Library, 
  Bus, 
  Building, 
  BarChart3, 
  Settings,
  GraduationCap,
  ChevronLeft,
  Menu,
  LogOut,
  Package,
  FileText,
  School,
  Bell,
  Monitor
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useAuth, UserRole } from "@/contexts/AuthContext";

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: Home, roles: ['admin', 'teacher', 'student', 'parent', 'staff'] as UserRole[] },
  { name: 'Student Management', href: '/students', icon: Users, roles: ['admin', 'teacher'] as UserRole[] },
  { name: 'Staff Management', href: '/staff', icon: UserCheck, roles: ['admin'] as UserRole[] },
  { name: 'Attendance', href: '/attendance', icon: Calendar, roles: ['admin', 'teacher', 'student'] as UserRole[] },
  { name: 'Academic', href: '/academic', icon: BookOpen, roles: ['admin', 'teacher', 'student'] as UserRole[] },
  { name: 'Classes', href: '/classes', icon: School, roles: ['admin', 'teacher', 'student'] as UserRole[] },
  { name: 'Exams', href: '/exams', icon: FileText, roles: ['admin', 'teacher', 'student'] as UserRole[] },
  { name: 'Fee Management', href: '/fees', icon: CreditCard, roles: ['admin', 'staff', 'parent'] as UserRole[] },
  { name: 'Communication', href: '/communication', icon: MessageSquare, roles: ['admin', 'teacher', 'student', 'parent'] as UserRole[] },
  { name: 'Notices', href: '/notices', icon: Bell, roles: ['admin', 'teacher', 'student', 'parent'] as UserRole[] },
  { name: 'Library', href: '/library', icon: Library, roles: ['admin', 'teacher', 'student'] as UserRole[] },
  { name: 'Transport', href: '/transport', icon: Bus, roles: ['admin', 'staff', 'student', 'parent'] as UserRole[] },
  { name: 'Hostel', href: '/hostel', icon: Building, roles: ['admin', 'staff', 'student', 'parent'] as UserRole[] },
  { name: 'E-Learning', href: '/elearning', icon: Monitor, roles: ['admin', 'teacher', 'student'] as UserRole[] },
  { name: 'Parent Portal', href: '/parent-portal', icon: Users, roles: ['parent'] as UserRole[] },
  { name: 'HR & Payroll', href: '/hr-payroll', icon: UserCheck, roles: ['admin'] as UserRole[] },
  { name: 'Inventory', href: '/inventory', icon: Package, roles: ['admin', 'staff'] as UserRole[] },
  { name: 'Reports', href: '/reports', icon: BarChart3, roles: ['admin', 'teacher'] as UserRole[] },
  { name: 'Settings', href: '/settings', icon: Settings, roles: ['admin'] as UserRole[] },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const { profile, signOut } = useAuth();

  const navigation = navigationItems.filter(item => 
    profile ? item.roles.includes(profile.role) : false
  );

  return (
    <div className={cn(
      "bg-gradient-primary text-primary-foreground transition-all duration-300 shadow-strong",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-primary-light/20">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
            <h1 className="text-xl font-bold text-primary-foreground">SchoolERP</h1>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-primary-foreground hover:bg-primary-light/20 h-8 w-8"
        >
          {collapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive 
                    ? "bg-primary-foreground text-primary shadow-soft" 
                    : "text-primary-foreground/90 hover:bg-primary-light/20 hover:text-primary-foreground",
                  collapsed && "justify-center px-3"
                )}
              >
                <item.icon className={cn("h-5 w-5 flex-shrink-0")} />
                {!collapsed && (
                  <span className="animate-fade-in">{item.name}</span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </ScrollArea>

      {/* User Profile Section */}
      {!collapsed && profile && (
        <div className="border-t border-primary-light/20 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <span className="text-xs font-semibold text-primary-foreground">
                {profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-primary-foreground truncate">{profile.full_name}</p>
              <p className="text-xs text-primary-foreground/70 truncate capitalize">{profile.role}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={signOut}
            className="w-full text-primary-foreground hover:bg-primary-light/20 justify-start"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      )}
    </div>
  );
}