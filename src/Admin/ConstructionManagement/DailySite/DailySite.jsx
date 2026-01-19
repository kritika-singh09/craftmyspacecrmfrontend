import { useState, useEffect } from 'react';
import { useTenant } from '../../../hooks/useTenant.jsx';
import { useAuth } from '../../../hooks/useAuth.jsx';
import RoleGuard from '../../../common/RoleGuard';
import { useTheme } from '../../../context/ThemeContext.jsx';
import Loader from '../../../common/Loader';
import DPRForm from './DPRForm';
import { FiGrid, FiUsers, FiBox, FiShield, FiCamera, FiCheckCircle, FiAlertTriangle, FiActivity, FiMessageSquare } from 'react-icons/fi';

const DailySite = () => {
  const { currentTenant } = useTenant();
  const { user } = useAuth();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);

  const [showReportForm, setShowReportForm] = useState(false);
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({
    manpower: 0,
    tasksDone: 0,
    incidents: 0,
    captures: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchLatestReports();
  }, []);


  const fetchLatestReports = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/reports`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      setReports(data);

      // Calculate daily stats from reports (simplified)
      if (data.length > 0) {
        setStats({
          manpower: data[0].attendance?.present || 0,
          tasksDone: data[0].activities?.length || 0,
          incidents: data[0].safety?.safetyAlert ? 1 : 0,
          captures: data[0].media?.length || 0
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDPRSuccess = () => {
    setShowReportForm(false);
    fetchLatestReports();
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex justify-between items-end bg-white/40 backdrop-blur-sm p-8 rounded-[3rem] border border-white/40 shadow-sm" style={{ backgroundColor: `${theme.cardBg}80` }}>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Live Command Center</p>
          </div>
          <h2 className="text-4xl font-black tracking-tight" style={{ color: theme.textPrimary }}>Daily Site Reports</h2>
          <p className="text-sm font-bold opacity-60 mt-1" style={{ color: theme.textSecondary }}>Real-time field intelligence & progress</p>
        </div>
        <RoleGuard requiredRole="engineer">
          <button
            onClick={() => setShowReportForm(true)}
            className="group flex items-center gap-3 text-white px-8 py-4 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl transition-all hover:-translate-y-1 active:scale-95"
            style={{ background: theme.gradients.button }}
          >
            <FiActivity className="text-lg group-hover:rotate-180 transition-transform duration-500" />
            Broadcast DPR
          </button>
        </RoleGuard>
      </div>

      {/* Real-time Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-8 rounded-[2.5rem] border group hover:shadow-xl transition-all relative overflow-hidden" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <div className="absolute top-0 right-0 p-6 opacity-10 text-6xl group-hover:rotate-12 transition-transform"><FiUsers /></div>
          <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-3">Manpower Present</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black" style={{ color: theme.textPrimary }}>{stats.manpower}</span>
            <span className="text-xs font-bold opacity-40">Workers</span>
          </div>
        </div>
        <div className="p-8 rounded-[2.5rem] border group hover:shadow-xl transition-all relative overflow-hidden" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <div className="absolute top-0 right-0 p-6 opacity-10 text-6xl group-hover:rotate-12 transition-transform"><FiCheckCircle /></div>
          <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: theme.primary }}>Activities Logged</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black" style={{ color: theme.textPrimary }}>{stats.tasksDone}</span>
            <span className="text-xs font-bold opacity-40">Tasks</span>
          </div>
        </div>
        <div className="p-8 rounded-[2.5rem] border group hover:shadow-xl transition-all relative overflow-hidden" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <div className="absolute top-0 right-0 p-6 opacity-10 text-6xl group-hover:rotate-12 transition-transform text-red-500"><FiAlertTriangle /></div>
          <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-3">Safety Alerts</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-red-600">{stats.incidents}</span>
            <span className="text-xs font-bold opacity-40">Today</span>
          </div>
        </div>
        <div className="p-8 rounded-[2.5rem] border group hover:shadow-xl transition-all relative overflow-hidden" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <div className="absolute top-0 right-0 p-6 opacity-10 text-6xl group-hover:rotate-12 transition-transform"><FiCamera /></div>
          <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-3">Site Gallery</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-purple-700">{stats.captures}</span>
            <span className="text-xs font-bold opacity-40">Photos</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Feed Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-black" style={{ color: theme.textPrimary }}>Real-Time Progress Feed</h3>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-slate-100 rounded-full text-[9px] font-black uppercase tracking-widest opacity-60">All Activities</span>
            </div>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="p-20 text-center font-bold opacity-50 uppercase tracking-widest">Loading Reports...</div>
            ) : reports.length === 0 ? (
              <div className="p-20 text-center font-bold opacity-30 uppercase tracking-widest border-2 border-dashed rounded-[2.5rem]">No reports published yet.</div>
            ) : reports.map((report, idx) => (
              <div key={report._id} className="p-1 rounded-[2.5rem] bg-gradient-to-r from-transparent to-transparent hover:from-blue-500/10 hover:to-transparent transition-all">
                <div className="p-8 rounded-[2.2rem] border bg-white flex gap-6" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-lg ${report.safety?.safetyAlert ? 'bg-red-500 text-white' : 'bg-blue-600 text-white'}`}>
                      {report.safety?.safetyAlert ? <FiAlertTriangle /> : <FiActivity />}
                    </div>
                    <div className="flex-1 w-0.5 bg-slate-100 my-4" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-black leading-none" style={{ color: theme.textPrimary }}>{report.project?.name || 'Project Site'}</h4>
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mt-1">{new Date(report.reportDate).toLocaleDateString(undefined, { weekday: 'long', month: 'pretty_long', day: 'numeric' })}</p>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${report.approvals?.projectManager?.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {report.approvals?.projectManager?.status || 'Review Pending'}
                      </span>
                    </div>
                    <p className="text-sm font-bold opacity-70" style={{ color: theme.textSecondary }}>{report.workDescription}</p>

                    <div className="flex flex-wrap gap-3">
                      {report.activities?.slice(0, 3).map((act, aIdx) => (
                        <div key={aIdx} className="px-3 py-1.5 rounded-xl border flex items-center gap-2" style={{ borderColor: theme.cardBorder, backgroundColor: `${theme.iconBg}05` }}>
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          <span className="text-[9px] font-black uppercase opacity-60">{act.taskName}</span>
                          <span className="text-[9px] font-black text-blue-600">{act.progressPercent}%</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-dashed flex justify-between items-center" style={{ borderColor: theme.cardBorder }}>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[8px] font-black">EA</div>
                        <p className="text-[10px] font-bold opacity-60">Submitted by {report.createdBy?.name || 'Engineer'}</p>
                      </div>
                      <div className="flex gap-4">
                        <button className="flex items-center gap-1.5 text-[10px] font-black uppercase text-blue-600 hover:underline">
                          <FiMessageSquare /> Discuss
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-6">
          <div className="p-8 rounded-[2.5rem] border space-y-6" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h4 className="text-xs font-black uppercase tracking-widest" style={{ color: theme.textPrimary }}>Today's Manpower</h4>
            <div className="space-y-4">
              {['Masons', 'Helpers', 'Electricians', 'Plumbers'].map(s => (
                <div key={s} className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-black uppercase opacity-40">
                    <span>{s}</span>
                    <span>0</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `0%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-[2.5rem] border bg-slate-900 border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center text-xl">
                <FiBox />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase text-white">Stock Alerts</h4>
                <p className="text-[9px] font-bold text-slate-500 uppercase">Live Inventory Status</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
              <p className="text-[10px] font-black text-slate-400">No active stock alerts</p>
              <p className="text-[8px] font-bold text-slate-400/60 uppercase mt-1">Inventory levels optimal</p>
            </div>
          </div>
        </div>
      </div>

      {showReportForm && (
        <DPRForm
          onClose={() => setShowReportForm(false)}
          onSuccess={handleDPRSuccess}
        />
      )}
    </div>
  );
};

export default DailySite;
