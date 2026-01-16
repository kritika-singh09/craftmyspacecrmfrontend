import React from 'react';
import { FiShoppingBag, FiSearch, FiFilter, FiPlus, FiPhone, FiTruck, FiMapPin } from 'react-icons/fi';
import { HiOfficeBuilding } from 'react-icons/hi';

const IntVendors = () => {
    const vendors = [
        { name: 'Modular Kraft', type: 'Carpentry / Kitchen', contact: '+91 99999 11111', rating: '4.9', active: '04', location: 'Mumbai' },
        { name: 'Glow Electricals', type: 'Lighting/Home Auto', contact: '+91 99999 22222', rating: '4.7', active: '02', location: 'Ahmedabad' },
        { name: 'Marble Masters', type: 'Stone / Flooring', contact: '+91 99999 33333', rating: '4.5', active: '01', location: 'Udaipur' },
    ];

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight uppercase tracking-tight">Vendor <span className="text-orange-600">Eco-system</span></h1>
                    <p className="text-gray-800 dark:text-orange-300 mt-2 font-medium tracking-wide">Manage suppliers, manufacturing units, and installation contractors.</p>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all">
                    <FiPlus className="text-lg" /> Onboard Vendor
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {vendors.map((v, i) => (
                    <div key={i} className="group bg-white dark:bg-brand-900/30 p-10 rounded-[3.5rem] shadow-premium border border-orange-50/50 dark:border-brand-800/50 hover:border-orange-500 transition-all duration-500">
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-orange-50 dark:bg-brand-800 flex items-center justify-center text-3xl shadow-inner group-hover:bg-orange-600 group-hover:text-white transition-all duration-500"><HiOfficeBuilding /></div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-xl">Top Rated</span>
                        </div>
                        <h3 className="text-xl font-black text-indigo-900 dark:text-white uppercase tracking-tight mb-1">{v.name}</h3>
                        <p className="text-[10px] font-black text-orange-500 tracking-[0.2em] uppercase">{v.type}</p>

                        <div className="mt-8 pt-6 border-t border-orange-50 dark:border-brand-800 space-y-4 text-indigo-900 dark:text-white">
                            <div className="flex items-center gap-3 text-xs font-bold opacity-60"><FiPhone className="text-orange-600" /> {v.contact}</div>
                            <div className="flex items-center gap-3 text-xs font-bold opacity-60"><FiMapPin className="text-orange-600" /> {v.location}</div>
                            <div className="flex justify-between items-center bg-orange-50/30 dark:bg-brand-800/40 p-4 rounded-2xl mt-4">
                                <div>
                                    <p className="text-[9px] font-black text-gray-900 uppercase tracking-widest">Active Orders</p>
                                    <p className="text-sm font-black italic">{v.active}</p>
                                </div>
                                <button className="px-4 py-2 bg-indigo-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all">Contract</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IntVendors;
