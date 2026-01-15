import React from 'react';
import { FiCheckSquare, FiAward, FiCreditCard, FiArrowRight, FiActivity } from 'react-icons/fi';

const IntClosure = () => {
    const checklist = [
        { item: 'Mood Board & 3D Approval Cycle', status: 'Completed', date: 'Jan 10' },
        { item: 'Site Execution Work Logs', status: 'Completed', date: 'Jan 12' },
        { item: 'Final Install Check (Furniture/Decor)', status: 'Pending', date: '-' },
        { item: 'All Vendor Payments Settled', status: 'In Progress', date: '-' },
        { item: 'Warranty Documents Share (Materials)', status: 'Pending', date: '-' },
        { item: 'Professional Photoshoot & Review', status: 'Upcoming', date: '-' },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-12 animate-in zoom-in-95 duration-700 text-indigo-900 dark:text-white">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight uppercase tracking-tight">Project <span className="text-orange-600">Handover</span></h1>
                    <p className="text-gray-500 dark:text-orange-300 mt-2 font-medium tracking-wide">Final inspection, payment clearance, and warranty dissemination.</p>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-all">
                    <FiAward className="text-lg" /> Close Project
                </button>
            </div>

            <div className="bg-white dark:bg-brand-900/40 p-10 rounded-[4rem] shadow-premium border border-orange-50/50 dark:border-brand-800/50">
                <h4 className="text-xl font-black uppercase tracking-tight mb-8 underline decoration-orange-500 decoration-8 underline-offset-8">Departure Checklist</h4>
                <div className="space-y-4">
                    {checklist.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-6 bg-orange-50/20 dark:bg-brand-800/20 rounded-3xl border border-orange-50 dark:border-brand-800 transition-colors hover:bg-white group">
                            <div className="flex items-center gap-6">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${item.status === 'Completed' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-orange-200 text-orange-200 group-hover:border-orange-500'
                                    }`}>
                                    {item.status === 'Completed' ? <FiCheckSquare /> : <div className="w-2 h-2 rounded-full bg-current"></div>}
                                </div>
                                <div>
                                    <p className="text-sm font-black uppercase tracking-tight">{item.item}</p>
                                    <p className="text-[10px] font-bold text-gray-400 opacity-60 uppercase">{item.date !== '-' ? `Finalized on ${item.date}` : `Status: ${item.status}`}</p>
                                </div>
                            </div>
                            {item.status !== 'Completed' && (
                                <button className="text-[9px] font-black text-orange-600 uppercase tracking-widest hover:underline">Complete Task</button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-white dark:bg-brand-900/30 rounded-[3rem] border border-orange-50 dark:border-brand-800 shadow-premium">
                    <div className="flex items-center gap-4 mb-6">
                        <FiCreditCard className="text-3xl text-orange-500" />
                        <h4 className="text-lg font-black uppercase tracking-tight">Final Settlement</h4>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-gray-400 uppercase">Total Clearance</span>
                        <span className="text-xl font-black text-emerald-600">₹8.4 L</span>
                    </div>
                    <button className="w-full py-3 bg-brand-50 dark:bg-brand-800 text-brand-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all">Verify Receipts</button>
                </div>

                <div className="p-8 bg-white dark:bg-brand-900/30 rounded-[3rem] border border-orange-50 dark:border-brand-800 shadow-premium">
                    <div className="flex items-center gap-4 mb-6">
                        <FiActivity className="text-3xl text-orange-500" />
                        <h4 className="text-lg font-black uppercase tracking-tight">Post-Handover</h4>
                    </div>
                    <p className="text-xs font-medium text-gray-400 italic mb-6">"Setup 6-month maintenance check for plumbing and modular kitchen fittings."</p>
                    <button className="w-full py-3 border border-orange-200 text-orange-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-50 transition-all">Schedule Maintenance</button>
                </div>
            </div>
        </div>
    );
};

export default IntClosure;
