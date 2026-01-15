import { useTenant } from '../../../hooks/useTenant.jsx';
import { useAuth } from '../../../hooks/useAuth.jsx';
import { tenantData } from '../../../data/tenantData';
import { FiBriefcase, FiTool, FiUsers, FiUserCheck, FiZap } from 'react-icons/fi';

const Dashboard = () => {
  const { currentTenant } = useTenant();
  const { user } = useAuth();
  const data = tenantData[currentTenant.id];

  const stats = [
    { label: 'Active Projects', value: data.projects.filter(p => p.status === 'Ongoing').length, color: 'bg-blue-600', trend: '12%', icon: <FiBriefcase /> },
    { label: 'Total Contractors', value: data.contractors.length, color: 'bg-slate-600', trend: '8%', icon: <FiTool /> },
    { label: 'Active Clients', value: data.clients.filter(c => c.status === 'Active').length, color: 'bg-indigo-600', trend: '5%', icon: <FiUsers /> },
    { label: 'Workforce', value: data.workforce.length, color: 'bg-blue-500', trend: '3%', icon: <FiUserCheck /> }
  ];

  return (
    <div className="space-y-8 pb-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard</h2>
          <p className="text-sm font-medium text-gray-400 dark:text-brand-300 mt-1">HARR Construction Overview</p>
        </div>
        <div className="card-premium px-4 py-2 bg-white/80 dark:bg-slate-800/50 backdrop-blur-md shadow-soft border border-blue-100 dark:border-slate-700 text-xs font-bold text-blue-600 dark:text-blue-200 uppercase tracking-wider">
          {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card-premium p-6 group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.color.replace('bg-', 'bg-')}/10 dark:${stat.color.replace('bg-', 'bg-')}/20 ${stat.color.replace('bg-', 'text-')} transition-transform group-hover:scale-110 flex items-center justify-center text-xl`}>
                {stat.icon}
              </div>
              <span className="text-[10px] font-bold text-gray-400 dark:text-brand-400 uppercase tracking-[0.15em]">Stat {index + 1}</span>
            </div>
            <div>
              <h3 className="text-[11px] font-semibold text-gray-500 dark:text-brand-400 uppercase tracking-widest mb-1">{stat.label}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
                <span className="text-[10px] font-semibold text-green-600 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded-lg border border-green-100 dark:border-green-800">
                  ↑ {stat.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Projects Overview */}
        <div className="lg:col-span-2 card-premium p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Project Progress</h3>
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-wider">View All Projects</button>
          </div>
          <div className="space-y-6">
            {data.projects.map((project) => (
              <div key={project.id} className="group cursor-pointer">
                <div className="flex items-center justify-between mb-2.5">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{project.name}</h4>
                    <p className="text-[10px] font-semibold text-gray-400 dark:text-brand-400 uppercase tracking-widest">{project.location}</p>
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{project.progress}%</span>
                </div>
                <div className="w-full bg-brand-50 dark:bg-brand-900/30 rounded-full h-2.5 p-0.5 border border-brand-100/50 dark:border-brand-800/30">
                  <div
                    className="bg-gradient-to-r from-brand-400 to-brand-600 h-full rounded-full shadow-sm relative overflow-hidden"
                    style={{ width: `${project.progress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-shimmer" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)', backgroundSize: '200% 100%' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="card-premium p-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight mb-8">Live Feed</h3>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 group">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center text-brand-600 dark:text-brand-300 border border-brand-200 dark:border-brand-800 group-hover:scale-110 transition-transform text-lg`}>
                    <FiZap className="fill-brand-600/20" />
                  </div>
                  {i !== 3 && <div className="w-0.5 h-full bg-brand-100 dark:bg-brand-900/50 mt-2"></div>}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white leading-snug">New project milestone reached in Shopping Mall</p>
                  <p className="text-[10px] font-bold text-brand-900/40 dark:text-brand-400 uppercase tracking-widest mt-1">2m ago</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3.5 rounded-2xl bg-gray-50 dark:bg-slate-800/50 text-gray-600 dark:text-blue-300 text-[11px] font-bold uppercase tracking-wider hover:bg-gray-100 transition-all border border-gray-100 dark:border-slate-700">
            See All Activities
          </button>
        </div>
      </div>
    </div>

  );
};

export default Dashboard;
