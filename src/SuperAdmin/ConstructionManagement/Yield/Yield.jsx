import React from 'react';
import { FiTrendingUp, FiArrowUpRight, FiUsers, FiPieChart, FiActivity, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const SuperAdminYield = () => {
    const navigate = useNavigate();

    const metrics = [
        { label: 'Avg. Revenue Per Tenant', value: '₹14,240', change: '+12.5%', icon: <FiTrendingUp /> },
        { label: 'Platform LTV (Est)', value: '₹2.4 Cr', change: '+8.2%', icon: <FiPieChart /> },
        { label: 'Churn Probability', value: '1.4%', change: '-0.3%', icon: <FiActivity /> },
        { label: 'Expansion MRR', value: '₹1.8 L', change: '+22%', icon: <FiArrowUpRight /> },
    ];

    const patterns = [
        { name: 'Basic → Professional', count: 12, value: '₹66,000/mo', health: 'Positive' },
        { name: 'Professional → Enterprise', count: 3, value: 'Variable', health: 'High Value' },
        { name: 'Free → Paid', count: 45, value: '₹1.1 L/mo', health: 'Growth' },
    ];

    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/plans-billing')}
                        className="p-3 bg-white border border-brand-100 rounded-2xl text-brand-600 hover:bg-brand-600 hover:text-white transition-all shadow-sm"
                    >
                        <FiArrowLeft />
                    </button>
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Yield Intelligence</h1>
                        <p className="text-sm font-bold text-gray-900 mt-1">Tenant Economics, Usage Patterns & Revenue Velocity</p>
                    </div>
                </div>
                <button className="px-6 py-3 bg-brand-600 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-brand-700 shadow-premium transition-all">
                    Export Forecast
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((m, i) => (
                    <div key={i} className="card-premium p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center text-lg">
                                {m.icon}
                            </div>
                            <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${m.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                }`}>
                                {m.change}
                            </span>
                        </div>
                        <p className="text-[10px] font-black text-gray-800 uppercase tracking-widest">{m.label}</p>
                        <h3 className="text-2xl font-black text-gray-900 mt-1">{m.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 card-premium p-8">
                    <h3 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-widest">Revenue Migration Patterns</h3>
                    <div className="space-y-4">
                        {patterns.map((p, i) => (
                            <div key={i} className="p-6 bg-brand-50/20 border border-brand-50 rounded-2xl flex items-center justify-between group hover:bg-brand-50/40 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-600 font-bold">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{p.name}</h4>
                                        <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest">{p.count} Conversions this month</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-brand-600">{p.value}</p>
                                    <span className="text-[10px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-2 py-1 rounded-lg">{p.health}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card-premium p-8 flex flex-col justify-center text-center bg-brand-900 text-white">
                    <div className="w-20 h-20 bg-brand-500/20 border border-brand-500/30 rounded-3xl mx-auto flex items-center justify-center text-4xl mb-6">
                        <FiUsers className="text-brand-400" />
                    </div>
                    <h3 className="text-2xl font-black mb-2 uppercase tracking-widest">Growth Engine</h3>
                    <p className="text-brand-200 text-sm font-medium mb-8">System predicts a 14% increase in Professional Tier conversions by Q2 based on current usage spikes.</p>
                    <button className="w-full py-4 bg-brand-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-400 transition-all">
                        View Optimization Plan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminYield;
