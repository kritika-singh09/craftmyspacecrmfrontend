import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useProject } from '../../hooks/useProjects';
import RoleGuard from '../../common/RoleGuard';
import {
    FiArrowLeft, FiGrid, FiUsers, FiLayers, FiFolder, FiFileText,
    FiCheckCircle, FiClock, FiDollarSign, FiShare2, FiMapPin,
    FiInfo, FiImage, FiBox, FiShoppingBag, FiTruck, FiLock,
    FiActivity, FiChevronRight, FiPlus, FiMoreVertical, FiTrendingUp
} from 'react-icons/fi';

const UnifiedProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { theme } = useTheme();
    const { project, loading, error } = useProject(id);
    const [activeTab, setActiveTab] = useState('Overview');

    // Infer project type from data or URL fallback
    const projectType = project?.type ||
        (location.pathname.includes('arch') ? 'architecture' :
            location.pathname.includes('int') ? 'interior' : 'construction');

    const typeConfigs = {
        construction: {
            themeColor: theme.primary,
            icon: '🏗️',
            label: 'Construction Management',
            tabs: [
                { name: 'Overview', icon: <FiGrid /> },
                { name: 'Scope', icon: <FiLayers /> },
                { name: 'Timeline', icon: <FiClock /> },
                { name: 'Workforce', icon: <FiUsers /> },
                { name: 'Materials', icon: <FiBox /> },
                { name: 'Safety', icon: <FiCheckCircle /> },
                { name: 'Finance', icon: <FiDollarSign /> },
                { name: 'Documents', icon: <FiFolder /> }
            ]
        },
        architecture: {
            themeColor: '#8b5cf6',
            icon: '📐',
            label: 'Architectural Design',
            tabs: [
                { name: 'Overview', icon: <FiGrid /> },
                { name: 'Design Phases', icon: <FiLayers /> },
                { name: 'Drawings', icon: <FiFolder /> },
                { name: 'Revisions', icon: <FiFileText /> },
                { name: 'Approvals', icon: <FiCheckCircle /> },
                { name: 'Team', icon: <FiUsers /> },
                { name: 'Timeline', icon: <FiClock /> },
                { name: 'Finance', icon: <FiDollarSign /> }
            ]
        },
        interior: {
            themeColor: '#f59e0b',
            icon: '🎨',
            label: 'Interior Design',
            tabs: [
                { name: 'Overview', icon: <FiGrid /> },
                { name: 'Mood Board', icon: <FiImage /> },
                { name: 'Design & 3D', icon: <FiImage /> },
                { name: 'Materials & BOQ', icon: <FiBox /> },
                { name: 'Vendors', icon: <FiShoppingBag /> },
                { name: 'Site Work', icon: <FiTruck /> },
                { name: 'Approvals', icon: <FiCheckCircle /> },
                { name: 'Finance', icon: <FiDollarSign /> },
                { name: 'Closure', icon: <FiLock /> }
            ]
        }
    };

    const config = typeConfigs[projectType] || typeConfigs.construction;

    if (loading) return (
        <div className="flex h-[60vh] flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 border-4 border-slate-200 border-t-brand-600 rounded-full animate-spin"></div>
            <p className="text-sm font-black uppercase tracking-widest text-slate-400 animate-pulse">Syncing Unified Core...</p>
        </div>
    );

    const renderOverview = () => (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-in fade-in duration-700">
            <div className="lg:col-span-2 space-y-10">
                <div className="space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-4" style={{ color: theme.textPrimary }}>
                        <span className="w-2 h-8 rounded-full" style={{ backgroundColor: config.themeColor }}></span>
                        Project Intelligence Dashboard
                    </h3>
                    <p className="font-medium leading-relaxed opacity-70" style={{ color: theme.textSecondary }}>
                        {project?.description || "High-end corporate development with integrated smart systems and sustainable architecture. This phase focuses on primary execution and structural integrity compliance."}
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { label: 'Location', value: project?.location || 'Indiranagar, Bangalore', icon: <FiMapPin /> },
                        { label: 'Client', value: project?.client || 'Skyline Ventures', icon: <FiUsers /> },
                        { label: 'Budget', value: `₹${(project?.budget / 100000).toFixed(1)}L`, icon: <FiDollarSign /> },
                        { label: 'Start Date', value: new Date(project?.start_date).toLocaleDateString(), icon: <FiClock /> },
                        { label: 'Project Type', value: config.label, icon: config.icon },
                        { label: 'Status', value: project?.status, icon: <FiActivity /> }
                    ].map((item, i) => (
                        <div key={i} className="card-premium p-6 border-none ring-1 ring-slate-100 dark:ring-slate-800" style={{ backgroundColor: theme.cardBg }}>
                            <div className="text-xl mb-3" style={{ color: config.themeColor }}>{item.icon}</div>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-40" style={{ color: theme.textSecondary }}>{item.label}</p>
                            <p className="text-sm font-black mt-1" style={{ color: theme.textPrimary }}>{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-8">
                <div className="card-premium p-8 text-white relative overflow-hidden group shadow-2xl" style={{ backgroundColor: config.themeColor }}>
                    <div className="absolute inset-0 bg-white/10 opacity-30 group-hover:scale-110 transition-transform duration-1000"></div>
                    <div className="relative z-10">
                        <h4 className="text-xl font-black uppercase tracking-tight mb-6">Aggregate Progress</h4>
                        <div className="relative w-36 h-36 mx-auto mb-6 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="72" cy="72" r="66" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/10" />
                                <circle
                                    cx="72"
                                    cy="72"
                                    r="66"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    strokeDasharray="414.69"
                                    strokeDashoffset={414.69 * (1 - project?.progress / 100)}
                                    className="text-white"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <span className="absolute text-4xl font-black">{project?.progress}%</span>
                        </div>
                        <p className="text-center text-[10px] font-black uppercase tracking-widest opacity-80">System-Verified Output</p>
                    </div>
                </div>

                <div className="card-premium p-8" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                    <h4 className="text-lg font-black uppercase tracking-tight mb-6" style={{ color: theme.textPrimary }}>Module Pulse</h4>
                    <div className="space-y-4">
                        {[
                            { label: 'Finance Health', val: 'On Track', color: 'emerald' },
                            { label: 'Timeline Risk', val: 'Low', color: 'blue' },
                            { label: 'Team Velocity', val: '80%', color: 'purple' }
                        ].map((s, i) => (
                            <div key={i} className="flex justify-between items-center bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl">
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textSecondary }}>{s.label}</span>
                                <span className={`text-[10px] font-black uppercase tracking-widest text-${s.color}-600`}>{s.val}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderFinance = () => (
        <div className="space-y-10 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: 'Total Value', val: `₹${(project?.budget / 100000).toFixed(1)}L`, color: config.themeColor },
                    { label: 'Realized Revenue', val: '₹12.5L', color: '#10b981' },
                    { label: 'Pending Payouts', val: '₹4.2L', color: '#f59e0b' }
                ].map((m, i) => (
                    <div key={i} className="card-premium p-8 border-l-4" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder, borderLeftColor: m.color }}>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40" style={{ color: theme.textSecondary }}>{m.label}</p>
                        <h3 className="text-3xl font-black tracking-tighter mt-1" style={{ color: theme.textPrimary }}>{m.val}</h3>
                    </div>
                ))}
            </div>

            <div className="card-premium overflow-hidden" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                <div className="p-8 border-b flex justify-between items-center" style={{ borderColor: theme.cardBorder }}>
                    <h4 className="text-xl font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>
                        {projectType === 'construction' ? 'RA Billing Logs' : projectType === 'architecture' ? 'Stage Fee Invoices' : 'Milestone Billing'}
                    </h4>
                    <button className="px-8 py-4 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg transition-all active:scale-95" style={{ background: theme.gradients.button }}>
                        <FiPlus className="inline mr-2" /> Raise Entry
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr style={{ backgroundColor: `${config.themeColor}05` }}>
                                {['Transaction ID', 'Description', 'Amount', 'Date', 'Status'].map(h => (
                                    <th key={h} className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-widest opacity-40" style={{ color: theme.textSecondary }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y" style={{ divideColor: theme.cardBorder }}>
                            {[1, 2].map(i => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-10 py-8 font-black text-xs" style={{ color: theme.textPrimary }}>TRS-00{i}</td>
                                    <td className="px-10 py-8 text-sm font-bold" style={{ color: theme.textSecondary }}>Advance Payment - Phase {i}</td>
                                    <td className="px-10 py-8 font-black text-lg" style={{ color: theme.textPrimary }}>₹2.5L</td>
                                    <td className="px-10 py-8 text-xs font-bold" style={{ color: theme.textSecondary }}>Oct 12, 2024</td>
                                    <td className="px-10 py-8">
                                        <span className="px-4 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest border border-emerald-100">Paid</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            {/* Contextual Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-white dark:bg-slate-900/40 p-10 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-premium">
                <div className="flex items-center gap-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-16 h-16 rounded-[2rem] bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-2xl shadow-inner hover:scale-105 transition-transform"
                        style={{ color: config.themeColor }}
                    >
                        <FiArrowLeft />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">{project?.projectCode || 'PJS-001'}</span>
                            <span className="px-4 py-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-[9px] font-black uppercase tracking-widest" style={{ color: config.themeColor }}>
                                {config.label}
                            </span>
                        </div>
                        <h1 className="text-4xl font-black tracking-tight mt-1 uppercase" style={{ color: theme.textPrimary }}>{project?.name}</h1>
                        <p className="flex items-center gap-2 text-xs font-bold mt-2 opacity-60" style={{ color: theme.textSecondary }}><FiMapPin /> {project?.location}</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-3 px-8 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:shadow-brand-600/20 transition-all border border-slate-100 dark:border-slate-700">
                        <FiShare2 /> Universal Link
                    </button>
                    <button className="flex items-center gap-3 px-10 py-5 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all hover:-translate-y-1" style={{ background: theme.gradients.button }}>
                        Export Intelligence
                    </button>
                </div>
            </div>

            {/* Dynamic Navigation Tabs */}
            <div className="flex flex-wrap gap-2 p-2.5 bg-slate-100/50 dark:bg-slate-800/30 backdrop-blur-3xl rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar shadow-inner">
                {config.tabs.map((tab) => (
                    <button
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={`flex items-center gap-4 px-8 py-5 rounded-[1.75rem] text-[10px] font-black uppercase tracking-[0.15em] transition-all whitespace-nowrap ${activeTab === tab.name
                            ? 'text-white shadow-2xl scale-105'
                            : 'opacity-40 hover:opacity-100 hover:bg-white/10 text-slate-600 dark:text-slate-400'
                            }`}
                        style={{
                            background: activeTab === tab.name ? theme.gradients.button : 'transparent',
                            boxShadow: activeTab === tab.name ? `0 20px 40px -12px ${config.themeColor}30` : 'none'
                        }}
                    >
                        <span className="text-xl">{tab.icon}</span>
                        {tab.name}
                    </button>
                ))}
            </div>

            {/* Content Core */}
            <div className="card-premium min-h-[600px] p-10 lg:p-14 animate-in slide-in-from-bottom-8 duration-700" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                {activeTab === 'Overview' ? renderOverview() :
                    activeTab === 'Finance' || activeTab === 'Billing' ? renderFinance() :
                        (
                            <div className="flex flex-col items-center justify-center h-full text-center py-20 opacity-30 grayscale">
                                <div className="w-32 h-32 rounded-[3.5rem] bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-6xl mb-10 shadow-inner">
                                    {config.icon}
                                </div>
                                <h2 className="text-3xl font-black tracking-tight mt-1 uppercase tracking-widest" style={{ color: theme.textPrimary }}>{activeTab} Module</h2>
                                <p className="max-w-md mx-auto mt-4 font-bold uppercase tracking-widest text-[10px] leading-relaxed" style={{ color: theme.textSecondary }}>
                                    The <span className="italic" style={{ color: config.themeColor }}>{activeTab}</span> intelligence layer for {config.label} is currently syncing with the unified project core.
                                </p>
                            </div>
                        )}
            </div>
        </div>
    );
};

export default UnifiedProjectDetail;
