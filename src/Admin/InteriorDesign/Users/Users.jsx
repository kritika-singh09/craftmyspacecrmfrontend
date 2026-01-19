import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiShield, FiBriefcase, FiPlus, FiSearch, FiFilter, FiUserCheck } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

const IntUsers = () => {
    const { theme } = useTheme();

    // User State
    const [users, setUsers] = useState([
        { id: 1, name: 'Ar. Sameer Sen', role: 'Chief Designer', email: 'sameer@artisan.id', projects: '08', status: 'Active' },
        { id: 2, name: 'Megha Gupta', role: '3D Visualizer', email: 'megha@artisan.id', projects: '12', status: 'Active' },
        { id: 3, name: 'Rohit Verma', role: 'Site Supervisor', email: 'rohit@artisan.id', projects: '04', status: 'On Site' },
        { id: 4, name: 'Karan Mehra', role: 'Vendor Coordinator', email: 'karan@artisan.id', projects: 'All', status: 'Active' },
        { id: 5, name: 'Anjali Sharma', role: 'Accountant', email: 'billing@artisan.id', projects: 'Admin', status: 'Active' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const handleAddUser = () => {
        const name = prompt("Enter new user name:");
        if (name) {
            setUsers([...users, {
                id: users.length + 1,
                name: name,
                role: 'Designer', // Default
                email: `${name.toLowerCase().split(' ')[0]}@artisan.id`,
                projects: '00',
                status: 'Active'
            }]);
        }
    };

    const handleEditUser = (id) => {
        alert(`Editing user ID: ${id}`);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight uppercase" style={{ color: theme.textPrimary }}>
                        Team <span style={{ color: theme.secondary }}>Personnel</span>
                    </h1>
                    <p className="mt-2 font-medium tracking-wide" style={{ color: theme.textSecondary }}>
                        Manage internal designers, site supervisors, and coordination staff.
                    </p>
                </div>
                <button
                    onClick={handleAddUser}
                    className="flex items-center gap-3 px-8 py-4 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all"
                    style={{ background: theme.gradients.button }}
                >
                    <FiPlus className="text-lg" /> Add Team Member
                </button>
            </div>

            {/* Role Distribution Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {[
                    { role: 'Designer', count: users.filter(u => u.role.includes('Designer')).length },
                    { role: '3D Artist', count: users.filter(u => u.role.includes('3D')).length },
                    { role: 'Supervisor', count: users.filter(u => u.role.includes('Supervisor')).length },
                    { role: 'Coordinator', count: users.filter(u => u.role.includes('Coordinator')).length },
                    { role: 'Accounts', count: users.filter(u => u.role.includes('Accountant')).length },
                ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-[2.5rem] shadow-premium border text-center group hover:-translate-y-1 transition-all duration-300"
                        style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
                    >
                        <p className="text-2xl font-black tracking-tighter" style={{ color: theme.textPrimary }}>{stat.count}</p>
                        <p className="text-[9px] font-black uppercase tracking-widest mt-1" style={{ color: theme.textSecondary }}>{stat.role}</p>
                    </div>
                ))}
            </div>

            <div className="rounded-[3.5rem] shadow-premium border overflow-hidden"
                style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
            >
                <div className="p-10 border-b flex flex-col md:flex-row justify-between items-center gap-6"
                    style={{ borderColor: theme.cardBorder }}
                >
                    <div className="relative w-full md:w-96">
                        <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-lg" style={{ color: theme.secondary }} />
                        <input
                            type="text"
                            placeholder="Search by name, role or project..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border rounded-3xl py-4 pl-14 pr-6 text-sm font-bold focus:outline-none focus:ring-2"
                            style={{
                                backgroundColor: `${theme.primary}05`,
                                borderColor: `${theme.primary}20`,
                                color: theme.textPrimary
                            }}
                        />
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 border rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:opacity-80"
                            style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder, color: theme.textPrimary }}
                        >
                            <FiFilter /> Filter Roles
                        </button>
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 border rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:opacity-80"
                            style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder, color: theme.textPrimary }}
                        >
                            <FiBriefcase /> Workload
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr style={{ backgroundColor: `${theme.primary}08` }}>
                                {['Team Member', 'Specialization', 'Projects', 'Status', 'Actions'].map(h => (
                                    <th key={h} className="px-10 py-6 text-[10px] font-black uppercase tracking-widest" style={{ color: theme.secondary }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y" style={{ divideColor: theme.cardBorder }}>
                            {filteredUsers.map((user, i) => (
                                <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform"
                                                style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}
                                            >
                                                <FiUser />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>{user.name}</p>
                                                <p className="text-[10px] font-bold transition-colors" style={{ color: theme.textSecondary }}>{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className="px-4 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-widest"
                                            style={{
                                                backgroundColor: theme.background,
                                                borderColor: theme.cardBorder,
                                                color: theme.textPrimary
                                            }}
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <p className="text-xs font-black italic" style={{ color: theme.textPrimary }}>{user.projects} Assignments</p>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-orange-500'}`}></div>
                                            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: theme.textPrimary }}>{user.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <button
                                            onClick={() => handleEditUser(user.id)}
                                            className="text-[10px] font-black uppercase tracking-widest hover:underline"
                                            style={{ color: theme.secondary }}
                                        >
                                            Edit Profile
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="p-10 rounded-[3rem] border-2 border-dashed flex items-center justify-between"
                style={{ backgroundColor: `${theme.primary}05`, borderColor: `${theme.primary}20` }}
            >
                <div className="flex items-center gap-6">
                    <FiUserCheck className="text-4xl" style={{ color: theme.secondary }} />
                    <div>
                        <h4 className="text-lg font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>Resource Optimization</h4>
                        <p className="text-xs font-medium" style={{ color: theme.textSecondary }}>Currently 82% of design staff is at peak capacity. Consider delay in new mood board assignments.</p>
                    </div>
                </div>
                <button className="px-8 py-4 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:shadow-lg transition-all"
                    style={{ background: theme.gradients.button }}
                >
                    View Analytics
                </button>
            </div>
        </div>
    );
};

export default IntUsers;
