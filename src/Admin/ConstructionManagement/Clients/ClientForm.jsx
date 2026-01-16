import { useState } from 'react';

const ClientForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    address: initialData?.address || '',
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
    <form onSubmit={handleSubmit} className="space-y-6 form-container">
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-brand-500 ml-1">Client Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-5 py-4 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all placeholder:text-gray-900 font-semibold"
          placeholder="e.g. Rajesh Enterprises"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-brand-500 ml-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all placeholder:text-gray-900 font-semibold"
            placeholder="client@mail.com"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-brand-500 ml-1">Contact Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all placeholder:text-gray-900 font-semibold"
            placeholder="+91 00000 00000"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-brand-500 ml-1">Business Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-5 py-4 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all placeholder:text-gray-900 font-semibold min-h-[120px] resize-none"
          placeholder="Street, City, Zip Code"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-brand-500 ml-1">Tax / GST Identification</label>
        <input
          type="text"
          name="gst_number"
          value={formData.gst_number}
          onChange={handleChange}
          className="w-full px-5 py-4 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all placeholder:text-gray-900 font-semibold uppercase"
          placeholder="22AAAAA0000A1Z5"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-brand-600 text-white py-4 px-6 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-700 shadow-premium hover:-translate-y-0.5 active:translate-y-0 transition-all mt-4"
      >
        {initialData ? 'Update Account' : 'Confirm Registration'}
      </button>

    </form>
  );
};

export default ClientForm;
