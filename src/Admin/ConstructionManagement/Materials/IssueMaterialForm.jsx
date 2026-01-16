import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { FiArrowUpRight, FiPackage, FiInfo } from 'react-icons/fi';

const IssueMaterialForm = ({ material, projects = [], onSubmit }) => {
    const [formData, setFormData] = useState({
        projectId: projects[0]?.project_id || '',
        quantity: '',
        notes: ''
    });

    const { theme } = useTheme();

    const handleSubmit = (e) => {
        e.preventDefault();
        const qty = parseFloat(formData.quantity);
        if (qty > material.stock) {
            alert(`Cannot issue more than available stock (${material.stock} ${material.unit})`);
            return;
        }
        onSubmit({
            ...formData,
            materialId: material.id,
            quantity: qty,
            issuedAt: new Date().toISOString()
        });
    };

    const inputClasses = "w-full px-5 py-3 border rounded-2xl focus:ring-4 outline-none transition-all font-semibold text-sm";
    const inputStyle = {
        backgroundColor: `${theme.iconBg}10`,
        borderColor: theme.cardBorder,
        color: theme.textPrimary
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 rounded-2xl border mb-2" style={{ borderColor: theme.cardBorder, backgroundColor: `${theme.iconBg}05` }}>
                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: theme.textMuted }}>Material To Issue</p>
                <p className="text-sm font-black" style={{ color: theme.textPrimary }}>{material.name}</p>
                <div className="flex items-center gap-2 mt-1">
                    <FiPackage className="text-xs" style={{ color: theme.primary }} />
                    <p className="text-[11px] font-bold" style={{ color: theme.textSecondary }}>Available: {material.stock} {material.unit}</p>
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Assigned Project</label>
                <select
                    name="projectId"
                    value={formData.projectId}
                    onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                    className={inputClasses}
                    style={inputStyle}
                    required
                >
                    {projects.map(p => (
                        <option key={p.project_id} value={p.project_id}>{p.name}</option>
                    ))}
                </select>
            </div>

            <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Quantity To Issue</label>
                <div className="relative">
                    <input
                        type="number"
                        step="0.01"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className={inputClasses}
                        style={inputStyle}
                        placeholder={`e.g. 5.0`}
                        max={material.stock}
                        required
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase tracking-widest opacity-40">{material.unit}</span>
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Notes / Purpose</label>
                <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className={`${inputClasses} min-h-[100px] resize-none`}
                    style={inputStyle}
                    placeholder="e.g. For foundation work at Mall site..."
                />
            </div>

            <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex items-start gap-4">
                <FiInfo className="text-blue-500 mt-0.5" />
                <p className="text-[11px] font-bold leading-relaxed text-blue-700">
                    Issuing this material will automatically decrement the warehouse stock and log an entry in the site material register.
                </p>
            </div>

            <button
                type="submit"
                className="w-full text-white py-3.5 px-6 rounded-2xl font-black uppercase tracking-widest shadow-premium hover:-translate-y-0.5 active:translate-y-0 transition-all"
                style={{ background: theme.gradients.button }}
            >
                Complete Issuance
                <FiArrowUpRight className="inline ml-2 border-l pl-2 border-white/20" />
            </button>
        </form>
    );
};

export default IssueMaterialForm;
