import React, { useState } from 'react';
import CompanyForm from './CompanyForm';

const SuperAdminCompanies = () => {
    // Mock Data
    const [companies, setCompanies] = useState([
        { id: 1, name: 'HARR Construction', ownerEmail: 'admin@harr.com', plan: 'Enterprise', status: 'Active', createdDate: '2023-01-15', expiryDate: '2025-01-15' },
        { id: 2, name: 'ABC Builders', ownerEmail: 'admin@abc.com', plan: 'Pro', status: 'Active', createdDate: '2023-03-10', expiryDate: '2024-03-10' },
        { id: 3, name: 'XYZ Infra', ownerEmail: 'contact@xyz.com', plan: 'Basic', status: 'Suspended', createdDate: '2023-06-20', expiryDate: '2024-06-20' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCompany, setEditingCompany] = useState(null);

    const handleFormSubmit = (data) => {
        if (editingCompany) {
            // Update existing company
            setCompanies(companies.map(c => c.id === editingCompany.id ? { ...c, ...data } : c));
            alert(`Enterprise ${data.name} registry updated successfully.`);
        } else {
            // Add new company
            const company = {
                id: companies.length + 1,
                ...data,
                status: data.status || 'Active',
                createdDate: new Date().toISOString().split('T')[0],
                expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
            };
            setCompanies([...companies, company]);
            alert(`New enterprise ${data.name} has been provisioned.`);
        }
        setIsModalOpen(false);
        setEditingCompany(null);
    };

    const handleOpenCreate = () => {
        setEditingCompany(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (company) => {
        setEditingCompany(company);
        setIsModalOpen(true);
    };

    const toggleStatus = (id) => {
        setCompanies(companies.map(c =>
            c.id === id ? { ...c, status: c.status === 'Active' ? 'Suspended' : 'Active' } : c
        ));
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this company?')) {
            setCompanies(companies.filter(c => c.id !== id));
        }
    };

    return (
        <div className="space-y-8 pb-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Enterprise Hub</h1>
                    <p className="text-sm font-bold text-gray-900 mt-1">Tenant Subscriptions and Lifecycle Management</p>
                </div>
                <button
                    onClick={handleOpenCreate}
                    className="group flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-premium hover:bg-brand-700 transition-all hover:-translate-y-0.5"
                >
                    <span className="text-xl leading-none group-hover:rotate-90 transition-transform">+</span>
                    Register Enterprise
                </button>
            </div>

            {/* Companies Table */}
            <div className="card-premium overflow-hidden">
                <div className="p-8 border-b border-brand-50 bg-brand-50/30 flex justify-between items-center">
                    <h3 className="text-xl font-black text-gray-900">Active Tenant Registry</h3>
                    <input
                        type="text"
                        placeholder="Search enterprises..."
                        className="px-4 py-2 bg-white border border-brand-100 rounded-xl text-xs font-bold focus:ring-2 focus:ring-brand-500/10 outline-none w-64"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-brand-50/50 border-b border-brand-100">
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Company / Entity</th>
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Primary Admin</th>
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Tier Plan</th>
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Current State</th>
                                <th className="px-8 py-5 text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Lease Expiry</th>
                                <th className="px-8 py-5 text-right text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Registry Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-50">
                            {companies.map((company) => (
                                <tr key={company.id} className="group hover:bg-brand-50/30 transition-colors">
                                    <td className="px-8 py-6 font-bold text-gray-900 group-hover:text-brand-600 transition-colors">{company.name}</td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-bold text-gray-900">{company.ownerEmail}</p>
                                        <p className="text-[10px] font-black text-gray-800 uppercase tracking-tight mt-0.5">Verified Identity</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border rounded-xl ${company.plan === 'Enterprise' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                            company.plan === 'Pro' ? 'bg-brand-50 text-brand-700 border-brand-200' :
                                                'bg-gray-50 text-gray-900 border-gray-200'
                                            }`}>
                                            {company.plan}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border rounded-xl ${company.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                                            }`}>
                                            {company.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-black text-gray-800">{company.expiryDate}</td>
                                    <td className="px-8 py-6 text-right space-x-2">
                                        <button
                                            onClick={() => handleOpenEdit(company)}
                                            className="px-4 py-2 rounded-xl bg-white border border-brand-100 text-brand-600 text-[10px] font-black uppercase tracking-widest hover:bg-brand-50 transition-all shadow-sm active:scale-95"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => toggleStatus(company.id)}
                                            className="px-4 py-2 rounded-xl bg-white border border-brand-100 text-brand-600 text-[10px] font-black uppercase tracking-widest hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-all shadow-sm active:scale-95"
                                        >
                                            {company.status === 'Active' ? 'Suspend' : 'Resume'}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(company.id)}
                                            className="px-4 py-2 rounded-xl bg-white border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white hover:border-red-600 transition-all shadow-sm active:scale-95"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Company Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-brand-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white rounded-3xl shadow-premium w-full max-w-6xl overflow-hidden border border-brand-100 animate-fade-in-up">
                        <div className="p-8 border-b border-brand-50 bg-brand-50/30 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-black text-gray-900">
                                    {editingCompany ? 'Modify Enterprise' : 'Provision Enterprise'}
                                </h2>
                                <p className="text-xs font-black text-gray-800 uppercase tracking-widest mt-1">
                                    {editingCompany ? 'Updating Registry Identity' : 'Tenant Registration Portal'}
                                </p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-10 h-10 rounded-full hover:bg-white flex items-center justify-center text-gray-900 hover:text-gray-900 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-8">
                            <CompanyForm
                                initialData={editingCompany}
                                onSubmit={handleFormSubmit}
                                onCancel={() => { setIsModalOpen(false); setEditingCompany(null); }}
                            />
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default SuperAdminCompanies;
