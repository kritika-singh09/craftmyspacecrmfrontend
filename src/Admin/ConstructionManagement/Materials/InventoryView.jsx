import { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useMaterials } from '../../../hooks/useMaterials.jsx';
import { FiBox, FiAlertCircle, FiActivity } from 'react-icons/fi';

const InventoryView = () => {
    const { theme } = useTheme();
    const { getInventory } = useMaterials();
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const data = await getInventory();
            setInventory(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getProgressColor = (current, min) => {
        if (current <= min) return 'bg-red-500';
        if (current <= min * 1.5) return 'bg-amber-500';
        return 'bg-green-500';
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black" style={{ color: theme.textPrimary }}>Live Inventory</h3>
                <div className="flex gap-2 text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Healthy</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Low</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Critical</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inventory.map(item => (
                    <div key={item._id} className="p-6 rounded-2xl border transition-all hover:shadow-md" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h4 className="font-bold text-sm mb-1" style={{ color: theme.textPrimary }}>{item.materialMaster?.name}</h4>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-50" style={{ color: theme.textSecondary }}>{item.materialMaster?.category}</p>
                            </div>
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.availableStock <= item.reorderLevel ? 'bg-red-100 text-red-500 animate-pulse' : 'bg-slate-50 text-slate-400'}`}>
                                <FiBox />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textSecondary }}>Available Stock</span>
                                    <span className="text-xl font-black" style={{ color: theme.textPrimary }}>{item.availableStock} <span className="text-xs opacity-50 font-bold">{item.materialMaster?.unit}</span></span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${getProgressColor(item.availableStock, item.reorderLevel)}`}
                                        style={{ width: `${Math.min((item.availableStock / (item.reorderLevel * 3)) * 100, 100)}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between mt-1 text-[10px] font-bold opacity-40">
                                    <span>0</span>
                                    <span>Reorder: {item.reorderLevel}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: theme.cardBorder }}>
                                <div>
                                    <p className="text-[10px] font-bold uppercase opacity-50 mb-1">Reserved</p>
                                    <p className="text-sm font-black text-amber-500">{item.reservedStock}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase opacity-50 mb-1">Total Value</p>
                                    <p className="text-sm font-black" style={{ color: theme.textPrimary }}>₹{(item.totalStock * 100).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {inventory.length === 0 && !loading && (
                    <div className="col-span-full py-12 text-center opacity-50 text-sm">No inventory records found. Add materials to master registry first.</div>
                )}
            </div>
        </div>
    );
};

export default InventoryView;
