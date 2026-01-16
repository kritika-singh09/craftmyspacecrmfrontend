import React, { useState } from 'react';

const GlobalUserForm = ({ initialData, onSubmit, onCancel, companies }) => {
    const [formData, setFormData] = useState(initialData || {
        name: '',
        email: '',
        role: 'admin',
        tenant: '',
        status: 'Active',
        permissions: [],
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
                    <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-1">Full Legal Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-semibold"
                        placeholder="e.g. Michael Thorne"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-1">Authentication Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-semibold"
                        placeholder="m.thorne@entity.com"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-1">Affiliated Enterprise</label>
                    <select
                        name="tenant"
                        value={formData.tenant}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-semibold appearance-none cursor-pointer"
                    >
                        <option value="">Select Entity...</option>
                        {companies?.map(c => (
                            <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-1">Global Designation</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-semibold appearance-none cursor-pointer"
                    >
                        <option value="admin">System Administrator</option>
                        <option value="manager">Project Overseer</option>
                        <option value="engineer">Lead Engineer</option>
                        <option value="contractor">External Partner</option>
                    </select>
                </div>
            </div>

            <div className="space-y-4">
                <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-1">Cross-Tenant Entitlements</label>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        'Financial Oversite',
                        'Audit Log Access',
                        'User Provisioning',
                        'Module Management'
                    ].map(perm => (
                        <label key={perm} className="flex items-center gap-3 p-4 bg-brand-50/20 border border-brand-50 rounded-2xl cursor-pointer hover:bg-brand-50/50 transition-all">
                            <input type="checkbox" className="w-5 h-5 rounded-lg border-brand-200 text-brand-600 focus:ring-brand-500/10" />
                            <span className="text-sm font-semibold text-gray-900">{perm}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex gap-4 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 px-4 py-4 rounded-2xl bg-gray-50 text-gray-800 text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100"
                >
                    Discard
                </button>
                <button
                    type="submit"
                    className="flex-2 px-8 py-4 bg-brand-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-brand-700 shadow-premium hover:-translate-y-0.5 transition-all active:scale-95"
                >
                    Establish Identity
                </button>
            </div>
        </form>
    );
};

export default GlobalUserForm;
