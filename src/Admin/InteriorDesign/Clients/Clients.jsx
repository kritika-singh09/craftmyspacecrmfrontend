import React from 'react';
import { FiUsers, FiSearch, FiFilter, FiPlus, FiMail, FiPhone, FiStar } from 'react-icons/fi';

const IntClients = () => {
    const clients = [
        { name: 'Khanna Residences', email: 'rohit@khanna.com', phone: '+91 98888 77777', type: 'Residential (Premium)', projects: '02', rating: '5.0' },
        { name: 'TechNova Pvt Ltd', email: 'admin@technova.com', phone: '+91 90000 12345', type: 'Commercial (Office)', projects: '01', rating: '4.8' },
        { name: 'Alaya Wellness', email: 'spa@alaya.com', phone: '+91 88888 99999', type: 'Retail (Spa)', projects: '01', rating: '4.9' },
    ];

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight uppercase tracking-tight">Client <span className="text-orange-600">Accounts</span></h1>
                    <p className="text-gray-800 dark:text-orange-300 mt-2 font-medium tracking-wide">Manage relationships, preferences, and approval authorities for all projects.</p>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all">
                    <FiPlus className="text-lg" /> New Client
                </button>
            </div>

            <div className="bg-white dark:bg-brand-900/30 rounded-[3.5rem] shadow-premium border border-orange-50/50 dark:border-brand-800/50 overflow-hidden">
                <div className="p-10 border-b border-orange-50 dark:border-brand-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="relative w-full md:w-96">
                        <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-orange-500 text-lg" />
                        <input type="text" placeholder="Search clients..." className="w-full bg-orange-50/50 dark:bg-brand-800/50 border border-orange-100 dark:border-brand-700 rounded-3xl py-4 pl-14 pr-6 text-sm font-bold text-indigo-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-orange-50/20 dark:bg-brand-900/50">
                                {['Client', 'Contact', 'Project Type', 'Projects', 'Status'].map(h => (
                                    <th key={h} className="px-10 py-6 text-[10px] font-black text-orange-600 uppercase tracking-widest">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-orange-50 dark:divide-brand-800">
                            {clients.map((client, i) => (
                                <tr key={i} className="group hover:bg-orange-50/20 dark:hover:bg-orange-900/10 transition-colors">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-brand-800 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">💎</div>
                                            <div>
                                                <p className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight">{client.name}</p>
                                                <p className="text-[10px] font-bold text-gray-900 group-hover:text-orange-500 transition-colors">{client.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <p className="text-xs font-black text-indigo-900 dark:text-white italic">{client.phone}</p>
                                    </td>
                                    <td className="px-10 py-8 text-indigo-900 dark:text-white">
                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{client.type}</span>
                                    </td>
                                    <td className="px-10 py-8 text-indigo-900 dark:text-white">
                                        <p className="text-xs font-black italic">{client.projects} Active</p>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-1 text-orange-500">
                                            <FiStar className="fill-current" />
                                            <span className="text-xs font-black">{client.rating}</span>
                                        </div>
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

export default IntClients;
