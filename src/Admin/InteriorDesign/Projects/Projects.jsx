import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiSearch, FiFilter, FiHome, FiMapPin, FiClock, FiActivity, FiBriefcase } from 'react-icons/fi';

const IntProjects = () => {
    const navigate = useNavigate();
    const projects = [
        { id: 'INT-2024-01', name: 'Velvet Villa', client: 'Rohit Khanna', type: 'Residential (Luxury)', status: 'Design Phase', budget: '₹45L', progress: 45 },
        { id: 'INT-2024-03', name: 'Neon Office Hub', client: 'TechNova Pvt Ltd', type: 'Commercial (Tech)', status: 'Material Selection', budget: '₹1.2 Cr', progress: 30 },
        { id: 'INT-2024-05', name: 'Serene Spa', client: 'Alaya Wellness', type: 'Retail (Wellness)', status: 'Site Execution', budget: '₹28L', progress: 75 },
        { id: 'INT-2024-08', name: 'Minimalist Loft', client: 'Aditya Roy', type: 'Residential (Loft)', status: 'Closure', budget: '₹15L', progress: 95 },
    ];

    return (
        <div className="space-y-10 pb-12 animate-in slide-in-from-right-8 duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-black dark:text-white tracking-tight uppercase tracking-tight">Interior <span className="text-orange-700 font-black">Portfolios</span></h1>
                    <p className="text-black dark:text-orange-300 mt-2 font-black tracking-wide">Track all ongoing residence, retail, and commercial interior transformations.</p>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all">
                    <FiPlus className="text-lg" /> New Interior Plan
                </button>
            </div>

            <div className="bg-white dark:bg-brand-900/30 p-8 rounded-[3rem] shadow-premium border border-orange-200 dark:border-brand-800/50 flex flex-col md:flex-row gap-6">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-orange-600 text-lg" />
                    <input type="text" placeholder="Search project, client or budget..." className="w-full bg-orange-50/20 dark:bg-brand-800/50 border border-orange-200 dark:border-brand-700 rounded-3xl py-4 pl-14 pr-6 text-sm font-bold text-black dark:text-white focus:outline-none" />
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-brand-800 border border-orange-200 dark:border-brand-700 rounded-2xl text-[10px] font-black uppercase tracking-widest text-black dark:text-brand-300"><FiFilter /> Type</button>
                    <button className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-brand-800 border border-orange-200 dark:border-brand-700 rounded-2xl text-[10px] font-black uppercase tracking-widest text-black dark:text-brand-300"><FiActivity /> Status</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {projects.map((project, i) => (
                    <div
                        key={i}
                        onClick={() => navigate(`/int-projects/${project.id}`)}
                        className="group bg-white dark:bg-brand-900/30 rounded-[3.5rem] shadow-premium border border-orange-50/50 dark:border-brand-800/50 overflow-hidden cursor-pointer hover:border-orange-500 transition-all duration-500 hover:-translate-y-3"
                    >
                        {/* Project Header Card */}
                        <div className="p-10 pb-0 flex justify-between items-start relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform"></div>
                            <div className="relative z-10">
                                <p className="text-[10px] font-black text-orange-700 uppercase tracking-[0.3em] mb-2">{project.id}</p>
                                <h3 className="text-2xl font-black text-black dark:text-white uppercase tracking-tight leading-tight group-hover:text-orange-700 transition-colors uppercase">{project.name}</h3>
                                <p className="text-xs font-black text-gray-900 mt-1">Client: <span className="text-black dark:text-white underline decoration-orange-500">{project.client}</span></p>
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-brand-800 flex items-center justify-center text-4xl shadow-inner relative z-10">🎨</div>
                        </div>

                        {/* Project Body */}
                        <div className="px-10 py-8 space-y-6 text-indigo-900 dark:text-white">
                            <div className="flex justify-between items-center bg-orange-50/30 dark:bg-brand-800/20 p-4 rounded-2xl border border-orange-50 dark:border-brand-800">
                                <div className="text-center">
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Budget</p>
                                    <p className="text-sm font-black text-orange-600">{project.budget}</p>
                                </div>
                                <div className="w-px h-8 bg-orange-100 dark:bg-brand-700"></div>
                                <div className="text-center">
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Type</p>
                                    <p className="text-[10px] font-black uppercase tracking-tight">{project.type.split(' ')[0]}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                    <span className="text-gray-400">Completion</span>
                                    <span className="text-orange-600 italic">{project.progress}%</span>
                                </div>
                                <div className="h-2 bg-orange-50 dark:bg-brand-800 rounded-full overflow-hidden p-0.5">
                                    <div className="h-full bg-orange-500 rounded-full transition-all duration-1000 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.5)]" style={{ width: `${project.progress}%` }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="px-10 py-6 bg-orange-50/20 dark:bg-brand-900/50 border-t border-orange-50 dark:border-brand-800 flex justify-between items-center group-hover:bg-orange-600 transition-all duration-500">
                            <span className="text-[10px] font-black text-orange-600 dark:text-orange-400 group-hover:text-white uppercase tracking-widest">{project.status}</span>
                            <span className="text-orange-300 group-hover:translate-x-2 transition-transform">→</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IntProjects;
