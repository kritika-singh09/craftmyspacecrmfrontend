import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCreditCard, FiCheck, FiX, FiTrendingUp } from 'react-icons/fi';
import CouponForm from './CouponForm';
import TierForm from './TierForm';

const SuperAdminPlans = () => {
    const navigate = useNavigate();
    const [plans, setPlans] = useState([
        {
            id: 1,
            name: 'Foundation',
            price: '₹2,499',
            period: 'per month',
            features: ['Up to 5 Projects', 'Basic Reporting', '10 Users', 'Standard Support'],
            excluded: ['Multi-tenant Oversight', 'Custom Workflows', 'Audit Logs'],
            color: 'border-gray-200',
            buttonColor: 'bg-gray-100 text-gray-800'
        },
        {
            id: 2,
            name: 'Professional',
            price: '₹7,999',
            period: 'per month',
            features: ['Unlimited Projects', 'Advanced Analytics', '50 Users', 'Priority Support', 'Custom Workflows'],
            excluded: ['White Labeling', 'Dedicated API'],
            color: 'border-brand-200 shadow-premium',
            buttonColor: 'bg-brand-600 text-white',
            popular: true
        },
        {
            id: 3,
            name: 'Enterprise Elite',
            price: 'Custom',
            period: 'tailored pricing',
            features: ['Everything in Pro', 'Unlimited Users', 'White Labeling', 'Dedicated Support', 'Audit Logs', 'Dedicated API'],
            excluded: [],
            color: 'border-purple-200',
            buttonColor: 'bg-purple-600 text-white'
        }
    ]);

    const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
    const [isTierModalOpen, setIsTierModalOpen] = useState(false);

    const handleCreateCoupon = (data) => {
        console.log('Coupon created:', data);
        alert(`Coupon ${data.code} has been registered!`);
        setIsCouponModalOpen(false);
    };

    const handleCreateTier = (data) => {
        const newTier = {
            id: plans.length + 1,
            name: data.name,
            price: `₹${data.price}`,
            period: 'per month',
            features: data.features.split(',').map(f => f.trim()),
            excluded: [],
            color: 'border-brand-200',
            buttonColor: 'bg-brand-600 text-white',
            popular: data.isPopular
        };
        setPlans([...plans, newTier]);
        setIsTierModalOpen(false);
    };

    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Revenue & Billing Matrix</h1>
                    <p className="text-sm font-bold text-gray-700 mt-1">Global Subscription Tiers & Transactional Ledger Oversight</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsCouponModalOpen(true)}
                        className="px-6 py-3 bg-white border border-brand-100 text-brand-600 text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-brand-50 shadow-sm transition-all"
                    >
                        Coupon Engine
                    </button>
                    <button
                        onClick={() => setIsTierModalOpen(true)}
                        className="px-6 py-3 bg-brand-600 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-brand-700 shadow-premium transition-all"
                    >
                        Add New Tier
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan, i) => (
                    <div key={i} className={`card-premium p-10 flex flex-col relative border-t-8 ${plan.color}`}>
                        {plan.popular && (
                            <div className="absolute top-0 right-10 -translate-y-1/2 bg-brand-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                Most Popular
                            </div>
                        )}
                        <div className="mb-8">
                            <h3 className="text-xl font-black text-gray-900 uppercase tracking-widest">{plan.name}</h3>
                            <div className="mt-4 flex items-baseline gap-1">
                                <span className="text-4xl font-black text-gray-900">{plan.price}</span>
                                <span className="text-sm font-black text-gray-600">{plan.period}</span>
                            </div>
                        </div>

                        <div className="flex-1 space-y-4 mb-10">
                            {plan.features.map((feature, j) => (
                                <div key={j} className="flex items-start gap-3">
                                    <FiCheck className="text-green-500 mt-1" />
                                    <span className="text-sm font-bold text-gray-800">{feature}</span>
                                </div>
                            ))}
                            {plan.excluded.map((feature, j) => (
                                <div key={j} className="flex items-start gap-3 opacity-40">
                                    <FiX className="text-gray-400 mt-1" />
                                    <span className="text-sm font-black text-gray-600 line-through">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => alert(`Configuring entitlements for ${plan.name}...`)}
                            className={`w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all hover:-translate-y-1 shadow-sm ${plan.buttonColor}`}
                        >
                            Configure Tier
                        </button>
                    </div>
                ))}
            </div>

            <div className="card-premium overflow-hidden">
                <div className="p-8 border-b border-brand-50 bg-brand-50/30 flex justify-between items-center">
                    <h3 className="text-xl font-black text-gray-900">Global Billing Summary</h3>
                    <div className="flex gap-2">
                        <button
                            onClick={() => alert('Exporting recent billing data to CSV...')}
                            className="px-4 py-2 bg-white border border-brand-100 rounded-xl text-[10px] font-black tracking-widest uppercase hover:bg-brand-50 transition-all"
                        >
                            Export CSV
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-brand-50/50 border-b border-brand-100">
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Invoice ID</th>
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Enterprise Tenant</th>
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Service Tier</th>
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Amount</th>
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Settlement Date</th>
                                <th className="px-8 py-5 text-right text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-50">
                            {[
                                { id: 'INV-8821', tenant: 'HARR Construction', tier: 'Professional', amount: '₹7,999', date: 'Jan 12, 2026', status: 'Settled' },
                                { id: 'INV-8822', tenant: 'ABC Builders', tier: 'Foundation', amount: '₹2,499', date: 'Jan 10, 2026', status: 'Settled' },
                                { id: 'INV-8823', tenant: 'XYZ Infra', tier: 'Professional', amount: '₹7,999', date: 'Jan 08, 2026', status: 'Pending' },
                                { id: 'INV-8824', tenant: 'Global Projects', tier: 'Enterprise', amount: '₹45,000', date: 'Jan 05, 2026', status: 'Overdue' },
                            ].map((inv) => (
                                <tr key={inv.id} className="group hover:bg-brand-50/30 transition-colors">
                                    <td className="px-8 py-6 font-bold text-gray-900">{inv.id}</td>
                                    <td className="px-8 py-6 text-sm font-bold text-gray-800">{inv.tenant}</td>
                                    <td className="px-8 py-6">
                                        <span className="px-2 py-1 bg-brand-50 text-brand-600 text-[10px] font-bold rounded-lg border border-brand-100 uppercase">{inv.tier}</span>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-black text-gray-900">{inv.amount}</td>
                                    <td className="px-8 py-6 text-sm font-bold text-gray-700">{inv.date}</td>
                                    <td className="px-8 py-6 text-right">
                                        <span className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-xl border ${inv.status === 'Settled' ? 'bg-green-50 text-green-700 border-green-200' :
                                            inv.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                'bg-red-50 text-red-700 border-red-200'
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

            <div className="card-premium p-8 overflow-hidden bg-brand-50/20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl text-brand-600">
                            <FiTrendingUp />
                        </div>
                        <div>
                            <h4 className="text-xl font-black text-gray-900">Yield Optimization Intelligence</h4>
                            <p className="text-sm font-bold text-gray-700">Auto-calculated plan recommendations based on tenant usage patterns.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/yield-analytics')}
                        className="px-8 py-3 bg-black text-white text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-brand-900 transition-all"
                    >
                        Launch Yield Dashboard
                    </button>
                </div>
            </div>

            {/* Modal Overlay Container */}
            {(isCouponModalOpen || isTierModalOpen) && (
                <div className="fixed inset-0 bg-brand-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto animate-fade-in-up">
                        <div className="p-8 border-b border-brand-50 bg-brand-50/30 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-black text-gray-900">
                                    {isCouponModalOpen ? 'Coupon Configuration' : 'Tier Architecture'}
                                </h2>
                                <p className="text-xs font-black text-gray-600 uppercase tracking-widest mt-1">
                                    {isCouponModalOpen ? 'Promotional Revenue Logic' : 'Enterprise Subscription Modeling'}
                                </p>
                            </div>
                            <button
                                onClick={() => { setIsCouponModalOpen(false); setIsTierModalOpen(false); }}
                                className="w-10 h-10 rounded-full hover:bg-white flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-8">
                            {isCouponModalOpen && <CouponForm onSubmit={handleCreateCoupon} onCancel={() => setIsCouponModalOpen(false)} />}
                            {isTierModalOpen && <TierForm onSubmit={handleCreateTier} onCancel={() => setIsTierModalOpen(false)} />}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuperAdminPlans;
