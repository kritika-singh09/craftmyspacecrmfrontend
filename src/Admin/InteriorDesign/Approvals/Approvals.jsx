import React from 'react';
import { FiCheckCircle, FiXCircle, FiClock, FiFileText, FiMessageSquare, FiExternalLink } from 'react-icons/fi';

const IntApprovals = () => {
    const items = [
        { id: 1, name: 'Master Bedroom Mood Board', client: 'Khanna Residences', type: 'Design', date: 'Jan 14', status: 'Pending Approval' },
        { id: 2, name: 'Living Room 3D Render (V2)', client: 'Khanna Residences', type: 'Visualization', date: 'Jan 12', status: 'Approved' },
        { id: 3, name: 'Kitchen Material BOQ', client: 'Khanna Residences', type: 'Financial', date: 'Jan 10', status: 'Revision Requested' },
    ];

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700 text-indigo-900 dark:text-white">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight uppercase tracking-tight">Client <span className="text-orange-600">Approvals</span></h1>
                    <p className="text-gray-800 dark:text-orange-300 mt-2 font-bold tracking-wide">Track design sign-offs, material choices, and variation orders.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item, i) => (
                    <div key={i} className="group flex flex-col justify-between bg-white dark:bg-brand-900/40 p-10 rounded-[4rem] shadow-premium border border-orange-50/50 dark:border-brand-800/50 hover:shadow-premium-xl transition-all duration-500 relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 w-32 h-32 bg-orange-600/5 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-10">
                                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-3xl shadow-inner ${item.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' :
                                    item.status === 'Revision Requested' ? 'bg-rose-50 text-rose-600' : 'bg-orange-50 text-orange-600'
                                    }`}>
                                    <FiFileText />
                                </div>
                                <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${item.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                    item.status === 'Revision Requested' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                                    }`}>{item.status}</span>
                            </div>

                            <h3 className="text-2xl font-black uppercase tracking-tight mb-2 leading-tight group-hover:text-orange-600 transition-colors uppercase">{item.name}</h3>
                            <p className="text-[10px] font-bold text-gray-700 mt-1">Project: {item.client}</p>

                            <div className="mt-10 pt-8 border-t border-orange-50 dark:border-brand-800 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-600">
                                <span className="flex items-center gap-2"><FiClock className="text-orange-600" /> {item.date}</span>
                                <span>TYPE: {item.type}</span>
                            </div>
                        </div>

                        <div className="mt-10 flex gap-4 relative z-10">
                            <button className="flex-1 py-4 bg-orange-600 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-brand">Initiate Approval</button>
                            <button className="w-14 h-14 bg-white dark:bg-brand-800 border border-orange-100 dark:border-brand-700 rounded-[1.5rem] flex items-center justify-center text-xl shadow-premium hover:text-orange-600 transition-colors"><FiMessageSquare /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IntApprovals;
