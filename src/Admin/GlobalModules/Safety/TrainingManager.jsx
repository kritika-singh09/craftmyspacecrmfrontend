import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../hooks/useAuth';
import { FiAward, FiUser, FiCalendar, FiAlertCircle, FiPlus, FiCheckCircle, FiActivity } from 'react-icons/fi';

const TrainingManager = () => {
    const { theme } = useTheme();
    const { token } = useAuth();

    const [records, setRecords] = useState([]);
    const [stats, setStats] = useState({ valid: 0, expired: 0, nearing: 0 });
    const [showForm, setShowForm] = useState(false);
    const [newTraining, setNewTraining] = useState({
        workerName: '',
        type: 'Induction',
        trainingDate: '',
        expiryDate: '',
        trainerName: ''
    });

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const res = await fetch(`${API_URL}/safety/training`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setRecords(data);
                calculateStats(data);
            }
        } catch (err) { console.error(err); }
    };

    const calculateStats = (data) => {
        const now = new Date();
        const valid = data.filter(r => new Date(r.expiryDate) > now).length;
        const expired = data.filter(r => new Date(r.expiryDate) <= now).length;
        // Nearing expiry (within 30 days)
        const nearing = data.filter(r => {
            const exp = new Date(r.expiryDate);
            const diffTime = exp - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays > 0 && diffDays <= 30;
        }).length;

        setStats({ valid, expired, nearing });
    };

    const handleSubmit = async () => {
        if (!newTraining.workerName || !newTraining.trainingDate) return alert("Fill required fields");

        try {
            const res = await fetch(`${API_URL}/safety/training`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newTraining)
            });

            if (res.ok) {
                alert("Training Record Added");
                setShowForm(false);
                setNewTraining({ workerName: '', type: 'Induction', trainingDate: '', expiryDate: '', trainerName: '' });
                fetchRecords();
            }
        } catch (err) { console.error(err); }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Stats Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card-premium p-6 flex items-center justify-between" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Valid Certifications</p>
                        <p className="text-3xl font-black text-emerald-500">{stats.valid}</p>
                    </div>
                    <FiCheckCircle className="text-3xl opacity-20" />
                </div>
                <div className="card-premium p-6 flex items-center justify-between" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Expiring Soon</p>
                        <p className="text-3xl font-black text-amber-500">{stats.nearing}</p>
                    </div>
                    <FiAlertCircle className="text-3xl opacity-20" />
                </div>
                <div className="card-premium p-6 flex items-center justify-between" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Expired</p>
                        <p className="text-3xl font-black text-red-500">{stats.expired}</p>
                    </div>
                    <FiActivity className="text-3xl opacity-20" />
                </div>
            </div>

            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>Worker Training Database</h3>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg"
                >
                    <FiPlus /> New Record
                </button>
            </div>

            {showForm && (
                <div className="card-premium p-8 border border-brand-500/30 bg-brand-50/5 dark:bg-brand-900/10 animate-in slide-in-from-top-4">
                    <h4 className="font-bold text-lg mb-6">Register New Training</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <input
                            type="text"
                            placeholder="Worker Name"
                            value={newTraining.workerName}
                            onChange={(e) => setNewTraining({ ...newTraining, workerName: e.target.value })}
                            className="p-3 rounded-xl border bg-white dark:bg-slate-800"
                        />
                        <select
                            value={newTraining.type}
                            onChange={(e) => setNewTraining({ ...newTraining, type: e.target.value })}
                            className="p-3 rounded-xl border bg-white dark:bg-slate-800"
                        >
                            {['Induction', 'FireSafety', 'HeightWork', 'Electrical', 'FirstAid'].map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <input
                            type="date"
                            placeholder="Training Date"
                            value={newTraining.trainingDate}
                            onChange={(e) => setNewTraining({ ...newTraining, trainingDate: e.target.value })}
                            className="p-3 rounded-xl border bg-white dark:bg-slate-800"
                        />
                        <input
                            type="date"
                            placeholder="Expiry Date"
                            value={newTraining.expiryDate}
                            onChange={(e) => setNewTraining({ ...newTraining, expiryDate: e.target.value })}
                            className="p-3 rounded-xl border bg-white dark:bg-slate-800"
                        />
                        <button
                            onClick={handleSubmit}
                            className="py-3 bg-brand-600 text-white rounded-xl font-bold uppercase tracking-wider"
                        >
                            Save Record
                        </button>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {records.map(rec => (
                    <div key={rec._id} className="flex items-center justify-between p-6 rounded-2xl border bg-white/5 hover:bg-white/10 transition-all" style={{ borderColor: theme.cardBorder }}>
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-xl">
                                <FiUser />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg" style={{ color: theme.textPrimary }}>{rec.workerName}</h4>
                                <div className="flex gap-2 mt-1">
                                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-black uppercase tracking-wider">{rec.type}</span>
                                    <span className="text-[10px] opacity-60">Trainer: {rec.trainerName || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Expires</p>
                            <p className={`font-bold ${new Date(rec.expiryDate) < new Date() ? 'text-red-500' : 'text-emerald-500'}`}>
                                {rec.expiryDate ? new Date(rec.expiryDate).toLocaleDateString() : 'Lifetime'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrainingManager;
