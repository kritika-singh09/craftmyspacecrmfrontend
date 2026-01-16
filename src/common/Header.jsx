import { useTenant } from '../hooks/useTenant.jsx';
import { useAuth } from '../hooks/useAuth.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { FiMenu, FiLayers } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Header = ({ onMenuClick }) => {
  const { currentTenant, tenants, switchTenant } = useTenant();
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="shadow-premium fixed w-full top-0 z-50 h-16" style={{ background: theme.gradients.primary }}>
      <div className="flex items-center justify-between px-8 h-full">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors"
          >
            <FiMenu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl shadow-sm border border-white/20" style={{ color: theme.textOnPrimary }}>
              <FiLayers className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold hidden sm:block" style={{ color: theme.textOnPrimary }}>
              Craft My Space
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/20">
              <select
                value={currentTenant.id}
                onChange={(e) => switchTenant(e.target.value)}
                className="bg-transparent text-xs font-semibold px-3 py-1.5 border-none focus:ring-0 text-white cursor-pointer"
              >
                {tenants.map(tenant => (
                  <option key={tenant.id} value={tenant.id} className="text-gray-900">{tenant.name}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-3 pl-4 border-l border-white/20 hover:bg-white/5 transition-all p-1.5 rounded-2xl group"
          >
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold group-hover:text-white/90" style={{ color: theme.textOnPrimary }}>{user?.name}</div>
              <div className="text-[10px] font-black uppercase tracking-wider opacity-80 group-hover:opacity-100" style={{ color: theme.textOnPrimary }}>{user?.role}</div>
            </div>

            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shadow-soft border border-white/30 group-hover:scale-105 transition-all"
              style={{ background: 'rgba(255,255,255,0.2)', color: theme.textOnPrimary }}
            >
              {user?.name?.charAt(0)}
            </div>
          </button>

          <button
            onClick={logout}
            className="p-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            title="Logout"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </header>

  );
};

export default Header;