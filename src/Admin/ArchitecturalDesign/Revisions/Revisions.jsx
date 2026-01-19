import React, { useState } from 'react';
import { FiRefreshCw, FiAlertCircle, FiCheck, FiX, FiFileText } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

const Revisions = () => {
    const { theme } = useTheme();
    const [revisions, setRevisions] = useState([
        { id: 'REV-001', doc: 'Ground Floor Plan', revNo: 'R3', reason: 'Client requested larger balcony in master bedroom', author: 'Rahul Sharma', date: '2024-01-14', status: 'Pending Approval' },
        { id: 'REV-002', doc: 'Front Elevation', revNo: 'R2', reason: 'Structural alignment adjustment', author: 'Priya Verma', date: '2024-01-10', status: 'Approved' },
        { id: 'REV-003', doc: 'Section B-B', revNo: 'R1', reason: 'MEP coordination clash fix', author: 'Vikram Singh', date: '2024-01-05', status: 'Approved' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newRevision, setNewRevision] = useState({ doc: '', revNo: 'R1', reason: '', author: '' });

    const handleLogRevision = (e) => {
        e.preventDefault();
        const revision = {
            id: `REV-${(revisions.length + 1).toString().padStart(3, '0')}`,
            ...newRevision,
            date: new Date().toISOString().split('T')[0],
            status: 'Pending Approval'
        };
        setRevisions([revision, ...revisions]);
        setShowModal(false);
        setNewRevision({ doc: '', revNo: 'R1', reason: '', author: '' });
    };

    return (
        <div className="space-y-10 pb-12 animate-in slide-in-from-right-8 duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tight uppercase tracking-tight" style={{ color: theme.textPrimary }}>
                        Revision <span style={{ color: theme.secondary }}>History</span>
                    </h1>
                    <p className="mt-2 font-medium" style={{ color: theme.textSecondary }}>
                        Track changes, versioning, and approval status for all architectural revisions.
                    </p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-3 px-8 py-4 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-all"
                    style={{ background: theme.gradients.button }}
                >
                    <FiRefreshCw className="text-lg" /> Log New Revision
                </button>
            </div>

            <div className="rounded-[3rem] shadow-premium border overflow-hidden"
                style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
            >
                <table className="w-full text-left">
                    <thead>
                        <tr style={{ backgroundColor: `${theme.primary}05` }}>
                            {['Revision ID', 'Drawing Name', 'Version', 'Reason', 'Revised By', 'Status'].map(head => (
                                <th key={head} className="px-8 py-6 text-[10px] font-black uppercase tracking-widest" style={{ color: theme.primary }}>{head}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y" style={{ borderColor: theme.cardBorder }}>
                        {revisions.map((rev) => (
                            <tr key={rev.id} className="transition-colors hover:bg-opacity-50"
                                style={{
                                    backgroundColor: 'transparent',
                                    ':hover': { backgroundColor: `${theme.primary}05` }
                                }}
                            >
                                <td className="px-8 py-6 font-black text-xs tracking-widest" style={{ color: theme.textPrimary }}>{rev.id}</td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                            style={{ backgroundColor: `${theme.primary}10`, color: theme.primary }}
                                        >
                                            <FiFileText />
                                        </div>
                                        <p className="text-sm font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>{rev.doc}</p>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-sm font-black italic" style={{ color: theme.primary }}>{rev.revNo}</td>
                                <td className="px-8 py-6 max-w-xs">
                                    <p className="text-xs font-bold italic" style={{ color: theme.textSecondary }}>"{rev.reason}"</p>
                                </td>
                                <td className="px-8 py-6 text-xs font-bold" style={{ color: theme.textSecondary }}>{rev.author}</td>
                                <td className="px-8 py-6">
                                    <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${rev.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                                        }`}>
                                        {rev.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex gap-8">
                <div className="flex-1 p-8 rounded-[2.5rem] border flex items-start gap-6"
                    style={{
                        backgroundColor: `${theme.warning}10`,
                        borderColor: `${theme.warning}20`
                    }}
                >
                    <FiAlertCircle className="text-4xl shrink-0" style={{ color: theme.warning }} />
                    <div>
                        <h4 className="text-lg font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>Critical Revisions Pending</h4>
                        <p className="text-xs font-medium mt-1" style={{ color: theme.textSecondary }}>There are 4 high-priority revisions that require principal architect approval before authority submission.</p>
                    </div>
                </div>
            </div>

            {/* Log Revision Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-lg rounded-[2rem] shadow-2xl animate-in slide-in-from-bottom-8 overflow-hidden"
                        style={{ backgroundColor: theme.cardBg }}
                    >
                        <div className="p-6 text-white relative flex justify-between items-center" style={{ background: theme.gradients.primary }}>
                            <div>
                                <h3 className="text-xl font-black">Log Revision</h3>
                                <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mt-1">Record Changes</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white">
                                <FiX />
                            </button>
                        </div>

                        <form onSubmit={handleLogRevision} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Drawing Name</label>
                                <input type="text" required value={newRevision.doc} onChange={e => setNewRevision({ ...newRevision, doc: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Version No.</label>
                                    <input type="text" required value={newRevision.revNo} onChange={e => setNewRevision({ ...newRevision, revNo: e.target.value })}
                                        className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                        style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Revised By</label>
                                    <input type="text" required value={newRevision.author} onChange={e => setNewRevision({ ...newRevision, author: e.target.value })}
                                        className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                        style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Reason for Revision</label>
                                <textarea required rows="3" value={newRevision.reason} onChange={e => setNewRevision({ ...newRevision, reason: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                />
                            </div>

                            <button type="submit" className="w-full py-4 rounded-xl text-white font-black uppercase tracking-widest shadow-lg hover:shadow-xl transition-all"
                                style={{ background: theme.gradients.button }}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <FiCheck /> Log Revision
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Revisions;
