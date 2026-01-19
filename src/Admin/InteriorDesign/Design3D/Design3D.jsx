import React, { useState } from 'react';
import { FiImage, FiUpload, FiDownload, FiMessageSquare, FiRefreshCw, FiExternalLink, FiX, FiCheck } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

const IntDesign3D = () => {
    const { theme } = useTheme();
    const [renders, setRenders] = useState([
        { id: 1, name: 'Master Bedroom - View 1', type: 'Photorealistic Render', date: 'Jan 12', version: 'V2', status: 'Awaiting Feedback' },
        { id: 2, name: 'Living Room - Panoramic', type: '360 View', date: 'Jan 10', version: 'V1', status: 'Approved' },
        { id: 3, name: 'Kitchen Layout', type: '2D Drawing', date: 'Jan 08', version: 'V3', status: 'Revision Requested' },
    ]);

    const [showUploadModal, setShowUploadModal] = useState(false);
    const [newRender, setNewRender] = useState({ name: '', type: 'Photorealistic Render', version: 'V1', status: 'Draft' });

    const handleUpload = (e) => {
        e.preventDefault();
        const renderToAdd = {
            id: renders.length + 1,
            ...newRender,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
            status: 'Awaiting Feedback'
        };
        setRenders([renderToAdd, ...renders]);
        setShowUploadModal(false);
        setNewRender({ name: '', type: 'Photorealistic Render', version: 'V1', status: 'Draft' });
    };

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight uppercase" style={{ color: theme.textPrimary }}>
                        Drawings <span style={{ color: theme.secondary }}>& 3D Views</span>
                    </h1>
                    <p className="mt-2 font-medium tracking-wide" style={{ color: theme.textSecondary }}>
                        High-fidelity visualization repository and technical furniture layouts.
                    </p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-3 px-8 py-4 border rounded-2xl font-black text-xs uppercase tracking-widest shadow-premium transition-all hover:bg-black/5"
                        style={{ borderColor: theme.cardBorder, color: theme.secondary, backgroundColor: theme.cardBg }}
                    >
                        <FiRefreshCw /> Version History
                    </button>
                    <button
                        onClick={() => setShowUploadModal(true)}
                        className="flex items-center gap-3 px-8 py-4 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all"
                        style={{ background: theme.gradients.button }}
                    >
                        <FiUpload className="text-lg" /> Upload Render
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {renders.map((render, i) => (
                    <div key={i} className="group rounded-[3.5rem] shadow-premium border overflow-hidden hover:border-orange-500 transition-all duration-500"
                        style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
                    >
                        <div className="aspect-video flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-700"
                            style={{ backgroundColor: `${theme.primary}10`, color: theme.textPrimary }}
                        >
                            <FiImage className="text-5xl opacity-20" />
                            <p className="text-[10px] font-black uppercase tracking-widest mt-2 opacity-40">{render.type}</p>

                            <div className="absolute inset-0 transition-all flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 backdrop-blur-sm bg-black/20">
                                <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-xl hover:scale-110 transition-transform" style={{ color: theme.primary }}><FiExternalLink /></button>
                                <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-xl hover:scale-110 transition-transform" style={{ color: theme.primary }}><FiDownload /></button>
                            </div>
                        </div>
                        <div className="p-8 space-y-4 relative bg-white dark:bg-transparent" style={{ backgroundColor: theme.cardBg }}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="text-lg font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>{render.name}</h4>
                                    <p className="text-[10px] font-black uppercase tracking-widest mt-1" style={{ color: theme.secondary }}>{render.date} • {render.version}</p>
                                </div>
                                <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg border ${render.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                    render.status === 'Revision Requested' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                                        'bg-amber-50 text-amber-700 border-amber-100'
                                    }`}>{render.status}</span>
                            </div>
                            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:text-white group-hover:shadow-lg"
                                style={{ backgroundColor: `${theme.primary}10`, color: theme.primary }}
                                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = theme.primary; e.currentTarget.style.color = '#fff'; }}
                                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = `${theme.primary}10`; e.currentTarget.style.color = theme.primary; }}
                            >
                                <FiMessageSquare /> View Comments
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl animate-in slide-in-from-bottom-8 overflow-hidden"
                        style={{ backgroundColor: theme.cardBg }}
                    >
                        <div className="p-6 text-white relative flex justify-between items-center" style={{ background: theme.gradients.primary }}>
                            <div>
                                <h3 className="text-xl font-black">Upload New Render</h3>
                                <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mt-1">Add to Gallery</p>
                            </div>
                            <button onClick={() => setShowUploadModal(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white">
                                <FiX />
                            </button>
                        </div>

                        <form onSubmit={handleUpload} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Render Name</label>
                                <input type="text" required value={newRender.name} onChange={e => setNewRender({ ...newRender, name: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                    placeholder="e.g. Guest Bedroom View 1"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Type</label>
                                <select value={newRender.type} onChange={e => setNewRender({ ...newRender, type: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                >
                                    <option>Photorealistic Render</option>
                                    <option>360 View</option>
                                    <option>2D Drawing</option>
                                    <option>Sketch</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Version Tag</label>
                                <input type="text" value={newRender.version} onChange={e => setNewRender({ ...newRender, version: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                />
                            </div>

                            <div className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors hover:border-orange-400"
                                style={{ borderColor: theme.cardBorder, backgroundColor: `${theme.primary}05` }}
                            >
                                <FiUpload className="text-3xl opacity-40" style={{ color: theme.textPrimary }} />
                                <p className="text-xs font-bold" style={{ color: theme.textSecondary }}>Click to browse or drag file here</p>
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

export default IntDesign3D;
