import React, { useState } from 'react';
import { FiTrendingUp, FiClock, FiActivity, FiArrowRight } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

const DesignProgress = () => {
    const { theme } = useTheme();
    const [phases, setPhases] = useState([
        { name: 'Concept Design', progress: 100, hours: '120h', delay: '0d', status: 'Completed' },
        { name: 'Schematic Design', progress: 100, hours: '180h', delay: '2d', status: 'Completed' },
        { name: 'Design Development', progress: 65, hours: '240h', delay: '0d', status: 'Ongoing' },
        { name: 'Working Drawings', progress: 0, hours: '0h', delay: '0d', status: 'Upcoming' },
    ]);

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tight" style={{ color: theme.textPrimary }}>
                        Design <span style={{ color: theme.secondary }}>Progress</span>
                    </h1>
                    <p className="mt-2 font-medium tracking-wide" style={{ color: theme.textSecondary }}>
                        Detailed analytics on time spent, phase completion, and delivery performance.
                    </p>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 rounded-2xl border font-black text-[10px] uppercase tracking-widest"
                    style={{
                        backgroundColor: `${theme.primary}05`,
                        borderColor: theme.cardBorder,
                        color: theme.primary
                    }}
                >
                    <FiTrendingUp className="text-lg" /> Overall: 68%
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-8">
                    {phases.map((p, i) => (
                        <div key={i} className="p-8 rounded-[2.5rem] shadow-premium border relative overflow-hidden group transition-all duration-500 hover:shadow-premium-xl"
                            style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>{p.name}</h3>
                                    <p className={`text-[10px] font-black uppercase tracking-widest mt-1`}
                                        style={{
                                            color: p.status === 'Completed' ? theme.success : p.status === 'Ongoing' ? theme.primary : theme.textSecondary
                                        }}
                                    >
                                        {p.status}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-black" style={{ color: theme.primary }}>{p.progress}%</p>
                                    {p.delay !== '0d' && <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: theme.error }}>Delay: {p.delay}</span>}
                                </div>
                            </div>

                            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${theme.primary}10` }}>
                                <div className="h-full transition-all duration-1000"
                                    style={{
                                        width: `${p.progress}%`,
                                        background: theme.gradients.progress
                                    }}
                                ></div>
                            </div>

                            <div className="mt-8 pt-6 border-t flex justify-between items-center" style={{ borderColor: theme.cardBorder }}>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <FiClock className="text-sm" style={{ color: theme.primary }} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: theme.textSecondary }}>Logged: {p.hours}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FiActivity className="text-sm" style={{ color: theme.success }} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: theme.textSecondary }}>Productivity: High</span>
                                    </div>
                                </div>
                                <FiArrowRight className="group-hover:translate-x-2 transition-transform" style={{ color: theme.primary }} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-10">
                    <div className="p-12 rounded-[3.5rem] shadow-brand-xl text-white relative overflow-hidden h-full flex flex-col justify-center"
                        style={{ background: theme.gradients.primary }}
                    >
                        <div className="absolute top-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full -mr-40 -mt-40 blur-3xl animate-pulse"></div>
                        <h4 className="text-3xl font-black tracking-tight mb-4 uppercase tracking-wide">Analysis Mode</h4>
                        <p className="font-medium opacity-80 leading-relaxed mb-10">
                            Based on current progress, the "Design Development" phase is projected to finish 3 days ahead of schedule. "Working Drawings" can begin on Jan 22nd.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-6 bg-white/10 rounded-3xl border border-white/10">
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Avg Time / Rev</p>
                                <h5 className="text-3xl font-black mt-1">4.2h</h5>
                            </div>
                            <div className="p-6 bg-white/10 rounded-3xl border border-white/10">
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Efficiency</p>
                                <h5 className="text-3xl font-black mt-1">+12%</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesignProgress;
