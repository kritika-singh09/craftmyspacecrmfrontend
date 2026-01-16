import { useState } from 'react';
import { useTenant } from '../../../hooks/useTenant.jsx';
import { useAuth } from '../../../hooks/useAuth.jsx';
import RoleGuard from '../../../common/RoleGuard';
import { useTheme } from '../../../context/ThemeContext.jsx';

const Safety = () => {
  const { currentTenant } = useTenant();
  const { user } = useAuth();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [showIncidentForm, setShowIncidentForm] = useState(false);

  const incidents = [
    { id: 1, date: '2024-01-15', type: 'Minor Injury', severity: 'Low', status: 'Resolved', reporter: 'Site Supervisor', rootCause: 'Tripping hazard - loose cables' },
    { id: 2, date: '2024-01-10', type: 'Near Miss', severity: 'Medium', status: 'Closed', reporter: 'Safety Officer', rootCause: 'Insecure scaffolding' }
  ];

  const inductions = [
    { id: 101, name: 'Rajesh Kumar', role: 'Mason', date: '2024-01-05', status: 'Certified', validUntil: '2025-01-05' },
    { id: 102, name: 'Suresh Singh', role: 'Electrician', date: '2024-01-08', status: 'Certified', validUntil: '2025-01-08' },
    { id: 103, name: 'Amit Sharma', role: 'Supervisor', date: '2024-01-02', status: 'Expired', validUntil: '2024-01-02' },
    { id: 104, name: 'Vikram Patel', role: 'Operator', date: 'Pending', status: 'Required', validUntil: '-' }
  ];

  const inputStyle = {
    backgroundColor: `${theme.iconBg}10`,
    borderColor: theme.cardBorder,
    color: theme.textPrimary
  };

  return (
    <div className="space-y-8 pb-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: theme.textPrimary }}>Safety Control</h2>
          <p className="text-sm font-medium mt-1" style={{ color: theme.textSecondary }}>Enterprise Compliance & Performance</p>
        </div>
        <div className="flex gap-4">
          <div className="flex p-1 rounded-2xl border" style={{ backgroundColor: `${theme.iconBg}05`, borderColor: theme.cardBorder }}>
            {['overview', 'inductions', 'incidents'].map((tab) => (
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
          <RoleGuard requiredRole="engineer">
            <button
              onClick={() => setShowIncidentForm(true)}
              className="group flex items-center gap-2 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-premium transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}
            >
              <span className="text-xl leading-none group-hover:rotate-90 transition-transform">+</span>
              Report Incident
            </button>
          </RoleGuard>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card-premium p-6 group transition-colors" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <p className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em] mb-2">Safe Days</p>
              <div className="text-3xl font-black text-green-700">45</div>
            </div>
            <div className="card-premium p-6 group transition-colors" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: theme.primary }}>Certifications</p>
              <div className="text-3xl font-black" style={{ color: theme.primary }}>{inductions.filter(i => i.status === 'Certified').length}</div>
            </div>
            <div className="card-premium p-6 group transition-colors" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <p className="text-[10px] font-black text-yellow-600 uppercase tracking-[0.2em] mb-2">Open Issues</p>
              <div className="text-3xl font-black text-yellow-700">2</div>
            </div>
            <div className="card-premium p-6 group transition-colors" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.2em] mb-2">Audit Score</p>
              <div className="text-3xl font-black text-purple-700">98%</div>
            </div>
          </div>

          <div className="card-premium p-8" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h3 className="text-xl font-black mb-8" style={{ color: theme.textPrimary }}>Shift Safety Checklist</h3>
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
            </div>
          </div>
        </div>
      )}

      {activeTab === 'inductions' && (
        <div className="card-premium overflow-hidden animate-in slide-in-from-bottom-4 duration-500" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <div className="p-8 border-b flex justify-between items-center" style={{ borderColor: theme.cardBorder, backgroundColor: `${theme.iconBg}05` }}>
            <div>
              <h3 className="text-xl font-black" style={{ color: theme.textPrimary }}>Safety Induction Tracker</h3>
              <p className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-60" style={{ color: theme.textSecondary }}>Worker Legal Compliance</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ backgroundColor: `${theme.iconBg}15`, borderColor: theme.cardBorder }}>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Personnel</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Induction Date</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Status</th>
                  <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Expiry</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ divideColor: theme.cardBorder }}>
                {inductions.map((induction) => (
                  <tr key={induction.id} className="group transition-colors hover:bg-slate-50/50" style={{ backgroundColor: theme.cardBg }}>
                    <td className="px-8 py-6">
                      <p className="font-bold transition-colors" style={{ color: theme.textPrimary }}>{induction.name}</p>
                      <p className="text-[10px] font-bold uppercase tracking-tight" style={{ color: theme.textMuted }}>{induction.role}</p>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold" style={{ color: theme.textSecondary }}>{induction.date}</td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border rounded-xl ${induction.status === 'Certified' ? 'bg-green-50 text-green-700 border-green-200' :
                        induction.status === 'Expired' ? 'bg-red-50 text-red-700 border-red-200' :
                          'bg-yellow-50 text-yellow-700 border-yellow-200'
                        }`}>
                        {induction.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right font-black" style={{ color: theme.textSecondary }}>{induction.validUntil}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'incidents' && (
        <div className="card-premium overflow-hidden animate-in slide-in-from-bottom-4 duration-500" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <div className="p-8 border-b flex justify-between items-center" style={{ borderColor: theme.cardBorder, backgroundColor: `${theme.iconBg}05` }}>
            <h3 className="text-xl font-black" style={{ color: theme.textPrimary }}>Detailed Incident Log</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ backgroundColor: `${theme.iconBg}15`, borderColor: theme.cardBorder }}>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Occurrence</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Incident Detail</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Root Cause</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Severity</th>
                  <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Reporter</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ divideColor: theme.cardBorder }}>
                {incidents.map((incident) => (
                  <tr key={incident.id} className="group transition-colors hover:bg-slate-50/50" style={{ backgroundColor: theme.cardBg }}>
                    <td className="px-8 py-6 text-sm font-bold" style={{ color: theme.textSecondary }}>{incident.date}</td>
                    <td className="px-8 py-6">
                      <p className="font-bold transition-colors" style={{ color: theme.textPrimary }}>{incident.type}</p>
                      <p className="text-[10px] font-bold uppercase tracking-tight" style={{ color: theme.textMuted }}>ID: INC-00{incident.id}</p>
                    </td>
                    <td className="px-8 py-6 text-xs font-medium" style={{ color: theme.textSecondary }}>{incident.rootCause}</td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border rounded-xl ${incident.severity === 'Low' ? 'bg-green-50 text-green-700 border-green-200' :
                        incident.severity === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                          'bg-red-50 text-red-700 border-red-200'
                        }`}>
                        {incident.severity}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right font-black" style={{ color: theme.textPrimary }}>{incident.reporter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}


      {showIncidentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-6 rounded-lg w-full max-w-md shadow-2xl" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder, borderWidth: '1px' }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: theme.textPrimary }}>Report Safety Incident</h3>
            <form className="space-y-4">
              <select className="w-full p-3 border rounded-lg outline-none focus:ring-2" style={inputStyle}>
                <option>Minor Injury</option>
                <option>Major Injury</option>
                <option>Equipment Failure</option>
                <option>Near Miss</option>
              </select>
              <select className="w-full p-3 border rounded-lg outline-none focus:ring-2" style={inputStyle}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
              <textarea
                className="w-full p-3 border rounded-lg outline-none focus:ring-2"
                style={inputStyle}
                rows="3"
                placeholder="Describe the incident..."
              ></textarea>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowIncidentForm(false)}
                  className="flex-1 py-2 rounded-lg opacity-80 hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: theme.textSecondary, color: theme.cardBg }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
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
