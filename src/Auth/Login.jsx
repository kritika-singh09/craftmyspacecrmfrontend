import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    const result = await login(email, password);
    if (!result.success) {
      setError(result.message);
    }
    // Redirection is handled by App.jsx or useAuth context change
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-gradient">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
            Craft My Space Login
          </h2>
        </div>
        <form className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md border border-brand-200 dark:border-brand-800" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-600 text-white py-2 px-4 rounded-md hover:bg-brand-700"
          >
            Sign In
          </button>

          <div className="text-center flex flex-col gap-2">
            <Link
              to="/register"
              className="text-brand-600 hover:text-brand-800 font-medium"
            >
              Don't have an account? Register
            </Link>
            <Link
              to="/company-register"
              className="text-brand-600 hover:text-brand-800 font-medium"
            >
              Register New Company
            </Link>
            <Link
              to="/superadmin-register"
              className="text-brand-600 hover:text-brand-800 font-medium"
            >
              Register as Super Admin
            </Link>
          </div>

          <div className="bg-gray-50 p-4 rounded-md text-sm">
            <p className="font-medium mb-2">Demo Credentials:</p>
            <p>Admin: admin@harr.com / 123456</p>
            <p>Manager: manager@harr.com / 123456</p>
            <p>Engineer: engineer@harr.com / 123456</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
