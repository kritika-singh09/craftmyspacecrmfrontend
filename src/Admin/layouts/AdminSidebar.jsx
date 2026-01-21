import { useState } from 'react';
import {
  FiGrid,
  FiBriefcase,
  FiUsers,
  FiShoppingCart,
  FiUserCheck,
  FiBox,
  FiPieChart,
  FiFileText,
  FiInfo,
  FiShoppingBag,
  FiImage,
  FiArchive,
  FiTruck,
  FiActivity,
  FiCheckCircle,
  FiShield,
  FiFolder,
  FiBarChart2,
  FiLayers,
  FiUser,
  FiSettings,
  FiChevronDown,
  FiChevronRight,
  FiCreditCard,
  FiLock,
  FiAlertTriangle,
  FiDollarSign
} from 'react-icons/fi';
import { useSubscription } from '../../hooks/useSubscription';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useAuth } from '../../hooks/useAuth.jsx';

const Sidebar = ({ isOpen, onNavigate }) => {
  const { subscription, isModuleLocked } = useSubscription();
  const { theme } = useTheme();
  const { user } = useAuth();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [expandedSections, setExpandedSections] = useState({
    'UNIVERSAL CORE': true,
    'Construction Management': false,
    'Architectural Design': false,
    'Interior Design': false
  });

  const categories = [
    {
      title: 'UNIVERSAL CORE',
      items: [
        { id: 'projects', name: 'Global Projects', icon: <FiBriefcase /> },
        { id: 'workforce', name: 'Staff & Attendance', icon: <FiUserCheck /> },
        // { id: 'payroll', name: 'Global Payroll & HR', icon: <FiDollarSign /> },
        { id: 'finance', name: 'Financial Ledger', icon: <FiPieChart /> },
        { id: 'vendors', name: 'Vendors', icon: <FiShoppingCart /> },
        { id: 'safety', name: 'Safety Protocols', icon: <FiShield /> },
        { id: 'reports', name: 'Analytics Reports', icon: <FiBarChart2 /> }
      ]
    },
    {
      title: 'Construction Management',
      items: [
        // { id: 'dashboard', name: 'Unit Dashboard', icon: <FiGrid /> },
        { id: 'clients', name: 'Clients', icon: <FiUsers /> },
        { id: 'contractors', name: 'Contractors', icon: <FiUsers /> },
        // Vendors moved to Universal Core
        { id: 'materials', name: 'Materials', icon: <FiBox /> },
        { id: 'dailysite', name: 'Daily Site', icon: <FiFileText /> },
        { id: 'quality', name: 'Quality Control', icon: <FiCheckCircle /> },
        { id: 'risk', name: 'Risk Management', icon: <FiAlertTriangle /> },
        { id: 'documents', name: 'Documents', icon: <FiFolder /> }
      ]
    },
    {
      title: 'Architectural Design',
      items: [
        // { id: 'arch-dashboard', name: 'Unit Dashboard', icon: <FiGrid /> },
        { id: 'arch-profile', name: 'Company Profile', icon: <FiInfo /> },
        { id: 'arch-users', name: 'User Management', icon: <FiUser /> },
        { id: 'arch-clients', name: 'Clients', icon: <FiUsers /> },
        { id: 'design-phases', name: 'Design Phases', icon: <FiLayers /> },
        { id: 'drawings', name: 'Drawings', icon: <FiFolder /> },
        { id: 'revisions', name: 'Revisions', icon: <FiFileText /> },
        { id: 'approvals', name: 'Approvals', icon: <FiCheckCircle /> },
        { id: 'timeline', name: 'Timeline', icon: <FiFileText /> },
        { id: 'arch-documents', name: 'Documents', icon: <FiFolder /> },
        { id: 'arch-settings', name: 'Settings', icon: <FiSettings /> }
      ]
    },
    {
      title: 'Interior Design',
      items: [
        // { id: 'int-dashboard', name: 'Unit Dashboard', icon: <FiGrid /> },
        { id: 'int-profile', name: 'Company Profile', icon: <FiInfo /> },
        { id: 'int-users', name: 'User Management', icon: <FiUser /> },
        { id: 'int-clients', name: 'Clients', icon: <FiUsers /> },
        { id: 'int-vendors', name: 'Vendors', icon: <FiShoppingBag /> },
        { id: 'int-materials', name: 'Materials & BOQ', icon: <FiBox /> },
        { id: 'int-phases', name: 'Design Phases', icon: <FiLayers /> },
        { id: 'int-design-3d', name: 'Drawings & 3D', icon: <FiImage /> },
        { id: 'int-approvals', name: 'Approvals', icon: <FiCheckCircle /> },
        { id: 'int-site-execution', name: 'Site Execution', icon: <FiTruck /> },
        { id: 'int-billing', name: 'Billing', icon: <FiPieChart /> },
        { id: 'int-documents', name: 'Documents', icon: <FiFolder /> },
        { id: 'int-closure', name: 'Closure & Handover', icon: <FiArchive /> }
      ]
    }
  ];

  // Role-based filtering logic
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';
  const isCompanyAdmin = user?.role === 'COMPANY_ADMIN';
  const isStaff = ['ENGINEER', 'SUPERVISOR', 'CONTRACTOR'].includes(user?.role);

  const filteredCategories = categories.map(category => ({
    ...category,
    items: category.items.filter(item => {
      if (isSuperAdmin) return true;
      if (isCompanyAdmin) {
        return [
          'projects', 'workforce', 'vendors',
          'clients', 'contractors', 'materials'
        ].includes(item.id);
      }
      if (isStaff) {
        return item.id === 'workforce';
      }
      return false;
    })
  })).filter(category => category.items.length > 0);

  const showDashboard = isSuperAdmin || isCompanyAdmin;
  const showSubscription = isSuperAdmin || isCompanyAdmin;

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    onNavigate(menuId);
  };

  const toggleSection = (title) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <aside
      className={`fixed left-0 top-16 h-full w-64 shadow-premium transform transition-transform duration-300 z-40 border-r border-white/5 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      style={{ background: theme.gradients.sidebar }}
    >
      <nav className="p-4 h-full overflow-y-auto no-scrollbar pb-24">
        <ul className="space-y-4">
          {/* {showDashboard && (
            <li>
              <button
                onClick={() => handleMenuClick('universal-dashboard')}
                style={activeMenu === 'universal-dashboard' ? { background: theme.gradients.button } : {}}
                className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all ${activeMenu === 'universal-dashboard'
                  ? 'text-white shadow-brand-sm font-semibold'
                  : 'text-white/80 hover:bg-white/5 hover:text-white font-medium border border-white/5'
                  }`}
              >
                <span className={`mr-3 text-lg transition-colors ${activeMenu === 'universal-dashboard' ? 'text-white' : 'text-slate-400 group-hover:text-blue-200'}`}>
                  <FiGrid />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm tracking-tight" style={{ color: activeMenu === 'universal-dashboard' ? theme.textOnPrimary : 'rgba(255,255,255,0.8)' }}>Global Overview</span>
                  <span className="text-[8px] font-black uppercase tracking-[0.1em] opacity-60" style={{ color: activeMenu === 'universal-dashboard' ? theme.textOnPrimary : 'rgba(255,255,255,0.6)' }}>Universal Dashboard</span>
                </div>
              </button>
            </li>
          )} */}

          {/* {showDashboard && <div className="h-px bg-white/5 my-4 mx-2"></div>} */}

          {filteredCategories.map((category) => (
            <li key={category.title} className="space-y-1">
              <button
                disabled={category.title !== 'UNIVERSAL CORE' && isModuleLocked(category.title.split(' ')[0].replace('Architectural', 'Architecture'))}
                onClick={() => toggleSection(category.title)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all group border ${(category.title !== 'UNIVERSAL CORE' && isModuleLocked(category.title.split(' ')[0].replace('Architectural', 'Architecture')))
                  ? 'bg-slate-800/50 opacity-40 cursor-not-allowed border-transparent'
                  : 'bg-white/5 hover:bg-white/10 border-white/5'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-200 group-hover:text-white transition-colors">
                    {category.title}
                  </span>
                  {(category.title !== 'UNIVERSAL CORE' && isModuleLocked(category.title.split(' ')[0].replace('Architectural', 'Architecture'))) && <FiLock className="text-slate-500 text-xs" />}
                </div>
                <span className="text-blue-300 group-hover:text-white transition-colors">
                  {expandedSections[category.title] ? <FiChevronDown /> : <FiChevronRight />}
                </span>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedSections[category.title] ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <ul className="space-y-1 mt-1 px-1">
                  {category.items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => handleMenuClick(item.id)}
                        style={activeMenu === item.id ? { background: theme.gradients.button } : {}}
                        className={`w-full flex items-center px-4 py-2.5 text-left rounded-xl transition-all ${activeMenu === item.id
                          ? 'text-white shadow-brand-sm font-semibold'
                          : 'text-white/80 hover:bg-white/5 hover:text-white font-medium'
                          }`}
                      >
                        <span className={`mr-3 text-lg transition-colors ${activeMenu === item.id ? 'text-white' : 'text-slate-400 group-hover:text-blue-200'}`}>
                          {item.icon}
                        </span>
                        <span className="text-sm tracking-tight" style={{ color: activeMenu === item.id ? theme.textOnPrimary : 'rgba(255,255,255,0.8)' }}>{item.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}

          {/* {showSubscription && (
            <>
              <div className="h-px bg-white/5 my-4 mx-2"></div>
              <li>
                <button
                  onClick={() => handleMenuClick('subscription')}
                  style={activeMenu === 'subscription' ? { background: theme.gradients.button } : {}}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all ${activeMenu === 'subscription'
                    ? 'text-white shadow-brand-sm font-semibold'
                    : 'text-white/80 hover:bg-white/5 hover:text-white font-medium border border-white/5'
                    }`}
                >
                  <span className={`mr-3 text-lg transition-colors ${activeMenu === 'subscription' ? 'text-white' : 'text-slate-400 group-hover:text-blue-200'}`}>
                    <FiCreditCard />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm tracking-tight" style={{ color: activeMenu === 'subscription' ? theme.textOnPrimary : 'rgba(255,255,255,0.8)' }}>Subscription</span>
                    <span className="text-[8px] font-black uppercase tracking-[0.1em] opacity-60" style={{ color: activeMenu === 'subscription' ? theme.textOnPrimary : 'rgba(255,255,255,0.6)' }}>Plans & Billing</span>
                  </div>
                </button>
              </li>
            </>
          )} */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
