import React from 'react';
import { FiBarChart2, FiPieChart, FiTrendingUp, FiDownload, FiFilter, FiCalendar } from 'react-icons/fi';

const ArchReports = () => {
    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight uppercase tracking-tight">Reports & <span className="text-brand-600">Analytics</span></h1>
                    <p className="text-gray-800 dark:text-brand-300 mt-2 font-medium tracking-wide">Generate performance insights, financial audits, and project telemetry.</p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-3 px-6 py-4 bg-white dark:bg-brand-900/40 border border-brand-100 dark:border-brand-800 rounded-2xl font-black text-xs uppercase tracking-widest text-gray-800 dark:text-brand-200 shadow-premium">
                        <FiCalendar /> Last 30 Days
                    </button>
                    <button className="flex items-center gap-3 px-8 py-4 bg-brand-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all">
                        <FiDownload className="text-lg" /> Export Suite
                    </button>
                </div>
            </div>

            {/* Premium Report Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {[
                    { title: 'Project Progress Report', desc: 'Overall timeline vs actual phase completion across active designs.', icon: <FiBarChart2 />, stats: '18 Active' },
                    { title: 'Revenue Tracking', desc: 'Detailed breakdown of invoice status, taxes, and pending billing units.', icon: <FiPieChart />, stats: '₹1.8 Cr In' },
                    { title: 'Revision Frequency', desc: 'Analysis of rework cycles per project to identify internal bottlenecks.', icon: <FiTrendingUp />, stats: '-15% Rework' },
                    { title: 'Team Utilization', desc: 'Workload distribution monitoring and per-architect productivity scores.', icon: <FiFilter />, stats: '82% Load' },
                ].map((report, i) => (
                    <div key={i} className="group flex bg-white dark:bg-brand-900/30 p-10 rounded-[3rem] shadow-premium border border-brand-50/50 dark:border-brand-800/50 hover:shadow-premium-xl transition-all duration-500 relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 w-32 h-32 bg-brand-600/5 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
                        <div className="flex-1 space-y-6 relative z-10 text-indigo-900 dark:text-white">
                            <div className="flex justify-between items-start">
                                <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-900/80 flex items-center justify-center text-3xl text-brand-600 shadow-sm">{report.icon}</div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 bg-emerald-50 px-4 py-2 rounded-xl">{report.stats}</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black uppercase tracking-tight">{report.title}</h3>
                                <p className="text-sm font-medium text-gray-800 dark:text-brand-300 mt-2 leading-relaxed">{report.desc}</p>
                            </div>
                            <button className="flex items-center gap-2 text-brand-600 font-black text-[10px] uppercase tracking-widest hover:gap-4 transition-all">Generate Analysis →</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-gradient-to-br from-brand-600 to-indigo-800 p-12 rounded-[4rem] text-white flex flex-col items-center justify-center text-center space-y-8 shadow-brand-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]"></div>
                <div className="relative z-10">
                    <h4 className="text-4xl font-black tracking-tight mb-2 uppercase tracking-wide">Advanced Telemetry</h4>
                    <p className="text-brand-100 font-medium opacity-80 max-w-2xl mx-auto">
                        Your firm's performance has increased by 14% this quarter compared to historical data. We recommend assigning Ar. Rahul to the new "Residential Complex" project based on his schematic design efficiency.
                    </p>
                    <div className="mt-12 flex justify-center gap-10">
                        <div className="text-center">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Efficiency</p>
                            <p className="text-5xl font-black mt-2 tracking-tighter italic">+24%</p>
                        </div>
                        <div className="text-center border-l border-white/10 pl-10">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Success Rate</p>
                            <p className="text-5xl font-black mt-2 tracking-tighter italic">98%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArchReports;
