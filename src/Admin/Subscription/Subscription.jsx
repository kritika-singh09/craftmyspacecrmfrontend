import React, { useState } from 'react';
import { useSubscription } from '../../hooks/useSubscription';
import { FiCheck, FiX, FiShield, FiZap, FiAward, FiClock } from 'react-icons/fi';
import CheckoutUI from './CheckoutUI';

const Subscription = () => {
    const { subscription, updatePlan } = useSubscription();
    const [showCheckout, setShowCheckout] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);

    const plans = [
        {
            name: 'Trial',
            price: '0',
            description: 'Perfect for exploring the platform',
            modules: { Interior: true, Architecture: false, Construction: false },
            badge: 'Current',
            icon: <FiZap className="text-yellow-500" />,
            color: 'slate'
        },
        {
            name: 'Basic',
            price: '15,000',
            description: 'Ideal for small design firms',
            modules: { Interior: true, Architecture: true, Construction: false },
            featured: false,
            icon: <FiAward className="text-blue-500" />,
            color: 'blue'
        },
        {
            name: 'Pro',
            price: '25,000',
            description: 'Full suite for large enterprises',
            modules: { Interior: true, Architecture: true, Construction: true },
            featured: true,
            icon: <FiShield className="text-emerald-500" />,
            color: 'brand'
        }
    ];

    const handleUpgrade = (planName) => {
        setSelectedPlan(planName);
        updatePlan(planName);
        setShowCheckout(true);
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div>
                <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Subscription <span className="text-brand-600">Management</span></h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium tracking-wide">Manage your plan, billing, and module access.</p>
            </div>

            {showCheckout ? (
                <div className="max-w-xl mx-auto card-premium bg-white dark:bg-slate-900 border-none shadow-premium-2xl">
                    <CheckoutUI plan={selectedPlan} onCancel={() => setShowCheckout(false)} />
                </div>
            ) : (
                <>
                    {/* Current Plan Overview */}
                    <div className="card-premium p-10 bg-gradient-to-br from-slate-900 to-brand-950 text-white border-none shadow-brand relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500 opacity-10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/10">Active Plan</span>
                                    <span className="text-brand-400 font-black uppercase text-xs tracking-widest">{subscription.plan} Edition</span>
                                </div>
                                <h3 className="text-3xl font-black tracking-tight">{subscription.plan === 'Trial' ? 'Free Exploration' : `${subscription.plan} Professional`}</h3>
                                <div className="flex items-center gap-6 text-slate-400">
                                    <div className="flex items-center gap-2">
                                        <FiClock className="text-brand-400" />
                                        <span className="text-xs font-bold uppercase tracking-widest">Renews: {new Date(subscription.expiresAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="w-px h-4 bg-white/10"></div>
                                    <div className="flex items-center gap-2">
                                        <FiCheck className="text-emerald-400" />
                                        <span className="text-xs font-bold uppercase tracking-widest">Status: {subscription.status}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">Modules Active</p>
                                    <div className="flex gap-2">
                                        {subscription.enabledModules.map(m => (
                                            <span key={m} className={`w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50`}></span>
                                        ))}
                                    </div>
                                </div>
                                <div className="w-px h-12 bg-white/10 mx-2"></div>
                                <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all">
                                    Update Details
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Plan Selections */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan, idx) => {
                            const isActive = subscription.plan === plan.name;
                            return (
                                <div key={idx} className={`relative card-premium p-8 flex flex-col transition-all duration-500 border-none ring-1 ${isActive ? 'ring-brand-500' : 'ring-slate-200 dark:ring-slate-800'}`}>
                                    {isActive && (
                                        <div className="absolute top-0 right-8 -translate-y-1/2 px-4 py-1 bg-brand-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand-500/30">
                                            CURRENTLY ACTIVE
                                        </div>
                                    )}

                                    <div className="mb-8">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-2xl mb-4 border border-slate-100 dark:border-slate-700">
                                            {plan.icon}
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{plan.name} Plan</h3>
                                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">{plan.description}</p>
                                    </div>

                                    <div className="mb-8">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">₹{plan.price}</span>
                                            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">/ MONTH</span>
                                        </div>
                                    </div>

                                    <ul className="space-y-4 mb-10 flex-1">
                                        {Object.entries(plan.modules).map(([mod, available]) => (
                                            <li key={mod} className={`flex items-center gap-3 text-sm font-bold ${available ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400 dark:text-slate-600'}`}>
                                                {available ? <FiCheck className="text-emerald-500" /> : <FiX />}
                                                <span className="tracking-tight">{mod} Module</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        disabled={isActive}
                                        onClick={() => handleUpgrade(plan.name)}
                                        className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all
                      ${isActive
                                                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                                                : 'bg-brand-600 text-white shadow-xl shadow-brand-600/20 hover:scale-[1.02] active:scale-95'
                                            }`}
                                    >
                                        {isActive ? 'Current Plan' : `Upgrade to ${plan.name}`}
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {/* Billing Overview Table Mockup */}
                    <div className="card-premium p-10 bg-white dark:bg-slate-900/50 border-none ring-1 ring-slate-200 dark:ring-slate-800">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-8">Billing History</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left border-b border-slate-100 dark:border-slate-800 pb-4">
                                        <th className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                                        <th className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Transaction ID</th>
                                        <th className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Plan</th>
                                        <th className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Amount</th>
                                        <th className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                    {subscription.paymentHistory.length > 0 ? subscription.paymentHistory.map((h, i) => (
                                        <tr key={i}>
                                            <td className="py-4 text-sm font-bold text-slate-700 dark:text-slate-200">{new Date(h.date).toLocaleDateString()}</td>
                                            <td className="py-4 text-xs font-mono text-slate-500 tracking-tight uppercase">TXN_{Math.random().toString(36).substr(2, 9)}</td>
                                            <td className="py-4 text-xs font-black uppercase tracking-widest text-brand-600">{h.plan}</td>
                                            <td className="py-4 text-sm font-black text-slate-900 dark:text-white">₹{h.amount}</td>
                                            <td className="py-4 px-2">
                                                <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 text-[9px] font-black uppercase rounded tracking-widest border border-emerald-100 dark:border-emerald-800">Success</span>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="py-8 text-center text-sm font-bold text-slate-400">No payment history available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Subscription;
