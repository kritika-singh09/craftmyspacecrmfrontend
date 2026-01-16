import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';

const AttendanceForm = ({ worker, onSubmit }) => {
    const [formData, setFormData] = useState({
        status: 'Present',
        hours: '8.0',
        notes: ''
    });

    const { theme } = useTheme();

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            workerId: worker.id,
            workerName: worker.name,
            timestamp: new Date().toISOString()
        });
    };

    const statusOptions = [
        { label: 'Present', icon: <FiCheckCircle />, color: 'text-green-500', bg: 'bg-green-50' },
        { label: 'Absent', icon: <FiXCircle />, color: 'text-red-500', bg: 'bg-red-50' },
        { label: 'Late', icon: <FiClock />, color: 'text-yellow-500', bg: 'bg-yellow-50' }
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 rounded-2xl border mb-2" style={{ borderColor: theme.cardBorder, backgroundColor: `${theme.iconBg}05` }}>
                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: theme.textMuted }}>Marking Attendance For</p>
                <p className="text-sm font-black" style={{ color: theme.textPrimary }}>{worker.name}</p>
                <p className="text-[11px] font-bold" style={{ color: theme.textSecondary }}>{worker.role} • {worker.project}</p>
            </div>

            <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Status</label>
                <div className="grid grid-cols-3 gap-3">
                    {statusOptions.map((opt) => (
                        <button
                            key={opt.label}
                            type="button"
                            onClick={() => setFormData({ ...formData, status: opt.label })}
                            className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${formData.status === opt.label
                                    ? 'border-primary ring-4 ring-primary/10'
                                    : 'border-transparent'
                                }`}
                            style={{
                                backgroundColor: formData.status === opt.label ? `${theme.primary}05` : `${theme.iconBg}10`,
                                borderColor: formData.status === opt.label ? theme.primary : 'transparent'
                            }}
                        >
                            <div className={`text-xl mb-2 ${opt.color}`}>{opt.icon}</div>
                            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: theme.textPrimary }}>{opt.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Hours Worked</label>
                <div className="relative">
                    <input
                        type="number"
                        step="0.5"
                        value={formData.hours}
                        onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                        className="w-full px-5 py-3 border rounded-2xl focus:ring-4 outline-none transition-all font-semibold text-sm"
                        style={{ backgroundColor: `${theme.iconBg}10`, borderColor: theme.cardBorder, color: theme.textPrimary }}
                        placeholder="e.g. 8.0"
                        required
                        disabled={formData.status === 'Absent'}
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase tracking-widest opacity-40">Hours</span>
                </div>
            </div>

            <button
                type="submit"
                className="w-full text-white py-3.5 px-6 rounded-2xl font-black uppercase tracking-widest shadow-premium hover:-translate-y-0.5 active:translate-y-0 transition-all"
                style={{ background: theme.gradients.button }}
            >
                Submit Attendance
            </button>
        </form>
    );
};

export default AttendanceForm;
