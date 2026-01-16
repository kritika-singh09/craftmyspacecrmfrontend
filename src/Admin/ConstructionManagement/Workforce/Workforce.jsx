import { workforce } from '../../../data/mockData';
import { useNavigate } from 'react-router-dom';

const Workforce = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Workforce</h2>
          <p className="text-sm font-medium text-gray-900 dark:text-brand-300 mt-1">Personnel and Performance Tracking</p>
        </div>
        <button
          onClick={() => navigate('/workforce/add')}
          className="group flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-premium hover:bg-brand-700 transition-all hover:-translate-y-0.5"
        >
          <span className="text-xl leading-none group-hover:rotate-90 transition-transform">+</span>
          Add Worker
        </button>
      </div>

      {/* Workforce Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {workforce.map((worker) => (
          <div key={worker.id} className="card-premium p-8 group">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-tight mb-1">{worker.name}</h3>
                <p className="text-[10px] font-semibold text-gray-900 dark:text-brand-400 uppercase tracking-widest">{worker.role}</p>
              </div>
              <span className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-800 rounded-lg">
                Active
              </span>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-2 border-b border-blue-50/50 dark:border-blue-800/50">
                <span className="text-[11px] font-bold text-gray-900 dark:text-blue-400 uppercase tracking-tight">Assigned Project</span>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{worker.project}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-blue-50/50 dark:border-blue-800/50">
                <span className="text-[11px] font-bold text-gray-900 dark:text-blue-400 uppercase tracking-tight">Daily Wage</span>
                <span className="text-sm font-black text-blue-600 dark:text-blue-300 font-display">₹{worker.wage}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-auto">
              <button className="py-2.5 px-4 rounded-xl bg-brand-600 text-white text-[11px] font-bold uppercase tracking-wider hover:bg-brand-700 shadow-sm transition-all">
                Attendance
              </button>
              <button className="py-2.5 px-4 rounded-xl bg-gray-50 dark:bg-brand-900/30 text-gray-900 dark:text-brand-300 text-[11px] font-bold uppercase tracking-wider hover:bg-gray-100 dark:hover:bg-brand-800 transition-all">
                Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Attendance Section */}
      <div className="card-premium p-8">
        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8">Today's Attendance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-green-50/50 dark:bg-green-900/10 p-6 rounded-2xl border border-green-100 dark:border-green-800/30 flex items-center justify-between group hover:bg-green-50 dark:hover:bg-green-900/20 transition-all">
            <div>
              <p className="text-[10px] font-black text-green-600 dark:text-green-400 uppercase tracking-[0.2em] mb-1">Present</p>
              <p className="text-3xl font-black text-green-700 dark:text-green-200">8</p>
            </div>
            <div className="w-12 h-12 bg-white dark:bg-brand-800 rounded-xl shadow-sm flex items-center justify-center text-xl">✅</div>
          </div>
          <div className="bg-red-50/50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-800/30 flex items-center justify-between group hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
            <div>
              <p className="text-[10px] font-black text-red-600 dark:text-red-400 uppercase tracking-[0.2em] mb-1">Absent</p>
              <p className="text-3xl font-black text-red-700 dark:text-red-200">2</p>
            </div>
            <div className="w-12 h-12 bg-white dark:bg-brand-800 rounded-xl shadow-sm flex items-center justify-center text-xl">❌</div>
          </div>
          <div className="bg-yellow-50/50 dark:bg-yellow-900/10 p-6 rounded-2xl border border-yellow-100 dark:border-yellow-800/30 flex items-center justify-between group hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all">
            <div>
              <p className="text-[10px] font-black text-yellow-600 dark:text-yellow-400 uppercase tracking-[0.2em] mb-1">Late</p>
              <p className="text-3xl font-black text-yellow-700 dark:text-yellow-200">1</p>
            </div>
            <div className="w-12 h-12 bg-white dark:bg-brand-800 rounded-xl shadow-sm flex items-center justify-center text-xl">⏳</div>
          </div>
        </div>

        <div className="table-container-premium">
          <table className="table-premium">
            <thead>
              <tr className="table-header-premium">
                <th className="px-6 py-4">Worker</th>
                <th className="px-6 py-4">Role / Project</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Hours Worked</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-50">
              {workforce.map((worker) => (
                <tr key={worker.id} className="table-row-premium">
                  <td className="table-cell-premium whitespace-nowrap">
                    <div className="font-bold text-gray-900 dark:text-white">{worker.name}</div>
                  </td>
                  <td className="table-cell-premium whitespace-nowrap">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">{worker.role}</p>
                    <p className="text-[10px] font-bold text-gray-900 dark:text-brand-400 uppercase tracking-tight">{worker.project}</p>
                  </td>
                  <td className="table-cell-premium whitespace-nowrap">
                    <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 rounded-xl">
                      Present
                    </span>
                  </td>
                  <td className="table-cell-premium whitespace-nowrap text-right">
                    <span className="font-black text-gray-900 dark:text-white">8.0</span>
                    <span className="text-[10px] font-bold text-gray-900 dark:text-brand-400 ml-1">HRS</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
};

export default Workforce;
