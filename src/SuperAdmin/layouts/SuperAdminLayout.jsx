import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../common/Header';
import Sidebar from './SuperAdminSidebar';
import { useTheme } from '../../hooks/useTheme.jsx';

const SuperAdminLayout = () => {
    const { isDarkMode } = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className={`min-h-screen pt-16 transition-all duration-500 ${isDarkMode ? 'bg-brand-gradient-dark' : 'bg-brand-gradient'}`}>
            <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex">
                <Sidebar isOpen={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
                <main className={`flex-1 p-8 ml-0 lg:ml-72 transition-all duration-500 ${isDarkMode ? 'dark' : 'bg-transparent text-gray-900'}`}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default SuperAdminLayout;
