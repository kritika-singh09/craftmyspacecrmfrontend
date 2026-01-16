import { useState } from 'react';
import { financeTypes, paymentStatuses } from '../../../data/databaseDummyData';

const FinanceForm = ({ onSubmit, initialData = null, projects = [], vendors = [], contractors = [], clients = [] }) => {
  const [formData, setFormData] = useState({
    project_id: initialData?.project_id || '',
    type: initialData?.type || 'Expense',
    description: initialData?.description || '',
    amount: initialData?.amount || '',
    vendor_id: initialData?.vendor_id || '',
    contractor_id: initialData?.contractor_id || '',
    client_id: initialData?.client_id || '',
    status: initialData?.status || 'Pending',
    payment_date: initialData?.payment_date || ''
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900">Project *</label>
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
          <label className="block text-sm font-medium text-gray-900">Type *</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
            required
          >
            {financeTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900">Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
          rows="2"
          placeholder="Cement purchase for foundation"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900">Amount (₹) *</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
          placeholder="76000"
          required
        />
      </div>

      {/* Conditional fields based on type */}
      {formData.type === 'Expense' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900">Vendor</label>
            <select
              name="vendor_id"
              value={formData.vendor_id}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
            >
              <option value="">Select Vendor</option>
              {vendors.map(vendor => (
                <option key={vendor.vendor_id} value={vendor.vendor_id}>
                  {vendor.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Contractor</label>
            <select
              name="contractor_id"
              value={formData.contractor_id}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
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
      )}

      {formData.type === 'Revenue' && (
        <div>
          <label className="block text-sm font-medium text-gray-900">Client</label>
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
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
          >
            {paymentStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900">Payment Date</label>
          <input
            type="date"
            name="payment_date"
            value={formData.payment_date}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-brand-600 text-white py-2 px-4 rounded-md hover:bg-brand-700"
      >
        {initialData ? 'Update Finance Record' : 'Add Finance Record'}
      </button>
    </form>
  );
};

export default FinanceForm;
