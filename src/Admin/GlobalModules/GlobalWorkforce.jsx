import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';

import { FiUserPlus, FiSearch, FiChevronDown, FiEdit3, FiTrash2, FiCalendar, FiPlus, FiCheck, FiX, FiClock, FiDollarSign, FiSettings, FiArrowLeft, FiArrowRight, FiInfo, FiChevronRight, FiMail, FiPhone, FiSave } from 'react-icons/fi';

import { tenantData } from '../../data/tenantData';
import { useTenant } from '../../hooks/useTenant.jsx';
import { useAuth } from '../../hooks/useAuth.jsx';
import AddStaffModal from '../ConstructionManagement/Workforce/AddStaffModal';
import { IoCheckmarkCircle, IoCloseCircle, IoTime, IoWarningOutline } from 'react-icons/io5';

// Memoized Sub-components for Performance
const StaffCard = React.memo(({ staff, theme, onEdit, onDelete, onJournal, onQuickAttendance }) => {
    // Helper to get YYYY-MM-DD in local time
    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };

    return (
        <div className="card-premium p-6 md:p-8 group border-none ring-1 ring-slate-100 dark:ring-slate-800 hover:shadow-2xl transition-all relative overflow-hidden" style={{ backgroundColor: theme.cardBg }}>
            <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-2xl font-black text-slate-300 border border-slate-100 dark:border-white/5">
                    {staff?.personalDetails?.name?.[0] || 'S'}
                </div>
                <div className="flex gap-2">
                    <button onClick={() => onEdit(staff)} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-brand-600 transition-colors">
                        <FiEdit3 size={18} />
                    </button>
                    <button onClick={() => onDelete(staff._id, staff.personalDetails?.name)} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-rose-600 transition-colors">
                        <FiTrash2 size={18} />
                    </button>
                </div>
            </div>
            <div className="space-y-1 mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-black tracking-tight" style={{ color: theme.textPrimary }}>{staff.personalDetails?.name}</h3>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${staff.type === 'Site' ? 'bg-orange-100 text-orange-600 border-orange-200' : 'bg-blue-100 text-blue-600 border-blue-200'}`}>
                        {staff.type === 'Site' ? 'Site' : 'Office'}
                    </span>
                </div>
                <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest">{staff.officeDetails?.designation || staff.category} • {staff.officeDetails?.department || staff.vendorSubType || 'General'}</p>
            </div>
            <div className="space-y-4 pt-6 border-t border-slate-50 dark:border-white/5">
                <div className="flex items-center gap-3 text-xs font-bold text-slate-500"><FiMail className="shrink-0" /> {staff.personalDetails?.email}</div>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-500"><FiPhone className="shrink-0" /> {staff.personalDetails?.mobile}</div>
                <div className="flex items-center justify-between pt-4 pb-2 border-t border-slate-50 dark:border-white/5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Today's Attendance</span>
                    {(() => {
                        const todayStr = formatDate(new Date());
                        const att = staff.attendance?.find(a => formatDate(a.date) === todayStr);
                        const status = att?.status || 'None';
                        return (
                            <select
                                value={status}
                                onChange={(e) => onQuickAttendance(staff._id, e.target.value)}
                                className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border-none outline-none cursor-pointer transition-all ${status === 'P' ? 'bg-emerald-100 text-emerald-700' :
                                    status === 'A' ? 'bg-rose-100 text-rose-700' :
                                        status === 'HD' ? 'bg-amber-100 text-amber-700' :
                                            status === 'Late' ? 'bg-orange-100 text-orange-700' :
                                                'bg-slate-100 text-slate-500'
                                    }`}
                            >
                                <option value="None">Mark</option>
                                <option value="P">P</option>
                                <option value="A">A</option>
                                <option value="HD">HD</option>
                                <option value="Late">L</option>
                            </select>
                        );
                    })()}
                </div>
                <div className="flex items-center justify-between pt-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{staff.type === 'Office' ? 'Monthly Salary' : 'Daily Wage'}</span>
                    <span className="text-lg font-black tracking-tight" style={{ color: theme.textPrimary }}>₹{(staff.dailyWage || 0).toLocaleString()}</span>
                </div>
            </div>
            <button onClick={() => onJournal(staff)} className="mt-6 w-full h-12 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-600 hover:border-brand-600/30 transition-all flex items-center justify-center gap-2">
                <FiCalendar /> Monthly Attendance
            </button>
        </div>
    );
});

const StaffRow = React.memo(({ staff, theme, onEdit, onDelete, onJournal, onQuickAttendance }) => {
    // Helper to get YYYY-MM-DD in local time
    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };

    return (
        <tr key={staff._id || staff.workerId} className="border-b border-slate-50 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
            <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-lg font-black text-slate-300 border border-slate-100 dark:border-white/5">
                        {staff?.personalDetails?.name?.[0] || 'S'}
                    </div>
                    <div>
                        <p className="text-sm font-black tracking-tight" style={{ color: theme.textPrimary }}>{staff.personalDetails?.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-0.5">ID: {staff.workerId}</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-5">
                <p className="text-sm font-bold" style={{ color: theme.textPrimary }}>{staff.officeDetails?.designation || staff.category}</p>
                <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs font-bold text-slate-400">{staff.officeDetails?.department || staff.vendorSubType || 'General'}</p>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border ${staff.type === 'Site' ? 'bg-orange-100 text-orange-600 border-orange-200' : 'bg-blue-100 text-blue-600 border-blue-200'
                        }`}>
                        {staff.type === 'Site' ? 'Site Staff' : 'Office Staff'}
                    </span>
                </div>
            </td>
            <td className="px-6 py-5">
                <div className="space-y-2 text-xs font-bold text-slate-500">
                    <div className="flex items-center gap-2"><FiMail size={14} /> {staff.personalDetails?.email}</div>
                    <div className="flex items-center gap-2"><FiPhone size={14} /> {staff.personalDetails?.mobile}</div>
                </div>
            </td>
            <td className="px-6 py-5 text-right">
                <p className="text-lg font-black tracking-tight" style={{ color: theme.textPrimary }}>₹{(staff.dailyWage || 0).toLocaleString()}</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase">{staff.type === 'Office' ? 'Monthly Salary' : 'Daily Wage'}</p>
            </td>
            <td className="px-6 py-5">
                <div className="flex justify-center">
                    {(() => {
                        const todayStr = formatDate(new Date());
                        const att = staff.attendance?.find(a => formatDate(a.date) === todayStr);
                        const status = att?.status || 'None';
                        return (
                            <select
                                value={status}
                                onChange={(e) => onQuickAttendance(staff._id, e.target.value)}
                                className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border-none outline-none cursor-pointer transition-all ${status === 'P' ? 'bg-emerald-100 text-emerald-700' :
                                    status === 'A' ? 'bg-rose-100 text-rose-700' :
                                        status === 'HD' ? 'bg-amber-100 text-amber-700' :
                                            status === 'Late' ? 'bg-orange-100 text-orange-700' :
                                                'bg-slate-100 text-slate-500'
                                    }`}
                            >
                                <option value="None">Mark</option>
                                <option value="P">Present (P)</option>
                                <option value="A">Absent (A)</option>
                                <option value="HD">Half Day (HD)</option>
                                <option value="Late">Late Entry</option>
                            </select>
                        );
                    })()}
                </div>
            </td>
            <td className="px-6 py-5">
                <div className="flex items-center justify-center gap-2">
                    <button onClick={() => onJournal(staff)} className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-brand-600" title="Monthly Attendance"><FiCalendar size={18} /></button>
                    <button onClick={() => onEdit(staff)} className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-brand-600" title="Edit Staff"><FiEdit3 size={18} /></button>
                    <button onClick={() => onDelete(staff._id, staff.personalDetails?.name)} className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-rose-600" title="Delete Staff"><FiTrash2 size={18} /></button>
                </div>
            </td>
        </tr>
    );
});


const GlobalWorkforce = () => {
    const { theme } = useTheme();
    const { currentTenant } = useTenant();
    const { user } = useAuth();

    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState(null);
    const [selectedStaff, setSelectedStaff] = useState(null); // New state for selected staff for edit
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
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearchTerm(searchTerm), 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Helper to get YYYY-MM-DD in local time
    const formatDate = useCallback((date) => {
        if (!date) return '';
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }, []);

    const fetchStaff = useCallback(async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/workers`);
            const result = await response.json();
            if (result.success) {
                setStaffData(result.data);
            }
        } catch (error) {
            console.error('Failed to fetch staff:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStaff();
    }, [fetchStaff]);

    const getCalendarData = useCallback((year, month) => {
        const firstDay = new Date(year, month, 1).getDay();
        const startOffset = firstDay === 0 ? 6 : firstDay - 1;
        const totalDays = new Date(year, month + 1, 0).getDate();
        return { startOffset, totalDays };
    }, []);

    const markQuickAttendance = useCallback(async (staffId, status) => {
        const allowedRoles = ['SUPERVISOR', 'COMPANY_ADMIN', 'SUPER_ADMIN'];
        if (!allowedRoles.includes(user?.role)) {
            alert('Access Denied: Only Supervisors and Admins can mark attendance.');
            return;
        }

        const dateStr = formatDate(new Date());

        // Optimistic UI Update
        const previousData = [...staffData];
        setStaffData(prev => prev.map(s => {
            if (s._id === staffId) {
                const newAtt = [...(s.attendance || [])];
                const idx = newAtt.findIndex(a => formatDate(a.date) === dateStr);
                if (idx !== -1) {
                    newAtt[idx] = { ...newAtt[idx], status, lateFee: 0 };
                } else {
                    newAtt.push({ date: dateStr, status, lateFee: 0 });
                }
                return { ...s, attendance: newAtt };
            }
            return s;
        }));

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/workers/${staffId}/attendance`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ date: dateStr, status, lateFee: 0 })
            });
            const result = await response.json();
            if (!result.success) {
                setStaffData(previousData);
                alert('Failed to update attendance');
            }
        } catch (error) {
            console.error('Failed to update quick attendance:', error);
            setStaffData(previousData);
        }
    }, [user, staffData, formatDate]);

    const handleAttendanceUpdate = useCallback(async (dayIndex, status, fee) => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const dateStr = formatDate(new Date(year, month, dayIndex + 1));

        // Optimistic UI Update for Modal
        const previousSelectedStaff = { ...selectedCalendarStaff };
        const updatedAtt = [...(selectedCalendarStaff.attendance || [])];
        const idx = updatedAtt.findIndex(a => formatDate(a.date) === dateStr);
        if (idx !== -1) {
            updatedAtt[idx] = { ...updatedAtt[idx], status, lateFee: fee };
        } else {
            updatedAtt.push({ date: dateStr, status, lateFee: fee });
        }
        const updatedStaff = { ...selectedCalendarStaff, attendance: updatedAtt };

        setSelectedCalendarStaff(updatedStaff);
        setStaffData(prev => prev.map(s => s._id === updatedStaff._id ? updatedStaff : s));

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/workers/${selectedCalendarStaff._id}/attendance`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date: dateStr, status, lateFee: fee })
            });
            const result = await response.json();
            if (!result.success) {
                setSelectedCalendarStaff(previousSelectedStaff);
                setStaffData(prev => prev.map(s => s._id === previousSelectedStaff._id ? previousSelectedStaff : s));
                alert('Failed to update attendance');
            }
        } catch (error) {
            console.error('Failed to update attendance:', error);
            setSelectedCalendarStaff(previousSelectedStaff);
            setStaffData(prev => prev.map(s => s._id === previousSelectedStaff._id ? previousSelectedStaff : s));
        }
    }, [viewDate, selectedCalendarStaff, formatDate]);

    const toggleCalendarStatus = useCallback((dayIndex) => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const dateKey = formatDate(new Date(year, month, dayIndex + 1));

        const existingAtt = selectedCalendarStaff.attendance?.find(a =>
            formatDate(a.date) === dateKey
        );

        const currentStatus = existingAtt?.status || 'None';
        const currentFee = existingAtt?.lateFee || 0;

        const cycle = { 'None': 'P', 'P': 'A', 'A': 'HD', 'HD': 'Late', 'Late': 'P' };

        const allowedRoles = ['SUPERVISOR', 'COMPANY_ADMIN', 'SUPER_ADMIN'];
        if (!allowedRoles.includes(user?.role)) {
            alert('Access Denied: Only Supervisors and Admins can mark attendance.');
            return;
        }

        let nextStatus = cycle[currentStatus] || 'P';
        let nextFee = 0;

        if (currentStatus === 'Late') {
            const inputFee = Number(lateFeeInput);
            if (inputFee !== currentFee) {
                nextStatus = 'Late';
                nextFee = inputFee;
            } else {
                nextStatus = 'P';
                nextFee = 0;
            }
        } else if (nextStatus === 'Late') {
            nextFee = Number(lateFeeInput);
        }

        handleAttendanceUpdate(dayIndex, nextStatus, nextFee);
    }, [viewDate, selectedCalendarStaff, lateFeeInput, user, handleAttendanceUpdate, formatDate]);

    const handleAddAdvance = useCallback(async () => {
        if (!advanceAmount || !advanceReason) return alert('Please enter amount and reason');
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/workers/${selectedCalendarStaff._id}/advance`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
    }, [selectedCalendarStaff, advanceAmount, advanceReason]);

    const handleSettleAccount = useCallback(async () => {
        const finalAmount = amountPaying === '' ? 'FULL' : Number(amountPaying);
        const confirmMsg = amountPaying === ''
            ? 'Are you sure you want to clear all dues? This assumes you are paying the FULL amount.'
            : `Are you sure you want to settle? You are paying ₹${finalAmount}. Remaining balance will be carried forward.`;

        if (!window.confirm(confirmMsg)) return;

        try {
            const body = amountPaying !== '' ? { amountPaid: Number(amountPaying) } : {};
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/workers/${selectedCalendarStaff._id}/settle`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
    }, [selectedCalendarStaff, amountPaying]);

    const handleFinalClearance = useCallback(async () => {
        const allowedRoles = ['SUPERVISOR', 'COMPANY_ADMIN', 'SUPER_ADMIN'];
        if (!allowedRoles.includes(user?.role)) {
            alert('Access Denied: Only Supervisors and Admins can clear workers.');
            return;
        }

        const confirmMsg = `Are you sure you want to REMOVE ${selectedCalendarStaff.personalDetails?.name} from the active staff list?\n\nThis action will mark them as inactive. This should only be done after all dues are settled.`;
        if (!window.confirm(confirmMsg)) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/workers/${selectedCalendarStaff._id}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            if (result.success) {
                setStaffData(prev => prev.filter(s => s._id !== selectedCalendarStaff._id));
                setIsCalendarModalOpen(false);
                alert(`${selectedCalendarStaff.personalDetails?.name} has been removed from active staff.`);
            }
        } catch (error) {
            console.error('Failed to clear worker:', error);
            alert('Failed to remove worker. Please try again.');
        }
    }, [selectedCalendarStaff, user]);

    const handleDeleteStaff = useCallback(async (staffId, staffName) => {
        const allowedRoles = ['SUPERVISOR', 'COMPANY_ADMIN', 'SUPER_ADMIN'];
        if (!allowedRoles.includes(user?.role)) {
            alert('Access Denied: Only Supervisors and Admins can delete staff.');
            return;
        }

        if (!window.confirm(`Are you sure you want to delete ${staffName}? This action cannot be undone.`)) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/workers/${staffId}`, {
                method: 'DELETE'
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
    }, [user]);

    const changeMonth = useCallback((offset) => {
        setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
    }, []);

    const applyLateFeeToAll = useCallback(async () => {
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
            const updates = lateDays.map(a => ({ date: a.date, status: 'Late', lateFee: fee }));

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/workers/${selectedCalendarStaff._id}/attendance-batch`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ updates })
            });
            const result = await response.json();

            if (result.success) {
                setStaffData(prev => prev.map(s => s._id === result.data._id ? result.data : s));
                setSelectedCalendarStaff(result.data);
                alert('Late fees updated successfully!');
            } else {
                alert('Failed to update batch records.');
            }
        } catch (error) {
            console.error('Failed to batch update late fees:', error);
            alert('Failed to update records.');
        } finally {
            setIsSaving(false);
        }
    }, [viewDate, selectedCalendarStaff, lateFeeInput, user]);

    const handleEdit = useCallback((staff) => {
        setEditingStaff(staff);
        setIsAddModalOpen(true);
    }, []);

    const filteredStaff = useMemo(() => staffData.filter(s =>
        ((s.personalDetails?.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
            (s.workerId?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
            (s.officeDetails?.designation?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))) &&
        (filterType === 'All' || s.type === filterType)
    ), [staffData, debouncedSearchTerm, filterType]);

    const settlementData = useMemo(() => {
        if (!selectedCalendarStaff) return null;

        const isOfficeStaff = selectedCalendarStaff.type === 'Office';
        const monthlySalary = selectedCalendarStaff.dailyWage || 0;
        const dailyRate = isOfficeStaff ? (monthlySalary / 26) : monthlySalary;

        const attendance = selectedCalendarStaff.attendance || [];
        const targetMonth = viewDate.getMonth();
        const targetYear = viewDate.getFullYear();

        let totalMonthEarnings = 0;
        const currentMonthAtt = attendance.filter(a => {
            const d = new Date(a.date);
            return d.getMonth() === targetMonth && d.getFullYear() === targetYear;
        });

        currentMonthAtt.forEach(att => {
            if (att.paid) return;
            const s = (att.status === 'L' || att.status === 'Late') ? 'Late' : att.status;
            if (s === 'P') totalMonthEarnings += dailyRate;
            if (s === 'HD') totalMonthEarnings += (dailyRate * 0.5);
            if (s === 'Late') totalMonthEarnings += (dailyRate - (att.lateFee || 0));
        });

        const unsettledAdvances = selectedCalendarStaff.advances?.filter(a => !a.settled).reduce((sum, a) => sum + a.amount, 0) || 0;
        const previousDues = selectedCalendarStaff.pendingDues || 0;
        const totalEarningsPlusPrevious = totalMonthEarnings + previousDues;
        const netPayable = totalEarningsPlusPrevious - unsettledAdvances;

        return {
            totalMonthEarnings,
            unsettledAdvances,
            previousDues,
            totalEarningsPlusPrevious,
            netPayable,
            dailyRate
        };
    }, [selectedCalendarStaff, viewDate]);

    return (
        <div className="space-y-8 pb-12 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 md:gap-6">
                <div className="w-full lg:w-auto">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight flex items-center gap-2 md:gap-3" style={{ color: theme.textPrimary }}>
                        <span className="w-1.5 h-6 md:h-8 lg:h-10 rounded-full" style={{ backgroundColor: theme.primary }}></span>
                        Staff Directory
                    </h2>
                    <p className="text-[10px] md:text-xs font-black mt-1 opacity-50 uppercase tracking-widest" style={{ color: theme.textSecondary }}>Manage Personnel & Base Salaries Manually</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full lg:w-auto">
                    {/* <button
                        onClick={() => setIsSettingsModalOpen(true)}
                        className="h-12 md:h-14 px-4 md:px-6 rounded-xl md:rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-slate-400 hover:text-brand-600 transition-all flex items-center justify-center gap-3 min-w-[44px]"
                    >
                        <FiSettings size={18} />
                        <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest">Settings</span>
                    </button> */}
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="w-full sm:w-auto h-12 md:h-14 lg:h-16 px-6 md:px-8 lg:px-10 text-white rounded-xl md:rounded-2xl lg:rounded-3xl font-black text-[10px] md:text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 md:gap-3" style={{ background: theme.gradients.button }}
                    >
                        <FiUserPlus size={18} className="md:size-5" /> <span>Add New Staff</span>
                    </button>
                </div>
            </div>

            {/* Quick Directory Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                <div className="sm:col-span-1 lg:col-span-2 xl:col-span-2 relative">
                    <FiSearch className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-base md:text-lg text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by name, role, or ID..."
                        className="w-full h-12 md:h-14 lg:h-16 pl-12 md:pl-14 pr-4 md:pr-6 rounded-xl md:rounded-2xl lg:rounded-3xl card-premium border-2 border-slate-300 dark:border-slate-800 focus:border-brand-500 outline-none font-bold text-sm md:text-base transition-all"
                        style={{ backgroundColor: theme.cardBg, color: theme.textPrimary }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="card-premium h-12 md:h-14 lg:h-16 relative flex items-center justify-center p-0 overflow-hidden border-2 border-slate-300 dark:border-slate-800 rounded-xl md:rounded-2xl lg:rounded-3xl" style={{ backgroundColor: theme.cardBg }}>
                    <select
                        className="w-full h-full px-6 bg-transparent text-center font-black uppercase tracking-widest text-[10px] md:text-xs outline-none cursor-pointer text-slate-500 dark:text-slate-400 appearance-none relative z-10"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="All">All Staff Types</option>
                        <option value="Site">Site Staff</option>
                        <option value="Office">Office Staff</option>
                    </select>
                    <FiChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                </div>
            </div>

            {/* Unified Responsive Table View */}
            <div className="card-premium overflow-hidden border-none ring-1 ring-slate-100 dark:ring-slate-800" style={{ backgroundColor: theme.cardBg }}>
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-white/5">
                                <th className="text-left px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Staff</th>
                                <th className="text-left px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role & Department</th>
                                <th className="text-left px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
                                <th className="text-right px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Earnings Basis</th>
                                <th className="text-center px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Attendance (Today)</th>
                                <th className="text-center px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStaff.map((staff) => (
                                <StaffRow
                                    key={staff._id}
                                    staff={staff}
                                    theme={theme}
                                    onEdit={(s) => { setSelectedStaff(s); setIsEditModalOpen(true); }}
                                    onDelete={handleDeleteStaff}
                                    onJournal={(s) => { setSelectedCalendarStaff(s); setIsCalendarModalOpen(true); }}
                                    onQuickAttendance={markQuickAttendance}
                                />
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
                                        <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest">{selectedCalendarStaff.personalDetails?.name}</p>
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
                                    <div className="grid grid-cols-7 gap-1 md:gap-2 mb-8 auto-rows-fr">
                                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <div key={d} className="text-center text-[8px] sm:text-[9px] md:text-[10px] font-black text-slate-400 uppercase py-2">{d}</div>)}
                                        {Array.from({ length: getCalendarData(viewDate.getFullYear(), viewDate.getMonth()).startOffset }).map((_, i) => <div key={i} className="h-12 sm:h-16 md:h-20 bg-slate-50/20 dark:bg-white/5 rounded-lg md:rounded-xl opacity-20" />)}
                                        {Array.from({ length: getCalendarData(viewDate.getFullYear(), viewDate.getMonth()).totalDays }, (_, i) => i + 1).map(day => {
                                            const year = viewDate.getFullYear();
                                            const month = viewDate.getMonth();
                                            const dateKey = formatDate(new Date(year, month, day));

                                            const attEntry = selectedCalendarStaff.attendance?.find(a =>
                                                formatDate(a.date) === dateKey
                                            );

                                            const status = attEntry?.status || 'None';
                                            const fee = attEntry?.lateFee || 0;

                                            return (
                                                <button key={day} onClick={() => toggleCalendarStatus(day - 1)} className={`h-12 sm:h-16 md:h-20 rounded-lg md:rounded-xl border flex flex-col items-center justify-center gap-0.5 md:gap-1 transition-all hover:scale-105 active:scale-95 ${status === 'None' ? 'bg-slate-50/50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800' :
                                                    status === 'P' ? 'bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30' :
                                                        status === 'A' ? 'bg-rose-500/10 border-rose-200 dark:border-rose-500/30' :
                                                            status === 'Late' ? 'bg-orange-500/10 border-orange-200 dark:border-orange-500/30' :
                                                                'bg-slate-50/80 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                                                    }`}>
                                                    <span className="text-[8px] sm:text-[10px] font-black text-slate-400">{day}</span>
                                                    <span className={`text-[7px] sm:text-[9px] font-black uppercase ${status === 'P' ? 'text-emerald-600' :
                                                        status === 'A' ? 'text-rose-600' :
                                                            status === 'Late' ? 'text-orange-600' : 'text-slate-400'
                                                        }`}>{status === 'None' ? '-' : status}</span>
                                                    {status === 'Late' && fee > 0 && <span className="text-[6px] sm:text-[8px] font-bold text-orange-700 dark:text-orange-400">₹{fee}</span>}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {/* Attendance Stats & Salary Calculation */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
                                        {(() => {
                                            const attendance = selectedCalendarStaff.attendance || [];
                                            const targetMonth = viewDate.getMonth();
                                            const targetYear = viewDate.getFullYear();

                                            const currentMonthAtt = attendance.filter(a => {
                                                const d = new Date(a.date);
                                                return d.getMonth() === targetMonth && d.getFullYear() === targetYear;
                                            });

                                            const stats = currentMonthAtt.reduce((acc, curr) => {
                                                // Map old 'L' to 'Late' for stats counting to avoid confusion if old data exists
                                                const status = (curr.status === 'L' || curr.status === 'Late') ? 'Late' : curr.status;
                                                acc[status] = (acc[status] || 0) + 1;
                                                acc.totalLateFee = (acc.totalLateFee || 0) + (curr.lateFee || 0);
                                                return acc;
                                            }, { P: 0, A: 0, HD: 0, Late: 0, totalLateFee: 0 }); // Removed L from initial object

                                            // Calculate daily rate based on staff type
                                            const isOfficeStaff = selectedCalendarStaff.type === 'Office';
                                            const monthlySalary = selectedCalendarStaff.dailyWage || 0;
                                            const dailyRate = isOfficeStaff ? (monthlySalary / 26) : monthlySalary; // 26 working days for office staff

                                            // Calculation logic: P (full), HD (half), Late (full minus fee)
                                            const totalSalary = (stats.P * dailyRate) + (stats.HD * dailyRate * 0.5) + (stats.Late * dailyRate) - stats.totalLateFee;

                                            return (
                                                <>
                                                    <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 text-center">
                                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{isOfficeStaff ? 'Daily Rate' : 'Daily Wage'}</p>
                                                        <p className="text-xl font-black text-slate-600 dark:text-slate-300">₹{dailyRate.toFixed(2)}</p>
                                                        {isOfficeStaff && <p className="text-[8px] font-bold text-slate-400 mt-1">(₹{monthlySalary.toLocaleString()}/month)</p>}
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

                                        {settlementData && (
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center py-3 border-b border-brand-600/10">
                                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Net Earnings</span>
                                                    <span className="text-sm font-black text-blue-600">₹{settlementData.totalEarningsPlusPrevious.toLocaleString()}</span>
                                                </div>

                                                <div className="flex justify-between items-center py-3 border-b border-brand-600/10">
                                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Less: Unsettled Advances</span>
                                                    <span className="text-base font-black text-rose-600">-₹{settlementData.unsettledAdvances.toLocaleString()}</span>
                                                </div>

                                                <div className="bg-brand-50/50 dark:bg-brand-900/10 p-4 rounded-xl space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm font-black uppercase tracking-widest text-brand-800 dark:text-brand-400">Net Payable Amount</span>
                                                        <span className="text-2xl md:text-3xl font-black text-brand-600">₹{settlementData.netPayable.toLocaleString()}</span>
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Payment:</span>
                                                        <input
                                                            type="number"
                                                            placeholder={`Full: ₹${settlementData.netPayable > 0 ? settlementData.netPayable : 0}`}
                                                            value={amountPaying}
                                                            onChange={e => setAmountPaying(e.target.value)}
                                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-bold outline-none focus:border-brand-600"
                                                        />
                                                    </div>
                                                    {amountPaying !== '' && (Number(amountPaying) < settlementData.netPayable) && (
                                                        <p className="text-[10px] text-right font-black text-orange-600 uppercase tracking-widest">
                                                            Carrying Forward: ₹{(settlementData.netPayable - Number(amountPaying)).toLocaleString()}
                                                        </p>
                                                    )}
                                                </div>

                                                <button
                                                    onClick={handleSettleAccount}
                                                    disabled={settlementData.netPayable <= 0 && settlementData.totalMonthEarnings === 0 && settlementData.previousDues === 0}
                                                    className="w-full h-16 bg-brand-600 text-white rounded-xl font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:bg-brand-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                                >
                                                    <FiDollarSign size={20} /> Clear Dues & Settle
                                                </button>

                                                {settlementData.netPayable <= 0 && settlementData.unsettledAdvances === 0 && (
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
                                        )}
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
                    <AddStaffModal
                        editData={editingStaff}
                        onClose={() => { setIsAddModalOpen(false); setEditingStaff(null); }}
                        onSuccess={() => {
                            fetchStaff();
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

export default GlobalWorkforce;
