import { useState, useEffect } from 'react';
import { useTenant } from '../../../hooks/useTenant.jsx';
import { useAuth } from '../../../hooks/useAuth.jsx';
import RoleGuard from '../../../common/RoleGuard';
import { useTheme } from '../../../context/ThemeContext.jsx';


const Quality = () => {
  const { currentTenant } = useTenant();
  const { user } = useAuth();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('inspections');
  const [showInspectionForm, setShowInspectionForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);



  const inspections = [
    { id: 1, date: '2024-01-15', type: 'Foundation', status: 'Passed', inspector: 'Site Engineer', issues: 0 },
    { id: 2, date: '2024-01-14', type: 'Steel Work', status: 'Failed', inspector: 'Quality Manager', issues: 2 },
    { id: 3, date: '2024-01-13', type: 'Concrete', status: 'Passed', inspector: 'Site Engineer', issues: 0 }
  ];

  const ncrList = [
    { id: 'NCR-101', date: '2024-01-14', area: 'Steel Work', defect: 'Reinforcement spacing incorrect', status: 'Open', criticality: 'High' },
    { id: 'NCR-102', date: '2024-01-10', area: 'Plumbing', defect: 'Leakage in main line', status: 'Resolved', criticality: 'Medium' }
  ];

  const capaList = [
    { id: 'CAPA-01', linkedNCR: 'NCR-101', action: 'Re-spacing and additional stirrups added', owner: 'Site Supervisor', status: 'Verification Pending' },
    { id: 'CAPA-02', linkedNCR: 'NCR-102', action: 'Segment replacement and pressure test', owner: 'Plumbing Lead', status: 'Completed' }
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
          <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: theme.textPrimary }}>Quality Assurance</h2>
          <p className="text-sm font-medium mt-1" style={{ color: theme.textSecondary }}>Standards & Compliance HUB</p>
        </div>
        <div className="flex gap-4">
          <div className="flex p-1 rounded-2xl border" style={{ backgroundColor: `${theme.iconBg}05`, borderColor: theme.cardBorder }}>
            {['inspections', 'ncr/capa'].map((tab) => (
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
              onClick={() => setShowInspectionForm(true)}
              className="group flex items-center gap-2 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-premium transition-all hover:-translate-y-0.5"
              style={{ background: theme.gradients.button }}
            >
              <span className="text-xl leading-none group-hover:rotate-90 transition-transform">+</span>
              New Inspection
            </button>
          </RoleGuard>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-premium p-6 group transition-colors" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <p className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em] mb-2">Inspected</p>
          <div className="text-3xl font-black text-green-700">15</div>
        </div>
        <div className="card-premium p-6 group transition-colors" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em] mb-2">NCRs Open</p>
          <div className="text-3xl font-black text-red-700">{ncrList.filter(n => n.status === 'Open').length}</div>
        </div>
        <div className="card-premium p-6 group transition-colors" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <p className="text-[10px] font-black text-yellow-600 uppercase tracking-[0.2em] mb-2">CAPA Rate</p>
          <div className="text-3xl font-black text-yellow-700">100%</div>
        </div>
        <div className="card-premium p-6 group transition-colors" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: theme.primary }}>Quality Score</p>
          <div className="text-3xl font-black" style={{ color: theme.primary }}>92%</div>
        </div>
      </div>

      {activeTab === 'inspections' && (
        <div className="card-premium overflow-hidden animate-in fade-in duration-500" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <div className="p-8 border-b flex justify-between items-center" style={{ borderColor: theme.cardBorder, backgroundColor: `${theme.iconBg}05` }}>
            <h3 className="text-xl font-black" style={{ color: theme.textPrimary }}>Compliance Log</h3>
            <button className="text-[10px] font-black uppercase tracking-widest hover:text-opacity-80 transition-colors" style={{ color: theme.textSecondary }}>Generate Certificate</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ backgroundColor: `${theme.iconBg}15`, borderColor: theme.cardBorder }}>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Timestamp</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Checklist Type</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Verdict</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Responsible</th>
                  <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Defects</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ divideColor: theme.cardBorder }}>
                {inspections.map((inspection) => (
                  <tr key={inspection.id} className="group transition-colors hover:bg-slate-50/50" style={{ backgroundColor: theme.cardBg }}>
                    <td className="px-8 py-6 text-sm font-bold" style={{ color: theme.textSecondary }}>{inspection.date}</td>
                    <td className="px-8 py-6">
                      <p className="font-bold transition-colors" style={{ color: theme.textPrimary }}>{inspection.type}</p>
                      <p className="text-[10px] font-bold uppercase tracking-tight" style={{ color: theme.textMuted }}>Manual site verification</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border rounded-xl ${inspection.status === 'Passed'
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                        }`}>
                        {inspection.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold" style={{ color: theme.textSecondary }}>{inspection.inspector}</td>
                    <td className="px-8 py-6 text-right font-black" style={{ color: theme.textPrimary }}>{inspection.issues}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'ncr/capa' && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
          <div className="card-premium overflow-hidden" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <div className="p-8 border-b" style={{ borderColor: theme.cardBorder, backgroundColor: `${theme.iconBg}05` }}>
              <h3 className="text-xl font-black" style={{ color: theme.textPrimary }}>Non-Conformance Reports (NCR)</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ backgroundColor: `${theme.iconBg}15`, borderColor: theme.cardBorder }}>
                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>ID / Date</th>
                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Area / Defect</th>
                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Criticality</th>
                    <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ divideColor: theme.cardBorder }}>
                  {ncrList.map((ncr) => (
                    <tr key={ncr.id} className="group transition-colors hover:bg-slate-50/50" style={{ backgroundColor: theme.cardBg }}>
                      <td className="px-8 py-6">
                        <p className="font-bold" style={{ color: theme.textPrimary }}>{ncr.id}</p>
                        <p className="text-[10px] font-bold uppercase tracking-tight" style={{ color: theme.textMuted }}>{ncr.date}</p>
                      </td>
                      <td className="px-8 py-6">
                        <p className="font-bold" style={{ color: theme.textPrimary }}>{ncr.area}</p>
                        <p className="text-xs font-medium" style={{ color: theme.textSecondary }}>{ncr.defect}</p>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border rounded-xl ${ncr.criticality === 'High' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                          }`}>
                          {ncr.criticality}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className="text-sm font-black" style={{ color: theme.textPrimary }}>{ncr.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card-premium overflow-hidden" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <div className="p-8 border-b" style={{ borderColor: theme.cardBorder, backgroundColor: `${theme.iconBg}05` }}>
              <h3 className="text-xl font-black" style={{ color: theme.textPrimary }}>CAPA Log (Corrective Actions)</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ backgroundColor: `${theme.iconBg}15`, borderColor: theme.cardBorder }}>
                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Ref NCR</th>
                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Action Taken</th>
                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Responsible</th>
                    <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ divideColor: theme.cardBorder }}>
                  {capaList.map((capa) => (
                    <tr key={capa.id} className="group transition-colors hover:bg-slate-50/50" style={{ backgroundColor: theme.cardBg }}>
                      <td className="px-8 py-6 text-sm font-bold" style={{ color: theme.primary }}>{capa.linkedNCR}</td>
                      <td className="px-8 py-6 text-sm font-medium" style={{ color: theme.textPrimary }}>{capa.action}</td>
                      <td className="px-8 py-6 text-xs font-bold" style={{ color: theme.textSecondary }}>{capa.owner}</td>
                      <td className="px-8 py-6 text-right">
                        <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border rounded-xl ${capa.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                          }`}>
                          {capa.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}


      {showInspectionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-6 rounded-lg w-full max-w-md shadow-2xl" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder, borderWidth: '1px' }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: theme.textPrimary }}>Quality Inspection</h3>
            <form className="space-y-4">
              <select className="w-full p-3 border rounded-lg outline-none focus:ring-2" style={inputStyle}>
                <option>Foundation</option>
                <option>Steel Work</option>
                <option>Concrete</option>
                <option>Electrical</option>
              </select>
              <textarea
                className="w-full p-3 border rounded-lg outline-none focus:ring-2"
                style={inputStyle}
                rows="3"
                placeholder="Inspection notes..."
              ></textarea>
              <select className="w-full p-3 border rounded-lg outline-none focus:ring-2" style={inputStyle}>
                <option>Passed</option>
                <option>Failed</option>
                <option>Needs Rework</option>
              </select>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowInspectionForm(false)}
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
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quality;
