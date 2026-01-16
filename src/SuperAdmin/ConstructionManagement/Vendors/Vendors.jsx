import React, { useState } from 'react';
import { FiShoppingCart, FiSearch, FiFilter, FiExternalLink, FiPlus } from 'react-icons/fi';

const SuperAdminVendors = () => {
    const [vendors] = useState([
        { id: 1, name: 'Shree Cement Ltd', material: 'Cement', companies: 12, rating: 4.8, status: 'Active', totalSpend: '₹45.2L' },
        { id: 2, name: 'Steel India Corp', material: 'Steel', companies: 8, rating: 4.5, status: 'Active', totalSpend: '₹1.2Cr' },
        { id: 3, name: 'Luminous Electricals', material: 'Electrical', companies: 15, rating: 4.2, status: 'Active', totalSpend: '₹28.5L' },
        { id: 4, name: 'Asian Paints Global', material: 'Finishing', companies: 22, rating: 4.7, status: 'Active', totalSpend: '₹18.4L' },
        { id: 5, name: 'Bharat Pipes', material: 'Plumbing', companies: 5, rating: 3.9, status: 'Flagged', totalSpend: '₹4.2L' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="space-y-8 pb-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Supply Chain Nexus</h1>
                    <p className="text-sm font-bold text-gray-900 mt-1">Global Procurement Oversight & Vendor Performance</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative group">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-600 text-lg group-hover:scale-110 transition-transform" />
                        <input
                            type="text"
                            placeholder="Search global suppliers..."
                            className="pl-12 pr-6 py-3 bg-white border border-brand-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none w-80 shadow-sm transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="group flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-premium hover:bg-brand-700 transition-all hover:-translate-y-0.5">
                        <FiPlus className="text-xl group-hover:rotate-90 transition-transform" />
                        Onboard Supplier
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Verified Vendors', value: '124', trend: '↑ 8', icon: <FiShoppingCart className="text-brand-600" />, bg: 'bg-brand-50' },
                    { label: 'Global Spend (MTD)', value: '₹2.8 Cr', trend: '↑ 12%', icon: <FiShoppingCart className="text-green-600" />, bg: 'bg-green-50' },
                    { label: 'Disruption Alerts', value: '02', trend: 'Critical', icon: <FiShoppingCart className="text-red-600" />, bg: 'bg-red-50' },
                ].map((stat, i) => (
                    <div key={i} className="card-premium p-6 flex items-center gap-6 group hover:translate-y-[-2px] transition-all">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm ${stat.bg} group-hover:scale-110 transition-transform`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-800 uppercase tracking-widest">{stat.label}</p>
                            <h3 className="text-2xl font-black text-gray-900 mt-1">{stat.value}</h3>
                            <p className="text-[11px] font-bold text-brand-600 mt-1">{stat.trend}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card-premium overflow-hidden">
                <div className="p-8 border-b border-brand-50 bg-brand-50/30 flex justify-between items-center">
                    <h2 className="text-xl font-black text-gray-900">Master Vendor Directory</h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-brand-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-brand-600 hover:bg-brand-50 transition-all">
                        <FiFilter /> Filter Categories
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-brand-50/50 border-b border-brand-100">
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Supplier Entity</th>
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Category</th>
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Company Reach</th>
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Global Volume</th>
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Compliance</th>
                                <th className="px-8 py-5 text-right text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-50">
                            {vendors.map((vendor) => (
                                <tr key={vendor.id} className="group hover:bg-brand-50/30 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-brand-50 text-brand-700 rounded-xl flex items-center justify-center font-black text-xs">
                                                {vendor.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors">{vendor.name}</p>
                                                <p className="text-[10px] font-bold text-gray-800 uppercase tracking-tighter">Verified Global Partner</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-gray-50 text-gray-900 border border-gray-100 rounded-xl">
                                            {vendor.material}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-bold text-gray-800">
                                        {vendor.companies} Companies
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-black text-gray-900">{vendor.totalSpend}</p>
                                        <div className="w-24 h-1 bg-brand-100 rounded-full mt-2 overflow-hidden">
                                            <div className="h-full bg-brand-600" style={{ width: '65%' }}></div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${vendor.status === 'Active' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></span>
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${vendor.status === 'Active' ? 'text-green-700' : 'text-red-700'}`}>
                                                {vendor.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2.5 rounded-xl bg-white border border-brand-100 text-brand-600 hover:bg-brand-600 hover:text-white transition-all shadow-sm active:scale-95">
                                            <FiExternalLink />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-6 bg-brand-50/10 text-center border-t border-brand-50">
                    <button className="text-[11px] font-black text-brand-600 uppercase tracking-[0.2em] hover:text-brand-800 transition-colors">Download Procurement Audit</button>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminVendors;
