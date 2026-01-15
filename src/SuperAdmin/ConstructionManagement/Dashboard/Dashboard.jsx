import React from 'react';
import { FiBriefcase, FiUsers, FiDollarSign, FiActivity, FiHome, FiDatabase, FiShield } from 'react-icons/fi';

const StatCard = ({ title, value, subtext, icon, color }) => (
    <div className="card-premium p-6 group hover:translate-y-[-2px] transition-all duration-300">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] mb-2">{title}</p>
                <h3 className="text-3xl font-black text-gray-900 tracking-tight">{value}</h3>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform ${color}`}>
                {icon}
            </div>
        </div>
        {subtext && (
            <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-50 text-green-600 text-[10px] font-black">↑</span>
                    <span className="text-[11px] font-black text-green-600">12%</span>
                </div>
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-tight">{subtext}</span>
            </div>
        )}
    </div>
);

const SuperAdminDashboard = () => {
    // Mock data for dashboard
    const stats = [
        { title: 'Global Companies', value: '42', icon: <FiBriefcase />, color: 'bg-brand-50 text-brand-600', subtext: 'Growth metrics' },
        { title: 'Registered Users', value: '1,234', icon: <FiUsers />, color: 'bg-brand-50 text-brand-600', subtext: 'Active sessions' },
        { title: 'Annual Revenue', value: '₹4.5 Cr', icon: <FiDollarSign />, color: 'bg-green-50 text-green-600', subtext: 'Projected net' },
        { title: 'Core Uptime', value: '99.9%', icon: <FiActivity />, color: 'bg-purple-50 text-purple-600', subtext: 'Global health' },
    ];

    return (
        <div className="space-y-8 pb-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Cloud Command</h1>
                    <p className="text-sm font-bold text-gray-700 mt-1">Global System Intelligence & Oversight</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-5 py-2.5 rounded-xl bg-white border border-brand-100 text-brand-600 text-[11px] font-black uppercase tracking-widest hover:bg-brand-50 shadow-sm transition-all">Export Stats</button>
                    <button className="px-5 py-2.5 rounded-xl bg-brand-600 text-white text-[11px] font-black uppercase tracking-widest hover:bg-brand-700 shadow-premium transition-all">System Audit</button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Recent Activity & System Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card-premium overflow-hidden">
                    <div className="p-8 border-b border-brand-50 bg-brand-50/30">
                        <h2 className="text-xl font-black text-gray-900">Platform Activity</h2>
                    </div>
                    <div className="p-8 space-y-6">
                        {[
                            { text: 'New enterprise registration: "SkyHigh Towers"', time: '2 hours ago', icon: <FiHome className="text-brand-600" /> },
                            { text: 'System backup completed successfully', time: '4 hours ago', icon: <FiDatabase className="text-blue-600" /> },
                            { text: 'Security patch v2.4.1 deployed globally', time: '6 hours ago', icon: <FiShield className="text-purple-600" /> },
                        ].map((activity, i) => (
                            <div key={i} className="group flex items-start gap-4 p-4 bg-brand-50/20 rounded-2xl border border-brand-50/50 hover:bg-brand-50/50 transition-all cursor-default">
                                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                                    {activity.icon}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-900 leading-snug">{activity.text}</p>
                                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card-premium overflow-hidden">
                    <div className="p-8 border-b border-brand-50 bg-brand-50/30">
                        <h2 className="text-xl font-black text-gray-900">Environment Integrity</h2>
                    </div>
                    <div className="p-8 space-y-4">
                        {[
                            { name: 'Primary Database Cluster', status: 'Operational', color: 'text-green-600', bg: 'bg-green-50' },
                            { name: 'Identity & Access Manager', status: 'Operational', color: 'text-green-600', bg: 'bg-green-50' },
                            { name: 'Compute Nodes (Region A)', status: 'Operational', color: 'text-green-600', bg: 'bg-green-50' },
                            { name: 'Payment Flow Gateway', status: 'Operational', color: 'text-green-600', bg: 'bg-green-50' },
                        ].map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-4 rounded-2xl border border-gray-50/50 group hover:bg-gray-50/50 transition-all">
                                <span className="text-sm font-bold text-gray-900">{item.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${item.color} ${item.bg} px-3 py-1.5 rounded-xl border border-current border-opacity-20`}>
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SuperAdminDashboard;
