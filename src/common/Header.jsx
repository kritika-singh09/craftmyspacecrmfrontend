import { useTenant } from '../hooks/useTenant.jsx';
import { useAuth } from '../hooks/useAuth.jsx';
import { useTheme } from '../hooks/useTheme.jsx';
import { FiMenu, FiLayers, FiSun, FiMoon } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Header = ({ onMenuClick }) => {
  const { currentTenant, tenants, switchTenant } = useTenant();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="bg-brand-600 bg-gradient-to-r from-brand-600 to-brand-800 shadow-premium fixed w-full top-0 z-50 h-16">
      <div className="flex items-center justify-between px-8 h-full">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors"
          >
            <FiMenu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl text-white shadow-sm border border-white/20">
              <FiLayers className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-white hidden sm:block">
              Craft My Space
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all shadow-sm"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
            </button>

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
              <div className="text-sm font-semibold text-white group-hover:text-blue-200">{user?.name}</div>
              <div className="text-[10px] font-black uppercase tracking-wider text-blue-100 group-hover:text-white opacity-80">{user?.role}</div>
            </div>

            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-soft border border-white/30 group-hover:scale-105 group-hover:bg-white/30 transition-all">
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