import React, { useState } from 'react';
import { FiUserPlus, FiSearch, FiFilter, FiMail, FiPhone, FiCheck, FiX, FiBriefcase, FiMoreVertical } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

const UserManagement = () => {
    const { theme } = useTheme();
    const roles = ['Principal Architect', 'Senior Architect', 'Junior Architect', 'Draftsman', '3D Visualizer', 'Accountant', 'Admin'];

    const [team, setTeam] = useState([
        { id: 1, name: 'Ar. Rahul Sharma', email: 'rahul@archdesign.com', phone: '+91 98765 43210', role: 'Principal Architect', projectCount: 5, status: 'Active' },
        { id: 2, name: 'Priya Verma', email: 'priya@archdesign.com', phone: '+91 98765 43211', role: 'Senior Architect', projectCount: 3, status: 'Active' },
        { id: 3, name: 'Vikram Singh', email: 'vikram@archdesign.com', phone: '+91 98765 43212', role: '3D Visualizer', projectCount: 8, status: 'Active' },
        { id: 4, name: 'Sanjay Dutt', email: 'sanjay@archdesign.com', phone: '+91 98765 43213', role: 'Draftsman', projectCount: 12, status: 'Inactive' },
        { id: 5, name: 'Ananya Roy', email: 'ananya@archdesign.com', phone: '+91 98765 43214', role: 'Junior Architect', projectCount: 2, status: 'Active' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', role: 'Junior Architect', email: '', phone: '' });

    const filteredTeam = team.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddUser = (e) => {
        e.preventDefault();
        const user = {
            id: team.length + 1,
            ...newUser,
            projectCount: 0,
            status: 'Active'
        };
        setTeam([...team, user]);
        setShowModal(false);
        setNewUser({ name: '', role: 'Junior Architect', email: '', phone: '' });
    };

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight flex items-center gap-3" style={{ color: theme.textPrimary }}>
                        <span className="w-1.5 h-10 rounded-full" style={{ backgroundColor: theme.primary }}></span>
                        Internal Team
                    </h1>
                    <p className="mt-2 font-medium tracking-wide" style={{ color: theme.textSecondary }}>
                        Control access, assign roles, and monitor architect workload.
                    </p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-3 px-8 py-4 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-all"
                    style={{ background: theme.gradients.button }}
                >
                    <FiUserPlus className="text-lg" /> Add Team Member
                </button>
            </div>

            {/* Content Section */}
            <div className="rounded-[3rem] shadow-premium border overflow-hidden"
                style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
            >
                {/* Search & Filter Bar */}
                <div className="p-8 border-b flex flex-col md:flex-row gap-6" style={{ borderColor: theme.cardBorder }}>
                    <div className="relative flex-1">
                        <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-xl" style={{ color: theme.primary }} />
                        <input
                            type="text"
                            placeholder="Search by name or role..."
                            className="w-full border-2 rounded-2xl pl-16 pr-6 py-4 text-sm font-bold outline-none transition-all"
                            style={{
                                backgroundColor: `${theme.primary}05`,
                                borderColor: theme.cardBorder,
                                color: theme.textPrimary
                            }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="relative">
                            <FiFilter className="absolute left-6 top-1/2 -translate-y-1/2" style={{ color: theme.primary }} />
                            <select
                                className="border-2 rounded-2xl pl-14 pr-10 py-4 text-[10px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer"
                                style={{
                                    backgroundColor: `${theme.primary}05`,
                                    borderColor: theme.cardBorder,
                                    color: theme.textPrimary
                                }}
                            >
                                <option>All Roles</option>
                                {roles.map(r => <option key={r}>{r}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Team Grid */}
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {filteredTeam.map((user) => (
                            <div key={user.id} className="group relative p-8 rounded-[2.5rem] border transition-all duration-500 shadow-sm hover:shadow-premium-xl"
                                style={{
                                    backgroundColor: `${theme.primary}05`,
                                    borderColor: theme.cardBorder
                                }}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center text-3xl transition-transform group-hover:scale-110"
                                        style={{ backgroundColor: theme.cardBg }}
                                    >
                                        {user.role.includes('Principal') ? '🎩' : user.role.includes('Senior') ? '👔' : user.role.includes('3D') ? '💻' : '🎨'}
                                    </div>
                                    <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${user.status === 'Active'
                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                        : 'bg-rose-50 text-rose-600 border-rose-100'
                                        }`}>
                                        {user.status}
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-xl font-black transition-colors uppercase tracking-tight" style={{ color: theme.textPrimary }}>{user.name}</h3>
                                    <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: theme.primary }}>{user.role}</p>
                                </div>

                                <div className="mt-8 pt-8 border-t space-y-4" style={{ borderColor: theme.cardBorder }}>
                                    <div className="flex items-center gap-3 text-sm font-semibold opacity-70" style={{ color: theme.textSecondary }}>
                                        <FiMail style={{ color: theme.primary }} /> {user.email}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-semibold opacity-70" style={{ color: theme.textSecondary }}>
                                        <FiPhone style={{ color: theme.primary }} /> {user.phone}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-semibold opacity-70" style={{ color: theme.textSecondary }}>
                                        <FiBriefcase style={{ color: theme.primary }} /> {user.projectCount} Assigned Projects
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Workload Summary */}
            <div className="rounded-[3rem] p-10 flex flex-col md:flex-row justify-between items-center shadow-lg gap-8 overflow-hidden relative text-white"
                style={{ background: theme.gradients.primary }}
            >
                <div className="relative z-10 text-center md:text-left">
                    <h4 className="text-2xl font-black tracking-tight mb-2 uppercase tracking-wide">Workload Capacity</h4>
                    <p className="font-medium opacity-80 max-w-md">Your team is currently operating at 78% total capacity across 24 projects.</p>
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

            {/* Add User Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-lg rounded-[2rem] shadow-2xl animate-in slide-in-from-bottom-8 overflow-hidden"
                        style={{ backgroundColor: theme.cardBg }}
                    >
                        <div className="p-6 text-white relative flex justify-between items-center" style={{ background: theme.gradients.primary }}>
                            <div>
                                <h3 className="text-xl font-black">Add Team Member</h3>
                                <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mt-1">New Architect / Staff</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white">
                                <FiX />
                            </button>
                        </div>

                        <form onSubmit={handleAddUser} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Full Name</label>
                                <input type="text" required value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Role Designation</label>
                                <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                >
                                    {roles.map(r => <option key={r}>{r}</option>)}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Email</label>
                                    <input type="email" required value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                        className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                        style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Phone</label>
                                    <input type="tel" required value={newUser.phone} onChange={e => setNewUser({ ...newUser, phone: e.target.value })}
                                        className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                        style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="w-full py-4 rounded-xl text-white font-black uppercase tracking-widest shadow-lg hover:shadow-xl transition-all"
                                style={{ background: theme.gradients.button }}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <FiCheck /> Confirm Addition
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
