import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../../common/Loader';
import {
    FiShield,
    FiAlertTriangle,
    FiBookOpen,
    FiCheckCircle,
    FiSettings,
    FiList,
    FiActivity
} from 'react-icons/fi';
import RoleGuard from '../../common/RoleGuard';

import SafetyMaster from './Safety/SafetyMaster';
import DailyChecklist from './Safety/DailyChecklist';
import IncidentReporting from './Safety/IncidentReporting';
import PPEManager from './Safety/PPEManager';
import TrainingManager from './Safety/TrainingManager';

import { useSocket } from '../../context/SocketContext';

// Sub-components (Placeholders for now, to be implemented in Phase 3)
const SafetyDashboard = () => {
    const { theme } = useTheme();
    const { socket } = useSocket();
    const { token } = useAuth();
    const [stats, setStats] = useState({ safeDays: 142, incidents: 0, compliance: 100, critical: 0, lowStock: 0 });
    const [alert, setAlert] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await fetch(`${API_URL}/safety/stats`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setStats({
                    safeDays: 142, // Placeholder as backend doesn't calc this yet
                    incidents: data.openIncidents || 0,
                    compliance: data.safetyScore || 100,
                    critical: data.criticalIncidents || 0,
                    lowStock: data.lowStockItems || 0
                });
            }
        } catch (err) { console.error(err); }
    };

    useEffect(() => {
        if (!socket) return;

        socket.on('SAFETY_CHECKLIST_SUBMITTED', (data) => {
            console.log("Checklist Submitted:", data);
            if (data.alertLevel === 'WARNING') {
                setAlert(`⚠️ Safety Warning: ${data.unsafeQuery} violations reported by ${data.submittedBy}`);
                // Optimistic update or refetch
                fetchStats();
            } else {
                setAlert(`✅ Checklist received from ${data.submittedBy}`);
            }

            // Clear alert after 5s
            setTimeout(() => setAlert(null), 5000);
        });

        socket.on('WORK_STOP_ISSUED', (data) => {
            setAlert(`🛑 CRITICAL WORK STOP: ${data.reason}`);
            fetchStats();
        });

        socket.on('INCIDENT_REPORTED', (data) => {
            setAlert(`⚠️ Incident Reported: ${data.message}`);
            fetchStats();
            setTimeout(() => setAlert(null), 5000);
        });

        socket.on('PPE_LOW_STOCK', (data) => {
            setAlert(`📦 PPE Alert: ${data.message}`);
            fetchStats();
            setTimeout(() => setAlert(null), 5000);
        });

        return () => {
            socket.off('SAFETY_CHECKLIST_SUBMITTED');
            socket.off('WORK_STOP_ISSUED');
            socket.off('INCIDENT_REPORTED');
            socket.off('PPE_LOW_STOCK');
        };
    }, [socket]);

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700 relative">
            {alert && (
                <div className="fixed top-24 right-10 bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl border border-white/20 z-50 animate-bounce">
                    <p className="font-bold text-sm">{alert}</p>
                </div>
            )}

            {/* Safety Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="card-premium p-10 flex items-center gap-8 border-l-8 border-l-emerald-500" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                    <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl shadow-sm"><FiShield /></div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40" style={{ color: theme.textSecondary }}>Safe Days Worked</p>
                        <p className="text-4xl font-black" style={{ color: theme.textPrimary }}>{stats.safeDays} <span className="text-lg opacity-40">Days</span></p>
                    </div>
                </div>
                <div className={`card-premium p-10 flex items-center gap-8 border-l-8 ${stats.critical > 0 ? 'border-l-red-600 animate-pulse' : 'border-l-amber-500'}`} style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                    <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-3xl shadow-sm ${stats.critical > 0 ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}><FiActivity /></div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40" style={{ color: theme.textSecondary }}>Recent Incidents</p>
                        <p className="text-4xl font-black" style={{ color: theme.textPrimary }}>{String(stats.incidents).padStart(2, '0')} <span className="text-lg opacity-40">Active</span></p>
                        {stats.critical > 0 && <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider mt-1">⚠️ {stats.critical} Critical</p>}
                    </div>
                </div>
                <div className="card-premium p-10 flex items-center gap-8 border-l-8 border-l-blue-500" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                    <div className="w-16 h-16 rounded-[1.5rem] bg-blue-50 text-blue-600 flex items-center justify-center text-3xl shadow-sm"><FiBookOpen /></div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40" style={{ color: theme.textSecondary }}>Overall Safety Score</p>
                        <p className="text-4xl font-black" style={{ color: theme.textPrimary }}>{stats.compliance} <span className="text-lg opacity-40">/ 100</span></p>
                    </div>
                </div>
            </div>

            {/* Protocol Checklist Summary */}
            <div className="card-premium p-10 overflow-hidden" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                <div className="flex justify-between items-center mb-10 pb-6 border-b" style={{ borderColor: theme.cardBorder }}>
                    <h3 className="text-2xl font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>System Integrity Check</h3>
                    <span className="px-4 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] opacity-60">Verified {new Date().toLocaleDateString()}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        'PPE Availability', 'Fire Safety Systems', 'Site Access Control',
                        'First Aid Stations', 'Height Safety Gear', 'Electrical Safety'
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-6 rounded-3xl border transition-all hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: `${theme.iconBg}05`, borderColor: theme.cardBorder }}>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-xl shadow-sm">✅</div>
                                <span className="text-xs font-black uppercase tracking-wide opacity-80" style={{ color: theme.textPrimary }}>{item}</span>
                            </div>
                            <FiCheckCircle className="text-emerald-500 text-xl" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


const GlobalSafety = () => {
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <Loader fullScreen message="Loading Safety Protocols..." />;

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <SafetyDashboard />;
            case 'checklists': return <DailyChecklist />;
            case 'incidents': return <IncidentReporting />;
            case 'ppe': return <PPEManager />;
            case 'training': return <TrainingManager />;
            case 'master': return <SafetyMaster />;
            default: return <SafetyDashboard />;
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
                <div>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight flex items-center gap-4" style={{ color: theme.textPrimary }}>
                        <span className="w-2 h-10 rounded-full" style={{ backgroundColor: '#ef4444' }}></span>
                        Safety & Compliance
                    </h2>
                    <p className="text-xs md:text-sm font-bold mt-1 opacity-60 ml-6" style={{ color: theme.textSecondary }}>Real-time Safety Monitoring & Incident Response</p>
                </div>

                {/* Scrollable Tabs Container */}
                <div className="w-full lg:w-auto overflow-x-auto pb-2 -mb-2 hide-scrollbar">
                    <div className="flex gap-2 min-w-max">
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === 'dashboard' ? 'bg-red-600 text-white shadow-lg' : 'bg-white/5 hover:bg-white/10'}`}
                            style={activeTab !== 'dashboard' ? { color: theme.textSecondary } : {}}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('checklists')}
                            className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === 'checklists' ? 'bg-red-600 text-white shadow-lg' : 'bg-white/5 hover:bg-white/10'}`}
                            style={activeTab !== 'checklists' ? { color: theme.textSecondary } : {}}
                        >
                            Checklists
                        </button>
                        <button
                            onClick={() => setActiveTab('incidents')}
                            className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === 'incidents' ? 'bg-red-600 text-white shadow-lg' : 'bg-white/5 hover:bg-white/10'}`}
                            style={activeTab !== 'incidents' ? { color: theme.textSecondary } : {}}
                        >
                            Incidents
                        </button>
                        <button
                            onClick={() => setActiveTab('ppe')}
                            className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === 'ppe' ? 'bg-red-600 text-white shadow-lg' : 'bg-white/5 hover:bg-white/10'}`}
                            style={activeTab !== 'ppe' ? { color: theme.textSecondary } : {}}
                        >
                            PPE
                        </button>
                        <button
                            onClick={() => setActiveTab('training')}
                            className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === 'training' ? 'bg-red-600 text-white shadow-lg' : 'bg-white/5 hover:bg-white/10'}`}
                            style={activeTab !== 'training' ? { color: theme.textSecondary } : {}}
                        >
                            Training
                        </button>
                        <RoleGuard requiredRole="admin" fallback={null}>
                            <button
                                onClick={() => setActiveTab('master')}
                                className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === 'master' ? 'bg-red-600 text-white shadow-lg' : 'bg-white/5 hover:bg-white/10'}`}
                                style={activeTab !== 'master' ? { color: theme.textSecondary } : {}}
                            >
                                <FiSettings className="text-lg" />
                            </button>
                        </RoleGuard>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            {renderContent()}
        </div>
    );
};

export default GlobalSafety;
