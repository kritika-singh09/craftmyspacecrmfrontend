import React, { useState } from 'react';
import { FiUpload, FiFolder, FiFile, FiDownload, FiEye, FiShare2, FiMoreVertical, FiPlus } from 'react-icons/fi';

const Drawings = () => {
    const [drawings] = useState([
        { id: 1, title: 'Ground Floor Plan', type: 'Plan', phase: 'Working Drawings', format: 'DWG', size: '4.2 MB', date: '2024-01-14', version: 'R3', author: 'Rahul Sharma' },
        { id: 2, title: 'Front Elevation', type: 'Elevation', phase: 'Schematic Design', format: 'PDF', size: '1.8 MB', date: '2024-01-12', version: 'R1', author: 'Priya Verma' },
        { id: 3, title: 'Section A-A', type: 'Section', phase: 'Design Development', format: 'JPG', size: '2.4 MB', date: '2024-01-10', version: 'R2', author: 'Vikram Singh' },
        { id: 4, title: '3D Exterior Render', type: '3D View', phase: 'Concept Design', format: 'PNG', size: '12.5 MB', date: '2024-01-05', version: 'R1', author: 'Vikram Singh' },
    ]);

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                        <span className="bg-brand-600 w-1.5 h-10 rounded-full"></span>
                        Drawings Management
                    </h1>
                    <p className="text-gray-800 dark:text-brand-300 mt-2 font-medium tracking-wide">
                        Repository for all project blueprints, elevations, and 3D visualizations.
                    </p>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-brand-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all">
                    <FiUpload className="text-lg" /> Upload Drawing
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {drawings.map((doc) => (
                    <div key={doc.id} className="group relative bg-white dark:bg-brand-900/30 p-8 rounded-[2.5rem] shadow-premium border border-brand-50/50 dark:border-brand-800/50 hover:shadow-premium-xl transition-all duration-500 overflow-hidden">
                        <div className="absolute top-0 right-0 p-6">
                            <button className="text-gray-900 hover:text-brand-600 transition-colors"><FiMoreVertical /></button>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-24 bg-brand-50 dark:bg-brand-900/50 rounded-2xl flex flex-col items-center justify-center relative mb-6 group-hover:scale-110 transition-transform duration-500">
                                <FiFile className="text-4xl text-brand-600" />
                                <span className="absolute bottom-2 bg-brand-600 text-[8px] font-black text-white px-2 py-0.5 rounded-md uppercase tracking-widest">{doc.format}</span>
                            </div>

                            <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight leading-tight px-2">{doc.title}</h3>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="px-2 py-0.5 bg-brand-50 dark:bg-brand-800 text-brand-600 text-[8px] font-black uppercase tracking-widest rounded-md border border-brand-100 dark:border-brand-700">{doc.version}</span>
                                <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">{doc.type}</p>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-brand-50 dark:border-brand-800 space-y-4">
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-gray-900 uppercase tracking-widest">Phase</p>
                                <p className="text-xs font-bold text-gray-900 dark:text-brand-200">{doc.phase}</p>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[9px] font-black text-gray-900 uppercase tracking-widest">Size / Date</p>
                                    <p className="text-xs font-bold text-gray-800">{doc.size} • {doc.date}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900 flex items-center justify-center text-brand-600 hover:bg-brand-600 hover:text-white shadow-sm transition-all"><FiEye /></button>
                                    <button className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900 flex items-center justify-center text-brand-600 hover:bg-brand-600 hover:text-white shadow-sm transition-all"><FiDownload /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add New Placeholder Card */}
                <div className="hidden lg:flex border-4 border-dashed border-brand-50 dark:border-brand-800/40 rounded-[2.5rem] items-center justify-center p-12 hover:border-brand-600/40 transition-colors cursor-pointer group">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-brand-50 dark:bg-brand-900 flex items-center justify-center text-2xl text-brand-400 group-hover:scale-110 transition-transform">
                            <FiPlus />
                        </div>
                        <p className="text-[10px] font-black text-gray-900 dark:text-brand-400 uppercase tracking-widest">Add New Drawing</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Drawings;
