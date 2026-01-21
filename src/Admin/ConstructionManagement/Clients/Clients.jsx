import { useState, useEffect } from 'react';
import { useTenant } from '../../../hooks/useTenant.jsx';
import { useAuth } from '../../../hooks/useAuth.jsx';
import { useTheme } from '../../../context/ThemeContext.jsx';
import RoleGuard from '../../../common/RoleGuard';
import ClientForm from './ClientForm';
import ClientProfile from './ClientProfile';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheckCircle, FiStar, FiAlertTriangle, FiUser, FiPhone, FiAlertCircle } from 'react-icons/fi';


const Clients = () => {
  const { currentTenant } = useTenant();
  const { token } = useAuth();
  const { theme } = useTheme();

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [viewingClient, setViewingClient] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchClients();
  }, [token]);

  const fetchClients = async () => {
    try {
      const res = await fetch(`${API_URL}/construction/clients`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setClients(data);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClientSubmit = (newClient) => {
    fetchClients(); // Refresh list
    setShowForm(false);
    setEditingClient(null);
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setShowForm(true);
  };

  const handleDelete = async (clientId) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;
    try {
      await fetch(`${API_URL}/construction/clients/${clientId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchClients();
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  return (
    <div className="space-y-8 pb-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>Client Management</h2>
          <p className="text-xs font-bold mt-1 opacity-60" style={{ color: theme.textSecondary }}>{currentTenant.name} Portfolio</p>
        </div>
        <RoleGuard requiredRole="manager">
          <button
            onClick={() => { setEditingClient(null); setShowForm(true); }}
            className="group flex items-center gap-2 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-premium transition-all hover:-translate-y-1"
            style={{ background: theme.gradients.button }}
          >
            <FiPlus className="text-lg group-hover:rotate-90 transition-transform" />
            New Client
          </button>
        </RoleGuard>
      </div>

      {loading ? (
        <div className="text-center py-10 opacity-50 font-bold">Loading Clients...</div>
      ) : clients.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-3xl opacity-40 font-bold uppercase tracking-widest" style={{ borderColor: theme.cardBorder }}>
          No clients found. Add your first client to get started.
        </div>
      ) : (
        <>
          {/* Table View - Large Screens */}
          <div className="hidden lg:block overflow-x-auto">
            <div className="card-premium overflow-hidden" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: theme.cardBorder }}>
                    <th className="text-left p-4 text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textSecondary }}>Client</th>
                    <th className="text-left p-4 text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textSecondary }}>Type</th>
                    <th className="text-left p-4 text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textSecondary }}>Authorized Contact</th>
                    <th className="text-left p-4 text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textSecondary }}>Phone</th>
                    <th className="text-left p-4 text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textSecondary }}>Email</th>
                    <th className="text-center p-4 text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textSecondary }}>Projects</th>
                    <th className="text-right p-4 text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textSecondary }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr
                      key={client._id}
                      className="border-b transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      style={{ borderColor: theme.cardBorder }}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 shadow-sm">
                            {client.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-sm" style={{ color: theme.textPrimary }}>{client.name}</p>
                            {client.riskProfile?.riskTag === 'High Risk' && (
                              <span className="inline-flex items-center gap-1 text-[9px] text-red-500 font-bold">
                                <FiAlertCircle className="text-xs" /> High Risk
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-[10px] font-bold uppercase tracking-wider" style={{ color: theme.textPrimary }}>
                          {client.type}
                        </span>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-bold" style={{ color: theme.textPrimary }}>{client.authorizedContact}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-medium" style={{ color: theme.textSecondary }}>{client.phone}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-medium" style={{ color: theme.textSecondary }}>{client.email}</p>
                      </td>
                      <td className="p-4 text-center">
                        {client.projectCount > 0 ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-wider rounded-lg">
                            🏗️ {client.projectCount}
                          </span>
                        ) : (
                          <span className="text-xs opacity-40">—</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setViewingClient(client)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-white text-[10px] font-black uppercase tracking-wider transition-all hover:shadow-lg"
                            style={{ background: theme.gradients.button }}
                          >
                            <FiUser className="text-xs" /> Profile
                          </button>
                          <RoleGuard requiredRole="manager">
                            <button
                              onClick={() => handleEdit(client)}
                              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                              style={{ color: theme.textPrimary }}
                            >
                              <FiEdit2 className="text-xs" /> Edit
                            </button>
                          </RoleGuard>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card View - Small/Medium Screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
            {clients.map((client) => (
              <div key={client._id} className="card-premium p-6 group flex flex-col hover:-translate-y-1 transition-all" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>

                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 shadow-inner">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-black leading-tight" style={{ color: theme.textPrimary }}>{client.name}</h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-50" style={{ color: theme.textPrimary }}>{client.type}</p>
                    </div>
                  </div>
                  {client.riskProfile?.riskTag === 'High Risk' && <FiAlertCircle className="text-red-500 text-xl animate-pulse" />}
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-emerald-500 shadow-sm"><FiUser /></div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest opacity-50">Authorized Contact</p>
                      <p className="text-xs font-bold">{client.authorizedContact}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-blue-500 shadow-sm"><FiPhone /></div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest opacity-50">Contact Info</p>
                      <p className="text-xs font-bold">{client.phone} <span className="opacity-40">|</span> {client.email}</p>
                    </div>
                  </div>

                  {client.projectCount > 0 && (
                    <div className="px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-2">
                      <span>🏗️ {client.projectCount} Active Projects</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t" style={{ borderColor: theme.cardBorder }}>
                  <button
                    onClick={() => setViewingClient(client)}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white text-[10px] font-black uppercase tracking-[0.15em] transition-all shadow-premium hover:shadow-lg"
                    style={{ background: theme.gradients.button }}
                  >
                    <FiUser /> Profile
                  </button>
                  <RoleGuard requiredRole="manager">
                    <button
                      onClick={() => handleEdit(client)}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                      style={{ color: theme.textPrimary }}
                    >
                      <FiEdit2 /> Edit
                    </button>
                  </RoleGuard>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Forms/Modals */}
      {showForm && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-[100] p-4 bg-slate-900/40">
          <ClientForm onClose={() => setShowForm(false)} onSuccess={handleClientSubmit} initialData={editingClient} />
        </div>
      )}

      {viewingClient && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-[100] p-4 bg-slate-900/40">
          <ClientProfile client={viewingClient} onClose={() => setViewingClient(null)} onEdit={() => { setViewingClient(null); handleEdit(viewingClient); }} />
        </div>
      )}
    </div>
  );
};

export default Clients;
