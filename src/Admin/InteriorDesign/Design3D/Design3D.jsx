import React from 'react';
import { FiImage, FiUpload, FiDownload, FiMessageSquare, FiRefreshCw, FiExternalLink } from 'react-icons/fi';

const IntDesign3D = () => {
    const renders = [
        { id: 1, name: 'Master Bedroom - View 1', type: 'Photorealistic Render', date: 'Jan 12', version: 'V2', status: 'Awaiting Feedback' },
        { id: 2, name: 'Living Room - Panoramic', type: '360 View', date: 'Jan 10', version: 'V1', status: 'Approved' },
        { id: 3, name: 'Kitchen Layout', type: '2D Drawing', date: 'Jan 08', version: 'V3', status: 'Revision Requested' },
    ];

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight uppercase tracking-tight">Drawings <span className="text-orange-600">& 3D Views</span></h1>
                    <p className="text-gray-800 dark:text-orange-300 mt-2 font-medium tracking-wide">High-fidelity visualization repository and technical furniture layouts.</p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-3 px-8 py-4 bg-white dark:bg-brand-900/40 border border-orange-100 dark:border-brand-800 rounded-2xl font-black text-xs uppercase tracking-widest text-orange-600 shadow-premium">
                        <FiRefreshCw /> Version History
                    </button>
                    <button className="flex items-center gap-3 px-8 py-4 bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all">
                        <FiUpload className="text-lg" /> Upload Render
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {renders.map((render, i) => (
                    <div key={i} className="group bg-white dark:bg-brand-900/40 rounded-[3.5rem] shadow-premium border border-orange-50/50 dark:border-brand-800/50 overflow-hidden hover:border-orange-500 transition-all duration-500">
                        <div className="aspect-video bg-orange-100 dark:bg-brand-800 flex flex-col items-center justify-center text-gray-900 relative overflow-hidden">
                            <FiImage className="text-5xl opacity-20" />
                            <p className="text-[10px] font-black uppercase tracking-widest mt-2">{render.type}</p>
                            <div className="absolute inset-0 bg-orange-600/0 group-hover:bg-orange-600/80 transition-all flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
                                <button className="w-12 h-12 bg-white text-orange-600 rounded-2xl flex items-center justify-center text-xl shadow-xl hover:scale-110 transition-transform"><FiExternalLink /></button>
                                <button className="w-12 h-12 bg-white text-orange-600 rounded-2xl flex items-center justify-center text-xl shadow-xl hover:scale-110 transition-transform"><FiDownload /></button>
                            </div>
                        </div>
                        <div className="p-8 space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">{render.name}</h4>
                                    <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mt-1">{render.date} • {render.version}</p>
                                </div>
                                <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg border ${render.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                    render.status === 'Revision Requested' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                                    }`}>{render.status}</span>
                            </div>
                            <button className="w-full flex items-center justify-center gap-2 py-3 bg-orange-50 dark:bg-brand-800/50 text-orange-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all">
                                <FiMessageSquare /> View Comments
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IntDesign3D;
