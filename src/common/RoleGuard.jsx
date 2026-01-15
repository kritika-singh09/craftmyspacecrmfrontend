import { useAuth } from '../hooks/useAuth.jsx';

const RoleGuard = ({ children, requiredRole, fallback = null }) => {
  const { hasPermission } = useAuth();

  if (!hasPermission(requiredRole)) {
    return fallback || (
      <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">
        <p className="font-medium">Access Denied</p>
        <p className="text-sm">You don't have permission to access this feature.</p>
      </div>
    );
  }

  return children;
};

export default RoleGuard;