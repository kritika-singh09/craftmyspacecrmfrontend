const Finance = () => {
  const financialData = {
    totalBudget: 180000000,
    totalSpent: 95000000,
    pendingPayments: 15000000,
    profit: 12000000
  };

  return (
    <div className="space-y-8 pb-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Finance</h2>
          <p className="text-sm font-medium text-gray-800 dark:text-brand-300 mt-1">Capital and Expense Tracking</p>
        </div>
        <button className="group flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-premium hover:bg-brand-700 transition-all hover:-translate-y-0.5">
          <span className="text-xl leading-none group-hover:rotate-90 transition-transform">+</span>
          Post Transaction
        </button>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-premium p-6 group hover:bg-brand-50/30 dark:hover:bg-brand-900/40">
          <p className="text-[10px] font-black text-brand-500 dark:text-brand-300 uppercase tracking-[0.2em] mb-2">Total Budget</p>
          <div className="text-2xl font-black text-brand-700 dark:text-brand-200">₹{(financialData.totalBudget / 10000000).toFixed(1)} Cr</div>
        </div>
        <div className="card-premium p-6 group hover:bg-red-50/30 dark:hover:bg-red-900/20">
          <p className="text-[10px] font-black text-red-500 dark:text-red-400 uppercase tracking-[0.2em] mb-2">Total Spent</p>
          <div className="text-2xl font-black text-red-700 dark:text-red-300">₹{(financialData.totalSpent / 10000000).toFixed(1)} Cr</div>
        </div>
        <div className="card-premium p-6 group hover:bg-yellow-50/30 dark:hover:bg-yellow-900/20">
          <p className="text-[10px] font-black text-yellow-500 dark:text-yellow-400 uppercase tracking-[0.2em] mb-2">Pending</p>
          <div className="text-2xl font-black text-yellow-700 dark:text-yellow-300">₹{(financialData.pendingPayments / 10000000).toFixed(1)} Cr</div>
        </div>
        <div className="card-premium p-6 group hover:bg-green-50/30 dark:hover:bg-green-900/20">
          <p className="text-[10px] font-black text-green-500 dark:text-green-400 uppercase tracking-[0.2em] mb-2">Profit</p>
          <div className="text-2xl font-black text-green-700 dark:text-green-300">₹{(financialData.profit / 10000000).toFixed(1)} Cr</div>
        </div>
      </div>

      {/* Project-wise Budget */}
      <div className="card-premium p-8">
        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8">Project Budget Utilization</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-brand-50/30 dark:bg-brand-900/40 rounded-2xl border border-brand-100 dark:border-brand-800 group hover:bg-brand-50 dark:hover:bg-brand-900/60 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-black text-gray-900 dark:text-white leading-tight">Shopping Mall</h4>
                <p className="text-[11px] font-bold text-gray-900 dark:text-brand-400 uppercase tracking-widest mt-1">Budget: ₹5 Cr • Spent: ₹3.2 Cr</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-green-600 dark:text-green-400">64% USED</span>
              </div>
            </div>
            <div className="w-full bg-white dark:bg-brand-800 rounded-full h-3 p-0.5 shadow-inner">
              <div className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full shadow-sm" style={{ width: '64%' }}></div>
            </div>
          </div>
          <div className="p-6 bg-brand-50/30 dark:bg-brand-900/40 rounded-2xl border border-brand-100 dark:border-brand-800 group hover:bg-brand-50 dark:hover:bg-brand-900/60 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-black text-gray-900 dark:text-white leading-tight">Residential Tower</h4>
                <p className="text-[11px] font-bold text-gray-900 dark:text-brand-400 uppercase tracking-widest mt-1">Budget: ₹3 Cr • Spent: ₹1.2 Cr</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-brand-600 dark:text-brand-400">40% USED</span>
              </div>
            </div>
            <div className="w-full bg-white dark:bg-brand-800 rounded-full h-3 p-0.5 shadow-inner">
              <div className="bg-gradient-to-r from-brand-400 to-brand-600 h-full rounded-full shadow-sm" style={{ width: '40%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card-premium overflow-hidden">
        <div className="p-8 border-b border-brand-50 dark:border-brand-800 bg-brand-50/30 dark:bg-brand-900/40 flex justify-between items-center">
          <h3 className="text-xl font-black text-gray-900 dark:text-white">Ledger Activity</h3>
          <button className="text-[10px] font-black text-brand-600 dark:text-brand-300 uppercase tracking-widest hover:text-brand-800 dark:hover:text-white transition-colors">Export CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-brand-50/50 dark:bg-brand-900/40 border-b border-brand-100 dark:border-brand-800">
                <th className="px-8 py-5 text-left text-[10px] font-black text-brand-500 dark:text-brand-300 uppercase tracking-[0.2em]">Date</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-brand-500 dark:text-brand-300 uppercase tracking-[0.2em]">Category / Purpose</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-brand-500 dark:text-brand-300 uppercase tracking-[0.2em]">Kind</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-brand-500 dark:text-brand-300 uppercase tracking-[0.2em]">Value</th>
                <th className="px-8 py-5 text-right text-[10px] font-black text-brand-500 dark:text-brand-300 uppercase tracking-[0.2em]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-50">
              <tr className="group hover:bg-brand-50/30 dark:hover:bg-brand-900/30 transition-colors">
                <td className="px-8 py-6 text-sm font-bold text-gray-800 dark:text-brand-400">2024-01-15</td>
                <td className="px-8 py-6">
                  <p className="font-bold text-gray-900 dark:text-white group-hover:text-brand-600 transition-colors">Material Purchase - Cement</p>
                  <p className="text-[10px] font-bold text-gray-900 dark:text-brand-400 uppercase tracking-tight">Mall Project Supply</p>
                </td>
                <td className="px-8 py-6">
                  <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-red-50 text-red-700 border border-red-200 rounded-xl">Expense</span>
                </td>
                <td className="px-8 py-6 font-black text-gray-900 dark:text-white">₹76,000</td>
                <td className="px-8 py-6 text-right">
                  <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 rounded-xl">Settled</span>
                </td>
              </tr>
              <tr className="group hover:bg-brand-50/30 dark:hover:bg-brand-900/30 transition-colors">
                <td className="px-8 py-6 text-sm font-bold text-gray-800 dark:text-brand-400">2024-01-14</td>
                <td className="px-8 py-6">
                  <p className="font-bold text-gray-900 dark:text-white group-hover:text-brand-600 transition-colors">Client Payment - Mall Project</p>
                  <p className="text-[10px] font-bold text-gray-900 dark:text-brand-400 uppercase tracking-tight">Phase 1 Milestone reached</p>
                </td>
                <td className="px-8 py-6">
                  <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-green-50 text-green-700 border border-green-200 rounded-xl">Income</span>
                </td>
                <td className="px-8 py-6 font-black text-green-600 dark:text-green-400">₹15,00,000</td>
                <td className="px-8 py-6 text-right">
                  <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-xl">Deposited</span>
                </td>
              </tr>
              <tr className="group hover:bg-brand-50/30 dark:hover:bg-brand-900/30 transition-colors">
                <td className="px-8 py-6 text-sm font-bold text-gray-800 dark:text-brand-400">2024-01-13</td>
                <td className="px-8 py-6">
                  <p className="font-bold text-gray-900 dark:text-white group-hover:text-brand-600 transition-colors">Contractor Payment - Foundation</p>
                  <p className="text-[10px] font-bold text-gray-900 dark:text-brand-400 uppercase tracking-tight">Rajesh Builders Outstanding</p>
                </td>
                <td className="px-8 py-6">
                  <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-red-50 text-red-700 border border-red-200 rounded-xl">Expense</span>
                </td>
                <td className="px-8 py-6 font-black text-gray-900 dark:text-white">₹5,00,000</td>
                <td className="px-8 py-6 text-right">
                  <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800 rounded-xl">Pending</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Finance;
