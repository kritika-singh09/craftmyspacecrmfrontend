import React from 'react';
import { FiBarChart2, FiPieChart, FiTrendingUp, FiDownload, FiFilter, FiCalendar } from 'react-icons/fi';

const IntReports = () => {
    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight uppercase tracking-tight">Design <span className="text-orange-600">Analytics</span></h1>
                    <p className="text-gray-800 dark:text-orange-300 mt-2 font-medium tracking-wide">Analyze budget vs actuals, material delivery trends, and client approval efficiency.</p>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all">
                    <FiDownload className="text-lg" /> Export Financials
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {[
                    { title: 'Budget vs Actual Spend', desc: 'Real-time monitoring of project costs compared to initial client estimates.', icon: <FiBarChart2 />, stats: '₹12L Variance' },
                    { title: 'Vendor TAT Analysis', desc: 'Track average days taken by vendors to deliver custom furniture and components.', icon: <FiTrendingUp />, stats: '9.2 Days Avg' },
                    { title: 'Mood Board Conversions', desc: 'Success rate of various design styles and time to reach final client sign-off.', icon: <FiPieChart />, stats: '82% Approved' },
                    { title: 'Material wastage Report', desc: 'Analysis of unused materials per site to improve future BOQ accuracy.', icon: <FiFilter />, stats: '-4% Waste' },
                ].map((report, i) => (
                    <div key={i} className="group bg-white dark:bg-brand-900/30 p-10 rounded-[3rem] shadow-premium border border-orange-50/50 dark:border-brand-800/50 hover:shadow-premium-xl transition-all duration-500 flex items-start gap-8">
                        <div className="w-16 h-16 rounded-2xl bg-orange-50 dark:bg-brand-800 flex items-center justify-center text-3xl text-orange-600 shadow-sm">{report.icon}</div>
                        <div className="flex-1 text-indigo-900 dark:text-white">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-black uppercase tracking-tight">{report.title}</h3>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-xl">{report.stats}</span>
                            </div>
                            <p className="text-sm font-medium text-gray-800 dark:text-orange-300 leading-relaxed mb-6">{report.desc}</p>
                            <button className="text-[10px] font-black text-orange-600 uppercase tracking-widest hover:underline">Download Detailed CSV</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-12 bg-indigo-900 rounded-[4rem] text-white text-center space-y-8 shadow-brand-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/20 rounded-full -mr-40 -mt-40 blur-3xl"></div>
                <div className="relative z-10">
                    <h4 className="text-3xl font-black tracking-tight mb-2 uppercase tracking-wide">Site Productivity Score</h4>
                    <p className="text-orange-100 font-medium opacity-80 max-w-2xl mx-auto">Your site execution efficiency has improved by 18% this month due to better vendor coordination.</p>
                </div>
            </div>
        </div>
    );
};

export default IntReports;
