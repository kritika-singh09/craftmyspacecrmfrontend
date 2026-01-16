import React from 'react';
import { FiSettings, FiBarChart2, FiDollarSign, FiUsers, FiPackage, FiTrendingUp, FiStar, FiFileText } from 'react-icons/fi';

const Reports = () => {
  return (
    <div className="space-y-8 pb-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Intelligence</h2>
          <p className="text-sm font-medium text-gray-800 mt-1">Deep Analytics and Performance Metrics</p>
        </div>
        <button className="group flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-premium hover:bg-brand-700 transition-all hover:-translate-y-0.5">
          <FiSettings className="text-xl group-hover:rotate-90 transition-transform" />
          Configure Reports
        </button>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <FiBarChart2 className="text-3xl" />, title: 'Projects', desc: 'Progress & Performance' },
          { icon: <FiDollarSign className="text-3xl" />, title: 'Financials', desc: 'Budget & Yield' },
          { icon: <FiUsers className="text-3xl" />, title: 'Workforce', desc: 'Efficiency & Payroll' },
          { icon: <FiPackage className="text-3xl" />, title: 'Inventory', desc: 'Stock & Logistics' }
        ].map((cat, idx) => (
          <div key={idx} className="card-premium p-8 text-center group cursor-pointer hover:bg-brand-50/30 transition-all border border-brand-100/50 hover:border-brand-200">
            <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform shadow-sm">
              {cat.icon}
            </div>
            <h3 className="font-black text-gray-900 group-hover:text-brand-600 transition-colors uppercase tracking-widest text-[11px] mb-1">{cat.title}</h3>
            <p className="text-[10px] font-bold text-gray-900 leading-tight">{cat.desc}</p>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="card-premium p-8">
        <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-2">
          Key Performance Indicators
          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-lg border border-green-100 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Real-time
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-brand-50/30 rounded-2xl border border-brand-100 group hover:bg-brand-50 transition-all flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-brand-600 uppercase tracking-[0.2em] mb-1">Overall Progress</p>
              <p className="text-3xl font-black text-brand-700">85%</p>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-brand-200 border-t-brand-600 animate-spin-slow"></div>
          </div>
          <div className="p-6 bg-green-50/30 rounded-2xl border border-green-100 group hover:bg-green-50 transition-all flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em] mb-1">Monthly Yield</p>
              <p className="text-3xl font-black text-green-700">₹12L</p>
            </div>
            <FiTrendingUp className="text-2xl opacity-50" />
          </div>
          <div className="p-6 bg-yellow-50/30 rounded-2xl border border-yellow-100 group hover:bg-yellow-50 transition-all flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-yellow-600 uppercase tracking-[0.2em] mb-1">Client Satisfaction</p>
              <p className="text-3xl font-black text-yellow-700">95%</p>
            </div>
            <FiStar className="text-2xl opacity-50" />
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="card-premium overflow-hidden">
        <div className="p-8 border-b border-brand-50 bg-brand-50/30 flex justify-between items-center">
          <h3 className="text-xl font-black text-gray-900">Archive Activity</h3>
          <button className="text-[10px] font-black text-brand-600 uppercase tracking-widest hover:text-brand-800 transition-colors">History</button>
        </div>
        <div className="p-8 space-y-4">
          {[
            { title: 'Monthly Project Progress Report', date: 'Jan 15, 2024', kind: 'Production' },
            { title: 'Financial Summary - Q4 2023', date: 'Jan 10, 2024', kind: 'Strategic' },
            { title: 'Workforce Attendance Report', date: 'Jan 8, 2024', kind: 'Operational' }
          ].map((report, idx) => (
            <div key={idx} className="group flex justify-between items-center p-5 bg-brand-50/30 rounded-2xl border border-brand-100/50 hover:bg-brand-50 transition-all cursor-pointer">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl group-hover:scale-110 transition-transform"><FiFileText /></div>
                <div>
                  <p className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors">{report.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-[10px] font-bold text-gray-900 uppercase tracking-tight">Generated • {report.date}</p>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <p className="text-[10px] font-bold text-brand-500 uppercase tracking-tight italic">{report.kind}</p>
                  </div>
                </div>
              </div>
              <button className="py-2.5 px-6 rounded-xl bg-white border border-brand-100 text-brand-600 text-[10px] font-black uppercase tracking-widest hover:bg-brand-600 hover:text-white hover:border-brand-600 shadow-sm transition-all active:scale-95">
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
