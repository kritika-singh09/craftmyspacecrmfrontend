import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useSubscription } from '../../hooks/useSubscription';
import { useTheme } from '../../context/ThemeContext.jsx';
import ThemeSelector from '../../components/ThemeSelector';
import { FiUser, FiMail, FiShield, FiCreditCard, FiCheckCircle, FiLock, FiCalendar, FiSmartphone } from 'react-icons/fi';
import { MdHome, MdArchitecture } from 'react-icons/md';
import { GiHammerNails } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user } = useAuth();
    const { subscription, isModuleLocked } = useSubscription();
    const { theme } = useTheme();
    const navigate = useNavigate();

    const modules = [
        { id: 'Interior', name: 'Interior Design', icon: <MdHome className="text-2xl" />, color: 'orange' },
        { id: 'Architecture', name: 'Architectural Design', icon: <MdArchitecture className="text-2xl" />, color: 'emerald' },
        { id: 'Construction', name: 'Construction Management', icon: <GiHammerNails className="text-2xl" />, color: 'blue' }
    ];

    return (
        <div className="space-y-10 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-extrabold tracking-tight leading-none" style={{ color: theme.textPrimary }}>
                        User <span style={{ color: theme.textSecondary }}>Profile</span>
                    </h2>
                    <p className="mt-2 font-medium tracking-wide" style={{ color: theme.textMuted }}>Manage your personal information and branding settings.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Profile Info Card */}
                <div className="lg:col-span-1 space-y-8">
                    <ThemeSelector />

                    <div className="card-premium p-8 bg-white border-none shadow-soft relative overflow-hidden flex flex-col items-center text-center">
                        <div className="absolute top-0 left-0 w-full h-24" style={{ background: theme.gradients.primary }}></div>
                        <div className="relative z-10 mt-6">
                            <div className="w-24 h-24 rounded-full bg-white p-1 shadow-xl mb-4" style={{ ringColor: `${theme.iconBg}33` }}>
                                <div className="w-full h-full rounded-full flex items-center justify-center text-3xl font-black" style={{ background: `${theme.iconBg}15`, color: theme.textPrimary }}>
                                    {user?.name?.charAt(0) || 'U'}
                                </div>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{user?.name || 'User Name'}</h3>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] mt-1" style={{ color: theme.textSecondary }}>{user?.role?.replace('_', ' ') || 'PROJECT MANAGER'}</p>
                        </div>

                        <div className="w-full mt-10 space-y-4 text-left">
                            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <FiMail style={{ color: theme.textMuted }} />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-widest leading-none mb-1" style={{ color: theme.textMuted }}>Email Address</span>
                                    <span className="text-sm font-bold" style={{ color: theme.textPrimary }}>{user?.email || 'user@example.com'}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <FiShield style={{ color: theme.textMuted }} />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-widest leading-none mb-1" style={{ color: theme.textMuted }}>Account Role</span>
                                    <span className="text-sm font-bold" style={{ color: theme.textPrimary }}>{user?.role || 'PROJECT_MANAGER'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-premium p-6 text-white border-none shadow-brand overflow-hidden relative" style={{ background: theme.gradients.sidebar }}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -mr-16 -mt-16"></div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/70 mb-4">Security Status</h4>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                            <span className="text-sm font-bold text-white/90 tracking-tight">Two-Factor Auth Enabled</span>
                        </div>
                    </div>
                </div>

                {/* Subscription & Modules */}
                <div className="lg:col-span-2 space-y-10">
                    {/* Subscription Details */}
                    <div className="card-premium p-10 bg-white border-none shadow-soft">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                            <div>
                                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Active Subscription</h3>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Plan details and billing status</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest border border-slate-200">
                                    {subscription.plan} Plan
                                </span>
                                <button
                                    onClick={() => navigate('/subscription')}
                                    className="px-4 py-2 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-transform"
                                    style={{ background: theme.gradients.button }}
                                >
                                    Upgrade
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                                <div className="flex items-center gap-4 mb-3">
                                    <FiCalendar className="text-blue-500" />
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Renews On</span>
                                </div>
                                <p className="text-lg font-black text-slate-800 tracking-tight">{new Date(subscription.expiresAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                            </div>
                            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                                <div className="flex items-center gap-4 mb-3">
                                    <FiCreditCard className="text-emerald-500" />
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Billing Method</span>
                                </div>
                                <p className="text-lg font-black text-slate-800 tracking-tight">Razorpay • Auto</p>
                            </div>
                            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                                <div className="flex items-center gap-4 mb-3">
                                    <FiShield style={{ color: theme.textPrimary }} />
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Support Level</span>
                                </div>
                                <p className="text-lg font-black text-slate-800 tracking-tight">Priority 24/7</p>
                            </div>
                        </div>
                    </div>

                    {/* Module Access Visualization */}
                    <div className="card-premium p-10 bg-white border-none shadow-soft">
                        <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-8">Platform Modules Access</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {modules.map((mod) => {
                                const isLocked = isModuleLocked(mod.id);
                                return (
                                    <div
                                        key={mod.id}
                                        onClick={() => navigate('/subscription')}
                                        className={`group relative p-6 rounded-3xl border transition-all duration-500 cursor-pointer hover:shadow-xl hover:-translate-y-1 ${isLocked ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-100'}`}
                                        style={!isLocked ? { borderLeft: `4px solid ${theme.cardBorder}` } : {}}
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="text-2xl">{mod.icon}</div>
                                            {isLocked ? (
                                                <div className="p-2 bg-slate-100 rounded-xl text-slate-400">
                                                    <FiLock size={14} />
                                                </div>
                                            ) : (
                                                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                                                    <FiCheckCircle size={14} />
                                                </div>
                                            )}
                                        </div>
                                        <h4 className={`text-sm font-black mb-1 uppercase tracking-tight ${isLocked ? 'text-slate-400' : 'text-slate-800'}`}>{mod.name}</h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isLocked ? 'Locked' : 'Unlocked & Active'}</p>

                                        {isLocked && (
                                            <div className="mt-4 pt-4 border-t border-slate-200">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); navigate('/subscription'); }}
                                                    className="w-full py-2 bg-white border border-slate-200 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-900 hover:text-white transition-colors"
                                                >
                                                    View Upgrade
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
