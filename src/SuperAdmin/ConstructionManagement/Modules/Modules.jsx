import React, { useState } from 'react';
import { FiPackage, FiCpu, FiExternalLink, FiSettings } from 'react-icons/fi';

const SuperAdminModules = () => {
    const [modules, setModules] = useState([
        { id: 1, name: 'Finance Core', status: 'Healthy', version: 'v2.4.1', usage: '92%', category: 'Accounting' },
        { id: 2, name: 'Site Daily Log', status: 'Healthy', version: 'v1.8.2', usage: '85%', category: 'Site Management' },
        { id: 3, name: 'Vendor Portal', status: 'Warning', version: 'v3.0.1-beta', usage: '40%', category: 'Logistics' },
        { id: 4, name: 'Precision Estimator', status: 'Deprecated', version: 'v0.9.5', usage: '12%', category: 'Planning' },
        { id: 5, name: 'Safety Sentinel', status: 'Maintenance', version: 'v2.1.0', usage: '0%', category: 'Compliance' },
    ]);

    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Module Warehouse</h1>
                    <p className="text-sm font-bold text-gray-900 mt-1">Global Microservice Orchestration and Version Control</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => alert('Module Registry Log: Opening deployment history...')}
                        className="px-6 py-3 bg-white border border-brand-100 text-brand-600 text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-brand-50 shadow-sm transition-all"
                    >
                        Registry Log
                    </button>
                    <button
                        onClick={() => alert('Deployment Engine: Preparing containerized service distribution...')}
                        className="px-6 py-3 bg-brand-600 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-brand-700 shadow-premium transition-all"
                    >
                        Deploy New Module
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Active Modules', value: '18', icon: <FiPackage />, color: 'text-brand-600', bg: 'bg-brand-50' },
                    { label: 'Total Services', value: '42', icon: <FiCpu />, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Latency (Avg)', value: '24ms', icon: <FiSettings />, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'System Uptime', value: '99.98%', icon: <FiExternalLink />, color: 'text-blue-600', bg: 'bg-blue-50' },
                ].map((stat, i) => (
                    <div key={i} className="card-premium p-6">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${stat.bg} ${stat.color} mb-4`}>
                            {stat.icon}
                        </div>
                        <p className="text-[10px] font-black text-gray-800 uppercase tracking-widest">{stat.label}</p>
                        <h3 className="text-2xl font-black text-gray-900 mt-1">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="card-premium overflow-hidden">
                <div className="p-8 border-b border-brand-50 bg-brand-50/30 flex justify-between items-center">
                    <h3 className="text-xl font-black text-gray-900">Module Registry</h3>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Filter modules..."
                            className="px-4 py-2 bg-white border border-brand-100 rounded-xl text-[10px] font-black tracking-widest uppercase outline-none focus:ring-2 focus:ring-brand-500/10"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-brand-50/50 border-b border-brand-100">
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Service Identity</th>
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Tier Category</th>
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Deployment</th>
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Utilization</th>
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Operational State</th>
                                <th className="px-8 py-5 text-right text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Controls</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-50">
                            {modules.map((m) => (
                                <tr key={m.id} className="group hover:bg-brand-50/30 transition-colors">
                                    <td className="px-8 py-6 font-bold text-gray-900">{m.name}</td>
                                    <td className="px-8 py-6 text-[10px] font-black text-gray-800 uppercase tracking-widest">{m.category}</td>
                                    <td className="px-8 py-6">
                                        <span className="px-2 py-1 bg-gray-50 text-gray-800 text-[10px] font-bold rounded-lg border border-gray-100">{m.version}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-brand-600" style={{ width: m.usage }}></div>
                                            </div>
                                            <span className="text-[10px] font-black text-gray-900">{m.usage}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-xl border ${m.status === 'Healthy' ? 'bg-green-50 text-green-700 border-green-200' :
                                            m.status === 'Warning' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                m.status === 'Deprecated' ? 'bg-red-50 text-red-700 border-red-200' :
                                                    'bg-gray-50 text-gray-900 border-gray-200'
                                            }`}>
                                            {m.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right space-x-2">
                                        <button
                                            onClick={() => alert(`Hotfix: Initiating patch sequence for ${m.name}...`)}
                                            className="px-3 py-1.5 rounded-xl bg-white border border-brand-100 text-brand-600 text-[10px] font-black uppercase tracking-widest hover:bg-brand-600 hover:text-white transition-all shadow-sm"
                                        >
                                            Hotfix
                                        </button>
                                        <button
                                            onClick={() => alert(`Advanced configuration for ${m.name} is coming in the next security update.`)}
                                            className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-900 hover:text-gray-900 transition-colors"
                                        >
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

export default SuperAdminModules;
