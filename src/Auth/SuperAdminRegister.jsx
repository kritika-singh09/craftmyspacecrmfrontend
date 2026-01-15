import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

const SuperAdminRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        secretKey: ''
    });
    const [message, setMessage] = useState('');
    const { registerSuperAdmin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await registerSuperAdmin(formData);
        if (result.success) {
            setMessage('Super Admin registered successfully! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } else {
            setMessage(result.message || 'Registration failed');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-gradient">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                        Super Admin Registration
                    </h2>
                    <p className="text-center text-gray-600 mt-2">Platform administrator access</p>
                </div>

                <form className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md border border-brand-200" onSubmit={handleSubmit}>
                    {message && (
                        <div className={`${message.includes('success') ? 'bg-green-50 border-green-200 text-green-600' : 'bg-red-50 border-red-200 text-red-600'} border px-4 py-3 rounded`}>
                            {message}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md shadow-sm"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md shadow-sm"
                            placeholder="superadmin@platform.com"
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

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Secret Key *</label>
                        <input
                            type="password"
                            name="secretKey"
                            value={formData.secretKey}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border-2 border-brand-600 rounded-md shadow-sm"
                            placeholder="Enter super admin secret key"
                            required
                        />
                        <p className="mt-1 text-xs text-gray-500">Contact platform administrator for the secret key</p>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-brand-600 text-white py-3 px-4 rounded-md hover:bg-brand-700 font-medium shadow-premium transition-all active:scale-95"
                    >
                        Register as Super Admin
                    </button>

                    <div className="text-center">
                        <Link
                            to="/login"
                            className="text-brand-600 hover:text-brand-800 font-medium"
                        >
                            Already have an account? Login
                        </Link>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md text-sm">
                        <p className="font-medium text-yellow-800 mb-1">⚠️ Super Admin Access</p>
                        <p className="text-yellow-700">This registration is for platform administrators only. Unauthorized access attempts will be logged.</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SuperAdminRegister;
