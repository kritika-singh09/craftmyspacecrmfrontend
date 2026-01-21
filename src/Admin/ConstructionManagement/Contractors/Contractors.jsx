import { useState, useEffect } from 'react';
import { useTenant } from '../../../hooks/useTenant.jsx';
import { useAuth } from '../../../hooks/useAuth.jsx';
import { useTheme } from '../../../context/ThemeContext.jsx';
import RoleGuard from '../../../common/RoleGuard';
import ContractorForm from './ContractorForm';
import ContractorProfile from './ContractorProfile';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheckCircle, FiStar, FiAlertTriangle } from 'react-icons/fi';


const Contractors = () => {
  const { currentTenant } = useTenant();
  const { token } = useAuth();
  const { theme } = useTheme();

  const [contractors, setContractors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingContractor, setEditingContractor] = useState(null);
  const [viewingContractor, setViewingContractor] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchContractors();
  }, [token]);

  const fetchContractors = async () => {
    try {
      const res = await fetch(`${API_URL}/construction/contractors`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setContractors(data);
      }
    } catch (error) {
      console.error("Error fetching contractors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingContractor(null);
    setShowForm(true);
  };

  const handleEdit = (contractor) => {
    setEditingContractor(contractor);
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    fetchContractors();
    setShowForm(false);
    setEditingContractor(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this contractor?")) {
      try {
        await fetch(`${API_URL}/construction/contractors/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchContractors();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="space-y-8 pb-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>Contractors</h2>
          <p className="text-[11px] font-bold mt-1 opacity-60 uppercase tracking-widest" style={{ color: theme.textSecondary }}>Partner Network</p>
        </div>
        <RoleGuard requiredRole="manager">
          <button
            onClick={handleAdd}
            className="group flex items-center gap-2 text-white px-6 py-3 rounded-xl font-black uppercase tracking-[0.15em] text-[10px] shadow-premium transition-all hover:-translate-y-1"
            style={{ background: theme.gradients.button }}
          >
            <FiPlus className="text-sm group-hover:rotate-90 transition-transform" />
            Add Contractor
          </button>
        </RoleGuard>
      </div>

      <div className="card-premium overflow-hidden rounded-[2rem]" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
        {loading ? (
          <div className="p-10 text-center font-bold opacity-50">Loading Contractors...</div>
        ) : contractors.length === 0 ? (
          <div className="p-20 text-center font-bold opacity-40 uppercase tracking-widest">No contractors found.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ backgroundColor: `${theme.iconBg}15`, borderColor: theme.cardBorder }}>
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Contractor / Firm</th>
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Specialization</th>
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Performance</th>
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Status</th>
                <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Action</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ divideColor: theme.cardBorder }}>
              {contractors.map((contractor) => (
                <tr key={contractor._id} className="transition-colors group hover:bg-white/5" style={{ borderBottomColor: theme.cardBorder }}>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center font-black text-slate-500">
                        {contractor.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold transition-colors text-sm" style={{ color: theme.textPrimary }}>{contractor.name}</div>
                        <div className="text-[10px] font-bold uppercase opacity-50 tracking-wider" style={{ color: theme.textSecondary }}>{contractor.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <span
                      className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg border"
                      style={{
                        backgroundColor: `${theme.iconBg}15`,
                        borderColor: `${theme.iconBg}30`,
                        color: theme.textSecondary
                      }}
                    >
                      {contractor.specialization}
                    </span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="flex text-amber-400 text-xs">
                        {[...Array(5)].map((_, i) => (
                          <FiStar key={i} className={i < (contractor.skills?.rating || 3) ? "fill-current" : "opacity-30"} />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold opacity-60">({contractor.activeProjectsCount} Active)</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    {contractor.legal?.kycStatus === 'Verified' ? (
                      <span className="flex items-center gap-1.5 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                        <FiCheckCircle /> Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-amber-500 text-[10px] font-black uppercase tracking-widest">
                        <FiAlertTriangle /> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-right space-x-2">
                    <button
                      onClick={() => setViewingContractor(contractor)}
                      className="px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl inline-flex items-center gap-2 hover:bg-white/10"
                      style={{ color: theme.textPrimary }}
                    >
                      View
                    </button>
                    <RoleGuard requiredRole="manager">
                      <button
                        onClick={() => handleEdit(contractor)}
                        className="px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all border rounded-xl inline-flex items-center gap-2"
                        style={{ color: theme.textPrimary, borderColor: theme.cardBorder }}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(contractor._id)}
                        className="px-3 py-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                      >
                        <FiTrash2 />
                      </button>
                    </RoleGuard>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-[100] p-4 bg-slate-900/40">
          <ContractorForm
            onClose={() => setShowForm(false)}
            onSuccess={handleFormSubmit}
            initialData={editingContractor}
          />
        </div>
      )}

      {viewingContractor && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-[100] p-4 bg-slate-900/40">
          <ContractorProfile
            contractor={viewingContractor}
            onClose={() => setViewingContractor(null)}
            onEdit={() => { setViewingContractor(null); handleEdit(viewingContractor); }}
          />
        </div>
      )}
    </div>
  );
};

export default Contractors;
