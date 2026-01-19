import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../hooks/useAuth';
import { useSocket } from '../../../context/SocketContext';
import { FiBox, FiUser, FiActivity, FiAlertTriangle, FiPlus } from 'react-icons/fi';

const PPEManager = () => {
    const { theme } = useTheme();
    const { token } = useAuth();
    const { socket } = useSocket();

    const [inventory, setInventory] = useState([]);
    const [issuingItem, setIssuingItem] = useState(null); // Item ID being issued
    const [issueData, setIssueData] = useState({ quantity: 1, issuedTo: '' });
    const [alert, setAlert] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        fetchInventory();
    }, []);

    useEffect(() => {
        if (!socket) return;
        socket.on('PPE_LOW_STOCK', (data) => {
            setAlert(`⚠️ Low Stock Alert: ${data.item.name} is running low!`);
            fetchInventory(); // Refresh data
            setTimeout(() => setAlert(null), 5000);
        });
        return () => socket.off('PPE_LOW_STOCK');
    }, [socket]);

    const fetchInventory = async () => {
        try {
            const res = await fetch(`${API_URL}/safety/ppe`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) setInventory(await res.json());
        } catch (err) { console.error(err); }
    };

    const handleIssue = async () => {
        try {
            const res = await fetch(`${API_URL}/safety/ppe/issue`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    itemId: issuingItem._id,
                    quantity: issueData.quantity,
                    issuedTo: issueData.issuedTo
                })
            });

            if (res.ok) {
                alert("PPE Issued Successfully");
                setIssuingItem(null);
                setIssueData({ quantity: 1, issuedTo: '' });
                fetchInventory();
            } else {
                const err = await res.json();
                alert("Error: " + err.message);
            }
        } catch (err) { console.error(err); }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 relative">
            {alert && (
                <div className="fixed top-24 right-10 bg-amber-500 text-white px-6 py-4 rounded-xl shadow-2xl border border-white/20 z-50 animate-bounce">
                    <p className="font-bold text-sm">{alert}</p>
                </div>
            )}

            <div className="flex justify-between items-end">
                <h3 className="text-2xl font-black uppercase tracking-tight opacity-80" style={{ color: theme.textPrimary }}>PPE Inventory Management</h3>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                        <span className="text-[10px] uppercase font-bold opacity-60">In Stock</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        <span className="text-[10px] uppercase font-bold opacity-60">Low Stock</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inventory.map(item => (
                    <div key={item._id} className="card-premium p-6 flex flex-col justify-between group hover:-translate-y-1 transition-all" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xl">
                                    <FiBox />
                                </div>
                                {item.availableQuantity <= item.lowStockThreshold && (
                                    <FiAlertTriangle className="text-red-500 text-xl animate-pulse" />
                                )}
                            </div>
                            <h4 className="font-black text-xl mb-1" style={{ color: theme.textPrimary }}>{item.name}</h4>
                            <p className="text-xs font-bold opacity-40 uppercase tracking-wider mb-6">Master Stock: {item.totalQuantity}</p>

                            <div className="space-y-2 mb-6">
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                    <span>Availability</span>
                                    <span>{item.availableQuantity} left</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-1000 ${item.availableQuantity <= item.lowStockThreshold ? 'bg-red-500' : 'bg-emerald-500'}`}
                                        style={{ width: `${(item.availableQuantity / item.totalQuantity) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {issuingItem?._id === item._id ? (
                            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 space-y-3 border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95">
                                <input
                                    type="text"
                                    placeholder="Issue to (Name)"
                                    value={issueData.issuedTo}
                                    onChange={(e) => setIssueData({ ...issueData, issuedTo: e.target.value })}
                                    className="w-full p-2 text-xs rounded-lg border bg-white dark:bg-slate-800 focus:outline-none focus:ring-1 ring-brand-500"
                                />
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        min="1"
                                        max={item.availableQuantity}
                                        value={issueData.quantity}
                                        onChange={(e) => setIssueData({ ...issueData, quantity: Number(e.target.value) })}
                                        className="w-20 p-2 text-xs rounded-lg border bg-white dark:bg-slate-800 focus:outline-none"
                                    />
                                    <button
                                        onClick={handleIssue}
                                        className="flex-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg"
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        onClick={() => setIssuingItem(null)}
                                        className="px-3 bg-red-100 text-red-500 text-[10px] font-black uppercase rounded-lg"
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => { setIssuingItem(item); setIssueData({ quantity: 1, issuedTo: '' }); }}
                                disabled={item.availableQuantity === 0}
                                className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border border-dashed ${item.availableQuantity === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-300 dark:border-slate-600'}`}
                            >
                                {item.availableQuantity === 0 ? 'Out of Stock' : 'Issue Item'}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PPEManager;
