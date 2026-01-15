import { useState } from 'react';

const TenantForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    address: initialData?.address || '',
    contact_email: initialData?.contact_email || '',
    contact_phone: initialData?.contact_phone || '',
    gst_number: initialData?.gst_number || ''
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
        <label className="block text-sm font-medium text-gray-700">Company Name *</label>
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
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
          rows="3"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Email *</label>
          <input
            type="email"
            name="contact_email"
            value={formData.contact_email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
          <input
            type="tel"
            name="contact_phone"
            value={formData.contact_phone}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">GST Number</label>
        <input
          type="text"
          name="gst_number"
          value={formData.gst_number}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
          placeholder="22AAAAA0000A1Z5"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-brand-600 text-white py-2 px-4 rounded-md hover:bg-brand-700"
      >
        {initialData ? 'Update Company' : 'Create Company'}
      </button>
    </form>
  );
};

export default TenantForm;
