import { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useMaterials } from '../../../hooks/useMaterials.jsx';
import { useProcurement } from '../../../hooks/useProcurement.jsx';
import Loader from '../../../common/Loader';
import MaterialDashStats from './MaterialDashStats';
import MaterialMasterList from './MaterialMasterList';
import InventoryView from './InventoryView';
import IndentManager from './IndentManager';
import ProcurementManager from './ProcurementManager';
import QualityControl from './QualityControl';
import { FiGrid, FiBox, FiFileText, FiShoppingCart, FiShield, FiDatabase } from 'react-icons/fi';
import { useAuth } from '../../../hooks/useAuth';

const Materials = () => {
  const { theme } = useTheme();
  const { getInventory, getIndents } = useMaterials();
  const { getPurchaseOrders } = useProcurement();

  const [loading, setLoading] = useState(true);

  const [statsData, setStatsData] = useState({ inventory: [], indents: [], orders: [] });
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchGlobals = async () => {
      try {
        const [inv, ind, pos] = await Promise.all([
          getInventory(),
          getIndents(),
          getPurchaseOrders()
        ]);
        // Handle different return types (fetch promise returns response object for hooks wrappers if not stripped, but our hook implementation returns json data directly for getInventory but Response for getQC? No, standardizing to data.)
        // Checking hooks implementation: 
        // getInventory returns data.
        // getIndents returns data.
        // getPurchaseOrders returns RESPONSE object (need await res.json()).

        setStatsData({
          inventory: inv,
          indents: ind,
          orders: pos
        });
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    };
    fetchGlobals();
  }, []);


  const tabs = [
    { id: 'dashboard', label: 'Overview', icon: <FiGrid /> },
    { id: 'master', label: 'Master Registry', icon: <FiDatabase /> },
    { id: 'inventory', label: 'Live Inventory', icon: <FiBox /> },
    { id: 'indents', label: 'Indents', icon: <FiFileText /> },
    { id: 'procurement', label: 'Procurement', icon: <FiShoppingCart /> },
    { id: 'quality', label: 'Quality Control', icon: <FiShield /> },
  ];

  return (
    <div className="space-y-8 pb-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>Material Hub</h2>
          <p className="text-[11px] font-bold mt-1 opacity-60 uppercase tracking-widest" style={{ color: theme.textSecondary }}>Unified Supply Chain Management</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl overflow-x-auto max-w-full">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <span className="text-sm">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div>
        {loading ? (
          <div className="p-20 text-center font-bold opacity-50 uppercase tracking-widest">
            Syncing Material Hub...
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                <MaterialDashStats inventory={statsData.inventory} indents={statsData.indents} orders={statsData.orders} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Shortcuts or Widgets could go here */}
                  <div className="p-6 rounded-2xl border flex items-center justify-center min-h-[300px] opacity-50 border-dashed" style={{ borderColor: theme.cardBorder }}>
                    <span className="text-xs font-bold">Additional Activity Charts Placeholder</span>
                  </div>
                  <div className="p-6 rounded-2xl border flex items-center justify-center min-h-[300px] opacity-50 border-dashed" style={{ borderColor: theme.cardBorder }}>
                    <span className="text-xs font-bold">Recent Notifications Placeholder</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'master' && <MaterialMasterList />}
            {activeTab === 'inventory' && <InventoryView />}
            {activeTab === 'indents' && <IndentManager />}
            {activeTab === 'procurement' && <ProcurementManager />}
            {activeTab === 'quality' && <QualityControl />}
          </>
        )}
      </div>
    </div>
  );
};

export default Materials;
