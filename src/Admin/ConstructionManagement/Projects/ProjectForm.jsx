import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectStatuses } from '../../../data/databaseDummyData';
import { FiX, FiCheck, FiSave, FiLock } from 'react-icons/fi';
import { MdHome, MdArchitecture } from 'react-icons/md';
import { GiHammerNails } from 'react-icons/gi';
import { useTheme } from '../../../context/ThemeContext';
import { useSubscription } from '../../../hooks/useSubscription';

const ProjectForm = ({ onSubmit, initialData = null, clients = [] }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { isModuleLocked } = useSubscription();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    location: initialData?.location || '',
    client_id: initialData?.client_id || '',
    budget: initialData?.budget || '',
    start_date: initialData?.start_date || '',
    end_date: initialData?.end_date || '',
    status: initialData?.status || 'Planning',
    modules: initialData?.modules || {
      architecture: { enabled: false, status: 'LOCKED' },
      interior: { enabled: false, status: 'LOCKED' },
      construction: { enabled: false, status: 'LOCKED' }
    }
  });

  const moduleConfigs = [
    { id: 'architecture', name: 'Architecture', subscriptionKey: 'Architecture', icon: <MdArchitecture className="text-2xl" />, color: 'emerald' },
    { id: 'interior', name: 'Interior Design', subscriptionKey: 'Interior', icon: <MdHome className="text-2xl" />, color: 'orange' },
    { id: 'construction', name: 'Construction', subscriptionKey: 'Construction', icon: <GiHammerNails className="text-2xl" />, color: 'blue' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleModule = (moduleName) => {
    const config = moduleConfigs.find(m => m.id === moduleName);
    if (isModuleLocked(config?.subscriptionKey)) return;

    setFormData(prev => ({
      ...prev,
      modules: {
        ...prev.modules,
        [moduleName]: {
          enabled: !prev.modules[moduleName].enabled,
          status: !prev.modules[moduleName].enabled ? 'ONGOING' : 'LOCKED'
        }
      }
    }));
  };

  const handleClose = () => {
    navigate(-1);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const inputStyle = {
    borderColor: theme.cardBorder || theme.borderColor,
    color: theme.textPrimary,
    backgroundColor: theme.background
  };

  return (
    <div
      className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative" style={{ background: theme.cardBg || 'white' }}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:opacity-70 transition-colors z-10 text-white/80 hover:text-white"
        >
          <FiX className="w-6 h-6" />
        </button>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="card-premium overflow-hidden" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>

            {/* Dark Header Section */}
            <div className="px-8 py-6" style={{
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary || theme.primary})`,
              color: 'white'
            }}>
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-black tracking-tight text-white">
                    {initialData ? 'Edit Project' : 'Create New Project'}
                  </h2>
                  <p className="text-sm font-medium mt-1 text-white/80">
                    {initialData ? `Project Code: ${initialData.projectCode}` : 'Project code will be auto-generated'}
                  </p>
                </div>
                {false && ( // Placeholder for draft check if needed
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl text-sm font-bold">
                    <FiCheck /> Draft Saved
                  </div>
                )}
              </div>
            </div>

            <div className="p-8">
              {/* Basic Information */}
              <div className="mb-10">
                <h3 className="text-xl font-black mb-6" style={{ color: theme.textPrimary }}>Basic Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Project Name */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>
                      Project Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none theme-focus`}
                      style={inputStyle}
                      placeholder="Enter project name"
                      required
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none theme-focus`}
                      style={inputStyle}
                      placeholder="City, State, Country"
                      required
                    />
                  </div>

                  {/* Client */}
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>
                      Client Name <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="client_id"
                      value={formData.client_id}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none theme-focus`}
                      style={inputStyle}
                    >
                      <option value="">Select Client</option>
                      {clients.map(client => (
                        <option key={client.client_id} value={client.client_id}>
                          {client.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>
                      Budget (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none theme-focus`}
                      style={inputStyle}
                      placeholder="Enter budget amount"
                      min="0"
                      required
                    />
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none theme-focus`}
                      style={{
                        ...inputStyle,
                        colorScheme: theme.mode === 'dark' ? 'dark' : 'light'
                      }}
                      required
                    />
                  </div>

                  {/* End Date */}
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="end_date"
                      value={formData.end_date}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none theme-focus`}
                      style={{
                        ...inputStyle,
                        colorScheme: theme.mode === 'dark' ? 'dark' : 'light'
                      }}
                      required
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border focus:outline-none theme-focus"
                      style={inputStyle}
                    >
                      {projectStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>
                      Description / Notes
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 rounded-xl border focus:outline-none theme-focus"
                      style={inputStyle}
                      placeholder="Enter project description or notes"
                    />
                  </div>
                </div>
              </div>

              {/* Module Selection */}
              <div className="mb-10">
                <h3 className="text-xl font-black mb-4" style={{ color: theme.textPrimary }}>Project Modules</h3>
                <p className="text-sm font-medium mb-6" style={{ color: theme.textMuted }}>
                  Select which modules to enable for this project. <span className="opacity-70">(Modules may be locked based on your subscription plan)</span>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {moduleConfigs.map(module => {
                    const isEnabled = formData.modules[module.id].enabled;
                    const isLocked = isModuleLocked(module.subscriptionKey);

                    return (
                      <div
                        key={module.id}
                        onClick={() => !isLocked && toggleModule(module.id)}
                        className={`p-6 rounded-2xl border-2 transition-all relative overflow-hidden group ${isLocked
                            ? 'cursor-not-allowed opacity-60 grayscale'
                            : 'cursor-pointer hover:-translate-y-1'
                          }`}
                        style={{
                          borderColor: isEnabled
                            ? theme.primary
                            : isLocked ? theme.borderColor : theme.cardBorder,
                          backgroundColor: isEnabled
                            ? `${theme.primary}10`
                            : isLocked ? `${theme.background}80` : theme.background
                        }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center`}
                            style={{
                              backgroundColor: isEnabled ? theme.primary : `${theme.iconBg}20`,
                              color: isEnabled ? 'white' : theme.textMuted
                            }}
                          >
                            {isLocked ? <FiLock className="text-xl" /> : module.icon}
                          </div>
                          {isEnabled && <FiCheck className="text-xl" style={{ color: theme.primary }} />}
                          {isLocked && (
                            <div className="text-xs font-bold px-2 py-1 rounded bg-gray-200 text-gray-500">
                              LOCKED
                            </div>
                          )}
                        </div>
                        <h4 className="font-black text-lg" style={{ color: theme.textPrimary }}>{module.name}</h4>
                        <p className="text-xs mt-2 font-medium" style={{ color: isEnabled ? theme.primary : theme.textMuted }}>
                          {isLocked ? 'Upgrade Plan' : isEnabled ? 'Enabled' : 'Click to enable'}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6" style={{ borderTop: `1px solid ${theme.borderColor || theme.cardBorder}` }}>
                <button
                  type="button"
                  onClick={() => onClose ? onClose() : navigate('/projects')}
                  className="px-6 py-3 rounded-xl font-bold text-sm border hover:bg-opacity-10 transition-all"
                  style={{ color: theme.textPrimary, borderColor: theme.cardBorder, backgroundColor: theme.background }}
                >
                  <FiX className="inline mr-2" /> Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:shadow-lg hover:-translate-y-0.5"
                  style={{ background: theme.gradients.button }}
                >
                  <FiSave className="inline mr-2" />
                  {initialData ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
