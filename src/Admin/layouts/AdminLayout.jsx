import { useState } from 'react';
import Header from '../../common/Header';
import Sidebar from './AdminSidebar';
import { useTheme } from '../../hooks/useTheme.jsx';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(`/${path}`);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className={`min-h-screen pt-16 transition-all duration-500 ${isDarkMode ? 'bg-brand-gradient-dark' : 'bg-brand-gradient'}`}>
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onNavigate={handleNavigate} />
        <main className={`flex-1 p-8 ml-0 lg:ml-72 transition-all duration-500 ${isDarkMode ? 'dark' : 'bg-transparent text-gray-900'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
