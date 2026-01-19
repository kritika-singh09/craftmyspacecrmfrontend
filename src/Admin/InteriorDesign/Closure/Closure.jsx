import React, { useState } from 'react';
import { FiCheckSquare, FiAward, FiCreditCard, FiArrowRight, FiActivity, FiCheck } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

const IntClosure = () => {
    const { theme } = useTheme();
    const [checklist, setChecklist] = useState([
        { item: 'Mood Board & 3D Approval Cycle', status: 'Completed', date: 'Jan 10' },
        { item: 'Site Execution Work Logs', status: 'Completed', date: 'Jan 12' },
        { item: 'Final Install Check (Furniture/Decor)', status: 'Pending', date: '-' },
        { item: 'All Vendor Payments Settled', status: 'In Progress', date: '-' },
        { item: 'Warranty Documents Share (Materials)', status: 'Pending', date: '-' },
        { item: 'Professional Photoshoot & Review', status: 'Upcoming', date: '-' },
    ]);

    const handleCompleteTask = (index) => {
        const updatedChecklist = [...checklist];
        updatedChecklist[index].status = 'Completed';
        updatedChecklist[index].date = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
        setChecklist(updatedChecklist);
    };

    const isProjectReady = checklist.every(item => item.status === 'Completed');

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-12 animate-in zoom-in-95 duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight uppercase" style={{ color: theme.textPrimary }}>
                        Project <span style={{ color: theme.secondary }}>Handover</span>
                    </h1>
                    <p className="mt-2 font-medium tracking-wide" style={{ color: theme.textSecondary }}>
                        Final inspection, payment clearance, and warranty dissemination.
                    </p>
                </div>
                <button
                    disabled={!isProjectReady}
                    className={`flex items-center gap-3 px-8 py-4 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg transition-all ${isProjectReady ? 'hover:scale-105 opacity-100' : 'opacity-50 cursor-not-allowed'}`}
                    style={{ background: isProjectReady ? '#10b981' : theme.textMuted }}
                >
                    <FiAward className="text-lg" /> Close Project
                </button>
            </div>

            <div className="p-10 rounded-[4rem] shadow-premium border" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                <h4 className="text-xl font-black uppercase tracking-tight mb-8 underline decoration-8 underline-offset-8" style={{ color: theme.textPrimary, textDecorationColor: theme.secondary }}>Departure Checklist</h4>
                <div className="space-y-4">
                    {checklist.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-6 rounded-3xl border transition-colors group hover:shadow-md"
                            style={{
                                backgroundColor: item.status === 'Completed' ? `${theme.primary}05` : `${theme.iconBg}05`,
                                borderColor: theme.cardBorder
                            }}
                        >
                            <div className="flex items-center gap-6">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${item.status === 'Completed' ? 'bg-emerald-500 border-emerald-500 text-white' :
                                    'border-gray-300 text-transparent'
                                    }`}>
                                    <FiCheckSquare />
                                </div>
                                <div>
                                    <p className={`text-sm font-black uppercase tracking-tight transition-colors ${item.status === 'Completed' ? 'line-through opacity-50' : ''}`}
                                        style={{ color: theme.textPrimary }}
                                    >{item.item}</p>
                                    <p className="text-[10px] font-bold opacity-60 uppercase" style={{ color: theme.textSecondary }}>{item.date !== '-' ? `Finalized on ${item.date}` : `Status: ${item.status}`}</p>
                                </div>
                            </div>
                            {item.status !== 'Completed' && (
                                <button onClick={() => handleCompleteTask(i)} className="text-[9px] font-black uppercase tracking-widest hover:underline" style={{ color: theme.secondary }}>
                                    Complete Task
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-[3rem] border shadow-premium" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                    <div className="flex items-center gap-4 mb-6">
                        <FiCreditCard className="text-3xl" style={{ color: theme.secondary }} />
                        <h4 className="text-lg font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>Final Settlement</h4>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold uppercase" style={{ color: theme.textPrimary }}>Total Clearance</span>
                        <span className="text-xl font-black text-emerald-600">₹8.4 L</span>
                    </div>
                    <button className="w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:text-white"
                        style={{ backgroundColor: `${theme.primary}10`, color: theme.primary }}
                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = theme.primary; e.currentTarget.style.color = '#fff'; }}
                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = `${theme.primary}10`; e.currentTarget.style.color = theme.primary; }}
                    >
                        Verify Receipts
                    </button>
                </div>

                <div className="p-8 rounded-[3rem] border shadow-premium" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                    <div className="flex items-center gap-4 mb-6">
                        <FiActivity className="text-3xl" style={{ color: theme.secondary }} />
                        <h4 className="text-lg font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>Post-Handover</h4>
                    </div>
                    <p className="text-xs font-medium italic mb-6" style={{ color: theme.textSecondary }}>"Setup 6-month maintenance check for plumbing and modular kitchen fittings."</p>
                    <button className="w-full py-3 border rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:text-white"
                        style={{ borderColor: theme.cardBorder, color: theme.secondary }}
                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = theme.secondary; e.currentTarget.style.color = '#fff'; }}
                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = theme.secondary; }}
                    >
                        Schedule Maintenance
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IntClosure;
