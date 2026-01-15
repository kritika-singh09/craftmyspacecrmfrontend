import { useState } from 'react';
import { useTenant } from '../../../hooks/useTenant.jsx';
import { useAuth } from '../../../hooks/useAuth.jsx';
import RoleGuard from '../../../common/RoleGuard';

const Safety = () => {
  const { currentTenant } = useTenant();
  const { user } = useAuth();
  const [showIncidentForm, setShowIncidentForm] = useState(false);

  const incidents = [
    { id: 1, date: '2024-01-15', type: 'Minor Injury', severity: 'Low', status: 'Resolved', reporter: 'Site Supervisor' },
    { id: 2, date: '2024-01-10', type: 'Equipment Failure', severity: 'Medium', status: 'Under Investigation', reporter: 'Safety Officer' }
  ];

  return (
    <div className="space-y-8 pb-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Safety Control</h2>
          <p className="text-sm font-medium text-gray-500 mt-1">Hazard Mitigation and Compliance</p>
        </div>
        <RoleGuard requiredRole="engineer">
          <button
            onClick={() => setShowIncidentForm(true)}
            className="group flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-premium hover:bg-red-700 transition-all hover:-translate-y-0.5"
          >
            <span className="text-xl leading-none group-hover:rotate-90 transition-transform">+</span>
            Report Incident
          </button>
        </RoleGuard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-premium p-6 group hover:bg-green-50/30">
          <p className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em] mb-2">Safe Days</p>
          <div className="text-3xl font-black text-green-700">45</div>
        </div>
        <div className="card-premium p-6 group hover:bg-brand-50/30">
          <p className="text-[10px] font-black text-brand-600 uppercase tracking-[0.2em] mb-2">Trainings</p>
          <div className="text-3xl font-black text-brand-700">12</div>
        </div>
        <div className="card-premium p-6 group hover:bg-yellow-50/30">
          <p className="text-[10px] font-black text-yellow-600 uppercase tracking-[0.2em] mb-2">Open Issues</p>
          <div className="text-3xl font-black text-yellow-700">2</div>
        </div>
        <div className="card-premium p-6 group hover:bg-purple-50/30">
          <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.2em] mb-2">Compliance</p>
          <div className="text-3xl font-black text-purple-700">98%</div>
        </div>
      </div>

      <div className="card-premium p-8">
        <h3 className="text-xl font-black text-gray-900 mb-8">Shift Safety Checklist</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-5 bg-green-50/50 rounded-2xl border border-green-100 group hover:bg-green-50 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-lg">🪖</div>
              <span className="text-sm font-bold text-gray-900">All workers wearing helmets</span>
            </div>
            <span className="text-[10px] font-black uppercase text-green-600 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-green-100 italic">Verified</span>
          </div>
          <div className="flex items-center justify-between p-5 bg-green-50/50 rounded-2xl border border-green-100 group hover:bg-green-50 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-lg">🚧</div>
              <span className="text-sm font-bold text-gray-900">Safety barriers in place</span>
            </div>
            <span className="text-[10px] font-black uppercase text-green-600 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-green-100 italic">Verified</span>
          </div>
          <div className="flex items-center justify-between p-5 bg-yellow-50/50 rounded-2xl border border-yellow-100 group hover:bg-yellow-50 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-lg">🧯</div>
              <span className="text-sm font-bold text-gray-900">Fire extinguisher check</span>
            </div>
            <span className="text-[10px] font-black uppercase text-yellow-600 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-yellow-100 italic">In Queue</span>
          </div>
        </div>
      </div>

      <div className="card-premium overflow-hidden">
        <div className="p-8 border-b border-brand-50 bg-brand-50/30 flex justify-between items-center">
          <h3 className="text-xl font-black text-gray-900">Incident Logs</h3>
          <button className="text-[10px] font-black text-brand-600 uppercase tracking-widest hover:text-brand-800 transition-colors">Export Logs</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-brand-50/50 border-b border-brand-100">
                <th className="px-8 py-5 text-left text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Occurrence</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Incident Detail</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Severity</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-right text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Reported By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-50">
              {incidents.map((incident) => (
                <tr key={incident.id} className="group hover:bg-brand-50/30 transition-colors">
                  <td className="px-8 py-6 text-sm font-bold text-gray-600">{incident.date}</td>
                  <td className="px-8 py-6">
                    <p className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors">{incident.type}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Active site hazard</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border rounded-xl ${incident.severity === 'Low' ? 'bg-green-50 text-green-700 border-green-200' :
                      incident.severity === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                        'bg-red-50 text-red-700 border-red-200'
                      }`}>
                      {incident.severity}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-bold text-gray-600">{incident.status}</span>
                  </td>
                  <td className="px-8 py-6 text-right font-black text-gray-900">{incident.reporter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {showIncidentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Report Safety Incident</h3>
            <form className="space-y-4">
              <select className="w-full p-3 border rounded-lg">
                <option>Minor Injury</option>
                <option>Major Injury</option>
                <option>Equipment Failure</option>
                <option>Near Miss</option>
              </select>
              <select className="w-full p-3 border rounded-lg">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
              <textarea
                className="w-full p-3 border rounded-lg"
                rows="3"
                placeholder="Describe the incident..."
              ></textarea>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowIncidentForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg"
                >
                  Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Safety;
