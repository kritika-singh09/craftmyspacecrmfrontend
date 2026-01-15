import React from 'react';
import { FiDollarSign, FiPlus, FiArrowUpRight, FiClock, FiFileText, FiCreditCard } from 'react-icons/fi';

const IntBilling = () => {
    const invoices = [
        { id: 'INV-ID-01', client: 'Khanna Residences', amount: '₹12,00,000', type: 'Design & Procurement Advance', status: 'Paid', date: 'Jan 10' },
        { id: 'INV-ID-04', client: 'TechNova', amount: '₹15,00,000', type: '3D Approval Milestone', status: 'Partially Paid', date: 'Jan 12' },
        { id: 'INV-ID-07', client: 'Alaya Spa', amount: '₹4,50,000', type: 'Initial Consultancy Fee', status: 'Pending', date: 'Jan 14' },
    ];

    return (
        <div className="space-y-10 pb-12 animate-in slide-in-from-left-8 duration-700 text-indigo-900 dark:text-white">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-black dark:text-white tracking-tight uppercase tracking-tight">Payments <span className="text-orange-700">& Billing</span></h1>
                    <p className="text-black dark:text-orange-300 mt-2 font-black tracking-wide">Manage consultancy fees, material advances, and vendor payouts.</p>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all">
                    <FiPlus className="text-lg" /> Create Billing Unit
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: 'Total Invoiced', val: '₹48.2 L', icon: <FiFileText />, color: 'orange' },
                    { label: 'Collections', val: '₹32.5 L', icon: <FiCreditCard />, color: 'emerald' },
                    { label: 'Pending Dues', val: '₹15.7 L', icon: <FiClock />, color: 'rose' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-brand-900/40 p-10 rounded-[3rem] shadow-premium border-2 border-orange-200 dark:border-brand-800/50 flex flex-col items-center text-center group hover:-translate-y-2 transition-all">
                        <div className={`w-16 h-16 rounded-[1.5rem] bg-${stat.color === 'orange' ? 'orange' : stat.color}-50 dark:bg-brand-800 flex items-center justify-center text-3xl text-${stat.color === 'orange' ? 'orange' : stat.color}-700 mb-6 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-inner border border-orange-100`}>
                            {stat.icon}
                        </div>
                        <p className="text-[10px] font-black text-gray-950 uppercase tracking-widest mb-1">{stat.label}</p>
                        <h3 className="text-4xl font-black tracking-tighter italic text-black dark:text-white">{stat.val}</h3>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-brand-900/30 rounded-[3.5rem] shadow-premium border border-orange-50/50 dark:border-brand-800/50 overflow-hidden">
                <div className="p-10 border-b border-orange-50 dark:border-brand-800/50 flex justify-between items-center bg-orange-50/10">
                    <h4 className="text-xl font-black uppercase tracking-tight">Recent Financial Inlets</h4>
                    <FiArrowUpRight className="text-orange-600 text-2xl animate-bounce" />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-orange-50/50 dark:bg-link-900/50">
                                {['Invoice No', 'Project/Client', 'Type', 'Amount', 'Status'].map(h => (
                                    <th key={h} className="px-10 py-6 text-[10px] font-black text-black dark:text-orange-400 uppercase tracking-widest">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-orange-200 dark:divide-brand-800">
                            {invoices.map((inv, i) => (
                                <tr key={i} className="hover:bg-orange-50/40 transition-colors cursor-pointer group">
                                    <td className="px-10 py-8 text-xs font-black text-black tracking-widest uppercase">{inv.id}</td>
                                    <td className="px-10 py-8">
                                        <p className="text-sm font-black text-black dark:text-white group-hover:text-orange-700 transition-colors uppercase tracking-tight">{inv.client}</p>
                                        <p className="text-[9px] font-black text-gray-900 mt-1 uppercase tracking-widest italic">{inv.date} Issue Date</p>
                                    </td>
                                    <td className="px-10 py-8 text-[10px] font-black opacity-60 uppercase">{inv.type}</td>
                                    <td className="px-10 py-8 text-sm font-black text-orange-600">{inv.amount}</td>
                                    <td className="px-10 py-8">
                                        <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                            inv.status === 'Partially Paid' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-rose-50 text-rose-700 border-rose-100'
                                            }`}>{inv.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default IntBilling;
