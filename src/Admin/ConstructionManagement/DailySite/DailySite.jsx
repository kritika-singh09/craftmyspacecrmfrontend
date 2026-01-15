import { useState } from 'react';
import { useTenant } from '../../../hooks/useTenant.jsx';
import { useAuth } from '../../../hooks/useAuth.jsx';
import RoleGuard from '../../../common/RoleGuard';

const DailySite = () => {
  const { currentTenant } = useTenant();
  const { user } = useAuth();
  const [showReportForm, setShowReportForm] = useState(false);

  return (
    <div className="space-y-8 pb-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Daily Site</h2>
          <p className="text-sm font-medium text-gray-500 mt-1">Real-time Project Updates</p>
        </div>
        <RoleGuard requiredRole="engineer">
          <button
            onClick={() => setShowReportForm(true)}
            className="group flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-premium hover:bg-brand-700 transition-all hover:-translate-y-0.5"
          >
            <span className="text-xl leading-none group-hover:rotate-90 transition-transform">+</span>
            New Report
          </button>
        </RoleGuard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-premium p-6 group hover:bg-green-50/30">
          <p className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em] mb-2">Attendance</p>
          <div className="text-3xl font-black text-green-700">85%</div>
        </div>
        <div className="card-premium p-6 group hover:bg-brand-50/30">
          <p className="text-[10px] font-black text-brand-600 uppercase tracking-[0.2em] mb-2">Tasks Done</p>
          <div className="text-3xl font-black text-brand-700">12</div>
        </div>
        <div className="card-premium p-6 group hover:bg-yellow-50/30">
          <p className="text-[10px] font-black text-yellow-600 uppercase tracking-[0.2em] mb-2">Issues</p>
          <div className="text-3xl font-black text-yellow-700">3</div>
        </div>
        <div className="card-premium p-6 group hover:bg-purple-50/30">
          <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.2em] mb-2">Captures</p>
          <div className="text-3xl font-black text-purple-700">8</div>
        </div>
      </div>

      <div className="card-premium overflow-hidden">
        <div className="p-8 border-b border-brand-50 bg-brand-50/30">
          <h3 className="text-xl font-black text-gray-900">Progress Feed</h3>
        </div>
        <div className="p-8">
          <div className="space-y-6">
            <div className="relative pl-8 border-l-2 border-green-500/30 group">
              <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-green-500 border-4 border-white shadow-sm transition-transform group-hover:scale-125"></div>
              <h4 className="font-black text-gray-900 text-lg leading-tight mb-1">Today • Mall Project</h4>
              <p className="text-sm font-semibold text-gray-600 mb-2">Foundation work 80% complete - Structural phase approaching.</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 cursor-default">
                <span className="w-5 h-5 rounded-lg bg-green-100 flex items-center justify-center text-[10px]">👷</span>
                Supervisor: Amit Sharma
              </p>
            </div>
            <div className="relative pl-8 border-l-2 border-brand-500/30 group">
              <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-brand-500 border-4 border-white shadow-sm transition-transform group-hover:scale-125"></div>
              <h4 className="font-black text-gray-900 text-lg leading-tight mb-1">Yesterday • Tower Project</h4>
              <p className="text-sm font-semibold text-gray-600 mb-2">Steel reinforcement fabrication ongoing for the 4th floor columns.</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 cursor-default">
                <span className="w-5 h-5 rounded-lg bg-brand-100 flex items-center justify-center text-[10px]">👷</span>
                Supervisor: Rajesh Kumar
              </p>
            </div>
          </div>
        </div>
      </div>


      {showReportForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">Daily Site Report</h3>
            <form className="space-y-4">
              <textarea
                className="w-full p-3 border rounded-lg"
                rows="4"
                placeholder="Describe today's work progress..."
              ></textarea>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowReportForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg"
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
