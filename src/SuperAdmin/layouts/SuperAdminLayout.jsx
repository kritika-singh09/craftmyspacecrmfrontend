import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../common/Header';
import Sidebar from './SuperAdminSidebar';
import { useTheme } from '../../context/ThemeContext.jsx';

const SuperAdminLayout = () => {
    const { theme } = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Helper to determine if the theme is generally dark for class-based logic
    const isDark = theme.id === 'obsidian' || theme.id === 'noblePlum' || theme.id === 'highVis' || theme.id === 'steel';

    return (
        <div className="min-h-screen pt-16 transition-all duration-500" style={{ background: theme.background }}>
            <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex">
                <Sidebar isOpen={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
                <main className={`flex-1 p-8 ml-0 lg:ml-72 transition-all duration-500 ${isDark ? 'dark' : 'bg-transparent text-gray-900'}`} style={{ color: theme.textPrimary }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default SuperAdminLayout;
