import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Auth from "./pages/Auth";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Staff from "./pages/Staff";
import Attendance from "./pages/Attendance";
import Academic from "./pages/Academic";
import Fees from "./pages/Fees";
import Communication from "./pages/Communication";
import Library from "./pages/Library";
import Transport from "./pages/Transport";
import Hostel from "./pages/Hostel";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import HRPayroll from "./pages/HRPayroll";
import Inventory from "./pages/Inventory";
import Exams from "./pages/Exams";
import ParentPortal from "./pages/ParentPortal";
import ELearning from "./pages/ELearning";
import Classes from "./pages/Classes";
import Notices from "./pages/Notices";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="students" element={<Students />} />
              <Route path="staff" element={<Staff />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="academic" element={<Academic />} />
              <Route path="fees" element={<Fees />} />
              <Route path="communication" element={<Communication />} />
              <Route path="library" element={<Library />} />
              <Route path="transport" element={<Transport />} />
              <Route path="hostel" element={<Hostel />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
              <Route path="hr-payroll" element={<HRPayroll />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="exams" element={<Exams />} />
              <Route path="parent-portal" element={<ParentPortal />} />
              <Route path="elearning" element={<ELearning />} />
              <Route path="classes" element={<Classes />} />
              <Route path="notices" element={<Notices />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
