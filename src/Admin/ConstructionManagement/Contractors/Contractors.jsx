import { useTenant } from '../../../hooks/useTenant.jsx';
import { tenantData } from '../../../data/tenantData';

const Contractors = () => {
  const { currentTenant } = useTenant();
  const data = tenantData[currentTenant.id];

  return (
    <div className="space-y-8 pb-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Contractors</h2>
          <p className="text-sm font-medium text-gray-500 dark:text-brand-300 mt-1">Manage external partners for {currentTenant.name}</p>
        </div>
        <button className="group flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-premium hover:bg-brand-700 transition-all hover:-translate-y-0.5">
          <span className="text-xl leading-none group-hover:rotate-90 transition-transform">+</span>
          Add Contractor
        </button>
      </div>

      <div className="card-premium overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-brand-50/50 dark:bg-brand-900/40 border-b border-brand-100 dark:border-brand-800">
              <th className="px-8 py-5 text-left text-[10px] font-black text-brand-500 dark:text-brand-300 uppercase tracking-[0.2em]">Name</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-brand-500 dark:text-brand-300 uppercase tracking-[0.2em]">Type</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-brand-500 dark:text-brand-300 uppercase tracking-[0.2em]">Active Projects</th>
              <th className="px-8 py-5 text-right text-[10px] font-black text-brand-500 dark:text-brand-300 uppercase tracking-[0.2em]">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-50">
            {data.contractors.map((contractor) => (
              <tr key={contractor.id} className="hover:bg-brand-50/30 dark:hover:bg-brand-900/30 transition-colors group">
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="font-bold text-gray-900 dark:text-white group-hover:text-brand-600 transition-colors">{contractor.name}</div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-brand-100 dark:bg-brand-800 text-brand-700 dark:text-brand-200 rounded-xl border border-brand-200 dark:border-brand-700">
                    {contractor.type}
                  </span>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1.5">
                    {contractor.projects.map(p => (
                      <span key={p} className="text-[11px] font-bold text-gray-500 dark:text-brand-400 bg-gray-100 dark:bg-brand-900/50 px-2 py-0.5 rounded-lg border border-gray-200 dark:border-brand-800">{p}</span>
                    ))}
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-right space-x-2">
                  <button className="px-3 py-1.5 text-[11px] font-black uppercase tracking-widest text-brand-600 dark:text-brand-300 hover:bg-brand-600 dark:hover:bg-brand-500 hover:text-white rounded-xl transition-all border border-brand-100 dark:border-brand-800">Edit</button>
                  <button className="px-3 py-1.5 text-[11px] font-black uppercase tracking-widest text-red-500 dark:text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all border border-red-100 dark:border-red-900/50">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default Contractors;
