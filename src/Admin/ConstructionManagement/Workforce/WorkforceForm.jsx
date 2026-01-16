import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';

const WorkforceForm = ({ onSubmit, initialData = null, projects = [] }) => {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        role: initialData?.role || '',
        wage: initialData?.wage || '',
        project: initialData?.project || (projects[0]?.name || '')
    });

    const { theme } = useTheme();

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const inputClasses = "w-full px-5 py-3 border rounded-2xl focus:ring-4 outline-none transition-all font-semibold text-sm";
    const inputStyle = {
        backgroundColor: `${theme.iconBg}10`,
        borderColor: theme.cardBorder,
        color: theme.textPrimary
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Worker Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses}
                    style={inputStyle}
                    placeholder="e.g. Rajesh Kumar"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Role</label>
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className={inputClasses}
                        style={inputStyle}
                        placeholder="e.g. Mason, Electrician"
                        required
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Daily Wage (₹)</label>
                    <input
                        type="number"
                        name="wage"
                        value={formData.wage}
                        onChange={handleChange}
                        className={inputClasses}
                        style={inputStyle}
                        placeholder="e.g. 800"
                        required
                    />
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Assigned Project</label>
                <select
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    className={inputClasses}
                    style={inputStyle}
                    required
                >
                    {projects.map(p => (
                        <option key={p.id || p.name} value={p.name}>{p.name}</option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                className="w-full text-white py-3.5 px-6 rounded-2xl font-black uppercase tracking-widest shadow-premium hover:-translate-y-0.5 active:translate-y-0 transition-all mt-6"
                style={{ background: theme.gradients.button }}
            >
                {initialData ? 'Update Worker' : 'Register Worker'}
            </button>

        </form>
    );
};

export default WorkforceForm;
