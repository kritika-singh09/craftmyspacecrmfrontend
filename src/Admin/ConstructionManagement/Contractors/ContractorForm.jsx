import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';

const ContractorForm = ({ onSubmit, initialData = null, projects = [] }) => {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        type: initialData?.type || '',
        projects: initialData?.projects || []
    });

    const { theme } = useTheme();

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleProject = (projectName) => {
        const updatedProjects = formData.projects.includes(projectName)
            ? formData.projects.filter(p => p !== projectName)
            : [...formData.projects, projectName];
        setFormData({ ...formData, projects: updatedProjects });
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
                <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Contractor Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses}
                    style={inputStyle}
                    placeholder="e.g. Foundation Specialist"
                    required
                />
            </div>

            <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Specialization Type</label>
                <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={inputClasses}
                    style={inputStyle}
                    placeholder="e.g. Foundation, Electrical, etc."
                    required
                />
            </div>

            <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Assigned Projects</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                    {projects.map((project) => (
                        <div
                            key={project.id || project.name}
                            onClick={() => toggleProject(project.name)}
                            className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all"
                            style={{
                                borderColor: formData.projects.includes(project.name) ? theme.primary : theme.cardBorder,
                                backgroundColor: formData.projects.includes(project.name) ? `${theme.primary}10` : theme.background
                            }}
                        >
                            <div
                                className={`w-4 h-4 rounded-md border transition-all flex items-center justify-center`}
                                style={{
                                    borderColor: formData.projects.includes(project.name) ? theme.primary : theme.cardBorder,
                                    backgroundColor: formData.projects.includes(project.name) ? theme.primary : 'transparent'
                                }}
                            >
                                {formData.projects.includes(project.name) && <span className="text-[10px] text-white">✓</span>}
                            </div>
                            <span className="text-xs font-bold" style={{ color: theme.textPrimary }}>{project.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                className="w-full text-white py-3.5 px-6 rounded-2xl font-black uppercase tracking-widest shadow-premium hover:-translate-y-0.5 active:translate-y-0 transition-all mt-6"
                style={{ background: theme.gradients.button }}
            >
                {initialData ? 'Update Contractor' : 'Register Contractor'}
            </button>

        </form>
    );
};

export default ContractorForm;
