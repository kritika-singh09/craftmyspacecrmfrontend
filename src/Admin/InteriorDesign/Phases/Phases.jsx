import React, { useState } from 'react';
import { FiLayers, FiCheckCircle, FiClock, FiPlus, FiArrowRight, FiEdit3, FiX, FiSave } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

const IntPhases = () => {
    const { theme } = useTheme();
    const [phases, setPhases] = useState([
        { id: 1, name: 'Space Planning', status: 'Completed', progress: 100, designer: 'Sameer Sen' },
        { id: 2, name: 'Concept Design', status: 'Completed', progress: 100, designer: 'Sameer Sen' },
        { id: 3, name: 'Mood Board', status: 'In Progress', progress: 85, designer: 'Megha Gupta' },
        { id: 4, name: '3D Visualization', status: 'In Progress', progress: 40, designer: 'Megha Gupta' },
        { id: 5, name: 'Working Drawings', status: 'Upcoming', progress: 0, designer: 'Sameer Sen' },
        { id: 6, name: 'Site Coordination', status: 'Upcoming', progress: 0, designer: 'Rohit Verma' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingPhase, setEditingPhase] = useState(null);
    const [formData, setFormData] = useState({ name: '', status: 'Upcoming', progress: 0, designer: '' });

    const handleAdd = () => {
        setEditingPhase(null);
        setFormData({ name: '', status: 'Upcoming', progress: 0, designer: '' });
        setShowModal(true);
    };

    const handleEdit = (phase) => {
        setEditingPhase(phase);
        setFormData(phase);
        setShowModal(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (editingPhase) {
            setPhases(phases.map(p => p.id === editingPhase.id ? { ...formData, id: p.id } : p));
        } else {
            setPhases([...phases, { ...formData, id: phases.length + 1 }]);
        }
        setShowModal(false);
    };

    return (
        <div className="space-y-10 pb-12 animate-in slide-in-from-right-8 duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight uppercase" style={{ color: theme.textPrimary }}>
                        Interior <span style={{ color: theme.secondary }}>Phases</span>
                    </h1>
                    <p className="mt-2 font-medium tracking-wide" style={{ color: theme.textSecondary }}>
                        Customizable design journey from shell to handover.
                    </p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-3 px-8 py-4 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all"
                    style={{ background: theme.gradients.button }}
                >
                    <FiPlus className="text-lg" /> Add Phase
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {phases.map((phase, i) => (
                    <div key={i} className="group relative p-10 rounded-[3rem] shadow-premium border transition-all hover:-translate-y-2 duration-500"
                        style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
                    >
                        <div className="flex justify-between items-center mb-8">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-all duration-500 shadow-inner"
                                style={{ backgroundColor: `${theme.primary}10`, color: theme.primary }}
                            >
                                {phase.status === 'Completed' ? <FiCheckCircle /> : <FiClock className={phase.status === 'In Progress' ? 'animate-pulse' : 'opacity-30'} />}
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest`}
                                style={{ color: phase.status === 'In Progress' ? theme.primary : theme.textPrimary }}
                            >{phase.status}</span>
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tight mb-2" style={{ color: theme.textPrimary }}>{phase.name}</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest mb-6" style={{ color: theme.textSecondary }}>In Charge: {phase.designer}</p>

                        <div className="space-y-3">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest" style={{ color: theme.textMuted }}>
                                <span>Progress</span>
                                <span>{phase.progress}%</span>
                            </div>
                            <div className="h-2.5 rounded-full overflow-hidden p-0.5 shadow-inner" style={{ backgroundColor: `${theme.primary}10` }}>
                                <div className="h-full rounded-full transition-all duration-1000"
                                    style={{ width: `${phase.progress}%`, background: theme.gradients.progress }}
                                ></div>
                            </div>
                        </div>

                        <button
                            onClick={() => handleEdit(phase)}
                            className="w-full mt-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 hover:text-white"
                            style={{ backgroundColor: `${theme.primary}10`, color: theme.primary }}
                            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = theme.primary; e.currentTarget.style.color = '#fff'; }}
                            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = `${theme.primary}10`; e.currentTarget.style.color = theme.primary; }}
                        >
                            Update Status <FiEdit3 />
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl animate-in slide-in-from-bottom-8 overflow-hidden"
                        style={{ backgroundColor: theme.cardBg }}
                    >
                        <div className="p-6 text-white relative flex justify-between items-center" style={{ background: theme.gradients.primary }}>
                            <div>
                                <h3 className="text-xl font-black">{editingPhase ? 'Update Phase' : 'New Design Phase'}</h3>
                                <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mt-1">Project Roadmap</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white">
                                <FiX />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Phase Name</label>
                                <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2 disabled:opacity-50"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                    placeholder="e.g. Concept Design"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Assigned Designer</label>
                                <input type="text" required value={formData.designer} onChange={e => setFormData({ ...formData, designer: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                    placeholder="e.g. Ar. Sameer"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Status</label>
                                    <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                        style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                    >
                                        <option>Upcoming</option>
                                        <option>In Progress</option>
                                        <option>Completed</option>
                                        <option>On Hold</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Progress (%)</label>
                                    <input type="number" min="0" max="100" value={formData.progress} onChange={e => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                                        className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                        style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="w-full py-4 rounded-xl text-white font-black uppercase tracking-widest shadow-lg hover:shadow-xl transition-all"
                                style={{ background: theme.gradients.button }}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <FiSave /> Save Changes
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IntPhases;
