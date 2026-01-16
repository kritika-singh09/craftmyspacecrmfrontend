import React, { useState } from 'react';
import { FiUsers, FiSearch, FiBriefcase, FiTrendingUp, FiSettings, FiBarChart2 } from 'react-icons/fi';

const SuperAdminManagers = () => {
    const [managers] = useState([
        { id: 1, name: 'Robert Fox', projects: 3, company: 'HARR Construction', rating: '98%', status: 'Active', workload: 'High' },
        { id: 2, name: 'Jane Cooper', projects: 2, company: 'ABC Builders', rating: '95%', status: 'Active', workload: 'Optimal' },
        { id: 3, name: 'Guy Hawkins', projects: 5, company: 'XYZ Infra', rating: '88%', status: 'On Leave', workload: 'None' },
        { id: 4, name: 'Cody Fisher', projects: 1, company: 'HARR Construction', rating: '92%', status: 'Active', workload: 'Low' },
        { id: 5, name: 'Esther Howard', projects: 4, company: 'ABC Builders', rating: '91%', status: 'Active', workload: 'High' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="space-y-8 pb-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Manager Cortex</h1>
                    <p className="text-sm font-bold text-gray-900 mt-1">Cross-tenant Project Leadership & Performance Analytics</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative group">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-600 text-lg group-hover:scale-110 transition-transform" />
                        <input
                            type="text"
                            placeholder="Search leadership..."
                            className="pl-12 pr-6 py-3 bg-white border border-brand-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none w-80 shadow-sm transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Managers', value: '86', trend: 'Global Stack', icon: <FiUsers className="text-brand-600" />, bg: 'bg-brand-50' },
                    { label: 'KPI Target Sync', value: '92%', trend: '↑ 4%', icon: <FiTrendingUp className="text-green-600" />, bg: 'bg-green-50' },
                    { label: 'Idle Capacity', value: '12%', trend: '08 Managers', icon: <FiBriefcase className="text-purple-600" />, bg: 'bg-purple-50' },
                ].map((stat, i) => (
                    <div key={i} className="card-premium p-6 flex flex-col gap-4 group">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm ${stat.bg} transition-transform group-hover:scale-110`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-800 uppercase tracking-widest">{stat.label}</p>
                            <h3 className="text-3xl font-black text-gray-900 mt-1">{stat.value}</h3>
                            <p className="text-[11px] font-bold text-brand-600 mt-1 italic">{stat.trend}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card-premium overflow-hidden">
                <div className="p-8 border-b border-brand-50 bg-brand-50/30">
                    <h2 className="text-xl font-black text-gray-900">Project Leadership Directory</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-brand-50/50 border-b border-brand-100">
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Manager Identity</th>
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Affiliation</th>
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Active Projects</th>
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Internal Rating</th>
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Workload</th>
                                <th className="px-8 py-5 text-right text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Options</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-50">
                            {managers.map((manager) => (
                                <tr key={manager.id} className="group hover:bg-brand-50/30 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-brand-600 text-white rounded-xl flex items-center justify-center font-black text-xs shadow-md">
                                                {manager.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors">{manager.name}</p>
                                                <span className={`text-[10px] font-black uppercase tracking-tighter ${manager.status === 'Active' ? 'text-green-600' : 'text-amber-600'}`}>
                                                    {manager.status}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-bold text-gray-900">{manager.company}</p>
                                        <p className="text-[10px] font-black text-gray-800 uppercase tracking-tight">Primary Tenant</p>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-bold text-gray-800">
                                        {manager.projects} Active
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 font-black text-gray-900">
                                            <FiBarChart2 className="text-brand-600" /> {manager.rating}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border rounded-xl ${manager.workload === 'Optimal' ? 'bg-green-50 text-green-700 border-green-200' :
                                            manager.workload === 'High' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                'bg-gray-50 text-gray-900 border-gray-200'
                                            }`}>
                                            {manager.workload}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2.5 rounded-xl bg-white border border-brand-100 text-brand-600 hover:bg-brand-600 hover:text-white transition-all shadow-sm active:scale-95">
                                            <FiSettings />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminManagers;
