import React, { useState } from 'react';
import { FiDollarSign, FiPieChart, FiFileText, FiPlus, FiArrowUpRight, FiCreditCard, FiCheckCircle, FiClock, FiSettings, FiShield, FiZap, FiInfo } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

const Billing = () => {
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState('invoices');

    const invoices = [
        { id: 'INV-2024-001', project: 'The Zenith Residency', amount: '₹12,50,000', date: '2024-01-14', status: 'Paid', type: 'Phase 1: Concept' },
        { id: 'INV-2024-002', project: 'Blue Ocean Resort', amount: '₹8,00,000', date: '2024-01-12', status: 'Pending', type: 'Phase 2: Schematic' },
        { id: 'INV-2024-005', project: 'Urban IT Park', amount: '₹15,00,000', date: '2024-01-05', status: 'Overdue', type: 'Retainer Fee' },
    ];

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight" style={{ color: theme.textPrimary }}>FEES & <span style={{ color: theme.primary }}>BILLING</span></h1>
                    <p className="text-sm font-medium mt-2 max-w-xl opacity-70" style={{ color: theme.textSecondary }}>Manage architectural fee structures, client invoices, and payment gateway integrations.</p>
                </div>

                <div className="flex gap-4">
                    <div className="flex p-1 rounded-2xl border" style={{ backgroundColor: `${theme.iconBg}05`, borderColor: theme.cardBorder }}>
                        {['invoices', 'gateway'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'text-white' : 'opacity-60 hover:opacity-100'}`}
                                style={{
                                    background: activeTab === tab ? theme.gradients.button : 'transparent',
                                    color: activeTab === tab ? theme.textOnPrimary : theme.textPrimary
                                }}
                            >
                                {tab === 'gateway' ? 'Payment Gateway' : 'Invoices'}
                            </button>
                        ))}
                    </div>
                    {activeTab === 'invoices' && (
                        <button className="flex items-center gap-3 px-8 py-4 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all" style={{ background: theme.gradients.button }}>
                            <FiPlus className="text-lg" /> Create Invoice
                        </button>
                    )}
                </div>
            </div>

            {activeTab === 'invoices' ? (
                <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-500">
                    {/* Financial Overview Card */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { label: 'Total Fees', val: '₹4.2 Cr', icon: <FiDollarSign />, accent: theme.primary },
                            { label: 'Received', val: '₹1.8 Cr', icon: <FiCheckCircle />, accent: '#10b981' },
                            { label: 'Pending', val: '₹2.4 Cr', icon: <FiClock />, accent: '#f59e0b' },
                        ].map((stat, i) => (
                            <div key={i} className="card-premium p-8 group" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60" style={{ color: theme.textSecondary }}>{stat.label}</p>
                                        <h3 className="text-3xl font-black tracking-tighter" style={{ color: theme.textPrimary }}>{stat.val}</h3>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-sm" style={{ backgroundColor: `${stat.accent}10`, color: stat.accent }}>
                                        {stat.icon}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Invoice Table */}
                    <div className="card-premium overflow-hidden" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                        <div className="p-8 border-b flex justify-between items-center" style={{ borderColor: theme.cardBorder, backgroundColor: `${theme.iconBg}03` }}>
                            <h4 className="text-lg font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>Recent Invoices</h4>
                            <FiArrowUpRight className="cursor-pointer" style={{ color: theme.primary }} />
                        </div>
                        <table className="w-full text-left">
                            <thead>
                                <tr style={{ backgroundColor: `${theme.iconBg}08` }}>
                                    {['Invoice Number', 'Project / Phase', 'Amount', 'Date', 'Status'].map(head => (
                                        <th key={head} className="px-8 py-4 text-[9px] font-black uppercase tracking-widest" style={{ color: theme.textSecondary }}>{head}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y" style={{ divideColor: theme.cardBorder }}>
                                {invoices.map((inv) => (
                                    <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer">
                                        <td className="px-8 py-6 text-xs font-black tracking-widest" style={{ color: theme.textPrimary }}>{inv.id}</td>
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>{inv.project}</p>
                                            <p className="text-[10px] font-bold mt-0.5 italic opacity-60" style={{ color: theme.textSecondary }}>{inv.type}</p>
                                        </td>
                                        <td className="px-8 py-6 text-sm font-black" style={{ color: theme.primary }}>{inv.amount}</td>
                                        <td className="px-8 py-6 text-xs font-bold" style={{ color: theme.textSecondary }}>{inv.date}</td>
                                        <td className="px-8 py-6">
                                            <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${inv.status === 'Paid' ? 'bg-green-50 text-green-700 border-green-200' :
                                                    inv.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-red-50 text-red-700 border-red-200'
                                                }`}>
                                                {inv.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-right-4 duration-500">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="card-premium p-10" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm border" style={{ backgroundColor: theme.background, borderColor: theme.cardBorder }}>
                                    <FiZap style={{ color: theme.primary }} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black" style={{ color: theme.textPrimary }}>Payment Gateway Access</h4>
                                    <p className="text-xs font-medium opacity-60" style={{ color: theme.textSecondary }}>Configure your API credentials to accept client payments directly.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textSecondary }}>Active Gateway</label>
                                    <select className="w-full p-4 rounded-xl border font-bold text-sm focus:ring-0" style={{ backgroundColor: theme.background, borderColor: theme.cardBorder, color: theme.textPrimary }}>
                                        <option>Razorpay (India)</option>
                                        <option>Stripe (Global)</option>
                                        <option>PayPal</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textSecondary }}>Settlement Account</label>
                                    <input placeholder="HDFC Bank **** 9876" className="w-full p-4 rounded-xl border font-bold text-sm" style={{ backgroundColor: theme.background, borderColor: theme.cardBorder, color: theme.textPrimary }} />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textSecondary }}>API Key / Client ID</label>
                                    <input type="password" value="rzp_test_98yhg67Tgt" className="w-full p-4 rounded-xl border font-bold text-sm font-mono" style={{ backgroundColor: theme.background, borderColor: theme.cardBorder, color: theme.textPrimary }} />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textSecondary }}>Secret Key</label>
                                    <input type="password" value="************************" className="w-full p-4 rounded-xl border font-bold text-sm font-mono" style={{ backgroundColor: theme.background, borderColor: theme.cardBorder, color: theme.textPrimary }} />
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t flex justify-end gap-3" style={{ borderColor: theme.cardBorder }}>
                                <button className="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-70" style={{ color: theme.textPrimary }}>Test Connection</button>
                                <button className="px-8 py-3 bg-brand-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-brand" style={{ background: theme.gradients.button }}>Update Credentials</button>
                            </div>
                        </div>

                        <div className="card-premium p-8 border-l-4" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder, borderLeftColor: '#3b82f6' }}>
                            <div className="flex gap-4">
                                <FiInfo className="text-blue-500 mt-1" size={20} />
                                <div>
                                    <h5 className="font-black text-sm uppercase tracking-tight" style={{ color: theme.textPrimary }}>Webhooks for Auto-Certification</h5>
                                    <p className="text-xs font-medium mt-1 opacity-70" style={{ color: theme.textSecondary }}>
                                        Enabling webhooks will automatically update architectural milestone statuses once a client completes the payment.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="card-premium p-6" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                            <h5 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-60" style={{ color: theme.textSecondary }}>Gateway Status</h5>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-sm font-black" style={{ color: theme.textPrimary }}>Razorpay Connected</span>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between text-xs font-bold">
                                    <span style={{ color: theme.textSecondary }}>Mode</span>
                                    <span className="text-orange-500">Test Mode</span>
                                </div>
                                <div className="flex justify-between text-xs font-bold">
                                    <span style={{ color: theme.textSecondary }}>Auto-Capture</span>
                                    <span className="text-green-500">Enabled</span>
                                </div>
                            </div>
                        </div>

                        <div className="card-premium p-6 bg-slate-900 text-white border-none shadow-brand overflow-hidden relative" style={{ background: theme.gradients.sidebar }}>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-600 opacity-20 rounded-full blur-2xl -mr-16 -mt-16"></div>
                            <h4 className="text-sm font-black uppercase tracking-widest mb-4 relative z-10">Security Compliance</h4>
                            <div className="flex items-center gap-3 relative z-10">
                                <FiShield className="text-brand-400" size={24} />
                                <p className="text-[10px] font-medium leading-relaxed opacity-80">
                                    All credentials are encrypted using AES-256 before storage. We are PCI-DSS compliant.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="card-premium p-10 text-white flex justify-between items-center shadow-brand-xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', borderColor: 'transparent' }}>
                <div className="absolute top-0 right-0 w-80 h-80 bg-brand-600 opacity-20 rounded-full -mr-40 -mt-40 blur-3xl"></div>
                <div className="flex items-center gap-8 relative z-10">
                    <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center text-4xl shadow-inner border border-white/20">💳</div>
                    <div>
                        <h4 className="text-2xl font-black tracking-tight mb-2 uppercase tracking-wide">Automatic Fee Reminders</h4>
                        <p className="text-brand-100 font-medium opacity-80 max-w-sm">Enable automatic email notifications for clients when payment milestones are reached.</p>
                    </div>
                </div>
                <button className="px-8 py-4 bg-white text-brand-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-all relative z-10" style={{ color: theme.primary }}>Configure Workflow</button>
            </div>
        </div>
    );
};

export default Billing;
