import { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useProcurement } from '../../../hooks/useProcurement.jsx';
import { useMaterials } from '../../../hooks/useMaterials.jsx';
import { useProjects } from '../../../hooks/useProjects.jsx';
import { useTenant } from '../../../hooks/useTenant.jsx';
import { FiPlus, FiTrash2, FiShoppingCart, FiX } from 'react-icons/fi';

const POMasterForm = ({ onClose, onSuccess }) => {
    const { theme } = useTheme();
    const { createPO } = useProcurement();
    const { getMaterialsMaster } = useMaterials();
    const { projects } = useProjects();
    const [vendors, setVendors] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        vendor: '',
        project: '',
        expectedDeliveryDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        items: [{ materialMaster: '', quantity: '', rate: '', total: 0 }],
        gst: { cgst: 0, sgst: 0, igst: 0 }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const materialsData = await getMaterialsMaster();
                setMaterials(materialsData);

                // Fetch Vendors - Filter by MATERIAL category
                const vendorRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/vendors?category=MATERIAL`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                const vendorData = await vendorRes.json();
                setVendors(vendorData);
            } catch (error) {
                console.error("Error fetching form data:", error);
            }
        };
        fetchData();
    }, []);

    const handleAddItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, { materialMaster: '', quantity: '', rate: '', total: 0 }]
        });
    };

    const handleRemoveItem = (index) => {
        const newItems = formData.items.filter((_, i) => i !== index);
        setFormData({ ...formData, items: newItems });
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...formData.items];
        newItems[index][field] = value;

        if (field === 'quantity' || field === 'rate') {
            newItems[index].total = (parseFloat(newItems[index].quantity) || 0) * (parseFloat(newItems[index].rate) || 0);
        }

        setFormData({ ...formData, items: newItems });
    };

    const calculateTotals = () => {
        const subtotal = formData.items.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0);
        const totalGst = (parseFloat(formData.gst.cgst) || 0) + (parseFloat(formData.gst.sgst) || 0) + (parseFloat(formData.gst.igst) || 0);
        return { subtotal, grandTotal: subtotal + totalGst };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.items.some(i => !i.materialMaster || !i.quantity || !i.rate)) {
            alert("Please fill all item details");
            return;
        }

        setSubmitting(true);
        try {
            await createPO(formData);
            onSuccess();
        } catch (error) {
            alert(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const { subtotal, grandTotal } = calculateTotals();

    return (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-[100] p-4 bg-slate-900/40">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]" style={{ backgroundColor: theme.cardBg }}>
                <div className="p-6 text-white flex justify-between items-center" style={{ background: theme.gradients.primary }}>
                    <div>
                        <h2 className="text-xl font-black uppercase tracking-tight">Generate Purchase Order</h2>
                        <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest opacity-80">Procurement Workflow</p>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-all text-white">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest ml-1 block mb-1.5 opacity-60" style={{ color: theme.textSecondary }}>Vendor *</label>
                            <select
                                value={formData.vendor}
                                onChange={e => setFormData({ ...formData, vendor: e.target.value })}
                                required
                                className="w-full px-4 py-3 rounded-xl border font-bold text-xs outline-none"
                                style={{ backgroundColor: `${theme.iconBg}10`, borderColor: theme.cardBorder, color: theme.textPrimary }}
                            >
                                <option value="">Select Vendor</option>
                                {vendors.map(v => <option key={v._id} value={v._id}>{v.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest ml-1 block mb-1.5 opacity-60" style={{ color: theme.textSecondary }}>Project *</label>
                            <select
                                value={formData.project}
                                onChange={e => setFormData({ ...formData, project: e.target.value })}
                                required
                                className="w-full px-4 py-3 rounded-xl border font-bold text-xs outline-none"
                                style={{ backgroundColor: `${theme.iconBg}10`, borderColor: theme.cardBorder, color: theme.textPrimary }}
                            >
                                <option value="">Select Project</option>
                                {projects.map(p => <option key={p._id || p.id} value={p._id || p.id}>{p.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest ml-1 block mb-1.5 opacity-60" style={{ color: theme.textSecondary }}>Expected Delivery *</label>
                            <input
                                type="date"
                                value={formData.expectedDeliveryDate}
                                onChange={e => setFormData({ ...formData, expectedDeliveryDate: e.target.value })}
                                required
                                className="w-full px-4 py-3 rounded-xl border font-bold text-xs outline-none"
                                style={{ backgroundColor: `${theme.iconBg}10`, borderColor: theme.cardBorder, color: theme.textPrimary }}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h4 className="text-xs font-black uppercase tracking-widest" style={{ color: theme.textSecondary }}>Order Items</h4>
                            <button type="button" onClick={handleAddItem} className="text-blue-500 text-[10px] font-black uppercase flex items-center gap-1 hover:underline">
                                <FiPlus /> Add Material
                            </button>
                        </div>

                        <div className="space-y-3">
                            {formData.items.map((item, index) => (
                                <div key={index} className="grid grid-cols-12 gap-3 items-end p-4 rounded-xl border border-dashed" style={{ borderColor: theme.cardBorder }}>
                                    <div className="col-span-4">
                                        <label className="text-[9px] font-black uppercase opacity-40 mb-1 block">Material</label>
                                        <select
                                            value={item.materialMaster}
                                            onChange={e => handleItemChange(index, 'materialMaster', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border font-bold text-[11px] outline-none"
                                            style={{ backgroundColor: `${theme.iconBg}05`, borderColor: theme.cardBorder }}
                                        >
                                            <option value="">Select Material</option>
                                            {materials.map(m => <option key={m._id} value={m._id}>{m.name} ({m.itemCode})</option>)}
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-[9px] font-black uppercase opacity-40 mb-1 block">Quantity</label>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={e => handleItemChange(index, 'quantity', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border font-bold text-[11px]"
                                            style={{ backgroundColor: `${theme.iconBg}05`, borderColor: theme.cardBorder }}
                                            placeholder="0"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-[9px] font-black uppercase opacity-40 mb-1 block">Rate (₹)</label>
                                        <input
                                            type="number"
                                            value={item.rate}
                                            onChange={e => handleItemChange(index, 'rate', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border font-bold text-[11px]"
                                            style={{ backgroundColor: `${theme.iconBg}05`, borderColor: theme.cardBorder }}
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div className="col-span-3">
                                        <label className="text-[9px] font-black uppercase opacity-40 mb-1 block">Total (₹)</label>
                                        <div className="px-3 py-2 rounded-lg border bg-slate-50 font-black text-[11px]">
                                            {item.total.toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <button type="button" onClick={() => handleRemoveItem(index)} className="w-full h-[34px] flex items-center justify-center text-red-400 hover:text-red-600 transition-colors">
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t" style={{ borderColor: theme.cardBorder }}>
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-widest opacity-60">Taxes (GST)</h4>
                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="text-[9px] font-bold opacity-40 block mb-1">CGST (₹)</label>
                                    <input type="number" value={formData.gst.cgst} onChange={e => setFormData({ ...formData, gst: { ...formData.gst, cgst: e.target.value } })} className="w-full p-2 border rounded-lg text-xs" />
                                </div>
                                <div>
                                    <label className="text-[9px] font-bold opacity-40 block mb-1">SGST (₹)</label>
                                    <input type="number" value={formData.gst.sgst} onChange={e => setFormData({ ...formData, gst: { ...formData.gst, sgst: e.target.value } })} className="w-full p-2 border rounded-lg text-xs" />
                                </div>
                                <div>
                                    <label className="text-[9px] font-bold opacity-40 block mb-1">IGST (₹)</label>
                                    <input type="number" value={formData.gst.igst} onChange={e => setFormData({ ...formData, gst: { ...formData.gst, igst: e.target.value } })} className="w-full p-2 border rounded-lg text-xs" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl space-y-3">
                            <div className="flex justify-between text-xs font-bold opacity-60">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-xs font-bold text-blue-500">
                                <span>Total Tax</span>
                                <span>₹{(grandTotal - subtotal).toLocaleString()}</span>
                            </div>
                            <div className="h-px bg-slate-200 dark:bg-slate-700 my-2"></div>
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Grand Total</span>
                                <span className="text-2xl font-black" style={{ color: theme.textPrimary }}>₹{grandTotal.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all hover:bg-slate-100" style={{ color: theme.textSecondary }}>Cancel</button>
                        <button type="submit" disabled={submitting} className="px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl disabled:opacity-50" style={{ background: theme.gradients.button }}>
                            {submitting ? 'Creating PO...' : 'Confirm & Generate'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default POMasterForm;
