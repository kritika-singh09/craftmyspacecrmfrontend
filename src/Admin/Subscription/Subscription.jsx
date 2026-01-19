import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '../../hooks/useSubscription';
import { FiArrowRight, FiLock, FiCheck } from 'react-icons/fi';
import { MdArchitecture, MdHome } from 'react-icons/md';
import { GiHammerNails } from 'react-icons/gi';
import CheckoutUI from './CheckoutUI';

const Subscription = () => {
    const navigate = useNavigate();
    const { subscription, purchaseModule, isModuleLocked } = useSubscription();
    const [showCheckout, setShowCheckout] = useState(false);
    const [selectedModule, setSelectedModule] = useState(null);
    const [selectedModules, setSelectedModules] = useState([]); // For multi-select

    const toggleModuleSelection = (moduleTitle) => {
        setSelectedModules(prev =>
            prev.includes(moduleTitle)
                ? prev.filter(m => m !== moduleTitle)
                : [...prev, moduleTitle]
        );
    };

    const modules = [
        {
            id: 'construction',
            title: 'Construction',
            subtitle: 'Management & Operations',
            icon: <GiHammerNails />,
            bg: 'blue',
            price: '999',
            stats: [
                { label: 'Projects', value: '2' },
                { label: 'Workforce', value: '54' },
                { label: 'Progress', value: '38%' }
            ],
            features: [
                'Full Construction Module',
                'Project Management',
                'Site Tracking',
                'Material Management',
                'Client Portal',
                'Quality Control',
                'Risk Management'
            ],
            number: '01'
        },
        {
            id: 'architecture',
            title: 'Architecture',
            subtitle: 'Design & Planning',
            icon: <MdArchitecture />,
            bg: 'emerald',
            price: '999',
            stats: [
                { label: 'Designs', value: '18' },
                { label: 'Approvals', value: '7' },
                { label: 'Revenue', value: '₹42L' }
            ],
            features: [
                'Architecture Module',
                'Design Phases',
                'Drawing Management',
                'Revisions Tracking',
                'Client Approvals',
                'Timeline Management',
                'Document Storage'
            ],
            number: '02'
        },
        {
            id: 'interior',
            title: 'Interior',
            subtitle: 'Curation & Execution',
            icon: <MdHome />,
            bg: 'orange',
            price: '999',
            stats: [
                { label: 'Ongoing', value: '12' },
                { label: 'Materials', value: '24' },
                { label: 'Installs', value: '5' }
            ],
            features: [
                'Interior Design Module',
                'Materials & BOQ',
                'Design Phases',
                'Drawings & 3D',
                'Site Execution',
                'Billing Management',
                'Closure & Handover'
            ],
            number: '03'
        }
    ];

    const handleUnlock = (mod) => {
        setSelectedModule(mod);
        purchaseModule(mod.title);
        setShowCheckout(true);
    };

    const colorClasses = {
        blue: 'bg-blue-600',
        emerald: 'bg-emerald-600',
        orange: 'bg-orange-600'
    };

    return (
        <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12 md:pb-20 px-4">
            {/* Header */}
            <div className="text-center space-y-3 md:space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
                    Choose Your <span className="text-brand-600">Modules</span>
                </h2>
                <p className="text-slate-500 dark:text-slate-400 font-bold tracking-widest uppercase text-[10px] md:text-xs px-4">
                    Pay only for what you need • ₹999/month per module
                </p>
            </div>

            {/* Active Modules Badge */}
            {subscription.enabledModules.length > 0 && (
                <div className="max-w-4xl mx-auto">
                    <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 dark:from-slate-800 dark:to-slate-900 border-2 border-brand-200 dark:border-brand-900">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="w-full sm:w-auto">
                                <p className="text-[10px] font-black uppercase tracking-widest text-brand-600 mb-2 text-center sm:text-left">Active Modules</p>
                                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                                    {subscription.enabledModules.map(mod => (
                                        <span key={mod} className="px-3 py-1 bg-white dark:bg-slate-800 rounded-lg text-xs font-black text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700">
                                            {mod}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="text-center sm:text-right">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Monthly Total</p>
                                <p className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
                                    ₹{subscription.enabledModules.length * 999}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showCheckout ? (
                <div className="max-w-xl mx-auto card-premium bg-white dark:bg-slate-900 border-none shadow-premium-2xl relative z-50">
                    <CheckoutUI
                        plan={selectedModule?.title}
                        onCancel={() => {
                            setShowCheckout(false);
                            setSelectedModule(null);
                        }}
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
                    {modules.map((mod) => {
                        const locked = isModuleLocked(mod.title);

                        return (
                            <div key={mod.id} className="relative group">
                                <div className={`card-premium bg-white dark:bg-slate-900 border-2 shadow-premium p-6 md:p-8 flex flex-col justify-between overflow-hidden relative transition-all ${selectedModules.includes(mod.title)
                                    ? 'border-brand-500 ring-2 ring-brand-500/20'
                                    : 'border-slate-200 dark:border-slate-800'
                                    }`}>
                                    {/* Selection Checkbox - Only for locked modules */}
                                    {locked && (
                                        <div className="absolute top-3 md:top-4 left-4 md:left-6 z-30">
                                            <button
                                                onClick={() => toggleModuleSelection(mod.title)}
                                                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${selectedModules.includes(mod.title)
                                                    ? 'bg-brand-600 border-brand-600'
                                                    : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-brand-500'
                                                    }`}
                                            >
                                                {selectedModules.includes(mod.title) && (
                                                    <FiCheck className="text-white" size={14} />
                                                )}
                                            </button>
                                        </div>
                                    )}

                                    {/* Number Watermark */}
                                    <div className={`absolute top-3 md:top-4 right-4 md:right-6 text-lg md:text-xl font-black opacity-20 text-${mod.bg}-500`}>
                                        {mod.number}
                                    </div>

                                    {/* Content Wrapper - Blur if locked */}
                                    <div className={`space-y-4 md:space-y-6 transition-all duration-500 ${locked ? 'blur-sm select-none opacity-60 pointer-events-none' : ''}`}>
                                        {/* Header */}
                                        <div className="space-y-3 md:space-y-4">
                                            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl text-white shadow-xl ${colorClasses[mod.bg]}`}>
                                                {mod.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                                    {mod.title}
                                                </h3>
                                                <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                    {mod.subtitle}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Pricing */}
                                        <div className="p-3 md:p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg md:rounded-xl border border-slate-100 dark:border-slate-800">
                                            <div className="flex items-baseline justify-center gap-1">
                                                <span className="text-base md:text-lg font-bold text-slate-400">₹</span>
                                                <span className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">{mod.price}</span>
                                            </div>
                                            <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase text-center mt-1">/month</p>
                                        </div>

                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-3 gap-3 md:gap-4">
                                            {mod.stats.map((stat, i) => (
                                                <div key={i} className="space-y-1 text-center">
                                                    <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                                        {stat.label}
                                                    </p>
                                                    <p className="text-lg md:text-xl font-black text-slate-800 dark:text-slate-200">
                                                        {stat.value}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Features */}
                                        <div className="space-y-2">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 md:mb-3">Features Included</p>
                                            {mod.features.slice(0, 5).map((feature, idx) => (
                                                <div key={idx} className="flex items-start gap-2">
                                                    <FiCheck className="text-emerald-500 mt-0.5 flex-shrink-0" size={12} />
                                                    <span className="text-[11px] md:text-xs font-medium text-slate-600 dark:text-slate-400 leading-tight">{feature}</span>
                                                </div>
                                            ))}
                                            {mod.features.length > 5 && (
                                                <p className="text-[10px] text-slate-400 italic">+{mod.features.length - 5} more features</p>
                                            )}
                                        </div>

                                        {/* Interaction Layer */}
                                        <div className="pt-6 mt-auto">
                                            {locked ? (
                                                <div className="flex flex-col items-center justify-center text-center space-y-3 md:space-y-4">
                                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 shadow-sm border border-slate-200 dark:border-slate-700">
                                                        <FiLock size={18} />
                                                    </div>
                                                    <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300">
                                                        Module Locked
                                                    </p>
                                                    <button
                                                        onClick={() => handleUnlock(mod)}
                                                        className={`w-full py-3 md:py-4 rounded-lg md:rounded-xl text-white font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all ${colorClasses[mod.bg]}`}
                                                    >
                                                        Unlock {mod.title}
                                                    </button>
                                                    <p className="text-[9px] md:text-[10px] font-bold text-slate-400">
                                                        ₹{mod.price}/month
                                                    </p>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => navigate('/projects')}
                                                    className={`w-full py-3 md:py-4 rounded-lg md:rounded-xl text-white font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all ${colorClasses[mod.bg]} flex items-center justify-center gap-2`}
                                                >
                                                    Enter Module <FiArrowRight />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Purchase Selected Modules Button */}
            {!showCheckout && selectedModules.length > 0 && (
                <div className="max-w-4xl mx-auto">
                    <div className="card-premium p-6 bg-gradient-to-br from-brand-600 to-brand-700 border-none shadow-2xl">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-white text-center sm:text-left">
                                <p className="text-sm font-bold mb-1">
                                    {selectedModules.length} Module{selectedModules.length > 1 ? 's' : ''} Selected
                                </p>
                                <p className="text-xs opacity-80">
                                    {selectedModules.join(', ')}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right text-white">
                                    <p className="text-xs opacity-80 uppercase tracking-widest font-bold">Total</p>
                                    <p className="text-3xl font-black">₹{selectedModules.length * 999}</p>
                                    <p className="text-xs opacity-80">/month</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setSelectedModule({ title: selectedModules.join(' + ') });
                                        setShowCheckout(true);
                                    }}
                                    className="px-8 py-4 bg-white text-brand-600 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                                >
                                    Purchase Now <FiArrowRight />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Flexible Pricing - Interactive Module Selection */}
            {false && (
                <div className="max-w-4xl mx-auto">
                    <div className="card-premium p-6 md:p-8 bg-white dark:bg-slate-900 border-none shadow-premium">
                        <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white mb-4 md:mb-6 uppercase tracking-tight text-center">
                            Flexible Pricing
                        </h3>

                        {/* Pricing Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 text-center mb-6 md:mb-8">
                            <div>
                                <p className="text-3xl md:text-4xl font-black text-brand-600 mb-2">₹999</p>
                                <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Per Module/Month</p>
                            </div>
                            <div>
                                <p className="text-3xl md:text-4xl font-black text-emerald-600 mb-2">₹0</p>
                                <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Setup Fee</p>
                            </div>
                            <div>
                                <p className="text-3xl md:text-4xl font-black text-purple-600 mb-2">∞</p>
                                <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Cancel Anytime</p>
                            </div>
                        </div>

                        {/* Module Selection */}
                        <div className="space-y-4 mb-6">
                            <p className="text-xs font-black uppercase tracking-widest text-slate-400 text-center mb-4">
                                Select Modules to Purchase
                            </p>

                            {/* Construction Module */}
                            <div
                                onClick={() => !subscription.enabledModules.includes('Construction') && toggleModuleSelection('Construction')}
                                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${subscription.enabledModules.includes('Construction')
                                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 cursor-not-allowed'
                                    : selectedModules.includes('Construction')
                                        ? 'bg-brand-50 dark:bg-brand-900/20 border-brand-500'
                                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-brand-400'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${subscription.enabledModules.includes('Construction')
                                            ? 'bg-emerald-500 border-emerald-500'
                                            : selectedModules.includes('Construction')
                                                ? 'bg-brand-600 border-brand-600'
                                                : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600'
                                            }`}>
                                            {(subscription.enabledModules.includes('Construction') || selectedModules.includes('Construction')) && (
                                                <FiCheck className="text-white" size={14} />
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <GiHammerNails className="text-blue-600 text-xl" />
                                            <div>
                                                <p className="font-black text-sm text-slate-900 dark:text-white">Construction Module</p>
                                                <p className="text-[10px] text-slate-500 dark:text-slate-400">Project Management & Operations</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        {subscription.enabledModules.includes('Construction') ? (
                                            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Active</span>
                                        ) : (
                                            <>
                                                <p className="text-lg font-black text-slate-900 dark:text-white">₹999</p>
                                                <p className="text-[9px] text-slate-400">/month</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Architecture Module */}
                            <div
                                onClick={() => !subscription.enabledModules.includes('Architecture') && toggleModuleSelection('Architecture')}
                                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${subscription.enabledModules.includes('Architecture')
                                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 cursor-not-allowed'
                                    : selectedModules.includes('Architecture')
                                        ? 'bg-brand-50 dark:bg-brand-900/20 border-brand-500'
                                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-brand-400'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${subscription.enabledModules.includes('Architecture')
                                            ? 'bg-emerald-500 border-emerald-500'
                                            : selectedModules.includes('Architecture')
                                                ? 'bg-brand-600 border-brand-600'
                                                : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600'
                                            }`}>
                                            {(subscription.enabledModules.includes('Architecture') || selectedModules.includes('Architecture')) && (
                                                <FiCheck className="text-white" size={14} />
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MdArchitecture className="text-emerald-600 text-xl" />
                                            <div>
                                                <p className="font-black text-sm text-slate-900 dark:text-white">Architecture Module</p>
                                                <p className="text-[10px] text-slate-500 dark:text-slate-400">Design & Planning</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        {subscription.enabledModules.includes('Architecture') ? (
                                            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Active</span>
                                        ) : (
                                            <>
                                                <p className="text-lg font-black text-slate-900 dark:text-white">₹999</p>
                                                <p className="text-[9px] text-slate-400">/month</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Interior Module */}
                            <div
                                onClick={() => !subscription.enabledModules.includes('Interior') && toggleModuleSelection('Interior')}
                                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${subscription.enabledModules.includes('Interior')
                                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 cursor-not-allowed'
                                    : selectedModules.includes('Interior')
                                        ? 'bg-brand-50 dark:bg-brand-900/20 border-brand-500'
                                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-brand-400'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${subscription.enabledModules.includes('Interior')
                                            ? 'bg-emerald-500 border-emerald-500'
                                            : selectedModules.includes('Interior')
                                                ? 'bg-brand-600 border-brand-600'
                                                : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600'
                                            }`}>
                                            {(subscription.enabledModules.includes('Interior') || selectedModules.includes('Interior')) && (
                                                <FiCheck className="text-white" size={14} />
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MdHome className="text-orange-600 text-xl" />
                                            <div>
                                                <p className="font-black text-sm text-slate-900 dark:text-white">Interior Module</p>
                                                <p className="text-[10px] text-slate-500 dark:text-slate-400">Curation & Execution</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        {subscription.enabledModules.includes('Interior') ? (
                                            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Active</span>
                                        ) : (
                                            <>
                                                <p className="text-lg font-black text-slate-900 dark:text-white">₹999</p>
                                                <p className="text-[9px] text-slate-400">/month</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total and Purchase Button */}
                        {selectedModules.length > 0 && (
                            <div className="p-4 bg-gradient-to-br from-brand-600 to-brand-700 rounded-xl">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="text-white">
                                        <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Selected Modules</p>
                                        <p className="text-sm font-black">{selectedModules.join(', ')}</p>
                                    </div>
                                    <div className="text-right text-white">
                                        <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Total</p>
                                        <p className="text-3xl font-black">₹{selectedModules.length * 999}</p>
                                        <p className="text-xs opacity-80">/month</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setSelectedModule({ title: selectedModules.join(' + ') });
                                        setShowCheckout(true);
                                    }}
                                    className="w-full py-3 bg-white text-brand-600 rounded-lg font-black text-xs uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                                >
                                    Purchase Selected Modules <FiArrowRight />
                                </button>
                            </div>
                        )}

                        {/* Info Text */}
                        <div className="mt-6 md:mt-8 p-3 md:p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                            <p className="text-[11px] md:text-xs text-center font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                                <FiCheck className="inline text-emerald-500 mr-1" />
                                Purchase modules individually or all together
                                <span className="hidden sm:inline">
                                    <FiCheck className="inline text-emerald-500 ml-3 mr-1" />
                                    Add or remove modules anytime
                                </span>
                            </p>
                            <p className="text-[11px] md:text-xs text-center font-medium text-slate-600 dark:text-slate-400 mt-2 sm:hidden">
                                <FiCheck className="inline text-emerald-500 mr-1" />
                                Add or remove modules anytime
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Subscription;
