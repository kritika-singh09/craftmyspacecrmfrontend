import React, { useState } from 'react';
import { FiPlus, FiMail, FiPhone, FiMapPin, FiBriefcase, FiArrowRight, FiSearch, FiFilter, FiX, FiCheck } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

const ArchClients = () => {
    const { theme } = useTheme();
    const [clients, setClients] = useState([
        { id: 1, name: 'Skyline Corp', email: 'director@skyline.com', phone: '+91 90000 11111', address: 'London, UK', projects: 2, status: 'Active Account' },
        { id: 2, name: 'Coastal Dreams', email: 'contact@coastaldreams.in', phone: '+91 90000 22222', address: 'Goa, India', projects: 1, status: 'Active Account' },
        { id: 3, name: 'Royal Estates', email: 'villas@royalestates.com', phone: '+91 90000 33333', address: 'Dubai, UAE', projects: 3, status: 'Review Mode' },
        { id: 4, name: 'Nexus IT', email: 'infra@nexus.com', phone: '+91 90000 44444', address: 'Bangalore, India', projects: 1, status: 'Onboarding' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newClient, setNewClient] = useState({ name: '', email: '', phone: '', address: '' });

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddClient = (e) => {
        e.preventDefault();
        const client = {
            id: clients.length + 1,
            ...newClient,
            projects: 0,
            status: 'Onboarding'
        };
        setClients([...clients, client]);
        setShowModal(false);
        setNewClient({ name: '', email: '', phone: '', address: '' });
    };

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight uppercase tracking-tight" style={{ color: theme.textPrimary }}>
                        Client <span style={{ color: theme.secondary }}>Accounts</span>
                    </h1>
                    <p className="mt-2 font-medium tracking-wide" style={{ color: theme.textSecondary }}>
                        Manage architectural clients, contact details, and project history.
                    </p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-3 px-8 py-4 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-all"
                    style={{ background: theme.gradients.button }}
                >
                    <FiPlus className="text-lg" /> Onboard Client
                </button>
            </div>

            <div className="rounded-[3rem] shadow-premium border overflow-hidden"
                style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
            >
                <div className="p-8 border-b flex flex-col md:flex-row gap-6" style={{ borderColor: theme.cardBorder }}>
                    <div className="relative flex-1">
                        <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-xl" style={{ color: theme.primary }} />
                        <input
                            type="text"
                            placeholder="Search accounts..."
                            className="w-full border-2 rounded-2xl pl-16 pr-6 py-4 text-sm font-bold outline-none transition-all uppercase tracking-wide"
                            style={{
                                backgroundColor: `${theme.primary}05`,
                                borderColor: theme.cardBorder,
                                color: theme.textPrimary
                            }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredClients.map((client) => (
                        <div key={client.id} className="group relative p-10 rounded-[3.5rem] border transition-all duration-500 shadow-sm hover:shadow-premium-xl hover:bg-opacity-50"
                            style={{
                                backgroundColor: `${theme.primary}05`,
                                borderColor: theme.cardBorder
                            }}
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className="w-20 h-20 rounded-3xl text-white flex items-center justify-center text-3xl font-black shadow-lg font-outfit uppercase tracking-tighter"
                                    style={{ background: theme.gradients.primary }}
                                >
                                    {client.name.substring(0, 2)}
                                </div>
                                <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${client.status === 'Active Account' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                                    }`}>
                                    {client.status}
                                </span>
                            </div>

                            <h3 className="text-2xl font-black transition-colors uppercase tracking-tight" style={{ color: theme.textPrimary }}>{client.name}</h3>

                            <div className="mt-8 space-y-4">
                                <div className="flex items-center gap-4 text-sm font-bold opacity-70" style={{ color: theme.textSecondary }}>
                                    <FiMail style={{ color: theme.primary }} /> {client.email}
                                </div>
                                <div className="flex items-center gap-4 text-sm font-bold opacity-70" style={{ color: theme.textSecondary }}>
                                    <FiPhone style={{ color: theme.primary }} /> {client.phone}
                                </div>
                                <div className="flex items-center gap-4 text-sm font-bold opacity-70" style={{ color: theme.textSecondary }}>
                                    <FiMapPin style={{ color: theme.primary }} /> {client.address}
                                </div>
                                <div className="flex items-center gap-4 text-sm font-bold opacity-70" style={{ color: theme.textSecondary }}>
                                    <FiBriefcase style={{ color: theme.primary }} /> {client.projects} Active Design Projects
                                </div>
                            </div>

                            <div className="mt-10 pt-8 border-t flex justify-between items-center" style={{ borderColor: theme.cardBorder }}>
                                <button className="text-[10px] font-black uppercase tracking-widest hover:tracking-[0.2em] transition-all" style={{ color: theme.primary }}>Client Portal Link</button>
                                <FiArrowRight className="group-hover:translate-x-2 transition-transform" style={{ color: theme.primary }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Client Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-lg rounded-[2rem] shadow-2xl animate-in slide-in-from-bottom-8 overflow-hidden"
                        style={{ backgroundColor: theme.cardBg }}
                    >
                        <div className="p-6 text-white relative flex justify-between items-center" style={{ background: theme.gradients.primary }}>
                            <div>
                                <h3 className="text-xl font-black">Onboard Client</h3>
                                <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mt-1">New Client Account</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white">
                                <FiX />
                            </button>
                        </div>

                        <form onSubmit={handleAddClient} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Client Name</label>
                                <input type="text" required value={newClient.name} onChange={e => setNewClient({ ...newClient, name: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Email</label>
                                <input type="email" required value={newClient.email} onChange={e => setNewClient({ ...newClient, email: e.target.value })}
                                    className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Phone</label>
                                    <input type="tel" required value={newClient.phone} onChange={e => setNewClient({ ...newClient, phone: e.target.value })}
                                        className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                        style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>Location</label>
                                    <input type="text" required value={newClient.address} onChange={e => setNewClient({ ...newClient, address: e.target.value })}
                                        className="w-full p-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2"
                                        style={{ borderColor: theme.cardBorder, color: theme.textPrimary, backgroundColor: `${theme.primary}05` }}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="w-full py-4 rounded-xl text-white font-black uppercase tracking-widest shadow-lg hover:shadow-xl transition-all"
                                style={{ background: theme.gradients.button }}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <FiCheck /> Confirm Onboarding
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArchClients;
