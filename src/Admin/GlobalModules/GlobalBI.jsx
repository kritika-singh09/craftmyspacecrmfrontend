import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FiDollarSign, FiTrendingUp, FiPieChart, FiCreditCard, FiArrowUpRight, FiClock, FiFileText, FiPlus, FiShield, FiAlertTriangle, FiBookOpen, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import RoleGuard from '../../common/RoleGuard';
import Loader from '../../common/Loader';

// --- GLOBAL REPORTS ---
export const GlobalReports = () => {
    const { theme } = useTheme();

    // Hooks
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <Loader fullScreen message="Syncing Multi-Business Intelligence..." />;

    return (
        <div className="space-y-10 pb-20 animate-in fade-in duration-1000">
            {/* KPI Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Global Revenue', val: '₹14.2 Cr', trend: '+22%', icon: <FiDollarSign />, color: 'emerald' },
                    { label: 'Project Throughput', val: '84%', trend: '+8%', icon: <FiTrendingUp />, color: 'blue' },
                    { label: 'Procurement Cycle', val: '12 Days', trend: '-2 Days', icon: <FiClock />, color: 'amber' },
                    { label: 'Active Resource Util', val: '92.4%', trend: 'Optimum', icon: <FiPieChart />, color: 'indigo' }
                ].map((kpi, i) => (
                    <div key={i} className="card-premium p-8 group border-none ring-1 ring-slate-100 dark:ring-slate-800 transition-all hover:shadow-2xl" style={{ backgroundColor: theme.cardBg }}>
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-4 rounded-3xl bg-${kpi.color}-50 dark:bg-${kpi.color}-900/20 text-${kpi.color}-600 dark:text-${kpi.color}-400`}>
                                {kpi.icon}
                            </div>
                            <span className={`text-[10px] font-black px-3 py-1 rounded-full ${kpi.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                                {kpi.trend}
                            </span>
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{kpi.label}</p>
                        <h3 className="text-3xl font-black tracking-tight" style={{ color: theme.textPrimary }}>{kpi.val}</h3>
                    </div>
                ))}
            </div>

            {/* Strategic Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 p-10 rounded-[3rem] bg-slate-900 border border-slate-800 text-white shadow-premium relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-brand-500/20 transition-all duration-1000"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <h2 className="text-3xl font-black uppercase tracking-tight">Market Expansion <span className="text-brand-500">2026</span></h2>
                                <p className="text-slate-400 text-xs font-bold mt-2 uppercase tracking-widest">Global footprint & Project Concentration</p>
                            </div>
                            <button className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                                Detail View <FiArrowUpRight />
                            </button>
                        </div>
                        <div className="h-64 flex items-end gap-1 px-4">
                            {[45, 78, 56, 92, 67, 84, 95, 71, 89, 100, 82, 75].map((h, i) => (
                                <div key={i} className="flex-1 group/bar relative">
                                    <div className="w-full bg-brand-500/20 rounded-t-xl transition-all duration-700 hover:bg-brand-500" style={{ height: `${h}%` }}></div>
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-slate-900 px-3 py-1 rounded-lg text-[10px] font-black opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">{h}%</div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                            <span>Jan</span><span>Mar</span><span>Jun</span><span>Sep</span><span>Dec</span>
                        </div>
                    </div>
                </div>

                <div className="p-10 rounded-[3rem] bg-gradient-to-br from-indigo-600 to-indigo-800 text-white shadow-premium">
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-8">Utilization</h3>
                    <div className="space-y-8">
                        {[
                            { label: 'Construction', val: '62%', color: 'indigo-200' },
                            { label: 'Architecture', val: '24%', color: 'indigo-400' },
                            { label: 'Interior', val: '14%', color: 'indigo-300' }
                        ].map((u, i) => (
                            <div key={i} className="space-y-4">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                    <span>{u.label}</span>
                                    <span>{u.val}</span>
                                </div>
                                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-white opacity-80 transition-all duration-1000" style={{ width: u.val }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 pt-8 border-t border-white/20">
                        <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest leading-relaxed">Aggregated data from 18 active sites and 4 design studios globally.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlobalReports;
