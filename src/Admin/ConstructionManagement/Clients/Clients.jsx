import { useState } from 'react';
import { useTenant } from '../../../hooks/useTenant.jsx';
import { useAuth } from '../../../hooks/useAuth.jsx';
import RoleGuard from '../../../common/RoleGuard';
import ClientForm from './ClientForm';

const Clients = () => {
  const { currentTenant } = useTenant();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

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

  return (
    <div className="space-y-8 pb-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Clients</h2>
          <p className="text-sm font-medium text-gray-400 dark:text-brand-300 mt-1">{currentTenant.name}</p>
        </div>
        <RoleGuard requiredRole="manager">
          <button
            onClick={() => setShowForm(true)}
            className="group flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-premium hover:bg-brand-700 transition-all hover:-translate-y-0.5"
          >
            <span className="text-xl leading-none group-hover:rotate-90 transition-transform">+</span>
            Add Client
          </button>
        </RoleGuard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {clients.map((client) => (
          <div key={client.id} className="card-premium p-8 group flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-tight mb-1">{client.name}</h3>
                <p className="text-[11px] font-semibold text-gray-400 dark:text-brand-400 uppercase tracking-widest">{client.email}</p>
              </div>
              <span className={`px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-lg border ${client.status === 'Active' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' :
                'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
                }`}>
                {client.status}
              </span>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-900/50 flex items-center justify-center text-brand-600 dark:text-brand-200 text-sm">🏗️</div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 dark:text-brand-400 uppercase tracking-widest">Active Project</p>
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{client.project}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-900/50 flex items-center justify-center text-brand-600 dark:text-brand-200 text-sm">📞</div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 dark:text-brand-400 uppercase tracking-widest">Phone Contact</p>
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{client.contact}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-auto pt-6 border-t border-gray-100 dark:border-brand-800/50">
              <button className="py-2.5 px-4 rounded-xl bg-brand-50 dark:bg-brand-800/50 text-brand-600 dark:text-brand-200 text-[11px] font-bold uppercase tracking-wider hover:bg-brand-600 dark:hover:bg-brand-500 hover:text-white transition-all">
                Profile
              </button>
              <RoleGuard requiredRole="manager">
                <button
                  onClick={() => handleEdit(client)}
                  className="py-2.5 px-4 rounded-xl bg-gray-50 dark:bg-brand-900/30 text-gray-700 dark:text-brand-300 text-[11px] font-bold uppercase tracking-wider hover:bg-gray-200 dark:hover:bg-brand-800 transition-all"
                >
                  Edit
                </button>
              </RoleGuard>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-brand-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-[2.5rem] shadow-premium w-full max-w-6xl overflow-hidden">
            <div className="table-header-premium p-8 text-white relative">
              <h3 className="text-2xl font-black">
                {editingClient ? 'Edit Client' : 'Add New Client'}
              </h3>
              <p className="text-blue-100 text-sm font-medium mt-1">Provide client details to continue</p>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingClient(null);
                }}
                className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white"
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
    </div>

  );
};

export default Clients;
