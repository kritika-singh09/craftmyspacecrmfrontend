import { useState } from 'react';
import { useTenant } from '../../../hooks/useTenant.jsx';
import { useTheme } from '../../../context/ThemeContext.jsx';
import { tenantData } from '../../../data/tenantData';
import WorkforceForm from './WorkforceForm';
import AttendanceForm from './AttendanceForm';
import WorkerProfile from './WorkerProfile';
import RoleGuard from '../../../common/RoleGuard';
import { FiPlus, FiEdit2, FiTrash2, FiUser, FiBriefcase, FiX, FiCheckCircle, FiClock, FiAlertCircle } from 'react-icons/fi';

const Workforce = () => {
  const { currentTenant } = useTenant();
  const { theme } = useTheme();
  const data = tenantData[currentTenant.id];

  const [workerList, setWorkerList] = useState(data.workforce);
  const [showForm, setShowForm] = useState(false);
  const [editingWorker, setEditingWorker] = useState(null);

  const [showAttendance, setShowAttendance] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);

  const handleMarkAttendance = (worker) => {
    setSelectedWorker(worker);
    setShowAttendance(true);
  };

  const handleAttendanceSubmit = (attendanceData) => {
    console.log("Attendance Recorded:", attendanceData);
    // In a real app, we would update the attendance table state here
    setShowAttendance(false);
  };

  const handleViewProfile = (worker) => {
    setSelectedWorker(worker);
    setShowProfile(true);
  };

  const handleAdd = () => {
    setEditingWorker(null);
    setShowForm(true);
  };

  const handleEdit = (worker) => {
    setEditingWorker(worker);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this worker?")) {
      setWorkerList(workerList.filter(w => w.id !== id));
    }
  };

  const handleFormSubmit = (formData) => {
    if (editingWorker) {
      setWorkerList(workerList.map(w =>
        w.id === editingWorker.id ? { ...w, ...formData } : w
      ));
    } else {
      const newWorker = {
        ...formData,
        id: Math.max(0, ...workerList.map(w => w.id)) + 1
      };
      setWorkerList([...workerList, newWorker]);
    }
    setShowForm(false);
  };

  const stats = {
    present: workerList.length - 1, // Mock logic
    absent: 1,
    late: 0
  };

  if (showProfile && selectedWorker) {
    return (
      <WorkerProfile
        worker={selectedWorker}
        onBack={() => setShowProfile(false)}
      />
    );
  }

  return (
    <div className="space-y-8 pb-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: theme.textPrimary }}>Workforce</h2>
          <p className="text-sm font-medium mt-1" style={{ color: theme.textSecondary }}>Personnel and Performance Tracking</p>
        </div>
        <button
          onClick={handleAdd}
          className="group flex items-center gap-2 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-[0.15em] text-[11px] shadow-premium transition-all hover:-translate-y-0.5"
          style={{ background: theme.gradients.button }}
        >
          <FiPlus className="text-sm group-hover:rotate-90 transition-transform" />
          Add Worker
        </button>
      </div>

      {/* Workforce Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workerList.map((worker) => (
          <div key={worker.id} className="card-premium p-6 group flex flex-col" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-premium-sm border"
                  style={{ backgroundColor: theme.background, borderColor: theme.cardBorder, color: theme.primary }}
                >
                  <FiUser />
                </div>
                <div>
                  <h3 className="text-lg font-black transition-colors leading-tight mb-1" style={{ color: theme.textPrimary }}>{worker.name}</h3>
                  <div className="flex items-center gap-1.5">
                    <FiBriefcase className="text-[10px]" style={{ color: theme.textMuted }} />
                    <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: theme.textMuted }}>{worker.role}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <RoleGuard requiredRole="manager">
                  <button
                    onClick={() => handleEdit(worker)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border transition-all hover:text-white"
                    style={{ borderColor: theme.cardBorder, color: theme.textSecondary }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = theme.primary; e.currentTarget.style.borderColor = theme.primary; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = theme.cardBorder; }}
                  >
                    <FiEdit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(worker.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-red-100 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </RoleGuard>
              </div>
            </div>

            <div className="space-y-3 mb-6 flex-grow">
              <div className="flex justify-between items-center py-2.5 border-b" style={{ borderColor: theme.cardBorder }}>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textMuted }}>Assigned Project</span>
                <span className="text-xs font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>{worker.project}</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b" style={{ borderColor: theme.cardBorder }}>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textMuted }}>Daily Wage</span>
                <span className="text-sm font-black" style={{ color: theme.primary }}>₹{worker.wage}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-auto">
              <button
                onClick={() => handleMarkAttendance(worker)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white text-[11px] font-black uppercase tracking-[0.15em] shadow-premium-sm transition-all hover:-translate-y-0.5"
                style={{ background: theme.gradients.button }}
              >
                <FiClock className="text-sm" />
                Attendance
              </button>
              <button
                onClick={() => handleViewProfile(worker)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] transition-all border-2"
                style={{ backgroundColor: theme.background, color: theme.textPrimary, borderColor: theme.cardBorder }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = theme.primary; e.currentTarget.style.color = theme.primary; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = theme.cardBorder; e.currentTarget.style.color = theme.textPrimary; }}
              >
                <FiUser className="text-sm" />
                Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Attendance Section */}
      <div className="card-premium p-8" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
        <h3 className="text-xl font-black mb-8" style={{ color: theme.textPrimary }}>Today's Attendance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100 flex items-center justify-between group hover:bg-green-50 transition-all">
            <div>
              <p className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em] mb-1">Present</p>
              <p className="text-3xl font-black text-green-700">{stats.present}</p>
            </div>
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl border border-green-100"><FiCheckCircle className="text-green-500" /></div>
          </div>
          <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100 flex items-center justify-between group hover:bg-red-50 transition-all">
            <div>
              <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em] mb-1">Absent</p>
              <p className="text-3xl font-black text-red-700">{stats.absent}</p>
            </div>
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl border border-red-100"><FiX className="text-red-500" /></div>
          </div>
          <div className="bg-yellow-50/50 p-6 rounded-2xl border border-yellow-100 flex items-center justify-between group hover:bg-yellow-50 transition-all">
            <div>
              <p className="text-[10px] font-black text-yellow-600 uppercase tracking-[0.2em] mb-1">Late</p>
              <p className="text-3xl font-black text-yellow-700">{stats.late}</p>
            </div>
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl border border-yellow-100"><FiAlertCircle className="text-yellow-500" /></div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: theme.cardBorder }}>
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Worker</th>
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Role / Project</th>
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Hours</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ divideColor: theme.cardBorder }}>
              {workerList.map((worker) => (
                <tr key={worker.id} className="group hover:bg-slate-50/50 transition-all" style={{ backgroundColor: theme.cardBg }}>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="font-bold" style={{ color: theme.textPrimary }}>{worker.name}</div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <p className="text-xs font-bold" style={{ color: theme.textPrimary }}>{worker.role}</p>
                    <p className="text-[10px] font-black uppercase tracking-tight text-slate-400">{worker.project}</p>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-green-50 text-green-700 border border-green-200 rounded-xl">
                      Present
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right">
                    <span className="font-black text-sm" style={{ color: theme.textPrimary }}>8.0</span>
                    <span className="text-[10px] font-bold ml-1 text-slate-400">HRS</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-[100] p-4" style={{ backgroundColor: `${theme.textPrimary}40` }}>
          <div className="bg-white rounded-[2.5rem] shadow-premium w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-300" style={{ backgroundColor: theme.cardBg }}>
            <div className="table-header-premium p-6 text-white relative" style={{ background: theme.gradients.primary }}>
              <div className="pr-12">
                <h3 className="text-xl font-black">
                  {editingWorker ? 'Edit Worker' : 'Register New Worker'}
                </h3>
                <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest mt-1">Personnel & Resource Management</p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white"
              >
                <FiX />
              </button>
            </div>
            <div className="p-8">
              <WorkforceForm
                onSubmit={handleFormSubmit}
                initialData={editingWorker}
                projects={data.projects}
              />
            </div>
          </div>
        </div>
      )}

      {showAttendance && selectedWorker && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-[100] p-4" style={{ backgroundColor: `${theme.textPrimary}40` }}>
          <div className="bg-white rounded-[2.5rem] shadow-premium w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-300" style={{ backgroundColor: theme.cardBg }}>
            <div className="table-header-premium p-6 text-white relative" style={{ background: theme.gradients.primary }}>
              <div className="pr-12">
                <h3 className="text-xl font-black">Mark Attendance</h3>
                <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest mt-1">Daily Operations Tracking</p>
              </div>
              <button
                onClick={() => setShowAttendance(false)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white"
              >
                <FiX />
              </button>
            </div>
            <div className="p-8">
              <AttendanceForm
                worker={selectedWorker}
                onSubmit={handleAttendanceSubmit}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workforce;
