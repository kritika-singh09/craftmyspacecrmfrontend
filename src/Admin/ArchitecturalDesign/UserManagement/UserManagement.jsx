import React, { useState } from 'react';
import { FiUserPlus, FiSearch, FiFilter, FiMail, FiPhone, FiCheck, FiX, FiCalendar, FiBriefcase } from 'react-icons/fi';

const UserManagement = () => {
    const roles = ['Principal Architect', 'Senior Architect', 'Junior Architect', 'Draftsman', '3D Visualizer', 'Accountant', 'Admin'];

    const [team, setTeam] = useState([
        { id: 1, name: 'Ar. Rahul Sharma', email: 'rahul@archdesign.com', phone: '+91 98765 43210', role: 'Principal Architect', projectCount: 5, status: 'Active' },
        { id: 2, name: 'Priya Verma', email: 'priya@archdesign.com', phone: '+91 98765 43211', role: 'Senior Architect', projectCount: 3, status: 'Active' },
        { id: 3, name: 'Vikram Singh', email: 'vikram@archdesign.com', phone: '+91 98765 43212', role: '3D Visualizer', projectCount: 8, status: 'Active' },
        { id: 4, name: 'Sanjay Dutt', email: 'sanjay@archdesign.com', phone: '+91 98765 43213', role: 'Draftsman', projectCount: 12, status: 'Inactive' },
        { id: 5, name: 'Ananya Roy', email: 'ananya@archdesign.com', phone: '+91 98765 43214', role: 'Junior Architect', projectCount: 2, status: 'Active' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredTeam = team.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                        <span className="bg-brand-600 w-1.5 h-10 rounded-full"></span>
                        Internal Team
                    </h1>
                    <p className="text-gray-800 dark:text-brand-300 mt-2 font-medium tracking-wide">
                        Control access, assign roles, and monitor architect workload.
                    </p>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-600 to-brand-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-brand hover:scale-105 transition-all">
                    <FiUserPlus className="text-lg" /> Add Team Member
                </button>
            </div>

            {/* Content Section */}
            <div className="bg-white dark:bg-brand-900/30 rounded-[3rem] shadow-premium border border-brand-50/50 dark:border-brand-800/50 overflow-hidden">
                {/* Search & Filter Bar */}
                <div className="p-8 border-b border-brand-50 dark:border-brand-800/50 flex flex-col md:flex-row gap-6">
                    <div className="relative flex-1">
                        <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-600 text-xl" />
                        <input
                            type="text"
                            placeholder="Search by name or role..."
                            className="w-full bg-brand-50/30 dark:bg-brand-800/30 border-2 border-brand-50 dark:border-brand-800/50 rounded-2xl pl-16 pr-6 py-4 text-sm font-bold text-gray-800 dark:text-white focus:border-brand-600/50 outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="relative">
                            <FiFilter className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-600" />
                            <select className="bg-brand-50/30 dark:bg-brand-800/30 border-2 border-brand-50 dark:border-brand-800/50 rounded-2xl pl-14 pr-10 py-4 text-[10px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer">
                                <option>All Roles</option>
                                {roles.map(r => <option key={r}>{r}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Team Grid */}
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 text-indigo-900 dark:text-white">
                        {filteredTeam.map((user) => (
                            <div key={user.id} className="group relative bg-brand-50/30 dark:bg-brand-800/20 p-8 rounded-[2.5rem] border border-brand-50 dark:border-brand-800/50 hover:border-brand-500 transition-all duration-500 shadow-sm hover:shadow-premium-xl">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-white dark:bg-brand-900 shadow-sm flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                                        {user.role.includes('Principal') ? '🎩' : user.role.includes('Senior') ? '👔' : user.role.includes('3D') ? '💻' : '🎨'}
                                    </div>
                                    <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${user.status === 'Active'
                                            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100'
                                            : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-100'
                                        }`}>
                                        {user.status}
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-xl font-black group-hover:text-brand-600 transition-colors uppercase tracking-tight">{user.name}</h3>
                                    <p className="text-[10px] font-black text-brand-500 uppercase tracking-widest">{user.role}</p>
                                </div>

                                <div className="mt-8 pt-8 border-t border-brand-50 dark:border-brand-800 space-y-4">
                                    <div className="flex items-center gap-3 text-sm font-semibold opacity-70">
                                        <FiMail className="text-brand-600" /> {user.email}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-semibold opacity-70">
                                        <FiPhone className="text-brand-600" /> {user.phone}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-semibold opacity-70">
                                        <FiBriefcase className="text-brand-600" /> {user.projectCount} Assigned Projects
                                    </div>
                                </div>

                                <div className="absolute top-8 right-8 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="w-8 h-8 rounded-lg bg-white dark:bg-brand-900 shadow-premium flex items-center justify-center text-brand-600 hover:scale-110 transition-transform"><FiX /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Workload Summary */}
            <div className="bg-gradient-to-r from-brand-600 to-indigo-700 rounded-[3rem] p-10 text-white flex flex-col md:flex-row justify-between items-center shadow-brand gap-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
                <div className="relative z-10 text-center md:text-left">
                    <h4 className="text-2xl font-black tracking-tight mb-2 uppercase tracking-wide">Workload Capacity</h4>
                    <p className="text-brand-100 font-medium opacity-80 max-w-md">Your team is currently operating at 78% total capacity across 24 projects.</p>
                </div>
                <div className="relative z-10 flex gap-4">
                    <div className="p-6 bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20 text-center min-w-[140px]">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Avg Output</p>
                        <h5 className="text-4xl font-black mt-1 uppercase tracking-wide">88%</h5>
                    </div>
                    <div className="p-6 bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20 text-center min-w-[140px]">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Deadlines Met</p>
                        <h5 className="text-4xl font-black mt-1 uppercase tracking-wide">94%</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
