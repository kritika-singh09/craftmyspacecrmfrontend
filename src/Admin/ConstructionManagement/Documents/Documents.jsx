import { useState } from 'react';
import { useTenant } from '../../../hooks/useTenant.jsx';
import { useAuth } from '../../../hooks/useAuth.jsx';
import RoleGuard from '../../../common/RoleGuard';

const Documents = () => {
  const { currentTenant } = useTenant();
  const { user } = useAuth();
  const [showUploadForm, setShowUploadForm] = useState(false);

  const documents = [
    { id: 1, name: 'Project Blueprint.pdf', type: 'Drawing', size: '2.5 MB', uploadedBy: 'Project Manager', date: '2024-01-15' },
    { id: 2, name: 'Contract Agreement.pdf', type: 'Contract', size: '1.2 MB', uploadedBy: 'Admin', date: '2024-01-14' },
    { id: 3, name: 'BOQ Sheet.xlsx', type: 'BOQ', size: '850 KB', uploadedBy: 'Engineer', date: '2024-01-13' }
  ];

  return (
    <div className="space-y-8 pb-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Vault</h2>
          <p className="text-sm font-medium text-gray-800 mt-1">Project Documents and Blueprints</p>
        </div>
        <RoleGuard requiredRole="engineer">
          <button
            onClick={() => setShowUploadForm(true)}
            className="group flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-premium hover:bg-brand-700 transition-all hover:-translate-y-0.5"
          >
            <span className="text-xl leading-none group-hover:rotate-90 transition-transform">+</span>
            Upload
          </button>
        </RoleGuard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-premium p-6 group hover:bg-brand-50/30">
          <p className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] mb-2">Total Files</p>
          <div className="text-3xl font-black text-brand-700">25</div>
        </div>
        <div className="card-premium p-6 group hover:bg-green-50/30">
          <p className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em] mb-2">Drawings</p>
          <div className="text-3xl font-black text-green-700">8</div>
        </div>
        <div className="card-premium p-6 group hover:bg-yellow-50/30">
          <p className="text-[10px] font-black text-yellow-600 uppercase tracking-[0.2em] mb-2">Contracts</p>
          <div className="text-3xl font-black text-yellow-700">12</div>
        </div>
        <div className="card-premium p-6 group hover:bg-purple-50/30">
          <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.2em] mb-2">Reports</p>
          <div className="text-3xl font-black text-purple-700">5</div>
        </div>
      </div>

      <div className="card-premium overflow-hidden">
        <div className="p-8 border-b border-brand-50 bg-brand-50/30 flex justify-between items-center">
          <h3 className="text-xl font-black text-gray-900">Document Repository</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Filter by name..."
              className="px-4 py-2 bg-white border border-brand-100 rounded-xl text-xs font-bold focus:ring-2 focus:ring-brand-500/10 outline-none w-48"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-brand-50/50 border-b border-brand-100">
                <th className="px-8 py-5 text-left text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Document Name</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Category</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Volume</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Origin</th>
                <th className="px-8 py-5 text-right text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Acquired</th>
                <th className="px-8 py-5 text-right text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-50">
              {documents.map((doc) => (
                <tr key={doc.id} className="group hover:bg-brand-50/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center font-black text-xs uppercase shadow-sm">
                        {doc.name.split('.').pop()}
                      </div>
                      <span className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-brand-50 text-brand-700 border border-brand-100 rounded-xl">
                      {doc.type}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-gray-800">{doc.size}</td>
                  <td className="px-8 py-6 text-sm font-bold text-gray-800">{doc.uploadedBy}</td>
                  <td className="px-8 py-6 text-right text-sm font-bold text-gray-800">{doc.date}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 hover:bg-brand-100 rounded-lg text-brand-600 transition-colors" title="Download">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      </button>
                      <RoleGuard requiredRole="manager">
                        <button className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors" title="Delete">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </RoleGuard>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {showUploadForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Upload Document</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Document Name"
                className="w-full p-3 border rounded-lg"
              />
              <select className="w-full p-3 border rounded-lg">
                <option>Drawing</option>
                <option>Contract</option>
                <option>BOQ</option>
                <option>Report</option>
                <option>Invoice</option>
              </select>
              <input
                type="file"
                className="w-full p-3 border rounded-lg"
              />
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-brand-600 text-white py-2 rounded-lg"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;
