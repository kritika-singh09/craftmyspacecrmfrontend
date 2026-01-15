import React, { useState } from 'react';

const CouponForm = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        code: '',
        discountType: 'Percentage',
        value: '',
        expiryDate: '',
        usageLimit: '',
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
            <div className="space-y-2">
                <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-1">Promotional Code</label>
                <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-semibold uppercase"
                    placeholder="e.g. WINTER2026"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-1">Discount Metric</label>
                    <select
                        name="discountType"
                        value={formData.discountType}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-semibold appearance-none"
                    >
                        <option value="Percentage">Percentage (%)</option>
                        <option value="Fixed">Fixed Amount ($)</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-1">Value</label>
                    <input
                        type="number"
                        name="value"
                        value={formData.value}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-semibold"
                        placeholder="20"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-1">Expiration Timeline</label>
                    <input
                        type="date"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-semibold"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-1">Redemption Cap</label>
                    <input
                        type="number"
                        name="usageLimit"
                        value={formData.usageLimit}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-semibold"
                        placeholder="Unlimited"
                    />
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
                    className="flex-2 px-8 py-4 bg-brand-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-brand-700 shadow-premium transition-all active:scale-95"
                >
                    Establish Coupon
                </button>
            </div>
        </form>
    );
};

export default CouponForm;
