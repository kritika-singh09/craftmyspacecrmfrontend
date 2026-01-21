import { useState, useEffect } from 'react';
import { useTenant } from '../../../hooks/useTenant.jsx';
import { useAuth } from '../../../hooks/useAuth.jsx';
import RoleGuard from '../../../common/RoleGuard';

import { useTheme } from '../../../context/ThemeContext.jsx';
import { FiDownload, FiTrash2, FiEdit2, FiEye, FiPlus, FiX, FiFile, FiFileText, FiImage } from 'react-icons/fi';

const Documents = () => {
  const { currentTenant } = useTenant();
  const { user } = useAuth();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);



  const [documents, setDocuments] = useState([
    { id: 1, name: 'Project Blueprint.pdf', type: 'Drawing', size: '2.5 MB', uploadedBy: 'Project Manager', date: '2024-01-15', origin: 'Project Manager' },
    { id: 2, name: 'Contract Agreement.pdf', type: 'Contract', size: '1.2 MB', uploadedBy: 'Admin', date: '2024-01-14', origin: 'Admin' },
    { id: 3, name: 'BOQ Sheet.xlsx', type: 'BOQ', size: '850 KB', uploadedBy: 'Engineer', date: '2024-01-13', origin: 'Engineer' }
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [formData, setFormData] = useState({ name: '', type: 'Drawing' });

  const inputStyle = {
    backgroundColor: `${theme.iconBg}10`,
    borderColor: theme.cardBorder,
    color: theme.textPrimary
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(doc => doc.id !== id));
    }
  };

  const handleDownload = (doc) => {
    // Mock download
    alert(`Downloading ${doc.name}...`);
  };

  const handleEdit = (doc) => {
    setSelectedDocument(doc);
    setFormData({ name: doc.name, type: doc.type });
    setIsEditMode(true);
    setShowUploadModal(true);
  };

  const handleViewDetails = (doc) => {
    setSelectedDocument(doc);
    setShowDetailsModal(true);
  };

  const handleUploadClick = () => {
    setFormData({ name: '', type: 'Drawing' });
    setIsEditMode(false);
    setShowUploadModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditMode && selectedDocument) {
      setDocuments(documents.map(doc => doc.id === selectedDocument.id ? { ...doc, name: formData.name, type: formData.type } : doc));
    } else {
      const newDoc = {
        id: documents.length + 1,
        name: formData.name || 'New Document.pdf',
        type: formData.type,
        size: '0 KB',
        uploadedBy: user?.name || 'User',
        date: new Date().toISOString().split('T')[0],
        origin: 'Upload'
      };
      setDocuments([newDoc, ...documents]);
    }
    setShowUploadModal(false);
  };



  return (
    <div className="space-y-8 pb-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: theme.textPrimary }}>Vault</h2>
          <p className="text-sm font-medium mt-1" style={{ color: theme.textSecondary }}>Project Documents and Blueprints</p>
        </div>
        <RoleGuard requiredRole="engineer">
          <button
            onClick={handleUploadClick}
            className="group flex items-center gap-2 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-premium transition-all hover:-translate-y-0.5"
            style={{ background: theme.gradients.button }}
          >
            <FiPlus className="text-xl transition-transform group-hover:rotate-90" />
            Upload
          </button>
        </RoleGuard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-premium p-6 group transition-colors" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: theme.primary }}>Total Files</p>
          <div className="text-3xl font-black" style={{ color: theme.primary }}>{documents.length}</div>
        </div>
        <div className="card-premium p-6 group transition-colors" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <p className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em] mb-2">Drawings</p>
          <div className="text-3xl font-black text-green-700">8</div>
        </div>
        <div className="card-premium p-6 group transition-colors" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <p className="text-[10px] font-black text-yellow-600 uppercase tracking-[0.2em] mb-2">Contracts</p>
          <div className="text-3xl font-black text-yellow-700">12</div>
        </div>
        <div className="card-premium p-6 group transition-colors" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.2em] mb-2">Reports</p>
          <div className="text-3xl font-black text-purple-700">5</div>
        </div>
      </div>

      <div className="card-premium overflow-hidden" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
        <div className="p-8 border-b flex justify-between items-center" style={{ borderColor: theme.cardBorder, backgroundColor: `${theme.iconBg}05` }}>
          <h3 className="text-xl font-black" style={{ color: theme.textPrimary }}>Document Repository</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Filter by name..."
              className="px-4 py-2 rounded-xl text-xs font-bold outline-none w-48 focus:ring-2"
              style={{
                ...inputStyle,
                color: theme.textPrimary,
                backgroundColor: theme.cardBg,
                borderColor: theme.cardBorder
              }}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ backgroundColor: `${theme.iconBg}15`, borderColor: theme.cardBorder }}>
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Document Name</th>
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Category</th>
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Volume</th>
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Origin</th>
                <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Acquired</th>
                <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ divideColor: theme.cardBorder }}>
              {documents.map((doc) => (
                <tr key={doc.id} className="group transition-colors" style={{ '&:hover': { backgroundColor: `${theme.iconBg}05` } }}>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleViewDetails(doc)}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs uppercase shadow-sm" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}>
                        {doc.name.split('.').pop()}
                      </div>
                      <span className="font-bold transition-colors hover:underline" style={{ color: theme.textPrimary }}>{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest border rounded-xl" style={{ backgroundColor: `${theme.primary}10`, color: theme.primary, borderColor: `${theme.primary}30` }}>
                      {doc.type}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold" style={{ color: theme.textSecondary }}>{doc.size}</td>
                  <td className="px-8 py-6 text-sm font-bold" style={{ color: theme.textSecondary }}>{doc.origin || doc.uploadedBy}</td>
                  <td className="px-8 py-6 text-right text-sm font-bold" style={{ color: theme.textSecondary }}>{doc.date}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleViewDetails(doc)} className="p-2 rounded-lg transition-colors hover:bg-blue-50 text-blue-600" title="View Details">
                        <FiEye className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDownload(doc)} className="p-2 rounded-lg transition-colors hover:bg-green-50 text-green-600" title="Download">
                        <FiDownload className="w-4 h-4" />
                      </button>
                      <RoleGuard requiredRole="manager">
                        <button onClick={() => handleEdit(doc)} className="p-2 rounded-lg transition-colors hover:bg-amber-50 text-amber-600" title="Edit">
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(doc.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors" title="Delete">
                          <FiTrash2 className="w-4 h-4" />
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


      {showUploadModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="rounded-[2rem] w-full max-w-md shadow-2xl relative overflow-hidden" style={{ backgroundColor: theme.cardBg }}>
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500" />
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-black tracking-tight" style={{ color: theme.textPrimary }}>{isEditMode ? 'Edit Document' : 'Upload Document'}</h3>
                  <p className="text-xs font-bold opacity-50 uppercase tracking-widest mt-1">Vault Management</p>
                </div>
                <button onClick={() => setShowUploadModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <FiX className="text-xl opacity-60" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-60 pl-2">Document Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Project Blueprint v2"
                    className="w-full p-4 rounded-xl text-sm font-bold outline-none focus:ring-2 transition-all"
                    style={{ ...inputStyle, focusRing: theme.primary }}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-60 pl-2">Category</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full p-4 rounded-xl text-sm font-bold outline-none focus:ring-2 transition-all cursor-pointer"
                    style={inputStyle}
                  >
                    <option value="Drawing">Drawing</option>
                    <option value="Contract">Contract</option>
                    <option value="BOQ">BOQ</option>
                    <option value="Report">Report</option>
                    <option value="Invoice">Invoice</option>
                  </select>
                </div>

                {!isEditMode && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60 pl-2">File Attachment</label>
                    <div className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:bg-slate-50 transition-colors" style={{ borderColor: theme.cardBorder }}>
                      <FiDownload className="mx-auto text-3xl mb-2 opacity-20" />
                      <p className="text-xs font-bold opacity-40">Click to browse or drag file here</p>
                    </div>
                  </div>
                )}

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: theme.iconBg, color: theme.textSecondary }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                    style={{ background: theme.gradients.button }}
                  >
                    {isEditMode ? 'Save Changes' : 'Upload File'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showDetailsModal && selectedDocument && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden relative" style={{ backgroundColor: theme.cardBg }}>
            <div className="h-32 bg-slate-100 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-pattern opacity-10"></div>
              <div className="w-20 h-20 rounded-2xl shadow-xl flex items-center justify-center text-3xl relative z-10" style={{ backgroundColor: theme.cardBg, color: theme.primary }}>
                {selectedDocument.name.split('.').pop() === 'pdf' ? <FiFileText /> : <FiFile />}
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="absolute top-6 right-6 p-2 bg-white/50 backdrop-blur-md rounded-full hover:bg-white transition-colors"
              >
                <FiX />
              </button>
            </div>

            <div className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black tracking-tight mb-2" style={{ color: theme.textPrimary }}>{selectedDocument.name}</h3>
                <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500">
                  {selectedDocument.type}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">File Size</p>
                  <p className="font-bold text-slate-700">{selectedDocument.size}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">Date Added</p>
                  <p className="font-bold text-slate-700">{selectedDocument.date}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">Uploaded By</p>
                  <p className="font-bold text-slate-700">{selectedDocument.uploadedBy}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">Origin</p>
                  <p className="font-bold text-slate-700">{selectedDocument.origin || 'System'}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleDownload(selectedDocument)}
                  className="flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:-translate-y-1 hover:shadow-lg text-white"
                  style={{ background: theme.gradients.button }}
                >
                  <FiDownload className="text-lg" /> Download File
                </button>
                <RoleGuard requiredRole="manager">
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleEdit(selectedDocument);
                    }}
                    className="px-6 rounded-2xl font-black text-xl flex items-center justify-center transition-colors border-2"
                    style={{ borderColor: theme.cardBorder, color: theme.textSecondary }}
                    title="Edit Document"
                  >
                    <FiEdit2 />
                  </button>
                </RoleGuard>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;
