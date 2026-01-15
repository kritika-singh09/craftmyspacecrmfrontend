import React from 'react';
import { FiBox, FiSearch, FiFilter, FiPlus, FiArrowUpRight, FiFileText } from 'react-icons/fi';

const IntMaterials = () => {
    const categories = [
        { name: 'Furniture', items: 124, icon: '🛋️' },
        { name: 'Finishes', items: 86, icon: '🎨' },
        { name: 'Hardware', items: 112, icon: '🗝️' },
        { name: 'Lighting', items: 54, icon: '💡' },
    ];

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight uppercase tracking-tight">Material <span className="text-orange-600">Library</span></h1>
                    <p className="text-gray-800 dark:text-orange-300 mt-2 font-bold tracking-wide">Curated catalogs, technical specs, and Bill of Quantities management.</p>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all">
                    <FiPlus className="text-lg" /> Add Material
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((cat, i) => (
                    <div key={i} className="bg-white dark:bg-brand-900/30 p-8 rounded-[3rem] shadow-premium border border-orange-50 dark:border-brand-800 transition-all hover:-translate-y-2 group cursor-pointer">
                        <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-brand-800 flex items-center justify-center text-2xl mb-6 shadow-inner group-hover:bg-orange-600 transition-colors">{cat.icon}</div>
                        <h4 className="text-lg font-black text-indigo-900 dark:text-white uppercase tracking-tight">{cat.name}</h4>
                        <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mt-1">{cat.items} SKUs</p>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-brand-900/30 rounded-[3.5rem] shadow-premium border border-orange-50/50 dark:border-brand-800/50 overflow-hidden">
                <div className="p-10 border-b border-orange-50 dark:border-brand-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <h4 className="text-xl font-black text-indigo-900 dark:text-white uppercase tracking-tight">Recent Material Specs</h4>
                    <FiSearch className="text-orange-500 text-2xl hidden md:block" />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-orange-50/20 dark:bg-brand-900/50">
                                {['Material Name', 'Category', 'Unit Price', 'Brand', 'Status'].map(h => (
                                    <th key={h} className="px-10 py-6 text-[10px] font-black text-orange-600 uppercase tracking-widest">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-orange-50 dark:divide-brand-800">
                            {[
                                { name: 'Velvet Navy Blue', cat: 'Upholstery', price: '₹1200 / m', brand: 'D Decor', status: 'In Stock' },
                                { name: 'Gold Leaf Foil', cat: 'Wall Finish', price: '₹450 / sqft', brand: 'Kansai Nerolac', status: 'Low Stock' },
                                { name: 'Magnetic Track LT', cat: 'Lighting', price: '₹8500 / ft', brand: 'Wipro', status: 'Out of Stock' },
                            ].map((item, i) => (
                                <tr key={i} className="hover:bg-orange-50/20 text-indigo-900 dark:text-white transition-colors">
                                    <td className="px-10 py-6 text-sm font-black uppercase tracking-tight">{item.name}</td>
                                    <td className="px-10 py-6 text-[10px] font-bold opacity-60 uppercase">{item.cat}</td>
                                    <td className="px-10 py-6 text-sm font-black text-orange-600">{item.price}</td>
                                    <td className="px-10 py-6 text-[10px] font-black opacity-60 uppercase tracking-widest">{item.brand}</td>
                                    <td className="px-10 py-6">
                                        <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${item.status === 'In Stock' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'}`}>{item.status}</span>
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

export default IntMaterials;
