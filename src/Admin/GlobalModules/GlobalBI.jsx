import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FiDollarSign, FiTrendingUp, FiPieChart, FiCreditCard, FiArrowUpRight, FiClock, FiFileText, FiPlus, FiShield, FiAlertTriangle, FiBookOpen, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import RoleGuard from '../../common/RoleGuard';

// --- GLOBAL FINANCE ---
export const GlobalFinance = () => {
    const { theme } = useTheme();
    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black uppercase tracking-tight flex items-center gap-4" style={{ color: theme.textPrimary }}>
                        <span className="w-2 h-10 rounded-full" style={{ backgroundColor: '#10b981' }}></span>
                        Financial Intelligence
                    </h2>
                    <p className="text-sm font-bold mt-1 opacity-60" style={{ color: theme.textSecondary }}>Consolidated Multi-Unit Ledgers & Profit Analysis</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-8 py-4 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all" style={{ background: theme.gradients.button }}>
                        <FiPlus className="inline mr-2" /> New Entry
                    </button>
                </div>
            </div>

            {/* Financial Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                    { label: 'Total Firm Budget', val: '₹18.5 Cr', icon: <FiDollarSign />, color: theme.primary, trend: '+12%' },
                    { label: 'Project Spend', val: '₹9.2 Cr', icon: <FiPieChart />, color: '#ef4444', trend: '-2%' },
                    { label: 'Pending Payouts', val: '₹2.1 Cr', icon: <FiClock />, color: '#f59e0b', trend: '+5%' },
                    { label: 'Net Profitability', val: '₹4.8 Cr', icon: <FiTrendingUp />, color: '#10b981', trend: '+18%' }
                ].map((m, i) => (
                    <div key={i} className="card-premium p-8 border-t-4" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder, borderTopColor: m.color }}>
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm" style={{ backgroundColor: `${m.color}10`, color: m.color }}>{m.icon}</div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${m.trend.includes('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{m.trend}</span>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40" style={{ color: theme.textSecondary }}>{m.label}</p>
                        <p className="text-3xl font-black mt-1" style={{ color: theme.textPrimary }}>{m.val}</p>
                    </div>
                ))}
            </div>

            {/* Global Ledger Card */}
            <div className="card-premium p-10 bg-slate-900 border-none shadow-premium-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px] -mr-40 -mt-40"></div>
                <div className="relative z-10 flex flex-col lg:flex-row justify-between h-full gap-12">
                    <div className="space-y-8 flex-1">
                        <div>
                            <h3 className="text-3xl font-black text-white tracking-tight leading-tight">Corporate Cash Flow <br />Health Index</h3>
                            <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">Real-time across all active projects</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-xl">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Monthly Inflow</p>
                                <p className="text-2xl font-black text-white">₹1.2 Cr</p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-xl">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Monthly Tax</p>
                                <p className="text-2xl font-black text-white">₹14.5L</p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/3 flex flex-col justify-end space-y-6">
                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Target Achievement</span>
                                <span className="text-2xl font-black text-brand-400">82%</span>
                            </div>
                            <div className="h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
                                <div className="h-full bg-brand-500 rounded-full shadow-lg shadow-brand-500/40" style={{ width: '82%' }}></div>
                            </div>
                        </div>
                        <button className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-[11px] font-black text-white uppercase tracking-widest transition-all">Download Audit Report</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- GLOBAL SAFETY ---
export const GlobalSafety = () => {
    const { theme } = useTheme();
    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black uppercase tracking-tight flex items-center gap-4" style={{ color: theme.textPrimary }}>
                        <span className="w-2 h-10 rounded-full" style={{ backgroundColor: '#ef4444' }}></span>
                        Trust & Compliance
                    </h2>
                    <p className="text-sm font-bold mt-1 opacity-60" style={{ color: theme.textSecondary }}>Zero-Harm Protocols & Site Safety Verification</p>
                </div>
                <RoleGuard requiredRole="engineer">
                    <button className="px-8 py-4 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-red-600/20 hover:scale-105 transition-all">
                        <FiAlertTriangle className="inline mr-2" /> Report Incident
                    </button>
                </RoleGuard>
            </div>

            {/* Safety Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="card-premium p-10 flex items-center gap-8 border-l-8 border-l-emerald-500" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                    <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl shadow-sm"><FiShield /></div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40" style={{ color: theme.textSecondary }}>Safe Days Worked</p>
                        <p className="text-4xl font-black" style={{ color: theme.textPrimary }}>142 <span className="text-lg opacity-40">Days</span></p>
                    </div>
                </div>
                <div className="card-premium p-10 flex items-center gap-8 border-l-8 border-l-amber-500" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                    <div className="w-16 h-16 rounded-[1.5rem] bg-amber-50 text-amber-600 flex items-center justify-center text-3xl shadow-sm"><FiAlertTriangle /></div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40" style={{ color: theme.textSecondary }}>Open Safety Alerts</p>
                        <p className="text-4xl font-black" style={{ color: theme.textPrimary }}>02 <span className="text-lg opacity-40">Active</span></p>
                    </div>
                </div>
                <div className="card-premium p-10 flex items-center gap-8 border-l-8 border-l-blue-500" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                    <div className="w-16 h-16 rounded-[1.5rem] bg-blue-50 text-blue-600 flex items-center justify-center text-3xl shadow-sm"><FiBookOpen /></div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40" style={{ color: theme.textSecondary }}>Induction Training</p>
                        <p className="text-4xl font-black" style={{ color: theme.textPrimary }}>100% <span className="text-lg opacity-40">Certified</span></p>
                    </div>
                </div>
            </div>

            {/* Protocol Checklist */}
            <div className="card-premium p-10 overflow-hidden" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                <div className="flex justify-between items-center mb-10 pb-6 border-b" style={{ borderColor: theme.cardBorder }}>
                    <h3 className="text-2xl font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>Universal Site Audit Checklist</h3>
                    <span className="px-4 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] opacity-60">Verified {new Date().toLocaleDateString()}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        'PPE Infrastructure & Compliance', 'Fire Suppression Systems Audit', 'Structural Integrity Sign-off',
                        'Chemical Storage Protocols', 'Height Safety Equipment Check', 'Emergency Evacuation Drill'
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-6 rounded-3xl border transition-all hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: `${theme.iconBg}05`, borderColor: theme.cardBorder }}>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-xl shadow-sm">✅</div>
                                <span className="text-xs font-black uppercase tracking-wide opacity-80" style={{ color: theme.textPrimary }}>{item}</span>
                            </div>
                            <FiCheckCircle className="text-emerald-500 text-xl" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- GLOBAL REPORTS ---
export const GlobalReports = () => {
    const { theme } = useTheme();
    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black uppercase tracking-tight flex items-center gap-4" style={{ color: theme.textPrimary }}>
                        <span className="w-2 h-10 rounded-full" style={{ backgroundColor: '#8b5cf6' }}></span>
                        Pulse Analytics
                    </h2>
                    <p className="text-sm font-bold mt-1 opacity-60" style={{ color: theme.textSecondary }}>Centralized Business Intelligence & Multi-Unit KPI Monitor</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all" style={{ color: theme.textSecondary }}>
                        Global Export (.PDF)
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: 'Overall Completion', val: '78.4%', target: '90%', color: '#3b82f6' },
                    { label: 'Resource Utilization', val: '92.1%', target: '85%', color: '#10b981' },
                    { label: 'Client Satisfaction', val: '4.8/5', target: '4.5', color: '#f59e0b' },
                    { label: 'Variation Index', val: '12.4%', target: '10%', color: '#ef4444' }
                ].map((kpi, i) => (
                    <div key={i} className="card-premium p-8 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                        <div className="absolute top-0 right-0 w-32 h-32 opacity-5 rounded-full blur-2xl -mr-16 -mt-16" style={{ backgroundColor: kpi.color }}></div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-4" style={{ color: theme.textSecondary }}>{kpi.label}</p>
                        <div className="flex justify-between items-end">
                            <p className="text-3xl font-black tracking-tighter" style={{ color: theme.textPrimary }}>{kpi.val}</p>
                            <span className="text-[10px] font-bold text-slate-400">Target: {kpi.target}</span>
                        </div>
                        <div className="mt-6 h-2 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full rounded-full shadow-sm" style={{ backgroundColor: kpi.color, width: kpi.val.includes('%') ? kpi.val : '96%' }}></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detailed Analytics Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 card-premium p-10 flex flex-col justify-between" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                    <div className="flex justify-between items-start mb-12">
                        <div>
                            <h3 className="text-2xl font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>Growth Velocity</h3>
                            <p className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-60" style={{ color: theme.textSecondary }}>Quarterly Revenue Distribution</p>
                        </div>
                        <div className="flex gap-2">
                            {['Q1', 'Q2', 'Q3', 'Q4'].map(q => (
                                <button key={q} className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${q === 'Q4' ? 'bg-slate-900 text-white' : 'hover:bg-slate-50'}`}>{q}</button>
                            ))}
                        </div>
                    </div>
                    <div className="h-64 flex items-end gap-1 px-4">
                        {[45, 67, 34, 89, 56, 78, 92, 45, 56, 67, 88, 76].map((h, i) => (
                            <div key={i} className="flex-1 group relative">
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 text-white text-[8px] font-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">₹{h}L</div>
                                <div className="w-full bg-brand-500/20 rounded-t-xl transition-all group-hover:bg-brand-500 cursor-pointer" style={{ height: `${h}%` }}></div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-10 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><FiTrendingUp /></div>
                            <span className="text-xs font-black uppercase tracking-widest opacity-80" style={{ color: theme.textPrimary }}>Performance up 14.5% vs Last Quarter</span>
                        </div>
                        <button className="text-[10px] font-black text-brand-600 uppercase tracking-widest hover:gap-3 transition-all flex items-center gap-2">Deep Dive <FiArrowRight /></button>
                    </div>
                </div>

                <div className="card-premium p-10 bg-gradient-to-br from-brand-600 to-indigo-700 text-white border-none shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/10 opacity-20 pointer-events-none"></div>
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-8">Unit Contribution</h3>
                    <div className="space-y-10">
                        {[
                            { label: 'Construction', val: '62%', color: 'white' },
                            { label: 'Architecture', val: '24%', color: 'indigo-200' },
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
