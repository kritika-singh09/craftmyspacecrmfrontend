import React from 'react';
import { useTheme } from '../../../context/ThemeContext.jsx';
import { FiSettings, FiBarChart2, FiDollarSign, FiUsers, FiPackage, FiTrendingUp, FiStar, FiFileText } from 'react-icons/fi';

const Reports = () => {
  const { theme } = useTheme();

  return (
    <div className="space-y-8 pb-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: theme.textPrimary }}>Intelligence</h2>
          <p className="text-sm font-medium mt-1" style={{ color: theme.textSecondary }}>Deep Analytics and Performance Metrics</p>
        </div>
        <button
          className="group flex items-center gap-2 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-premium transition-all hover:-translate-y-0.5"
          style={{ background: theme.gradients.button }}
        >
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
          <div
            key={idx}
            className="card-premium p-8 text-center group cursor-pointer transition-all border"
            style={{
              backgroundColor: theme.cardBg,
              borderColor: theme.cardBorder
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${theme.iconBg}15` }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = theme.cardBg }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform shadow-sm"
              style={{
                backgroundColor: `${theme.iconBg}20`,
                color: theme.activeLink
              }}
            >
              {cat.icon}
            </div>
            <h3 className="font-black transition-colors uppercase tracking-widest text-[11px] mb-1" style={{ color: theme.textPrimary }}>{cat.title}</h3>
            <p className="text-[10px] font-bold leading-tight" style={{ color: theme.textMuted }}>{cat.desc}</p>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="card-premium p-8" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
        <h3 className="text-xl font-black mb-8 flex items-center gap-2" style={{ color: theme.textPrimary }}>
          Key Performance Indicators
          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-lg border border-green-100 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Real-time
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className="p-6 rounded-2xl border transition-all flex items-center justify-between"
            style={{
              backgroundColor: `${theme.iconBg}10`,
              borderColor: theme.cardBorder
            }}
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1" style={{ color: theme.textSecondary }}>Overall Progress</p>
              <p className="text-3xl font-black" style={{ color: theme.textPrimary }}>85%</p>
            </div>
            <div className="w-12 h-12 rounded-full border-4 animate-spin-slow" style={{ borderColor: `${theme.iconBg}30`, borderTopColor: theme.activeLink }}></div>
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
      <div className="card-premium overflow-hidden" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
        <div className="p-8 border-b flex justify-between items-center" style={{ borderColor: theme.cardBorder, backgroundColor: `${theme.iconBg}05` }}>
          <h3 className="text-xl font-black" style={{ color: theme.textPrimary }}>Archive Activity</h3>
          <button className="text-[10px] font-black uppercase tracking-widest hover:text-opacity-80 transition-colors" style={{ color: theme.textSecondary }}>History</button>
        </div>
        <div className="p-8 space-y-4">
          {[
            { title: 'Monthly Project Progress Report', date: 'Jan 15, 2024', kind: 'Production' },
            { title: 'Financial Summary - Q4 2023', date: 'Jan 10, 2024', kind: 'Strategic' },
            { title: 'Workforce Attendance Report', date: 'Jan 8, 2024', kind: 'Operational' }
          ].map((report, idx) => (
            <div
              key={idx}
              className="group flex justify-between items-center p-5 rounded-2xl border transition-all cursor-pointer"
              style={{
                backgroundColor: `${theme.iconBg}10`,
                borderColor: theme.cardBorder
              }}
            >
              <div className="flex items-center gap-5">
                <div
                  className="w-12 h-12 rounded-xl shadow-sm flex items-center justify-center text-xl group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: theme.cardBg, color: theme.activeLink }}
                ><FiFileText /></div>
                <div>
                  <p className="font-bold transition-colors" style={{ color: theme.textPrimary }}>{report.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-[10px] font-bold uppercase tracking-tight" style={{ color: theme.textMuted }}>Generated • {report.date}</p>
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.textMuted }}></span>
                    <p className="text-[10px] font-bold uppercase tracking-tight italic" style={{ color: theme.textSecondary }}>{report.kind}</p>
                  </div>
                </div>
              </div>
              <button
                className="py-2.5 px-6 rounded-xl border text-[10px] font-black uppercase tracking-widest shadow-sm transition-all active:scale-95"
                style={{
                  backgroundColor: theme.cardBg,
                  borderColor: theme.cardBorder,
                  color: theme.textSecondary
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme.activeLink;
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = theme.activeLink;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = theme.cardBg;
                  e.currentTarget.style.color = theme.textSecondary;
                  e.currentTarget.style.borderColor = theme.cardBorder;
                }}
              >
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
