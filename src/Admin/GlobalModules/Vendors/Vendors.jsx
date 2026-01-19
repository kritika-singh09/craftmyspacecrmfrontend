import { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext.jsx';
import { useAuth } from '../../../hooks/useAuth.jsx';
import VendorForm from './VendorForm';
import VendorDetails from './VendorDetails';
import { FiPlus, FiFilter, FiSearch, FiLayers, FiBriefcase, FiGrid, FiHome } from 'react-icons/fi';
import Loader from '../../../common/Loader';

const Vendors = () => {
  const { theme } = useTheme();
  const { token } = useAuth();

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [filterDomain, setFilterDomain] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchVendors();
  }, [token, filterDomain, searchTerm]); // Debounce search in real app

  const fetchVendors = async () => {
    try {
      let url = `${API_URL}/vendors?`;
      if (filterDomain !== 'ALL') url += `domain=${filterDomain}&`;
      if (searchTerm) url += `search=${searchTerm}`;

      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setVendors(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    fetchVendors();
    setShowForm(false);
  };

  const getDomainIcon = (domain) => {
    switch (domain) {
      case 'CONSTRUCTION': return <FiBriefcase />;
      case 'ARCHITECTURE': return <FiGrid />;
      case 'INTERIOR': return <FiHome />;
      default: return <FiLayers />;
    }
  };

  if (loading) return <Loader fullScreen message="Syncing Vendor Network..." />;

  return (
    <div className="space-y-8 pb-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>Vendor Master</h2>
          <p className="text-[11px] font-bold mt-1 opacity-60 uppercase tracking-widest" style={{ color: theme.textSecondary }}>Universal Supply Chain</p>
        </div>

        <div className="flex gap-3">
          <div className="relative group">
            <FiSearch className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 rounded-xl border bg-transparent outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold text-xs w-64"
              style={{ borderColor: theme.cardBorder, color: theme.textPrimary }}
            />
          </div>

          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {['ALL', 'CONSTRUCTION', 'ARCHITECTURE', 'INTERIOR'].map(domain => (
              <button
                key={domain}
                onClick={() => setFilterDomain(domain)}
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${filterDomain === domain ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {domain === 'ALL' ? 'All' : domain.slice(0, 4)}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="group flex items-center gap-2 text-white px-6 py-3 rounded-xl font-black uppercase tracking-[0.15em] text-[10px] shadow-premium transition-all hover:-translate-y-1"
            style={{ background: theme.gradients.button }}
          >
            <FiPlus className="text-sm group-hover:rotate-90 transition-transform" />
            Add New
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {vendors.map(vendor => (
          <div
            key={vendor._id} onClick={() => setSelectedVendor(vendor)}
            className="p-6 rounded-2xl border cursor-pointer hover:-translate-y-1 transition-all group relative overflow-hidden"
            style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
          >
            {/* Domain Badges */}
            <div className="absolute top-4 right-4 flex gap-1">
              {vendor.domains?.map(d => (
                <span key={d} className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs text-slate-500" title={d}>
                  {getDomainIcon(d)}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center text-xl font-black text-blue-500">
                {vendor.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-sm truncate w-40" style={{ color: theme.textPrimary }}>{vendor.name}</h3>
                <p className="text-[10px] font-bold uppercase opacity-50" style={{ color: theme.textSecondary }}>{vendor.category}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs">
                <span className="opacity-60">Performance</span>
                <span className={`font-bold ${vendor.performanceScore > 80 ? 'text-green-500' : 'text-amber-500'}`}>{vendor.performanceScore || 0}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className={`h-full rounded-full ${vendor.performanceScore > 80 ? 'bg-green-500' : 'bg-amber-500'}`} style={{ width: `${vendor.performanceScore || 0}%` }}></div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-auto">
              {vendor.specializations?.slice(0, 3).map((spec, i) => (
                <span key={i} className="px-2 py-1 rounded-md bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                  {spec}
                </span>
              ))}
              {vendor.specializations?.length > 3 && <span className="text-[10px] opacity-50 font-bold">+{vendor.specializations.length - 3}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {showForm && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-[100] p-4 bg-slate-900/40">
          <VendorForm onClose={() => setShowForm(false)} onSuccess={handleSuccess} />
        </div>
      )}

      {selectedVendor && (
        // Placeholder for Vendor Details Modal
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-[100] p-4 bg-slate-900/40">
          <div className="bg-white p-10 rounded-2xl relative w-full max-w-lg">
            <button onClick={() => setSelectedVendor(null)} className="absolute top-4 right-4 font-bold text-xl">✕</button>
            <VendorDetails vendor={selectedVendor} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Vendors;
