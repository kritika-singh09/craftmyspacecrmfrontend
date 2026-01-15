import React, { useState } from 'react';

const TierForm = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        period: 'Monthly',
        userLimit: '',
        projectLimit: '',
        features: '',
        isPopular: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 form-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-1">Tier Designation</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-semibold"
                        placeholder="e.g. Pro Suite"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-1">Price Point (INR)</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-semibold"
                        placeholder="9999"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-1">User Threshold</label>
                    <input
                        type="number"
                        name="userLimit"
                        value={formData.userLimit}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-semibold"
                        placeholder="25"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-1">Project Quota</label>
                    <input
                        type="number"
                        name="projectLimit"
                        value={formData.projectLimit}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-semibold"
                        placeholder="Unlimited"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-1">Entitlements (Comma Separated)</label>
                <textarea
                    name="features"
                    value={formData.features}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-5 py-4 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-semibold resize-none"
                    placeholder="Custom Workflows, Detailed Analytics, API Access..."
                />
            </div>

            <div className="flex items-center gap-3 p-4 bg-brand-50/20 border border-brand-50 rounded-2xl cursor-pointer">
                <input
                    type="checkbox"
                    name="isPopular"
                    checked={formData.isPopular}
                    onChange={handleChange}
                    className="w-5 h-5 rounded-lg border-brand-200 text-brand-600 focus:ring-brand-500/10"
                />
                <span className="text-sm font-bold text-gray-900">Tag as "Recommended Choice"</span>
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
                    className="flex-2 px-8 py-4 bg-brand-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-brand-700 shadow-premium transition-all active:scale-95"
                >
                    Deploy New Tier
                </button>
            </div>
        </form>
    );
};

export default TierForm;
