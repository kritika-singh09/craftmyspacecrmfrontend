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

const GlobalProjects = ({ contextType }) => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const { projects, loading, error, refetch } = useProjects();
    const { isModuleLocked, updatePlan, processPayment } = useSubscription();

    const [searchTerm, setSearchTerm] = useState('');
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [preSelectedModule, setPreSelectedModule] = useState(null);
    const [filterStatus, setFilterStatus] = useState('All');
    const [showLanding, setShowLanding] = useState(true);
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
            title: 'Universal Projects',
            subtitle: 'Consolidated Cross-Unit Project Intelligence',
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
        const targetPlan = pendingModule.id === 'construction' ? 'Pro' : 'Basic';
        updatePlan(targetPlan);
        processPayment(true);
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

    const handleViewDetails = (id) => {
        const routePrefix = activeContext === 'architecture' ? '/arch-projects' : activeContext === 'interior' ? '/int-projects' : '/projects';
        navigate(`${routePrefix}/${id}`);
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

    if (loading) return (
        <div className="flex h-[60vh] flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 border-4 border-slate-200 border-t-brand-600 rounded-full animate-spin"></div>
            <p className="text-sm font-black uppercase tracking-widest text-slate-400 animate-pulse">Syncing Portfolio...</p>
        </div>
    );

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
                                <div key={mod.id} className="group relative card-premium p-10 overflow-hidden hover:-translate-y-3 transition-all duration-500 border-none ring-1 ring-slate-200/50 dark:ring-slate-800/50">
                                    <div className={`absolute -right-16 -top-16 w-48 h-48 bg-${mod.color}-50 dark:bg-${mod.color}-900/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>

                                    <div className="relative z-10 space-y-10">
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
                                            {isLocked ? (
                                                <button
                                                    onClick={() => handleUnlock(mod)}
                                                    className={`w-full py-5 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3`}
                                                    style={{ backgroundColor: mod.id === 'construction' ? '#3b82f6' : mod.id === 'architecture' ? '#10b981' : '#f59e0b' }}
                                                >
                                                    <FiLock size={18} /> Unlock Module
                                                </button>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => { setViewModule(mod.id); setShowLanding(false); }}
                                                        className={`w-full py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] border border-slate-100 dark:border-slate-700 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-3`}
                                                    >
                                                        <FiBriefcase size={18} style={{ color: mod.id === 'construction' ? '#3b82f6' : mod.id === 'architecture' ? '#10b981' : '#f59e0b' }} /> Explore Portfolio
                                                    </button>
                                                    <button
                                                        onClick={() => { setShowProjectForm(true); setEditingProject(null); setPreSelectedModule(mod.id); }}
                                                        className={`w-full py-5 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3`}
                                                        style={{ backgroundColor: mod.id === 'construction' ? '#3b82f6' : mod.id === 'architecture' ? '#10b981' : '#f59e0b' }}
                                                    >
                                                        <FiZap size={18} /> Add Project
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {isLocked && (
                                        <div className="absolute inset-0 bg-white/40 dark:bg-slate-900/40 backdrop-blur-[1px] z-20 flex flex-col items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 shadow-lg mb-2">
                                                <FiLock size={20} />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Upgrade to Activate</span>
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
                            {activeContext === 'universal' && !showLanding && (
                                <button
                                    onClick={() => setShowLanding(true)}
                                    className="ml-6 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-brand-600 transition-all"
                                >
                                    ← Back to Hub
                                </button>
                            )}
                        </div>
                        <RoleGuard requiredRole="manager">
                            <button
                                onClick={() => { setEditingProject(null); setShowProjectForm(true); }}
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

                    {/* Normal Card Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                                    onClick={() => handleViewDetails(prj._id)}
                                                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 shadow-sm hover:bg-slate-50 transition-all hover:text-brand-600 active:scale-90"
                                                >
                                                    <FiEye size={18} />
                                                </button>
                                                <RoleGuard requiredRole="manager">
                                                    <button
                                                        onClick={() => { setEditingProject(prj); setShowProjectForm(true); }}
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
            )}

            {/* Simulated Payment Modal */}
            {showPaymentModal && pendingModule && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
                    <div className="card-premium w-full max-w-lg overflow-hidden border-none shadow-2xl scale-100 animate-in zoom-in-95 duration-300"
                        style={{ backgroundColor: 'white' }}>

                        {/* Modal Header */}
                        <div className="p-8 text-center bg-gradient-to-br from-slate-900 to-slate-800 text-white relative">
                            <div className="absolute top-4 right-4 text-white/50 hover:text-white cursor-pointer" onClick={() => setShowPaymentModal(false)}>
                                <FiX size={24} />
                            </div>
                            <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-2xl shadow-black/50 bg-${pendingModule.color}-600`}>
                                <FiLock />
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight">Unlock {pendingModule.title}</h3>
                            <p className="text-sm font-medium text-white/60 mt-2">Activate enterprise features for your team</p>
                        </div>

                        {/* Modal Content */}
                        <div className="p-10 space-y-8 dark:bg-slate-900">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">Selected Module</span>
                                    <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">{pendingModule.title}</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">Upgrade Path</span>
                                    <span className={`text-sm font-black uppercase tracking-widest text-${pendingModule.color}-600`}>
                                        {pendingModule.id === 'construction' ? 'Pro Plan' : 'Basic Plan'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Amount Due</span>
                                    <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
                                        ₹{pendingModule.id === 'construction' ? '25,000' : '15,000'}
                                        <span className="text-xs font-bold text-slate-400 ml-1">/yr</span>
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={handleSimulatedPayment}
                                    className={`w-full py-5 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 bg-${pendingModule.color}-600`}
                                >
                                    <FiCheckCircle /> Confirm Payment
                                </button>
                                <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-widest">
                                    Instant Activation • Professional Billing • 24/7 Support
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Global Project Form Modal */}
            {showProjectForm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" onClick={() => setShowProjectForm(false)}></div>
                    <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-200/50 dark:border-slate-800 overflow-hidden">
                        <div className="p-1">
                            <ProjectForm
                                existingProject={editingProject}
                                initialModule={preSelectedModule}
                                onClose={() => { setShowProjectForm(false); setEditingProject(null); setPreSelectedModule(null); refetch(); }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GlobalProjects;
