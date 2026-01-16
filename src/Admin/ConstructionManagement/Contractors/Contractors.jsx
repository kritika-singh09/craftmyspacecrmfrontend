import { useState } from 'react';
import { useTenant } from '../../../hooks/useTenant.jsx';
import { useTheme } from '../../../context/ThemeContext.jsx';
import { tenantData } from '../../../data/tenantData';
import ContractorForm from './ContractorForm';
import RoleGuard from '../../../common/RoleGuard';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';

const Contractors = () => {
  const { currentTenant } = useTenant();
  const { theme } = useTheme();
  const data = tenantData[currentTenant.id];

  const [contractors, setContractors] = useState(data.contractors);
  const [showForm, setShowForm] = useState(false);
  const [editingContractor, setEditingContractor] = useState(null);

  const handleAdd = () => {
    setEditingContractor(null);
    setShowForm(true);
  };

  const handleEdit = (contractor) => {
    setEditingContractor(contractor);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this contractor?")) {
      setContractors(contractors.filter(c => c.id !== id));
    }
  };

  const handleFormSubmit = (formData) => {
    if (editingContractor) {
      setContractors(contractors.map(c =>
        c.id === editingContractor.id ? { ...c, ...formData } : c
      ));
    } else {
      const newContractor = {
        ...formData,
        id: Math.max(0, ...contractors.map(c => c.id)) + 1
      };
      setContractors([...contractors, newContractor]);
    }
    setShowForm(false);
  };

  return (
    <div className="space-y-8 pb-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: theme.textPrimary }}>Contractors</h2>
          <p className="text-sm font-medium mt-1" style={{ color: theme.textSecondary }}>Manage external partners for {currentTenant.name}</p>
        </div>
        <button
          onClick={handleAdd}
          className="group flex items-center gap-2 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-[0.15em] text-[11px] shadow-premium transition-all hover:-translate-y-0.5"
          style={{ background: theme.gradients.button }}
        >
          <FiPlus className="text-sm group-hover:rotate-90 transition-transform" />
          Add Contractor
        </button>
      </div>

      <div className="card-premium overflow-hidden" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ backgroundColor: `${theme.iconBg}15`, borderColor: theme.cardBorder }}>
              <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Name</th>
              <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Type</th>
              <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Active Projects</th>
              <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ divideColor: theme.cardBorder }}>
            {contractors.map((contractor) => (
              <tr key={contractor.id} className="transition-colors group" style={{ borderBottomColor: theme.cardBorder }}>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="font-bold transition-colors" style={{ color: theme.textPrimary }}>{contractor.name}</div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <span
                    className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-xl border"
                    style={{
                      backgroundColor: `${theme.iconBg}15`,
                      borderColor: `${theme.iconBg}30`,
                      color: theme.textSecondary
                    }}
                  >
                    {contractor.type}
                  </span>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1.5">
                    {contractor.projects.map(p => (
                      <span
                        key={p}
                        className="text-[11px] font-bold px-2 py-0.5 rounded-lg border"
                        style={{
                          backgroundColor: theme.background,
                          color: theme.textPrimary,
                          borderColor: theme.cardBorder
                        }}
                      >{p}</span>
                    ))}
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-right space-x-2">
                  <RoleGuard requiredRole="manager">
                    <button
                      onClick={() => handleEdit(contractor)}
                      className="px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all border-2 rounded-xl inline-flex items-center gap-2"
                      style={{ color: theme.textPrimary, borderColor: theme.cardBorder, backgroundColor: theme.background }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = theme.primary;
                        e.currentTarget.style.color = theme.primary;
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = theme.cardBorder;
                        e.currentTarget.style.color = theme.textPrimary;
                      }}
                    >
                      <FiEdit2 className="text-xs" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(contractor.id)}
                      className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all border-2 border-red-100 inline-flex items-center gap-2"
                    >
                      <FiTrash2 className="text-xs" />
                      Remove
                    </button>
                  </RoleGuard>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-[100] p-4" style={{ backgroundColor: `${theme.textPrimary}40` }}>
          <div className="bg-white rounded-[2.5rem] shadow-premium w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-300" style={{ backgroundColor: theme.cardBg }}>
            <div className="table-header-premium p-6 text-white relative" style={{ background: theme.gradients.primary }}>
              <div className="pr-12">
                <h3 className="text-xl font-black">
                  {editingContractor ? 'Edit Contractor' : 'Register New Contractor'}
                </h3>
                <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest mt-1">External Partner Management</p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white"
              >
                <FiX />
              </button>
            </div>
            <div className="p-8">
              <ContractorForm
                onSubmit={handleFormSubmit}
                initialData={editingContractor}
                projects={data.projects}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contractors;
