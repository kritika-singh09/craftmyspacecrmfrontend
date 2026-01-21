import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { FiPhone, FiMail, FiMapPin, FiCreditCard, FiAward, FiClock, FiArrowLeft, FiPackage, FiCheckCircle, FiTrendingUp, FiAlertCircle } from 'react-icons/fi';

const VendorDetails = ({ vendor, onBack }) => {
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState('info');

    const performanceMetrics = {
        rating: 4.8,
        onTimeDelivery: 98,
        qualityPassRate: 99.2,
        costCompetitiveness: 95,
        totalOrders: 124,
        returns: 2
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all border shadow-sm hover:shadow-md"
                        style={{ borderColor: theme.cardBorder, color: theme.textSecondary, backgroundColor: theme.cardBg }}
                    >
                        <FiArrowLeft />
                    </button>
                    <div>
                        <h3 className="text-2xl font-black tracking-tight" style={{ color: theme.textPrimary }}>{vendor.name}</h3>
                        <p className="text-[10px] font-black tracking-widest uppercase opacity-60" style={{ color: theme.textSecondary }}>Enterprise Vendor ID: VEND-2024-{vendor.id || 'XX'}</p>
                    </div>
                </div>

                <div className="flex p-1 rounded-2xl border overflow-x-auto" style={{ backgroundColor: `${theme.iconBg}05`, borderColor: theme.cardBorder }}>
                    {['info', 'orders', 'performance'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 sm:px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'shadow-brand-sm' : 'opacity-60 hover:opacity-100'}`}
                            style={{
                                background: activeTab === tab ? theme.gradients.button : 'transparent',
                                color: activeTab === tab ? theme.textOnPrimary : theme.textPrimary
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* 🌍 UNIVERSAL DOMAINS BADGES */}
            <div className="flex flex-wrap gap-2 mb-6">
                {vendor.domains?.map(domain => (
                    <div key={domain} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-100 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
                        <span className="text-blue-600 dark:text-blue-400 font-black text-[10px] uppercase tracking-widest">{domain}</span>
                    </div>
                ))}
            </div>

            {activeTab === 'info' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 animate-in fade-in duration-500">
                    <div className="card-premium p-4 sm:p-6" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                        <h4 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2" style={{ color: theme.textSecondary }}>
                            <FiPhone className="text-primary" style={{ color: theme.primary }} /> Contact Information
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-transparent hover:border-slate-100 transition-all cursor-default" style={{ backgroundColor: `${theme.iconBg}05` }}>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0" style={{ backgroundColor: theme.cardBg, color: theme.primary }}>
                                    <FiPhone size={16} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-bold uppercase tracking-tight opacity-50" style={{ color: theme.textSecondary }}>Primary Phone</p>
                                    <p className="text-sm font-black" style={{ color: theme.textPrimary }}>+91 98765 00000</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-transparent hover:border-slate-100 transition-all cursor-default" style={{ backgroundColor: `${theme.iconBg}05` }}>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0" style={{ backgroundColor: theme.cardBg, color: theme.primary }}>
                                    <FiMail size={16} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-bold uppercase tracking-tight opacity-50" style={{ color: theme.textSecondary }}>Business Email</p>
                                    <p className="text-sm font-black break-all" style={{ color: theme.textPrimary }}>contact@{vendor.name.toLowerCase().replace(/ /g, '')}.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-transparent hover:border-slate-100 transition-all cursor-default" style={{ backgroundColor: `${theme.iconBg}05` }}>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0" style={{ backgroundColor: theme.cardBg, color: theme.primary }}>
                                    <FiMapPin size={16} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-bold uppercase tracking-tight opacity-50" style={{ color: theme.textSecondary }}>Registered Office</p>
                                    <p className="text-sm font-black leading-snug" style={{ color: theme.textPrimary }}>Industrial Area Phase II, Mohali, Punjab</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-premium p-4 sm:p-6" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                        <h4 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2" style={{ color: theme.textSecondary }}>
                            <FiCreditCard className="text-primary" style={{ color: theme.primary }} /> Payment & Compliance
                        </h4>
                        <div className="space-y-4">
                            <div className="p-4 sm:p-5 rounded-2xl border" style={{ borderColor: theme.cardBorder, backgroundColor: `${theme.iconBg}03` }}>
                                <p className="text-[10px] font-bold uppercase tracking-tight opacity-50" style={{ color: theme.textSecondary }}>GST Registration</p>
                                <div className="flex items-center justify-between mt-1">
                                    <p className="text-sm font-black" style={{ color: theme.textPrimary }}>{vendor.gstNumber || 'N/A'}</p>
                                    <span className="text-[9px] font-black uppercase bg-green-50 text-green-700 px-2 py-1 rounded-md border border-green-100">Verified</span>
                                </div>
                            </div>
                            <div className="p-4 sm:p-5 rounded-2xl border" style={{ borderColor: theme.cardBorder, backgroundColor: `${theme.iconBg}03` }}>
                                <p className="text-[10px] font-bold uppercase tracking-tight opacity-50" style={{ color: theme.textSecondary }}>Banking Details</p>
                                <p className="text-sm font-black mt-1" style={{ color: theme.textPrimary }}>{vendor.bankDetails?.bankName || 'N/A'} - {vendor.bankDetails?.accountNumber}</p>
                                <p className="text-[10px] font-bold tracking-widest mt-0.5" style={{ color: theme.textMuted }}>IFSC: {vendor.bankDetails?.ifscCode}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 lg:col-span-2 card-premium p-4 sm:p-6" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                        <h4 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2" style={{ color: theme.textSecondary }}>
                            <FiAward className="text-primary" style={{ color: theme.primary }} /> Scope of Work & Specializations
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {vendor.specializations?.map((spec, i) => (
                                <span key={i} className="px-3 py-1.5 rounded-lg border text-[11px] font-bold uppercase tracking-wide" style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.iconBg}05` }}>
                                    {spec}
                                </span>
                            ))}
                            {(!vendor.specializations || vendor.specializations.length === 0) && <span className="opacity-50 text-sm italic">No specific specializations listed.</span>}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'performance' && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="card-premium p-4 sm:p-6 border-l-4 border-l-yellow-400" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-600">
                                    <FiAward size={20} />
                                </div>
                                <span className="text-[10px] font-black text-yellow-600 uppercase">Top Tier</span>
                            </div>
                            <h5 className="text-3xl font-black" style={{ color: theme.textPrimary }}>{performanceMetrics.rating}</h5>
                            <p className="text-[10px] font-black uppercase tracking-widest mt-1" style={{ color: theme.textMuted }}>Weighted Rating</p>
                        </div>
                        <div className="card-premium p-4 sm:p-6 border-l-4 border-l-green-400" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                                    <FiClock size={20} />
                                </div>
                                <span className="text-[10px] font-black text-green-600 uppercase">Excellent</span>
                            </div>
                            <h5 className="text-3xl font-black" style={{ color: theme.textPrimary }}>{performanceMetrics.onTimeDelivery}%</h5>
                            <p className="text-[10px] font-black uppercase tracking-widest mt-1" style={{ color: theme.textMuted }}>On-Time Delivery</p>
                        </div>
                        <div className="card-premium p-4 sm:p-6 border-l-4 border-l-blue-400" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                    <FiCheckCircle size={20} />
                                </div>
                                <span className="text-[10px] font-black text-blue-600 uppercase">99th Percentile</span>
                            </div>
                            <h5 className="text-3xl font-black" style={{ color: theme.textPrimary }}>{performanceMetrics.qualityPassRate}%</h5>
                            <p className="text-[10px] font-black uppercase tracking-widest mt-1" style={{ color: theme.textMuted }}>Quality Pass Rate</p>
                        </div>
                        <div className="card-premium p-4 sm:p-6 border-l-4 border-l-purple-400" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                                    <FiTrendingUp size={20} />
                                </div>
                                <span className="text-[10px] font-black text-purple-600 uppercase">Sustainable</span>
                            </div>
                            <h5 className="text-3xl font-black" style={{ color: theme.textPrimary }}>{performanceMetrics.costCompetitiveness}%</h5>
                            <p className="text-[10px] font-black uppercase tracking-widest mt-1" style={{ color: theme.textMuted }}>Price Benchmark</p>
                        </div>
                    </div>

                    <div className="card-premium p-4 sm:p-6 md:p-8" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                        <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8" style={{ color: theme.textSecondary }}>Detailed Performance Scorecard</h4>
                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <div>
                                        <p className="text-xs font-black" style={{ color: theme.textPrimary }}>Fulfillment Reliability</p>
                                        <p className="text-[10px] font-bold opacity-60" style={{ color: theme.textSecondary }}>Measures consistency in delivery timelines across 124 orders.</p>
                                    </div>
                                    <span className="text-lg font-black" style={{ color: theme.primary }}>{performanceMetrics.onTimeDelivery}%</span>
                                </div>
                                <div className="h-3 w-full rounded-full overflow-hidden shadow-inner" style={{ backgroundColor: `${theme.iconBg}10` }}>
                                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${performanceMetrics.onTimeDelivery}%`, background: theme.gradients.button }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <div>
                                        <p className="text-xs font-black" style={{ color: theme.textPrimary }}>Material Quality Index</p>
                                        <p className="text-[10px] font-bold opacity-60" style={{ color: theme.textSecondary }}>Percentage of items passing site inspection upon arrival.</p>
                                    </div>
                                    <span className="text-lg font-black" style={{ color: theme.primary }}>{performanceMetrics.qualityPassRate}%</span>
                                </div>
                                <div className="h-3 w-full rounded-full overflow-hidden shadow-inner" style={{ backgroundColor: `${theme.iconBg}10` }}>
                                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${performanceMetrics.qualityPassRate}%`, background: theme.gradients.button }}></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t" style={{ borderColor: theme.cardBorder }}>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-blue-500 shadow-sm" style={{ backgroundColor: `${theme.iconBg}05` }}>
                                        <FiPackage size={22} />
                                    </div>
                                    <div>
                                        <p className="text-xl font-black" style={{ color: theme.textPrimary }}>{performanceMetrics.totalOrders}</p>
                                        <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: theme.textMuted }}>Lifecycle POs</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-red-400 shadow-sm" style={{ backgroundColor: `${theme.iconBg}05` }}>
                                        <FiAlertCircle size={22} />
                                    </div>
                                    <div>
                                        <p className="text-xl font-black" style={{ color: theme.textPrimary }}>{performanceMetrics.returns}</p>
                                        <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: theme.textMuted }}>Rejection/Returns</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'orders' && (
                <div className="card-premium p-6 sm:p-8 md:p-12 text-center animate-in fade-in duration-500" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                    <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center mx-auto mb-4 text-slate-300">
                        <FiPackage size={32} />
                    </div>
                    <h4 className="text-lg font-black" style={{ color: theme.textPrimary }}>Order History Integration</h4>
                    <p className="text-sm font-medium mt-2 max-w-sm mx-auto opacity-60" style={{ color: theme.textSecondary }}>Detailed purchase orders and recurring procurement history will be displayed here.</p>
                </div>
            )}
        </div>
    );
};

export default VendorDetails;
