import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

const CompanyRegister = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    ownerName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    gstNumber: '',
    companyTypes: []
  });
  const [message, setMessage] = useState('');
  const { registerCompany } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerCompany(formData);
    if (result.success) {
      setMessage('Company registered successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setMessage(result.message || 'Registration failed');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const updatedTypes = checked
        ? [...formData.companyTypes, value]
        : formData.companyTypes.filter((t) => t !== value);
      setFormData({ ...formData, companyTypes: updatedTypes });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-gradient">
      <div className="max-w-2xl w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
            Register Your Construction Company
          </h2>
          <p className="text-center text-gray-600 mt-2">Start managing your construction projects</p>
        </div>

        <form className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md border border-brand-200" onSubmit={handleSubmit}>
          {message && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded">
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md shadow-sm"
                placeholder="ABC Construction Ltd"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Owner Name *</label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md shadow-sm"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md shadow-sm"
                placeholder="admin@company.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md shadow-sm"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md shadow-sm"
                placeholder="+91 9876543210"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">GST Number</label>
              <input
                type="text"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md shadow-sm"
                placeholder="22AAAAA0000A1Z5"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Company Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md shadow-sm"
              rows="3"
              placeholder="Complete company address"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Type</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-brand-50/50 p-4 rounded-lg border border-brand-100">
              {[
                { id: 'CONSTRUCTION_COMPANY', label: 'Construction Company' },
                { id: 'INTERIOR_DESIGN_COMPANY', label: 'Interior Design Company' },
                { id: 'ARCHITECT_DESIGN_COMPANY', label: 'Architect Design Company' }
              ].map((type) => (
                <label key={type.id} className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      name="companyTypes"
                      value={type.id}
                      checked={formData.companyTypes.includes(type.id)}
                      onChange={handleChange}
                      className="w-5 h-5 rounded border-2 border-brand-400 text-brand-600 focus:ring-brand-500 cursor-pointer transition-all"
                    />
                  </div>
                  <span className="text-gray-700 group-hover:text-brand-700 transition-colors">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-600 text-white py-3 px-4 rounded-md hover:bg-brand-700 font-medium shadow-premium transition-all active:scale-95"
          >
            Register Company
          </button>

          <div className="text-center">
            <Link
              to="/login"
              className="text-brand-600 hover:text-brand-800 font-medium"
            >
              Already have a company account? Login
            </Link>
          </div>

          <div className="bg-brand-50 p-4 rounded-md text-sm">
            <p className="font-medium mb-2">What you get:</p>
            <ul className="text-brand-700 space-y-1">
              <li>• Multi-project management</li>
              <li>• Team & contractor management</li>
              <li>• Financial tracking & reporting</li>
              <li>• Document management</li>
              <li>• Daily site progress tracking</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegister;
