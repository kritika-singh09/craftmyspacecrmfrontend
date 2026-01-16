import { useState } from 'react';
import { roles } from '../../../data/databaseDummyData';

const UserForm = ({ onSubmit, initialData = null, tenants = [] }) => {
  const [formData, setFormData] = useState({
    tenant_id: initialData?.tenant_id || '',
    name: initialData?.name || '',
    email: initialData?.email || '',
    password: '',
    role: initialData?.role || 'Engineer',
    phone: initialData?.phone || ''
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
        <label className="block text-sm font-medium text-gray-900">Company *</label>
        <select
          name="tenant_id"
          value={formData.tenant_id}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
          required
        >
          <option value="">Select Company</option>
          {tenants.map(tenant => (
            <option key={tenant.tenant_id} value={tenant.tenant_id}>
              {tenant.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900">Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-900">
            {initialData ? 'New Password (leave blank to keep current)' : 'Password *'}
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
            required={!initialData}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900">Role *</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
            required
          >
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
          placeholder="+91 9876543210"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-brand-600 text-white py-2 px-4 rounded-md hover:bg-brand-700"
      >
        {initialData ? 'Update User' : 'Create User'}
      </button>
    </form>
  );
};

export default UserForm;
