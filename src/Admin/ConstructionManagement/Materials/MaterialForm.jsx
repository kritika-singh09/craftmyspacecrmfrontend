import { useState } from 'react';

const MaterialForm = ({ onSubmit, initialData = null, projects = [], vendors = [] }) => {
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6 form-container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <label className="block text-sm font-medium text-gray-700">Vendor *</label>
          <select
            name="vendor_id"
            value={formData.vendor_id}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
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
        <label className="block text-sm font-medium text-gray-700">Material Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
          placeholder="OPC Cement"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity *</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
            placeholder="500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Unit *</label>
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
            required
          >
            {units.map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Issued to Site</label>
          <input
            type="number"
            name="issued_to_site"
            value={formData.issued_to_site}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Reorder Level *</label>
        <input
          type="number"
          name="reorder_level"
          value={formData.reorder_level}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
          placeholder="50"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-brand-600 text-white py-2 px-4 rounded-md hover:bg-brand-700"
      >
        {initialData ? 'Update Material' : 'Add Material'}
      </button>
    </form>
  );
};

export default MaterialForm;
