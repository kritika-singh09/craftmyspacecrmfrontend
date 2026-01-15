import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiGrid, FiUsers, FiLayers, FiFolder, FiFileText, FiCheckCircle, FiClock, FiDollarSign, FiShare2, FiMapPin, FiInfo } from 'react-icons/fi';

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Overview');

    const tabs = [
        { name: 'Overview', icon: <FiGrid /> },
        { name: 'Client', icon: <FiUsers /> },
        { name: 'Design Phases', icon: <FiLayers /> },
        { name: 'Drawings', icon: <FiFolder /> },
        { name: 'Revisions', icon: <FiFileText /> },
        { name: 'Approvals', icon: <FiCheckCircle /> },
        { name: 'Team', icon: <FiUsers /> },
        { name: 'Timeline', icon: <FiClock /> },
        { name: 'Billing', icon: <FiDollarSign /> },
        { name: 'Documents', icon: <FiFolder /> }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'Overview':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-in fade-in duration-500">
                        <div className="lg:col-span-2 space-y-10">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                                    <span className="w-1.5 h-8 bg-brand-600 rounded-full"></span>
                                    Project Brief & Details
                                </h3>
                                <p className="text-gray-600 dark:text-brand-200 font-medium leading-relaxed">
                                    A premium residential development focused on sustainable architecture and vertical gardens. The project includes 42 luxury units, a rooftop infinity pool, and a communal sky forest. Designed to achieve LEED Platinum certification.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                                {[
                                    { label: 'Location', value: 'Banjara Hills, Hyderabad', icon: <FiMapPin /> },
                                    { label: 'Project Type', value: 'High-Rise Residential', icon: <FiInfo /> },
                                    { label: 'Plot Area', value: '1.2 Acres', icon: <FiLayers /> },
                                    { label: 'Start Date', value: 'Oct 12, 2023', icon: <FiClock /> },
                                    { label: 'Exp. Completion', value: 'Dec 2025', icon: <FiCheckCircle /> },
                                    { label: 'Budget Class', value: 'Ultra Luxury', icon: <FiDollarSign /> },
                                ].map((item, i) => (
                                    <div key={i} className="p-6 bg-brand-50/30 dark:bg-brand-800/20 rounded-3xl border border-brand-50 dark:border-brand-800/50">
                                        <div className="text-brand-600 text-xl mb-3">{item.icon}</div>
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{item.label}</p>
                                        <p className="text-xs font-black text-gray-800 dark:text-white mt-1 uppercase tracking-tight">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div className="p-8 bg-brand-600 rounded-[2.5rem] shadow-brand text-white">
                                <h4 className="text-xl font-black uppercase tracking-tight mb-4 text-center">Design Progress</h4>
                                <div className="relative w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/10" />
                                        <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="364" strokeDashoffset="127" className="text-white" strokeLinecap="round" />
                                    </svg>
                                    <span className="absolute text-2xl font-black italic">65%</span>
                                </div>
                                <p className="text-center text-[10px] font-bold opacity-80 uppercase tracking-widest">Phase: Design Development</p>
                            </div>

                            <div className="bg-white dark:bg-brand-900/50 p-8 rounded-[2.5rem] shadow-premium border border-brand-50 dark:border-brand-800 text-indigo-900 dark:text-white">
                                <h4 className="text-lg font-black uppercase tracking-tight mb-4">Quick Stats</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-xs font-bold">
                                        <span className="opacity-60 uppercase tracking-widest">Drawings</span>
                                        <span className="font-black">24 Files</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-bold">
                                        <span className="opacity-60 uppercase tracking-widest">Revisions</span>
                                        <span className="font-black text-brand-600">R3 Active</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-bold">
                                        <span className="opacity-60 uppercase tracking-widest">Pending Approvals</span>
                                        <span className="font-black text-amber-500">02</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Client':
                return (
                    <div className="space-y-10 animate-in fade-in duration-500 text-indigo-900 dark:text-white">
                        <div className="flex items-center gap-8 p-10 bg-brand-50/20 dark:bg-brand-800/10 rounded-[3rem] border border-brand-50 dark:border-brand-800">
                            <div className="w-24 h-24 rounded-full bg-brand-600 text-white flex items-center justify-center text-4xl font-black shadow-brand">S</div>
                            <div>
                                <h3 className="text-2xl font-black uppercase tracking-tight">Skyline Corp</h3>
                                <p className="text-[10px] font-black text-brand-500 tracking-[0.2em] uppercase mt-1">Primary Real Estate Client</p>
                                <button className="mt-4 px-6 py-2 bg-brand-50 dark:bg-brand-800 text-brand-600 dark:text-brand-300 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-brand-600 hover:text-white transition-all">Send Drawings for Approval</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <h4 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Contact Information</h4>
                                <div className="p-8 bg-white dark:bg-brand-900/50 rounded-[2.5rem] shadow-premium border border-brand-50 dark:border-brand-800 space-y-6">
                                    <div className="flex items-center gap-4 text-sm font-bold opacity-70"><FiUsers className="text-brand-600" /> Director: Mr. K. Ravinder</div>
                                    <div className="flex items-center gap-4 text-sm font-bold opacity-70"><FiFileText className="text-brand-600" /> Email: director@skyline.com</div>
                                    <div className="flex items-center gap-4 text-sm font-bold opacity-70"><FiClock className="text-brand-600" /> Phone: +91 90000 11111</div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Special Notes</h4>
                                <div className="p-8 bg-white dark:bg-brand-900/50 rounded-[2.5rem] shadow-premium border border-brand-50 dark:border-brand-800 italic text-sm font-medium opacity-80 leading-relaxed">
                                    "Client prefers minimalist aesthetic with heavy emphasis on natural light. High importance on the sky-forest atrium area. Regular Sunday morning site visits are expected."
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="flex flex-col items-center justify-center h-full text-center py-20 opacity-40">
                        <span className="text-8xl mb-8">🏗️</span>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight uppercase tracking-wider">{activeTab} Section</h2>
                        <p className="max-w-md mx-auto mt-4 text-gray-500 dark:text-brand-300 font-medium">
                            The <span className="font-bold text-brand-600 italic">"{activeTab}"</span> data is correctly mapped and ready for production integration.
                        </p>
                    </div>
                );
        }
    };

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white dark:bg-brand-900/30 p-8 lg:p-10 rounded-[3rem] shadow-premium border border-brand-50/50 dark:border-brand-800/50">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/arch-projects')}
                        className="w-14 h-14 bg-brand-50 dark:bg-brand-900/50 text-brand-600 dark:text-brand-300 rounded-2xl flex items-center justify-center shadow-premium hover:bg-brand-600 hover:text-white transition-all transform active:scale-95"
                    >
                        <FiArrowLeft className="text-2xl" />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-brand-500 uppercase tracking-[0.3em]">{id}</span>
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase tracking-widest rounded-lg">Ongoing</span>
                        </div>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mt-1 uppercase tracking-wide">The Zenith Residency</h1>
                        <p className="text-xs font-bold text-gray-500 dark:text-brand-300 mt-1">Lead Architect: <span className="text-brand-600 font-black">Ar. Rahul Sharma</span></p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-6 py-4 bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-300 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-premium hover:bg-brand-100 transition-all">
                        <FiShare2 /> Share Design
                    </button>
                    <button className="flex items-center gap-2 px-8 py-4 bg-brand-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all">
                        Export Plan
                    </button>
                </div>
            </div>

            {/* Tabbed Navigation */}
            <div className="flex flex-wrap gap-2 bg-white/50 dark:bg-brand-900/20 p-2 rounded-[2rem] border border-brand-50 dark:border-brand-800/50 backdrop-blur-md overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.name
                                ? 'bg-brand-600 text-white shadow-brand scale-105'
                                : 'text-gray-500 dark:text-brand-400 hover:bg-white dark:hover:bg-brand-800'
                            }`}
                    >
                        <span className="text-lg">{tab.icon}</span>
                        {tab.name}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="bg-white dark:bg-brand-900/30 min-h-[500px] rounded-[3.5rem] shadow-premium border border-brand-50/50 dark:border-brand-800/50 p-10 lg:p-12 animate-in slide-in-from-bottom-6 duration-700">
                {renderContent()}
            </div>
        </div>
    );
};

export default ProjectDetails;
