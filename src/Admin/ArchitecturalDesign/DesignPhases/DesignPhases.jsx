import React, { useState } from 'react';
import { FiCheckCircle, FiClock, FiPlayCircle, FiPauseCircle, FiTrendingUp } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

const DesignPhases = () => {
    const { theme } = useTheme();
    const [phases, setPhases] = useState([
        { id: 1, name: 'Concept Design', status: 'Completed', progress: 100, color: 'brand' },
        { id: 2, name: 'Schematic Design', status: 'In Progress', progress: 75, color: 'indigo' },
        { id: 3, name: 'Design Development', status: 'Upcoming', progress: 0, color: 'emerald' },
        { id: 4, name: 'Working Drawings', status: 'Upcoming', progress: 0, color: 'teal' },
        { id: 5, name: 'Authority Approval', status: 'Upcoming', progress: 0, color: 'blue' },
        { id: 6, name: 'Construction Support', status: 'Upcoming', progress: 0, color: 'purple' },
    ]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Completed': return <FiCheckCircle />;
            case 'In Progress': return <FiPlayCircle className="animate-pulse" />;
            default: return <FiClock className="opacity-40" />;
        }
    };

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black tracking-tight uppercase tracking-wide" style={{ color: theme.textPrimary }}>
                        Design <span style={{ color: theme.secondary }}>Phases</span>
                    </h1>
                    <p className="mt-2 font-medium" style={{ color: theme.textSecondary }}>
                        Standardized architectural workflow from concept to construction support.
                    </p>
                </div>
                <button
                    className="px-8 py-4 border rounded-2xl font-black text-xs uppercase tracking-widest shadow-premium hover:shadow-premium-xl transition-all"
                    style={{
                        backgroundColor: theme.cardBg,
                        borderColor: theme.cardBorder,
                        color: theme.primary
                    }}
                >
                    Configure Templates
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {phases.map((phase) => (
                    <div key={phase.id} className="group relative p-10 rounded-[3rem] shadow-premium border transition-all hover:-translate-y-2 duration-500"
                        style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
                    >
                        <div className="flex justify-between items-center mb-8">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-all duration-500"
                                style={{
                                    backgroundColor: `${theme.primary}10`,
                                    color: theme.primary
                                }}
                            >
                                {getStatusIcon(phase.status)}
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest`}
                                style={{ color: phase.status === 'In Progress' ? theme.primary : theme.textPrimary }}
                            >
                                {phase.status}
                            </span>
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tight mb-6" style={{ color: theme.textPrimary }}>{phase.name}</h3>

                        <div className="space-y-3">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest" style={{ color: theme.textSecondary }}>
                                <span>Phase Progress</span>
                                <span>{phase.progress}%</span>
                            </div>
                            <div className="h-2.5 rounded-full overflow-hidden p-0.5 shadow-inner" style={{ backgroundColor: `${theme.primary}10` }}>
                                <div className="h-full rounded-full transition-all duration-1000"
                                    style={{
                                        width: `${phase.progress}%`,
                                        background: theme.gradients.progress
                                    }}
                                ></div>
                            </div>
                        </div>

                        <button className="w-full mt-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-white"
                            style={{
                                backgroundColor: `${theme.primary}05`,
                                color: theme.primary
                            }}
                            onMouseOver={(e) => e.target.style.background = theme.primary}
                            onMouseOut={(e) => e.target.style.background = `${theme.primary}05`}
                        >
                            Manage Deliverables
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DesignPhases;
