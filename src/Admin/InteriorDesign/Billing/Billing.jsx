import React, { useState } from 'react';
import { FiDollarSign, FiPlus, FiArrowUpRight, FiClock, FiFileText, FiCreditCard, FiZap, FiShield, FiInfo, FiX, FiCheck, FiMoreVertical } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

const IntBilling = () => {
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState('invoices');

    const [invoices, setInvoices] = useState([
        { id: 'INV-ID-01', client: 'Khanna Residences', amount: '₹12,00,000', type: 'Design & Procurement Advance', status: 'Paid', date: 'Jan 10' },
        { id: 'INV-ID-04', client: 'TechNova', amount: '₹15,00,000', type: '3D Approval Milestone', status: 'Partially Paid', date: 'Jan 12' },
        { id: 'INV-ID-07', client: 'Alaya Spa', amount: '₹4,50,000', type: 'Initial Consultancy Fee', status: 'Pending', date: 'Jan 14' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newInvoice, setNewInvoice] = useState({ client: '', amount: '', type: '', status: 'Pending' });

    // Gateway Config State
    const [gatewayConfig, setGatewayConfig] = useState({
        provider: 'Razorpay',
        email: 'billing@interiorstudio.com',
        keyId: 'rzp_live_interior_445',
        keySecret: '************************'
    });

    const handleCreateInvoice = (e) => {
        e.preventDefault();
        const invoice = {
            id: `INV-ID-${invoices.length + 10}`.toUpperCase(),
            ...newInvoice,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
        };
        setInvoices([invoice, ...invoices]);
        setShowModal(false);
        setNewInvoice({ client: '', amount: '', type: '', status: 'Pending' });
    };

    const handleStatusUpdate = (id) => {
        setInvoices(invoices.map(inv =>
            inv.id === id ? { ...inv, status: 'Paid' } : inv
        ));
    };

    return (
        <div className="space-y-10 pb-12 animate-in slide-in-from-left-8 duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight uppercase" style={{ color: theme.textPrimary }}>Payments <span style={{ color: theme.primary }}>& Billing</span></h1>
                    <p className="text-sm font-medium mt-2 max-w-xl opacity-70" style={{ color: theme.textSecondary }}>Manage interior design consultancy fees, material advances, and vendor payments.</p>
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
                                {tab === 'gateway' ? 'Gateway Access' : 'Invoices'}
                            </button>
                        ))}
                    </div>
                    {activeTab === 'invoices' && (
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-3 px-8 py-4 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all"
                            style={{ background: theme.gradients.button }}
                        >
                            <FiPlus className="text-lg" /> Create Billing Unit
                        </button>
                    )}
                </div>
            </div>

            {activeTab === 'invoices' ? (
                <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { label: 'Total Invoiced', val: '₹48.2 L', icon: <FiFileText />, accent: theme.primary },
                            { label: 'Collections', val: '₹32.5 L', icon: <FiCreditCard />, accent: '#10b981' },
                            { label: 'Pending Dues', val: '₹15.7 L', icon: <FiClock />, accent: '#ef4444' },
                        ].map((stat, i) => (
                            <div key={i} className="card-premium p-10 flex flex-col items-center text-center group transition-all" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                                <div className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-all shadow-inner border" style={{ backgroundColor: `${stat.accent}10`, color: stat.accent, borderColor: `${stat.accent}20` }}>
                                    {stat.icon}
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60" style={{ color: theme.textSecondary }}>{stat.label}</p>
                                <h3 className="text-4xl font-black tracking-tighter" style={{ color: theme.textPrimary }}>{stat.val}</h3>
                            </div>
                        ))}
                    </div>

                    <div className="card-premium overflow-hidden" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                        <div className="p-10 border-b flex justify-between items-center" style={{ borderColor: theme.cardBorder, backgroundColor: `${theme.iconBg}03` }}>
                            <h4 className="text-xl font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>Financial Inlets</h4>
                            <FiArrowUpRight style={{ color: theme.primary }} className="text-2xl" />
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr style={{ backgroundColor: `${theme.iconBg}08` }}>
                                        {['Invoice No', 'Project/Client', 'Type', 'Amount', 'Status'].map(h => (
                                            <th key={h} className="px-10 py-6 text-[10px] font-black uppercase tracking-widest" style={{ color: theme.textSecondary }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y" style={{ divideColor: theme.cardBorder }}>
                                    {invoices.map((inv, i) => (
                                        <tr key={i} className="hover:bg-slate-50/50 transition-colors cursor-pointer group" onClick={() => handleStatusUpdate(inv.id)}>
                                            <td className="px-10 py-8 text-xs font-black tracking-widest uppercase" style={{ color: theme.textPrimary }}>{inv.id}</td>
                                            <td className="px-10 py-8">
                                                <p className="text-sm font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>{inv.client}</p>
                                                <p className="text-[9px] font-black mt-1 uppercase tracking-widest italic opacity-60" style={{ color: theme.textSecondary }}>{inv.date} Issue Date</p>
                                            </td>
                                            <td className="px-10 py-8 text-[10px] font-black opacity-60 uppercase" style={{ color: theme.textSecondary }}>{inv.type}</td>
                                            <td className="px-10 py-8 text-sm font-black" style={{ color: theme.primary }}>{inv.amount}</td>
                                            <td className="px-10 py-8">
                                                <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${inv.status === 'Paid' ? 'bg-green-50 text-green-700 border-green-200' :
                                                    inv.status === 'Partially Paid' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-red-50 text-red-700 border-red-200'
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
                                    <h4 className="text-xl font-black" style={{ color: theme.textPrimary }}>Client Payment Access</h4>
                                    <p className="text-xs font-medium opacity-60" style={{ color: theme.textSecondary }}>Configure your interior firm's gateway to accept milestone payments.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textSecondary }}>Gateway Provider</label>
                                    <select
                                        value={gatewayConfig.provider}
                                        onChange={(e) => setGatewayConfig({ ...gatewayConfig, provider: e.target.value })}
                                        className="w-full p-4 rounded-xl border font-bold text-sm focus:ring-0"
                                        style={{ backgroundColor: theme.background, borderColor: theme.cardBorder, color: theme.textPrimary }}
                                    >
                                        <option>Razorpay</option>
                                        <option>Stripe</option>
                                        <option>Instamojo</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textSecondary }}>Business Email</label>
                                    <input
                                        value={gatewayConfig.email}
                                        onChange={(e) => setGatewayConfig({ ...gatewayConfig, email: e.target.value })}
                                        className="w-full p-4 rounded-xl border font-bold text-sm"
                                        style={{ backgroundColor: theme.background, borderColor: theme.cardBorder, color: theme.textPrimary }}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textSecondary }}>Razorpay Key ID</label>
                                    <input
                                        type="password"
                                        value={gatewayConfig.keyId}
                                        onChange={(e) => setGatewayConfig({ ...gatewayConfig, keyId: e.target.value })}
                                        className="w-full p-4 rounded-xl border font-bold text-sm font-mono"
                                        style={{ backgroundColor: theme.background, borderColor: theme.cardBorder, color: theme.textPrimary }}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textSecondary }}>Razorpay Key Secret</label>
                                    <input
                                        type="password"
                                        value={gatewayConfig.keySecret}
                                        onChange={(e) => setGatewayConfig({ ...gatewayConfig, keySecret: e.target.value })}
                                        className="w-full p-4 rounded-xl border font-bold text-sm font-mono"
                                        style={{ backgroundColor: theme.background, borderColor: theme.cardBorder, color: theme.textPrimary }}
                                    />
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t flex justify-end gap-3" style={{ borderColor: theme.cardBorder }}>
                                <button className="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-70" style={{ color: theme.textPrimary }}>Verify Keys</button>
                                <button className="px-8 py-3 bg-brand-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-brand" style={{ background: theme.gradients.button }}>Save Configuration</button>
                            </div>
                        </div>

                        <div className="card-premium p-8 border-l-4" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder, borderLeftColor: theme.primary }}>
                            <div className="flex gap-4">
                                <FiInfo style={{ color: theme.primary }} className="mt-1" size={20} />
                                <div>
                                    <h5 className="font-black text-sm uppercase tracking-tight" style={{ color: theme.textPrimary }}>Auto-payouts to Vendors</h5>
                                    <p className="text-xs font-medium mt-1 opacity-70" style={{ color: theme.textSecondary }}>
                                        Configure vendor banking routes to split incoming client payments automatically.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="card-premium p-6" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                            <h5 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-60" style={{ color: theme.textSecondary }}>Status Check</h5>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-sm font-black" style={{ color: theme.textPrimary }}>Production Active</span>
                            </div>
                        </div>

                        <div className="card-premium p-6 bg-slate-900 text-white border-none shadow-brand overflow-hidden relative" style={{ background: theme.gradients.sidebar }}>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-600 opacity-20 rounded-full blur-2xl -mr-16 -mt-16"></div>
                            <h4 className="text-sm font-black uppercase tracking-widest mb-4 relative z-10">Data Integrity</h4>
                            <div className="flex items-center gap-3 relative z-10">
                                <FiShield className="text-brand-400" size={24} />
                                <p className="text-[10px] font-medium leading-relaxed opacity-80">
                                    End-to-end encryption for all financial keys and vendor transaction logs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Invoice Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl animate-in slide-in-from-bottom-8 overflow-hidden"
                        style={{ backgroundColor: theme.cardBg }}
                    >
                        <div className="p-6 text-white relative flex justify-between items-center" style={{ background: theme.gradients.primary }}>
                            <div>
                                <h3 className="text-xl font-black">Generate Invoice</h3>
                                <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mt-1">Client Billing</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white">
                                <FiX />
                            </button>
                        </div>

                        <form onSubmit={handleCreateInvoice} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Client Name</label>
                                <input type="text" required value={newInvoice.client} onChange={e => setNewInvoice({ ...newInvoice, client: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                    placeholder="e.g. Kumar Villa"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Description / Milestone</label>
                                <input type="text" required value={newInvoice.type} onChange={e => setNewInvoice({ ...newInvoice, type: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                    placeholder="e.g. Phase 2 Completion"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Amount (₹)</label>
                                <input type="text" required value={newInvoice.amount} onChange={e => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                    placeholder="e.g. ₹5,00,000"
                                />
                            </div>

                            <button type="submit" className="w-full py-4 rounded-xl text-white font-black uppercase tracking-widest shadow-lg hover:shadow-xl transition-all"
                                style={{ background: theme.gradients.button }}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <FiCheck /> Generate & Send
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IntBilling;
