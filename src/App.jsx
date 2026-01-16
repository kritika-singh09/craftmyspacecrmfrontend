import { AuthProvider } from './hooks/useAuth.jsx';
import { TenantProvider } from './hooks/useTenant.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { SubscriptionProvider } from './hooks/useSubscription.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.jsx';
import Layout from './Admin/layouts/AdminLayout';
import Dashboard from './Admin/ConstructionManagement/Dashboard/Dashboard';
import Projects from './Admin/ConstructionManagement/Projects/Projects';
import ProjectForm from './Admin/ConstructionManagement/Projects/ProjectForm';
import Contractors from './Admin/ConstructionManagement/Contractors/Contractors';
import Vendors from './Admin/ConstructionManagement/Vendors/Vendors';
import Materials from './Admin/ConstructionManagement/Materials/Materials';
import MaterialForm from './Admin/ConstructionManagement/Materials/MaterialForm';
import Workforce from './Admin/ConstructionManagement/Workforce/Workforce';
import Finance from './Admin/ConstructionManagement/Finance/Finance';
import FinanceForm from './Admin/ConstructionManagement/Finance/FinanceForm';
import Clients from './Admin/ConstructionManagement/Clients/Clients';
import ClientForm from './Admin/ConstructionManagement/Clients/ClientForm';
import Reports from './Admin/ConstructionManagement/Reports/Reports';
import DailySite from './Admin/ConstructionManagement/DailySite/DailySite';
import Quality from './Admin/ConstructionManagement/Quality/Quality';
import Safety from './Admin/ConstructionManagement/Safety/Safety';
import Documents from './Admin/ConstructionManagement/Documents/Documents';
import TaskForm from './Admin/ConstructionManagement/Forms/TaskForm';
import TenantForm from './Admin/ConstructionManagement/Forms/TenantForm';
import UserForm from './Admin/ConstructionManagement/Forms/UserForm';

// Architectural Design Imports
import ArchDashboard from './Admin/ArchitecturalDesign/Dashboard/Dashboard';
import ArchProjects from './Admin/ArchitecturalDesign/Projects/Projects';
import ArchClients from './Admin/ArchitecturalDesign/Clients/Clients';
import DesignTeam from './Admin/ArchitecturalDesign/DesignTeam/DesignTeam';
import DesignPhases from './Admin/ArchitecturalDesign/DesignPhases/DesignPhases';
import Drawings from './Admin/ArchitecturalDesign/Drawings/Drawings';
import Revisions from './Admin/ArchitecturalDesign/Revisions/Revisions';
import Approvals from './Admin/ArchitecturalDesign/Approvals/Approvals';
import Timeline from './Admin/ArchitecturalDesign/Timeline/Timeline';
import Billing from './Admin/ArchitecturalDesign/Billing/Billing';
import ArchDocuments from './Admin/ArchitecturalDesign/Documents/Documents';
import ArchReports from './Admin/ArchitecturalDesign/Reports/Reports';
import ArchProfile from './Admin/ArchitecturalDesign/CompanyProfile/CompanyProfile';
import ArchUsers from './Admin/ArchitecturalDesign/UserManagement/UserManagement';
import ArchSettings from './Admin/ArchitecturalDesign/Settings/Settings';
import ProjectDetails from './Admin/ArchitecturalDesign/Projects/ProjectDetails';

// Interior Design Imports
import IntDashboard from './Admin/InteriorDesign/Dashboard/Dashboard';
import IntProfile from './Admin/InteriorDesign/CompanyProfile/CompanyProfile';
import IntUsers from './Admin/InteriorDesign/Users/Users';
import IntProjects from './Admin/InteriorDesign/Projects/Projects';
import IntProjectDetails from './Admin/InteriorDesign/Projects/ProjectDetails';
import IntClients from './Admin/InteriorDesign/Clients/Clients';
import IntVendors from './Admin/InteriorDesign/Vendors/Vendors';
import IntMaterials from './Admin/InteriorDesign/Materials/Materials';
import IntReports from './Admin/InteriorDesign/Reports/Reports';
import IntPhases from './Admin/InteriorDesign/Phases/Phases';
import IntDesign3D from './Admin/InteriorDesign/Design3D/Design3D';
import IntSiteExecution from './Admin/InteriorDesign/SiteExecution/SiteExecution';
import IntApprovals from './Admin/InteriorDesign/Approvals/Approvals';
import IntBilling from './Admin/InteriorDesign/Billing/Billing';
import IntDocuments from './Admin/InteriorDesign/Documents/Documents';
import IntClosure from './Admin/InteriorDesign/Closure/Closure';
import GlobalDashboard from './Admin/GlobalDashboard/GlobalDashboard';
import Subscription from './Admin/Subscription/Subscription';
import ProjectSettings from './Admin/Projects/ProjectSettings';
import Profile from './Admin/Profile/Profile';
import Login from './Auth/Login';
import Register from './Auth/Register';
import CompanyRegister from './Auth/CompanyRegister';
import SuperAdminRegister from './Auth/SuperAdminRegister';
import { projects, vendors, contractors, clients } from './data/databaseDummyData';

import SuperAdminLayout from './SuperAdmin/layouts/SuperAdminLayout';
import SuperAdminDashboard from './SuperAdmin/ConstructionManagement/Dashboard/Dashboard';
import SuperAdminCompanies from './SuperAdmin/ConstructionManagement/Companies/Companies';
import SuperAdminGlobalUsers from './SuperAdmin/ConstructionManagement/GlobalUsers/GlobalUsers';
import SuperAdminSystemConfig from './SuperAdmin/ConstructionManagement/SystemConfig/SystemConfig';
import SuperAdminProjects from './SuperAdmin/ConstructionManagement/Projects/Projects';
import SuperAdminDailyReports from './SuperAdmin/ConstructionManagement/DailyReports/DailyReports';
import SuperAdminFinance from './SuperAdmin/ConstructionManagement/Finance/Finance';
import SuperAdminReports from './SuperAdmin/ConstructionManagement/Reports/Reports';
import SuperAdminPlans from './SuperAdmin/ConstructionManagement/Plans/Plans';
import SuperAdminModules from './SuperAdmin/ConstructionManagement/Modules/Modules';
import SuperAdminYield from './SuperAdmin/ConstructionManagement/Yield/Yield';
import SuperAdminVendors from './SuperAdmin/ConstructionManagement/Vendors/Vendors';
import SuperAdminManagers from './SuperAdmin/ConstructionManagement/Managers/Managers';
import Placeholder from './SuperAdmin/ConstructionManagement/General/Placeholder';

function AppContent() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/company-register" element={<CompanyRegister />} />
        <Route path="/superadmin-register" element={<SuperAdminRegister />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  // Super Admin Routing
  if (user?.role === 'SUPER_ADMIN') {
    return (
      <TenantProvider>
        <Routes>
          <Route path="/" element={<SuperAdminLayout />}>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<SuperAdminDashboard />} />
            <Route path="companies" element={<SuperAdminCompanies />} />
            <Route path="projects" element={<SuperAdminProjects />} />
            <Route path="plans-billing" element={<SuperAdminPlans />} />
            <Route path="yield-analytics" element={<SuperAdminYield />} />
            <Route path="daily-reports" element={<SuperAdminDailyReports />} />
            <Route path="vendors" element={<SuperAdminVendors />} />
            <Route path="managers" element={<SuperAdminManagers />} />
            <Route path="global-users" element={<SuperAdminGlobalUsers />} />
            <Route path="workforce" element={<SuperAdminGlobalUsers />} />
            <Route path="finance-global" element={<SuperAdminFinance />} />
            <Route path="modules" element={<SuperAdminModules />} />
            <Route path="system-config" element={<SuperAdminSystemConfig />} />
            <Route path="reports" element={<SuperAdminReports />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>
        </Routes>
      </TenantProvider>
    );
  }

  // Regular Tenant Routing
  return (
    <TenantProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/universal-dashboard" />} />
          <Route path="/universal-dashboard" element={<GlobalDashboard />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Projects Routes */}
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/add" element={<ProjectForm onSubmit={(data) => console.log(data)} clients={clients} />} />
          <Route path="/projects/edit/:id" element={<ProjectForm onSubmit={(data) => console.log(data)} clients={clients} />} />
          <Route path="/projects/settings" element={<ProjectSettings />} />

          {/* Clients Routes */}
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/add" element={<ClientForm onSubmit={(data) => console.log(data)} />} />
          <Route path="/clients/edit/:id" element={<ClientForm onSubmit={(data) => console.log(data)} />} />

          {/* Materials Routes */}
          <Route path="/materials" element={<Materials />} />
          <Route path="/materials/add" element={<MaterialForm onSubmit={(data) => console.log(data)} projects={projects} vendors={vendors} />} />
          <Route path="/materials/edit/:id" element={<MaterialForm onSubmit={(data) => console.log(data)} projects={projects} vendors={vendors} />} />

          {/* Finance Routes */}
          <Route path="/finance" element={<Finance />} />
          <Route path="/finance/add" element={<FinanceForm onSubmit={(data) => console.log(data)} projects={projects} vendors={vendors} contractors={contractors} clients={clients} />} />
          <Route path="/finance/edit/:id" element={<FinanceForm onSubmit={(data) => console.log(data)} projects={projects} vendors={vendors} contractors={contractors} clients={clients} />} />

          {/* Other Routes */}
          <Route path="/contractors" element={<Contractors />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/workforce" element={<Workforce />} />
          <Route path="/workforce/add" element={<UserForm onSubmit={(data) => console.log(data)} tenants={[]} />} />
          <Route path="/dailysite" element={<DailySite />} />
          <Route path="/tasks/add" element={<TaskForm onSubmit={(data) => console.log(data)} projects={projects} contractors={contractors} sites={[]} />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/reports" element={<Reports />} />

          {/* Architectural Design Routes */}
          <Route path="/arch-dashboard" element={<ArchDashboard />} />
          <Route path="/arch-projects" element={<ArchProjects />} />
          <Route path="/arch-clients" element={<ArchClients />} />
          <Route path="/design-team" element={<DesignTeam />} />
          <Route path="/design-phases" element={<DesignPhases />} />
          <Route path="/drawings" element={<Drawings />} />
          <Route path="/revisions" element={<Revisions />} />
          <Route path="/approvals" element={<Approvals />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/arch-documents" element={<ArchDocuments />} />
          <Route path="/arch-reports" element={<ArchReports />} />
          <Route path="/arch-profile" element={<ArchProfile />} />
          <Route path="/arch-users" element={<ArchUsers />} />
          <Route path="/arch-settings" element={<ArchSettings />} />
          <Route path="/arch-projects/:id" element={<ProjectDetails />} />

          {/* Interior Design Routes */}
          <Route path="/int-dashboard" element={<IntDashboard />} />
          <Route path="/int-profile" element={<IntProfile />} />
          <Route path="/int-users" element={<IntUsers />} />
          <Route path="/int-projects" element={<IntProjects />} />
          <Route path="/int-projects/:id" element={<IntProjectDetails />} />
          <Route path="/int-clients" element={<IntClients />} />
          <Route path="/int-vendors" element={<IntVendors />} />
          <Route path="/int-materials" element={<IntMaterials />} />
          <Route path="/int-reports" element={<IntReports />} />
          <Route path="/int-phases" element={<IntPhases />} />
          <Route path="/int-design-3d" element={<IntDesign3D />} />
          <Route path="/int-site-execution" element={<IntSiteExecution />} />
          <Route path="/int-approvals" element={<IntApprovals />} />
          <Route path="/int-billing" element={<IntBilling />} />
          <Route path="/int-documents" element={<IntDocuments />} />
          <Route path="/int-closure" element={<IntClosure />} />

          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Layout>
    </TenantProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SubscriptionProvider>
          <Router>
            <AppContent />
          </Router>
        </SubscriptionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
