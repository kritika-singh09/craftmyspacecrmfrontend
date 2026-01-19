import React, { useState } from 'react';
import { FiFolder, FiFile, FiLock, FiUpload, FiDownload, FiSearch, FiArchive, FiX, FiMoreVertical, FiTrash2 } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

const IntDocuments = () => {
    const { theme } = useTheme();

    // Initial Files State
    const [files, setFiles] = useState([
        { id: 1, name: 'Main Agreement.pdf', category: 'Agreement Documents', size: '2.4 MB', date: 'Jan 10' },
        { id: 2, name: 'Floor Plan V1.dwg', category: 'Working Drawings', size: '12.8 MB', date: 'Jan 11' },
        { id: 3, name: 'Kitchen Elevations.pdf', category: 'Working Drawings', size: '4.2 MB', date: 'Jan 12' },
        { id: 4, name: 'Sofa Customization Quote.pdf', category: 'Bespoke Furniture Quotes', size: '1.1 MB', date: 'Jan 14' },
    ]);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [newFile, setNewFile] = useState({ name: '', category: 'Working Drawings' });

    // Derived Folder Data
    const folderCategories = [
        'Agreement Documents', 'Working Drawings', 'Bespoke Furniture Quotes', 'Site Photographs', 'Handover & Warranty'
    ];

    const getFolderStats = (cat) => {
        const catFiles = files.filter(f => f.category === cat);
        const count = catFiles.length;
        const sizeVal = catFiles.reduce((acc, curr) => acc + parseFloat(curr.size), 0);
        return { count, size: count > 0 ? `${sizeVal.toFixed(1)} MB` : '0 MB' };
    };

    const handleUpload = (e) => {
        e.preventDefault();
        const file = {
            id: files.length + 1,
            name: newFile.name || 'Untitled Document.pdf',
            category: newFile.category,
            size: '1.5 MB', // Mock size
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
        };
        setFiles([file, ...files]);
        setShowUploadModal(false);
        setNewFile({ name: '', category: 'Working Drawings' });
    };

    const handleDelete = (id) => {
        setFiles(files.filter(f => f.id !== id));
    };

    return (
        <div className="space-y-10 pb-12 animate-in zoom-in-95 duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight uppercase" style={{ color: theme.textPrimary }}>
                        Asset <span style={{ color: theme.secondary }}>Vault</span>
                    </h1>
                    <p className="mt-2 font-medium tracking-wide" style={{ color: theme.textSecondary }}>
                        Secure repository for legal agreements, site media, and technical handovers.
                    </p>
                </div>
                <button
                    onClick={() => setShowUploadModal(true)}
                    className="flex items-center gap-3 px-8 py-4 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all"
                    style={{ background: theme.gradients.button }}
                >
                    <FiUpload className="text-lg" /> Upload Document
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {folderCategories.map((cat, i) => {
                    const stats = getFolderStats(cat);
                    return (
                        <div key={i}
                            onClick={() => setSelectedCategory(cat)}
                            className="group p-10 rounded-[3.5rem] shadow-premium border transition-all duration-300 cursor-pointer hover:shadow-2xl"
                            style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform"
                                    style={{ backgroundColor: `${theme.primary}10`, color: theme.primary }}
                                >
                                    <FiFolder />
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: theme.textPrimary }}>{stats.count} Items</p>
                                    <p className="text-[9px] font-bold italic uppercase" style={{ color: theme.secondary }}>{stats.size}</p>
                                </div>
                            </div>
                            <h4 className="text-xl font-black uppercase tracking-tight mb-2 transition-colors" style={{ color: theme.textPrimary }}>{cat}</h4>
                            <div className="mt-8 flex gap-4">
                                <button className="px-6 py-2 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all hover:opacity-90"
                                    style={{ backgroundColor: theme.textSecondary }}
                                >
                                    open
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="rounded-[3rem] p-10 text-white flex flex-col md:flex-row justify-between items-center shadow-xl relative overflow-hidden"
                style={{ background: theme.gradients.sidebar }}
            >
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full -mr-40 -mt-40 blur-3xl opacity-30" style={{ backgroundColor: theme.secondary }}></div>
                <div className="flex items-center gap-8 relative z-10">
                    <div className="w-20 h-20 rounded-[2rem] bg-white/10 flex items-center justify-center text-4xl shadow-inner"><FiLock /></div>
                    <div>
                        <h4 className="text-2xl font-black uppercase tracking-tight mb-1">Encrypted Storage</h4>
                        <p className="font-medium opacity-80 max-w-sm" style={{ color: theme.textOnPrimary }}>All interior layouts and vendor quotes are encrypted and stored in private cloud sectors.</p>
                    </div>
                </div>
                <button className="mt-8 md:mt-0 px-8 py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all relative z-10">Security Settings</button>
            </div>

            {/* Category / File Viewer Modal */}
            {selectedCategory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 overflow-hidden flex flex-col max-h-[80vh]"
                        style={{ backgroundColor: theme.cardBg }}
                    >
                        <div className="p-8 border-b flex justify-between items-center" style={{ borderColor: theme.cardBorder }}>
                            <div>
                                <h3 className="text-2xl font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>{selectedCategory}</h3>
                                <p className="text-xs font-bold opacity-60 mt-1" style={{ color: theme.textSecondary }}>Browsing Files</p>
                            </div>
                            <button onClick={() => setSelectedCategory(null)} className="p-3 hover:bg-gray-100 rounded-2xl transition-colors" style={{ color: theme.textPrimary }}>
                                <FiX className="text-xl" />
                            </button>
                        </div>

                        <div className="p-8 overflow-y-auto flex-1">
                            {files.filter(f => f.category === selectedCategory).length === 0 ? (
                                <div className="text-center py-20 opacity-50">
                                    <FiFolder className="text-6xl mx-auto mb-4" style={{ color: theme.textMuted }} />
                                    <p className="font-bold">No files in this folder yet.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {files.filter(f => f.category === selectedCategory).map((file) => (
                                        <div key={file.id} className="group p-4 rounded-2xl border flex justify-between items-center hover:shadow-md transition-all"
                                            style={{ borderColor: theme.cardBorder, backgroundColor: theme.background }}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-sm" style={{ backgroundColor: `${theme.primary}10`, color: theme.primary }}>
                                                    <FiFile />
                                                </div>
                                                <div>
                                                    <h5 className="font-black text-sm" style={{ color: theme.textPrimary }}>{file.name}</h5>
                                                    <p className="text-[10px] font-bold opacity-60 uppercase" style={{ color: theme.textSecondary }}>{file.size} • {file.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 hover:bg-gray-100 rounded-lg text-green-600"><FiDownload /></button>
                                                <button onClick={() => handleDelete(file.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500"><FiTrash2 /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl animate-in slide-in-from-bottom-8 overflow-hidden"
                        style={{ backgroundColor: theme.cardBg }}
                    >
                        <div className="p-6 text-white relative flex justify-between items-center" style={{ background: theme.gradients.primary }}>
                            <div>
                                <h3 className="text-xl font-black">Upload Document</h3>
                                <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mt-1">Add to Vault</p>
                            </div>
                            <button onClick={() => setShowUploadModal(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white">
                                <FiX />
                            </button>
                        </div>

                        <form onSubmit={handleUpload} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>File Name</label>
                                <input type="text" required value={newFile.name} onChange={e => setNewFile({ ...newFile, name: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                    placeholder="e.g. Revised Layout.pdf"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Category</label>
                                <select value={newFile.category} onChange={e => setNewFile({ ...newFile, category: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                >
                                    {folderCategories.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Select File</label>
                                <div className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                                    style={{ borderColor: theme.cardBorder }}
                                >
                                    <FiUpload className="mx-auto text-3xl mb-2 opacity-50" style={{ color: theme.textPrimary }} />
                                    <p className="text-xs font-bold opacity-60" style={{ color: theme.textSecondary }}>Click to browse or drag file here</p>
                                </div>
                            </div>

                            <button type="submit" className="w-full py-4 rounded-xl text-white font-black uppercase tracking-widest shadow-lg hover:shadow-xl transition-all"
                                style={{ background: theme.gradients.button }}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <FiUpload /> Upload Now
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IntDocuments;
