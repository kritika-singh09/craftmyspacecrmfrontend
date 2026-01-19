import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../hooks/useAuth';
import { FiCheckCircle, FiXCircle, FiCamera, FiMapPin, FiSave, FiAlertTriangle } from 'react-icons/fi';

const DailyChecklist = () => {
    const { theme } = useTheme();
    const { token, user } = useAuth();

    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [moduleType, setModuleType] = useState('Construction');
    const [riskLevel, setRiskLevel] = useState('Low');
    const [location, setLocation] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // Standard Checklist Items
    const [items, setItems] = useState([
        { id: 1, question: "Are all workers wearing Helmets?", status: 'NA', remarks: '' },
        { id: 2, question: "Are Safety Shoes worn by all?", status: 'NA', remarks: '' },
        { id: 3, question: "Is electrical wiring insulated & safe?", status: 'NA', remarks: '' },
        { id: 4, question: "Are Fire Extinguishers available & valid?", status: 'NA', remarks: '' },
        { id: 5, question: "Is scaffolding secure and inspected?", status: 'NA', remarks: '' },
        { id: 6, question: "Area clear of trip hazards?", status: 'NA', remarks: '' },
        { id: 7, question: "First Aid Kit accessible?", status: 'NA', remarks: '' }
    ]);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        fetchProjects();
        // Try getting location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => setLocation(`${pos.coords.latitude},${pos.coords.longitude}`),
                (err) => console.log("Location access denied")
            );
        }
    }, []);

    const fetchProjects = async () => {
        try {
            // Assuming we have an endpoint to list projects
            const res = await fetch(`${API_URL}/projects`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setProjects(data);
            }
        } catch (err) { console.error(err); }
    };

    const updateItemStatus = (id, status) => {
        setItems(items.map(i => i.id === id ? { ...i, status } : i));
    };

    const updateItemRemarks = (id, remarks) => {
        setItems(items.map(i => i.id === id ? { ...i, remarks } : i));
    };

    const handleSubmit = async () => {
        if (!selectedProject) return alert("Please select a project");

        // Calculate risk based on 'Unsafe' items
        const unsafeCount = items.filter(i => i.status === 'Unsafe').length;
        const calculatedRisk = unsafeCount > 2 ? 'High' : unsafeCount > 0 ? 'Medium' : 'Low';

        setSubmitting(true);
        try {
            const payload = {
                project: selectedProject,
                module: moduleType,
                items: items,
                locationStr: location,
                riskLevel: calculatedRisk
            };

            const res = await fetch(`${API_URL}/safety/checklists`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                alert("Checklist Submitted Successfully!");
                // Reset form
                setItems(items.map(i => ({ ...i, status: 'NA', remarks: '' })));
                setSelectedProject('');
            } else {
                alert("Failed to submit checklist");
            }
        } catch (error) {
            console.error(error);
            alert("Error submitting checklist");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="card-premium p-8 border-l-8 border-l-brand-500" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-6" style={{ color: theme.textPrimary }}>Daily Safety Inspection</h3>

                {/* Context Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest block mb-2 opacity-60">Project Site</label>
                        <select
                            value={selectedProject}
                            onChange={(e) => setSelectedProject(e.target.value)}
                            className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold focus:ring-2 ring-brand-500 outline-none"
                        >
                            <option value="">-- Select Project --</option>
                            {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest block mb-2 opacity-60">Module / Phase</label>
                        <div className="flex bg-slate-100 dark:bg-slate-900 rounded-xl p-1">
                            {['Construction', 'Interior', 'Architecture'].map(m => (
                                <button
                                    key={m}
                                    onClick={() => setModuleType(m)}
                                    className={`flex-1 py-3 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${moduleType === m ? 'bg-white shadow text-brand-600' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Checklist Items */}
                <div className="space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 hover:border-brand-200 transition-all">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <p className="font-bold text-sm" style={{ color: theme.textPrimary }}>{item.id}. {item.question}</p>

                                <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
                                    <button
                                        onClick={() => updateItemStatus(item.id, 'Safe')}
                                        className={`flex-1 md:flex-none px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${item.status === 'Safe' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-200 dark:bg-slate-700 opacity-60'}`}
                                    >
                                        <FiCheckCircle /> Safe
                                    </button>
                                    <button
                                        onClick={() => updateItemStatus(item.id, 'Unsafe')}
                                        className={`flex-1 md:flex-none px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${item.status === 'Unsafe' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-slate-200 dark:bg-slate-700 opacity-60'}`}
                                    >
                                        <FiXCircle /> Unsafe
                                    </button>
                                    <button
                                        onClick={() => updateItemStatus(item.id, 'NA')}
                                        className={`flex-1 md:flex-none px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all justify-center ${item.status === 'NA' ? 'bg-slate-500 text-white' : 'bg-slate-200 dark:bg-slate-700 opacity-60'}`}
                                    >
                                        N/A
                                    </button>
                                </div>
                            </div>
                            {item.status === 'Unsafe' && (
                                <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                                    <input
                                        type="text"
                                        placeholder="Describe the violation..."
                                        value={item.remarks}
                                        onChange={(e) => updateItemRemarks(item.id, e.target.value)}
                                        className="w-full p-3 text-xs rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 text-red-600 placeholder-red-300 focus:outline-none"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Footer Actions */}
                <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-xs font-bold opacity-50">
                        <FiMapPin /> {location || "Locating..."}
                    </div>
                    <div className="flex gap-4">
                        <button className="px-6 py-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 text-slate-400 text-xs font-black uppercase tracking-wider hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                            <FiCamera className="inline mr-2 text-lg" /> Attach Photo
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-[0.15em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-500/20"
                        >
                            {submitting ? 'Submitting...' : 'Submit Report'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyChecklist;
