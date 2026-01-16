import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';

const ClientForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    address: initialData?.address || '',
    gst_number: initialData?.gst_number || ''
  });

  const { theme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClasses = "w-full px-5 py-3 border rounded-2xl focus:ring-4 outline-none transition-all font-semibold text-sm";
  const inputStyle = {
    backgroundColor: `${theme.iconBg}10`,
    borderColor: theme.cardBorder,
    color: theme.textPrimary
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Client Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={inputClasses}
          style={inputStyle}
          placeholder="e.g. Rajesh Enterprises"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
            style={inputStyle}
            placeholder="client@mail.com"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Contact Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputClasses}
            style={inputStyle}
            placeholder="+91 00000 00000"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Business Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={`${inputClasses} min-h-[100px] resize-none`}
          style={inputStyle}
          placeholder="Street, City, Zip Code"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Tax / GST Identification</label>
        <input
          type="text"
          name="gst_number"
          value={formData.gst_number}
          onChange={handleChange}
          className={`${inputClasses} uppercase`}
          style={inputStyle}
          placeholder="22AAAAA0000A1Z5"
        />
      </div>

      <button
        type="submit"
        className="w-full text-white py-3.5 px-6 rounded-2xl font-black uppercase tracking-widest shadow-premium hover:-translate-y-0.5 active:translate-y-0 transition-all mt-6"
        style={{ background: theme.gradients.button }}
      >
        {initialData ? 'Update Account' : 'Confirm Registration'}
      </button>

    </form>
  );
};

export default ClientForm;
