import { useTheme } from '../../../context/ThemeContext';
import { FiUser, FiBriefcase, FiTarget, FiBarChart2, FiClock, FiCalendar, FiArrowLeft, FiPhone, FiMail } from 'react-icons/fi';

const WorkerProfile = ({ worker, onBack }) => {
    const { theme } = useTheme();

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-4 mb-4">
                <button
                    onClick={onBack}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all border group"
                    style={{ borderColor: theme.cardBorder, color: theme.textSecondary, backgroundColor: theme.cardBg }}
                >
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <div>
                    <h3 className="text-xl font-black" style={{ color: theme.textPrimary }}>{worker.name}</h3>
                    <p className="text-[10px] font-black tracking-widest uppercase" style={{ color: theme.textMuted }}>Personnel ID: WRK-00{worker.id}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="card-premium p-6" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                        <h4 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2" style={{ color: theme.textSecondary }}>
                            <FiUser className="text-primary" style={{ color: theme.primary }} /> Professional Overview
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl border" style={{ borderColor: theme.cardBorder, backgroundColor: theme.background }}>
                                <p className="text-[10px] font-bold uppercase tracking-tight" style={{ color: theme.textMuted }}>Current Designation</p>
                                <p className="text-sm font-bold" style={{ color: theme.textPrimary }}>{worker.role}</p>
                            </div>
                            <div className="p-4 rounded-xl border" style={{ borderColor: theme.cardBorder, backgroundColor: theme.background }}>
                                <p className="text-[10px] font-bold uppercase tracking-tight" style={{ color: theme.textMuted }}>Daily Wage Bracket</p>
                                <p className="text-sm font-black" style={{ color: theme.primary }}>₹{worker.wage}</p>
                            </div>
                            <div className="p-4 rounded-xl border" style={{ borderColor: theme.cardBorder, backgroundColor: theme.background }}>
                                <p className="text-[10px] font-bold uppercase tracking-tight" style={{ color: theme.textMuted }}>Active Project</p>
                                <p className="text-sm font-bold" style={{ color: theme.textPrimary }}>{worker.project}</p>
                            </div>
                            <div className="p-4 rounded-xl border" style={{ borderColor: theme.cardBorder, backgroundColor: theme.background }}>
                                <p className="text-[10px] font-bold uppercase tracking-tight" style={{ color: theme.textMuted }}>Joined Date</p>
                                <p className="text-sm font-bold" style={{ color: theme.textPrimary }}>Jan 20, 2024</p>
                            </div>
                        </div>
                    </div>

                    <div className="card-premium p-6" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                        <h4 className="text-xs font-black uppercase tracking-widest mb-6" style={{ color: theme.textSecondary }}>Skills & Certifications</h4>
                        <div className="flex flex-wrap gap-2">
                            {['Safety Certified', 'Heavy Equipment Ops', 'Blueprint Reading', 'Team Leadership'].map((skill) => (
                                <span
                                    key={skill}
                                    className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border"
                                    style={{ backgroundColor: `${theme.primary}05`, borderColor: `${theme.primary}20`, color: theme.primary }}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="card-premium p-6" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                        <h4 className="text-xs font-black uppercase tracking-widest mb-6" style={{ color: theme.textSecondary }}>Contact Details</h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <FiPhone className="opacity-40" />
                                <p className="text-sm font-bold" style={{ color: theme.textPrimary }}>+91 99887 76655</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <FiMail className="opacity-40" />
                                <p className="text-sm font-bold" style={{ color: theme.textPrimary }}>worker_{worker.id}@crm.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="card-premium p-6" style={{ backgroundColor: theme.background, borderColor: theme.cardBorder }}>
                        <h4 className="text-xs font-black uppercase tracking-widest mb-6" style={{ color: theme.textSecondary }}>Performance</h4>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-1">
                                    <span style={{ color: theme.textMuted }}>Quality</span>
                                    <span style={{ color: theme.primary }}>94%</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: '94%', background: theme.gradients.primary }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-1">
                                    <span style={{ color: theme.textMuted }}>Punctuality</span>
                                    <span style={{ color: theme.primary }}>88%</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: '88%', background: theme.gradients.primary }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkerProfile;
