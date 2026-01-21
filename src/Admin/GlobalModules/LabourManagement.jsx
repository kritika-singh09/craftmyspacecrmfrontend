import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

import {
    FiUsers, FiUserPlus, FiSearch, FiEdit3,
    FiPhone, FiMail, FiBriefcase, FiDollarSign,
    FiSettings, FiMoreVertical, FiCalendar, FiTrash2, FiX, FiSave,

    FiArrowLeft, FiArrowRight, FiChevronDown
} from 'react-icons/fi';

import { tenantData } from '../../data/tenantData';
import { useTenant } from '../../hooks/useTenant.jsx';
import { useAuth } from '../../hooks/useAuth.jsx';
import AddLabourModal from './AddLabourModal';

const LabourManagement = () => {
    const { theme } = useTheme();
    const { currentTenant } = useTenant();
    const { user } = useAuth();

    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState(null);
    const [selectedCalendarStaff, setSelectedCalendarStaff] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [viewDate, setViewDate] = useState(new Date());
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [staffData, setStaffData] = useState([]);
    const [lateFeeInput, setLateFeeInput] = useState(0);
    const [advanceAmount, setAdvanceAmount] = useState('');
    const [advanceReason, setAdvanceReason] = useState('');
    const [activeTab, setActiveTab] = useState('journal'); // 'journal' or 'settlement'
    const [amountPaying, setAmountPaying] = useState(''); // New state for partial payment

    const fetchStaff = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/labour`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const result = await response.json();
            if (result.success) {
                setStaffData(result.data);
            }
        } catch (error) {
            console.error('Failed to fetch staff:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStaff();
    }, []);



    const getCalendarData = (year, month) => {
        const firstDay = new Date(year, month, 1).getDay();
        const startOffset = firstDay === 0 ? 6 : firstDay - 1;
        const totalDays = new Date(year, month + 1, 0).getDate();
        return { startOffset, totalDays };
    };

    const handleAttendanceUpdate = async (dayIndex, status, fee) => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const date = new Date(year, month, dayIndex + 1);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/labour/${selectedCalendarStaff._id}/attendance`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ date, status, lateFee: fee })
            });
            const result = await response.json();
            if (result.success) {
                // Update local state
                setStaffData(prev => prev.map(s => s._id === result.data._id ? result.data : s));
                setSelectedCalendarStaff(result.data);
            }
        } catch (error) {
            console.error('Failed to update attendance:', error);
        }
    };

    const toggleCalendarStatus = (dayIndex) => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const dateKey = new Date(year, month, dayIndex + 1).toISOString().split('T')[0];

        const existingAtt = selectedCalendarStaff.attendance?.find(a =>
            new Date(a.date).toISOString().split('T')[0] === dateKey
        );

        const currentStatus = existingAtt?.status || 'None';
        const currentFee = existingAtt?.lateFee || 0;

        // Simplified cycle: None -> P -> A -> HD -> Late -> P
        const cycle = { 'None': 'P', 'P': 'A', 'A': 'HD', 'HD': 'Late', 'Late': 'P' };

        const allowedRoles = ['SUPERVISOR', 'COMPANY_ADMIN', 'SUPER_ADMIN'];
        if (!allowedRoles.includes(user?.role)) {
            alert('Access Denied: Only Supervisors and Admins can mark attendance.');
            return;
        }

        // Intelligence: If status is 'Late' and Input Fee is different from Saved Fee, update Fee ONLY.
        // Otherwise, cycle to next status.
        let nextStatus = cycle[currentStatus] || 'P'; // Default key fallback
        let nextFee = 0;

        if (currentStatus === 'Late') {
            const inputFee = Number(lateFeeInput);
            if (inputFee !== currentFee) {
                // User wants to update the fee, don't cycle status
                nextStatus = 'Late';
                nextFee = inputFee;
            } else {
                // Proceed to next status (P)
                nextStatus = 'P';
                nextFee = 0;
            }
        } else if (nextStatus === 'Late') {
            nextFee = Number(lateFeeInput);
        }

        handleAttendanceUpdate(dayIndex, nextStatus, nextFee);
    };

    const handleAddAdvance = async () => {
        if (!advanceAmount || !advanceReason) return alert('Please enter amount and reason');
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/labour/${selectedCalendarStaff._id}/advance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ amount: Number(advanceAmount), reason: advanceReason })
            });
            const result = await response.json();
            if (result.success) {
                setStaffData(prev => prev.map(s => s._id === result.data._id ? result.data : s));
                setSelectedCalendarStaff(result.data);
                setAdvanceAmount('');
                setAdvanceReason('');
                alert('Advance Recorded Successfully');
            }
        } catch (error) {
            console.error('Failed to add advance:', error);
        }
    };

    const handleSettleAccount = async () => {
        const netPayable = selectedCalendarStaff.netPayableRef || 0;

        const finalAmount = amountPaying === '' ? 'FULL' : Number(amountPaying);
        const confirmMsg = amountPaying === ''
            ? 'Are you sure you want to clear all dues? This assumes you are paying the FULL amount.'
            : `Are you sure you want to settle? You are paying ₹${finalAmount}. Remaining balance will be carried forward.`;

        if (!window.confirm(confirmMsg)) return;

        try {
            const body = amountPaying !== '' ? { amountPaid: Number(amountPaying) } : {};
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/labour/${selectedCalendarStaff._id}/settle`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(body)
            });
            const result = await response.json();
            if (result.success) {
                setStaffData(prev => prev.map(s => s._id === result.data._id ? result.data : s));
                setSelectedCalendarStaff(result.data);
                setAmountPaying('');

                let msg = `Settlement Complete!\nPaid: ₹${result.summary.paid}`;
                if (result.summary.carriedForward !== 0) msg += `\nCarried Forward: ₹${result.summary.carriedForward}`;
                alert(msg);
            }
        } catch (error) {
            console.error('Failed to settle account:', error);
        }
    };

    const handleFinalClearance = async () => {
        const allowedRoles = ['SUPERVISOR', 'COMPANY_ADMIN', 'SUPER_ADMIN'];
        if (!allowedRoles.includes(user?.role)) {
            alert('Access Denied: Only Supervisors and Admins can clear workers.');
            return;
        }

        const confirmMsg = `Are you sure you want to REMOVE ${selectedCalendarStaff.fullName} from the active staff list?\n\nThis action will mark them as inactive. This should only be done after all dues are settled.`;
        if (!window.confirm(confirmMsg)) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/labour/${selectedCalendarStaff._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const result = await response.json();
            if (result.success) {
                // Remove from local state
                setStaffData(prev => prev.filter(s => s._id !== selectedCalendarStaff._id));
                setIsCalendarModalOpen(false);
                alert(`${selectedCalendarStaff.fullName} has been removed from active staff.`);
            }
        } catch (error) {
            console.error('Failed to clear worker:', error);
            alert('Failed to remove worker. Please try again.');
        }
    };

    const handleDeleteStaff = async (staffId, staffName) => {
        const allowedRoles = ['SUPERVISOR', 'COMPANY_ADMIN', 'SUPER_ADMIN'];
        if (!allowedRoles.includes(user?.role)) {
            alert('Access Denied: Only Supervisors and Admins can delete staff.');
            return;
        }

        if (!window.confirm(`Are you sure you want to delete ${staffName}? This action cannot be undone.`)) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/labour/${staffId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const result = await response.json();
            if (result.success) {
                setStaffData(prev => prev.filter(s => s._id !== staffId));
                alert(`${staffName} deleted successfully.`);
            } else {
                alert('Failed to delete staff: ' + (result.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Failed to delete staff:', error);
            alert('Failed to delete staff. Please try again.');
        }
    };

    const changeMonth = (offset) => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
    };

    const applyLateFeeToAll = async () => {
        const allowedRoles = ['SUPERVISOR', 'COMPANY_ADMIN', 'SUPER_ADMIN'];
        if (!allowedRoles.includes(user?.role)) {
            alert('Access Denied: Only Supervisors and Admins can apply late fees.');
            return;
        }

        const fee = Number(lateFeeInput);
        if (fee < 0) return;

        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const monthStart = new Date(year, month, 1);
        const monthEnd = new Date(year, month + 1, 0);

        // Find all Late days in current view
        const lateDays = selectedCalendarStaff.attendance?.filter(a => {
            const d = new Date(a.date);
            const status = (a.status === 'L' || a.status === 'Late') ? 'Late' : a.status;
            return d >= monthStart && d <= monthEnd && status === 'Late';
        }) || [];

        if (lateDays.length === 0) {
            alert('No Late days found in this month to update.');
            return;
        }

        if (!window.confirm(`Apply Late Fee of ₹${fee} to all ${lateDays.length} Late days in this month?`)) return;

        setIsSaving(true);
        try {
            // Execute in parallel
            await Promise.all(lateDays.map(a => {
                const dayIndex = new Date(a.date).getDate() - 1; // 0-indexed
                // Reuse logic but direct fetch to avoid multiple state updates
                return fetch(`${import.meta.env.VITE_API_BASE_URL}/api/labour/${selectedCalendarStaff._id}/attendance`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ date: a.date, status: 'Late', lateFee: fee })
                });
            }));

            // Re-fetch to get clean state
            fetchStaff();

            // Optimistic update for immediate UI feedback (simulating fetchStaff success for selectedStaff)
            const updatedAtt = selectedCalendarStaff.attendance.map(a => {
                const d = new Date(a.date);
                const isTarget = d >= monthStart && d <= monthEnd && (a.status === 'L' || a.status === 'Late');
                return isTarget ? { ...a, status: 'Late', lateFee: fee } : a;
            });
            setSelectedCalendarStaff(prev => ({ ...prev, attendance: updatedAtt }));

            alert('Late fees updated successfully!');

        } catch (error) {
            console.error('Failed to batch update late fees:', error);
            alert('Failed to update some records.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleEdit = (staff) => {
        setEditingStaff(staff);
        setIsAddModalOpen(true); // Re-use AddStaffModal for Edit
    };

    const filteredStaff = staffData.filter(s =>
    ((s.fullName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (s.labourId?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (s.category?.toLowerCase().includes(searchTerm.toLowerCase())))
    );

    return (
        <div className="space-y-8 pb-12 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight flex items-center gap-2 md:gap-3" style={{ color: theme.textPrimary }}>
                        <span className="w-1.5 h-6 md:h-8 rounded-full" style={{ backgroundColor: theme.primary }}></span>
                        Labour Management
                    </h2>
                    <p className="text-[10px] font-black mt-1 opacity-50 uppercase tracking-widest" style={{ color: theme.textSecondary }}>Manage Labour & Workforce Operations</p>
                </div>
                <div className="flex gap-2 md:gap-3 w-full md:w-auto">
                    {/* <button
                        onClick={() => setIsSettingsModalOpen(true)}
                        className="h-12 md:h-14 px-4 md:px-6 rounded-xl md:rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-slate-400 hover:text-brand-600 transition-all flex items-center justify-center gap-3 min-w-[44px]"
                    >
                        <FiSettings size={18} />
                        <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest">Settings</span>
                    </button> */}
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex-1 md:flex-none h-12 md:h-14 px-6 md:px-8 text-white rounded-xl md:rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 md:gap-3" style={{ background: theme.gradients.button }}
                    >
                        <FiUserPlus size={18} /> <span>Add Labour</span>
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
                        className="w-full h-12 md:h-14 pl-12 md:pl-14 pr-4 md:pr-6 rounded-xl md:rounded-2xl card-premium border-2 border-slate-300 dark:border-slate-700 outline-none font-bold text-sm"
                        style={{ backgroundColor: theme.cardBg, color: theme.textPrimary }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="card-premium h-12 md:h-14 relative flex items-center justify-center p-0 overflow-hidden border-2 border-slate-300 dark:border-slate-700 rounded-xl md:rounded-2xl" style={{ backgroundColor: theme.cardBg }}>
                    <select
                        className="w-full h-full px-6 bg-transparent text-center font-black uppercase tracking-widest text-xs outline-none cursor-pointer text-slate-500 appearance-none relative z-10"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="All">All Labour Types</option>
                        <option value="Site">Labour Workers</option>
                        <option value="Office">Supervisors</option>
                    </select>
                    <FiChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                </div>
            </div>

            {/* Staff Cards - Mobile View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4 md:gap-6">
                {filteredStaff.map(staff => (
                    <div key={staff._id || staff.workerId} className="card-premium p-6 md:p-8 group border-none ring-1 ring-slate-100 dark:ring-slate-800 hover:shadow-2xl transition-all relative overflow-hidden" style={{ backgroundColor: theme.cardBg }}>
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-2xl font-black text-slate-300 border border-slate-100 dark:border-white/5">
                                {staff?.fullName?.[0] || 'L'}
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(staff)} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-brand-600 transition-colors">
                                    <FiEdit3 size={18} />
                                </button>
                                <button onClick={() => handleDeleteStaff(staff._id, staff.fullName)} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-brand-600 transition-colors">
                                    <FiTrash2 size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="space-y-1 mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-xl font-black tracking-tight" style={{ color: theme.textPrimary }}>{staff.fullName}</h3>
                                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border bg-orange-100 text-orange-600 border-orange-200`}>
                                    Labour
                                </span>
                            </div>
                            <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest">{staff.category} • ID: {staff.labourId}</p>
                        </div>
                        <div className="space-y-4 pt-6 border-t border-slate-50 dark:border-white/5">
                            <div className="flex items-center gap-3 text-xs font-bold text-slate-500"><FiPhone className="shrink-0" /> {staff.mobile}</div>
                            <div className="flex items-center gap-3 text-xs font-bold text-slate-500"><span className="uppercase tracking-widest opacity-70">Aadhar:</span> {staff.aadharNumber}</div>
                            <div className="flex items-center justify-between pt-2">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Daily Wage</span>
                                <span className="text-lg font-black tracking-tight" style={{ color: theme.textPrimary }}>₹{(staff.dailyWage || 0).toLocaleString()}</span>
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
                                <th className="text-left px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Labour Worker</th>
                                <th className="text-left px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category & Type</th>
                                <th className="text-left px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
                                <th className="text-right px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Earnings Basis</th>
                                <th className="text-center px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStaff.map((staff) => (
                                <tr key={staff._id || staff.workerId} className="border-b border-slate-50 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-lg font-black text-slate-300 border border-slate-100 dark:border-white/5">
                                                {staff?.fullName?.[0] || 'L'}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black tracking-tight" style={{ color: theme.textPrimary }}>{staff.fullName}</p>
                                                <p className="text-[10px] font-bold text-slate-400 mt-0.5">ID: {staff.labourId}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="text-sm font-bold" style={{ color: theme.textPrimary }}>{staff.category}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border bg-orange-100 text-orange-600 border-orange-200">
                                                Labour Worker
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="space-y-2 text-xs font-bold text-slate-500">
                                            <div className="flex items-center gap-2"><FiPhone size={14} /> {staff.mobile}</div>
                                            <div className="flex items-center gap-2 text-[10px]"><span className="uppercase tracking-widest opacity-70">Aadhar:</span> {staff.aadharNumber}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <p className="text-lg font-black tracking-tight" style={{ color: theme.textPrimary }}>₹{(staff.dailyWage || 0).toLocaleString()}</p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase">Daily Wage</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center justify-center gap-2">
                                            <button onClick={() => { setSelectedCalendarStaff(staff); setIsCalendarModalOpen(true); }} className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-brand-600" title="Monthly Attendance"><FiCalendar size={18} /></button>
                                            <button onClick={() => handleEdit(staff)} className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-brand-600" title="Edit Staff"><FiEdit3 size={18} /></button>
                                            <button onClick={() => handleDeleteStaff(staff._id, staff.fullName)} className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-rose-600" title="Delete Staff"><FiTrash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Attendance Journal Modal */}
            {
                isCalendarModalOpen && selectedCalendarStaff && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-300">
                        <div className="w-full max-w-4xl bg-white dark:bg-slate-950 rounded-2xl md:rounded-[2.5rem] overflow-y-auto max-h-[95vh] shadow-2xl border border-white/10 p-3 sm:p-6 md:p-10">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 md:mb-10">
                                <div>
                                    <h3 className="text-lg md:text-2xl font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>Attendance Journal</h3>
                                    <div className="flex items-center gap-2 mt-2">
                                        <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest">{selectedCalendarStaff.fullName}</p>
                                        <div className="flex items-center gap-2 bg-slate-50 dark:bg-white/5 rounded-xl px-2 py-1 ml-4">
                                            <button onClick={() => changeMonth(-1)} className="p-2 hover:text-brand-600"><FiArrowLeft size={16} /></button>
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest min-w-[100px] text-center">{viewDate.toLocaleString('default', { month: 'short', year: 'numeric' })}</p>
                                            <button onClick={() => changeMonth(1)} className="p-2 hover:text-brand-600"><FiArrowRight size={16} /></button>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setIsCalendarModalOpen(false)} className="p-3 bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-slate-600 rounded-xl"><FiX size={24} /></button>
                            </div>

                            {/* Tabs */}
                            <div className="flex gap-2 mb-6 border-b border-slate-100 dark:border-white/5 pb-1">
                                <button
                                    onClick={() => setActiveTab('journal')}
                                    className={`px-6 py-3 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === 'journal' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                                >
                                    Attendance Journal
                                </button>
                                <button
                                    onClick={() => setActiveTab('settlement')}
                                    className={`px-6 py-3 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === 'settlement' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                                >
                                    Settlement & Advances
                                </button>
                            </div>

                            {activeTab === 'journal' ? (
                                <>
                                    {/* Attendance Content Simplified for Space */}
                                    <div className="grid grid-cols-7 gap-1 md:gap-3 mb-8">
                                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <div key={d} className="text-center text-[9px] font-black text-slate-400 uppercase py-2">{d}</div>)}
                                        {Array.from({ length: getCalendarData(viewDate.getFullYear(), viewDate.getMonth()).startOffset }).map((_, i) => <div key={i} className="h-16 md:h-20 bg-slate-50/20 dark:bg-white/5 rounded-xl opacity-20" />)}
                                        {Array.from({ length: getCalendarData(viewDate.getFullYear(), viewDate.getMonth()).totalDays }, (_, i) => i + 1).map(day => {
                                            const year = viewDate.getFullYear();
                                            const month = viewDate.getMonth();
                                            const dateKey = new Date(year, month, day).toISOString().split('T')[0];

                                            const attEntry = selectedCalendarStaff.attendance?.find(a =>
                                                new Date(a.date).toISOString().split('T')[0] === dateKey
                                            );

                                            const status = attEntry?.status || 'None';
                                            const fee = attEntry?.lateFee || 0;

                                            return (
                                                <button key={day} onClick={() => toggleCalendarStatus(day - 1)} className={`h-16 md:h-20 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${status === 'None' ? 'bg-slate-50/50' :
                                                    status === 'P' ? 'bg-emerald-500/10 border-emerald-200' :
                                                        status === 'A' ? 'bg-rose-500/10 border-rose-200' :
                                                            status === 'Late' ? 'bg-orange-500/10 border-orange-200' :
                                                                'bg-slate-50/80 border-slate-200'
                                                    }`}>
                                                    <span className="text-[10px] font-black text-slate-400">{day}</span>
                                                    <span className={`text-[9px] font-black ${status === 'P' ? 'text-emerald-600' :
                                                        status === 'A' ? 'text-rose-600' :
                                                            status === 'Late' ? 'text-orange-600' : 'text-slate-400'
                                                        }`}>{status}</span>
                                                    {status === 'Late' && fee > 0 && <span className="text-[8px] font-bold text-orange-700">₹{fee}</span>}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {/* Attendance Stats & Salary Calculation */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 mb-8">
                                        {(() => {
                                            const attendance = selectedCalendarStaff.attendance || [];
                                            const monthStart = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
                                            const monthEnd = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);

                                            const currentMonthAtt = attendance.filter(a => {
                                                const d = new Date(a.date);
                                                return d >= monthStart && d <= monthEnd;
                                            });

                                            const stats = currentMonthAtt.reduce((acc, curr) => {
                                                // Map old 'L' to 'Late' for stats counting to avoid confusion if old data exists
                                                const status = (curr.status === 'L' || curr.status === 'Late') ? 'Late' : curr.status;
                                                acc[status] = (acc[status] || 0) + 1;
                                                acc.totalLateFee = (acc.totalLateFee || 0) + (curr.lateFee || 0);
                                                return acc;
                                            }, { P: 0, A: 0, HD: 0, Late: 0, totalLateFee: 0 }); // Removed L from initial object

                                            const dailyRate = selectedCalendarStaff.dailyWage || 0;

                                            // Calculation logic: P (full), HD (half), Late (full minus fee)
                                            const totalSalary = (stats.P * dailyRate) + (stats.HD * dailyRate * 0.5) + (stats.Late * dailyRate) - stats.totalLateFee;

                                            return (
                                                <>
                                                    <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 text-center">
                                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Daily Wage</p>
                                                        <p className="text-xl font-black text-slate-600 dark:text-slate-300">₹{dailyRate.toFixed(2)}</p>
                                                    </div>
                                                    <div className="bg-emerald-50 dark:bg-emerald-500/5 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-500/10 text-center">
                                                        <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1">Present (P)</p>
                                                        <p className="text-xl font-black" style={{ color: theme.textPrimary }}>{stats.P}</p>
                                                    </div>
                                                    <div className="bg-rose-50 dark:bg-rose-500/5 p-4 rounded-2xl border border-rose-100 dark:border-rose-500/10 text-center">
                                                        <p className="text-[9px] font-black text-rose-600 uppercase tracking-widest mb-1">Absent (A)</p>
                                                        <p className="text-xl font-black" style={{ color: theme.textPrimary }}>{stats.A}</p>
                                                    </div>
                                                    <div className="bg-sky-50 dark:bg-sky-500/5 p-4 rounded-2xl border border-sky-100 dark:border-sky-500/10 text-center">
                                                        <p className="text-[9px] font-black text-sky-600 uppercase tracking-widest mb-1">Half-Day (HD)</p>
                                                        <p className="text-xl font-black" style={{ color: theme.textPrimary }}>{stats.HD}</p>
                                                    </div>
                                                    <div className="bg-orange-50 dark:bg-orange-500/5 p-4 rounded-2xl border border-orange-100 dark:border-orange-500/10 text-center">
                                                        <p className="text-[9px] font-black text-orange-600 uppercase tracking-widest mb-1">Late</p>
                                                        <p className="text-xl font-black" style={{ color: theme.textPrimary }}>{stats.Late}</p>
                                                    </div>
                                                    <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 text-center">
                                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Fee Deducted</p>
                                                        <p className="text-xl font-black text-orange-600">₹{stats.totalLateFee}</p>
                                                    </div>
                                                    <div className="bg-blue-50 dark:bg-blue-500/5 p-4 rounded-2xl border border-blue-100 dark:border-blue-500/10 text-center">
                                                        <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1">Total Earnings</p>
                                                        <div>
                                                            <p className="text-xl font-black text-blue-600">₹{totalSalary.toLocaleString()}</p>
                                                        </div>
                                                    </div>

                                                    <div className="bg-brand-600/10 p-4 rounded-2xl border border-brand-600/20 text-center relative overflow-hidden">
                                                        <div className="absolute inset-0 bg-brand-600/5"></div>
                                                        <p className="text-[9px] font-black text-brand-600 uppercase tracking-widest mb-1 relative z-10">Net Due Now</p>
                                                        {(() => {
                                                            const allUnsettledAdvances = selectedCalendarStaff.advances?.filter(a => !a.settled).reduce((sum, a) => sum + a.amount, 0) || 0;
                                                            const pendingDues = selectedCalendarStaff.pendingDues || 0;
                                                            const netPending = (totalSalary + pendingDues) - allUnsettledAdvances;
                                                            selectedCalendarStaff.netPayableRef = netPending;

                                                            return (
                                                                <div>
                                                                    <p className="text-xl font-black relative z-10" style={{ color: theme.primary }}>₹{netPending.toLocaleString()}</p>
                                                                    {allUnsettledAdvances > 0 && <p className="text-[8px] font-bold text-brand-400 mt-0.5 relative z-10">(Less Adv: ₹{allUnsettledAdvances})</p>}
                                                                </div>
                                                            );
                                                        })()}
                                                    </div>
                                                </>
                                            );
                                        })()}
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                        <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-slate-50 dark:bg-white/5 p-3 sm:p-4 rounded-2xl border border-slate-100 dark:border-white/5">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">Late Fee (₹):</span>
                                            <input
                                                type="number"
                                                value={lateFeeInput}
                                                onChange={(e) => setLateFeeInput(e.target.value)}
                                                className="bg-transparent font-black text-base sm:text-lg w-full sm:w-24 outline-none border-b-2 border-orange-400 px-2 py-1"
                                            />
                                            <button
                                                onClick={applyLateFeeToAll}
                                                disabled={isSaving}
                                                className="w-full sm:w-auto px-3 py-2 sm:py-1.5 bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-orange-200 transition-colors"
                                            >
                                                Apply to All
                                            </button>
                                        </div>
                                        <button onClick={() => setIsCalendarModalOpen(false)} className="w-full sm:w-auto px-8 sm:px-12 h-12 sm:h-14 bg-brand-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2">
                                            <FiSave size={18} /> Close Journal
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="animate-in fade-in duration-300 space-y-8">
                                    {/* Record Advance Section */}
                                    <div className="bg-slate-50 dark:bg-white/5 p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-white/5">
                                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-6">Record Daily Advance</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <input
                                                type="number"
                                                placeholder="Amount (₹)"
                                                value={advanceAmount}
                                                onChange={e => setAdvanceAmount(e.target.value)}
                                                className="h-14 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 outline-none font-bold"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Reason (e.g. Lunch, Emergency)"
                                                value={advanceReason}
                                                onChange={e => setAdvanceReason(e.target.value)}
                                                className="h-14 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 outline-none font-bold"
                                            />
                                            <button
                                                onClick={handleAddAdvance}
                                                className="h-14 bg-orange-500 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
                                            >
                                                Add Advance
                                            </button>
                                        </div>
                                    </div>

                                    {/* Unsettled Advances Table */}
                                    <div>
                                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4">Unsettled Advances</h4>
                                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left min-w-[500px]">
                                                    <thead className="bg-slate-50 dark:bg-slate-800/50">
                                                        <tr>
                                                            <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                                                            <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Reason</th>
                                                            <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                                        {selectedCalendarStaff.advances?.filter(a => !a.settled).length > 0 ? (
                                                            selectedCalendarStaff.advances.filter(a => !a.settled).map((adv, idx) => (
                                                                <tr key={idx}>
                                                                    <td className="px-6 py-4 text-xs font-bold text-slate-600 dark:text-slate-400">{new Date(adv.date).toLocaleDateString()}</td>
                                                                    <td className="px-6 py-4 text-xs font-bold text-slate-600 dark:text-slate-400">{adv.reason}</td>
                                                                    <td className="px-6 py-4 text-sm font-black text-rose-600 text-right">-₹{adv.amount}</td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="3" className="px-6 py-8 text-center text-xs font-bold text-slate-400">No unsettled advances</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Final Settlement Calculation */}
                                    <div className="bg-brand-600/5 border border-brand-600/20 p-6 md:p-8 rounded-2xl">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-brand-800 dark:text-brand-400">Final Settlement Calculator</h3>
                                            <span className="text-[10px] font-bold uppercase tracking-widest bg-brand-100 text-brand-700 px-3 py-1 rounded-lg">Unpaid Dues Only</span>
                                        </div>

                                        {(() => {
                                            // Calculate daily rate based on staff type
                                            const dailyRate = selectedCalendarStaff.dailyWage || 0;

                                            const attendance = selectedCalendarStaff.attendance || [];
                                            const monthStart = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
                                            const monthEnd = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);

                                            // Calculate Gross Month Earnings (Regardless of paid status)
                                            let totalMonthEarnings = 0;
                                            const currentMonthAtt = attendance.filter(a => {
                                                const d = new Date(a.date);
                                                return d >= monthStart && d <= monthEnd;
                                            });

                                            currentMonthAtt.forEach(att => {
                                                if (att.paid) return; // Skip already paid attendance
                                                const s = (att.status === 'L' || att.status === 'Late') ? 'Late' : att.status;
                                                if (s === 'P') totalMonthEarnings += dailyRate;
                                                if (s === 'HD') totalMonthEarnings += (dailyRate * 0.5);
                                                if (s === 'Late') totalMonthEarnings += (dailyRate - (att.lateFee || 0));
                                            });

                                            const unsettledAdvances = selectedCalendarStaff.advances?.filter(a => !a.settled).reduce((sum, a) => sum + a.amount, 0) || 0;
                                            const previousDues = selectedCalendarStaff.pendingDues || 0;
                                            const totalEarningsPlusPrevious = totalMonthEarnings + previousDues;
                                            const netPayable = totalEarningsPlusPrevious - unsettledAdvances;

                                            return (
                                                <div className="space-y-4">
                                                    {/* Row: Net Earnings (Unpaid + Previous Dues) */}
                                                    <div className="flex justify-between items-center py-3 border-b border-brand-600/10">
                                                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Net Earnings</span>
                                                        <span className="text-sm font-black text-blue-600">₹{totalEarningsPlusPrevious.toLocaleString()}</span>
                                                    </div>


                                                    <div className="flex justify-between items-center py-3 border-b border-brand-600/10">
                                                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Less: Unsettled Advances</span>
                                                        <span className="text-base font-black text-rose-600">-₹{unsettledAdvances.toLocaleString()}</span>
                                                    </div>

                                                    <div className="bg-brand-50/50 dark:bg-brand-900/10 p-4 rounded-xl space-y-3">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-sm font-black uppercase tracking-widest text-brand-800 dark:text-brand-400">Net Payable Amount</span>
                                                            <span className="text-2xl md:text-3xl font-black text-brand-600">₹{netPayable.toLocaleString()}</span>
                                                        </div>

                                                        <div className="flex items-center gap-3">
                                                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Payment:</span>
                                                            <input
                                                                type="number"
                                                                placeholder={`Full: ₹${netPayable > 0 ? netPayable : 0}`}
                                                                value={amountPaying}
                                                                onChange={e => setAmountPaying(e.target.value)}
                                                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-bold outline-none focus:border-brand-600"
                                                            />
                                                        </div>
                                                        {amountPaying !== '' && (Number(amountPaying) < netPayable) && (
                                                            <p className="text-[10px] text-right font-black text-orange-600 uppercase tracking-widest">
                                                                Carrying Forward: ₹{(netPayable - Number(amountPaying)).toLocaleString()}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <button
                                                        onClick={handleSettleAccount}
                                                        disabled={netPayable <= 0 && totalMonthEarnings === 0 && previousDues === 0}
                                                        className="w-full h-16 bg-brand-600 text-white rounded-xl font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:bg-brand-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                                    >
                                                        <FiDollarSign size={20} /> Clear Dues & Settle
                                                    </button>

                                                    {/* Final Clearance Button - Only show when all dues are settled */}
                                                    {netPayable <= 0 && unsettledAdvances === 0 && (
                                                        <button
                                                            onClick={handleFinalClearance}
                                                            className="w-full h-16 bg-rose-600 text-white rounded-xl font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:bg-rose-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3 border-2 border-rose-400"
                                                        >
                                                            <FiTrash2 size={20} /> Final Clearance - Remove Worker
                                                        </button>
                                                    )}

                                                    <p className="text-[10px] text-center font-bold text-slate-400 mt-2">
                                                        Payments less than the Total Due will remain as 'Pending Dues'.
                                                    </p>
                                                </div>
                                            );
                                        })()}
                                    </div>

                                    {/* Settlement History */}
                                    {selectedCalendarStaff.settlements?.length > 0 && (
                                        <div>
                                            <h4 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4">Settlement History</h4>
                                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                                                <table className="w-full text-left">
                                                    <thead className="bg-slate-50 dark:bg-slate-800/50">
                                                        <tr>
                                                            <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                                                            <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Paid Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                                        {selectedCalendarStaff.settlements.slice().reverse().map((settlement, idx) => (
                                                            <tr key={idx}>
                                                                <td className="px-6 py-4 text-xs font-bold text-slate-600 dark:text-slate-400">
                                                                    {new Date(settlement.date).toLocaleDateString()}
                                                                    <span className="block text-[9px] text-slate-400">{settlement.notes || 'Settlement'}</span>
                                                                </td>
                                                                <td className="px-6 py-4 text-sm font-black text-emerald-600 text-right">
                                                                    ₹{settlement.netAmount?.toLocaleString()}
                                                                    <div className="text-[9px] font-bold text-slate-400">
                                                                        Earned: ₹{settlement.totalEarnings} | Deducted: ₹{settlement.totalDeductions}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )
            }


            {
                isAddModalOpen && (
                    <AddLabourModal
                        initialData={editingStaff}
                        onClose={() => { setIsAddModalOpen(false); setEditingStaff(null); }}
                        onSuccess={(updatedLabour) => {
                            if (editingStaff) {
                                setStaffData(prev => prev.map(s => s._id === updatedLabour._id ? updatedLabour : s));
                            } else {
                                setStaffData(prev => [updatedLabour, ...prev]);
                            }
                            setIsAddModalOpen(false);
                            setEditingStaff(null);
                        }}
                    />
                )
            }

            {
                isSettingsModalOpen && (
                    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xl">
                        <div className="w-full max-w-md bg-white dark:bg-slate-950 rounded-[2.5rem] p-10">
                            <h3 className="text-xl font-black uppercase mb-6" style={{ color: theme.textPrimary }}>Settings</h3>
                            <button onClick={() => setIsSettingsModalOpen(false)} className="w-full h-14 bg-brand-600 text-white rounded-2xl font-black text-xs uppercase">Close</button>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default LabourManagement;
