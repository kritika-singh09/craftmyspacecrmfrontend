import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import {
    FiUsers, FiUserPlus, FiSearch, FiEdit3,
    FiPhone, FiMail, FiBriefcase, FiDollarSign,
    FiSettings, FiMoreVertical, FiCalendar, FiTrash2, FiX, FiSave,
    FiArrowLeft, FiArrowRight
} from 'react-icons/fi';

const GlobalWorkforce = () => {
    const { theme } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState(null);
    const [selectedCalendarStaff, setSelectedCalendarStaff] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [viewDate, setViewDate] = useState(new Date()); // Tracks current calendar month/year view
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [payrollConfig, setPayrollConfig] = useState({
        calculationMode: 'Calendar', // 'Calendar', 'Fixed30', 'Fixed26'
        paidLeavesPerMonth: 2,
        halfDayDeduction: 0.5
    });

    const [staffData, setStaffData] = useState([
        {
            id: 'CORP-001', name: 'Amit Sharma', role: 'Operations Head', dept: 'Operations',
            status: 'Active', email: 'amit@company.com', phone: '+91 98765-43210',
            salary: 85000, joined: 'Jan 2022',
            registers: {
                '2026-0': Array(31).fill('P'),
                '2025-11': Array(31).fill('P').map((p, i) => i % 10 === 0 ? 'A' : 'P') // Some history
            }
        },
        {
            id: 'CORP-005', name: 'Priya Verma', role: 'HR Manager', dept: 'Human Resources',
            status: 'Active', email: 'priya@company.com', phone: '+91 98765-43215',
            salary: 65000, joined: 'Mar 2022',
            registers: {
                '2026-0': Array(31).fill('P'),
                '2025-11': Array(31).fill('P')
            }
        },
        {
            id: 'CORP-012', name: 'Rahul Gupta', role: 'Finance Controller', dept: 'Finance',
            status: 'On Leave', email: 'rahul@company.com', phone: '+91 98765-43222',
            salary: 75000, joined: 'Jun 2022',
            registers: {
                '2026-0': Array(31).fill('P'),
                '2025-11': Array(31).fill('P').map((p, i) => i % 5 === 0 ? 'HD' : 'P')
            }
        }
    ]);

    const getCalendarData = (year, month) => {
        const firstDay = new Date(year, month, 1).getDay(); // 0(Sun) to 6(Sat)
        // Convert to Mon=0...Sun=6 for our grid
        const startOffset = firstDay === 0 ? 6 : firstDay - 1;
        const totalDays = new Date(year, month + 1, 0).getDate();
        return { startOffset, totalDays };
    };

    const toggleCalendarStatus = (dayIndex) => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const key = `${year}-${month}`;

        setStaffData(prev => prev.map(staff => {
            if (staff.id === selectedCalendarStaff.id) {
                const currentRegisters = { ...staff.registers };
                if (!currentRegisters[key]) {
                    const { totalDays } = getCalendarData(year, month);
                    currentRegisters[key] = Array(totalDays).fill('P');
                }
                const newReg = [...currentRegisters[key]];
                const cycle = { 'P': 'A', 'A': 'HD', 'HD': 'L', 'L': 'P' };
                newReg[dayIndex] = cycle[newReg[dayIndex]];
                currentRegisters[key] = newReg;

                const updatedStaff = { ...staff, registers: currentRegisters };
                setSelectedCalendarStaff(updatedStaff);
                return updatedStaff;
            }
            return staff;
        }));
    };

    const changeMonth = (offset) => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
    };

    const handleEdit = (staff) => {
        setEditingStaff({ ...staff });
        setIsEditModalOpen(true);
    };

    const handleSave = () => {
        setStaffData(staffData.map(s => s.id === editingStaff.id ? editingStaff : s));
        setIsEditModalOpen(false);
    };

    const filteredStaff = staffData.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.dept.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-12 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tight flex items-center gap-3" style={{ color: theme.textPrimary }}>
                        <span className="w-1.5 h-8 rounded-full" style={{ backgroundColor: theme.primary }}></span>
                        Staff Directory
                    </h2>
                    <p className="text-[10px] font-black mt-1 opacity-50 uppercase tracking-widest" style={{ color: theme.textSecondary }}>Manage Personnel & Base Salaries Manually</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsSettingsModalOpen(true)}
                        className="h-14 px-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-slate-400 hover:text-brand-600 transition-all flex items-center gap-3"
                    >
                        <FiSettings size={18} />
                    </button>
                    <button className="h-14 px-8 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3" style={{ background: theme.gradients.button }}>
                        <FiUserPlus size={18} /> Add New Staff
                    </button>
                </div>
            </div>

            {/* Quick Directory Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <div className="md:col-span-2 relative">
                    <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-lg text-slate-300" />
                    <input
                        type="text"
                        placeholder="Search by name, role, or ID..."
                        className="w-full h-14 pl-14 pr-6 rounded-2xl card-premium border-none ring-1 ring-slate-100 dark:ring-slate-800 outline-none font-bold text-sm"
                        style={{ backgroundColor: theme.cardBg, color: theme.textPrimary }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="card-premium h-14 flex items-center justify-center border-none ring-1 ring-slate-100 dark:ring-slate-800" style={{ backgroundColor: theme.cardBg }}>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Total Active Staff: {staffData.length}</p>
                </div>
            </div>

            {/* Staff Cards - Simplified */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredStaff.map(staff => (
                    <div key={staff.id} className="card-premium p-8 group border-none ring-1 ring-slate-100 dark:ring-slate-800 hover:shadow-2xl transition-all relative overflow-hidden" style={{ backgroundColor: theme.cardBg }}>
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-2xl font-black text-slate-300 border border-slate-100 dark:border-white/5">
                                {staff.name.charAt(0)}
                            </div>
                            <button
                                onClick={() => handleEdit(staff)}
                                className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-brand-600 transition-colors"
                            >
                                <FiEdit3 size={18} />
                            </button>
                        </div>

                        <div className="space-y-1 mb-8">
                            <h3 className="text-xl font-black tracking-tight" style={{ color: theme.textPrimary }}>{staff.name}</h3>
                            <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest">{staff.role} • {staff.dept}</p>
                        </div>

                        <div className="space-y-4 pt-6 border-t border-slate-50 dark:border-white/5">
                            <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                                <FiMail className="shrink-0" /> {staff.email}
                            </div>
                            <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                                <FiPhone className="shrink-0" /> {staff.phone}
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Salary</span>
                                <span className="text-lg font-black tracking-tight" style={{ color: theme.textPrimary }}>₹{staff.salary.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={() => { setSelectedCalendarStaff(staff); setIsCalendarModalOpen(true); }}
                                className="flex-1 h-12 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-600 hover:border-brand-600/30 transition-all flex items-center justify-center gap-2"
                            >
                                <FiCalendar /> Monthly Attendance
                            </button>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full h-1" style={{ background: theme.gradients.button, opacity: 0, transition: 'opacity 0.3s' }}></div>
                        <style>{` .group:hover > div:last-child { opacity: 1 !important; } `}</style>
                    </div>
                ))}
            </div>

            {/* Simple Edit Modal */}
            {isEditModalOpen && editingStaff && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="w-full max-w-lg bg-white dark:bg-slate-950 rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-white/10 p-10">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>Edit Personnel</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><FiX size={24} /></button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Full Name</label>
                                <input
                                    type="text"
                                    value={editingStaff.name}
                                    onChange={(e) => setEditingStaff({ ...editingStaff, name: e.target.value })}
                                    className="w-full h-14 px-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 font-bold outline-none focus:border-brand-500/50"
                                    style={{ color: theme.textPrimary }}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Department</label>
                                    <input
                                        type="text"
                                        value={editingStaff.dept}
                                        onChange={(e) => setEditingStaff({ ...editingStaff, dept: e.target.value })}
                                        className="w-full h-14 px-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 font-bold outline-none focus:border-brand-500/50"
                                        style={{ color: theme.textPrimary }}
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Base Salary</label>
                                    <input
                                        type="number"
                                        value={editingStaff.salary}
                                        onChange={(e) => setEditingStaff({ ...editingStaff, salary: Number(e.target.value) })}
                                        className="w-full h-14 px-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 font-bold outline-none focus:border-brand-500/50"
                                        style={{ color: theme.textPrimary }}
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleSave}
                                className="w-full h-16 bg-brand-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all mt-4 flex items-center justify-center gap-3"
                            >
                                <FiSave size={18} /> Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Attendance Calendar Modal */}
            {isCalendarModalOpen && selectedCalendarStaff && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="w-full max-w-4xl bg-white dark:bg-slate-950 rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-white/10 p-10">
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <h3 className="text-2xl font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>Attendance Journal</h3>
                                <div className="flex items-center gap-4 mt-2">
                                    <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest">{selectedCalendarStaff.name}</p>
                                    <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => changeMonth(-1)} className="p-1 hover:text-brand-600 transition-colors"><FiArrowLeft size={14} /></button>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest min-w-[80px] text-center">
                                            {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                        </p>
                                        <button onClick={() => changeMonth(1)} className="p-1 hover:text-brand-600 transition-colors"><FiArrowRight size={14} /></button>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsCalendarModalOpen(false)} className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-slate-600 transition-colors"><FiX size={24} /></button>
                        </div>

                        {/* Payroll Quick Stats */}
                        {(() => {
                            const currentKey = `${viewDate.getFullYear()}-${viewDate.getMonth()}`;
                            const register = selectedCalendarStaff.registers[currentKey] || [];
                            const daysPresent = register.reduce((acc, status) => {
                                if (status === 'P') return acc + 1;
                                if (status === 'HD') return acc + payrollConfig.halfDayDeduction;
                                return acc;
                            }, 0);

                            const totalDaysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
                            const divisor = payrollConfig.calculationMode === 'Fixed30' ? 30 :
                                payrollConfig.calculationMode === 'Fixed26' ? 26 :
                                    totalDaysInMonth;

                            const proRataSalary = Math.round((selectedCalendarStaff.salary / divisor) * daysPresent);

                            return (
                                <div className="grid grid-cols-4 gap-4 mb-10">
                                    <div className="p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Base Salary</p>
                                        <p className="text-xl font-black" style={{ color: theme.textPrimary }}>₹{selectedCalendarStaff.salary.toLocaleString()}</p>
                                    </div>
                                    <div className="p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Days Paid</p>
                                        <p className="text-xl font-black text-brand-600">{daysPresent} / {divisor}</p>
                                    </div>
                                    <div className="p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Policy: {payrollConfig.calculationMode}</p>
                                        <p className="text-xl font-black" style={{ color: theme.textPrimary }}>₹{Math.round(selectedCalendarStaff.salary / divisor).toLocaleString()}</p>
                                    </div>
                                    <div className="p-6 rounded-3xl bg-brand-600 shadow-xl shadow-brand-600/20 text-white">
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Final Gross</p>
                                            <FiDollarSign className="opacity-50" />
                                        </div>
                                        <p className="text-2xl font-black">₹{proRataSalary.toLocaleString()}</p>
                                    </div>
                                </div>
                            );
                        })()}

                        <div className="grid grid-cols-7 gap-4 mb-8">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                                <div key={d} className="text-center text-[9px] font-black uppercase tracking-widest text-slate-400 py-2">{d}</div>
                            ))}

                            {/* Empty cells for padding */}
                            {Array.from({ length: getCalendarData(viewDate.getFullYear(), viewDate.getMonth()).startOffset }).map((_, i) => (
                                <div key={`empty-${i}`} className="h-24 rounded-2xl bg-slate-50/30 dark:bg-white/5 opacity-20"></div>
                            ))}

                            {/* Actual Days */}
                            {Array.from({ length: getCalendarData(viewDate.getFullYear(), viewDate.getMonth()).totalDays }, (_, i) => i + 1).map((day) => {
                                const key = `${viewDate.getFullYear()}-${viewDate.getMonth()}`;
                                const status = selectedCalendarStaff.registers[key]?.[day - 1] || 'P'; // Default P if no data
                                return (
                                    <button
                                        key={day}
                                        onClick={() => toggleCalendarStatus(day - 1)}
                                        className={`h-24 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 group relative overflow-hidden ${status === 'P' ? 'bg-emerald-500/5 border-emerald-500/10' :
                                            status === 'A' ? 'bg-rose-500/5 border-rose-500/10' :
                                                status === 'HD' ? 'bg-amber-500/5 border-amber-500/10' :
                                                    'bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/5 opacity-40'
                                            }`}
                                    >
                                        <span className="text-xs font-black text-slate-400">{day}</span>
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${status === 'P' ? 'text-emerald-500' :
                                            status === 'A' ? 'text-rose-500' :
                                                status === 'HD' ? 'text-amber-500' :
                                                    'text-slate-300'
                                            }`}>{status || '-'}</span>
                                        <div className={`absolute bottom-0 left-0 w-full h-1 ${status === 'P' ? 'bg-emerald-500' :
                                            status === 'A' ? 'bg-rose-500' :
                                                status === 'HD' ? 'bg-amber-500' :
                                                    'transparent'
                                            }`}></div>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-white/5 rounded-3xl">
                            <div className="flex items-center gap-6">
                                <div className="flex gap-6 mr-6 border-r border-slate-200 dark:border-white/10 pr-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Present</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Absent</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Half Day</span>
                                    </div>
                                </div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Click any date to change status</p>
                            </div>

                            <button
                                onClick={() => {
                                    setIsSaving(true);
                                    setTimeout(() => {
                                        setIsSaving(false);
                                        setIsCalendarModalOpen(false);
                                    }, 800);
                                }}
                                className="px-10 py-4 bg-brand-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                            >
                                {isSaving ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <FiSave /> Save Journal
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Payroll Settings Modal */}
            {isSettingsModalOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="w-full max-w-md bg-white dark:bg-slate-950 rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-white/10 p-10">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>Payroll Policy</h3>
                            <button onClick={() => setIsSettingsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><FiX size={24} /></button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Calculation Basis</label>
                                <div className="grid grid-cols-1 gap-3">
                                    {[
                                        { id: 'Calendar', label: 'Actual Calendar Days', desc: 'Pays based on 28, 30, or 31 days' },
                                        { id: 'Fixed30', label: 'Fixed 30 Days', desc: 'Standard month regardless of length' },
                                        { id: 'Fixed26', label: 'Fixed 26 Days', desc: 'Calculation excluding 4 Sundays' }
                                    ].map(mode => (
                                        <button
                                            key={mode.id}
                                            onClick={() => setPayrollConfig({ ...payrollConfig, calculationMode: mode.id })}
                                            className={`w-full p-4 rounded-2xl border text-left transition-all ${payrollConfig.calculationMode === mode.id
                                                ? 'bg-brand-600/5 border-brand-600/30'
                                                : 'bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/5 hover:border-slate-200'
                                                }`}
                                        >
                                            <p className={`text-[11px] font-black uppercase tracking-widest ${payrollConfig.calculationMode === mode.id ? 'text-brand-600' : 'text-slate-500'}`}>{mode.label}</p>
                                            <p className="text-[9px] font-bold text-slate-400 mt-1">{mode.desc}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-50 dark:border-white/5">
                                <button
                                    onClick={() => setIsSettingsModalOpen(false)}
                                    className="w-full h-14 bg-brand-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl"
                                >
                                    Apply Policy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GlobalWorkforce;
