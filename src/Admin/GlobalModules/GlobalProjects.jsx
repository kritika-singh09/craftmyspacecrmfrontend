import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useProjects } from '../../hooks/useProjects';
import RoleGuard from '../../common/RoleGuard';
import { FiMapPin, FiPlus, FiLoader, FiX, FiArrowRight, FiEdit2, FiSearch, FiFilter, FiEye, FiClock, FiActivity, FiTag, FiLayers, FiLock, FiCheckCircle, FiChevronRight, FiBriefcase, FiZap } from 'react-icons/fi';
import { MdArchitecture, MdHome } from 'react-icons/md';
import { GiHammerNails } from 'react-icons/gi';
import ProjectForm from '../Projects/ProjectForm';
import { useSubscription } from '../../hooks/useSubscription';
import Loader from '../../common/Loader';
import CheckoutUI from '../Subscription/CheckoutUI';

const GlobalProjects = ({ contextType }) => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const { projects, loading, error, refetch } = useProjects();
    const { isModuleLocked, updatePlan, processPayment } = useSubscription();

    const [searchTerm, setSearchTerm] = useState('');
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [isViewOnly, setIsViewOnly] = useState(false);
    const [preSelectedModule, setPreSelectedModule] = useState(null);
    const [filterStatus, setFilterStatus] = useState('All');
    const [showLanding, setShowLanding] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [pendingModule, setPendingModule] = useState(null);

    // Context detection: universal, construction, architecture, interior
    const activeContext = contextType || (
        location.pathname === '/projects' ? 'universal' :
            location.pathname.includes('arch') ? 'architecture' :
                location.pathname.includes('int') ? 'interior' :
                    'construction'
    );

    const config = {
        universal: {
            title: 'Global Portfolio',
            subtitle: 'Managed Enterprise Assets & Performance',
            icon: '🌐',
            primaryColor: theme.primary,
            themeGradient: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)'
        },
        construction: {
            title: 'Construction Portfolio',
            subtitle: 'Engineering & Infrastructure Management',
            icon: '🏗️',
            primaryColor: theme.primary,
            themeGradient: theme.gradients?.primary || 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
        },
        architecture: {
            themeColor: '#8b5cf6',
            title: 'Design Studio',
            subtitle: 'Architectural Planning & Visualizations',
            icon: '📐',
            primaryColor: '#8b5cf6', // Purple for Arch
            themeGradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)'
        },
        interior: {
            id: 'interior',
            title: 'Interior Gallery',
            subtitle: 'Curating Space & Aesthetic Execution',
            icon: '🎨',
            color: 'orange',
            primaryColor: '#f59e0b', // Amber for Int
            themeGradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
        }
    };

    const modules = [
        { id: 'construction', title: 'Construction', icon: <MdHome />, subtitle: 'Civil & Structural', color: 'blue' },
        { id: 'architecture', title: 'Architecture', icon: <MdArchitecture />, subtitle: 'Design & Planning', color: 'emerald' },
        { id: 'interior', title: 'Interior', icon: <FiLayers />, subtitle: 'Furniture & Decor', color: 'orange' }
    ];

    const handleUnlock = (mod) => {
        setPendingModule(mod);
        setShowPaymentModal(true);
    };

    const handleSimulatedPayment = () => {
        if (!pendingModule) return;
        // Purchase the individual module
        processPayment(true, pendingModule.title);
        setShowPaymentModal(false);
        setPendingModule(null);
    };

    const active = config[activeContext] || config.construction;

    const statusColors = {
        'Ongoing': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', dot: 'bg-emerald-500' },
        'Planning': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', dot: 'bg-blue-500' },
        'Pending': { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', dot: 'bg-amber-500' },
        'On Hold': { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100', dot: 'bg-rose-500' },
        'Completed': { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100', dot: 'bg-indigo-500' }
    };

    const handleViewDetails = (project) => {
        setEditingProject(project);
        setIsViewOnly(true);
        setShowProjectForm(true);
    };

    const filteredProjects = projects.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (p.projectCode && p.projectCode.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = filterStatus === 'All' || p.status === filterStatus;

        // Context-aware filtering
        if (activeContext === 'universal' && showLanding) return false; // Don't filter if landing is shown (it won't matter)

        const effectiveContext = (activeContext === 'universal' && pendingModule) ? pendingModule.id : activeContext;
        // Since I'm using pendingModule for payment, I should probably use a separate state for chosen view
        // Let's use internalSelectedModule
        return matchesSearch && matchesStatus && (
            pendingModule ? p.type === pendingModule.id :
                activeContext === 'universal' ? true :
                    (activeContext === 'construction' ? (!p.type || p.type === 'construction') : p.type === activeContext)
        );
    });

    // Better filtering logic
    const [viewModule, setViewModule] = useState(null); // 'construction', 'architecture', 'interior'

    const finalProjects = projects.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (p.projectCode && p.projectCode.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = filterStatus === 'All' || p.status === filterStatus;

        let matchesModule = true;
        if (viewModule) {
            matchesModule = viewModule === 'construction' ? (!p.type || p.type === 'construction') : p.type === viewModule;
        } else if (activeContext !== 'universal') {
            matchesModule = activeContext === 'construction' ? (!p.type || p.type === 'construction') : p.type === activeContext;
        }

        return matchesSearch && matchesStatus && matchesModule;
    });

    if (loading) return <Loader fullScreen message="Syncing Enterprise Portfolio..." />;

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            {/* Landing Page or Module Header */}
            {activeContext === 'universal' && showLanding ? (
                <div className="space-y-12">
                    <div className="bg-white dark:bg-slate-900/40 p-12 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-premium flex flex-col items-center text-center space-y-6">
                        <div className="w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center text-5xl shadow-2xl ring-8 ring-slate-50 dark:ring-slate-800/50">
                            🌐
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white uppercase transition-all">
                                Global <span className="text-brand-600">Portfolio</span>
                            </h1>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em]">Managed Enterprise Assets & Performance</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {modules.map((mod, midx) => {
                            const isLocked = isModuleLocked(mod.title);
                            return (
                                <div key={mod.id} className="group relative card-premium p-10 overflow-hidden border-none ring-1 ring-slate-200/50 dark:ring-slate-800/50 h-full flex flex-col justify-between">
                                    <div className={`absolute -right-16 -top-16 w-48 h-48 bg-${mod.color}-50 dark:bg-${mod.color}-900/10 rounded-full blur-3xl opacity-50`}></div>

                                    <div className={`relative z-10 space-y-10 transition-all duration-500 ${isLocked ? 'blur-sm select-none opacity-60 pointer-events-none' : ''}`}>
                                        <div className="flex items-center gap-5">
                                            <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-white text-3xl shadow-2xl transition-transform duration-500 group-hover:scale-110`}
                                                style={{ backgroundColor: mod.id === 'construction' ? '#3b82f6' : mod.id === 'architecture' ? '#10b981' : '#f59e0b' }}>
                                                {mod.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{mod.title}</h3>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{mod.subtitle}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-4 pt-4">
                                            <button
                                                onClick={() => { setViewModule(mod.id); setShowLanding(false); }}
                                                className={`w-full py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] border border-slate-100 dark:border-slate-700 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-3`}
                                            >
                                                <FiBriefcase size={18} style={{ color: mod.id === 'construction' ? '#3b82f6' : mod.id === 'architecture' ? '#10b981' : '#f59e0b' }} /> Explore Portfolio
                                            </button>
                                            <button
                                                onClick={() => { setShowProjectForm(true); setEditingProject(null); setIsViewOnly(false); setPreSelectedModule(mod.id); }}
                                                className={`w-full py-5 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3`}
                                                style={{ backgroundColor: mod.id === 'construction' ? '#3b82f6' : mod.id === 'architecture' ? '#10b981' : '#f59e0b' }}
                                            >
                                                <FiZap size={18} /> Add Project
                                            </button>
                                        </div>
                                    </div>

                                    {isLocked && (
                                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center bg-white/20 dark:bg-slate-900/20 backdrop-blur-[2px] rounded-[2.5rem]">
                                            <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 shadow-2xl mb-4 border border-slate-100 dark:border-slate-700">
                                                <FiLock size={24} />
                                            </div>
                                            <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-1">Module Locked</h4>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-6">Upgrade to {mod.id === 'construction' ? 'Pro' : 'Basic'} Plan</p>

                                            <button
                                                onClick={() => handleUnlock(mod)}
                                                className={`w-full py-4 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2`}
                                                style={{ backgroundColor: mod.id === 'construction' ? '#3b82f6' : mod.id === 'architecture' ? '#10b981' : '#f59e0b' }}
                                            >
                                                Unlock {mod.title}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <>
                    {/* Superior Header */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-white dark:bg-slate-900/40 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-premium">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-2xl relative overflow-hidden" style={{ background: viewModule ? config[viewModule].themeGradient : active.themeGradient }}>
                                <div className="absolute inset-0 bg-white/10 opacity-50"></div>
                                <span className="relative z-10">{viewModule ? config[viewModule].icon : active.icon}</span>
                            </div>
                            <div>
                                <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                                    {viewModule ? config[viewModule].title : active.title} <span className="text-slate-300 dark:text-slate-700 ml-2">[{finalProjects.length}]</span>
                                </h1>
                                <p className="text-sm font-bold mt-1 text-slate-500 uppercase tracking-widest dark:text-slate-400">{viewModule ? config[viewModule].subtitle : active.subtitle}</p>
                            </div>
                        </div>
                        <RoleGuard requiredRole="manager">
                            <button
                                onClick={() => { setEditingProject(null); setIsViewOnly(false); setShowProjectForm(true); }}
                                className="group flex items-center gap-4 px-10 py-5 rounded-2xl text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all hover:-translate-y-1 hover:shadow-brand-600/40 active:scale-95"
                                style={{ background: viewModule ? config[viewModule].themeGradient : active.themeGradient }}
                            >
                                <FiPlus className="text-xl transition-transform group-hover:rotate-90" />
                                Create Global Entry
                            </button>
                        </RoleGuard>
                    </div>

                    {/* Utility Bar */}
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="relative flex-1">
                            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-xl text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by name, code or location..."
                                className="w-full h-16 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl pl-16 pr-6 text-sm font-bold text-slate-700 dark:text-white shadow-premium focus:ring-4 focus:ring-brand-500/10 transition-all outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-4">
                            <select
                                className="h-16 px-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 shadow-premium outline-none appearance-none cursor-pointer hover:bg-slate-50 transition-all"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                {['All', 'Planning', 'Ongoing', 'Pending', 'On Hold', 'Completed'].map(s => (
                                    <option key={s} value={s}>{s} Status</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Project Cards - Mobile/Tablet View */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-8">
                        {finalProjects.map((prj) => {
                            const status = statusColors[prj.status] || statusColors['Ongoing'];
                            const themeColor = prj.type === 'architecture' ? '#8b5cf6' : prj.type === 'interior' ? '#f59e0b' : theme.primary;
                            const prjGradient = prj.type === 'architecture' ? 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' :
                                prj.type === 'interior' ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' :
                                    theme.gradients?.primary || 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';

                            return (
                                <div
                                    key={prj._id}
                                    className="group relative bg-white dark:bg-slate-900/50 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-premium overflow-hidden transition-all duration-500 hover:shadow-2xl"
                                >
                                    {/* Accent Bar */}
                                    <div className="absolute top-0 left-0 w-2 h-full transition-all duration-500 group-hover:w-3" style={{ background: prjGradient }}></div>

                                    <div className="p-8 space-y-7">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{prj.projectCode || 'GLOBAL-ENT'}</span>
                                                    <span className={`w-2 h-2 rounded-full ${status.dot} animate-pulse`}></span>
                                                    <span className="px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest text-white"
                                                        style={{ backgroundColor: themeColor }}>
                                                        {prj.type || 'construction'}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-tight transition-colors group-hover:text-brand-600">
                                                    {prj.name}
                                                </h3>
                                                <p className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                                                    <FiMapPin className="text-brand-600" /> {prj.location}
                                                </p>
                                            </div>
                                            <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border shadow-sm ${status.bg} ${status.text} ${status.border}`}>
                                                {prj.status}
                                            </span>
                                        </div>

                                        {/* Stats Bar */}
                                        <div className="grid grid-cols-3 gap-4 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                            <div className="space-y-0.5">
                                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Health</p>
                                                <p className="text-sm font-black text-slate-800 dark:text-white">Optimum</p>
                                            </div>
                                            <div className="space-y-0.5">
                                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Value</p>
                                                <p className="text-sm font-black text-slate-800 dark:text-white">₹{(prj.budget / 100000).toFixed(1)}L</p>
                                            </div>
                                            <div className="space-y-0.5">
                                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Output</p>
                                                <p className="text-sm font-black text-slate-800 dark:text-white">{prj.progress}%</p>
                                            </div>
                                        </div>

                                        {/* Progress Visual */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-end">
                                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Global Progress Index</span>
                                                <span className="text-xs font-black text-slate-900 dark:text-white">{prj.progress}%</span>
                                            </div>
                                            <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full rounded-full transition-all duration-1000 relative"
                                                    style={{ width: `${prj.progress}%`, background: prjGradient }}
                                                >
                                                    <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 text-xs">
                                                    {prj.type === 'architecture' ? <MdArchitecture size={16} /> : prj.type === 'interior' ? <MdHome size={16} /> : <GiHammerNails size={16} />}
                                                </div>
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                    <FiClock /> Dec 20, 2024
                                                </span>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleViewDetails(prj)}
                                                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 shadow-sm hover:bg-slate-50 transition-all hover:text-brand-600 active:scale-90"
                                                >
                                                    <FiEye size={18} />
                                                </button>
                                                <RoleGuard requiredRole="manager">
                                                    <button
                                                        onClick={() => { setEditingProject(prj); setIsViewOnly(false); setShowProjectForm(true); }}
                                                        className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg transition-all hover:-translate-y-1 active:scale-90"
                                                        style={{ background: prjGradient }}
                                                    >
                                                        <FiEdit2 size={18} />
                                                    </button>
                                                </RoleGuard>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Project Table - Desktop View */}
                    <div className="hidden lg:block bg-white dark:bg-slate-900/50 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-premium overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-200 dark:border-slate-800">
                                        <th className="text-left px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Project</th>
                                        <th className="text-left px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Owner & Location</th>
                                        <th className="text-center px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Health</th>
                                        <th className="text-right px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Value</th>
                                        <th className="text-center px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress</th>
                                        <th className="text-center px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                        <th className="text-center px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                                        <th className="text-center px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {finalProjects.map((prj) => {
                                        const status = statusColors[prj.status] || statusColors['Ongoing'];
                                        const themeColor = prj.type === 'architecture' ? '#8b5cf6' : prj.type === 'interior' ? '#f59e0b' : theme.primary;
                                        const prjGradient = prj.type === 'architecture' ? 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' :
                                            prj.type === 'interior' ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' :
                                                theme.gradients?.primary || 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';

                                        return (
                                            <tr key={prj._id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group">
                                                <td className="px-6 py-5">
                                                    <div className="space-y-1.5">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">{prj.projectCode || 'GLOBAL-ENT'}</span>
                                                            <span className="px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest text-white"
                                                                style={{ backgroundColor: themeColor }}>
                                                                {prj.type || 'construction'}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm font-black text-slate-900 dark:text-white tracking-tight">{prj.name}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{prj.client?.name || 'Kritika Singh'}</p>
                                                        <p className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                                                            <FiMapPin size={12} className="text-brand-600" /> {prj.location}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <span className="inline-flex px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 text-xs font-black uppercase tracking-wider">
                                                        Optimum
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <p className="text-sm font-black text-slate-900 dark:text-white">
                                                        {prj.budget >= 100000
                                                            ? `₹${(prj.budget / 100000).toFixed(1)}L`
                                                            : `₹${Number(prj.budget || 0).toLocaleString('en-IN')}`}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center justify-between gap-3">
                                                            <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full rounded-full transition-all"
                                                                    style={{ width: `${prj.progress}%`, background: prjGradient }}
                                                                ></div>
                                                            </div>
                                                            <span className="text-xs font-black text-slate-900 dark:text-white min-w-[40px] text-right">{prj.progress}%</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <span className={`inline-flex px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider ${status.bg} ${status.text}`}>
                                                        {prj.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <span className="text-xs font-bold text-slate-500">Dec 20, 2024</span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => handleViewDetails(prj)}
                                                            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-brand-600 transition-all"
                                                            title="View Details"
                                                        >
                                                            <FiEye size={18} />
                                                        </button>
                                                        <RoleGuard requiredRole="manager">
                                                            <button
                                                                onClick={() => { setEditingProject(prj); setIsViewOnly(false); setShowProjectForm(true); }}
                                                                className="p-2.5 rounded-xl text-white shadow-lg hover:-translate-y-1 transition-all"
                                                                style={{ background: prjGradient }}
                                                                title="Edit Project"
                                                            >
                                                                <FiEdit2 size={18} />
                                                            </button>
                                                        </RoleGuard>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Zero State */}
                    {finalProjects.length === 0 && (
                        <div className="card-premium p-20 text-center flex flex-col items-center space-y-6">
                            <div className="w-24 h-24 rounded-[2rem] bg-slate-50 flex items-center justify-center text-5xl opacity-40 grayscale">🔍</div>
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 uppercase">No Matches Found</h3>
                                <p className="text-sm font-bold text-slate-500 mt-2 uppercase tracking-widest">Adjust your filters or code search to find entries.</p>
                            </div>
                            <button
                                onClick={() => { setSearchTerm(''); setFilterStatus('All'); }}
                                className="text-brand-600 font-extrabold text-xs uppercase tracking-widest border-b-2 border-brand-200 pb-1 hover:border-brand-600 transition-all"
                            >
                                Reset All Explorer Search
                            </button>
                        </div>
                    )}
                </>
            )
            }

            {/* Checkout Modal */}
            {
                showPaymentModal && pendingModule && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
                        <div className="card-premium w-full max-w-xl bg-white dark:bg-slate-900 border-none shadow-premium-2xl relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
                            <CheckoutUI
                                plan={pendingModule.title}
                                onCancel={() => { setShowPaymentModal(false); setPendingModule(null); }}
                            />
                        </div>
                    </div>
                )
            }

            {/* Global Project Form Modal */}
            {
                showProjectForm && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
                        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" onClick={() => setShowProjectForm(false)}></div>
                        <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-200/50 dark:border-slate-800 overflow-hidden">
                            <div className="p-1">
                                <ProjectForm
                                    existingProject={editingProject}
                                    initialModule={preSelectedModule}
                                    isReadOnly={isViewOnly}
                                    onClose={() => { setShowProjectForm(false); setEditingProject(null); setPreSelectedModule(null); setIsViewOnly(false); refetch(); }}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default GlobalProjects;
