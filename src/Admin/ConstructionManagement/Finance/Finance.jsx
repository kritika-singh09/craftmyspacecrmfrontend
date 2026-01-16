import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext.jsx';

const Finance = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  const financialData = {
    totalBudget: 180000000,
    totalSpent: 95000000,
    pendingPayments: 15000000,
    profit: 12000000
  };

  const clientBills = [
    { id: 'RA-001', date: '2024-01-10', project: 'Shopping Mall', amount: 1500000, certified: 1450000, retention: 75000, status: 'Certified', gst: '18%' },
    { id: 'RA-002', date: '2024-01-14', project: 'Resi Tower', amount: 800000, certified: 0, retention: 40000, status: 'In Review', gst: '18%' }
  ];

  const variations = [
    { id: 'VAR-001', date: '2024-01-12', project: 'Shopping Mall', title: 'Additional HVAC ducting', impact: '+ ₹45,000', status: 'Approved', type: 'Scope Change' },
    { id: 'VAR-002', date: '2024-01-15', project: 'Resi Tower', title: 'Premium flooring upgrade', impact: '+ ₹1,20,000', status: 'Pending Approval', type: 'Quality Upgrade' }
  ];

  return (
    <div className="space-y-8 pb-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: theme.textPrimary }}>Enterprise Finance</h2>
          <p className="text-sm font-medium mt-1" style={{ color: theme.textSecondary }}>Billing, Variations & Cash Flow Management</p>
        </div>
        <div className="flex gap-4">
          <div className="flex p-1 rounded-2xl border" style={{ backgroundColor: `${theme.iconBg}05`, borderColor: theme.cardBorder }}>
            {['overview', 'client billing', 'variations'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'text-white' : 'opacity-60 hover:opacity-100'}`}
                style={{
                  background: activeTab === tab ? theme.gradients.button : 'transparent',
                  color: activeTab === tab ? theme.textOnPrimary : theme.textPrimary
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <button
            className="group flex items-center gap-2 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-premium transition-all hover:-translate-y-0.5"
            style={{ background: theme.gradients.button }}
          >
            <span className="text-xl leading-none group-hover:rotate-90 transition-transform">+</span>
            Post Transaction
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card-premium p-6 group transition-all" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: theme.primary }}>Total Budget</p>
              <div className="text-2xl font-black" style={{ color: theme.primary }}>₹{(financialData.totalBudget / 10000000).toFixed(1)} Cr</div>
            </div>
            <div className="card-premium p-6 group transition-all" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mb-2">Total Spent</p>
              <div className="text-2xl font-black text-red-700">₹{(financialData.totalSpent / 10000000).toFixed(1)} Cr</div>
            </div>
            <div className="card-premium p-6 group transition-all" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <p className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.2em] mb-2">Pending</p>
              <div className="text-2xl font-black text-yellow-700">₹{(financialData.pendingPayments / 10000000).toFixed(1)} Cr</div>
            </div>
            <div className="card-premium p-6 group transition-all" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <p className="text-[10px] font-black text-green-500 uppercase tracking-[0.2em] mb-2">Profit</p>
              <div className="text-2xl font-black text-green-700">₹{(financialData.profit / 10000000).toFixed(1)} Cr</div>
            </div>
          </div>

          <div className="card-premium p-8" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h3 className="text-xl font-black mb-8" style={{ color: theme.textPrimary }}>Project Budget Utilization</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl border transition-all" style={{ backgroundColor: `${theme.iconBg}10`, borderColor: theme.cardBorder }}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-black leading-tight" style={{ color: theme.textPrimary }}>Shopping Mall</h4>
                    <p className="text-[11px] font-bold uppercase tracking-widest mt-1" style={{ color: theme.textMuted }}>Budget: ₹5 Cr • Spent: ₹3.2 Cr</p>
                  </div>
                  <div className="text-right"><span className="text-sm font-black text-green-600">64% USED</span></div>
                </div>
                <div className="w-full bg-white rounded-full h-3 p-0.5 shadow-inner" style={{ backgroundColor: theme.background }}>
                  <div className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full shadow-sm" style={{ width: '64%' }}></div>
                </div>
              </div>
              <div className="p-6 rounded-2xl border transition-all" style={{ backgroundColor: `${theme.iconBg}10`, borderColor: theme.cardBorder }}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-black leading-tight" style={{ color: theme.textPrimary }}>Residential Tower</h4>
                    <p className="text-[11px] font-bold uppercase tracking-widest mt-1" style={{ color: theme.textMuted }}>Budget: ₹3 Cr • Spent: ₹1.2 Cr</p>
                  </div>
                  <div className="text-right"><span className="text-sm font-black" style={{ color: theme.primary }}>40% USED</span></div>
                </div>
                <div className="w-full bg-white rounded-full h-3 p-0.5 shadow-inner" style={{ backgroundColor: theme.background }}>
                  <div className="h-full rounded-full shadow-sm" style={{ width: '40%', background: theme.gradients.button }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'client billing' && (
        <div className="card-premium overflow-hidden animate-in slide-in-from-bottom-4 duration-500" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <div className="p-8 border-b flex justify-between items-center" style={{ borderColor: theme.cardBorder, backgroundColor: `${theme.iconBg}05` }}>
            <div>
              <h3 className="text-xl font-black" style={{ color: theme.textPrimary }}>Client RA Bills (Running Accounts)</h3>
              <p className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-60" style={{ color: theme.textSecondary }}>Certified Amount vs Invoiced</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ backgroundColor: `${theme.iconBg}15`, borderColor: theme.cardBorder }}>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Bill ID / Project</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Submitted Value</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Certified Value</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Retention (Tax)</th>
                  <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Status</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ divideColor: theme.cardBorder }}>
                {clientBills.map((bill) => (
                  <tr key={bill.id} className="group transition-colors hover:bg-slate-50/50" style={{ backgroundColor: theme.cardBg }}>
                    <td className="px-8 py-6">
                      <p className="font-bold" style={{ color: theme.textPrimary }}>{bill.id}</p>
                      <p className="text-[10px] font-bold uppercase tracking-tight" style={{ color: theme.textMuted }}>{bill.project}</p>
                    </td>
                    <td className="px-8 py-6 font-black" style={{ color: theme.textSecondary }}>₹{bill.amount.toLocaleString()}</td>
                    <td className="px-8 py-6 font-black" style={{ color: theme.primary }}>₹{bill.certified ? bill.certified.toLocaleString() : '---'}</td>
                    <td className="px-8 py-6">
                      <p className="text-[10px] font-black" style={{ color: theme.textPrimary }}>₹{bill.retention.toLocaleString()}</p>
                      <p className="text-[9px] font-black text-blue-600 uppercase">GST {bill.gst}</p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border rounded-xl ${bill.status === 'Certified' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                        }`}>
                        {bill.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'variations' && (
        <div className="card-premium overflow-hidden animate-in slide-in-from-bottom-4 duration-500" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <div className="p-8 border-b" style={{ borderColor: theme.cardBorder, backgroundColor: `${theme.iconBg}05` }}>
            <h3 className="text-xl font-black" style={{ color: theme.textPrimary }}>Change Management / Variations</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ backgroundColor: `${theme.iconBg}15`, borderColor: theme.cardBorder }}>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Request Details</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Type</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Cost Impact</th>
                  <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Status</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ divideColor: theme.cardBorder }}>
                {variations.map((v) => (
                  <tr key={v.id} className="group transition-colors hover:bg-slate-50/50" style={{ backgroundColor: theme.cardBg }}>
                    <td className="px-8 py-6">
                      <p className="font-bold" style={{ color: theme.textPrimary }}>{v.title}</p>
                      <p className="text-[10px] font-bold uppercase tracking-tight" style={{ color: theme.textMuted }}>{v.project} • {v.date}</p>
                    </td>
                    <td className="px-8 py-6 text-[10px] font-black uppercase tracking-widest" style={{ color: theme.textSecondary }}>{v.type}</td>
                    <td className="px-8 py-6 font-black" style={{ color: v.impact.includes('+') ? 'red-600' : 'green-600' }}>{v.impact}</td>
                    <td className="px-8 py-6 text-right">
                      <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border rounded-xl ${v.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Finance;
