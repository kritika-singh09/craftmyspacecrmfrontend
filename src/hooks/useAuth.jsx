import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth`;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
        setToken(data.token);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', data.token);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: 'Server error' };
    }
  };

  const registerCompany = async (companyData) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(companyData),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: 'Server error' };
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/register-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: 'Server error' };
    }
  };

  const registerSuperAdmin = async (superAdminData) => {
    try {
      const response = await fetch(`${API_URL}/register-superadmin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(superAdminData),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: 'Server error' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const hasPermission = (requiredRole) => {
    if (!user) return false;

    // Updated to match backend role names
    const roleHierarchy = {
      superadmin: 5,
      SUPER_ADMIN: 5,
      COMPANY_ADMIN: 4,
      admin: 4,
      PROJECT_MANAGER: 3,
      manager: 3,
      ENGINEER: 2,
      engineer: 2,
      ACCOUNTANT: 2,
      accountant: 2,
      SUPERVISOR: 2,
      supervisor: 2,
      CONTRACTOR: 1,
      contractor: 1
    };

    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated,
      loading,
      login,
      registerCompany,
      registerSuperAdmin,
      registerUser,
      logout,
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
};