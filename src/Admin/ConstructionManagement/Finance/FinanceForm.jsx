import { useState } from 'react';
import { financeTypes, paymentStatuses } from '../../../data/databaseDummyData';
import { useTheme } from '../../../context/ThemeContext.jsx';

const FinanceForm = ({ onSubmit, initialData = null, projects = [], vendors = [], contractors = [], clients = [] }) => {
  const { theme } = useTheme();
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

  const inputStyle = {
    backgroundColor: `${theme.iconBg}10`,
    borderColor: theme.cardBorder,
    color: theme.textPrimary
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>Project *</label>
          <select
            name="project_id"
            value={formData.project_id}
            onChange={handleChange}
            className="block w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
            style={inputStyle}
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
          <label className="block text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>Type *</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="block w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
            style={inputStyle}
            required
          >
            {financeTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="block w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
          style={inputStyle}
          rows="2"
          placeholder="Cement purchase for foundation"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>Amount (₹) *</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="block w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
          style={inputStyle}
          placeholder="76000"
          required
        />
      </div>

      {/* Conditional fields based on type */}
      {formData.type === 'Expense' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>Vendor</label>
            <select
              name="vendor_id"
              value={formData.vendor_id}
              onChange={handleChange}
              className="block w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
              style={inputStyle}
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
            <label className="block text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>Contractor</label>
            <select
              name="contractor_id"
              value={formData.contractor_id}
              onChange={handleChange}
              className="block w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
              style={inputStyle}
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
          <label className="block text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>Client</label>
          <select
            name="client_id"
            value={formData.client_id}
            onChange={handleChange}
            className="block w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
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
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="block w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
            style={inputStyle}
          >
            {paymentStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>Payment Date</label>
          <input
            type="date"
            name="payment_date"
            value={formData.payment_date}
            onChange={handleChange}
            className="block w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
            style={inputStyle}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full text-white py-2 px-4 rounded-md shadow-md hover:opacity-90 transition-opacity"
        style={{ background: theme.gradients.button }}
      >
        {initialData ? 'Update Finance Record' : 'Add Finance Record'}
      </button>
    </form>
  );
};

export default FinanceForm;
