import React from 'react';
import { FiUsers, FiFilter, FiUserCheck, FiCalendar, FiPlus } from 'react-icons/fi';

const DesignTeam = () => {
    const projectTeam = [
        { name: 'Ar. Rahul Sharma', role: 'Project Lead / Principal', phase: 'All Phases', load: '100%', status: 'Active' },
        { name: 'Priya Verma', role: 'Senior Designer', phase: 'Design Development', load: '60%', status: 'Active' },
        { name: 'Vikram Singh', role: '3D Visualizer', phase: 'Concept / Schematic', load: '40%', status: 'Active' },
        { name: 'Sanjay Dutt', role: 'Draftsman', phase: 'Working Drawings', load: '85%', status: 'Active' },
    ];

    return (
        <div className="space-y-10 pb-12 animate-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight uppercase tracking-tight">Project <span className="text-brand-600">Team</span></h1>
                    <p className="text-gray-500 dark:text-brand-300 mt-2 font-medium tracking-wide">Assign resources, track individual workloads, and manage team communication for designs.</p>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-brand-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all">
                    <FiPlus className="text-lg" /> Assign Member
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-indigo-900 dark:text-white">
                {projectTeam.map((member, i) => (
                    <div key={i} className="bg-white dark:bg-brand-900/30 p-8 rounded-[3rem] shadow-premium border border-brand-50/50 dark:border-brand-800/50 flex items-center justify-between hover:border-brand-600 transition-all duration-300">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-800 flex items-center justify-center text-3xl shadow-inner">👤</div>
                            <div>
                                <h3 className="text-xl font-black uppercase tracking-tight">{member.name}</h3>
                                <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest mt-1">{member.role}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Load</p>
                            <p className="text-lg font-black text-brand-600 italic">{member.load}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-brand-50/30 dark:bg-brand-900/40 p-10 rounded-[3rem] border-2 border-dashed border-brand-100 dark:border-brand-800/60 flex items-center justify-center text-center">
                <div>
                    <FiUserCheck className="text-4xl text-brand-300 mx-auto mb-4" />
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Weekly Team Meeting Scheduled: Friday, 10:00 AM</p>
                </div>
            </div>
        </div>
    );
};

export default DesignTeam;
