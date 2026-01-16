import React from 'react';
import { FiBarChart2, FiPieChart, FiTrendingUp, FiActivity, FiDownloadCloud } from 'react-icons/fi';

const SuperAdminReports = () => {
    return (
        <div className="space-y-8 pb-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Intelligence Hub</h1>
                    <p className="text-sm font-bold text-gray-900 mt-1">Cross-Platform Analytical Data & Performance Reports</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => alert('Preparing master analytics export... Check your downloads in a moment.')}
                        className="flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-2xl font-black text-xs shadow-premium hover:bg-brand-700 transition-all hover:-translate-y-0.5"
                    >
                        <FiDownloadCloud className="text-lg" />
                        Export Master Analytics
                    </button>
                </div>
            </div>

            {/* Analytics Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 card-premium p-8">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h3 className="text-xl font-black text-gray-900">Platform Growth Velocity</h3>
                            <p className="text-[10px] font-black text-gray-800 uppercase tracking-widest mt-1">Entity Onboarding vs Exit Metrics</p>
                        </div>
                        <div className="flex gap-2">
                            {['Daily', 'Weekly', 'Monthly'].map((period) => (
                                <button key={period} className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${period === 'Monthly' ? 'bg-brand-600 text-white shadow-md' : 'bg-brand-50 text-brand-600 hover:bg-brand-100'
                                    }`}>
                                    {period}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Visual Placeholder for a Chart */}
                    <div className="h-[300px] w-full bg-brand-50/30 rounded-3xl relative overflow-hidden flex items-end px-12 pb-12 gap-4">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                            <div key={i} className="flex-1 bg-gradient-to-t from-brand-600 to-purple-500 rounded-t-xl transition-all duration-1000 hover:scale-x-110" style={{ height: `${h}%` }}></div>
                        ))}
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-brand-100"></div>
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-6">
                        <div className="text-center">
                            <p className="text-[10px] font-black text-gray-800 uppercase tracking-widest">New Signups</p>
                            <p className="text-2xl font-black text-gray-900 mt-1">128</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] font-black text-gray-800 uppercase tracking-widest">Growth Rate</p>
                            <p className="text-2xl font-black text-green-600 mt-1">+14.2%</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] font-black text-gray-800 uppercase tracking-widest">LTV (Avg)</p>
                            <p className="text-2xl font-black text-brand-600 mt-1">₹4.2L</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="card-premium p-8">
                        <h3 className="text-xl font-black text-gray-900 mb-6">Module Utilization</h3>
                        <div className="space-y-6">
                            {[
                                { name: 'Core ERP', usage: 92, color: 'bg-brand-600' },
                                { name: 'Finance Hub', usage: 78, color: 'bg-purple-500' },
                                { name: 'Project Matrix', usage: 85, color: 'bg-indigo-500' },
                                { name: 'Doc Vault', usage: 45, color: 'bg-gray-400' },
                            ].map((module) => (
                                <div key={module.name}>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">{module.name}</span>
                                        <span className="text-[10px] font-black text-gray-900">{module.usage}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div className={`h-full ${module.color} transition-all duration-1000`} style={{ width: `${module.usage}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card-premium p-8 bg-brand-900 text-white border-none shadow-brand-premium">
                        <FiActivity className="text-3xl text-brand-400 mb-4" />
                        <h3 className="text-xl font-black mb-2 leading-tight">System Integrity Report</h3>
                        <p className="text-xs font-medium text-brand-300 mb-6">Platform-wide health check across all clusters and nodes.</p>
                        <div className="flex items-center gap-2 text-green-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            All Systems Functional
                        </div>
                        <button className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Detailed Health Audit</button>
                    </div>
                </div>
            </div>

            {/* Custom Report Builder Preview */}
            <div className="card-premium p-10 border-dashed border-2 border-brand-200 bg-brand-50/10">
                <div className="max-w-xl mx-auto text-center space-y-6">
                    <div className="w-20 h-20 bg-brand-50 rounded-3xl flex items-center justify-center text-3xl text-brand-600 mx-auto">
                        <FiBarChart2 />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">Custom Data Extraction</h2>
                    <p className="text-gray-900 font-bold">Generate cross-tenant reports with granular filters. Select metrics, entities, and date ranges to build your custom intelligence stream.</p>
                    <button
                        onClick={() => alert('Report Builder Engine initializing...')}
                        className="px-10 py-5 bg-brand-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-brand-700 shadow-premium transition-all hover:-translate-y-1"
                    >
                        Launch Report Builder
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminReports;
