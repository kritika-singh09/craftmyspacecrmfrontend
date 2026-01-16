import React from 'react';
import { FiFolder, FiFile, FiLock, FiUpload, FiDownload, FiSearch, FiArchive } from 'react-icons/fi';

const IntDocuments = () => {
    const folders = [
        { name: 'Agreement Documents', files: 4, size: '2.4 MB' },
        { name: 'Working Drawings', files: 18, size: '42.8 MB' },
        { name: 'Bespoke Furniture Quotes', files: 7, size: '3.1 MB' },
        { name: 'Site Photographs', files: 242, size: '1.2 GB' },
        { name: 'Handover & Warranty', files: 0, size: '0.0 MB' },
    ];

    return (
        <div className="space-y-10 pb-12 animate-in zoom-in-95 duration-700 text-indigo-900 dark:text-white">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight uppercase tracking-tight">Asset <span className="text-orange-600">Vault</span></h1>
                    <p className="text-gray-800 dark:text-orange-300 mt-2 font-medium tracking-wide">Secure repository for legal agreements, site media, and technical handovers.</p>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all">
                    <FiUpload className="text-lg" /> Upload Document
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {folders.map((folder, i) => (
                    <div key={i} className="group bg-white dark:bg-brand-900/40 p-10 rounded-[3.5rem] shadow-premium border border-orange-50/50 dark:border-brand-800/50 hover:bg-orange-50/20 transition-all duration-300 cursor-pointer">
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-16 h-16 rounded-[1.5rem] bg-orange-50 dark:bg-brand-800 flex items-center justify-center text-3xl text-orange-600 shadow-inner group-hover:scale-110 transition-transform"><FiFolder /></div>
                            <div className="text-right">
                                <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">{folder.files} Items</p>
                                <p className="text-[9px] font-bold text-orange-500 italic uppercase">{folder.size}</p>
                            </div>
                        </div>
                        <h4 className="text-xl font-black uppercase tracking-tight mb-2 group-hover:text-orange-600 transition-colors uppercase">{folder.name}</h4>
                        <div className="mt-8 flex gap-4">
                            <button className="px-6 py-2 bg-indigo-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all">Open</button>
                            <button className="px-6 py-2 bg-white dark:bg-brand-800 border border-orange-100 dark:border-brand-700 rounded-xl text-[9px] font-black uppercase tracking-widest hover:text-orange-600 transition-all">Archive</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-orange-900 rounded-[3rem] p-10 text-white flex flex-col md:flex-row justify-between items-center shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/30 rounded-full -mr-40 -mt-40 blur-3xl"></div>
                <div className="flex items-center gap-8 relative z-10">
                    <div className="w-20 h-20 rounded-[2rem] bg-white/10 flex items-center justify-center text-4xl shadow-inner"><FiLock /></div>
                    <div>
                        <h4 className="text-2xl font-black uppercase tracking-tight mb-1">Encrypted Storage</h4>
                        <p className="text-orange-100 font-medium opacity-80 max-w-sm">All interior layouts and vendor quotes are encrypted and stored in private cloud sectors.</p>
                    </div>
                </div>
                <button className="mt-8 md:mt-0 px-8 py-4 bg-white text-orange-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all relative z-10">Security Settings</button>
            </div>
        </div>
    );
};

export default IntDocuments;
