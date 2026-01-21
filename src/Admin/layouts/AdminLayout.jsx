import { useState } from 'react';
import Header from '../../common/Header';
import Sidebar from './AdminSidebar';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(`/${path}`);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 transition-all duration-500" style={{ background: theme.background }}>
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex relative">
        {/* Mobile Backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <Sidebar isOpen={sidebarOpen} onNavigate={handleNavigate} />
        <main className={`flex-1 p-4 lg:p-8 ml-0 lg:ml-72 transition-all duration-500 w-full`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
