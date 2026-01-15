import React from 'react';
import { FiBriefcase, FiActivity, FiCheckCircle, FiClock, FiDollarSign, FiUsers, FiTrendingUp } from 'react-icons/fi';

const ArchDashboard = () => {
    const stats = [
        { label: 'Total Projects', value: '24', icon: <FiBriefcase />, color: 'hsl(215, 80%, 50%)', gradient: 'from-blue-500 to-indigo-600', sub: 'Across all categories' },
        { label: 'Active Projects', value: '18', icon: <FiActivity />, color: 'hsl(145, 70%, 45%)', gradient: 'from-emerald-500 to-teal-600', sub: 'In ongoing design' },
        { label: 'Pending Approvals', value: '07', icon: <FiCheckCircle />, color: 'hsl(35, 90%, 50%)', gradient: 'from-amber-500 to-orange-600', sub: 'Awaiting client feedback' },
        { label: 'Revenue Expected', value: '₹42L', icon: <FiDollarSign />, color: 'hsl(280, 70%, 50%)', gradient: 'from-purple-500 to-pink-600', sub: 'Milestone billing' },
    ];

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                        Architectural <span className="text-brand-600">Dashboard</span>
                    </h1>
                    <p className="text-gray-500 dark:text-brand-300 mt-2 font-medium tracking-wide">
                        Real-time snapshot of your design firm's performance and operations.
                    </p>
                </div>
                <div className="flex gap-4">
                    <button className="px-6 py-3 bg-white dark:bg-brand-900/40 border border-brand-100 dark:border-brand-800 rounded-2xl font-bold text-sm text-gray-600 dark:text-brand-200 shadow-premium hover:shadow-premium-xl transition-all">
                        Generate Report
                    </button>
                    <button className="px-6 py-3 bg-brand-600 text-white rounded-2xl font-black text-sm shadow-brand hover:shadow-brand-lg transition-all active:scale-95">
                        New Project
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                    <div key={i} className="group relative overflow-hidden bg-white dark:bg-brand-900/30 p-8 rounded-[2.5rem] shadow-premium hover:shadow-premium-2xl border border-brand-50/50 dark:border-brand-800/50 transition-all duration-500 hover:-translate-y-2">
                        <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[10px] font-black text-gray-400 dark:text-brand-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                                <h3 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">{stat.value}</h3>
                                <p className="text-[10px] font-bold text-brand-500 mt-2 italic">{stat.sub}</p>
                            </div>
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white text-2xl shadow-lg shadow-brand/20`}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Pending Approvals List */}
                <div className="lg:col-span-2 bg-white dark:bg-brand-900/30 rounded-[2.5rem] shadow-premium border border-brand-50/50 dark:border-brand-800/50 flex flex-col p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h4 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Pending Approvals</h4>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Design feedback cycle</p>
                        </div>
                        <button className="text-brand-600 dark:text-brand-400 text-xs font-black uppercase tracking-widest hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { project: 'The Zenith Residency', phase: 'Schematic Design', time: '2h ago', status: 'Pending Review' },
                            { project: 'Blue Ocean Resort', phase: 'Design Development', time: '5h ago', status: 'R2 Pending' },
                            { project: 'Urban IT Park', phase: 'Working Drawings', time: '1d ago', status: 'Client Meeting' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-6 bg-brand-50/30 dark:bg-brand-800/20 rounded-3xl border border-brand-50 dark:border-brand-800/40 hover:border-brand-300 dark:hover:border-brand-500 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-brand-900 shadow-sm flex items-center justify-center text-xl">📐</div>
                                    <div>
                                        <p className="text-sm font-black text-gray-800 dark:text-white group-hover:text-brand-600 transition-colors uppercase tracking-tight">{item.project}</p>
                                        <p className="text-[10px] font-bold text-gray-400">{item.phase}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 text-[9px] font-black uppercase tracking-widest rounded-lg">{item.status}</span>
                                    <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Deadlines / Timeline */}
                <div className="bg-gradient-to-b from-brand-600 to-indigo-700 rounded-[2.5rem] shadow-brand p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <h4 className="text-xl font-black tracking-tight mb-8">Upcoming Deadlines</h4>
                    <div className="space-y-8 relative z-10">
                        {[
                            { title: 'Working Drawings Submit', project: 'Zenith', date: 'Jan 18', left: '2 days' },
                            { title: 'Concept Review', project: 'Blue Ocean', date: 'Jan 20', left: '4 days' },
                            { title: 'Authority Submission', project: 'IT Park', date: 'Jan 25', left: '9 days' },
                        ].map((deadline, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-2 h-2 rounded-full bg-white shadow-brand"></div>
                                    {i !== 2 && <div className="w-0.5 h-16 bg-white/20"></div>}
                                </div>
                                <div className="flex-1 -mt-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-100">{deadline.date}</p>
                                    <h5 className="font-bold text-sm mt-1">{deadline.title}</h5>
                                    <p className="text-[10px] font-medium text-brand-200">Project: {deadline.project}</p>
                                    <span className="inline-block mt-3 px-3 py-1 bg-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest">{deadline.left} left</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Section: Revenue & Team */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-brand-900/30 rounded-[2.5rem] shadow-premium p-8 border border-brand-50/50 dark:border-brand-800/50">
                    <div className="flex justify-between items-center mb-8 text-indigo-900 dark:text-white">
                        <h4 className="text-xl font-black tracking-tight">Team Utilization</h4>
                        <FiUsers className="text-2xl opacity-50" />
                    </div>
                    <div className="space-y-6">
                        {[
                            { name: 'Sr. Arch. Rahul', load: 85, color: 'bg-brand-500' },
                            { name: 'Jr. Arch. Priya', load: 60, color: 'bg-emerald-500' },
                            { name: '3D Artist Vikram', load: 95, color: 'bg-rose-500' },
                        ].map((member, i) => (
                            <div key={i} className="space-y-2 text-indigo-900 dark:text-white">
                                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest ">
                                    <span>{member.name}</span>
                                    <span>{member.load}%</span>
                                </div>
                                <div className="h-2 bg-gray-100 dark:bg-brand-800 rounded-full overflow-hidden">
                                    <div className={`h-full ${member.color} transition-all duration-1000`} style={{ width: `${member.load}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-brand-900/30 rounded-[2.5rem] shadow-premium p-8 border border-brand-50/50 dark:border-brand-800/50 flex flex-col justify-center items-center text-center">
                    <FiTrendingUp className="text-5xl text-brand-600 mb-4 opacity-50" />
                    <h4 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Revenue per Project</h4>
                    <p className="text-gray-500 dark:text-brand-300 mt-2 font-medium max-w-sm">
                        Detailed analytic view of project-wise capital intake and pending milestones.
                    </p>
                    <button className="mt-8 px-8 py-3 bg-brand-600 text-white rounded-2xl font-black text-sm shadow-brand hover:scale-105 transition-all">
                        View Analytics
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArchDashboard;
