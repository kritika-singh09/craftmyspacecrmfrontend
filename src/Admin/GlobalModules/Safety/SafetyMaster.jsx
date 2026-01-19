import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { FiPlus, FiTrash2, FiSave, FiSettings, FiShield, FiBox } from 'react-icons/fi';
import { useAuth } from '../../../hooks/useAuth';

const SafetyMaster = () => {
    const { theme } = useTheme();
    const { token } = useAuth();
    const [activeSection, setActiveSection] = useState('policies');
    const [policies, setPolicies] = useState([]);
    const [ppeItems, setPpeItems] = useState([]);

    // Form States
    const [newPolicy, setNewPolicy] = useState({ title: '', category: 'General', mandatory: true });
    const [newPPE, setNewPPE] = useState({ name: '', totalQuantity: 0, lowStockThreshold: 5, unitPrice: 0 });

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        fetchPolicies();
        fetchPPE();
    }, []);

    const fetchPolicies = async () => {
        try {
            const res = await fetch(`${API_URL}/safety/policies`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) setPolicies(await res.json());
        } catch (err) { console.error(err); }
    };

    const fetchPPE = async () => {
        try {
            const res = await fetch(`${API_URL}/safety/ppe`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) setPpeItems(await res.json());
        } catch (err) { console.error(err); }
    };

    const handleAddPolicy = async () => {
        try {
            const res = await fetch(`${API_URL}/safety/policies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newPolicy)
            });
            if (res.ok) {
                fetchPolicies();
                setNewPolicy({ title: '', category: 'General', mandatory: true });
            }
        } catch (err) { console.error(err); }
    };

    const handleAddPPE = async () => {
        try {
            const res = await fetch(`${API_URL}/safety/ppe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newPPE)
            });
            if (res.ok) {
                fetchPPE();
                setNewPPE({ name: '', totalQuantity: 0, lowStockThreshold: 5, unitPrice: 0 });
            }
        } catch (err) { console.error(err); }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Sub-Header */}
            <div className="flex gap-4 border-b pb-4" style={{ borderColor: theme.cardBorder }}>
                <button
                    onClick={() => setActiveSection('policies')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${activeSection === 'policies' ? 'bg-slate-800 text-white' : 'hover:bg-slate-100'}`}
                    style={activeSection !== 'policies' ? { color: theme.textSecondary } : {}}
                >
                    <FiShield /> Safety Policies
                </button>
                <button
                    onClick={() => setActiveSection('ppe')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${activeSection === 'ppe' ? 'bg-slate-800 text-white' : 'hover:bg-slate-100'}`}
                    style={activeSection !== 'ppe' ? { color: theme.textSecondary } : {}}
                >
                    <FiBox /> PPE Master
                </button>
            </div>

            {activeSection === 'policies' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Add Policy Form */}
                    <div className="card-premium p-8 h-fit space-y-6" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                        <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-3" style={{ color: theme.textPrimary }}>
                            <span className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg"><FiPlus /></span>
                            Add New Policy
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest block mb-2 opacity-60">Policy Title</label>
                                <input
                                    type="text"
                                    value={newPolicy.title}
                                    onChange={(e) => setNewPolicy({ ...newPolicy, title: e.target.value })}
                                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 ring-brand-500 transition-all font-medium"
                                    placeholder="e.g. Mandatory Helmet Zone"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest block mb-2 opacity-60">Category</label>
                                <select
                                    value={newPolicy.category}
                                    onChange={(e) => setNewPolicy({ ...newPolicy, category: e.target.value })}
                                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 ring-brand-500 transition-all font-medium"
                                >
                                    {['General', 'Construction', 'Interior', 'Electrical', 'HeightWork', 'Fire'].map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={newPolicy.mandatory}
                                    onChange={(e) => setNewPolicy({ ...newPolicy, mandatory: e.target.checked })}
                                    className="w-5 h-5 rounded-md accent-brand-600"
                                />
                                <span className="text-xs font-bold uppercase tracking-wide">Mandatory Rule</span>
                            </div>
                            <button
                                onClick={handleAddPolicy}
                                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-all shadow-lg"
                            >
                                Save Policy
                            </button>
                        </div>
                    </div>

                    {/* Policies List */}
                    <div className="lg:col-span-2 space-y-4">
                        {policies.length === 0 && <div className="p-10 text-center opacity-40 font-bold uppercase">No policies defined yet.</div>}
                        {policies.map(policy => (
                            <div key={policy._id} className="flex items-center justify-between p-6 rounded-2xl border bg-white/5 hover:bg-white/10 transition-all" style={{ borderColor: policy.mandatory ? '#ef4444' : theme.cardBorder }}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-2 h-12 rounded-full ${policy.mandatory ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                                    <div>
                                        <h4 className="font-bold text-lg" style={{ color: theme.textPrimary }}>{policy.title}</h4>
                                        <span className="text-[10px] uppercase font-black tracking-wider opacity-60 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{policy.category}</span>
                                    </div>
                                </div>
                                <button className="p-3 hover:bg-red-50 text-red-500 rounded-xl transition-all"><FiTrash2 /></button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Add PPE Form */}
                    <div className="card-premium p-8 h-fit space-y-6" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                        <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-3" style={{ color: theme.textPrimary }}>
                            <span className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg"><FiPlus /></span>
                            Add PPE Item
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest block mb-2 opacity-60">Item Name</label>
                                <input
                                    type="text"
                                    value={newPPE.name}
                                    onChange={(e) => setNewPPE({ ...newPPE, name: e.target.value })}
                                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 ring-brand-500 transition-all font-medium"
                                    placeholder="e.g. Safety Helmet"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest block mb-2 opacity-60">Total Stock</label>
                                    <input
                                        type="number"
                                        value={newPPE.totalQuantity}
                                        onChange={(e) => setNewPPE({ ...newPPE, totalQuantity: Number(e.target.value) })}
                                        className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest block mb-2 opacity-60">Alert Level</label>
                                    <input
                                        type="number"
                                        value={newPPE.lowStockThreshold}
                                        onChange={(e) => setNewPPE({ ...newPPE, lowStockThreshold: Number(e.target.value) })}
                                        className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-medium"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleAddPPE}
                                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-all shadow-lg"
                            >
                                Save Inventory
                            </button>
                        </div>
                    </div>

                    {/* PPE List */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {ppeItems.map(item => (
                            <div key={item._id} className="card-premium p-6 flex flex-col justify-between" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="font-black text-xl" style={{ color: theme.textPrimary }}>{item.name}</h4>
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${item.availableQuantity <= item.lowStockThreshold ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                        {item.availableQuantity} Available
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="h-full bg-slate-800"
                                            style={{ width: `${(item.availableQuantity / item.totalQuantity) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between text-[10px] font-bold opacity-60">
                                        <span>Total: {item.totalQuantity}</span>
                                        <span>Issued: {item.issuedQuantity}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SafetyMaster;
