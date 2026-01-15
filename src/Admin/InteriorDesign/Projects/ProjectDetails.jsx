import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiGrid, FiUsers, FiImage, FiBox, FiShoppingBag, FiTruck, FiCheckCircle, FiDollarSign, FiClock, FiFileText, FiMapPin, FiMaximize2, FiInfo, FiPlus, FiLock } from 'react-icons/fi';

const IntProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Overview');

    const tabs = [
        { name: 'Overview', icon: <FiGrid /> },
        { name: 'Client', icon: <FiUsers /> },
        { name: 'Mood Board', icon: <FiImage /> },
        { name: 'Design & 3D', icon: <FiImage /> },
        { name: 'Materials & BOQ', icon: <FiBox /> },
        { name: 'Vendors', icon: <FiShoppingBag /> },
        { name: 'Site Work', icon: <FiTruck /> },
        { name: 'Approvals', icon: <FiCheckCircle /> },
        { name: 'Billing', icon: <FiDollarSign /> },
        { name: 'Closure', icon: <FiLock /> }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'Overview':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-in fade-in duration-500 text-indigo-900 dark:text-white">
                        <div className="lg:col-span-2 space-y-10">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                                    <span className="w-1.5 h-8 bg-orange-600 rounded-full"></span>
                                    Concept & Scope
                                </h3>
                                <p className="text-gray-900 dark:text-orange-200 font-bold leading-relaxed">
                                    A contemporary minimalist residence transformation focusing on open spaces, natural textures, and smart home integration. The project includes a master suite, open kitchen, and curated lighting solutions.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                                {[
                                    { label: 'Area (SQFT)', value: '2,450', icon: <FiMaximize2 /> },
                                    { label: 'Theme/Style', value: 'Modern Minimalist', icon: <FiImage /> },
                                    { label: 'Est. Budget', value: '₹45,00,000', icon: <FiDollarSign /> },
                                    { label: 'Start Date', value: 'Jan 02, 2024', icon: <FiClock /> },
                                    { label: 'Target Date', value: 'Apr 30, 2024', icon: <FiCheckCircle /> },
                                    { label: 'Lead Designer', value: 'Ar. Sameer Sen', icon: <FiUsers /> },
                                ].map((item, i) => (
                                    <div key={i} className="p-6 bg-orange-50/30 dark:bg-brand-800/20 rounded-3xl border border-orange-200 dark:border-brand-800/50">
                                        <div className="text-orange-600 text-xl mb-3">{item.icon}</div>
                                        <p className="text-[9px] font-black text-gray-700 uppercase tracking-widest">{item.label}</p>
                                        <p className="text-xs font-black text-gray-900 dark:text-white mt-1 uppercase tracking-tight">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div className="p-8 bg-orange-600 rounded-[2.5rem] shadow-brand text-white">
                                <h4 className="text-xl font-black uppercase tracking-tight mb-4 text-center">Transformation Progress</h4>
                                <div className="relative w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/10" />
                                        <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="364" strokeDashoffset="210" className="text-white" strokeLinecap="round" />
                                    </svg>
                                    <span className="absolute text-2xl font-black italic">42%</span>
                                </div>
                                <p className="text-center text-[10px] font-bold opacity-80 uppercase tracking-widest">Phase: Working Drawings</p>
                            </div>

                            <div className="bg-white dark:bg-brand-900/50 p-8 rounded-[2.5rem] shadow-premium border border-orange-50 dark:border-orange-800 text-indigo-900 dark:text-white">
                                <h4 className="text-lg font-black uppercase tracking-tight mb-4">Space Breakdown</h4>
                                <div className="space-y-4">
                                    {['Master Bedroom', 'Living Room', 'Modular Kitchen', 'Guest Suite'].map((room, i) => (
                                        <div key={i} className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest ">
                                            <span className="opacity-60">{room}</span>
                                            <span className="text-orange-600">Active</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Mood Board':
                return (
                    <div className="space-y-10 animate-in fade-in duration-500 text-indigo-900 dark:text-white">
                        <div className="flex justify-between items-center">
                            <h3 className="text-2xl font-black uppercase tracking-tight underline decoration-orange-500 decoration-8 underline-offset-8">Visual Palettes</h3>
                            <button className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest group"><FiPlus /> Add Reference</button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { title: 'Terrazzo Tiles', cat: 'Flooring', img: '🧩' },
                                { title: 'Walnut Wood', cat: 'Furniture', img: '🪵' },
                                { title: 'Brushed Brass', cat: 'Hardware', img: '✨' },
                                { title: 'Sage Green', cat: 'Wall Paint', img: '🎨' },
                            ].map((item, i) => (
                                <div key={i} className="group bg-orange-50/20 dark:bg-brand-800/30 p-8 rounded-[2.5rem] border border-orange-50 dark:border-brand-800 text-center hover:-translate-y-2 transition-all">
                                    <div className="w-20 h-20 mx-auto bg-white dark:bg-brand-900 rounded-3xl flex items-center justify-center text-4xl shadow-premium mb-6 group-hover:scale-110 transition-transform">{item.img}</div>
                                    <p className="text-[9px] font-black text-orange-500 uppercase tracking-[0.2em] mb-1">{item.cat}</p>
                                    <h4 className="text-sm font-black uppercase tracking-tight">{item.title}</h4>
                                </div>
                            ))}
                        </div>
                        <div className="p-8 bg-orange-50/10 dark:bg-brand-800/10 rounded-[3rem] border border-orange-100 dark:border-brand-800 italic text-sm font-medium opacity-70 leading-relaxed text-center">
                            "Mood board approved by client on Jan 10th. Style leaning towards Scandinavian-Industrial fusion."
                        </div>
                    </div>
                );
            case 'Materials & BOQ':
                return (
                    <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700">
                        <div className="flex justify-between items-center">
                            <h4 className="text-xl font-black text-indigo-900 dark:text-white uppercase tracking-tight underline decoration-orange-500 decoration-8 underline-offset-8">Bill of Quantities</h4>
                            <div className="flex gap-4">
                                <span className="px-6 py-3 bg-orange-50 dark:bg-brand-800 text-orange-600 rounded-2xl text-[10px] font-black uppercase tracking-widest">Total: ₹28.4 L</span>
                                <button className="px-6 py-3 bg-indigo-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><FiFileText /> Export BOQ</button>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-brand-900/30 rounded-[2.5rem] border border-orange-50 dark:border-brand-800 overflow-hidden shadow-premium">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-orange-50/50 dark:bg-brand-900/50">
                                        {['Item Description', 'Brand/Spec', 'Qty', 'Unit', 'Price', 'Total'].map(h => (
                                            <th key={h} className="px-8 py-4 text-[10px] font-black text-gray-400 dark:text-orange-400 uppercase tracking-widest">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-orange-50 dark:divide-brand-800">
                                    {[
                                        { name: 'Velvet Sofa (Custom)', brand: 'Artisan Workshop', qty: 1, unit: 'Pc', price: '₹1,25,000', total: '₹1,25,000' },
                                        { name: 'Onyx Marble Slab', brand: 'Italian Import', qty: 450, unit: 'Sqft', price: '₹850', total: '₹3,82,500' },
                                        { name: 'LED Accent Lights', brand: 'Philips Hue', qty: 12, unit: 'Nos', price: '₹4,200', total: '₹50,400' },
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-orange-50/20 text-indigo-900 dark:text-white transition-colors">
                                            <td className="px-8 py-5 text-xs font-black uppercase">{row.name}</td>
                                            <td className="px-8 py-5 text-[10px] font-bold opacity-60 italic">{row.brand}</td>
                                            <td className="px-8 py-5 text-xs font-black">{row.qty}</td>
                                            <td className="px-8 py-5 text-[10px] font-black uppercase">{row.unit}</td>
                                            <td className="px-8 py-5 text-xs font-black">{row.price}</td>
                                            <td className="px-8 py-5 text-sm font-black text-orange-600 italic">{row.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'Vendors':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
                        {[
                            { name: 'Modular Kraft', role: 'Kitchen & Wardrobes', status: 'In Production', color: 'orange' },
                            { name: 'Zenith Carpentry', role: 'Custom Furniture', status: 'Measuring', color: 'indigo' },
                            { name: 'Glow Electricals', role: 'Automation & Lighting', status: 'Awaiting BOQ', color: 'emerald' },
                        ].map((v, i) => (
                            <div key={i} className="bg-white dark:bg-brand-900/30 p-8 rounded-[3rem] border border-orange-50 dark:border-brand-800 shadow-premium flex justify-between items-center group hover:border-orange-500 transition-all">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-orange-50 dark:bg-brand-800 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">🏭</div>
                                    <div>
                                        <h4 className="text-lg font-black text-indigo-900 dark:text-white uppercase tracking-tight">{v.name}</h4>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{v.role}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="px-4 py-1.5 bg-orange-100 dark:bg-brand-800 text-indigo-700 text-[9px] font-black uppercase tracking-widest rounded-xl border border-orange-200 dark:border-brand-700 uppercase">{v.status}</span>
                                    <button className="block mt-4 text-[10px] font-black text-orange-600 uppercase tracking-widest hover:underline">Track Order</button>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            default:
                return (
                    <div className="flex flex-col items-center justify-center h-full text-center py-20 opacity-30">
                        <span className="text-8xl mb-8">🛠️</span>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight uppercase tracking-wider">{activeTab} Section</h2>
                        <p className="max-w-md mx-auto mt-4 text-gray-500 dark:text-orange-300 font-medium">
                            Tailored Interior Design interface for <span className="font-bold text-orange-600 italic">"{activeTab}"</span> is operational.
                        </p>
                    </div>
                );
        }
    };

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white dark:bg-brand-900/40 p-10 rounded-[4rem] shadow-premium border border-orange-50/50 dark:border-brand-800/50">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/int-projects')}
                        className="w-16 h-16 bg-orange-50 dark:bg-brand-900/50 text-orange-600 dark:text-orange-300 rounded-3xl flex items-center justify-center shadow-premium hover:bg-orange-600 hover:text-white transition-all transform active:scale-95"
                    >
                        <FiArrowLeft className="text-3xl" />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em]">{id}</span>
                            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[9px] font-black uppercase tracking-widest rounded-lg">Transformation WIP</span>
                        </div>
                        <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter mt-1 uppercase tracking-wide">Velvet Villa Penthouse</h1>
                        <p className="text-xs font-bold text-gray-500 dark:text-orange-300 mt-1 uppercase tracking-widest">Main Client: <span className="text-orange-600 font-black">Khanna Residences</span></p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-8 py-4 bg-orange-50 dark:bg-brand-900/40 text-orange-600 dark:text-orange-300 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:shadow-premium transition-all">
                        <FiImage /> Render Gallery
                    </button>
                    <button className="flex items-center gap-3 px-10 py-5 bg-orange-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-brand hover:scale-102 active:scale-95 transition-all">
                        Project Log
                    </button>
                </div>
            </div>

            {/* Premium Tabbed Navigation */}
            <div className="flex flex-wrap gap-2 bg-white/40 dark:bg-brand-900/10 p-2.5 rounded-[2.5rem] border border-orange-50/50 dark:border-brand-800/50 backdrop-blur-xl overflow-x-auto no-scrollbar shadow-inner">
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={`flex items-center gap-3 px-6 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.name
                            ? 'bg-orange-600 text-white shadow-brand scale-105'
                            : 'text-gray-500 dark:text-orange-400 hover:bg-white dark:hover:bg-brand-800/80'
                            }`}
                    >
                        <span className="text-xl">{tab.icon}</span>
                        {tab.name}
                    </button>
                ))}
            </div>

            {/* Dynamic Content Area */}
            <div className="bg-white dark:bg-brand-900/30 min-h-[600px] rounded-[4.5rem] shadow-premium border border-orange-50/50 dark:border-brand-800/50 p-10 lg:p-14 animate-in slide-in-from-bottom-8 duration-700">
                {renderContent()}
            </div>
        </div>
    );
};

export default IntProjectDetails;
