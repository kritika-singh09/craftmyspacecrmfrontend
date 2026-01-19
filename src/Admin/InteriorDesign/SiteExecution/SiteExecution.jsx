import React, { useState } from 'react';
import { FiTruck, FiUsers, FiClock, FiPlus, FiAlertCircle, FiCamera, FiCheckCircle, FiX, FiSave } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

const IntSiteExecution = () => {
    const { theme } = useTheme();
    const [logs, setLogs] = useState([
        { id: 1, date: 'Jan 14, 2024', work: 'Living Room False Ceiling Framework', workers: 4, supervisor: 'Rohit V.', status: 'On Track', issues: 'None' },
        { id: 2, date: 'Jan 13, 2024', work: 'Kitchen Cabinetry Installation', workers: 6, supervisor: 'Mohit S.', status: 'Delayed', issues: 'Material shortage (Hardware)' },
        { id: 3, date: 'Jan 12, 2024', work: 'Electrical First Fix - Master Bedroom', workers: 2, supervisor: 'Rohit V.', status: 'Completed', issues: 'None' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newLog, setNewLog] = useState({ work: '', workers: 0, supervisor: '', status: 'On Track', issues: '' });

    const handleCreateLog = (e) => {
        e.preventDefault();
        const logToAdd = {
            id: logs.length + 1,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            ...newLog,
            issues: newLog.issues || 'None'
        };
        setLogs([logToAdd, ...logs]);
        setShowModal(false);
        setNewLog({ work: '', workers: 0, supervisor: '', status: 'On Track', issues: '' });
    };

    return (
        <div className="space-y-10 pb-12 animate-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight uppercase" style={{ color: theme.textPrimary }}>
                        Site <span style={{ color: theme.secondary }}>Execution</span>
                    </h1>
                    <p className="mt-2 font-medium tracking-wide" style={{ color: theme.textSecondary }}>
                        Daily work logs, manpower tracking, and on-site issue management.
                    </p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-3 px-8 py-4 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all"
                    style={{ background: theme.gradients.button }}
                >
                    <FiPlus className="text-lg" /> Create Daily Log
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3 space-y-6">
                    {logs.map((log, i) => (
                        <div key={i} className="p-8 rounded-[3rem] border shadow-premium flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group hover:border-orange-500 transition-all duration-300"
                            style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
                        >
                            <div className="flex items-start gap-6">
                                <div className="p-5 rounded-3xl shadow-inner group-hover:text-white transition-all transform group-hover:scale-110"
                                    style={{ backgroundColor: `${theme.primary}10`, color: theme.primary }}
                                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = theme.primary; e.currentTarget.style.color = '#fff'; }}
                                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = `${theme.primary}10`; e.currentTarget.style.color = theme.primary; }}
                                >
                                    <p className="text-[10px] font-black uppercase tracking-widest leading-tight">{log.date.split(',')[0].split(' ')[0]}</p>
                                    <p className="text-2xl font-black tracking-tighter">{log.date.split(',')[0].split(' ')[1]}</p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-black uppercase tracking-tight transition-colors" style={{ color: theme.textPrimary }}>{log.work}</h4>
                                    <div className="flex flex-wrap gap-4 mt-2">
                                        <span className="flex items-center gap-2 text-[10px] font-bold opacity-60 uppercase" style={{ color: theme.textMuted }}><FiUsers style={{ color: theme.secondary }} /> {log.workers} Workers</span>
                                        <span className="flex items-center gap-2 text-[10px] font-bold opacity-60 uppercase" style={{ color: theme.textMuted }}><FiClock style={{ color: theme.secondary }} /> Sup: {log.supervisor}</span>
                                    </div>
                                    {log.issues !== 'None' && (
                                        <p className="text-xs font-bold text-red-500 mt-2 flex items-center gap-1"><FiAlertCircle /> Issue: {log.issues}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                                <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${log.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                    log.status === 'Delayed' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                                        'bg-amber-50 text-amber-700 border-amber-100'
                                    }`}>{log.status}</span>
                                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:underline" style={{ color: theme.secondary }}>
                                    <FiCamera /> Site Photos
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-8">
                    <div className="p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden" style={{ background: theme.gradients.sidebar }}>
                        <FiAlertCircle className="text-white text-5xl mb-4 opacity-50 absolute -top-2 -right-2" />
                        <h4 className="text-xl font-black uppercase tracking-tight mb-4 relative z-10">Urgent Issues</h4>
                        <ul className="space-y-4 relative z-10">
                            <li className="text-xs font-medium border-l-2 pl-4 py-1" style={{ borderColor: theme.secondary }}>Electrical outlet mismatch in Kitchen island. Needs designer input.</li>
                            <li className="text-xs font-medium border-l-2 pl-4 py-1 opacity-80" style={{ borderColor: theme.secondary }}>Pending delivery: Hardware for Wardrobes (Delayed 2 days).</li>
                        </ul>
                    </div>

                    <div className="p-8 rounded-[2.5rem] border" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                        <h4 className="text-sm font-black uppercase tracking-widest mb-6 border-b pb-4" style={{ color: theme.textPrimary, borderColor: theme.cardBorder }}>Efficiency Score</h4>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold opacity-60 uppercase" style={{ color: theme.textMuted }}>On-time Completion</span>
                            <span className="text-xs font-black italic" style={{ color: theme.secondary }}>88%</span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${theme.primary}10` }}>
                            <div className="h-full" style={{ width: '88%', background: theme.gradients.progress }}></div>
                        </div>
                        <p className="text-[9px] font-medium mt-4 leading-relaxed italic" style={{ color: theme.textSecondary }}>Site staff productivity is currently above target for current sprint.</p>
                    </div>
                </div>
            </div>

            {/* Create Log Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl animate-in slide-in-from-bottom-8 overflow-hidden"
                        style={{ backgroundColor: theme.cardBg }}
                    >
                        <div className="p-6 text-white relative flex justify-between items-center" style={{ background: theme.gradients.primary }}>
                            <div>
                                <h3 className="text-xl font-black">Daily Site Log</h3>
                                <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mt-1">Record Progress</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white">
                                <FiX />
                            </button>
                        </div>

                        <form onSubmit={handleCreateLog} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Work Description</label>
                                <textarea required value={newLog.work} onChange={e => setNewLog({ ...newLog, work: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2 min-h-[100px]"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                    placeholder="e.g. False ceiling framing completed..."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Workers On Site</label>
                                    <input type="number" min="0" required value={newLog.workers} onChange={e => setNewLog({ ...newLog, workers: parseInt(e.target.value) })}
                                        className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                        style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Supervisor</label>
                                    <input type="text" required value={newLog.supervisor} onChange={e => setNewLog({ ...newLog, supervisor: e.target.value })}
                                        className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                        style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Status</label>
                                <select value={newLog.status} onChange={e => setNewLog({ ...newLog, status: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                >
                                    <option>On Track</option>
                                    <option>Delayed</option>
                                    <option>Completed</option>
                                    <option>Ahead of Schedule</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Issues / Blockers (Optional)</label>
                                <input type="text" value={newLog.issues} onChange={e => setNewLog({ ...newLog, issues: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                    placeholder="e.g. Material shortage"
                                />
                            </div>

                            <button type="submit" className="w-full py-4 rounded-xl text-white font-black uppercase tracking-widest shadow-lg hover:shadow-xl transition-all"
                                style={{ background: theme.gradients.button }}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <FiSave /> Submit Log
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IntSiteExecution;
