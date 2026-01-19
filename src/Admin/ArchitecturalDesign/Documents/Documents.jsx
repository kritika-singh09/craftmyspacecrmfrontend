import React, { useState } from 'react';
import { FiFolder, FiFileText, FiPlus, FiGrid, FiList, FiCheckCircle, FiShield, FiExternalLink, FiX, FiCheck } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

const ArchDocuments = () => {
    const { theme } = useTheme();
    const categories = [
        { name: 'Agreements', count: 12, icon: '📜', color: 'brand' },
        { name: 'Authority Submissions', count: 8, icon: '🏛️', color: 'indigo' },
        { name: 'Client Approvals', count: 24, icon: '✅', color: 'emerald' },
        { name: 'Site Photos', count: 156, icon: '📸', color: 'teal' },
    ];

    const [documents, setDocuments] = useState([
        { name: 'Design Services Agreement.pdf', size: '2.4 MB', type: 'Agreement', date: '2024-01-10', author: 'Ar. Rahul' },
        { name: 'NOC - Fire Department.pdf', size: '1.2 MB', type: 'Authority', date: '2024-01-05', author: 'Admin' },
        { name: 'Structural Review Letter.doc', size: '0.8 MB', type: 'Coordination', date: '2023-12-28', author: 'Vikram Singh' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newDoc, setNewDoc] = useState({ name: '', type: 'Agreement' });

    const handleUpload = (e) => {
        e.preventDefault();
        const doc = {
            name: newDoc.name,
            size: (Math.random() * 5 + 0.5).toFixed(1) + ' MB',
            type: newDoc.type,
            date: new Date().toISOString().split('T')[0],
            author: 'Current User'
        };
        setDocuments([doc, ...documents]);
        setShowModal(false);
        setNewDoc({ name: '', type: 'Agreement' });
    };

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight uppercase tracking-tight" style={{ color: theme.textPrimary }}>
                        Project <span style={{ color: theme.secondary }}>Documents</span>
                    </h1>
                    <p className="mt-2 font-medium tracking-wide" style={{ color: theme.textSecondary }}>
                        Secure repository for legal agreements, letters, and non-drawing project files.
                    </p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-3 px-8 py-4 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-all"
                    style={{ background: theme.gradients.button }}
                >
                    <FiPlus className="text-lg" /> Upload Document
                </button>
            </div>

            {/* Folder Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {categories.map((cat, i) => (
                    <div key={i} className="group p-8 rounded-[2.5rem] shadow-premium border transition-all duration-500 cursor-pointer hover:bg-opacity-90 hover:scale-105"
                        style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-all group-hover:scale-110"
                                style={{ backgroundColor: `${theme.primary}10` }}
                            >
                                {cat.icon}
                            </div>
                            <FiFolder className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: theme.primary }} />
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-current" style={{ color: theme.textPrimary }}>{cat.name}</h3>
                        <p className="text-[10px] font-bold uppercase tracking-widest mt-1 group-hover:opacity-80" style={{ color: theme.textSecondary }}>{cat.count} Files</p>
                    </div>
                ))}
            </div>

            {/* Recent Files Table */}
            <div className="rounded-[3rem] shadow-premium border overflow-hidden"
                style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
            >
                <div className="p-8 border-b flex justify-between items-center" style={{ borderColor: theme.cardBorder }}>
                    <h4 className="text-lg font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>Recent Uploads</h4>
                    <div className="flex gap-2">
                        <FiGrid className="cursor-pointer hover:opacity-80" style={{ color: theme.primary }} />
                        <FiList className="cursor-pointer hover:opacity-80" style={{ color: theme.textSecondary }} />
                    </div>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr style={{ backgroundColor: `${theme.primary}05` }}>
                            {['File Name', 'Category', 'Upload Date', 'Handled By', 'Actions'].map(head => (
                                <th key={head} className="px-8 py-4 text-[9px] font-black uppercase tracking-widest" style={{ color: theme.primary }}>{head}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y" style={{ borderColor: theme.cardBorder }}>
                        {documents.map((doc, i) => (
                            <tr key={i} className="transition-colors hover:bg-opacity-50"
                                style={{
                                    backgroundColor: 'transparent',
                                    ':hover': { backgroundColor: `${theme.primary}05` }
                                }}
                            >
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                                            style={{ backgroundColor: `${theme.primary}10`, color: theme.primary }}
                                        >
                                            <FiFileText />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>{doc.name}</p>
                                            <p className="text-[9px] font-bold" style={{ color: theme.textSecondary }}>{doc.size}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg"
                                        style={{ backgroundColor: theme.background, color: theme.primary }}
                                    >
                                        {doc.type}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-xs font-bold" style={{ color: theme.textSecondary }}>{doc.date}</td>
                                <td className="px-8 py-6 text-xs font-bold" style={{ color: theme.textSecondary }}>{doc.author}</td>
                                <td className="px-8 py-6">
                                    <button className="p-3 rounded-xl hover:text-white transition-all shadow-sm"
                                        style={{ backgroundColor: theme.background, color: theme.primary }}
                                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = theme.primary; e.currentTarget.style.color = '#fff'; }}
                                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = theme.background; e.currentTarget.style.color = theme.primary; }}
                                    >
                                        <FiExternalLink />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex gap-8">
                <div className="flex-1 p-10 rounded-[3rem] shadow-premium border-2 border-dashed flex flex-col items-center justify-center text-center space-y-4"
                    style={{ backgroundColor: theme.cardBg, borderColor: `${theme.textSecondary}40` }}
                >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-inner"
                        style={{ backgroundColor: `${theme.primary}10`, color: theme.primary }}
                    >
                        <FiShield />
                    </div>
                    <div>
                        <h5 className="font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>Bank-Grade Encryption</h5>
                        <p className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: theme.textSecondary }}>All project documents are encrypted and synchronized.</p>
                    </div>
                </div>
            </div>

            {/* Upload Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-lg rounded-[2rem] shadow-2xl animate-in slide-in-from-bottom-8 overflow-hidden"
                        style={{ backgroundColor: theme.cardBg }}
                    >
                        <div className="p-6 text-white relative flex justify-between items-center" style={{ background: theme.gradients.primary }}>
                            <div>
                                <h3 className="text-xl font-black">Upload Document</h3>
                                <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mt-1">Add to Repository</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white">
                                <FiX />
                            </button>
                        </div>

                        <form onSubmit={handleUpload} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Document Name</label>
                                <input type="text" required value={newDoc.name} onChange={e => setNewDoc({ ...newDoc, name: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Category</label>
                                <select value={newDoc.type} onChange={e => setNewDoc({ ...newDoc, type: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                >
                                    <option>Agreement</option><option>Authority</option><option>Coordination</option><option>Reference</option>
                                </select>
                            </div>

                            <button type="submit" className="w-full py-4 rounded-xl text-white font-black uppercase tracking-widest shadow-lg hover:shadow-xl transition-all"
                                style={{ background: theme.gradients.button }}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <FiCheck /> Upload File
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArchDocuments;
