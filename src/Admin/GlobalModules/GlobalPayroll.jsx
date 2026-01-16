import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import {
    FiUsers, FiCalendar, FiDollarSign, FiSearch,
    FiPlus, FiMoreVertical, FiCheckCircle, FiTrash2,
    FiDownload, FiArrowRight, FiInfo, FiEdit3, FiSave
} from 'react-icons/fi';

const GlobalPayroll = () => {
    const { theme } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('January 2026');

    // Total Manual Staff Data
    const [staffList, setStaffList] = useState([
        {
            id: 'CORP-001', name: 'Amit Sharma', dept: 'Operations',
            baseSalary: 85000, attendance: 24, otHours: 8, bonus: 5000, deductions: 2500,
            remarks: '', isPaid: false
        },
        {
            id: 'CORP-002', name: 'Zoya Khan', dept: 'Operations',
            baseSalary: 62000, attendance: 26, otHours: 0, bonus: 0, deductions: 0,
            remarks: 'Perfect attendance', isPaid: false
        },
        {
            id: 'CORP-012', name: 'Rahul Gupta', dept: 'Finance',
            baseSalary: 75000, attendance: 22, otHours: 4, bonus: 2000, deductions: 4500,
            remarks: 'Loss of pay for 4 days', isPaid: false
        },
        {
            id: 'CORP-022', name: 'Vikram Singh', dept: 'Administration',
            baseSalary: 45000, attendance: 25, otHours: 12, bonus: 1500, deductions: 500,
            remarks: 'OT champion', isPaid: true
        }
    ]);

    const handleUpdate = (id, field, value) => {
        setStaffList(prev => prev.map(staff => {
            if (staff.id === id) {
                return { ...staff, [field]: value };
            }
            return staff;
        }));
    };

    const calculateNet = (staff) => {
        // Simple Manual-First Math: (Base / 30 * Attendance) + OT + Bonus - Deductions
        const perDay = staff.baseSalary / 30;
        const otPay = staff.otHours * (perDay / 8 * 1.5);
        const net = (perDay * staff.attendance) + otPay + Number(staff.bonus || 0) - Number(staff.deductions || 0);
        return Math.round(net);
    };

    const filteredStaff = staffList.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.dept.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalCompanyPayout = useMemo(() => {
        return staffList.reduce((acc, s) => acc + calculateNet(s), 0);
    }, [staffList]);

    return (
        <div className="space-y-8 pb-12 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tight flex items-center gap-3" style={{ color: theme.textPrimary }}>
                        <span className="w-1.5 h-8 rounded-full" style={{ backgroundColor: theme.primary }}></span>
                        Manual Payroll Hub
                    </h2>
                    <p className="text-[10px] font-black mt-1 opacity-50 uppercase tracking-widest" style={{ color: theme.textSecondary }}>Direct Entry • Manual Overrides • Total Control</p>
                </div>
                <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-2xl border border-slate-200 dark:border-white/5">
                    <button className="px-6 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest shadow-sm" style={{ color: theme.primary }}>{selectedMonth}</button>
                </div>
            </div>

            {/* Quick Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card-premium p-6 border-none ring-1 ring-slate-100 dark:ring-slate-800 shadow-sm" style={{ backgroundColor: theme.cardBg }}>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Monthly Disbursement</p>
                    <p className="text-2xl font-black tracking-tight mt-1" style={{ color: theme.textPrimary }}>₹{totalCompanyPayout.toLocaleString()}</p>
                </div>
                <div className="card-premium p-6 border-none ring-1 ring-slate-100 dark:ring-slate-800 shadow-sm" style={{ backgroundColor: theme.cardBg }}>
                    <p className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Paid Staff</p>
                    <p className="text-2xl font-black tracking-tight mt-1" style={{ color: theme.textPrimary }}>{staffList.filter(s => s.isPaid).length} / {staffList.length}</p>
                </div>
                <div className="card-premium p-6 border-none ring-1 ring-slate-100 dark:ring-slate-800 shadow-sm" style={{ backgroundColor: theme.cardBg }}>
                    <p className="text-[9px] font-black uppercase tracking-widest text-brand-600">Pending Actions</p>
                    <p className="text-2xl font-black tracking-tight mt-1" style={{ color: theme.textPrimary }}>{staffList.filter(s => !s.isPaid).length} Staff</p>
                </div>
            </div>

            {/* Manual Entry Ledger */}
            <div className="card-premium overflow-hidden border-none ring-1 ring-slate-100 dark:ring-slate-800 shadow-soft" style={{ backgroundColor: theme.cardBg }}>
                <div className="p-8 border-b border-slate-50 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:max-w-md">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                        <input
                            type="text"
                            placeholder="Find person or department..."
                            className="w-full h-11 pl-11 pr-4 bg-slate-50 dark:bg-white/5 rounded-xl text-xs font-bold outline-none border border-transparent focus:border-brand-500/30 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="px-6 py-2.5 bg-brand-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
                        <FiDownload /> Export Verified Sheet
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                                <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-slate-400">Staff Member</th>
                                <th className="px-6 py-5 text-center text-[9px] font-black uppercase tracking-widest text-slate-400">Attendance (Days)</th>
                                <th className="px-6 py-5 text-center text-[9px] font-black uppercase tracking-widest text-slate-400">OT (Hours)</th>
                                <th className="px-6 py-5 text-center text-[9px] font-black uppercase tracking-widest text-slate-400">Bonus</th>
                                <th className="px-6 py-5 text-center text-[9px] font-black uppercase tracking-widest text-slate-400">Deductions</th>
                                <th className="px-6 py-5 text-right text-[9px] font-black uppercase tracking-widest text-slate-400">Net Payable</th>
                                <th className="px-8 py-5 text-right text-[9px] font-black uppercase tracking-widest text-slate-400">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                            {filteredStaff.map(s => (
                                <tr key={s.id} className="hover:bg-slate-50/30 dark:hover:bg-white/5 transition-all">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-xs font-black text-slate-300">
                                                {s.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm" style={{ color: theme.textPrimary }}>{s.name}</p>
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{s.dept} • {s.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        <input
                                            type="number"
                                            value={s.attendance}
                                            onChange={(e) => handleUpdate(s.id, 'attendance', Number(e.target.value))}
                                            className="w-20 h-10 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-lg text-center text-xs font-black outline-none focus:border-brand-500/50"
                                            style={{ color: theme.textPrimary }}
                                        />
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        <input
                                            type="number"
                                            value={s.otHours}
                                            onChange={(e) => handleUpdate(s.id, 'otHours', Number(e.target.value))}
                                            className="w-20 h-10 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-lg text-center text-xs font-black outline-none focus:border-brand-500/50"
                                            style={{ color: theme.textPrimary }}
                                        />
                                    </td>
                                    <td className="px-6 py-6 text-center font-black">
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">₹</span>
                                            <input
                                                type="number"
                                                value={s.bonus}
                                                onChange={(e) => handleUpdate(s.id, 'bonus', Number(e.target.value))}
                                                className="w-28 h-10 pl-6 bg-emerald-500/5 border border-emerald-500/10 rounded-lg text-center text-xs font-black outline-none text-emerald-600 focus:border-emerald-500/50"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">₹</span>
                                            <input
                                                type="number"
                                                value={s.deductions}
                                                onChange={(e) => handleUpdate(s.id, 'deductions', Number(e.target.value))}
                                                className="w-28 h-10 pl-6 bg-rose-500/5 border border-rose-500/10 rounded-lg text-center text-xs font-black outline-none text-rose-500 focus:border-rose-500/50"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 text-right">
                                        <p className="text-lg font-black tracking-tight" style={{ color: theme.primary }}>₹{calculateNet(s).toLocaleString()}</p>
                                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Final Gross</p>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button
                                            onClick={() => handleUpdate(s.id, 'isPaid', !s.isPaid)}
                                            className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${s.isPaid
                                                ? 'bg-emerald-500 text-white shadow-emerald-200'
                                                : 'bg-slate-100 dark:bg-white/5 text-slate-400 hover:bg-slate-200'
                                                }`}
                                        >
                                            {s.isPaid ? 'Paid' : 'Pending'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bottom Remarks Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card-premium p-8 border-none ring-1 ring-slate-100 dark:ring-slate-800" style={{ backgroundColor: theme.cardBg }}>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2"><FiInfo /> Manual Adjustment Logic</h4>
                    <ul className="space-y-4">
                        <li className="flex gap-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0"></div>
                            <p className="text-xs font-medium text-slate-500 leading-relaxed">Net calculation is based on <span className="font-bold text-slate-800 dark:text-slate-300">(Base / 30 × Attendance) + OT + Bonus - Deductions</span>. Every field is manually editable.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0"></div>
                            <p className="text-xs font-medium text-slate-500 leading-relaxed">Use the <span className="font-bold text-rose-500">Deductions</span> field to manually apply any fines, advance repayments, or custom paycuts.</p>
                        </li>
                    </ul>
                </div>

                <div className="p-10 rounded-[2.5rem] bg-brand-600 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
                    <div className="z-10">
                        <h4 className="text-2xl font-black text-white uppercase tracking-tight">Finalized for Month?</h4>
                        <p className="text-sm font-bold text-white/60 mt-2">Finish manual entries to prepare the global disbursement batch.</p>
                    </div>
                    <button className="z-10 px-12 py-5 bg-white text-brand-600 rounded-[1.5rem] text-xs font-black uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all">
                        Process Disbursement
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GlobalPayroll;
