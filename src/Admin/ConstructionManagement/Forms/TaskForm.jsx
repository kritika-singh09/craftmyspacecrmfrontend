import { useState } from 'react';
import { taskStatuses } from '../../../data/databaseDummyData';

const TaskForm = ({ onSubmit, initialData = null, projects = [], sites = [], contractors = [] }) => {
  const [formData, setFormData] = useState({
    project_id: initialData?.project_id || '',
    site_id: initialData?.site_id || '',
    contractor_id: initialData?.contractor_id || '',
    name: initialData?.name || '',
    start_date: initialData?.start_date || '',
    end_date: initialData?.end_date || '',
    status: initialData?.status || 'Pending',
    progress_percent: initialData?.progress_percent || '0',
    daily_report: initialData?.daily_report || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 form-container">
      <div>
        <label className="block text-sm font-medium text-gray-700">Task Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
          placeholder="Foundation Excavation"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Project *</label>
          <select
            name="project_id"
            value={formData.project_id}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
            required
          >
            <option value="">Select Project</option>
            {projects.map(project => (
              <option key={project.project_id} value={project.project_id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Site</label>
          <select
            name="site_id"
            value={formData.site_id}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
          >
            <option value="">Select Site</option>
            {sites.map(site => (
              <option key={site.site_id} value={site.site_id}>
                {site.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contractor *</label>
          <select
            name="contractor_id"
            value={formData.contractor_id}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
            required
          >
            <option value="">Select Contractor</option>
            {contractors.map(contractor => (
              <option key={contractor.contractor_id} value={contractor.contractor_id}>
                {contractor.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date *</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date *</label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
          >
            {taskStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Progress (%)</label>
          <input
            type="number"
            name="progress_percent"
            value={formData.progress_percent}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
            min="0"
            max="100"
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Daily Report</label>
        <textarea
          name="daily_report"
          value={formData.daily_report}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
          rows="3"
          placeholder="Task progress notes..."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-brand-600 text-white py-2 px-4 rounded-md hover:bg-brand-700"
      >
        {initialData ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;
