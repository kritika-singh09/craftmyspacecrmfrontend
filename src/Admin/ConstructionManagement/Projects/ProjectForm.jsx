import { useState } from 'react';
import { projectStatuses } from '../../../data/databaseDummyData';

const ProjectForm = ({ onSubmit, initialData = null, clients = [] }) => {
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6 form-container max-w-6xl mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700">Project Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
          placeholder="Shopping Mall Construction"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
            placeholder="Lucknow, UP"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Client</label>
          <select
            name="client_id"
            value={formData.client_id}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
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
        <label className="block text-sm font-medium text-gray-700">Budget (₹) *</label>
        <input
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
          placeholder="50000000"
          required
        />
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

      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
        >
          {projectStatuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-brand-600 text-white py-2 px-4 rounded-md hover:bg-brand-700"
      >
        {initialData ? 'Update Project' : 'Create Project'}
      </button>
    </form>
  );
};

export default ProjectForm;
