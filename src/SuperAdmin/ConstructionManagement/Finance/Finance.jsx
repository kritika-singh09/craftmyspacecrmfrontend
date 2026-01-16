import React from 'react';
import { FiDollarSign, FiTrendingUp, FiPieChart, FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';

const SuperAdminFinance = () => {
    // Mock data for global finance overview
    const financialStats = [
        { label: 'Platform Revenue', value: '₹12.4 Cr', trend: '+18.2%', positive: true, icon: <FiDollarSign /> },
        { label: 'Pending Collections', value: '₹85.2 L', trend: '-2.4%', positive: true, icon: <FiPieChart /> },
        { label: 'Active Subscriptions', value: '428', trend: '+12', positive: true, icon: <FiTrendingUp /> },
        { label: 'Avg. Churn Rate', value: '1.2%', trend: '-0.5%', positive: true, icon: <FiTrendingUp /> },
    ];

    const enterpriseFinance = [
        { id: 1, name: 'HARR Construction', revenue: '₹4.2 Cr', expenses: '₹2.8 Cr', margin: '33%', status: 'Stable' },
        { id: 2, name: 'ABC Builders', revenue: '₹3.8 Cr', expenses: '₹2.1 Cr', margin: '45%', status: 'Growth' },
        { id: 3, name: 'XYZ Infra', revenue: '₹1.5 Cr', expenses: '₹1.8 Cr', margin: '-20%', status: 'Critical' },
        { id: 4, name: 'Skyview Properties', revenue: '₹2.9 Cr', expenses: '₹1.9 Cr', margin: '34%', status: 'Stable' },
    ];

    return (
        <div className="space-y-8 pb-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Financial Ledger</h1>
                    <p className="text-sm font-bold text-gray-900 mt-1">Cross-Tenant Revenue Streams & Fiscal Performance</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => alert('Tax configuration portal coming soon in v2.5')}
                        className="px-5 py-2.5 rounded-xl bg-white border border-brand-100 text-brand-600 text-[11px] font-black uppercase tracking-widest hover:bg-brand-50 shadow-sm transition-all text-nowrap"
                    >
                        Tax Configuration
                    </button>
                    <button
                        onClick={() => alert('Generating Global P&L Report... Please wait.')}
                        className="px-5 py-2.5 rounded-xl bg-brand-600 text-white text-[11px] font-black uppercase tracking-widest hover:bg-brand-700 shadow-premium transition-all text-nowrap"
                    >
                        Generate Global P&L
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {financialStats.map((stat, i) => (
                    <div key={i} className="card-premium p-8 relative overflow-hidden group hover:-translate-y-1 transition-all">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 text-xl group-hover:bg-brand-600 group-hover:text-white transition-colors">
                                {stat.icon}
                            </div>
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black ${stat.positive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                {stat.positive ? <FiArrowUpRight /> : <FiArrowDownRight />} {stat.trend}
                            </div>
                        </div>
                        <p className="text-[10px] font-black text-gray-800 uppercase tracking-widest">{stat.label}</p>
                        <h3 className="text-3xl font-black text-gray-900 mt-1 tracking-tight">{stat.value}</h3>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 card-premium overflow-hidden">
                    <div className="p-8 border-b border-brand-50 bg-brand-50/30 flex justify-between items-center">
                        <h3 className="text-xl font-black text-gray-900">Tenant Financial Profiles</h3>
                        <select className="bg-white border border-brand-100 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest text-brand-600 outline-none cursor-pointer">
                            <option>Highest Revenue</option>
                            <option>Lowest Margin</option>
                            <option>Alphabetical</option>
                        </select>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-brand-50/50 border-b border-brand-100">
                                    <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Enterprise Entity</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Gross Revenue</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Net Margin</th>
                                    <th className="px-8 py-5 text-right text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Fiscal Health</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-50">
                                {enterpriseFinance.map((ent) => (
                                    <tr key={ent.id} className="group hover:bg-brand-50/30 transition-all">
                                        <td className="px-8 py-6 font-bold text-gray-900">{ent.name}</td>
                                        <td className="px-8 py-6 text-sm font-black text-gray-900">{ent.revenue}</td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className={`h-full ${parseInt(ent.margin) > 0 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${Math.abs(parseInt(ent.margin))}%` }}></div>
                                                </div>
                                                <span className={`text-[11px] font-black ${parseInt(ent.margin) > 0 ? 'text-green-600' : 'text-red-600'}`}>{ent.margin}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <span className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-xl border ${ent.status === 'Growth' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                                ent.status === 'Stable' ? 'bg-green-50 text-green-700 border-green-200' :
                                                    'bg-red-50 text-red-700 border-red-200'
                                                }`}>
                                                {ent.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card-premium p-8 flex flex-col">
                    <h3 className="text-xl font-black text-gray-900 mb-8">Platform Burn Rate</h3>
                    <div className="flex-1 flex flex-col justify-center items-center text-center py-8">
                        <div className="w-48 h-48 rounded-full border-[12px] border-brand-50 flex items-center justify-center relative">
                            <div className="absolute inset-0 border-[12px] border-brand-600 rounded-full border-t-transparent -rotate-45"></div>
                            <div>
                                <p className="text-4xl font-black text-gray-900">₹4.2L</p>
                                <p className="text-[10px] font-black text-gray-800 uppercase tracking-widest mt-1">Daily Avg.</p>
                            </div>
                        </div>
                        <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <p className="text-[10px] font-black text-gray-800 uppercase tracking-tighter">Infrastructure</p>
                                <p className="text-sm font-black text-gray-900">₹1.8L</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <p className="text-[10px] font-black text-gray-800 uppercase tracking-tighter">Operations</p>
                                <p className="text-sm font-black text-gray-900">₹2.4L</p>
                            </div>
                        </div>
                    </div>
                    <button className="w-full py-4 mt-8 bg-black text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-brand-900 transition-all">Optimize Stack</button>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminFinance;
