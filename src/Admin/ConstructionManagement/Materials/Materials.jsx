import { useState } from 'react';
import { useTenant } from '../../../hooks/useTenant.jsx';
import { useAuth } from '../../../hooks/useAuth.jsx';
import { useTheme } from '../../../context/ThemeContext.jsx';
import RoleGuard from '../../../common/RoleGuard';
import MaterialForm from './MaterialForm';
import IssueMaterialForm from './IssueMaterialForm';
import { FiPlus, FiArrowUpRight, FiRefreshCcw, FiX, FiCheck } from 'react-icons/fi';
import { projects, vendors } from '../../../data/databaseDummyData';

const Materials = () => {
  const { currentTenant } = useTenant();
  const { user } = useAuth();
  const { theme } = useTheme();

  const [materialsList, setMaterialsList] = useState([
    { id: 1, name: "Cement", unit: "Bags", stock: 500, minStock: 50, vendor: "Shree Cement Ltd" },
    { id: 2, name: "Steel", unit: "Tons", stock: 25, minStock: 5, vendor: "Steel India" },
    { id: 3, name: "Sand", unit: "Trucks", stock: 15, minStock: 3, vendor: "Sand Suppliers" }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showIssueForm, setShowIssueForm] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const handleMaterialSubmit = (formData) => {
    if (editingMaterial) {
      setMaterialsList(materialsList.map(m =>
        m.id === editingMaterial.id ? { ...m, ...formData } : m
      ));
    } else {
      const newMat = {
        ...formData,
        id: Math.max(0, ...materialsList.map(m => m.id)) + 1,
        stock: parseFloat(formData.quantity) || 0 // Initial stock from form
      };
      setMaterialsList([...materialsList, newMat]);
    }
    setShowForm(false);
    setEditingMaterial(null);
  };

  const handleIssue = (material) => {
    setSelectedMaterial(material);
    setShowIssueForm(true);
  };

  const handleIssueSubmit = (issueData) => {
    setMaterialsList(materialsList.map(m =>
      m.id === issueData.materialId
        ? { ...m, stock: m.stock - issueData.quantity }
        : m
    ));
    setShowIssueForm(false);
    setSelectedMaterial(null);
  };

  const handleEdit = (material) => {
    setEditingMaterial(material);
    setShowForm(true);
  };

  return (
    <div className="space-y-8 pb-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight" style={{ color: theme.textPrimary }}>Inventory</h2>
          <p className="text-sm font-medium mt-1" style={{ color: theme.textSecondary }}>Resource Management for {currentTenant.name}</p>
        </div>
        <RoleGuard requiredRole="engineer">
          <button
            onClick={() => setShowForm(true)}
            className="group flex items-center gap-2 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-premium transition-all hover:-translate-y-0.5"
            style={{ background: theme.gradients.button }}
          >
            <span className="text-xl leading-none group-hover:rotate-90 transition-transform">+</span>
            Add Material
          </button>
        </RoleGuard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {materialsList.map((material) => (
          <div key={material.id} className="card-premium p-8 group flex flex-col" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-black transition-colors leading-tight mb-1" style={{ color: theme.textPrimary }}>{material.name}</h3>
                <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: theme.textMuted }}>{material.vendor}</p>
              </div>
              <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg border ${material.stock <= material.minStock
                ? 'bg-red-50 text-red-600 border-red-100'
                : 'bg-green-50 text-green-600 border-green-100'
                }`}>
                {material.stock <= material.minStock ? 'Critical' : 'Healthy'}
              </span>
            </div>

            <div className="mb-8 mt-auto">
              <div className="flex justify-between items-end mb-2.5">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textMuted }}>Available Stock</span>
                <span className={`text-sm font-black ${material.stock <= material.minStock ? 'text-red-500' : ''}`} style={{ color: material.stock > material.minStock ? theme.textPrimary : undefined }}>
                  {material.stock} {material.unit}
                </span>
              </div>
              <div className="w-full rounded-full h-3 p-0.5 border" style={{ backgroundColor: `${theme.iconBg}20`, borderColor: `${theme.iconBg}30` }}>
                <div
                  className={`h-full rounded-full shadow-sm relative overflow-hidden transition-all duration-500`}
                  style={{
                    width: `${Math.min((material.stock / (material.minStock * 3)) * 100, 100)}%`,
                    background: material.stock <= material.minStock ? 'linear-gradient(to right, #ef4444, #dc2626)' : theme.gradients.progress
                  }}
                >
                  <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40" style={{ color: theme.textMuted }}>Unit: {material.unit}</p>
                <p className="text-[10px] font-black uppercase tracking-tighter" style={{ color: theme.textMuted }}>Min: {material.minStock}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-auto pt-6 border-t" style={{ borderColor: theme.cardBorder }}>
              <button
                onClick={() => handleIssue(material)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white text-[11px] font-black uppercase tracking-[0.15em] transition-all shadow-premium hover:shadow-lg hover:-translate-y-0.5"
                style={{ background: theme.gradients.button }}
              >
                Issue
                <FiArrowUpRight className="text-sm" />
              </button>
              <RoleGuard requiredRole="manager">
                <button
                  onClick={() => handleEdit(material)}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] transition-all border-2"
                  style={{
                    backgroundColor: theme.background,
                    color: theme.textPrimary,
                    borderColor: theme.cardBorder
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = theme.primary;
                    e.currentTarget.style.color = theme.primary;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = theme.cardBorder;
                    e.currentTarget.style.color = theme.textPrimary;
                  }}
                >
                  <FiRefreshCcw className="text-xs" />
                  Update
                </button>
              </RoleGuard>
            </div>
          </div>
        ))}
      </div>


      {showForm && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-[100] p-4" style={{ backgroundColor: `${theme.textPrimary}40` }}>
          <div className="bg-white rounded-[2.5rem] shadow-premium w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300" style={{ backgroundColor: theme.cardBg }}>
            <div className="table-header-premium p-6 text-white relative" style={{ background: theme.gradients.primary }}>
              <div className="pr-12">
                <h3 className="text-xl font-black">
                  {editingMaterial ? 'Update Inventory' : 'Add New Material'}
                </h3>
                <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest mt-1">Resource & Stock Management</p>
              </div>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingMaterial(null);
                }}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white"
              >
                <FiX />
              </button>
            </div>
            <div className="p-8">
              <MaterialForm
                onSubmit={handleMaterialSubmit}
                initialData={editingMaterial}
                projects={projects}
                vendors={vendors}
                onClose={() => {
                  setShowForm(false);
                  setEditingMaterial(null);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {showIssueForm && selectedMaterial && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-[100] p-4" style={{ backgroundColor: `${theme.textPrimary}40` }}>
          <div className="bg-white rounded-[2.5rem] shadow-premium w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-300" style={{ backgroundColor: theme.cardBg }}>
            <div className="table-header-premium p-6 text-white relative" style={{ background: theme.gradients.primary }}>
              <div className="pr-12">
                <h3 className="text-xl font-black">Issue Material</h3>
                <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest mt-1">Direct Stock Release to Site</p>
              </div>
              <button
                onClick={() => {
                  setShowIssueForm(false);
                  setSelectedMaterial(null);
                }}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white"
              >
                <FiX />
              </button>
            </div>
            <div className="p-8">
              <IssueMaterialForm
                material={selectedMaterial}
                projects={projects}
                onSubmit={handleIssueSubmit}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Materials;
