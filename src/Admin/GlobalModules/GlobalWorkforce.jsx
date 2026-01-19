import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Loader from '../../common/Loader';
import {
    FiUsers, FiUserPlus, FiSearch, FiEdit3,
    FiPhone, FiMail, FiBriefcase, FiDollarSign,
    FiSettings, FiMoreVertical, FiCalendar, FiTrash2, FiX, FiSave,
    FiArrowLeft, FiArrowRight
} from 'react-icons/fi';

import { tenantData } from '../../data/tenantData';
import { useTenant } from '../../hooks/useTenant.jsx';
import AddStaffModal from '../ConstructionManagement/Workforce/AddStaffModal';

const GlobalWorkforce = () => {
    const { theme } = useTheme();
    const { currentTenant } = useTenant();

    // All Hooks must be at the top level
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState(null);
    const [selectedCalendarStaff, setSelectedCalendarStaff] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [viewDate, setViewDate] = useState(new Date());
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [payrollConfig, setPayrollConfig] = useState({
        calculationMode: 'Calendar',
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
                '2025-11': Array(31).fill('P').map((p, i) => i % 10 === 0 ? 'A' : 'P')
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

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    // Early return AFTER all hooks
    if (loading) return <Loader fullScreen message="Loading Workforce Intelligence..." />;

    const data = tenantData[currentTenant.id];

    const getCalendarData = (year, month) => {
        const firstDay = new Date(year, month, 1).getDay();
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
        s.dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-12 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight flex items-center gap-2 md:gap-3" style={{ color: theme.textPrimary }}>
                        <span className="w-1.5 h-6 md:h-8 rounded-full" style={{ backgroundColor: theme.primary }}></span>
                        Staff Directory
                    </h2>
                    <p className="text-[10px] font-black mt-1 opacity-50 uppercase tracking-widest" style={{ color: theme.textSecondary }}>Manage Personnel & Base Salaries Manually</p>
                </div>
                <div className="flex gap-2 md:gap-3 w-full md:w-auto">
                    <button
                        onClick={() => setIsSettingsModalOpen(true)}
                        className="h-12 md:h-14 px-4 md:px-6 rounded-xl md:rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-slate-400 hover:text-brand-600 transition-all flex items-center justify-center gap-3 min-w-[44px]"
                    >
                        <FiSettings size={18} />
                        <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest">Settings</span>
                    </button>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex-1 md:flex-none h-12 md:h-14 px-6 md:px-8 text-white rounded-xl md:rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 md:gap-3" style={{ background: theme.gradients.button }}
                    >
                        <FiUserPlus size={18} /> <span>Add New Staff</span>
                    </button>
                </div>
            </div>

            {/* Quick Directory Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                <div className="md:col-span-2 xl:col-span-2 relative">
                    <FiSearch className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-base md:text-lg text-slate-300" />
                    <input
                        type="text"
                        placeholder="Search by name, role, or ID..."
                        className="w-full h-12 md:h-14 pl-12 md:pl-14 pr-4 md:pr-6 rounded-xl md:rounded-2xl card-premium border-none ring-1 ring-slate-100 dark:ring-slate-800 outline-none font-bold text-sm"
                        style={{ backgroundColor: theme.cardBg, color: theme.textPrimary }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="card-premium h-12 md:h-14 flex items-center justify-center border-none ring-1 ring-slate-100 dark:ring-slate-800" style={{ backgroundColor: theme.cardBg }}>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Total Active Staff: {staffData.length}</p>
                </div>
            </div>

            {/* Staff Cards - Mobile View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4 md:gap-6">
                {filteredStaff.map(staff => (
                    <div key={staff.id} className="card-premium p-6 md:p-8 group border-none ring-1 ring-slate-100 dark:ring-slate-800 hover:shadow-2xl transition-all relative overflow-hidden" style={{ backgroundColor: theme.cardBg }}>
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-2xl font-black text-slate-300 border border-slate-100 dark:border-white/5">
                                {staff.name.charAt(0)}
                            </div>
                            <button onClick={() => handleEdit(staff)} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-brand-600 transition-colors">
                                <FiEdit3 size={18} />
                            </button>
                        </div>
                        <div className="space-y-1 mb-8">
                            <h3 className="text-xl font-black tracking-tight" style={{ color: theme.textPrimary }}>{staff.name}</h3>
                            <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest">{staff.role} • {staff.dept}</p>
                        </div>
                        <div className="space-y-4 pt-6 border-t border-slate-50 dark:border-white/5">
                            <div className="flex items-center gap-3 text-xs font-bold text-slate-500"><FiMail className="shrink-0" /> {staff.email}</div>
                            <div className="flex items-center gap-3 text-xs font-bold text-slate-500"><FiPhone className="shrink-0" /> {staff.phone}</div>
                            <div className="flex items-center justify-between pt-2">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Salary</span>
                                <span className="text-lg font-black tracking-tight" style={{ color: theme.textPrimary }}>₹{staff.salary.toLocaleString()}</span>
                            </div>
                        </div>
                        <button onClick={() => { setSelectedCalendarStaff(staff); setIsCalendarModalOpen(true); }} className="mt-6 w-full h-12 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-600 hover:border-brand-600/30 transition-all flex items-center justify-center gap-2">
                            <FiCalendar /> Monthly Attendance
                        </button>
                    </div>
                ))}
            </div>

            {/* Staff Table - Desktop View */}
            <div className="hidden lg:block card-premium overflow-hidden border-none ring-1 ring-slate-100 dark:ring-slate-800" style={{ backgroundColor: theme.cardBg }}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-white/5">
                                <th className="text-left px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Staff</th>
                                <th className="text-left px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role & Department</th>
                                <th className="text-left px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
                                <th className="text-right px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Salary</th>
                                <th className="text-center px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStaff.map((staff) => (
                                <tr key={staff.id} className="border-b border-slate-50 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-lg font-black text-slate-300 border border-slate-100 dark:border-white/5">
                                                {staff.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black tracking-tight" style={{ color: theme.textPrimary }}>{staff.name}</p>
                                                <p className="text-[10px] font-bold text-slate-400 mt-0.5">ID: {staff.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="text-sm font-bold" style={{ color: theme.textPrimary }}>{staff.role}</p>
                                        <p className="text-xs font-bold text-slate-400 mt-1">{staff.dept}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="space-y-2 text-xs font-bold text-slate-500">
                                            <div className="flex items-center gap-2"><FiMail size={14} /> {staff.email}</div>
                                            <div className="flex items-center gap-2"><FiPhone size={14} /> {staff.phone}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <p className="text-lg font-black tracking-tight" style={{ color: theme.textPrimary }}>₹{staff.salary.toLocaleString()}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center justify-center gap-2">
                                            <button onClick={() => { setSelectedCalendarStaff(staff); setIsCalendarModalOpen(true); }} className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-brand-600" title="Monthly Attendance"><FiCalendar size={18} /></button>
                                            <button onClick={() => handleEdit(staff)} className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-brand-600" title="Edit Staff"><FiEdit3 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Attendance Journal Modal */}
            {isCalendarModalOpen && selectedCalendarStaff && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="w-full max-w-4xl bg-white dark:bg-slate-950 rounded-2xl md:rounded-[2.5rem] overflow-y-auto max-h-[95vh] shadow-2xl border border-white/10 p-4 sm:p-6 md:p-10">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 md:mb-10">
                            <div>
                                <h3 className="text-lg md:text-2xl font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>Attendance Journal</h3>
                                <div className="flex items-center gap-2 mt-2">
                                    <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest">{selectedCalendarStaff.name}</p>
                                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-white/5 rounded-xl px-2 py-1 ml-4">
                                        <button onClick={() => changeMonth(-1)} className="p-2 hover:text-brand-600"><FiArrowLeft size={16} /></button>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest min-w-[100px] text-center">{viewDate.toLocaleString('default', { month: 'short', year: 'numeric' })}</p>
                                        <button onClick={() => changeMonth(1)} className="p-2 hover:text-brand-600"><FiArrowRight size={16} /></button>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsCalendarModalOpen(false)} className="p-3 bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-slate-600 rounded-xl"><FiX size={24} /></button>
                        </div>
                        {/* Attendance Content Simplified for Space */}
                        <div className="grid grid-cols-7 gap-1 md:gap-3 mb-8">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <div key={d} className="text-center text-[9px] font-black text-slate-400 uppercase py-2">{d}</div>)}
                            {Array.from({ length: getCalendarData(viewDate.getFullYear(), viewDate.getMonth()).startOffset }).map((_, i) => <div key={i} className="h-16 md:h-20 bg-slate-50/20 dark:bg-white/5 rounded-xl opacity-20" />)}
                            {Array.from({ length: getCalendarData(viewDate.getFullYear(), viewDate.getMonth()).totalDays }, (_, i) => i + 1).map(day => {
                                const key = `${viewDate.getFullYear()}-${viewDate.getMonth()}`;
                                const status = selectedCalendarStaff.registers[key]?.[day - 1] || 'P';
                                return (
                                    <button key={day} onClick={() => toggleCalendarStatus(day - 1)} className={`h-16 md:h-20 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${status === 'P' ? 'bg-emerald-500/5' : status === 'A' ? 'bg-rose-500/5' : 'bg-slate-50/50'}`}>
                                        <span className="text-[10px] font-black text-slate-400">{day}</span>
                                        <span className={`text-[9px] font-black ${status === 'P' ? 'text-emerald-500' : 'text-rose-500'}`}>{status}</span>
                                    </button>
                                );
                            })}
                        </div>
                        <button onClick={() => setIsCalendarModalOpen(false)} className="w-full h-14 bg-brand-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl"><FiSave className="inline mr-2" /> Save Journal</button>
                    </div>
                </div>
            )}

            {/* Modals */}
            {isEditModalOpen && editingStaff && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="w-full max-w-lg bg-white dark:bg-slate-950 rounded-[2.5rem] p-8 border border-white/10">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>Edit Staff</h3>
                            <button onClick={() => setIsEditModalOpen(false)}><FiX size={24} /></button>
                        </div>
                        <div className="space-y-4">
                            <input value={editingStaff.name} onChange={e => setEditingStaff({ ...editingStaff, name: e.target.value })} className="w-full h-14 px-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 font-bold outline-none" style={{ color: theme.textPrimary }} />
                            <button onClick={handleSave} className="w-full h-14 bg-brand-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest"><FiSave className="inline mr-2" /> Save Changes</button>
                        </div>
                    </div>
                </div>
            )}

            {isAddModalOpen && (
                <AddStaffModal
                    projects={data.projects}
                    onClose={() => setIsAddModalOpen(false)}
                    onSuccess={(newStaff) => {
                        const mapped = {
                            id: newStaff.workerId || 'CORP-' + Math.floor(100 + Math.random() * 900),
                            name: newStaff.personalDetails?.name || 'New Member',
                            role: newStaff.officeDetails?.designation || 'Staff',
                            dept: newStaff.officeDetails?.department || 'Operations',
                            status: 'Active',
                            email: newStaff.personalDetails?.email || '',
                            phone: newStaff.personalDetails?.mobile || '',
                            salary: 25000,
                            joined: 'Jan 2026',
                            registers: {}
                        };
                        setStaffData(prev => [mapped, ...prev]);
                        setIsAddModalOpen(false);
                    }}
                />
            )}

            {isSettingsModalOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xl">
                    <div className="w-full max-w-md bg-white dark:bg-slate-950 rounded-[2.5rem] p-10">
                        <h3 className="text-xl font-black uppercase mb-6" style={{ color: theme.textPrimary }}>Settings</h3>
                        <button onClick={() => setIsSettingsModalOpen(false)} className="w-full h-14 bg-brand-600 text-white rounded-2xl font-black text-xs uppercase">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GlobalWorkforce;
