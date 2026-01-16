import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';

const MaterialForm = ({ onSubmit, initialData = null, projects = [], vendors = [], onClose }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    project_id: initialData?.project_id || '',
    vendor_id: initialData?.vendor_id || '',
    name: initialData?.name || '',
    quantity: initialData?.quantity || '',
    unit: initialData?.unit || 'Bags',
    issued_to_site: initialData?.issued_to_site || '0',
    reorder_level: initialData?.reorder_level || ''
  });

  const units = ['Bags', 'Tons', 'Trucks', 'Pieces', 'Meters', 'Liters', 'Kg'];

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
    <form onSubmit={handleSubmit} className="space-y-6 form-container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Project *</label>
          <select
            name="project_id"
            value={formData.project_id}
            onChange={handleChange}
            className="w-full px-5 py-4 border rounded-2xl focus:ring-4 outline-none transition-all font-semibold"
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
          <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Vendor *</label>
          <select
            name="vendor_id"
            value={formData.vendor_id}
            onChange={handleChange}
            className="w-full px-5 py-4 border rounded-2xl focus:ring-4 outline-none transition-all font-semibold"
            style={inputStyle}
            required
          >
            <option value="">Select Vendor</option>
            {vendors.map(vendor => (
              <option key={vendor.vendor_id} value={vendor.vendor_id}>
                {vendor.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Material Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-5 py-4 border rounded-2xl focus:ring-4 outline-none transition-all font-semibold"
          style={inputStyle}
          placeholder="OPC Cement"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Quantity *</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full px-5 py-4 border rounded-2xl focus:ring-4 outline-none transition-all font-semibold"
            style={inputStyle}
            placeholder="500"
            required
          />
        </div>
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Unit *</label>
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="w-full px-5 py-4 border rounded-2xl focus:ring-4 outline-none transition-all font-semibold"
            style={inputStyle}
            required
          >
            {units.map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Issued to Site</label>
          <input
            type="number"
            name="issued_to_site"
            value={formData.issued_to_site}
            onChange={handleChange}
            className="w-full px-5 py-4 border rounded-2xl focus:ring-4 outline-none transition-all font-semibold"
            style={inputStyle}
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Reorder Level *</label>
        <input
          type="number"
          name="reorder_level"
          value={formData.reorder_level}
          onChange={handleChange}
          className="w-full px-5 py-4 border rounded-2xl focus:ring-4 outline-none transition-all font-semibold"
          style={inputStyle}
          placeholder="50"
          required
        />
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 rounded-xl font-bold text-sm border hover:bg-opacity-10 transition-all"
          style={{ color: theme.textPrimary, borderColor: theme.cardBorder, backgroundColor: theme.background }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:shadow-lg hover:-translate-y-0.5"
          style={{ background: theme.gradients.button }}
        >
          {initialData ? 'Update Material' : 'Add Material'}
        </button>
      </div>
    </form>
  );
};

export default MaterialForm;
