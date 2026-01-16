import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { FiAlertTriangle, FiShield, FiTrendingUp, FiCheckCircle, FiInfo } from 'react-icons/fi';

const RiskManagement = () => {
    const { theme } = useTheme();

    const [risks, setRisks] = useState([
        { id: 'RSK-001', category: 'Operational', impact: 'High', probability: 'Medium', status: 'Mitigated', title: 'Delayed material delivery due to monsoon', owner: 'Project Manager', mitigation: 'Buffer stock maintained for critical items' },
        { id: 'RSK-002', category: 'Safety', impact: 'Critical', probability: 'Low', status: 'Active', title: 'Working at height hazards - Tower Crane', owner: 'Safety Officer', mitigation: 'Double-harness enforcement & daily inspection' },
        { id: 'RSK-003', category: 'Financial', impact: 'Medium', probability: 'High', status: 'Active', title: 'Fluctuation in steel prices', owner: 'Procurement', mitigation: 'Fixed price contract with vendor for 6 months' }
    ]);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Mitigated': return 'bg-green-50 text-green-700 border-green-200';
            case 'Active': return 'bg-red-50 text-red-700 border-red-200';
            default: return 'bg-slate-50 text-slate-700 border-slate-200';
        }
    };

    const getImpactColor = (impact) => {
        switch (impact) {
            case 'Critical': return 'text-red-600 font-black';
            case 'High': return 'text-orange-600 font-black';
            case 'Medium': return 'text-yellow-600 font-black';
            default: return 'text-blue-600 font-black';
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: theme.textPrimary }}>Risk Management</h2>
                    <p className="text-sm font-medium mt-1" style={{ color: theme.textSecondary }}>Identify, Assess & Mitigate Project Threats</p>
                </div>
                <button
                    className="group flex items-center gap-2 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-premium transition-all hover:-translate-y-0.5"
                    style={{ background: theme.gradients.button }}
                >
                    <span className="text-xl leading-none group-hover:rotate-45 transition-transform">+</span>
                    Add Risk Entry
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card-premium p-6" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                            <FiAlertTriangle size={20} />
                        </div>
                        <span className="text-[10px] font-black uppercase text-red-600">Action Required</span>
                    </div>
                    <h5 className="text-2xl font-black" style={{ color: theme.textPrimary }}>02</h5>
                    <p className="text-[10px] font-black uppercase tracking-widest mt-1" style={{ color: theme.textMuted }}>Critical/Active Risks</p>
                </div>
                <div className="card-premium p-6" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                            <FiShield size={20} />
                        </div>
                        <span className="text-[10px] font-black uppercase text-green-600">Resilient</span>
                    </div>
                    <h5 className="text-2xl font-black" style={{ color: theme.textPrimary }}>14</h5>
                    <p className="text-[10px] font-black uppercase tracking-widest mt-1" style={{ color: theme.textMuted }}>Successfully Mitigated</p>
                </div>
                <div className="card-premium p-6" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                            <FiTrendingUp size={20} />
                        </div>
                        <span className="text-[10px] font-black uppercase text-blue-600">Forecast</span>
                    </div>
                    <h5 className="text-2xl font-black" style={{ color: theme.textPrimary }}>7.4</h5>
                    <p className="text-[10px] font-black uppercase tracking-widest mt-1" style={{ color: theme.textMuted }}>Avg Risk Score</p>
                </div>
            </div>

            <div className="card-premium overflow-hidden shadow-xl" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                <div className="p-8 border-b flex justify-between items-center" style={{ borderColor: theme.cardBorder, backgroundColor: `${theme.iconBg}05` }}>
                    <h3 className="text-xl font-black" style={{ color: theme.textPrimary }}>Enterprise Risk Register</h3>
                    <div className="flex gap-2">
                        <div className="flex p-1 rounded-xl border bg-white" style={{ borderColor: theme.cardBorder }}>
                            <button className="px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest bg-slate-900 text-white shadow-brand-sm">All Risks</button>
                            <button className="px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">By Impact</button>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b" style={{ backgroundColor: `${theme.iconBg}15`, borderColor: theme.cardBorder }}>
                                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Risk ID / Category</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Threat Description</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Assessment (PxI)</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Mitigation Strategy</th>
                                <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.textSecondary }}>Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y" style={{ divideColor: theme.cardBorder }}>
                            {risks.map((risk) => (
                                <tr key={risk.id} className="group transition-colors hover:bg-slate-50/50" style={{ backgroundColor: theme.cardBg }}>
                                    <td className="px-8 py-6">
                                        <p className="font-bold" style={{ color: theme.textPrimary }}>{risk.id}</p>
                                        <p className="text-[10px] font-black uppercase tracking-tight opacity-60" style={{ color: theme.textSecondary }}>{risk.category}</p>
                                    </td>
                                    <td className="px-8 py-6 max-w-xs">
                                        <p className="text-sm font-bold leading-normal" style={{ color: theme.textPrimary }}>{risk.title}</p>
                                        <p className="text-[10px] font-bold mt-1" style={{ color: theme.textMuted }}>Owner: {risk.owner}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[11px] ${getImpactColor(risk.impact)} uppercase`}>{risk.impact}</span>
                                            <span className="text-[11px] font-black text-slate-300 opacity-60">Impact</span>
                                        </div>
                                        <p className="text-[10px] font-black uppercase opacity-60" style={{ color: theme.textSecondary }}>{risk.probability} Probability</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-start gap-2 p-3 rounded-xl border border-dashed hover:border-solid transition-all cursor-help" style={{ borderColor: theme.cardBorder, backgroundColor: `${theme.iconBg}03` }}>
                                            <FiShield className="mt-0.5 text-blue-500" size={14} />
                                            <p className="text-[11px] font-medium leading-relaxed" style={{ color: theme.textPrimary }}>{risk.mitigation}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex flex-col items-end gap-2">
                                            <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border rounded-xl shadow-sm ${getStatusStyle(risk.status)}`}>
                                                {risk.status}
                                            </span>
                                            {risk.status === 'Mitigated' && <FiCheckCircle className="text-green-500" size={14} />}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="card-premium p-8 flex items-center gap-6" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white flex-shrink-0 animate-pulse">
                    <FiInfo size={24} />
                </div>
                <div>
                    <h4 className="font-black leading-tight" style={{ color: theme.textPrimary }}>Risk Assessment Notice</h4>
                    <p className="text-xs font-medium mt-1 opacity-70" style={{ color: theme.textSecondary }}>
                        Heat-map visualization and automated risk threshold alerts will be integrated with the next data sync.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RiskManagement;
