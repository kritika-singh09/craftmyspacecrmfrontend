import React from 'react';
import { FiLayers, FiCheckCircle, FiClock, FiPlus, FiArrowRight } from 'react-icons/fi';

const IntPhases = () => {
    const phases = [
        { name: 'Space Planning', status: 'Completed', progress: 100, designer: 'Sameer Sen' },
        { name: 'Concept Design', status: 'Completed', progress: 100, designer: 'Sameer Sen' },
        { name: 'Mood Board', status: 'In Progress', progress: 85, designer: 'Megha Gupta' },
        { name: '3D Visualization', status: 'In Progress', progress: 40, designer: 'Megha Gupta' },
        { name: 'Working Drawings', status: 'Upcoming', progress: 0, designer: 'Sameer Sen' },
        { name: 'Site Coordination', status: 'Upcoming', progress: 0, designer: 'Rohit Verma' },
    ];

    return (
        <div className="space-y-10 pb-12 animate-in slide-in-from-right-8 duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight uppercase tracking-tight">Interior <span className="text-orange-600">Phases</span></h1>
                    <p className="text-gray-500 dark:text-orange-300 mt-2 font-medium tracking-wide">Customizable design journey from shell to handover.</p>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all">
                    Configure Template
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {phases.map((phase, i) => (
                    <div key={i} className="group relative bg-white dark:bg-brand-900/30 p-10 rounded-[3rem] shadow-premium border border-orange-50/50 dark:border-brand-800/50 transition-all hover:-translate-y-2 duration-500">
                        <div className="flex justify-between items-center mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-brand-800 flex items-center justify-center text-3xl group-hover:bg-orange-600 group-hover:text-white transition-all duration-500 shadow-inner">
                                {phase.status === 'Completed' ? <FiCheckCircle /> : <FiClock className={phase.status === 'In Progress' ? 'animate-pulse text-orange-500' : 'opacity-30'} />}
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${phase.status === 'In Progress' ? 'text-orange-600' : 'text-gray-400'}`}>{phase.status}</span>
                        </div>
                        <h3 className="text-xl font-black text-indigo-900 dark:text-white uppercase tracking-tight mb-2">{phase.name}</h3>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">In Charge: {phase.designer}</p>

                        <div className="space-y-3">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                                <span>Progress</span>
                                <span>{phase.progress}%</span>
                            </div>
                            <div className="h-2.5 bg-orange-50 dark:bg-brand-800 rounded-full overflow-hidden p-0.5 shadow-inner">
                                <div className="h-full bg-orange-600 rounded-full transition-all duration-1000" style={{ width: `${phase.progress}%` }}></div>
                            </div>
                        </div>

                        <button className="w-full mt-10 py-4 bg-brand-50/50 dark:bg-brand-800/50 hover:bg-orange-600 hover:text-white text-indigo-700 dark:text-brand-300 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">
                            Manage Deliverables <FiArrowRight />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IntPhases;
