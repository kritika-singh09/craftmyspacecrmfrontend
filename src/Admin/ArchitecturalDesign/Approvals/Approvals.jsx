import React, { useState } from 'react';
import { FiCheck, FiX, FiFileText, FiClock, FiPlus } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

const ArchApprovals = () => {
    const { theme } = useTheme();
    const [approvals, setApprovals] = useState([
        { id: 1, name: 'Floor Plan R3', date: '2024-01-12', status: 'Pending', client: 'Skyline Corp', type: 'Design Upload' },
        { id: 2, name: 'Schematic Phase', date: '2024-01-10', status: 'Approved', client: 'Coastal Dreams', type: 'Phase Completion' },
        { id: 3, name: 'Elevation 3D View', date: '2024-01-08', status: 'Revision Requested', client: 'Royal Estates', type: 'Visual Content' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newApproval, setNewApproval] = useState({ name: '', client: '', type: 'Design Upload' });

    const handleRequestApproval = (e) => {
        e.preventDefault();
        const approval = {
            id: approvals.length + 1,
            ...newApproval,
            date: new Date().toISOString().split('T')[0],
            status: 'Pending'
        };
        setApprovals([approval, ...approvals]);
        setShowModal(false);
        setNewApproval({ name: '', client: '', type: 'Design Upload' });
    };

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tight" style={{ color: theme.textPrimary }}>
                        Client <span style={{ color: theme.secondary }}>Approvals</span>
                    </h1>
                    <p className="mt-2 font-medium tracking-wide" style={{ color: theme.textSecondary }}>
                        Manage the formal approval cycle for drawings, designs, and project phases.
                    </p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-3 px-8 py-4 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-all"
                    style={{ background: theme.gradients.button }}
                >
                    <FiPlus className="text-lg" /> Request Approval
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {approvals.map((app) => (
                    <div key={app.id} className="p-8 rounded-[2.5rem] shadow-premium border transition-all hover:scale-105 active:scale-95 duration-300"
                        style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${app.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' :
                                app.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                                }`}>
                                <FiFileText />
                            </div>
                            <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${app.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                app.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-rose-50 text-rose-700 border-rose-100'
                                }`}>
                                {app.status}
                            </span>
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tight mb-1" style={{ color: theme.textPrimary }}>{app.name}</h3>
                        <p className="text-[10px] font-black tracking-[0.1em] uppercase" style={{ color: theme.primary }}>{app.client}</p>

                        <div className="mt-8 pt-6 border-t space-y-4" style={{ borderColor: theme.cardBorder }}>
                            <div className="flex justify-between items-center text-[10px] font-bold opacity-60" style={{ color: theme.textSecondary }}>
                                <span>TYPE: {app.type}</span>
                                <span className="flex items-center gap-1"><FiClock /> {app.date}</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex-1 py-3 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all"
                                    style={{ background: theme.gradients.button }}
                                >
                                    Review
                                </button>
                                <button className="w-12 h-12 border rounded-xl flex items-center justify-center text-xs"
                                    style={{
                                        backgroundColor: theme.background,
                                        borderColor: theme.cardBorder,
                                        color: theme.textSecondary
                                    }}
                                >
                                    ...
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Request Approval Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-lg rounded-[2rem] shadow-2xl animate-in slide-in-from-bottom-8 overflow-hidden"
                        style={{ backgroundColor: theme.cardBg }}
                    >
                        <div className="p-6 text-white relative flex justify-between items-center" style={{ background: theme.gradients.primary }}>
                            <div>
                                <h3 className="text-xl font-black">Request Approval</h3>
                                <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mt-1">Initiate Review Cycle</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white">
                                <FiX />
                            </button>
                        </div>

                        <form onSubmit={handleRequestApproval} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Item Name</label>
                                <input type="text" required value={newApproval.name} onChange={e => setNewApproval({ ...newApproval, name: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Client Account</label>
                                <input type="text" required value={newApproval.client} onChange={e => setNewApproval({ ...newApproval, client: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Approval Type</label>
                                <select value={newApproval.type} onChange={e => setNewApproval({ ...newApproval, type: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                >
                                    <option>Design Upload</option><option>Phase Completion</option><option>Visual Content</option><option>Budget Approval</option>
                                </select>
                            </div>

                            <button type="submit" className="w-full py-4 rounded-xl text-white font-black uppercase tracking-widest shadow-lg hover:shadow-xl transition-all"
                                style={{ background: theme.gradients.button }}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <FiCheck /> Send Request
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArchApprovals;
