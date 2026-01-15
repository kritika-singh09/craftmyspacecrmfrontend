import React from 'react';
import { FiFolder, FiFileText, FiPlus, FiGrid, FiList, FiCheckCircle, FiShield, FiExternalLink } from 'react-icons/fi';

const ArchDocuments = () => {
    const categories = [
        { name: 'Agreements', count: 12, icon: '📜', color: 'brand' },
        { name: 'Authority Submissions', count: 8, icon: '🏛️', color: 'indigo' },
        { name: 'Client Approvals', count: 24, icon: '✅', color: 'emerald' },
        { name: 'Site Photos', count: 156, icon: '📸', color: 'teal' },
    ];

    const documents = [
        { name: 'Design Services Agreement.pdf', size: '2.4 MB', type: 'Agreement', date: '2024-01-10', author: 'Ar. Rahul' },
        { name: 'NOC - Fire Department.pdf', size: '1.2 MB', type: 'Authority', date: '2024-01-05', author: 'Admin' },
        { name: 'Structural Review Letter.doc', size: '0.8 MB', type: 'Coordination', date: '2023-12-28', author: 'Vikram Singh' },
    ];

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight uppercase tracking-tight">Project <span className="text-brand-600">Documents</span></h1>
                    <p className="text-gray-500 dark:text-brand-300 mt-2 font-medium tracking-wide">Secure repository for legal agreements, letters, and non-drawing project files.</p>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-brand-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all">
                    <FiPlus className="text-lg" /> Upload Document
                </button>
            </div>

            {/* Folder Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-indigo-900 dark:text-white">
                {categories.map((cat, i) => (
                    <div key={i} className="group bg-white dark:bg-brand-900/30 p-8 rounded-[2.5rem] shadow-premium border border-brand-50/50 dark:border-brand-800/50 hover:bg-brand-600 hover:border-brand-600 transition-all duration-500 cursor-pointer">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-800 group-hover:bg-white/20 flex items-center justify-center text-3xl group-hover:scale-110 transition-all">
                                {cat.icon}
                            </div>
                            <FiFolder className="text-brand-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <h3 className="text-xl font-black group-hover:text-white uppercase tracking-tight">{cat.name}</h3>
                        <p className="text-[10px] font-bold text-gray-400 dark:text-brand-400 group-hover:text-white/60 uppercase tracking-widest mt-1">{cat.count} Files</p>
                    </div>
                ))}
            </div>

            {/* Recent Files Table */}
            <div className="bg-white dark:bg-brand-900/30 rounded-[3rem] shadow-premium border border-brand-50/50 dark:border-brand-800/50 overflow-hidden">
                <div className="p-8 border-b border-brand-50 dark:border-brand-800/50 flex justify-between items-center text-indigo-900 dark:text-white">
                    <h4 className="text-lg font-black uppercase tracking-tight">Recent Uploads</h4>
                    <div className="flex gap-2">
                        <FiGrid className="text-brand-600 cursor-pointer" />
                        <FiList className="text-gray-400 cursor-pointer" />
                    </div>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-brand-50/10 dark:bg-brand-900/50">
                            {['File Name', 'Category', 'Upload Date', 'Handled By', 'Actions'].map(head => (
                                <th key={head} className="px-8 py-4 text-[9px] font-black text-brand-600 uppercase tracking-widest">{head}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-50 dark:divide-brand-800">
                        {documents.map((doc, i) => (
                            <tr key={i} className="hover:bg-brand-50/20 text-indigo-900 dark:text-white transition-colors">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-800 flex items-center justify-center text-brand-600 shadow-sm"><FiFileText /></div>
                                        <div>
                                            <p className="text-sm font-black uppercase tracking-tight">{doc.name}</p>
                                            <p className="text-[9px] font-bold text-gray-400">{doc.size}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="px-3 py-1 bg-brand-50 dark:bg-brand-900/50 text-brand-600 dark:text-brand-300 text-[9px] font-black uppercase tracking-widest rounded-lg">{doc.type}</span>
                                </td>
                                <td className="px-8 py-6 text-xs font-bold text-gray-500">{doc.date}</td>
                                <td className="px-8 py-6 text-xs font-bold text-gray-500">{doc.author}</td>
                                <td className="px-8 py-6">
                                    <button className="p-3 bg-brand-50 dark:bg-brand-800 text-brand-600 dark:text-brand-200 rounded-xl hover:bg-brand-600 hover:text-white transition-all shadow-sm">
                                        <FiExternalLink />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex gap-8">
                <div className="flex-1 bg-white dark:bg-brand-900/30 p-10 rounded-[3rem] shadow-premium border-2 border-dashed border-brand-100 dark:border-brand-800/60 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-brand-50 dark:bg-brand-900/80 flex items-center justify-center text-2xl text-brand-400 shadow-inner">
                        <FiShield />
                    </div>
                    <div>
                        <h5 className="font-black text-gray-900 dark:text-white uppercase tracking-tight">Bank-Grade Encryption</h5>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">All project documents are encrypted and synchronized.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArchDocuments;
