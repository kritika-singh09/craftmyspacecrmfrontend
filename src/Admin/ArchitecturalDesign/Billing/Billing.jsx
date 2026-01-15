import React, { useState } from 'react';
import { FiDollarSign, FiPieChart, FiFileText, FiPlus, FiArrowUpRight, FiCreditCard, FiCheckCircle, FiClock } from 'react-icons/fi';

const Billing = () => {
    const invoices = [
        { id: 'INV-2024-001', project: 'The Zenith Residency', amount: '₹12,50,000', date: '2024-01-14', status: 'Paid', type: 'Phase 1: Concept' },
        { id: 'INV-2024-002', project: 'Blue Ocean Resort', amount: '₹8,00,000', date: '2024-01-12', status: 'Pending', type: 'Phase 2: Schematic' },
        { id: 'INV-2024-005', project: 'Urban IT Park', amount: '₹15,00,000', date: '2024-01-05', status: 'Overdue', type: 'Retainer Fee' },
    ];

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight uppercase tracking-tight">Fees & <span className="text-brand-600">Billing</span></h1>
                    <p className="text-gray-500 dark:text-brand-300 mt-2 font-medium tracking-wide">Manage lump-sum, percentage, and milestone-based architectural fee structures.</p>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-brand-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all">
                    <FiPlus className="text-lg" /> Create Invoice
                </button>
            </div>

            {/* Financial Overview Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-indigo-900 dark:text-white">
                {[
                    { label: 'Total Fees', val: '₹4.2 Cr', icon: <FiDollarSign />, color: 'brand' },
                    { label: 'Received', val: '₹1.8 Cr', icon: <FiCheckCircle />, color: 'emerald' },
                    { label: 'Pending', val: '₹2.4 Cr', icon: <FiClock />, color: 'amber' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-brand-900/30 p-8 rounded-[2.5rem] shadow-premium border border-brand-50/50 dark:border-brand-800/50 relative overflow-hidden group">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                <h3 className="text-3xl font-black tracking-tighter">{stat.val}</h3>
                            </div>
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Invoice Table */}
            <div className="bg-white dark:bg-brand-900/30 rounded-[3rem] shadow-premium border border-brand-50/50 dark:border-brand-800/50 overflow-hidden">
                <div className="p-8 border-b border-brand-50 dark:border-brand-800/50 flex justify-between items-center">
                    <h4 className="text-lg font-black uppercase tracking-tight">Recent Invoices</h4>
                    <FiArrowUpRight className="text-brand-600 cursor-pointer" />
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-brand-50/30 dark:bg-brand-900/50">
                            {['Invoice Number', 'Project / Phase', 'Amount', 'Date', 'Status'].map(head => (
                                <th key={head} className="px-8 py-4 text-[9px] font-black text-brand-600 uppercase tracking-widest">{head}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-50 dark:divide-brand-800">
                        {invoices.map((inv) => (
                            <tr key={inv.id} className="hover:bg-brand-50/20 transition-colors cursor-pointer">
                                <td className="px-8 py-6 text-xs font-black text-gray-500 tracking-widest">{inv.id}</td>
                                <td className="px-8 py-6">
                                    <p className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight">{inv.project}</p>
                                    <p className="text-[10px] font-bold text-gray-400 mt-0.5 italic">{inv.type}</p>
                                </td>
                                <td className="px-8 py-6 text-sm font-black text-brand-600">{inv.amount}</td>
                                <td className="px-8 py-6 text-xs font-bold text-gray-500">{inv.date}</td>
                                <td className="px-8 py-6">
                                    <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                        inv.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-rose-50 text-rose-700 border-rose-100'
                                        }`}>
                                        {inv.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-indigo-900 rounded-[3rem] p-10 text-white flex justify-between items-center shadow-brand-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-brand-600 opacity-20 rounded-full -mr-40 -mt-40 blur-3xl"></div>
                <div className="flex items-center gap-8 relative z-10">
                    <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center text-4xl shadow-inner">💳</div>
                    <div>
                        <h4 className="text-2xl font-black tracking-tight mb-2 uppercase tracking-wide">Automatic Fee Reminders</h4>
                        <p className="text-brand-100 font-medium opacity-80 max-w-sm">Enable automatic email notifications for clients when payment milestones are reached.</p>
                    </div>
                </div>
                <button className="px-8 py-4 bg-white text-brand-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-all relative z-10">Configure Billing</button>
            </div>
        </div>
    );
};

export default Billing;
