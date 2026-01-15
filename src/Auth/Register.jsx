import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'ENGINEER',
    companyId: ''
  });
  const [message, setMessage] = useState('');
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  // Fetch companies on component mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/companies');
        const data = await response.json();
        setCompanies(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching companies:', error);
        setMessage('Failed to load companies');
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerUser(formData);
    if (result.success) {
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setMessage(result.message || 'Registration failed');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-gradient">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
            Join Craft My Space
          </h2>
        </div>
        <form className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md border border-brand-200" onSubmit={handleSubmit}>
          {message && (
            <div className={`${message.includes('success') ? 'bg-green-50 border-green-200 text-green-600' : 'bg-red-50 border-red-200 text-red-600'} border px-4 py-3 rounded`}>
              {message}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
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
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
            >
              <option value="ENGINEER">Engineer</option>
              <option value="CONTRACTOR">Contractor</option>
              <option value="PROJECT_MANAGER">Project Manager</option>
              <option value="ACCOUNTANT">Accountant</option>
              <option value="SUPERVISOR">Supervisor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Company</label>
            {loading ? (
              <div className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md bg-gray-50 text-gray-500">
                Loading companies...
              </div>
            ) : companies.length === 0 ? (
              <div className="mt-1 block w-full px-3 py-2 border-2 border-red-300 rounded-md bg-red-50 text-red-600">
                No companies available. Please contact admin.
              </div>
            ) : (
              <select
                name="companyId"
                value={formData.companyId}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
                required
              >
                <option value="">Select your company</option>
                {companies.map((company) => (
                  <option key={company._id} value={company._id}>
                    {company.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-brand-600 text-white py-2 px-4 rounded-md hover:bg-brand-700 shadow-md transition-all active:scale-95"
            disabled={loading || companies.length === 0}
          >
            Register
          </button>

          <div className="text-center flex flex-col gap-2">
            <Link
              to="/login"
              className="text-brand-600 hover:text-brand-800 font-medium"
            >
              Already have an account? Login
            </Link>
            <Link
              to="/company-register"
              className="text-brand-600 hover:text-brand-800 font-medium"
            >
              Register New Company
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
