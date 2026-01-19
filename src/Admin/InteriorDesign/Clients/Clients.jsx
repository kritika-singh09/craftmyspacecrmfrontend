import React, { useState } from 'react';
import { FiUsers, FiSearch, FiFilter, FiPlus, FiMail, FiPhone, FiStar, FiX } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';
import ClientForm from '../../ConstructionManagement/Clients/ClientForm';

const IntClients = () => {
    const { theme } = useTheme();
    const [clients, setClients] = useState([
        { id: 1, name: 'Khanna Residences', email: 'rohit@khanna.com', phone: '+91 98888 77777', type: 'Residential (Premium)', projects: '02', rating: '5.0' },
        { id: 2, name: 'TechNova Pvt Ltd', email: 'admin@technova.com', phone: '+91 90000 12345', type: 'Commercial (Office)', projects: '01', rating: '4.8' },
        { id: 3, name: 'Alaya Wellness', email: 'spa@alaya.com', phone: '+91 88888 99999', type: 'Retail (Spa)', projects: '01', rating: '4.9' },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleAddClient = (data) => {
        const newClient = {
            id: clients.length + 1,
            name: data.name,
            email: data.email,
            phone: data.phone,
            type: 'New Lead',
            projects: '00',
            rating: '0.0'
        };
        setClients([...clients, newClient]);
        setShowModal(false);
    };

    const filteredClients = clients.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10 pb-12 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight uppercase" style={{ color: theme.textPrimary }}>
                        Client <span style={{ color: theme.secondary }}>Accounts</span>
                    </h1>
                    <p className="mt-2 font-medium tracking-wide" style={{ color: theme.textSecondary }}>
                        Manage relationships, preferences, and approval authorities for all projects.
                    </p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-3 px-8 py-4 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all"
                    style={{ background: theme.gradients.button }}
                >
                    <FiPlus className="text-lg" /> New Client
                </button>
            </div>

            {/* List */}
            <div className="rounded-[3.5rem] shadow-premium border overflow-hidden"
                style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
            >
                <div className="p-10 border-b flex flex-col md:flex-row justify-between items-center gap-6"
                    style={{ borderColor: theme.cardBorder }}
                >
                    <div className="relative w-full md:w-96">
                        <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-lg" style={{ color: theme.secondary }} />
                        <input
                            type="text"
                            placeholder="Search clients..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border rounded-3xl py-4 pl-14 pr-6 text-sm font-bold focus:outline-none focus:ring-2"
                            style={{
                                backgroundColor: `${theme.primary}05`,
                                borderColor: `${theme.primary}20`,
                                color: theme.textPrimary
                            }}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr style={{ backgroundColor: `${theme.primary}08` }}>
                                {['Client', 'Contact', 'Project Type', 'Projects', 'Status'].map(h => (
                                    <th key={h} className="px-10 py-6 text-[10px] font-black uppercase tracking-widest" style={{ color: theme.secondary }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y" style={{ divideColor: theme.cardBorder }}>
                            {filteredClients.map((client, i) => (
                                <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform"
                                                style={{ backgroundColor: `${theme.primary}15` }}
                                            >💎</div>
                                            <div>
                                                <p className="text-sm font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>{client.name}</p>
                                                <p className="text-[10px] font-bold transition-colors" style={{ color: theme.textSecondary }}>{client.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <p className="text-xs font-black italic" style={{ color: theme.textPrimary }}>{client.phone}</p>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textPrimary }}>{client.type}</span>
                                    </td>
                                    <td className="px-10 py-8 text-indigo-900 dark:text-white">
                                        <p className="text-xs font-black italic" style={{ color: theme.textPrimary }}>{client.projects} Active</p>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-1 text-orange-500">
                                            <FiStar className="fill-current" />
                                            <span className="text-xs font-black">{client.rating}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8"
                        style={{ backgroundColor: theme.cardBg }}
                    >
                        <div className="p-8 border-b flex justify-between items-center" style={{ borderColor: theme.cardBorder }}>
                            <h3 className="text-2xl font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>Register New Client</h3>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-black/5 rounded-full transition-colors" style={{ color: theme.textSecondary }}>
                                <FiX className="text-xl" />
                            </button>
                        </div>
                        <div className="p-8">
                            <ClientForm onSubmit={handleAddClient} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IntClients;
