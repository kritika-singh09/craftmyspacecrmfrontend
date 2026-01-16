import { useState } from 'react';
import { useTenant } from '../../../hooks/useTenant.jsx';
import { useAuth } from '../../../hooks/useAuth.jsx';
import RoleGuard from '../../../common/RoleGuard';
import { useTheme } from '../../../context/ThemeContext.jsx';

const DailySite = () => {
  const { currentTenant } = useTenant();
  const { user } = useAuth();
  const { theme } = useTheme();
  const [showReportForm, setShowReportForm] = useState(false);

  const inputStyle = {
    backgroundColor: `${theme.iconBg}10`,
    borderColor: theme.cardBorder,
    color: theme.textPrimary
  };

  return (
    <div className="space-y-8 pb-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: theme.textPrimary }}>Daily Site</h2>
          <p className="text-sm font-medium mt-1" style={{ color: theme.textSecondary }}>Real-time Project Updates</p>
        </div>
        <RoleGuard requiredRole="engineer">
          <button
            onClick={() => setShowReportForm(true)}
            className="group flex items-center gap-2 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-premium transition-all hover:-translate-y-0.5"
            style={{ background: theme.gradients.button }}
          >
            <span className="text-xl leading-none group-hover:rotate-90 transition-transform">+</span>
            New Report
          </button>
        </RoleGuard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-premium p-6 group transition-colors" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <p className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em] mb-2">Attendance</p>
          <div className="text-3xl font-black text-green-700">85%</div>
        </div>
        <div className="card-premium p-6 group transition-colors" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: theme.primary }}>Tasks Done</p>
          <div className="text-3xl font-black" style={{ color: theme.primary }}>12</div>
        </div>
        <div className="card-premium p-6 group transition-colors" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <p className="text-[10px] font-black text-yellow-600 uppercase tracking-[0.2em] mb-2">Issues</p>
          <div className="text-3xl font-black text-yellow-700">3</div>
        </div>
        <div className="card-premium p-6 group transition-colors" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.2em] mb-2">Captures</p>
          <div className="text-3xl font-black text-purple-700">8</div>
        </div>
      </div>

      <div className="card-premium overflow-hidden" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
        <div className="p-8 border-b" style={{ borderColor: theme.cardBorder, backgroundColor: `${theme.iconBg}05` }}>
          <h3 className="text-xl font-black" style={{ color: theme.textPrimary }}>Progress Feed</h3>
        </div>
        <div className="p-8">
          <div className="space-y-6">
            <div className="relative pl-8 border-l-2 border-green-500/30 group">
              <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-green-500 border-4 border-white shadow-sm transition-transform group-hover:scale-125" style={{ borderColor: theme.cardBg }}></div>
              <h4 className="font-black text-lg leading-tight mb-1" style={{ color: theme.textPrimary }}>Today • Mall Project</h4>
              <p className="text-sm font-semibold mb-2" style={{ color: theme.textSecondary }}>Foundation work 80% complete - Structural phase approaching.</p>
              <p className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 cursor-default" style={{ color: theme.textMuted }}>
                <span className="w-5 h-5 rounded-lg bg-green-100 flex items-center justify-center text-[10px]">👷</span>
                Supervisor: Amit Sharma
              </p>
            </div>
            <div className="relative pl-8 border-l-2 group" style={{ borderColor: `${theme.primary}50` }}>
              <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full border-4 shadow-sm transition-transform group-hover:scale-125" style={{ backgroundColor: theme.primary, borderColor: theme.cardBg }}></div>
              <h4 className="font-black text-lg leading-tight mb-1" style={{ color: theme.textPrimary }}>Yesterday • Tower Project</h4>
              <p className="text-sm font-semibold mb-2" style={{ color: theme.textSecondary }}>Steel reinforcement fabrication ongoing for the 4th floor columns.</p>
              <p className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 cursor-default" style={{ color: theme.textMuted }}>
                <span className="w-5 h-5 rounded-lg flex items-center justify-center text-[10px]" style={{ backgroundColor: `${theme.primary}20` }}>👷</span>
                Supervisor: Rajesh Kumar
              </p>
            </div>
          </div>
        </div>
      </div>


      {showReportForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-6 rounded-lg w-full max-w-2xl shadow-2xl" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder, borderWidth: '1px' }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: theme.textPrimary }}>Daily Site Report</h3>
            <form className="space-y-4">
              <textarea
                className="w-full p-3 border rounded-lg outline-none focus:ring-2"
                style={inputStyle}
                rows="4"
                placeholder="Describe today's work progress..."
              ></textarea>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowReportForm(false)}
                  className="flex-1 py-2 rounded-lg opacity-80 hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: theme.textSecondary, color: theme.cardBg }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 text-white py-2 rounded-lg transition-colors"
                  style={{ background: theme.gradients.button }}
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailySite;
