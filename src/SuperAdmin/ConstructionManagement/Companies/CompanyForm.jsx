import React, { useState } from 'react';

const CompanyForm = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState(initialData || {
        name: '',
        ownerName: '',
        ownerEmail: '',
        ownerPhone: '',
        plan: 'Pro',
        status: 'Active',
        domain: '',
        address: '',
        taxId: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 form-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-1">Enterprise Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-semibold"
                        placeholder="e.g. Apex Construction Group"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-1">Assigned Subdomain</label>
                    <div className="relative">
                        <input
                            type="text"
                            name="domain"
                            value={formData.domain}
                            onChange={handleChange}
                            required
                            className="w-full px-5 py-4 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-semibold"
                            placeholder="apex"
                        />
                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-black text-gray-600">.craftmyspace.com</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-1">Administrative Lead</label>
                    <input
                        type="text"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-semibold"
                        placeholder="John Wilson"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-1">Contact Credential (Email)</label>
                    <input
                        type="email"
                        name="ownerEmail"
                        value={formData.ownerEmail}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-semibold"
                        placeholder="admin@entity.com"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-1">Access Tier</label>
                    <select
                        name="plan"
                        value={formData.plan}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-semibold appearance-none cursor-pointer"
                    >
                        <option value="Free">Free Tier</option>
                        <option value="Basic">Foundation Plan</option>
                        <option value="Pro">Professional Core</option>
                        <option value="Enterprise">Enterprise Elite</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-1">Registry Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-semibold appearance-none cursor-pointer"
                    >
                        <option value="Active">Active / Operational</option>
                        <option value="Suspended">Suspended / Inactive</option>
                        <option value="Pending">Pending Verification</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-1">Registered Address</label>
                <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-5 py-4 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-semibold resize-none"
                    placeholder="Enter full physical address..."
                />
            </div>

            <div className="flex gap-4 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 px-4 py-4 rounded-2xl bg-gray-50 text-gray-800 text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100"
                >
                    Discard Changes
                </button>
                <button
                    type="submit"
                    className="flex-2 px-8 py-4 bg-brand-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-brand-700 shadow-premium hover:-translate-y-0.5 transition-all active:scale-95"
                >
                    Commit Registry Data
                </button>
            </div>
        </form>
    );
};

export default CompanyForm;
