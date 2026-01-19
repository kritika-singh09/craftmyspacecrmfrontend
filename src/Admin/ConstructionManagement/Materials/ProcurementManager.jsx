import { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useProcurement } from '../../../hooks/useProcurement.jsx';
import POMasterForm from './POMasterForm';
import { FiShoppingCart, FiTruck, FiCheckSquare, FiPlus } from 'react-icons/fi';

const ProcurementManager = () => {
    const { theme } = useTheme();
    const { getPurchaseOrders, recordDelivery } = useProcurement();
    const [orders, setOrders] = useState([]);
    const [showPOForm, setShowPOForm] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPOs();
    }, []);

    const fetchPOs = async () => {
        setLoading(true);
        try {
            const data = await getPurchaseOrders();
            setOrders(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handlePOSuccess = () => {
        setShowPOForm(false);
        fetchPOs();
    };

    const handleDelivery = async (id) => {
        const note = prompt("Enter delivery note details (Challan No):");
        if (!note) return;

        const po = orders.find(o => o._id === id);
        const items = po.items.map(i => ({
            materialMaster: i.materialMaster._id,
            quantityDelivered: i.quantity
        }));

        try {
            await recordDelivery(id, { items, note });
            fetchPOs();
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-black" style={{ color: theme.textPrimary }}>Procurement (POs)</h3>
                <button
                    onClick={() => setShowPOForm(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all hover:-translate-y-1"
                    style={{ background: theme.gradients.button }}
                >
                    <FiPlus /> New PO
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {orders.map(po => (
                    <div key={po._id} className="p-6 rounded-2xl border flex flex-col md:flex-row justify-between items-center gap-6 group hover:shadow-md transition-all" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-purple-50 text-purple-600">
                                <FiShoppingCart />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm" style={{ color: theme.textPrimary }}>{po.poNumber}</h4>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textSecondary }}>{po.vendor?.name}</p>
                            </div>
                        </div>

                        <div className="flex gap-8 text-center md:text-left">
                            <div>
                                <p className="text-[10px] font-bold uppercase opacity-50 mb-1">Amount</p>
                                <p className="text-sm font-black" style={{ color: theme.textPrimary }}>₹{po.grandTotal.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase opacity-50 mb-1">Items</p>
                                <p className="text-sm font-black" style={{ color: theme.textPrimary }}>{po.items.length}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase opacity-50 mb-1">Status</p>
                                <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${po.status === 'DELIVERED' ? 'bg-green-50 text-green-600' :
                                    po.status === 'APPROVED' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                                    }`}>{po.status}</span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            {po.status === 'APPROVED' && (
                                <button onClick={() => handleDelivery(po._id)} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold hover:bg-green-100 hover:text-green-600 transition-colors flex items-center gap-2">
                                    <FiTruck /> Record Delivery (GRN)
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                {orders.length === 0 && !loading && (
                    <div className="py-12 text-center opacity-50 text-sm">No Purchase Orders found.</div>
                )}
            </div>

            {showPOForm && (
                <POMasterForm
                    onClose={() => setShowPOForm(false)}
                    onSuccess={handlePOSuccess}
                />
            )}
        </div>
    );
};

export default ProcurementManager;
