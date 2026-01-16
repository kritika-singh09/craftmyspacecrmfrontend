import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectStatuses } from '../../../data/databaseDummyData';
import { FiX } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

const ProjectForm = ({ onSubmit, initialData = null, clients = [] }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    location: initialData?.location || '',
    client_id: initialData?.client_id || '',
    budget: initialData?.budget || '',
    start_date: initialData?.start_date || '',
    end_date: initialData?.end_date || '',
    status: initialData?.status || 'Planning'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    color: theme.textPrimary
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
          className="absolute top-4 right-4 p-2 rounded-full hover:opacity-70 transition-colors z-10"
          style={{ color: theme.textMuted }}
        >
          <FiX className="w-6 h-6" />
        </button>

        {/* Form Header */}
        <div
          className="sticky top-0 px-8 py-6 rounded-t-2xl"
          style={{
            background: theme.cardBg || 'white',
            borderBottom: `1px solid ${theme.borderColor || theme.cardBorder}`
          }}
        >
          <h2 className="text-2xl font-bold" style={{ color: theme.textPrimary }}>
            {initialData ? 'Edit Project' : 'Create New Project'}
          </h2>
          <p className="text-sm mt-1" style={{ color: theme.textMuted }}>
            Fill in the details below to {initialData ? 'update' : 'create'} the project
          </p>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: theme.textSecondary }}>Project Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 rounded-xl transition-all"
              style={inputStyle}
              placeholder="Shopping Mall Construction"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: theme.textSecondary }}>Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 rounded-xl transition-all"
                style={inputStyle}
                placeholder="Lucknow, UP"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: theme.textSecondary }}>Client</label>
              <select
                name="client_id"
                value={formData.client_id}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 rounded-xl transition-all"
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
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: theme.textSecondary }}>Budget (₹) *</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 rounded-xl transition-all"
              style={inputStyle}
              placeholder="50000000"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: theme.textSecondary }}>Start Date *</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 rounded-xl transition-all"
                style={inputStyle}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: theme.textSecondary }}>End Date *</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 rounded-xl transition-all"
                style={inputStyle}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: theme.textSecondary }}>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 rounded-xl transition-all"
              style={inputStyle}
            >
              {projectStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-4" style={{ borderTop: `1px solid ${theme.borderColor || theme.cardBorder}` }}>
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 border-2 rounded-xl font-semibold hover:opacity-80 transition-all"
              style={{
                borderColor: theme.cardBorder || theme.borderColor,
                color: theme.textSecondary
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              style={{
                background: theme.gradients.primary,
                color: 'white'
              }}
            >
              {initialData ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
