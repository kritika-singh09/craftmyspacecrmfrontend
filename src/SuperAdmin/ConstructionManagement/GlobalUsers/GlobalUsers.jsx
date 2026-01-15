import React, { useState } from 'react';
import GlobalUserForm from './GlobalUserForm';

const SuperAdminGlobalUsers = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'Admin User', email: 'admin@harr.com', role: 'admin', tenant: 'HARR Construction', status: 'Active' },
        { id: 2, name: 'Project Manager', email: 'manager@harr.com', role: 'manager', tenant: 'HARR Construction', status: 'Active' },
        { id: 3, name: 'Site Engineer', email: 'engineer@harr.com', role: 'engineer', tenant: 'HARR Construction', status: 'Active' },
        { id: 4, name: 'ABC Admin', email: 'admin@abc.com', role: 'admin', tenant: 'ABC Builders', status: 'Active' },
        { id: 5, name: 'Contractor', email: 'contractor@harr.com', role: 'contractor', tenant: 'HARR Construction', status: 'Active' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleAddUser = (userData) => {
        const newUser = {
            id: users.length + 1,
            ...userData,
            status: 'Active'
        };
        setUsers([...users, newUser]);
        setIsModalOpen(false);
    };

    const handleAction = (action, userId) => {
        const user = users.find(u => u.id === userId);
        if (action === 'reset') {
            alert(`Password reset link sent to ${user.email}`);
        } else if (action === 'disable') {
            if (window.confirm(`Are you sure you want to disable ${user.name}?`)) {
                setUsers(users.map(u => u.id === userId ? { ...u, status: 'Disabled' } : u));
            }
        } else if (action === 'enable') {
            setUsers(users.map(u => u.id === userId ? { ...u, status: 'Active' } : u));
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.tenant.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Identity Nexus</h1>
                    <p className="text-sm font-bold text-gray-700 mt-1">Cross-tenant User Authentication & Authorization</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Search identities..."
                            className="pl-12 pr-6 py-3 bg-white border border-brand-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none w-80 shadow-sm transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-600 text-lg group-hover:scale-110 transition-transform">🔍</span>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="group flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-premium hover:bg-brand-700 transition-all hover:-translate-y-0.5"
                    >
                        <span className="text-xl leading-none group-hover:rotate-90 transition-transform">+</span>
                        Establish Identity
                    </button>
                </div>
            </div>

            <div className="card-premium overflow-hidden">
                <div className="p-8 border-b border-brand-50 bg-brand-50/30">
                    <h3 className="text-xl font-black text-gray-900">Global Directory</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-brand-50/50 border-b border-brand-100">
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Asset / User</th>
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Credential</th>
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Assignment Role</th>
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Origin Tenant</th>
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Current State</th>
                                <th className="px-8 py-5 text-right text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Auth Controls</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-50">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="group hover:bg-brand-50/30 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-brand-50 text-brand-700 rounded-xl flex items-center justify-center font-black text-xs shadow-sm uppercase">
                                                {user.name.charAt(0)}
                                            </div>
                                            <span className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-bold text-gray-800">{user.email}</td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-brand-50 text-brand-700 border border-brand-100 rounded-xl">
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-bold text-gray-900">{user.tenant}</p>
                                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-tight mt-0.5 italic">Affiliated Entity</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border rounded-xl ${user.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right space-x-2">
                                        <button
                                            onClick={() => handleAction('reset', user.id)}
                                            className="px-4 py-2 rounded-xl bg-white border border-brand-100 text-brand-600 text-[10px] font-black uppercase tracking-widest hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-all shadow-sm active:scale-95"
                                        >
                                            Auth Reset
                                        </button>
                                        {user.status === 'Active' ? (
                                            <button
                                                onClick={() => handleAction('disable', user.id)}
                                                className="px-4 py-2 rounded-xl bg-white border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white hover:border-red-600 transition-all shadow-sm active:scale-95"
                                            >
                                                Suspend
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleAction('enable', user.id)}
                                                className="px-4 py-2 rounded-xl bg-white border border-green-100 text-green-600 text-[10px] font-black uppercase tracking-widest hover:bg-green-600 hover:text-white hover:border-green-600 transition-all shadow-sm active:scale-95"
                                            >
                                                Restore
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add User Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-brand-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto border border-brand-100 animate-fade-in-up">
                        <div className="p-8 border-b border-brand-50 bg-brand-50/30 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-black text-gray-900">Provision Identity</h2>
                                <p className="text-xs font-black text-gray-600 uppercase tracking-widest mt-1">Global User Authentication Portal</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-10 h-10 rounded-full hover:bg-white flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-8">
                            <GlobalUserForm
                                onSubmit={handleAddUser}
                                onCancel={() => setIsModalOpen(false)}
                                companies={[
                                    { id: 1, name: 'HARR Construction' },
                                    { id: 2, name: 'ABC Builders' },
                                    { id: 3, name: 'XYZ Infra' }
                                ]}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuperAdminGlobalUsers;
