import { useState } from 'react';
import { useTenant } from '../../../hooks/useTenant.jsx';
import { useAuth } from '../../../hooks/useAuth.jsx';
import RoleGuard from '../../../common/RoleGuard';
import MaterialForm from './MaterialForm';
import { projects, vendors } from '../../../data/databaseDummyData';

const Materials = () => {
  const { currentTenant } = useTenant();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);

  const materials = [
    { id: 1, name: "Cement", unit: "Bags", stock: 500, minStock: 50, vendor: "Shree Cement Ltd" },
    { id: 2, name: "Steel", unit: "Tons", stock: 25, minStock: 5, vendor: "Steel India" },
    { id: 3, name: "Sand", unit: "Trucks", stock: 15, minStock: 3, vendor: "Sand Suppliers" }
  ];

  const handleMaterialSubmit = (formData) => {
    console.log('Material submitted:', formData);
    setShowForm(false);
    setEditingMaterial(null);
  };

  const handleEdit = (material) => {
    setEditingMaterial(material);
    setShowForm(true);
  };

  return (
    <div className="space-y-8 pb-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Inventory</h2>
          <p className="text-sm font-medium text-gray-800 dark:text-brand-300 mt-1">Resource Management for {currentTenant.name}</p>
        </div>
        <RoleGuard requiredRole="engineer">
          <button
            onClick={() => setShowForm(true)}
            className="group flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-premium hover:bg-brand-700 transition-all hover:-translate-y-0.5"
          >
            <span className="text-xl leading-none group-hover:rotate-90 transition-transform">+</span>
            Add Material
          </button>
        </RoleGuard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {materials.map((material) => (
          <div key={material.id} className="card-premium p-8 group flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-tight mb-1">{material.name}</h3>
                <p className="text-[10px] font-semibold text-gray-900 dark:text-brand-400 uppercase tracking-widest">{material.vendor}</p>
              </div>
              <span className={`px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-lg ${material.stock <= material.minStock
                ? 'bg-red-50 text-red-600 border border-red-100'
                : 'bg-green-50 text-green-600 border border-green-100'
                }`}>
                {material.stock <= material.minStock ? 'Critical' : 'Healthy'}
              </span>
            </div>

            <div className="mb-8 mt-auto">
              <div className="flex justify-between items-end mb-2.5">
                <span className="text-[10px] font-bold text-gray-900 dark:text-brand-400 uppercase tracking-widest">Available Stock</span>
                <span className={`text-sm font-bold ${material.stock <= material.minStock ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                  {material.stock} {material.unit}
                </span>
              </div>
              <div className="w-full bg-brand-50 dark:bg-brand-900/30 rounded-full h-3 p-0.5 border border-brand-100/30 dark:border-brand-800/30">
                <div
                  className={`h-full rounded-full shadow-sm relative overflow-hidden transition-all duration-500 ${material.stock <= material.minStock ? 'bg-gradient-to-r from-red-400 to-red-600' : 'bg-gradient-to-r from-blue-400 to-blue-600'}`}
                  style={{ width: `${Math.min((material.stock / (material.minStock * 3)) * 100, 100)}%` }}
                >
                  <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                </div>
              </div>
              <p className="text-[10px] font-bold text-gray-900 dark:text-brand-400 mt-2 text-right uppercase tracking-tighter">Min. Required: {material.minStock} {material.unit}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-auto pt-6 border-t border-gray-100">
              <button className="py-2.5 px-4 rounded-xl bg-brand-600 text-white text-[11px] font-bold uppercase tracking-wider hover:bg-brand-700 transition-all shadow-sm">
                Issue
              </button>
              <RoleGuard requiredRole="manager">
                <button
                  onClick={() => handleEdit(material)}
                  className="py-2.5 px-4 rounded-xl bg-gray-50 dark:bg-brand-900/30 text-gray-900 dark:text-brand-300 text-[11px] font-bold uppercase tracking-wider hover:bg-gray-100 dark:hover:bg-brand-800 transition-all"
                >
                  Update
                </button>
              </RoleGuard>
            </div>
          </div>
        ))}
      </div>


      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingMaterial ? 'Edit Material' : 'Add New Material'}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingMaterial(null);
                }}
                className="text-gray-800 hover:text-gray-900"
              >
                ✕
              </button>
            </div>
            <MaterialForm
              onSubmit={handleMaterialSubmit}
              initialData={editingMaterial}
              projects={projects}
              vendors={vendors}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Materials;
