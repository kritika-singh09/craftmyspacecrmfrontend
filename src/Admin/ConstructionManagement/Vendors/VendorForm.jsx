import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';

const VendorForm = ({ onSubmit, initialData = null }) => {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        material: initialData?.material || '',
        rate: initialData?.rate || ''
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
                <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Vendor Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses}
                    style={inputStyle}
                    placeholder="e.g. Shree Cement Ltd"
                    required
                />
            </div>

            <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Primary Material</label>
                <input
                    type="text"
                    name="material"
                    value={formData.material}
                    onChange={handleChange}
                    className={inputClasses}
                    style={inputStyle}
                    placeholder="e.g. Cement, Steel, Sand"
                    required
                />
            </div>

            <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Current Rate (₹)</label>
                <input
                    type="number"
                    name="rate"
                    value={formData.rate}
                    onChange={handleChange}
                    className={inputClasses}
                    style={inputStyle}
                    placeholder="e.g. 380"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full text-white py-3.5 px-6 rounded-2xl font-black uppercase tracking-widest shadow-premium hover:-translate-y-0.5 active:translate-y-0 transition-all mt-6"
                style={{ background: theme.gradients.button }}
            >
                {initialData ? 'Update Vendor' : 'Register Vendor'}
            </button>

        </form>
    );
};

export default VendorForm;
