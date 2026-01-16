import { useState } from 'react';
import { useTenant } from '../../../hooks/useTenant.jsx';
import { useAuth } from '../../../hooks/useAuth.jsx';
import { useTheme } from '../../../context/ThemeContext.jsx';
import RoleGuard from '../../../common/RoleGuard';
import ClientForm from './ClientForm';
import ClientProfile from './ClientProfile';
import { FiUser, FiEdit2, FiPlus } from 'react-icons/fi';

const Clients = () => {
  const { currentTenant } = useTenant();
  const { user } = useAuth();
  const { theme } = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [viewingClient, setViewingClient] = useState(null);

  const clients = [
    { id: 1, name: "Rajesh Enterprises", project: "Shopping Mall", contact: "+91 9876543210", status: "Active", email: "rajesh@enterprises.com" },
    { id: 2, name: "Sharma Builders", project: "Residential Tower", contact: "+91 9876543211", status: "Active", email: "contact@sharmabuilders.com" },
    { id: 3, name: "Highway Authority", project: "Highway Project", contact: "+91 9876543212", status: "Planning", email: "admin@highway.gov.in" }
  ];

  const handleClientSubmit = (formData) => {
    console.log('Client submitted:', formData);
    setShowForm(false);
    setEditingClient(null);
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setShowForm(true);
  };

  const handleProfileView = (client) => {
    setViewingClient(client);
  };

  return (
    <div className="space-y-8 pb-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight" style={{ color: theme.textPrimary }}>Clients</h2>
          <p className="text-sm font-medium mt-1" style={{ color: theme.textSecondary }}>{currentTenant.name}</p>
        </div>
        <RoleGuard requiredRole="manager">
          <button
            onClick={() => setShowForm(true)}
            className="group flex items-center gap-2 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-premium transition-all hover:-translate-y-0.5"
            style={{ background: theme.gradients.button }}
          >
            <span className="text-xl leading-none group-hover:rotate-90 transition-transform">+</span>
            Add Client
          </button>
        </RoleGuard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {clients.map((client) => (
          <div key={client.id} className="card-premium p-8 group flex flex-col" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-bold transition-colors leading-tight mb-1" style={{ color: theme.textPrimary }}>{client.name}</h3>
                <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: theme.textMuted }}>{client.email}</p>
              </div>
              <span className={`px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-lg border ${client.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' :
                'bg-yellow-50 text-yellow-700 border-yellow-200'
                }`}>
                {client.status}
              </span>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm" style={{ backgroundColor: `${theme.iconBg}20`, color: theme.textSecondary }}>🏗️</div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: theme.textMuted }}>Active Project</p>
                  <p className="text-sm font-bold" style={{ color: theme.textPrimary }}>{client.project}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm" style={{ backgroundColor: `${theme.iconBg}20`, color: theme.textSecondary }}>📞</div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: theme.textMuted }}>Phone Contact</p>
                  <p className="text-sm font-bold" style={{ color: theme.textPrimary }}>{client.contact}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-auto pt-6 border-t" style={{ borderColor: theme.cardBorder }}>
              <button
                onClick={() => handleProfileView(client)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white text-[11px] font-black uppercase tracking-[0.15em] transition-all shadow-premium hover:shadow-lg hover:-translate-y-0.5"
                style={{ background: theme.gradients.button }}
              >
                <FiUser className="text-sm" />
                Profile
              </button>
              <RoleGuard requiredRole="manager">
                <button
                  onClick={() => handleEdit(client)}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] transition-all border-2"
                  style={{
                    backgroundColor: theme.background,
                    color: theme.textPrimary,
                    borderColor: theme.cardBorder
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = theme.primary;
                    e.currentTarget.style.color = theme.primary;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = theme.cardBorder;
                    e.currentTarget.style.color = theme.textPrimary;
                  }}
                >
                  <FiEdit2 className="text-sm" />
                  Edit
                </button>
              </RoleGuard>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-[100] p-4" style={{ backgroundColor: `${theme.textPrimary}40` }}>
          <div className="bg-white rounded-[2.5rem] shadow-premium w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-300" style={{ backgroundColor: theme.cardBg }}>
            <div className="table-header-premium p-6 text-white relative" style={{ background: theme.gradients.primary }}>
              <div className="pr-12">
                <h3 className="text-xl font-black">
                  {editingClient ? 'Edit Client' : 'Add New Client'}
                </h3>
                <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest mt-1">Client Relationship Profile</p>
              </div>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingClient(null);
                }}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white"
              >
                ✕
              </button>
            </div>
            <div className="p-8">
              <ClientForm
                onSubmit={handleClientSubmit}
                initialData={editingClient}
              />
            </div>
          </div>
        </div>
      )}

      {/* Client Profile Modal */}
      {viewingClient && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-[100] p-4" style={{ backgroundColor: `${theme.textPrimary}40` }}>
          <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden p-8 animate-in fade-in zoom-in duration-300 transform transition-all" style={{ backgroundColor: theme.cardBg }}>
            <button
              onClick={() => setViewingClient(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/40 transition-all"
            >
              ✕
            </button>
            <ClientProfile client={viewingClient} />
          </div>
        </div>
      )}
    </div>

  );
};

export default Clients;
