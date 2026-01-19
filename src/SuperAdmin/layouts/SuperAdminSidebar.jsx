import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext.jsx';
import {
  FiGrid, FiLayers, FiUserCheck, FiTool, FiShoppingCart, FiUsers,
  FiPackage, FiDollarSign, FiClipboard, FiCheckCircle, FiShield,
  FiFileText, FiBarChart2, FiHome, FiSettings
} from 'react-icons/fi';

const Sidebar = ({ isOpen, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const [activeMenu, setActiveMenu] = useState(location.pathname.split('/')[1] || 'dashboard');

  const categories = [
    {
      title: 'Construction Management',
      items: [
        { id: 'dashboard', name: 'Dashboard', icon: <FiGrid />, path: '/dashboard' },
        { id: 'companies', name: 'Register Enterprise', icon: <FiHome />, path: '/companies' },
        { id: 'projects', name: 'Projects', icon: <FiLayers />, path: '/projects' },
        { id: 'workforce', name: 'Register Worker', icon: <FiUsers />, path: '/workforce' },
        { id: 'finance', name: 'Finance', icon: <FiDollarSign />, path: '/finance-global' },
        { id: 'dailysite', name: 'Daily Logs', icon: <FiClipboard />, path: '/daily-reports' },
        { id: 'plans-billing', name: 'Plans & Billing', icon: <FiDollarSign />, path: '/plans-billing' },
        { id: 'yield-analytics', name: 'Yield Analytics', icon: <FiBarChart2 />, path: '/yield-analytics' },
        { id: 'modules', name: 'Modules', icon: <FiLayers />, path: '/modules' },
        { id: 'system-config', name: 'System Config', icon: <FiSettings />, path: '/system-config' },
        { id: 'reports', name: 'Reports', icon: <FiBarChart2 />, path: '/reports' }
      ]
    },
    {
      title: 'Architectural Design',
      items: []
    },
    {
      title: 'Interior Design',
      items: []
    }
  ];

  const handleMenuClick = (menuId, path) => {
    setActiveMenu(menuId);
    navigate(path);
    if (onNavigate) onNavigate();
  };

  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-72 transform transition-all duration-500 ease-in-out z-40 border-r ${isOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'
      } lg:translate-x-0`} style={{ background: theme.gradients.sidebar, borderColor: theme.cardBorder }}>
      <nav className="p-6 h-full overflow-y-auto no-scrollbar pb-24">
        <ul className="space-y-8">
          {categories.map((category) => (
            <li key={category.title} className="space-y-3">
              <div className="px-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>
                  {category.title}
                </p>
              </div>
              <ul className="space-y-1.5">
                {category.items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleMenuClick(item.id, item.path)}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-2xl transition-all duration-300 group ${activeMenu === item.id
                        ? 'shadow-lg'
                        : ''
                        }`}
                      style={{
                        background: activeMenu === item.id ? theme.gradients.button : 'transparent',
                        color: activeMenu === item.id ? theme.textOnPrimary : theme.textSecondary
                      }}
                      onMouseOver={(e) => { if (activeMenu !== item.id) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; }}
                      onMouseOut={(e) => { if (activeMenu !== item.id) e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      <div className={`mr-3 p-2 rounded-xl transition-all duration-300`}
                        style={{ backgroundColor: activeMenu === item.id ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)' }}>
                        {item.icon}
                      </div>
                      <span className={`font-bold transition-all duration-300 ${activeMenu === item.id ? 'translate-x-1' : ''}`}>
                        {item.name}
                      </span>
                      {activeMenu === item.id && (
                        <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
