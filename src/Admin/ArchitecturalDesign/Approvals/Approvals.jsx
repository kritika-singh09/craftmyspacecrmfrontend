import React from 'react';
import { FiCheck, FiX, FiFileText, FiClock } from 'react-icons/fi';

const ArchApprovals = () => {
    const approvals = [
        { id: 1, name: 'Floor Plan R3', date: '2024-01-12', status: 'Pending', client: 'Skyline Corp', type: 'Design Upload' },
        { id: 2, name: 'Schematic Phase', date: '2024-01-10', status: 'Approved', client: 'Coastal Dreams', type: 'Phase Completion' },
        { id: 3, name: 'Elevation 3D View', date: '2024-01-08', status: 'Revision Requested', client: 'Royal Estates', type: 'Visual Content' },
    ];

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Client <span className="text-brand-600">Approvals</span></h1>
                    <p className="text-gray-800 dark:text-brand-300 mt-2 font-medium tracking-wide">Manage the formal approval cycle for drawings, designs, and project phases.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-indigo-900 dark:text-white">
                {approvals.map((app) => (
                    <div key={app.id} className="bg-white dark:bg-brand-900/30 p-8 rounded-[2.5rem] shadow-premium border border-brand-50 dark:border-brand-800 transition-all hover:scale-105 active:scale-95 duration-300">
                        <div className="flex justify-between items-start mb-8">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${app.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' :
                                    app.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                                }`}>
                                <FiFileText />
                            </div>
                            <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${app.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                    app.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-rose-50 text-rose-700 border-rose-100'
                                }`}>
                                {app.status}
                            </span>
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tight mb-1">{app.name}</h3>
                        <p className="text-[10px] font-black text-brand-500 tracking-[0.1em] uppercase">{app.client}</p>

                        <div className="mt-8 pt-6 border-t border-brand-50 dark:border-brand-800 space-y-4">
                            <div className="flex justify-between items-center text-[10px] font-bold opacity-60">
                                <span>TYPE: {app.type}</span>
                                <span className="flex items-center gap-1"><FiClock /> {app.date}</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex-1 py-3 bg-brand-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-700 transition-all">Review</button>
                                <button className="w-12 h-12 bg-gray-50 dark:bg-brand-800 border border-brand-100 dark:border-brand-700 rounded-xl flex items-center justify-center text-xs">...</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArchApprovals;
