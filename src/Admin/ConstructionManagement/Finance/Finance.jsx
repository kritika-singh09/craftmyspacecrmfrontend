import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext.jsx';
import FinanceForm from './FinanceForm';
import { FiPlus, FiX, FiEye, FiPrinter, FiSend } from 'react-icons/fi';
import BillPreview from './BillPreview';

const Finance = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [showForm, setShowForm] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const handleFormSubmit = (data) => {
    console.log('New Finance Entry:', data);
    setShowForm(false);
  };

  const financialData = {
    totalBudget: 180000000,
    totalSpent: 95000000,
    pendingPayments: 15000000,
    profit: 12000000
  };

  const clientBills = [
    { id: 'RA-001', date: '2024-01-10', project: 'Shopping Mall', amount: 1500000, certified: 1450000, retention: 75000, status: 'Certified', gst: '18%' },
    { id: 'RA-002', date: '2024-01-14', project: 'Resi Tower', amount: 800000, certified: 0, retention: 40000, status: 'In Review', gst: '18%' },
    { id: 'RA-003', date: '2024-01-18', project: 'Corporate Park', amount: 2200000, certified: 2100000, retention: 110000, status: 'Certified', gst: '18%' },
    { id: 'RA-004', date: '2024-01-20', project: 'Shopping Mall', amount: 950000, certified: 0, retention: 47500, status: 'Draft', gst: '18%' }
  ];

  const variations = [
    { id: 'VAR-001', date: '2024-01-12', project: 'Shopping Mall', title: 'Additional HVAC ducting', impact: '+ ₹45,000', status: 'Approved', type: 'Scope Change' },
    { id: 'VAR-002', date: '2024-01-15', project: 'Resi Tower', title: 'Premium flooring upgrade', impact: '+ ₹1,20,000', status: 'Pending Approval', type: 'Quality Upgrade' },
    { id: 'VAR-003', date: '2024-01-19', project: 'Corporate Park', title: 'Elevator system swap', impact: '- ₹85,000', status: 'Approved', type: 'Cost Optimization' },
    { id: 'VAR-004', date: '2024-01-21', project: 'Shopping Mall', title: 'Landscape lighting', impact: '+ ₹28,000', status: 'In Review', type: 'Client Request' }
  ];

  const cashFlowData = [
    { id: 'TR-101', date: '2024-01-15', project: 'Shopping Mall', category: 'Inflow', description: 'Client RA-001 Payment', amount: 1450000, method: 'Bank Transfer', status: 'Completed' },
    { id: 'TR-102', date: '2024-01-16', project: 'Global', category: 'Outflow', description: 'Monthly Payroll - Site Staff', amount: 1250000, method: 'NEFT', status: 'Completed' },
    { id: 'TR-103', date: '2024-01-17', project: 'Resi Tower', category: 'Outflow', description: 'Steel Procurement - Vendor X', amount: 450000, method: 'Cheque', status: 'Pending' },
    { id: 'TR-104', date: '2024-01-18', project: 'Corporate Park', category: 'Inflow', description: 'Project Advance Payment', amount: 5000000, method: 'Bank Transfer', status: 'Completed' },
    { id: 'TR-105', date: '2024-01-19', project: 'Shopping Mall', category: 'Outflow', description: 'Electricity Bill - Site', amount: 12000, method: 'UPI', status: 'Completed' },
    { id: 'TR-106', date: '2024-01-20', project: 'Resi Tower', category: 'Outflow', description: 'Local Material Supply', amount: 85000, method: 'Cash', status: 'Completed' },
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
            {['overview', 'client billing', 'variations', 'cash flow'].map((tab) => (
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
            onClick={() => setShowForm(true)}
            className="group flex items-center gap-2 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-premium transition-all hover:-translate-y-0.5"
            style={{ background: theme.gradients.button }}
          >
            <FiPlus className="text-xl transition-transform group-hover:rotate-90" />
            <span>Post Transaction</span>
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
                  <th className="px-8 py-5 text-center text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Quick Actions</th>
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
                    <td className="px-8 py-6">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => setSelectedBill(bill)}
                          title="Preview PDF"
                          className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-brand-50 hover:text-brand-600 transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
                        >
                          <FiEye size={16} />
                        </button>
                        <button
                          onClick={() => setSelectedBill(bill)}
                          title="View Print"
                          className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-brand-50 hover:text-brand-600 transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
                        >
                          <FiPrinter size={16} />
                        </button>
                        <button
                          onClick={() => setSelectedBill(bill)}
                          title="Send to Client"
                          className="p-2.5 rounded-xl bg-brand-500 text-white hover:bg-brand-600 transition-all shadow-lg hover:scale-105 active:scale-95"
                        >
                          <FiSend size={16} />
                        </button>
                      </div>
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
                    <td className="px-8 py-6 font-black" style={{ color: v.impact.includes('+') ? '#dc2626' : '#16a34a' }}>{v.impact}</td>
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

      {activeTab === 'cash flow' && (
        <div className="card-premium overflow-hidden animate-in slide-in-from-bottom-4 duration-500" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <div className="p-8 border-b flex justify-between items-center" style={{ borderColor: theme.cardBorder, backgroundColor: `${theme.iconBg}05` }}>
            <div>
              <h3 className="text-xl font-black" style={{ color: theme.textPrimary }}>Real-time Cash Flow</h3>
              <p className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-60" style={{ color: theme.textSecondary }}>Inflows vs Outflows Tracker</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ backgroundColor: `${theme.iconBg}15`, borderColor: theme.cardBorder }}>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Transaction ID / Date</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Project / Description</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Method</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Amount</th>
                  <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Status</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ divideColor: theme.cardBorder }}>
                {cashFlowData.map((tr) => (
                  <tr key={tr.id} className="group transition-colors hover:bg-slate-50/50" style={{ backgroundColor: theme.cardBg }}>
                    <td className="px-8 py-6">
                      <p className="font-bold" style={{ color: theme.textPrimary }}>{tr.id}</p>
                      <p className="text-[10px] font-bold uppercase tracking-tight" style={{ color: theme.textMuted }}>{tr.date}</p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-black text-xs" style={{ color: theme.textPrimary }}>{tr.description}</p>
                      <p className="text-[10px] font-bold uppercase tracking-tight" style={{ color: theme.textMuted }}>{tr.project}</p>
                    </td>
                    <td className="px-8 py-6 text-[10px] font-black uppercase tracking-widest" style={{ color: theme.textSecondary }}>{tr.method}</td>
                    <td className="px-8 py-6">
                      <span className={`text-lg font-black ${tr.category === 'Inflow' ? 'text-green-600' : 'text-red-500'}`}>
                        {tr.category === 'Inflow' ? '+' : '-'} ₹{tr.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border rounded-xl ${tr.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                        }`}>
                        {tr.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            onClick={() => setShowForm(false)}
          ></div>
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-200/50 dark:border-slate-800 overflow-hidden transform transition-all scale-100 animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
              <h3 className="text-lg font-black uppercase tracking-widest text-slate-800 dark:text-white">
                New Financial Entry
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-500"
              >
                <FiX size={20} />
              </button>
            </div>
            <div className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
              <FinanceForm
                onSubmit={handleFormSubmit}
                onClose={() => setShowForm(false)}
                projects={[]} // You might need to pass actual projects here if available in context or props
                vendors={[]}
                contractors={[]}
                clients={[]}
              />
            </div>
          </div>
        </div>
      )}

      {/* Bill Preview Modal */}
      {selectedBill && (
        <BillPreview
          bill={selectedBill}
          theme={theme}
          onClose={() => setSelectedBill(null)}
        />
      )}
    </div>
  );
};

export default Finance;
