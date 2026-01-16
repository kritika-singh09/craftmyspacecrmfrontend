import { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';

const POForm = ({ vendor, onSubmit }) => {
    const [formData, setFormData] = useState({
        quantity: '',
        deliveryDate: new Date().toISOString().split('T')[0],
        totalAmount: 0
    });

    const { theme } = useTheme();

    useEffect(() => {
        const amount = (parseFloat(formData.quantity) || 0) * (vendor.rate || 0);
        setFormData(prev => ({ ...prev, totalAmount: amount }));
    }, [formData.quantity, vendor.rate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            vendorName: vendor.name,
            material: vendor.material,
            poNumber: `PO-${Math.floor(1000 + Math.random() * 9000)}`
        });
    };

    const inputClasses = "w-full px-5 py-3 border rounded-2xl focus:ring-4 outline-none transition-all font-semibold text-sm";
    const inputStyle = {
        backgroundColor: `${theme.iconBg}10`,
        borderColor: theme.cardBorder,
        color: theme.textPrimary
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-4 rounded-2xl border mb-2" style={{ borderColor: theme.cardBorder, backgroundColor: `${theme.iconBg}05` }}>
                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: theme.textMuted }}>Vendor</p>
                <p className="text-sm font-black" style={{ color: theme.textPrimary }}>{vendor.name}</p>
                <p className="text-[11px] font-bold" style={{ color: theme.textSecondary }}>{vendor.material} @ ₹{vendor.rate} per unit</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Quantity</label>
                    <input
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className={inputClasses}
                        style={inputStyle}
                        placeholder="e.g. 100"
                        required
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Delivery Date</label>
                    <input
                        type="date"
                        value={formData.deliveryDate}
                        onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                        className={inputClasses}
                        style={inputStyle}
                        required
                    />
                </div>
            </div>

            <div className="p-5 rounded-2xl flex justify-between items-center" style={{ background: theme.gradients.primary }}>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-blue-100">Estimated Total</p>
                    <p className="text-2xl font-black text-white">₹{formData.totalAmount.toLocaleString()}</p>
                </div>
                <button
                    type="submit"
                    className="bg-white text-primary px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs shadow-lg hover:scale-105 transition-all"
                    style={{ color: theme.primary }}
                >
                    Confirm Order
                </button>
            </div>
        </form>
    );
};

export default POForm;
