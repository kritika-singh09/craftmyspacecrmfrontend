import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useMaterials } from '../../../hooks/useMaterials.jsx';
import { FiBox, FiCheck } from 'react-icons/fi';

const MaterialMasterForm = ({ onClose, onSuccess }) => {
    const { theme } = useTheme();
    const { createMaterialMaster } = useMaterials();
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        itemCode: '',
        name: '',
        category: 'Cement',
        unit: 'Bags',
        brand: '',
        grade: '',
        specifications: ''
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await createMaterialMaster(formData);
            onSuccess();
        } catch (error) {
            alert("Failed to create material: " + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const renderInput = (label, field, placeholder, required = false) => (
        <div>
            <label className="text-[10px] font-black uppercase tracking-widest ml-1 block mb-1.5 opacity-60" style={{ color: theme.textSecondary }}>{label} {required && '*'}</label>
            <input
                type="text"
                value={formData[field]}
                onChange={e => handleChange(field, e.target.value)}
                placeholder={placeholder}
                required={required}
                className="w-full px-4 py-3 rounded-xl border font-bold text-xs outline-none transition-all focus:ring-2 focus:ring-blue-500/20"
                style={{ backgroundColor: `${theme.iconBg}10`, borderColor: theme.cardBorder, color: theme.textPrimary }}
            />
        </div>
    );

    return (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-[100] p-4 bg-slate-900/40">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]" style={{ backgroundColor: theme.cardBg }}>
                <div className="p-6 text-white flex justify-between items-center" style={{ background: theme.gradients.primary }}>
                    <div>
                        <h2 className="text-xl font-black uppercase tracking-tight">New Material Definition</h2>
                        <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest opacity-80">Master Registry</p>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-all text-white">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-6">
                        {renderInput("Item Code", "itemCode", "e.g., CEM-001", true)}
                        {renderInput("Material Name", "name", "e.g., PPC Cement", true)}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest ml-1 block mb-1.5 opacity-60" style={{ color: theme.textSecondary }}>Category *</label>
                            <select
                                value={formData.category}
                                onChange={e => handleChange('category', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border font-bold text-xs outline-none"
                                style={{ backgroundColor: `${theme.iconBg}10`, borderColor: theme.cardBorder, color: theme.textPrimary }}
                            >
                                {['Cement', 'Steel', 'Electrical', 'Plumbing', 'Aggregates', 'Finishing', 'Other'].map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest ml-1 block mb-1.5 opacity-60" style={{ color: theme.textSecondary }}>Unit *</label>
                            <select
                                value={formData.unit}
                                onChange={e => handleChange('unit', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border font-bold text-xs outline-none"
                                style={{ backgroundColor: `${theme.iconBg}10`, borderColor: theme.cardBorder, color: theme.textPrimary }}
                            >
                                {['Bags', 'Tons', 'Kgs', 'Meters', 'Trucks', 'Pieces', 'Nos'].map(u => (
                                    <option key={u} value={u}>{u}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {renderInput("Brand (Optional)", "brand", "e.g., UltraTech")}
                        {renderInput("Grade (Optional)", "grade", "e.g., 53 Grade")}
                    </div>

                    {renderInput("Specifications", "specifications", "Additional technical details...")}

                    <div className="pt-6 border-t flex justify-end gap-4" style={{ borderColor: theme.cardBorder }}>
                        <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all hover:bg-slate-100" style={{ color: theme.textSecondary }}>Cancel</button>
                        <button type="submit" disabled={submitting} className="px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl disabled:opacity-50" style={{ background: theme.gradients.button }}>
                            {submitting ? 'Saving...' : 'Create Definition'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MaterialMasterForm;
