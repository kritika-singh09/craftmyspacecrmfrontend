import React from 'react';
import { useTenant } from '../../hooks/useTenant.jsx';
import { tenantData } from '../../data/tenantData';
import { useNavigate } from 'react-router-dom';
import {
    FiGrid, FiBriefcase, FiTool, FiUsers,
    FiLayers, FiHome, FiActivity, FiCheckCircle,
    FiTrendingUp, FiZap, FiTruck, FiChevronRight, FiStar, FiFileText, FiLock
} from 'react-icons/fi';
import { useSubscription } from '../../hooks/useSubscription';

const GlobalDashboard = () => {
    const { currentTenant } = useTenant();
    const { isModuleLocked } = useSubscription();
    const navigate = useNavigate();
    const data = tenantData[currentTenant.id];

    const constStats = {
        active: data.projects.filter(p => p.status === 'Ongoing').length,
        workforce: data.workforce.length,
        progress: Math.round(data.projects.reduce((acc, p) => acc + p.progress, 0) / data.projects.length) || 0
    };

    const archStats = { active: 18, pending: 7, revenue: '₹42L' };
    const intStats = { active: 12, materials: 24, installs: 5 };

    const modules = [
        {
            title: 'Construction',
            subtitle: 'Management & Operations',
            icon: <FiHome />,
            path: '/dashboard',
            stats: [
                { label: 'Projects', value: constStats.active },
                { label: 'Workforce', value: constStats.workforce },
                { label: 'Avg Progress', value: `${constStats.progress}%` }
            ],
            color: 'blue',
            accent: 'text-blue-600'
        },
        {
            title: 'Architectural',
            subtitle: 'Design & Planning',
            icon: <FiLayers />,
            path: '/arch-dashboard',
            stats: [
                { label: 'Designs', value: archStats.active },
                { label: 'Approvals', value: archStats.pending },
                { label: 'Revenue', value: archStats.revenue }
            ],
            color: 'emerald',
            accent: 'text-emerald-600'
        },
        {
            title: 'Interior',
            subtitle: 'Curation & Execution',
            icon: <FiStar />,
            path: '/int-dashboard',
            stats: [
                { label: 'Ongoing', value: intStats.active },
                { label: 'Materials', value: intStats.materials },
                { label: 'Installs', value: intStats.installs }
            ],
            color: 'orange',
            accent: 'text-orange-600'
        }
    ];

    return (
        <div className="space-y-10 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">
                        Universal <span className="text-brand-600 dark:text-brand-400">Dashboard</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium tracking-wide">Consolidated overview of all architectural, interior and construction work.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Current Session</span>
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>
                    <div className="w-px h-10 bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
                    <button className="px-5 py-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-premium border border-slate-100 dark:border-slate-700 text-xs font-bold text-brand-600 dark:text-brand-300 uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                        Download Report
                    </button>
                </div>
            </div>

            {/* Module Overview Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {modules.map((module, idx) => (
                    <div key={idx} className="group relative card-premium p-8 overflow-hidden hover:-translate-y-2 transition-all duration-500 border-none ring-1 ring-slate-200/50 dark:ring-slate-700/50">
                        <div className={`absolute -right-12 -top-12 w-48 h-48 bg-${module.color}-50 dark:bg-${module.color}-900/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>

                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-10">
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-[1.25rem] bg-${module.color}-500 dark:bg-${module.color}-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-${module.color}-500/20 group-hover:scale-110 transition-transform duration-500`}>
                                        {module.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{module.title}</h3>
                                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">{module.subtitle}</p>
                                    </div>
                                </div>
                                <div className={`text-xs font-black ${module.accent} opacity-40 group-hover:opacity-100 transition-opacity`}>
                                    0{idx + 1}
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-6 mb-10">
                                {module.stats.map((stat, sIdx) => (
                                    <div key={sIdx} className="space-y-1">
                                        <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em]">{stat.label}</p>
                                        <p className="text-2xl font-black text-slate-800 dark:text-white tracking-tighter">{stat.value}</p>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => navigate(module.path)}
                                disabled={isModuleLocked(module.title)}
                                className={`w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 hover:gap-3 ${isModuleLocked(module.title)
                                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                                        : `bg-${module.color}-600 dark:bg-${module.color}-700 text-white shadow-lg shadow-${module.color}-600/20 dark:shadow-none`
                                    }`}
                            >
                                {isModuleLocked(module.title) ? 'Upgrade to Unlock' : 'Enter Module'} <FiChevronRight className="text-lg" />
                            </button>

                            {isModuleLocked(module.title) && (
                                <div className="absolute inset-0 z-20 bg-slate-50/10 dark:bg-slate-900/10 backdrop-blur-[2px] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                                    <div className="w-12 h-12 bg-white/90 dark:bg-slate-800/90 rounded-2xl flex items-center justify-center text-slate-500 shadow-xl mb-4">
                                        <FiLock size={20} />
                                    </div>
                                    <p className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 mb-4">Upgrade Required</p>
                                    <button
                                        onClick={() => navigate('/subscription')}
                                        className="px-4 py-2 bg-brand-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-brand-600/20"
                                    >
                                        View Plans
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Activity Feed */}
                <div className="card-premium p-10 bg-white dark:bg-slate-900/50 border-none ring-1 ring-slate-200/50 dark:ring-slate-800/50 shadow-soft">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Recent Activity</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Live Updates Across Modules</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-brand-600 dark:text-brand-400 border border-slate-100 dark:border-slate-700 shadow-sm">
                            <FiZap className="text-xl animate-pulse" />
                        </div>
                    </div>

                    <div className="space-y-8">
                        {[
                            { mod: 'Construction', msg: 'New project milestone reached in Shopping Mall', time: '2m ago', color: 'blue' },
                            { mod: 'Architecture', msg: 'Client feedback received for Zenith Residency', time: '15m ago', color: 'emerald' },
                            { mod: 'Interior', msg: 'Material delivery confirmed for Penthouse', time: '1h ago', color: 'orange' },
                            { mod: 'Construction', msg: 'Daily labor attendance verified', time: '3h ago', color: 'blue' }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6 group cursor-pointer">
                                <div className={`relative flex flex-col items-center`}>
                                    <div className={`w-12 h-12 rounded-2xl bg-${item.color}-50 dark:bg-${item.color}-900/20 text-${item.color}-600 dark:text-${item.color}-400 flex items-center justify-center border border-${item.color}-100 dark:border-${item.color}-800 transition-all group-hover:scale-110 shadow-sm`}>
                                        <FiActivity size={20} />
                                    </div>
                                    {i !== 3 && <div className="w-px h-10 bg-slate-100 dark:bg-slate-800 mt-2"></div>}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest bg-${item.color}-100 dark:bg-${item.color}-900/40 text-${item.color}-700 dark:text-${item.color}-300`}>{item.mod}</span>
                                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.1em]">{item.time}</span>
                                    </div>
                                    <p className="text-[15px] font-bold text-slate-700 dark:text-slate-200 mt-2 leading-relaxed group-hover:text-brand-600 transition-colors">{item.msg}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Insights Section */}
                <div className="flex flex-col gap-10">
                    <div className="flex-1 card-premium p-10 bg-gradient-to-br from-slate-900 to-brand-950 dark:from-slate-900 dark:to-slate-950 text-white border-none shadow-premium-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500 opacity-10 rounded-full blur-3xl -mr-40 -mt-40 group-hover:scale-125 transition-transform duration-1000"></div>

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-12">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-400 mb-2">Operations</p>
                                    <h3 className="text-3xl font-black tracking-tight leading-tight">Firm-wide <br />Performance</h3>
                                </div>
                                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-xl border border-white/10">
                                    <FiTrendingUp className="text-2xl text-brand-300" />
                                </div>
                            </div>

                            <div className="space-y-8 mt-auto">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Resource Efficiency</span>
                                        <span className="text-3xl font-black tracking-tighter">84.2%</span>
                                    </div>
                                    <div className="h-3 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5">
                                        <div className="h-full bg-brand-500 rounded-full w-[84%] shadow-lg shadow-brand-500/40 transition-all duration-1000"></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-5 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2">Total Managed</p>
                                        <p className="text-2xl font-black">₹4.2 Cr</p>
                                    </div>
                                    <div className="p-5 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2">Growth Rate</p>
                                        <p className="text-2xl font-black text-emerald-400">+12%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-24 card-premium flex items-center justify-between px-10 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-none ring-1 ring-slate-200 dark:ring-slate-800 cursor-pointer group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400">
                                <FiFileText size={18} />
                            </div>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest">Advanced Analytics Reports</span>
                        </div>
                        <FiChevronRight className="text-xl text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlobalDashboard;
