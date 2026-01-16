import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiSearch, FiFilter, FiBriefcase, FiArrowRight, FiEye, FiEdit3 } from 'react-icons/fi';

const ArchProjects = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const projects = [
        { id: 'PRJ-ARCH-001', name: 'The Zenith Residency', client: 'Skyline Corp', type: 'Residential', phase: 'Design Development', status: 'Ongoing', start: '2023-10-12', progress: 65, color: 'brand' },
        { id: 'PRJ-ARCH-002', name: 'Blue Ocean Resort', client: 'Coastal Dreams', type: 'Commercial', phase: 'Schematic Design', status: 'Pending', start: '2023-11-05', progress: 20, color: 'emerald' },
        { id: 'PRJ-ARCH-003', name: 'Eco-Park Landscaping', client: 'Green Future', type: 'Landscape', phase: 'Authority Approval', status: 'Ongoing', start: '2023-12-01', progress: 45, color: 'teal' },
        { id: 'PRJ-ARCH-004', name: 'Cyber IT Towers', client: 'Nexus IT', type: 'Urban Planning', phase: 'Working Drawings', status: 'Review', start: '2023-09-15', progress: 85, color: 'indigo' },
        { id: 'PRJ-ARCH-005', name: 'Heritage Villa', client: 'Royal Estates', type: 'Residential', phase: 'Concept Design', status: 'Ongoing', start: '2024-01-10', progress: 10, color: 'amber' },
    ];

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                        <span className="bg-brand-600 w-1.5 h-10 rounded-full"></span>
                        Architectural Projects
                    </h1>
                    <p className="text-gray-800 dark:text-brand-300 mt-2 font-medium tracking-wide italic">
                        Visualizing, designing, and managing spaces across all project types.
                    </p>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-600 to-brand-700 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all">
                    <FiPlus className="text-lg" /> Create Design Project
                </button>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col md:flex-row gap-6">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-600 text-xl" />
                    <input
                        type="text"
                        placeholder="Search by project name or code..."
                        className="w-full bg-white dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800 rounded-2xl pl-16 pr-6 py-4 text-sm font-bold text-gray-800 dark:text-white shadow-premium outline-none focus:ring-4 focus:ring-brand-500/10 transition-all uppercase tracking-wide"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-6 py-4 bg-white dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800 rounded-2xl font-black text-[10px] uppercase tracking-widest text-gray-800 dark:text-brand-200 shadow-premium hover:bg-gray-50 transition-all">
                        <FiFilter /> Project Types
                    </button>
                    <button className="flex items-center gap-2 px-6 py-4 bg-white dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800 rounded-2xl font-black text-[10px] uppercase tracking-widest text-gray-800 dark:text-brand-200 shadow-premium hover:bg-gray-50 transition-all">
                        Latest First
                    </button>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {projects.map((prj) => (
                    <div key={prj.id} className="group overflow-hidden bg-white dark:bg-brand-900/30 rounded-[3rem] shadow-premium hover:shadow-premium-xl border border-brand-50/50 dark:border-brand-800/50 transition-all duration-500 flex flex-col md:flex-row">
                        <div className="md:w-1.5 h-full bg-brand-600"></div>
                        <div className="flex-1 p-8 lg:p-10 space-y-8 text-indigo-900 dark:text-white">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-[10px] font-black text-brand-600 uppercase tracking-[0.2em]">{prj.id}</span>
                                    <h3 className="text-2xl font-black tracking-tight mt-1 group-hover:text-brand-600 transition-colors uppercase tracking-wide">{prj.name}</h3>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                        <p className="text-xs font-bold text-gray-900 dark:text-brand-400">Client: <span className="text-gray-900 dark:text-brand-100 uppercase tracking-tight">{prj.client}</span></p>
                                    </div>
                                </div>
                                <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${prj.status === 'Ongoing' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                                    }`}>
                                    {prj.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-gray-900 uppercase tracking-widest">Project Type</p>
                                    <p className="text-sm font-bold opacity-80 uppercase tracking-tight">{prj.type}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-gray-900 uppercase tracking-widest">Current Phase</p>
                                    <p className="text-sm font-bold text-brand-600 uppercase tracking-tight italic">{prj.phase}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <span className="text-[9px] font-black text-gray-900 uppercase tracking-widest">Progress</span>
                                    <span className="text-xs font-black text-brand-600">{prj.progress}%</span>
                                </div>
                                <div className="h-2 bg-brand-50 dark:bg-brand-800 rounded-full overflow-hidden p-0.5 shadow-inner">
                                    <div className="h-full bg-gradient-to-r from-brand-600 to-indigo-600 rounded-full transition-all duration-1000 shadow-brand-sm" style={{ width: `${prj.progress}%` }}></div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-brand-50/50 dark:border-brand-800/50 flex justify-between items-center">
                                <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">Started: {prj.start}</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => navigate(`/arch-projects/${prj.id}`)}
                                        className="p-4 bg-brand-50 dark:bg-brand-800 hover:bg-brand-600 dark:hover:bg-brand-500 text-brand-600 dark:text-brand-200 hover:text-white rounded-2xl shadow-sm transition-all"
                                    >
                                        <FiEye className="text-lg" />
                                    </button>
                                    <button className="p-4 bg-gray-50 dark:bg-brand-900 border border-brand-100 dark:border-brand-800 text-gray-900 hover:bg-white transition-all rounded-2xl shadow-sm">
                                        <FiEdit3 className="text-lg" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArchProjects;
