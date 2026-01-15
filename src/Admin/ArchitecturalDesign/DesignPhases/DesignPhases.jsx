import React from 'react';
import { FiCheckCircle, FiClock, FiPlayCircle, FiPauseCircle, FiTrendingUp } from 'react-icons/fi';

const DesignPhases = () => {
    const phases = [
        { name: 'Concept Design', status: 'Completed', progress: 100, color: 'brand' },
        { name: 'Schematic Design', status: 'In Progress', progress: 75, color: 'indigo' },
        { name: 'Design Development', status: 'Upcoming', progress: 0, color: 'emerald' },
        { name: 'Working Drawings', status: 'Upcoming', progress: 0, color: 'teal' },
        { name: 'Authority Approval', status: 'Upcoming', progress: 0, color: 'blue' },
        { name: 'Construction Support', status: 'Upcoming', progress: 0, color: 'purple' },
    ];

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight uppercase tracking-wide">Design <span className="text-brand-600">Phases</span></h1>
                    <p className="text-gray-500 dark:text-brand-300 mt-2 font-medium">Standardized architectural workflow from concept to construction support.</p>
                </div>
                <button className="px-8 py-4 bg-white dark:bg-brand-900/40 border border-brand-100 dark:border-brand-800 rounded-2xl font-black text-xs uppercase tracking-widest text-brand-600 shadow-premium hover:shadow-premium-xl transition-all">
                    Configure Templates
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {phases.map((phase, i) => (
                    <div key={i} className="group relative bg-white dark:bg-brand-900/30 p-10 rounded-[3rem] shadow-premium border border-brand-50/50 dark:border-brand-800/50 transition-all hover:-translate-y-2 duration-500">
                        <div className="flex justify-between items-center mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-800 flex items-center justify-center text-3xl group-hover:bg-brand-600 group-hover:text-white transition-all duration-500">
                                {phase.status === 'Completed' ? <FiCheckCircle /> : phase.status === 'In Progress' ? <FiPlayCircle className="animate-pulse" /> : <FiClock className="opacity-40" />}
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${phase.status === 'In Progress' ? 'text-brand-600' : 'text-gray-400'}`}>{phase.status}</span>
                        </div>
                        <h3 className="text-xl font-black text-gray-800 dark:text-white uppercase tracking-tight mb-6">{phase.name}</h3>

                        <div className="space-y-3">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                                <span>Phase Progress</span>
                                <span>{phase.progress}%</span>
                            </div>
                            <div className="h-2.5 bg-brand-50 dark:bg-brand-800 rounded-full overflow-hidden p-0.5 shadow-inner">
                                <div className={`h-full bg-${phase.color === 'brand' ? 'brand-600' : phase.color + '-500'} rounded-full transition-all duration-1000`} style={{ width: `${phase.progress}%` }}></div>
                            </div>
                        </div>

                        <button className="w-full mt-10 py-4 bg-brand-50/50 dark:bg-brand-800/50 hover:bg-brand-600 hover:text-white text-brand-600 dark:text-brand-300 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                            Manage Deliverables
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DesignPhases;
