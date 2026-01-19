import React, { useState } from 'react';
import { FiBox, FiSearch, FiFilter, FiPlus, FiArrowUpRight, FiFileText, FiRefreshCcw, FiX, FiCheck } from 'react-icons/fi';
import { MdChair, MdPalette, MdVpnKey, MdLightbulb } from 'react-icons/md';
import { useTheme } from '../../../context/ThemeContext';
import MaterialForm from '../../ConstructionManagement/Materials/MaterialForm';
import IssueMaterialForm from '../../ConstructionManagement/Materials/IssueMaterialForm';
import { projects, vendors } from '../../../data/databaseDummyData';

const IntMaterials = () => {
    const { theme } = useTheme();

    // Initial Interior-specific materials
    const [materialsList, setMaterialsList] = useState([
        { id: 1, name: 'Velvet Navy Blue', unit: 'm', stock: 120, minStock: 20, vendor: 'D Decor', category: 'Finishes' },
        { id: 2, name: 'Gold Leaf Foil', unit: 'sqft', stock: 45, minStock: 50, vendor: 'Kansai Nerolac', category: 'Finishes' },
        { id: 3, name: 'Magnetic Track LT', unit: 'ft', stock: 0, minStock: 100, vendor: 'Wipro', category: 'Lighting' },
        { id: 4, name: 'Teak Wood Veneer', unit: 'sht', stock: 25, minStock: 10, vendor: 'Greenply', category: 'Furniture' },
    ]);

    const [showForm, setShowForm] = useState(false);
    const [showIssueForm, setShowIssueForm] = useState(false);
    const [editingMaterial, setEditingMaterial] = useState(null);
    const [selectedMaterial, setSelectedMaterial] = useState(null);

    const categories = [
        { name: 'Furniture', items: materialsList.filter(m => m.category === 'Furniture').length, icon: <MdChair className="text-2xl" /> },
        { name: 'Finishes', items: materialsList.filter(m => m.category === 'Finishes').length, icon: <MdPalette className="text-2xl" /> },
        { name: 'Hardware', items: materialsList.filter(m => m.category === 'Hardware').length, icon: <MdVpnKey className="text-2xl" /> },
        { name: 'Lighting', items: materialsList.filter(m => m.category === 'Lighting').length, icon: <MdLightbulb className="text-2xl" /> },
    ];

    const handleMaterialSubmit = (formData) => {
        if (editingMaterial) {
            setMaterialsList(materialsList.map(m =>
                m.id === editingMaterial.id ? { ...m, ...formData } : m
            ));
        } else {
            const newMat = {
                ...formData,
                id: Math.max(0, ...materialsList.map(m => m.id)) + 1,
                stock: parseFloat(formData.quantity) || 0,
                category: 'Uncategorized' // Default for new adds via generic form
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
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight uppercase" style={{ color: theme.textPrimary }}>
                        Material <span style={{ color: theme.secondary }}>Library</span>
                    </h1>
                    <p className="mt-2 font-bold tracking-wide" style={{ color: theme.textSecondary }}>
                        Curated catalogs, technical specs, and Bill of Quantities management.
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-3 px-8 py-4 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all"
                    style={{ background: theme.gradients.button }}
                >
                    <FiPlus className="text-lg" /> Add Material
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((cat, i) => (
                    <div key={i} className="p-8 rounded-[3rem] shadow-premium border transition-all hover:-translate-y-2 group cursor-pointer"
                        style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
                    >
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-inner transition-colors"
                            style={{ backgroundColor: `${theme.primary}10`, color: theme.primary }}
                        >{cat.icon}</div>
                        <h4 className="text-lg font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>{cat.name}</h4>
                        <p className="text-[10px] font-black uppercase tracking-widest mt-1" style={{ color: theme.secondary }}>{cat.items} SKUs</p>
                    </div>
                ))}
            </div>

            <div className="rounded-[3.5rem] shadow-premium border overflow-hidden"
                style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
            >
                <div className="p-10 border-b flex flex-col md:flex-row justify-between items-center gap-6"
                    style={{ borderColor: theme.cardBorder }}
                >
                    <h4 className="text-xl font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>Recent Material Specs</h4>
                    <FiSearch className="text-2xl hidden md:block" style={{ color: theme.secondary }} />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr style={{ backgroundColor: `${theme.primary}08` }}>
                                {['Material', 'Category', 'Vendor', 'Stock', 'Status', 'Actions'].map(h => (
                                    <th key={h} className="px-10 py-6 text-[10px] font-black uppercase tracking-widest" style={{ color: theme.secondary }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y" style={{ divideColor: theme.cardBorder }}>
                            {materialsList.map((item, i) => (
                                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-10 py-6 text-sm font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>{item.name}</td>
                                    <td className="px-10 py-6 text-[10px] font-bold opacity-60 uppercase" style={{ color: theme.textSecondary }}>{item.category || '-'}</td>
                                    <td className="px-10 py-6 text-[10px] font-black opacity-60 uppercase tracking-widest" style={{ color: theme.textPrimary }}>{item.vendor}</td>
                                    <td className="px-10 py-6 text-sm font-black" style={{ color: theme.textSecondary }}>{item.stock} {item.unit}</td>
                                    <td className="px-10 py-6">
                                        <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${item.stock > item.minStock
                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                            : 'bg-rose-50 text-rose-700 border-rose-100'
                                            }`}>
                                            {item.stock > item.minStock ? 'In Stock' : 'Low Stock'}
                                        </span>
                                    </td>
                                    <td className="px-10 py-6 flex gap-2">
                                        <button onClick={() => handleEdit(item)} className="p-2 hover:bg-black/5 rounded-lg transition-colors" style={{ color: theme.textSecondary }}>
                                            <FiRefreshCcw />
                                        </button>
                                        <button onClick={() => handleIssue(item)} className="p-2 hover:bg-black/5 rounded-lg transition-colors" style={{ color: theme.secondary }}>
                                            <FiArrowUpRight />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-[2rem] shadow-2xl animate-in slide-in-from-bottom-8"
                        style={{ backgroundColor: theme.cardBg }}
                    >
                        <div className="p-6 text-white relative flex justify-between items-center" style={{ background: theme.gradients.primary }}>
                            <div>
                                <h3 className="text-xl font-black">{editingMaterial ? 'Update Specification' : 'Add New Material'}</h3>
                                <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mt-1">Interior Material Library</p>
                            </div>
                            <button onClick={() => setShowForm(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white">
                                <FiX />
                            </button>
                        </div>
                        <div className="p-8">
                            <MaterialForm
                                onSubmit={handleMaterialSubmit}
                                initialData={editingMaterial}
                                projects={projects}
                                vendors={vendors}
                                onClose={() => setShowForm(false)}
                            />
                        </div>
                    </div>
                </div>
            )}

            {showIssueForm && selectedMaterial && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-xl bg-white rounded-[2rem] shadow-2xl animate-in slide-in-from-bottom-8"
                        style={{ backgroundColor: theme.cardBg }}
                    >
                        <div className="p-6 text-white relative flex justify-between items-center" style={{ background: theme.gradients.primary }}>
                            <div>
                                <h3 className="text-xl font-black">Issue Material</h3>
                                <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mt-1">Direct Stock Release to Site</p>
                            </div>
                            <button onClick={() => setShowIssueForm(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white">
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

export default IntMaterials;
