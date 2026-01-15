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
  FiLock
} from 'react-icons/fi';
import { useSubscription } from '../../hooks/useSubscription';

const Sidebar = ({ isOpen, onNavigate }) => {
  const { subscription, isModuleLocked } = useSubscription();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [expandedSections, setExpandedSections] = useState({
    'Construction Management': true,
    'Architectural Design': false,
    'Interior Design': false
  });

  const categories = [
    {
      title: 'Construction Management',
      items: [
        { id: 'dashboard', name: 'Dashboard', icon: <FiGrid /> },
        { id: 'projects', name: 'Projects', icon: <FiBriefcase /> },
        { id: 'clients', name: 'Clients', icon: <FiUsers /> },
        { id: 'contractors', name: 'Contractors', icon: <FiUsers /> },
        { id: 'vendors', name: 'Vendors', icon: <FiShoppingCart /> },
        { id: 'workforce', name: 'Workforce', icon: <FiUserCheck /> },
        { id: 'materials', name: 'Materials', icon: <FiBox /> },
        { id: 'finance', name: 'Finance', icon: <FiPieChart /> },
        { id: 'dailysite', name: 'Daily Site', icon: <FiFileText /> },
        { id: 'quality', name: 'Quality', icon: <FiCheckCircle /> },
        { id: 'safety', name: 'Safety', icon: <FiShield /> },
        { id: 'documents', name: 'Documents', icon: <FiFolder /> },
        { id: 'reports', name: 'Reports', icon: <FiBarChart2 /> }
      ]
    },
    {
      title: 'Architectural Design',
      items: [
        { id: 'arch-dashboard', name: 'Dashboard', icon: <FiGrid /> },
        { id: 'arch-profile', name: 'Company Profile', icon: <FiInfo /> },
        { id: 'arch-users', name: 'User Management', icon: <FiUser /> },
        { id: 'arch-projects', name: 'Projects', icon: <FiBriefcase /> },
        { id: 'arch-clients', name: 'Clients', icon: <FiUsers /> },
        { id: 'design-phases', name: 'Design Phases', icon: <FiLayers /> },
        { id: 'drawings', name: 'Drawings', icon: <FiFolder /> },
        { id: 'revisions', name: 'Revisions', icon: <FiFileText /> },
        { id: 'approvals', name: 'Approvals', icon: <FiCheckCircle /> },
        { id: 'timeline', name: 'Timeline', icon: <FiFileText /> },
        { id: 'billing', name: 'Fees & Billing', icon: <FiPieChart /> },
        { id: 'arch-documents', name: 'Documents', icon: <FiFolder /> },
        { id: 'arch-reports', name: 'Reports', icon: <FiBarChart2 /> },
        { id: 'arch-settings', name: 'Settings', icon: <FiSettings /> }
      ]
    },
    {
      title: 'Interior Design',
      items: [
        { id: 'int-dashboard', name: 'Dashboard', icon: <FiGrid /> },
        { id: 'int-profile', name: 'Company Profile', icon: <FiInfo /> },
        { id: 'int-users', name: 'User Management', icon: <FiUser /> },
        { id: 'int-projects', name: 'Projects', icon: <FiBriefcase /> },
        { id: 'int-clients', name: 'Clients', icon: <FiUsers /> },
        { id: 'int-vendors', name: 'Vendors', icon: <FiShoppingBag /> },
        { id: 'int-materials', name: 'Materials & BOQ', icon: <FiBox /> },
        { id: 'int-phases', name: 'Design Phases', icon: <FiLayers /> },
        { id: 'int-design-3d', name: 'Drawings & 3D', icon: <FiImage /> },
        { id: 'int-approvals', name: 'Approvals', icon: <FiCheckCircle /> },
        { id: 'int-site-execution', name: 'Site Execution', icon: <FiTruck /> },
        { id: 'int-billing', name: 'Billing', icon: <FiPieChart /> },
        { id: 'int-documents', name: 'Documents', icon: <FiFolder /> },
        { id: 'int-closure', name: 'Closure & Handover', icon: <FiArchive /> },
        { id: 'int-reports', name: 'Reports & Stats', icon: <FiBarChart2 /> }
      ]
    }
  ];

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
    <aside className={`fixed left-0 top-16 h-full w-64 bg-slate-900 shadow-premium transform transition-transform duration-300 z-40 border-r border-white/5 ${isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
      <nav className="p-4 h-full overflow-y-auto no-scrollbar pb-24">
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => handleMenuClick('universal-dashboard')}
              className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all ${activeMenu === 'universal-dashboard'
                ? 'bg-brand-600 text-white shadow-brand-sm font-semibold'
                : 'text-slate-300 hover:bg-white/5 hover:text-white font-medium border border-white/5'
                }`}
            >
              <span className={`mr-3 text-lg transition-colors ${activeMenu === 'universal-dashboard' ? 'text-white' : 'text-slate-400 group-hover:text-blue-200'}`}>
                <FiGrid />
              </span>
              <div className="flex flex-col">
                <span className="text-sm tracking-tight">Global Overview</span>
                <span className="text-[8px] font-black uppercase tracking-[0.1em] opacity-60">Universal Dashboard</span>
              </div>
            </button>
          </li>

          <li>
            <button
              onClick={() => handleMenuClick('subscription')}
              className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all ${activeMenu === 'subscription'
                ? 'bg-brand-600 text-white shadow-brand-sm font-semibold'
                : 'text-slate-300 hover:bg-white/5 hover:text-white font-medium border border-white/5'
                }`}
            >
              <span className={`mr-3 text-lg transition-colors ${activeMenu === 'subscription' ? 'text-white' : 'text-slate-400 group-hover:text-blue-200'}`}>
                <FiCreditCard />
              </span>
              <div className="flex flex-col">
                <span className="text-sm tracking-tight">Subscription</span>
                <span className="text-[8px] font-black uppercase tracking-[0.1em] opacity-60">Plans & Billing</span>
              </div>
            </button>
          </li>

          <div className="h-px bg-white/5 my-4 mx-2"></div>

          {categories.map((category) => (
            <li key={category.title} className="space-y-1">
              <button
                disabled={isModuleLocked(category.title.split(' ')[0])}
                onClick={() => toggleSection(category.title)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all group border ${isModuleLocked(category.title.split(' ')[0])
                    ? 'bg-slate-800/50 opacity-40 cursor-not-allowed border-transparent'
                    : 'bg-white/5 hover:bg-white/10 border-white/5'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-200 group-hover:text-white transition-colors">
                    {category.title}
                  </span>
                  {isModuleLocked(category.title.split(' ')[0]) && <FiLock className="text-slate-500 text-xs" />}
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
                        className={`w-full flex items-center px-4 py-2.5 text-left rounded-xl transition-all ${activeMenu === item.id
                          ? 'bg-brand-600 text-white shadow-brand-sm font-semibold'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white font-medium'
                          }`}
                      >
                        <span className={`mr-3 text-lg transition-colors ${activeMenu === item.id ? 'text-white' : 'text-slate-400 group-hover:text-blue-200'}`}>
                          {item.icon}
                        </span>
                        <span className="text-sm tracking-tight">{item.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
