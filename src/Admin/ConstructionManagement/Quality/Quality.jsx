import { useState } from 'react';
import { useTenant } from '../../../hooks/useTenant.jsx';
import { useAuth } from '../../../hooks/useAuth.jsx';
import RoleGuard from '../../../common/RoleGuard';

const Quality = () => {
  const { currentTenant } = useTenant();
  const { user } = useAuth();
  const [showInspectionForm, setShowInspectionForm] = useState(false);

  const inspections = [
    { id: 1, date: '2024-01-15', type: 'Foundation', status: 'Passed', inspector: 'Site Engineer', issues: 0 },
    { id: 2, date: '2024-01-14', type: 'Steel Work', status: 'Failed', inspector: 'Quality Manager', issues: 2 },
    { id: 3, date: '2024-01-13', type: 'Concrete', status: 'Passed', inspector: 'Site Engineer', issues: 0 }
  ];

  return (
    <div className="space-y-8 pb-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Quality Assurance</h2>
          <p className="text-sm font-medium text-gray-800 mt-1">Standards and Compliance at {currentTenant.name}</p>
        </div>
        <RoleGuard requiredRole="engineer">
          <button
            onClick={() => setShowInspectionForm(true)}
            className="group flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-premium hover:bg-brand-700 transition-all hover:-translate-y-0.5"
          >
            <span className="text-xl leading-none group-hover:rotate-90 transition-transform">+</span>
            New Inspection
          </button>
        </RoleGuard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-premium p-6 group hover:bg-green-50/30">
          <p className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em] mb-2">Inspected</p>
          <div className="text-3xl font-black text-green-700">15</div>
        </div>
        <div className="card-premium p-6 group hover:bg-red-50/30">
          <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em] mb-2">Failures</p>
          <div className="text-3xl font-black text-red-700">3</div>
        </div>
        <div className="card-premium p-6 group hover:bg-yellow-50/30">
          <p className="text-[10px] font-black text-yellow-600 uppercase tracking-[0.2em] mb-2">Reworks</p>
          <div className="text-3xl font-black text-yellow-700">5</div>
        </div>
        <div className="card-premium p-6 group hover:bg-brand-50/30">
          <p className="text-[10px] font-black text-brand-600 uppercase tracking-[0.2em] mb-2">Quality Score</p>
          <div className="text-3xl font-black text-brand-700">92%</div>
        </div>
      </div>

      <div className="card-premium overflow-hidden">
        <div className="p-8 border-b border-brand-50 bg-brand-50/30 flex justify-between items-center">
          <h3 className="text-xl font-black text-gray-900">Compliance Log</h3>
          <button className="text-[10px] font-black text-brand-600 uppercase tracking-widest hover:text-brand-800 transition-colors">Generate Certificate</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-brand-50/50 border-b border-brand-100">
                <th className="px-8 py-5 text-left text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Timestamp</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Checklist Type</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Verdict</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Responsible</th>
                <th className="px-8 py-5 text-right text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Defects</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-50">
              {inspections.map((inspection) => (
                <tr key={inspection.id} className="group hover:bg-brand-50/30 transition-colors">
                  <td className="px-8 py-6 text-sm font-bold text-gray-800">{inspection.date}</td>
                  <td className="px-8 py-6">
                    <p className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors">{inspection.type}</p>
                    <p className="text-[10px] font-bold text-gray-900 uppercase tracking-tight">Manual site verification</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border rounded-xl ${inspection.status === 'Passed'
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : 'bg-red-50 text-red-700 border-red-200'
                      }`}>
                      {inspection.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-gray-800">{inspection.inspector}</td>
                  <td className="px-8 py-6 text-right font-black text-gray-900">{inspection.issues}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {showInspectionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Quality Inspection</h3>
            <form className="space-y-4">
              <select className="w-full p-3 border rounded-lg">
                <option>Foundation</option>
                <option>Steel Work</option>
                <option>Concrete</option>
                <option>Electrical</option>
              </select>
              <textarea
                className="w-full p-3 border rounded-lg"
                rows="3"
                placeholder="Inspection notes..."
              ></textarea>
              <select className="w-full p-3 border rounded-lg">
                <option>Passed</option>
                <option>Failed</option>
                <option>Needs Rework</option>
              </select>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowInspectionForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg"
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
