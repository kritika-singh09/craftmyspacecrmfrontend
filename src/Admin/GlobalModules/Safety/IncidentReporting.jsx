import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../hooks/useAuth';
import { FiAlertTriangle, FiFileText, FiCamera, FiMapPin, FiActivity, FiX } from 'react-icons/fi';

const IncidentReporting = () => {
    const { theme } = useTheme();
    const { token } = useAuth();

    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [incidentType, setIncidentType] = useState('NearMiss');
    const [severity, setSeverity] = useState('Low');
    const [description, setDescription] = useState('');
    const [incidents, setIncidents] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        fetchProjects();
        fetchIncidents();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch(`${API_URL}/projects`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) setProjects(await res.json());
        } catch (err) { console.error(err); }
    };

    const fetchIncidents = async () => {
        try {
            const res = await fetch(`${API_URL}/safety/incidents`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) setIncidents(await res.json());
        } catch (err) { console.error(err); }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(prev => [...prev, ...files]);
    };

    const removeFile = (index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (!selectedProject || !description) return alert("Please fill all fields");

        setSubmitting(true);
        try {
            const formData = new FormData();
            const payload = {
                project: selectedProject,
                type: incidentType,
                severity: severity,
                description: description,
            };

            formData.append('data', JSON.stringify(payload));
            selectedFiles.forEach(file => {
                formData.append('photos', file);
            });

            const res = await fetch(`${API_URL}/safety/incidents`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (res.ok) {
                alert("Incident Reported Successfully");
                setDescription('');
                setSelectedFiles([]);
                fetchIncidents(); // Refresh list
            } else {
                alert("Failed to report incident");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
            {/* Report Form */}
            <div className="card-premium p-8 h-fit space-y-6 border-l-8 border-l-red-500" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3 text-red-600">
                    <FiAlertTriangle /> Report Incident
                </h3>

                <div className="space-y-4">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest block mb-2 opacity-60">Project Site</label>
                        <select
                            value={selectedProject}
                            onChange={(e) => setSelectedProject(e.target.value)}
                            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold outline-none"
                        >
                            <option value="">-- Select Project --</option>
                            {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest block mb-2 opacity-60">Type</label>
                            <select
                                value={incidentType}
                                onChange={(e) => setIncidentType(e.target.value)}
                                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-medium outline-none"
                            >
                                {['Injury', 'NearMiss', 'PropertyDamage', 'Violation', 'Fire', 'Other'].map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest block mb-2 opacity-60">Severity</label>
                            <select
                                value={severity}
                                onChange={(e) => setSeverity(e.target.value)}
                                className={`w-full p-3 rounded-xl border font-bold outline-none ${severity === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-slate-50 dark:bg-slate-900'}`}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="Critical">Critical (Stop Work)</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest block mb-2 opacity-60">Description</label>
                        <textarea
                            rows="4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 ring-red-500 placeholder-slate-400"
                            placeholder="Describe what happened..."
                        ></textarea>
                    </div>

                    <div className="space-y-2">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                            className="w-full py-3 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-xs font-black uppercase tracking-wider text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                        >
                            <FiCamera className="inline mr-2" /> Attach Evidence
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            multiple
                            className="hidden"
                            accept="image/*"
                        />
                        {selectedFiles.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {selectedFiles.map((file, idx) => (
                                    <div key={idx} className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                                        <span className="text-[10px] font-bold truncate max-w-[100px]">{file.name}</span>
                                        <button onClick={() => removeFile(idx)} className="text-red-500 hover:text-red-700"><FiX /></button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="w-full py-4 bg-red-600 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-all shadow-lg shadow-red-500/30"
                    >
                        {submitting ? 'Reporting...' : 'Submit Report'}
                    </button>
                </div>
            </div>

            {/* Recent Incidents List */}
            <div className="lg:col-span-2 space-y-6">
                <h3 className="text-xl font-black uppercase tracking-tight opacity-60 ml-2" style={{ color: theme.textSecondary }}>Recent Activity Log</h3>

                {incidents.length === 0 && <div className="p-12 text-center opacity-40 font-bold uppercase border-2 border-dashed rounded-3xl" style={{ borderColor: theme.cardBorder }}>No incidents recorded. Stay Safe!</div>}

                <div className="space-y-4">
                    {incidents.map(inc => (
                        <div key={inc._id} className="card-premium p-6 flex flex-col md:flex-row gap-6 relative overflow-hidden" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                            <div className={`absolute top-0 left-0 w-2 h-full ${inc.severity === 'Critical' ? 'bg-red-600' : inc.severity === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-black text-lg" style={{ color: theme.textPrimary }}>{inc.type}</h4>
                                    <span className="text-[10px] font-bold opacity-50">{new Date(inc.date).toLocaleDateString()}</span>
                                </div>
                                <p className="text-sm opacity-80 mb-4" style={{ color: theme.textSecondary }}>{inc.description}</p>
                                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider opacity-60">
                                    <span className="flex items-center gap-1"><FiMapPin /> {inc.project?.name || 'Unknown Site'}</span>
                                    <span className="flex items-center gap-1"><FiActivity /> {inc.severity} Severity</span>
                                    <span className="flex items-center gap-1">Reported by: {inc.reportedBy?.name}</span>
                                </div>
                                {inc.photos && inc.photos.length > 0 && (
                                    <div className="flex gap-2 mt-4 overflow-x-auto pb-2 no-scrollbar">
                                        {inc.photos.map((url, i) => (
                                            <img key={i} src={url} alt="Evidence" className="w-24 h-24 object-cover rounded-xl border border-white/20 shadow-sm transition-transform hover:scale-110 cursor-pointer" onClick={() => window.open(url, '_blank')} />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {inc.severity === 'Critical' && (
                                <div className="bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-xl flex items-center justify-center min-w-[120px]">
                                    <span className="text-red-600 font-black text-xs uppercase tracking-widest text-center">Work Stop<br />Issued</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IncidentReporting;
