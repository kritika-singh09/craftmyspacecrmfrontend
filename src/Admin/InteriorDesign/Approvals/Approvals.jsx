import React, { useState } from 'react';
import { FiCheckCircle, FiXCircle, FiClock, FiFileText, FiMessageSquare, FiExternalLink, FiPlus, FiThumbsUp, FiThumbsDown, FiX, FiCheck } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

const IntApprovals = () => {
    const { theme } = useTheme();
    const [approvalItems, setApprovalItems] = useState([
        { id: 1, name: 'Master Bedroom Mood Board', client: 'Khanna Residences', type: 'Design', date: 'Jan 14', status: 'Pending Approval', description: 'Initial material palette and furniture selection for the Master Suite.' },
        { id: 2, name: 'Living Room 3D Render (V2)', client: 'Khanna Residences', type: 'Visualization', date: 'Jan 12', status: 'Approved', description: 'Updated lighting plan and rug texture as requested.' },
        { id: 3, name: 'Kitchen Material BOQ', client: 'Khanna Residences', type: 'Financial', date: 'Jan 10', status: 'Revision Requested', description: 'Client requested alternative costing for Quartz countertops.' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newItem, setNewItem] = useState({ name: '', client: '', type: 'Design', description: '' });

    const handleInitiate = (e) => {
        e.preventDefault();
        const item = {
            id: approvalItems.length + 1,
            ...newItem,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
            status: 'Pending Approval'
        };
        setApprovalItems([item, ...approvalItems]);
        setShowModal(false);
        setNewItem({ name: '', client: '', type: 'Design', description: '' });
    };

    const handleAction = (id, action) => {
        setApprovalItems(approvalItems.map(item =>
            item.id === id ? { ...item, status: action === 'approve' ? 'Approved' : 'Revision Requested' } : item
        ));
    };

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight uppercase" style={{ color: theme.textPrimary }}>
                        Client <span style={{ color: theme.secondary }}>Approvals</span>
                    </h1>
                    <p className="mt-2 font-bold tracking-wide" style={{ color: theme.textSecondary }}>
                        Track design sign-offs, material choices, and variation orders.
                    </p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-3 px-8 py-4 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all"
                    style={{ background: theme.gradients.button }}
                >
                    <FiPlus className="text-lg" /> Initiate Approval
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {approvalItems.map((item, i) => (
                    <div key={i} className="group flex flex-col justify-between p-10 rounded-[4rem] shadow-premium border transition-all duration-500 relative overflow-hidden hover:shadow-2xl"
                        style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
                    >
                        <div className="absolute -right-4 -top-4 w-32 h-32 rounded-full blur-2xl group-hover:scale-150 transition-transform"
                            style={{ backgroundColor: `${theme.primary}05` }}
                        ></div>

                        <div className="relative z-10 flex-1">
                            <div className="flex justify-between items-start mb-10">
                                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-3xl shadow-inner transition-colors ${item.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' :
                                    item.status === 'Revision Requested' ? 'bg-rose-50 text-rose-600' :
                                        'bg-orange-50 text-orange-600'
                                    }`}>
                                    <FiFileText />
                                </div>
                                <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${item.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                    item.status === 'Revision Requested' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                                        'bg-amber-50 text-amber-700 border-amber-100'
                                    }`}>{item.status}</span>
                            </div>

                            <h3 className="text-2xl font-black uppercase tracking-tight mb-2 leading-tight transition-colors" style={{ color: theme.textPrimary }}>{item.name}</h3>
                            <p className="text-[10px] font-bold mt-1" style={{ color: theme.secondary }}>Project: {item.client}</p>
                            <p className="text-xs mt-4 opacity-70 line-clamp-2" style={{ color: theme.textSecondary }}>{item.description}</p>

                            <div className="mt-10 pt-8 border-t flex justify-between items-center text-[10px] font-black uppercase tracking-widest"
                                style={{ borderColor: theme.cardBorder, color: theme.textMuted }}
                            >
                                <span className="flex items-center gap-2"><FiClock style={{ color: theme.secondary }} /> {item.date}</span>
                                <span>TYPE: {item.type}</span>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-3 relative z-10">
                            {item.status === 'Pending Approval' ? (
                                <>
                                    <button onClick={() => handleAction(item.id, 'approve')} className="flex-1 py-4 bg-emerald-500 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-brand flex items-center justify-center gap-2">
                                        <FiThumbsUp /> Approve
                                    </button>
                                    <button onClick={() => handleAction(item.id, 'reject')} className="flex-1 py-4 bg-rose-500 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-brand flex items-center justify-center gap-2">
                                        <FiThumbsDown /> Revise
                                    </button>
                                </>
                            ) : (
                                <button className="flex-1 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest opacity-50 cursor-not-allowed bg-gray-100 text-gray-400">
                                    Decision Recorded
                                </button>
                            )}
                            <button className="w-14 h-14 border rounded-[1.5rem] flex items-center justify-center text-xl shadow-premium transition-colors hover:text-white hover:bg-orange-600"
                                style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder, color: theme.textSecondary }}
                            >
                                <FiMessageSquare />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl animate-in slide-in-from-bottom-8 overflow-hidden"
                        style={{ backgroundColor: theme.cardBg }}
                    >
                        <div className="p-6 text-white relative flex justify-between items-center" style={{ background: theme.gradients.primary }}>
                            <div>
                                <h3 className="text-xl font-black">Initiate Approval</h3>
                                <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mt-1">Request Client Sign-off</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white">
                                <FiX />
                            </button>
                        </div>

                        <form onSubmit={handleInitiate} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Title</label>
                                <input type="text" required value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                    placeholder="e.g. Master Closet Design"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Client / Project</label>
                                <input type="text" required value={newItem.client} onChange={e => setNewItem({ ...newItem, client: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                    placeholder="e.g. Khanna Residences"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Approval Type</label>
                                <select value={newItem.type} onChange={e => setNewItem({ ...newItem, type: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                >
                                    <option>Design</option>
                                    <option>Financial</option>
                                    <option>Visualization</option>
                                    <option>Material Selection</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Description</label>
                                <textarea value={newItem.description} onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2 h-24"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                    placeholder="Brief details about what needs approval..."
                                />
                            </div>

                            <button type="submit" className="w-full py-4 rounded-xl text-white font-black uppercase tracking-widest shadow-lg hover:shadow-xl transition-all"
                                style={{ background: theme.gradients.button }}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <FiCheck /> Send for Approval
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IntApprovals;
