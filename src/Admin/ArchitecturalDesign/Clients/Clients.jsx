import React, { useState } from 'react';
import { FiPlus, FiMail, FiPhone, FiMapPin, FiBriefcase, FiArrowRight, FiSearch, FiFilter } from 'react-icons/fi';

const ArchClients = () => {
    const clients = [
        { id: 1, name: 'Skyline Corp', email: 'director@skyline.com', phone: '+91 90000 11111', address: 'London, UK', projects: 2, status: 'Active Account' },
        { id: 2, name: 'Coastal Dreams', email: 'contact@coastaldreams.in', phone: '+91 90000 22222', address: 'Goa, India', projects: 1, status: 'Active Account' },
        { id: 3, name: 'Royal Estates', email: 'villas@royalestates.com', phone: '+91 90000 33333', address: 'Dubai, UAE', projects: 3, status: 'Review Mode' },
        { id: 4, name: 'Nexus IT', email: 'infra@nexus.com', phone: '+91 90000 44444', address: 'Bangalore, India', projects: 1, status: 'Onboarding' },
    ];

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight uppercase tracking-tight">Client <span className="text-brand-600">Accounts</span></h1>
                    <p className="text-gray-800 dark:text-brand-300 mt-2 font-medium tracking-wide">Manage architectural clients, contact details, and project history.</p>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-brand-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all">
                    <FiPlus className="text-lg" /> Onboard Client
                </button>
            </div>

            <div className="bg-white dark:bg-brand-900/30 rounded-[3rem] shadow-premium border border-brand-50/50 dark:border-brand-800/50 overflow-hidden">
                <div className="p-8 border-b border-brand-50 dark:border-brand-800/50 flex flex-col md:flex-row gap-6">
                    <div className="relative flex-1 text-indigo-900 dark:text-white">
                        <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-600 text-xl" />
                        <input
                            type="text"
                            placeholder="Search accounts..."
                            className="w-full bg-brand-50/30 dark:bg-brand-800/20 border-2 border-brand-50 dark:border-brand-800/50 rounded-2xl pl-16 pr-6 py-4 text-sm font-bold placeholder-gray-400 focus:border-brand-600/50 outline-none transition-all uppercase tracking-wide"
                        />
                    </div>
                </div>

                <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8 text-indigo-900 dark:text-white">
                    {clients.map((client) => (
                        <div key={client.id} className="group relative bg-brand-50/20 dark:bg-brand-800/10 p-10 rounded-[3.5rem] border border-brand-50 dark:border-brand-800/50 hover:bg-white dark:hover:bg-brand-900 transition-all duration-500 shadow-sm hover:shadow-premium-xl">
                            <div className="flex justify-between items-start mb-8">
                                <div className="w-20 h-20 rounded-3xl bg-brand-600 text-white flex items-center justify-center text-3xl font-black shadow-brand font-outfit uppercase tracking-tighter">
                                    {client.name.substring(0, 2)}
                                </div>
                                <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${client.status === 'Active Account' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                                    }`}>
                                    {client.status}
                                </span>
                            </div>

                            <h3 className="text-2xl font-black group-hover:text-brand-600 transition-colors uppercase tracking-tight">{client.name}</h3>

                            <div className="mt-8 space-y-4">
                                <div className="flex items-center gap-4 text-sm font-bold opacity-70">
                                    <FiMail className="text-brand-600" /> {client.email}
                                </div>
                                <div className="flex items-center gap-4 text-sm font-bold opacity-70">
                                    <FiPhone className="text-brand-600" /> {client.phone}
                                </div>
                                <div className="flex items-center gap-4 text-sm font-bold opacity-70">
                                    <FiMapPin className="text-brand-600" /> {client.address}
                                </div>
                                <div className="flex items-center gap-4 text-sm font-bold opacity-70">
                                    <FiBriefcase className="text-brand-600" /> {client.projects} Active Design Projects
                                </div>
                            </div>

                            <div className="mt-10 pt-8 border-t border-brand-50 dark:border-brand-800 flex justify-between items-center">
                                <button className="text-[10px] font-black uppercase tracking-widest text-brand-600 hover:tracking-[0.2em] transition-all">Client Portal Link</button>
                                <FiArrowRight className="text-brand-600 group-hover:translate-x-2 transition-transform" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArchClients;
