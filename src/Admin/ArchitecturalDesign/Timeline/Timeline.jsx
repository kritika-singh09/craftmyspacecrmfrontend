import React from 'react';
import { FiTrendingUp, FiClock, FiActivity, FiArrowRight } from 'react-icons/fi';

const DesignProgress = () => {
    const phases = [
        { name: 'Concept Design', progress: 100, hours: '120h', delay: '0d', status: 'Completed' },
        { name: 'Schematic Design', progress: 100, hours: '180h', delay: '2d', status: 'Completed' },
        { name: 'Design Development', progress: 65, hours: '240h', delay: '0d', status: 'Ongoing' },
        { name: 'Working Drawings', progress: 0, hours: '0h', delay: '0d', status: 'Upcoming' },
    ];

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight uppercase tracking-tight">Design <span className="text-brand-600">Progress</span></h1>
                    <p className="text-gray-800 dark:text-brand-300 mt-2 font-medium tracking-wide">Detailed analytics on time spent, phase completion, and delivery performance.</p>
                </div>
                <div className="flex items-center gap-3 bg-brand-50 dark:bg-brand-900/40 px-6 py-3 rounded-2xl border border-brand-100 dark:border-brand-800 font-black text-[10px] text-brand-600 uppercase tracking-widest">
                    <FiTrendingUp className="text-lg" /> Overall: 68%
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-8">
                    {phases.map((p, i) => (
                        <div key={i} className="bg-white dark:bg-brand-900/30 p-8 rounded-[2.5rem] shadow-premium border border-brand-50/50 dark:border-brand-800/50 relative overflow-hidden group">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">{p.name}</h3>
                                    <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${p.status === 'Completed' ? 'text-emerald-500' : p.status === 'Ongoing' ? 'text-brand-500' : 'text-gray-900'}`}>{p.status}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-black text-brand-600">{p.progress}%</p>
                                    {p.delay !== '0d' && <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest">Delay: {p.delay}</span>}
                                </div>
                            </div>

                            <div className="h-2 bg-brand-50 dark:bg-brand-800 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-600 transition-all duration-1000" style={{ width: `${p.progress}%` }}></div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-brand-50 dark:border-brand-800 flex justify-between items-center">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <FiClock className="text-brand-600 text-sm" />
                                        <span className="text-[10px] font-bold text-gray-800 uppercase tracking-widest">Logged: {p.hours}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FiActivity className="text-emerald-600 text-sm" />
                                        <span className="text-[10px] font-bold text-gray-800 uppercase tracking-widest">Productivity: High</span>
                                    </div>
                                </div>
                                <FiArrowRight className="text-brand-600 group-hover:translate-x-2 transition-transform" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-10">
                    <div className="bg-indigo-900 p-12 rounded-[3.5rem] shadow-brand-xl text-white relative overflow-hidden h-full flex flex-col justify-center">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-600 opacity-20 rounded-full -mr-40 -mt-40 blur-3xl animate-pulse"></div>
                        <h4 className="text-3xl font-black tracking-tight mb-4 uppercase tracking-wide">Analysis Mode</h4>
                        <p className="text-brand-100 font-medium opacity-80 leading-relaxed mb-10">
                            Based on current progress, the "Design Development" phase is projected to finish 3 days ahead of schedule. "Working Drawings" can begin on Jan 22nd.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-6 bg-white/10 rounded-3xl border border-white/10">
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Avg Time / Rev</p>
                                <h5 className="text-3xl font-black mt-1">4.2h</h5>
                            </div>
                            <div className="p-6 bg-white/10 rounded-3xl border border-white/10">
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Efficiency</p>
                                <h5 className="text-3xl font-black mt-1">+12%</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesignProgress;
