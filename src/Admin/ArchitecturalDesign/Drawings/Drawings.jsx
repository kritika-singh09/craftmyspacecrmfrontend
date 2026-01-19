import React, { useState } from 'react';
import { FiUpload, FiFolder, FiFile, FiDownload, FiEye, FiShare2, FiMoreVertical, FiPlus, FiX, FiCheck } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

const Drawings = () => {
    const { theme } = useTheme();
    const [drawings, setDrawings] = useState([
        { id: 1, title: 'Ground Floor Plan', type: 'Plan', phase: 'Working Drawings', format: 'DWG', size: '4.2 MB', date: '2024-01-14', version: 'R3', author: 'Rahul Sharma' },
        { id: 2, title: 'Front Elevation', type: 'Elevation', phase: 'Schematic Design', format: 'PDF', size: '1.8 MB', date: '2024-01-12', version: 'R1', author: 'Priya Verma' },
        { id: 3, title: 'Section A-A', type: 'Section', phase: 'Design Development', format: 'JPG', size: '2.4 MB', date: '2024-01-10', version: 'R2', author: 'Vikram Singh' },
        { id: 4, title: '3D Exterior Render', type: '3D View', phase: 'Concept Design', format: 'PNG', size: '12.5 MB', date: '2024-01-05', version: 'R1', author: 'Vikram Singh' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newDrawing, setNewDrawing] = useState({ title: '', type: 'Plan', phase: 'Schematic Design', format: 'PDF', size: '0.0 MB' });

    const handleUpload = (e) => {
        e.preventDefault();
        const doc = {
            id: drawings.length + 1,
            ...newDrawing,
            date: new Date().toISOString().split('T')[0],
            version: 'R1',
            author: 'Current User',
            size: (Math.random() * 5 + 1).toFixed(1) + ' MB'
        };
        setDrawings([...drawings, doc]);
        setShowModal(false);
        setNewDrawing({ title: '', type: 'Plan', phase: 'Schematic Design', format: 'PDF', size: '0.0 MB' });
    };

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight flex items-center gap-3" style={{ color: theme.textPrimary }}>
                        <span className="w-1.5 h-10 rounded-full" style={{ backgroundColor: theme.primary }}></span>
                        Drawings Management
                    </h1>
                    <p className="mt-2 font-medium tracking-wide" style={{ color: theme.textSecondary }}>
                        Repository for all project blueprints, elevations, and 3D visualizations.
                    </p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-3 px-8 py-4 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-all"
                    style={{ background: theme.gradients.button }}
                >
                    <FiUpload className="text-lg" /> Upload Drawing
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {drawings.map((doc) => (
                    <div key={doc.id} className="group relative p-8 rounded-[2.5rem] shadow-premium border hover:shadow-premium-xl transition-all duration-500 overflow-hidden"
                        style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
                    >
                        <div className="absolute top-0 right-0 p-6">
                            <button className="transition-colors" style={{ color: theme.textSecondary }}><FiMoreVertical /></button>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-24 rounded-2xl flex flex-col items-center justify-center relative mb-6 group-hover:scale-110 transition-transform duration-500"
                                style={{ backgroundColor: `${theme.primary}10` }}
                            >
                                <FiFile className="text-4xl" style={{ color: theme.primary }} />
                                <span className="absolute bottom-2 text-[8px] font-black text-white px-2 py-0.5 rounded-md uppercase tracking-widest"
                                    style={{ backgroundColor: theme.primary }}
                                >
                                    {doc.format}
                                </span>
                            </div>

                            <h3 className="text-lg font-black uppercase tracking-tight leading-tight px-2" style={{ color: theme.textPrimary }}>{doc.title}</h3>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="px-2 py-0.5 text-[8px] font-black uppercase tracking-widest rounded-md border"
                                    style={{
                                        backgroundColor: theme.background,
                                        color: theme.primary,
                                        borderColor: theme.cardBorder
                                    }}
                                >
                                    {doc.version}
                                </span>
                                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: theme.textSecondary }}>{doc.type}</p>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t space-y-4" style={{ borderColor: theme.cardBorder }}>
                            <div className="space-y-1">
                                <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: theme.textSecondary }}>Phase</p>
                                <p className="text-xs font-bold" style={{ color: theme.textPrimary }}>{doc.phase}</p>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: theme.textSecondary }}>Size / Date</p>
                                    <p className="text-xs font-bold" style={{ color: theme.textPrimary }}>{doc.size} • {doc.date}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-all hover:text-white"
                                        style={{
                                            backgroundColor: theme.background,
                                            color: theme.primary
                                        }}
                                        onMouseOver={(e) => e.target.style.background = theme.primary}
                                        onMouseOut={(e) => e.target.style.background = theme.background}
                                    >
                                        <FiEye />
                                    </button>
                                    <button className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-all hover:text-white"
                                        style={{
                                            backgroundColor: theme.background,
                                            color: theme.primary
                                        }}
                                        onMouseOver={(e) => e.target.style.background = theme.primary}
                                        onMouseOut={(e) => e.target.style.background = theme.background}
                                    >
                                        <FiDownload />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add New Placeholder Card */}
                <div
                    onClick={() => setShowModal(true)}
                    className="hidden lg:flex border-4 border-dashed rounded-[2.5rem] items-center justify-center p-12 transition-colors cursor-pointer group"
                    style={{ borderColor: theme.cardBorder }}
                >
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-transform group-hover:scale-110"
                            style={{ backgroundColor: `${theme.primary}10`, color: theme.primary }}
                        >
                            <FiPlus />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: theme.textSecondary }}>Add New Drawing</p>
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
                                <h3 className="text-xl font-black">Upload Drawing</h3>
                                <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mt-1">Add to Repository</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white">
                                <FiX />
                            </button>
                        </div>

                        <form onSubmit={handleUpload} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Drawing Title</label>
                                <input type="text" required value={newDrawing.title} onChange={e => setNewDrawing({ ...newDrawing, title: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Type</label>
                                    <select value={newDrawing.type} onChange={e => setNewDrawing({ ...newDrawing, type: e.target.value })}
                                        className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                        style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                    >
                                        <option>Plan</option><option>Elevation</option><option>Section</option><option>3D View</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Format</label>
                                    <select value={newDrawing.format} onChange={e => setNewDrawing({ ...newDrawing, format: e.target.value })}
                                        className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                        style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                    >
                                        <option>PDF</option><option>DWG</option><option>JPG</option><option>PNG</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Project Phase</label>
                                <select value={newDrawing.phase} onChange={e => setNewDrawing({ ...newDrawing, phase: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                >
                                    <option>Concept Design</option><option>Schematic Design</option><option>Design Development</option><option>Working Drawings</option>
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

export default Drawings;
