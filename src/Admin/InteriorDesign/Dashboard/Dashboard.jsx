import React from 'react';
import { FiBox, FiActivity, FiCheckCircle, FiDollarSign, FiUsers, FiTrendingUp, FiShoppingBag, FiTruck } from 'react-icons/fi';

const IntDashboard = () => {
    const stats = [
        { label: 'Active Projects', value: '12', icon: <FiActivity />, gradient: 'from-orange-500 to-amber-600', sub: 'Home, Office & Retail' },
        { label: 'Client Approvals', value: '08', icon: <FiCheckCircle />, gradient: 'from-indigo-500 to-blue-600', sub: 'Mood boards & 3D views' },
        { label: 'Materials Pending', value: '24', icon: <FiBox />, gradient: 'from-emerald-500 to-teal-600', sub: 'Orders awaiting vendor' },
        { label: 'Upcoming Installs', value: '05', icon: <FiTruck />, gradient: 'from-rose-500 to-pink-600', sub: 'Next 7 days' },
    ];

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Interior <span className="text-blue-600">Dashboard</span>
                    </h1>
                    <p className="text-gray-500 dark:text-brand-300 mt-2 font-medium tracking-wide">
                        Comprehensive overview of design progress, material logistics, and site execution.
                    </p>
                </div>
                <div className="flex gap-4">
                    <button className="px-5 py-2.5 bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl font-bold text-sm text-gray-700 dark:text-blue-200 shadow-sm hover:shadow-md transition-all">
                        Inventory Stats
                    </button>
                    <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-sm hover:bg-blue-700 transition-all active:scale-95">
                        New Int. Project
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                    <div key={i} className="group relative overflow-hidden bg-white dark:bg-slate-800/50 p-8 rounded-[2rem] shadow-premium hover:shadow-premium-xl border border-blue-50 dark:border-blue-900/30 transition-all duration-500 hover:-translate-y-1.5">
                        <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[10px] font-semibold text-gray-500 dark:text-orange-400 uppercase tracking-[0.15em] mb-1">{stat.label}</p>
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tighter">{stat.value}</h3>
                                <p className="text-[10px] font-semibold text-brand-600 mt-2 italic">{stat.sub}</p>
                            </div>
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.label === 'Active Projects' ? 'from-blue-500 to-indigo-600' : stat.gradient} flex items-center justify-center text-white text-2xl shadow-lg shadow-blue-500/20`}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Site Execution Today */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-800/50 rounded-[2rem] shadow-premium border border-blue-50 dark:border-blue-900/30 flex flex-col p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Today's Site Execution</h4>
                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mt-1">Real-time status from site supervisors</p>
                        </div>
                        <button className="text-brand-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider hover:underline">View All Sites</button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { project: 'The Penthouse @ Hive', status: 'Carpentry WIP', progress: '65%', supervisor: 'Rajesh K.' },
                            { project: 'Modern Office Lab', status: 'False Ceiling Fin.', progress: '90%', supervisor: 'Amit S.' },
                            { project: 'Cafe Minimalist', status: 'Flooring Start', progress: '15%', supervisor: 'Sneha L.' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-6 bg-blue-50/10 dark:bg-blue-900/10 rounded-3xl border border-blue-50 dark:border-blue-800/40 hover:border-blue-300 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-xl">🛋️</div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-brand-600 transition-colors uppercase tracking-tight">{item.project}</p>
                                        <p className="text-[10px] font-semibold text-gray-500">Sup: {item.supervisor}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="px-3 py-1 bg-brand-50 text-brand-700 text-[9px] font-semibold uppercase tracking-wider rounded-lg border border-brand-100">{item.status}</span>
                                    <div className="mt-2 w-24 h-1.5 bg-gray-100 dark:bg-brand-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-600" style={{ width: item.progress }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Budget vs actual summary */}
                <div className="bg-white dark:bg-slate-800/50 rounded-[2rem] shadow-premium p-8 border border-blue-50 dark:border-blue-900/30 flex flex-col justify-center text-gray-900 dark:text-white">
                    <h4 className="text-lg font-bold tracking-tight mb-8 text-blue-900 dark:text-blue-200">Budget Analytics</h4>
                    <div className="space-y-8">
                        <div className="text-center p-6 bg-blue-50/50 dark:bg-blue-900/20 rounded-[1.5rem] border border-blue-100 dark:border-blue-800/50">
                            <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-widest mb-1">Total Budget Controlled</p>
                            <h3 className="text-2xl font-bold">₹2.4 Cr</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider opacity-60 text-blue-900 dark:text-blue-300">
                                <span>Utilized</span>
                                <span>68%</span>
                            </div>
                            <div className="h-2.5 bg-gray-100 dark:bg-slate-700/50 rounded-full overflow-hidden p-0.5">
                                <div className="h-full bg-blue-600 rounded-full shadow-sm" style={{ width: '68%' }}></div>
                            </div>
                            <p className="text-[10px] font-medium text-gray-400 text-center">Remaining Balance: <span className="text-emerald-500 font-bold">₹76.8 L</span></p>
                        </div>
                        <button className="w-full py-3.5 bg-blue-600 dark:bg-blue-700 text-white rounded-xl font-bold text-[10px] uppercase tracking-wider hover:bg-blue-700 transition-all">Download Audit</button>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Procurement & Vendors */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="flex items-center gap-8 relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-3xl shadow-lg shadow-black/20">🏗️</div>
                        <div>
                            <h4 className="text-xl font-bold uppercase tracking-tight text-blue-100">Procurement Status</h4>
                            <p className="text-blue-200 text-sm opacity-80 mt-1">Material delivery timeline for next 15 days.</p>
                        </div>
                    </div>
                    <div className="mt-8 grid grid-cols-3 gap-4 relative z-10">
                        {[
                            { label: 'In Transit', val: '14' },
                            { label: 'Awaiting BOQ', val: '03' },
                            { label: 'Delivered', val: '42' },
                        ].map((proc, i) => (
                            <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                                <p className="text-2xl font-bold">{proc.val}</p>
                                <p className="text-[9px] font-semibold uppercase tracking-wider text-blue-300 mt-1">{proc.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800/50 rounded-[2.5rem] border border-blue-50 dark:border-blue-900/30 p-10 flex flex-col justify-between items-start shadow-premium">
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-tight">Preferred Vendor Load</h4>
                        <p className="text-xs font-semibold text-blue-600/60 dark:text-blue-400 mt-1 uppercase tracking-wider">Active Vendor Engagements</p>
                    </div>
                    <div className="w-full mt-6 space-y-4">
                        {[
                            { name: 'Elite Carpenters', task: 'Penthouse Modular', load: 90 },
                            { name: 'Glow Lighting', task: 'IT Office Fixtures', load: 45 },
                        ].map((v, i) => (
                            <div key={i} className="flex justify-between items-center text-gray-700 dark:text-white group">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-150 transition-transform"></div>
                                    <span className="text-xs font-bold uppercase tracking-tight">{v.name}</span>
                                </div>
                                <span className="text-[10px] font-medium opacity-60 italic">{v.task}</span>
                                <span className="text-xs font-bold text-blue-600">{v.load}%</span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-8 py-3 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all">Manage Vendor Network</button>
                </div>
            </div>
        </div>
    );
};

export default IntDashboard;
