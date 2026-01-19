import { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext.jsx';
import { useMaterials } from '../../../hooks/useMaterials.jsx';
import { useProjects } from '../../../hooks/useProjects.jsx';
import { FiLayout, FiUsers, FiBox, FiShield, FiCamera, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

const DPRForm = ({ onClose, onSuccess }) => {
    const { theme } = useTheme();
    const { projects } = useProjects();
    const { getMaterialsMaster } = useMaterials();
    const [materials, setMaterials] = useState([]);
    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);

    console.log("PROJECTS DEBUG:", projects.map(p => ({ id: p.id, _id: p._id, name: p.name })));

    const [formData, setFormData] = useState({
        project: '',
        reportDate: new Date().toISOString().split('T')[0],
        workDescription: '',
        siteMeta: { site: '', floor: '' },
        activities: [{ taskName: '', qtyDone: '', unit: 'sqft', progressPercent: 0 }],
        attendance: { totalWorkers: '', present: '', manpowerBreakdown: [] },
        resourceUsage: { materials: [] },
        safety: { safetyAlert: false, incidents: '' },
        media: []
    });

    useEffect(() => {
        const fetchMaterials = async () => {
            const data = await getMaterialsMaster();
            setMaterials(data);
        };
        fetchMaterials();
    }, []);

    const steps = [
        { id: 1, name: 'Project & Work', icon: <FiLayout /> },
        { id: 2, name: 'Activities', icon: <FiCheckCircle /> },
        { id: 3, name: 'Manpower', icon: <FiUsers /> },
        { id: 4, name: 'Resources', icon: <FiBox /> },
        { id: 5, name: 'Safety & Media', icon: <FiShield /> }
    ];

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/reports`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                onSuccess();
            } else {
                const err = await res.json();
                alert(err.message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-[100] p-4 bg-slate-900/40">
            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]" style={{ backgroundColor: theme.cardBg }}>
                {/* Header */}
                <div className="p-8 text-white flex justify-between items-center" style={{ background: theme.gradients.primary }}>
                    <div>
                        <h2 className="text-2xl font-black uppercase tracking-tight">Daily Site Report (DPR)</h2>
                        <p className="text-blue-100 text-[10px] font-black uppercase tracking-widest opacity-80">Command Center Submission</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex gap-2">
                            {steps.map(s => (
                                <div key={s.id} className={`w-2 h-2 rounded-full transition-all ${step >= s.id ? 'bg-white scale-110' : 'bg-white/30'}`} />
                            ))}
                        </div>
                        <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all">✕</button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-10">
                    {/* Step 1: Project & Work */}
                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60 ml-1">Project *</label>
                                    <select
                                        value={formData.project}
                                        onChange={e => setFormData({ ...formData, project: e.target.value })}
                                        className="w-full px-5 py-3.5 rounded-2xl border font-bold text-sm outline-none bg-slate-50 focus:ring-4 transition-all"
                                        style={{ borderColor: theme.cardBorder }}
                                    >
                                        <option value="">Select Project</option>
                                        {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60 ml-1">Report Date</label>
                                    <input
                                        type="date"
                                        value={formData.reportDate}
                                        className="w-full px-5 py-3.5 rounded-2xl border font-bold text-sm outline-none bg-slate-50 focus:ring-4 transition-all"
                                        style={{ borderColor: theme.cardBorder }}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60 ml-1">Work Description *</label>
                                <textarea
                                    value={formData.workDescription}
                                    onChange={e => setFormData({ ...formData, workDescription: e.target.value })}
                                    placeholder="Brief summary of today's progress..."
                                    className="w-full px-5 py-4 rounded-2xl border font-bold text-sm outline-none bg-slate-50 h-32 focus:ring-4 transition-all"
                                    style={{ borderColor: theme.cardBorder }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Activities */}
                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-xs font-black uppercase tracking-widest text-blue-500">Task Progress Breakdown</h4>
                                <button type="button" onClick={() => setFormData({ ...formData, activities: [...formData.activities, { taskName: '', qtyDone: '', unit: 'sqft', progressPercent: 0 }] })} className="text-[10px] font-black uppercase text-slate-400 hover:text-primary transition-colors">+ Add Task</button>
                            </div>
                            <div className="space-y-4">
                                {formData.activities.map((act, idx) => (
                                    <div key={idx} className="grid grid-cols-12 gap-3 p-4 rounded-2xl border border-dashed" style={{ borderColor: theme.cardBorder }}>
                                        <input className="col-span-12 md:col-span-5 px-3 py-2 border rounded-xl text-xs font-bold" placeholder="Task Name (e.g. Slab Casting)" value={act.taskName} onChange={e => {
                                            const newActs = [...formData.activities];
                                            newActs[idx].taskName = e.target.value;
                                            setFormData({ ...formData, activities: newActs });
                                        }} />
                                        <input type="number" className="col-span-4 md:col-span-2 px-3 py-2 border rounded-xl text-xs font-bold" placeholder="Qty" value={act.qtyDone} onChange={e => {
                                            const newActs = [...formData.activities];
                                            newActs[idx].qtyDone = e.target.value;
                                            setFormData({ ...formData, activities: newActs });
                                        }} />
                                        <div className="col-span-8 md:col-span-5 flex items-center gap-2">
                                            <input type="range" className="flex-1" value={act.progressPercent} onChange={e => {
                                                const newActs = [...formData.activities];
                                                newActs[idx].progressPercent = e.target.value;
                                                setFormData({ ...formData, activities: newActs });
                                            }} />
                                            <span className="text-[10px] font-black w-8">{act.progressPercent}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Manpower */}
                    {step === 3 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="p-6 rounded-3xl bg-green-50 border border-green-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-green-600 mb-1">Total Workers</p>
                                        <input type="number" className="bg-transparent text-3xl font-black text-green-700 outline-none w-24" placeholder="0" value={formData.attendance.totalWorkers} onChange={e => setFormData({ ...formData, attendance: { ...formData.attendance, totalWorkers: e.target.value } })} />
                                    </div>
                                    <FiUsers className="text-4xl text-green-200" />
                                </div>
                                <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">Present Today</p>
                                        <input type="number" className="bg-transparent text-3xl font-black text-blue-700 outline-none w-24" placeholder="0" value={formData.attendance.present} onChange={e => setFormData({ ...formData, attendance: { ...formData.attendance, present: e.target.value } })} />
                                    </div>
                                    <FiCheckCircle className="text-4xl text-blue-200" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-xs font-black uppercase tracking-widest opacity-60">Skill-wise Distribution</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {['Mason', 'Helper', 'Electrician', 'Plumber'].map(skill => (
                                        <div key={skill} className="p-4 rounded-2xl border bg-slate-50" style={{ borderColor: theme.cardBorder }}>
                                            <p className="text-[9px] font-black uppercase mb-1 opacity-50">{skill}</p>
                                            <input type="number" className="w-full bg-transparent font-black text-lg outline-none" placeholder="0" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Resources */}
                    {step === 4 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                            <h4 className="text-xs font-black uppercase tracking-widest text-amber-600">Material Consumption Tracker</h4>
                            <div className="space-y-3">
                                {materials.slice(0, 5).map(m => (
                                    <div key={m._id} className="flex items-center justify-between p-4 rounded-2xl border" style={{ borderColor: theme.cardBorder }}>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">M</div>
                                            <div>
                                                <p className="text-[11px] font-black">{m.name}</p>
                                                <p className="text-[9px] font-bold opacity-40 uppercase">{m.unit}</p>
                                            </div>
                                        </div>
                                        <input type="number" placeholder="Qty Used" className="w-24 px-3 py-2 rounded-xl border text-xs font-black text-center" style={{ borderColor: theme.cardBorder }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 5: Safety & Media */}
                    {step === 5 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                            <div className={`p-6 rounded-[2rem] transition-all border-2 ${formData.safety.safetyAlert ? 'bg-red-50 border-red-200 shadow-red-100' : 'bg-slate-50 border-slate-200'}`} style={{ boxShadow: formData.safety.safetyAlert ? '0 20px 40px -20px rgba(239, 68, 68, 0.3)' : 'none' }}>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${formData.safety.safetyAlert ? 'bg-red-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                            <FiAlertTriangle />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-sm uppercase">Instant Safety Alert</h4>
                                            <p className="text-[10px] font-bold opacity-60">Emergency notification to all leads</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, safety: { ...formData.safety, safetyAlert: !formData.safety.safetyAlert } })}
                                        className={`px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${formData.safety.safetyAlert ? 'bg-red-600 text-white' : 'bg-slate-800 text-white'}`}
                                    >
                                        {formData.safety.safetyAlert ? '🚨 ACTIVATED' : 'ACTIVATE'}
                                    </button>
                                </div>
                                <textarea
                                    className="w-full bg-white/50 p-4 rounded-2xl border-none outline-none text-xs font-bold"
                                    rows="3"
                                    placeholder="Describe any hazards or incidents..."
                                    value={formData.safety.incidents}
                                    onChange={e => setFormData({ ...formData, safety: { ...formData.safety, incidents: e.target.value } })}
                                />
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-xs font-black uppercase tracking-widest opacity-60">Site Captures</h4>
                                <div className="grid grid-cols-4 gap-4">
                                    <div className="aspect-square rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 gap-2 hover:bg-slate-50 cursor-pointer transition-all">
                                        <FiCamera className="text-2xl" />
                                        <span className="text-[9px] font-black uppercase">Add Media</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Controls */}
                <div className="p-8 bg-slate-50 border-t flex justify-between items-center" style={{ borderColor: theme.cardBorder }}>
                    <button
                        onClick={() => step > 1 ? setStep(step - 1) : onClose()}
                        className="px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-500 hover:bg-slate-200 transition-all"
                    >
                        {step === 1 ? 'Discard' : 'Back'}
                    </button>
                    {step < 5 ? (
                        <button
                            onClick={() => setStep(step + 1)}
                            className="px-10 py-3 rounded-2xl font-black text-xs uppercase tracking-widest text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
                            style={{ background: theme.gradients.button }}
                        >
                            Next Step
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="px-12 py-3 rounded-2xl font-black text-xs uppercase tracking-widest text-white shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl disabled:opacity-50"
                            style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}
                        >
                            {submitting ? 'Broadcasting...' : 'Publish Command'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DPRForm;
