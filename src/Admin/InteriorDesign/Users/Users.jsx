import React from 'react';
import { FiUser, FiMail, FiPhone, FiShield, FiBriefcase, FiPlus, FiSearch, FiFilter, FiUserCheck } from 'react-icons/fi';

const IntUsers = () => {
    const users = [
        { name: 'Ar. Sameer Sen', role: 'Chief Designer', email: 'sameer@artisan.id', projects: '08', status: 'Active' },
        { name: 'Megha Gupta', role: '3D Visualizer', email: 'megha@artisan.id', projects: '12', status: 'Active' },
        { name: 'Rohit Verma', role: 'Site Supervisor', email: 'rohit@artisan.id', projects: '04', status: 'On Site' },
        { name: 'Karan Mehra', role: 'Vendor Coordinator', email: 'karan@artisan.id', projects: 'All', status: 'Active' },
        { name: 'Anjali Sharma', role: 'Accountant', email: 'billing@artisan.id', projects: 'Admin', status: 'Active' },
    ];

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-black dark:text-white tracking-tight uppercase tracking-tight">Team <span className="text-orange-600">Personnel</span></h1>
                    <p className="text-black dark:text-orange-300 mt-2 font-medium tracking-wide">Manage internal designers, site supervisors, and coordination staff.</p>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all">
                    <FiPlus className="text-lg" /> Add Team Member
                </button>
            </div>

            {/* Role Distribution Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {[
                    { role: 'Designer', count: 4 },
                    { role: '3D Artist', count: 2 },
                    { role: 'Supervisor', count: 3 },
                    { role: 'Coordinator', count: 1 },
                    { role: 'Accounts', count: 1 },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-brand-900/30 p-6 rounded-[2.5rem] shadow-premium border border-orange-50 dark:border-brand-800 text-center group hover:bg-orange-600 transition-all duration-300">
                        <p className="text-2xl font-black text-indigo-900 dark:text-white group-hover:text-white tracking-tighter">{stat.count}</p>
                        <p className="text-[9px] font-black text-gray-950 group-hover:text-orange-100 uppercase tracking-widest mt-1">{stat.role}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-brand-900/30 rounded-[3.5rem] shadow-premium border border-orange-50/50 dark:border-orange-800/50 overflow-hidden">
                <div className="p-10 border-b border-orange-50 dark:border-brand-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="relative w-full md:w-96">
                        <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-orange-500 text-lg" />
                        <input type="text" placeholder="Search by name, role or project..." className="w-full bg-orange-50/50 dark:bg-brand-800/50 border border-orange-100 dark:border-brand-700 rounded-3xl py-4 pl-14 pr-6 text-sm font-bold text-indigo-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20" />
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-brand-800 border border-orange-50 dark:border-brand-700 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-950 dark:text-brand-300 hover:bg-orange-50 transition-all"><FiFilter /> Filter Roles</button>
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-brand-800 border border-orange-50 dark:border-brand-700 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-950 dark:text-brand-300 hover:bg-orange-50 transition-all"><FiBriefcase /> Workload</button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-orange-50/20 dark:bg-brand-900/50">
                                {['Team Member', 'Specialization', 'Projects', 'Status', 'Actions'].map(h => (
                                    <th key={h} className="px-10 py-6 text-[10px] font-black text-orange-600 uppercase tracking-widest">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-orange-50 dark:divide-brand-800">
                            {users.map((user, i) => (
                                <tr key={i} className="group hover:bg-orange-50/20 dark:hover:bg-orange-900/10 transition-colors">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-brand-800 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">👤</div>
                                            <div>
                                                <p className="text-sm font-black text-black dark:text-white uppercase tracking-tight">{user.name}</p>
                                                <p className="text-[10px] font-bold text-gray-950 group-hover:text-orange-500 transition-colors">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className="px-4 py-1.5 bg-brand-50 dark:bg-brand-800 text-indigo-700 dark:text-brand-300 text-[9px] font-black uppercase tracking-widest rounded-xl border border-brand-100 dark:border-brand-700 uppercase">{user.role}</span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <p className="text-xs font-black text-indigo-900 dark:text-white italic">{user.projects} Assignments</p>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-orange-500'}`}></div>
                                            <span className="text-[10px] font-black text-gray-950 dark:text-brand-400 uppercase tracking-widest">{user.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <button className="text-[10px] font-black text-orange-600 uppercase tracking-widest hover:underline">Edit Profile</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-orange-50/50 dark:bg-brand-900/40 p-10 rounded-[3rem] border-2 border-dashed border-orange-200 dark:border-brand-800/60 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <FiUserCheck className="text-4xl text-orange-400" />
                    <div>
                        <h4 className="text-lg font-black text-indigo-900 dark:text-white uppercase tracking-tight">Resource Optimization</h4>
                        <p className="text-xs font-medium text-gray-500 dark:text-brand-300">Currently 82% of design staff is at peak capacity. Consider delay in new mood board assignments.</p>
                    </div>
                </div>
                <button className="px-8 py-4 bg-indigo-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all">View Analytics</button>
            </div>
        </div>
    );
};

export default IntUsers;
