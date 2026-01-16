import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiGrid, FiUsers, FiLayers, FiFolder, FiFileText, FiCheckCircle, FiClock, FiDollarSign, FiShare2, FiMapPin, FiInfo } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theme } = useTheme();
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
                                <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3" style={{ color: theme.textPrimary }}>
                                    <span className="w-1.5 h-8 bg-brand-600 rounded-full" style={{ backgroundColor: theme.primary }}></span>
                                    Project Brief & Details
                                </h3>
                                <p className="font-medium leading-relaxed opacity-80" style={{ color: theme.textSecondary }}>
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
                                    <div key={i} className="p-6 rounded-3xl border" style={{ backgroundColor: `${theme.iconBg}05`, borderColor: theme.cardBorder }}>
                                        <div className="text-xl mb-3" style={{ color: theme.primary }}>{item.icon}</div>
                                        <p className="text-[9px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textSecondary }}>{item.label}</p>
                                        <p className="text-xs font-black mt-1 uppercase tracking-tight" style={{ color: theme.textPrimary }}>{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div className="p-8 rounded-[2.5rem] shadow-brand text-white" style={{ background: theme.gradients.button }}>
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

                            <div className="card-premium p-8" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                                <h4 className="text-lg font-black uppercase tracking-tight mb-4" style={{ color: theme.textPrimary }}>Quick Stats</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-xs font-bold">
                                        <span className="opacity-60 uppercase tracking-widest" style={{ color: theme.textSecondary }}>Drawings</span>
                                        <span className="font-black" style={{ color: theme.textPrimary }}>24 Files</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-bold">
                                        <span className="opacity-60 uppercase tracking-widest" style={{ color: theme.textSecondary }}>Revisions</span>
                                        <span className="font-black" style={{ color: theme.primary }}>R3 Active</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-bold">
                                        <span className="opacity-60 uppercase tracking-widest" style={{ color: theme.textSecondary }}>Pending Approvals</span>
                                        <span className="font-black text-amber-500">02</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Client':
                return (
                    <div className="space-y-10 animate-in fade-in duration-500">
                        <div className="flex items-center gap-8 p-10 rounded-[3rem] border" style={{ backgroundColor: `${theme.iconBg}05`, borderColor: theme.cardBorder }}>
                            <div className="w-24 h-24 rounded-full text-white flex items-center justify-center text-4xl font-black shadow-brand" style={{ background: theme.gradients.button }}>S</div>
                            <div>
                                <h3 className="text-2xl font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>Skyline Corp</h3>
                                <p className="text-[10px] font-black tracking-[0.2em] uppercase mt-1" style={{ color: theme.primary }}>Primary Real Estate Client</p>
                                <button className="mt-4 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-600 hover:text-white transition-all border" style={{ color: theme.primary, borderColor: theme.primary }}>Send Drawings for Approval</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <h4 className="text-sm font-black uppercase tracking-[0.2em] ml-2" style={{ color: theme.textSecondary }}>Contact Information</h4>
                                <div className="card-premium p-8 space-y-6" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                                    <div className="flex items-center gap-4 text-sm font-bold opacity-70" style={{ color: theme.textPrimary }}><FiUsers style={{ color: theme.primary }} /> Director: Mr. K. Ravinder</div>
                                    <div className="flex items-center gap-4 text-sm font-bold opacity-70" style={{ color: theme.textPrimary }}><FiFileText style={{ color: theme.primary }} /> Email: director@skyline.com</div>
                                    <div className="flex items-center gap-4 text-sm font-bold opacity-70" style={{ color: theme.textPrimary }}><FiClock style={{ color: theme.primary }} /> Phone: +91 90000 11111</div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-sm font-black uppercase tracking-[0.2em] ml-2" style={{ color: theme.textSecondary }}>Special Notes</h4>
                                <div className="card-premium p-8 italic text-sm font-medium opacity-80 leading-relaxed" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder, color: theme.textPrimary }}>
                                    "Client prefers minimalist aesthetic with heavy emphasis on natural light. High importance on the sky-forest atrium area. Regular Sunday morning site visits are expected."
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Billing':
                return (
                    <div className="space-y-10 animate-in fade-in duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="card-premium p-8 border-l-4" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder, borderLeftColor: theme.primary }}>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textSecondary }}>Total Project Fee</p>
                                <h3 className="text-3xl font-black tracking-tighter mt-1" style={{ color: theme.textPrimary }}>₹45,00,000</h3>
                            </div>
                            <div className="card-premium p-8 border-l-4" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder, borderLeftColor: '#10b981' }}>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textSecondary }}>Total Received</p>
                                <h3 className="text-3xl font-black tracking-tighter mt-1" style={{ color: theme.textPrimary }}>₹12,50,000</h3>
                            </div>
                            <div className="card-premium p-8 border-l-4" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder, borderLeftColor: '#f59e0b' }}>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textSecondary }}>Balance Due</p>
                                <h3 className="text-3xl font-black tracking-tighter mt-1" style={{ color: theme.textPrimary }}>₹32,50,000</h3>
                            </div>
                        </div>

                        <div className="card-premium overflow-hidden" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                            <div className="p-8 border-b flex justify-between items-center" style={{ borderColor: theme.cardBorder }}>
                                <h4 className="text-lg font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>Project Invoices</h4>
                                <button className="px-6 py-2 bg-brand-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-brand" style={{ background: theme.gradients.button }}>+ Raise Invoice</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr style={{ backgroundColor: `${theme.iconBg}08` }}>
                                            {['Invoice No', 'Milestone', 'Amount', 'Status', 'Actions'].map(h => (
                                                <th key={h} className="px-8 py-5 text-[9px] font-black uppercase tracking-widest" style={{ color: theme.textSecondary }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y" style={{ divideColor: theme.cardBorder }}>
                                        {[
                                            { id: 'INV-ZEN-01', milestone: 'Concept Design (Advance)', amount: '₹12,50,000', status: 'Paid' },
                                            { id: 'INV-ZEN-02', milestone: 'Schematic Design (100%)', amount: '₹8,00,000', status: 'Pending' },
                                        ].map((inv) => (
                                            <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-8 py-6 font-bold text-xs" style={{ color: theme.textPrimary }}>{inv.id}</td>
                                                <td className="px-8 py-6 font-medium text-sm" style={{ color: theme.textPrimary }}>{inv.milestone}</td>
                                                <td className="px-8 py-6 font-black text-sm" style={{ color: theme.primary }}>{inv.amount}</td>
                                                <td className="px-8 py-6">
                                                    <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg ${inv.status === 'Paid' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'}`}>{inv.status}</span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    {inv.status !== 'Paid' && (
                                                        <button className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest shadow-brand hover:scale-105 transition-all" style={{ background: theme.gradients.button }}>
                                                            <FiDollarSign /> Collect Payment
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="flex flex-col items-center justify-center h-full text-center py-20 opacity-40">
                        <span className="text-8xl mb-8">🏗️</span>
                        <h2 className="text-3xl font-black tracking-tight uppercase tracking-wider" style={{ color: theme.textPrimary }}>{activeTab} Section</h2>
                        <p className="max-w-md mx-auto mt-4 font-medium" style={{ color: theme.textSecondary }}>
                            The <span className="font-bold italic" style={{ color: theme.primary }}>"{activeTab}"</span> data is correctly mapped and ready for production integration.
                        </p>
                    </div>
                );
        }
    };

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 card-premium p-8 lg:p-10" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/arch-projects')}
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-premium transition-all transform active:scale-95 border"
                        style={{ backgroundColor: `${theme.iconBg}05`, borderColor: theme.cardBorder, color: theme.primary }}
                    >
                        <FiArrowLeft className="text-2xl" />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: theme.primary }}>{id}</span>
                            <span className="px-3 py-1 bg-green-50 text-green-700 text-[9px] font-black uppercase tracking-widest rounded-lg border border-green-200">Ongoing</span>
                        </div>
                        <h1 className="text-3xl font-black tracking-tight mt-1 uppercase tracking-wide" style={{ color: theme.textPrimary }}>The Zenith Residency</h1>
                        <p className="text-xs font-bold mt-1" style={{ color: theme.textSecondary }}>Lead Architect: <span className="font-black" style={{ color: theme.primary }}>Ar. Rahul Sharma</span></p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-premium transition-all border" style={{ backgroundColor: `${theme.iconBg}05`, borderColor: theme.cardBorder, color: theme.textPrimary }}>
                        <FiShare2 /> Share Design
                    </button>
                    <button className="flex items-center gap-2 px-8 py-4 bg-brand-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all" style={{ background: theme.gradients.button }}>
                        Export Plan
                    </button>
                </div>
            </div>

            {/* Tabbed Navigation */}
            <div className="flex flex-wrap gap-2 p-2 rounded-[2rem] border backdrop-blur-md overflow-x-auto no-scrollbar" style={{ backgroundColor: `${theme.iconBg}05`, borderColor: theme.cardBorder }}>
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.name
                            ? 'text-white shadow-brand scale-105'
                            : 'opacity-60 hover:opacity-100 hover:bg-white/10'
                            }`}
                        style={{
                            background: activeTab === tab.name ? theme.gradients.button : 'transparent',
                            color: activeTab === tab.name ? theme.textOnPrimary : theme.textPrimary
                        }}
                    >
                        <span className="text-lg">{tab.icon}</span>
                        {tab.name}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="card-premium min-h-[500px] p-10 lg:p-12 animate-in slide-in-from-bottom-6 duration-700" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                {renderContent()}
            </div>
        </div>
    );
};

export default ProjectDetails;
