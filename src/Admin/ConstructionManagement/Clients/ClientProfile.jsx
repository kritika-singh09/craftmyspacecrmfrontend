import React, { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { FiUser, FiMail, FiPhone, FiMapPin, FiBriefcase, FiHash, FiClock, FiCheckCircle, FiArrowLeft } from 'react-icons/fi';

const ClientProfile = ({ client }) => {
    const { theme } = useTheme();
    const [showHistory, setShowHistory] = useState(false);

    if (!client) return null;

    const history = [
        { id: 1, action: "Project Initiated", date: "Jan 12, 2024", type: "system", detail: "Shopping Mall project moved to Active status." },
        { id: 2, action: "Payment Received", date: "Jan 15, 2024", type: "finance", detail: "Advance payment of ₹5,00,000 processed." },
        { id: 3, action: "Review Meeting", date: "Jan 20, 2024", type: "meeting", detail: "Architectural drawings review with technical team." },
        { id: 4, action: "Document Uploaded", date: "Jan 22, 2024", type: "doc", detail: "Structural stability report v1.2 uploaded." },
    ];

    return (
        <div className="space-y-8">
            {/* Header / Banner */}
            <div className="flex flex-col items-center justify-center -mt-8 -mx-8 pt-10 pb-8 rounded-t-[2.5rem] relative overflow-hidden" style={{ background: theme.gradients.primary }}>
                <div className="opacity-10 absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="z-10 w-24 h-24 bg-white p-2 rounded-full shadow-xl mb-4 flex items-center justify-center">
                    <span className="text-4xl font-black uppercase text-gray-800">{client.name.charAt(0)}</span>
                </div>
                <h2 className="z-10 text-3xl font-black text-white tracking-tight text-center px-4">{client.name}</h2>
                <div className="z-10 flex gap-2 mt-2">
                    <span className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest bg-white/20 text-white backdrop-blur-sm border border-white/20`}>
                        {client.status} Client
                    </span>
                </div>
            </div>

            {!showHistory ? (
                <>
                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-60 ml-1" style={{ color: theme.textMuted }}>Email Address</label>
                            <div className="flex items-center gap-3 p-4 rounded-2xl border transition-all hover:shadow-sm group" style={{ borderColor: theme.cardBorder, backgroundColor: theme.background }}>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm" style={{ backgroundColor: theme.cardBg, color: theme.iconBg }}>
                                    <FiMail />
                                </div>
                                <span className="font-bold text-sm truncate" style={{ color: theme.textPrimary }}>{client.email}</span>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-60 ml-1" style={{ color: theme.textMuted }}>Contact Number</label>
                            <div className="flex items-center gap-3 p-4 rounded-2xl border transition-all hover:shadow-sm group" style={{ borderColor: theme.cardBorder, backgroundColor: theme.background }}>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm" style={{ backgroundColor: theme.cardBg, color: theme.iconBg }}>
                                    <FiPhone />
                                </div>
                                <span className="font-bold text-sm" style={{ color: theme.textPrimary }}>{client.contact}</span>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-60 ml-1" style={{ color: theme.textMuted }}>Current Project</label>
                            <div className="flex items-center gap-3 p-4 rounded-2xl border transition-all hover:shadow-sm group" style={{ borderColor: theme.cardBorder, backgroundColor: theme.background }}>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm" style={{ backgroundColor: theme.cardBg, color: theme.iconBg }}>
                                    <FiBriefcase />
                                </div>
                                <span className="font-bold text-sm" style={{ color: theme.textPrimary }}>{client.project}</span>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-60 ml-1" style={{ color: theme.textMuted }}>GST / Tax ID</label>
                            <div className="flex items-center gap-3 p-4 rounded-2xl border transition-all hover:shadow-sm group" style={{ borderColor: theme.cardBorder, backgroundColor: theme.background }}>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm" style={{ backgroundColor: theme.cardBg, color: theme.iconBg }}>
                                    <FiHash />
                                </div>
                                <span className="font-bold text-sm" style={{ color: theme.textPrimary }}>22AAAAA0000A1Z5</span>
                            </div>
                        </div>

                        <div className="space-y-1 md:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-60 ml-1" style={{ color: theme.textMuted }}>Business Address</label>
                            <div className="flex items-start gap-3 p-4 rounded-2xl border transition-all hover:shadow-sm group" style={{ borderColor: theme.cardBorder, backgroundColor: theme.background }}>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm shrink-0" style={{ backgroundColor: theme.cardBg, color: theme.iconBg }}>
                                    <FiMapPin />
                                </div>
                                <span className="font-bold text-sm pt-2" style={{ color: theme.textPrimary }}>123, Business Park, Tech City Main Road, Sector 62, Noida, UP - 201301</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 pt-4">
                        <button className="flex-1 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl text-white" style={{ background: theme.gradients.button }}>
                            View Documents
                        </button>
                        <button
                            onClick={() => setShowHistory(true)}
                            className="px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all border-2 hover:bg-slate-50 dark:hover:bg-brand-800"
                            style={{ borderColor: theme.cardBorder, color: theme.textPrimary }}
                        >
                            History
                        </button>
                    </div>
                </>
            ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="flex justify-between items-center px-1">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: theme.textPrimary }}>Activity History</h3>
                        <button
                            onClick={() => setShowHistory(false)}
                            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all border"
                            style={{ borderColor: theme.cardBorder, color: theme.textSecondary, backgroundColor: theme.background }}
                        >
                            <FiArrowLeft /> Back to Profile
                        </button>
                    </div>

                    <div className="space-y-4">
                        {history.map((item, idx) => (
                            <div key={item.id} className="relative pl-10 group">
                                {idx !== history.length - 1 && (
                                    <div className="absolute left-[19px] top-10 bottom-0 w-px" style={{ backgroundColor: theme.cardBorder }}></div>
                                )}
                                <div className="absolute left-0 top-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg z-10 transition-all group-hover:scale-110" style={{ backgroundColor: theme.cardBg, color: theme.primary, border: `2px solid ${theme.cardBorder}` }}>
                                    {item.type === 'finance' ? '💰' : item.type === 'meeting' ? '🤝' : item.type === 'doc' ? '📄' : <FiCheckCircle />}
                                </div>
                                <div className="p-5 rounded-[1.5rem] border hover:shadow-premium-sm transition-all" style={{ borderColor: theme.cardBorder, backgroundColor: theme.background }}>
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-black text-sm uppercase tracking-tight" style={{ color: theme.textPrimary }}>{item.action}</h4>
                                        <div className="flex items-center gap-1.5 opacity-60">
                                            <FiClock className="text-[10px]" />
                                            <span className="text-[10px] font-bold" style={{ color: theme.textMuted }}>{item.date}</span>
                                        </div>
                                    </div>
                                    <p className="text-xs font-medium leading-relaxed" style={{ color: theme.textSecondary }}>{item.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientProfile;
