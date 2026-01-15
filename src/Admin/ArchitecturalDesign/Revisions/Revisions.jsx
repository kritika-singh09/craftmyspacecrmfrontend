import React from 'react';
import { FiRefreshCw, FiAlertCircle, FiCheck, FiX, FiFileText } from 'react-icons/fi';

const Revisions = () => {
    const revisions = [
        { id: 'REV-001', doc: 'Ground Floor Plan', revNo: 'R3', reason: 'Client requested larger balcony in master bedroom', author: 'Rahul Sharma', date: '2024-01-14', status: 'Pending Approval' },
        { id: 'REV-002', doc: 'Front Elevation', revNo: 'R2', reason: 'Structural alignment adjustment', author: 'Priya Verma', date: '2024-01-10', status: 'Approved' },
        { id: 'REV-003', doc: 'Section B-B', revNo: 'R1', reason: 'MEP coordination clash fix', author: 'Vikram Singh', date: '2024-01-05', status: 'Approved' },
    ];

    return (
        <div className="space-y-10 pb-12 animate-in slide-in-from-right-8 duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight uppercase tracking-tight">Revision <span className="text-brand-600">History</span></h1>
                    <p className="text-gray-500 dark:text-brand-300 mt-2 font-medium">Track changes, versioning, and approval status for all architectural revisions.</p>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-brand-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all">
                    <FiRefreshCw className="text-lg" /> Log New Revision
                </button>
            </div>

            <div className="bg-white dark:bg-brand-900/30 rounded-[3rem] shadow-premium border border-brand-50/50 dark:border-brand-800/50 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-brand-50/50 dark:bg-brand-900/50">
                            {['Revision ID', 'Drawing Name', 'Version', 'Reason', 'Revised By', 'Status'].map(head => (
                                <th key={head} className="px-8 py-6 text-[10px] font-black text-brand-600 uppercase tracking-widest">{head}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-50 dark:divide-brand-800">
                        {revisions.map((rev) => (
                            <tr key={rev.id} className="hover:bg-brand-50/20 dark:hover:bg-brand-800/10 transition-colors">
                                <td className="px-8 py-6 font-black text-xs text-gray-400 tracking-widest">{rev.id}</td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-800 flex items-center justify-center text-brand-600">
                                            <FiFileText />
                                        </div>
                                        <p className="text-sm font-black text-gray-800 dark:text-white uppercase tracking-tight">{rev.doc}</p>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-sm font-black text-brand-600 italic">{rev.revNo}</td>
                                <td className="px-8 py-6 max-w-xs">
                                    <p className="text-xs font-bold text-gray-500 dark:text-brand-300 italic">"{rev.reason}"</p>
                                </td>
                                <td className="px-8 py-6 text-xs font-bold text-gray-600 dark:text-brand-200">{rev.author}</td>
                                <td className="px-8 py-6">
                                    <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${rev.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                                        }`}>
                                        {rev.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex gap-8">
                <div className="flex-1 bg-amber-50/50 dark:bg-amber-900/10 p-8 rounded-[2.5rem] border border-amber-100 dark:border-amber-900/40 flex items-start gap-6">
                    <FiAlertCircle className="text-4xl text-amber-600 shrink-0" />
                    <div>
                        <h4 className="text-lg font-black text-amber-800 dark:text-amber-400 uppercase tracking-tight">Critical Revisions Pending</h4>
                        <p className="text-xs font-medium text-amber-700 dark:text-amber-500 mt-1">There are 4 high-priority revisions that require principal architect approval before authority submission.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Revisions;
