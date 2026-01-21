import React, { useState } from 'react';
import { FiX, FiCheckCircle, FiSave } from 'react-icons/fi';
import financeService from '../../services/financeService';

const COAManagerModal = ({ isOpen, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        accountName: '',
        accountCode: '',
        parentCategory: 'asset', // asset, liability, income, expense
        subCategory: '',
        openingBalance: 0,
        description: ''
    });

    const categories = {
        asset: ['Current Assets', 'Fixed Assets', 'Bank Accounts', 'Cash', 'Receivables'],
        liability: ['Current Liabilities', 'Long Term Liabilities', 'Payables', 'Tax Payable'],
        equity: ['Owner Capital', 'Retained Earnings', 'Drawings'],
        revenue: ['Direct Income', 'Indirect Income', 'Sales'],
        expense: ['Direct Expense', 'Indirect Expense', 'Cost of Goods Sold', 'Administrative']
    };

    const handleInitializeDefaults = async () => {
        if (!window.confirm('This will create standard accounting heads for your company. Proceed?')) return;
        setLoading(true);
        try {
            const res = await financeService.setupDefaultCOA();
            if (res.success) {
                alert('Default accounts initialized successfully!');
                if (onSuccess) onSuccess();
                onClose();
            } else {
                alert('Error: ' + res.message);
            }
        } catch (error) {
            alert('Failed to initialize defaults');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const coaData = {
                code: formData.accountCode,
                name: formData.accountName,
                type: formData.parentCategory.charAt(0).toUpperCase() + formData.parentCategory.slice(1),
                description: formData.description,
                openingBalance: formData.openingBalance
            };

            const res = await financeService.createCOA(coaData);
            if (res.success) {
                alert('Account head created successfully!');
                if (onSuccess) onSuccess();
                onClose();
            } else {
                alert('Error: ' + res.message);
            }
        } catch (error) {
            alert('Failed to create account head');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="w-full max-w-xl bg-white dark:bg-slate-950 rounded-3xl overflow-hidden shadow-2xl relative border border-white/10 flex flex-col">

                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                                    New Account Head
                                </h3>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                                    Chart of Accounts Master
                                </p>
                            </div>
                            <button
                                onClick={handleInitializeDefaults}
                                className="px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 font-black text-[10px] uppercase tracking-widest border border-emerald-100 hover:bg-emerald-100 transition-all mr-4"
                            >
                                ✨ Quick Setup Defaults
                            </button>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors">
                        <FiX size={24} className="text-slate-500 dark:text-slate-400" />
                    </button>
                </div>

                {/* Form Body */}
                <div className="p-6 space-y-6">
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Account Name</label>
                        <input
                            type="text"
                            value={formData.accountName}
                            onChange={(e) => handleChange('accountName', e.target.value)}
                            placeholder="e.g., HDFC Bank - Op. Account"
                            className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Account Code</label>
                            <input
                                type="text"
                                value={formData.accountCode}
                                onChange={(e) => handleChange('accountCode', e.target.value)}
                                placeholder="e.g., 1005"
                                className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Primary Category</label>
                            <select
                                value={formData.parentCategory}
                                onChange={(e) => handleChange('parentCategory', e.target.value)}
                                className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                            >
                                <option value="asset">Asset (What you have / Property / Bank)</option>
                                <option value="liability">Liability (What you owe / Loans / Payables)</option>
                                <option value="equity">Equity (Owner's Investment / Capital)</option>
                                <option value="revenue">Revenue (Earnings / Sales)</option>
                                <option value="expense">Expense (Spending / Costs)</option>
                            </select>
                            <p className="text-[10px] font-bold text-slate-400 mt-2 px-1 italic italic italic">
                                {formData.parentCategory === 'asset' && "Assets are things the company owns (Cash, Equipment, Receivables)."}
                                {formData.parentCategory === 'liability' && "Liabilities are debts the company owes (Loans, Unpaid Bills)."}
                                {formData.parentCategory === 'equity' && "Equity is the owner's stake in the business."}
                                {formData.parentCategory === 'revenue' && "Revenue is money coming in from projects or services."}
                                {formData.parentCategory === 'expense' && "Expenses are costs incurred to run the business (Rent, Materials, Labor)."}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Sub Category</label>
                            <select
                                value={formData.subCategory}
                                onChange={(e) => handleChange('subCategory', e.target.value)}
                                className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                            >
                                <option value="">Select Sub-Category</option>
                                {categories[formData.parentCategory].map(sub => (
                                    <option key={sub} value={sub}>{sub}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Opening Balance</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                                <input
                                    type="number"
                                    value={formData.openingBalance}
                                    onChange={(e) => handleChange('openingBalance', e.target.value)}
                                    className="w-full h-12 pl-8 pr-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            rows={2}
                            placeholder="Optional account description..."
                            className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
                        />
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-black text-xs uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 text-white font-black text-xs uppercase tracking-widest shadow-lg hover:bg-emerald-700 transition-all hover:shadow-emerald-600/20 disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : <><FiSave size={18} /> Create Account</>}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default COAManagerModal;
