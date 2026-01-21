import React, { useState } from 'react';
import { FiX, FiCheckCircle } from 'react-icons/fi';
import financeService from '../../services/financeService';
import projectService from '../../services/projectService';

const ReceiptVoucherModal = ({ isOpen, onClose, onSuccess, initialBusinessType }) => {
    const [projects, setProjects] = useState([]);
    const [coaAccounts, setCoaAccounts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        receiptNo: 'RCP-2024-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
        date: new Date().toISOString().split('T')[0],
        receivedFrom: 'client', // client, other_income, refund
        payerName: '',
        projectId: '',
        businessType: initialBusinessType || 'construction',
        receiptMode: 'bank_transfer',
        amount: '',
        tdsReceivable: 0,
        totalCredited: 0,
        referenceNo: '', // Cheque/Transaction ID
        coaAccount: '',
        narration: '',
        linkedInvoices: [] // For future implementation of invoice linking
    });

    React.useEffect(() => {
        if (isOpen) {
            fetchProjects();
            fetchCOA();
        }
    }, [isOpen]);

    const fetchProjects = async () => {
        const res = await projectService.getProjects();
        if (res.success) {
            setProjects(res.data);
        }
    };

    const fetchCOA = async () => {
        const res = await financeService.getCOA();
        if (res.success) {
            // Filter Revenue/Income types for receipts (Case-insensitive check)
            // Also include Assets for things like security deposits or refunds
            const filtered = res.data.filter(acc => {
                const type = acc.type?.toLowerCase();
                return type === 'revenue' || type === 'income' || type === 'asset' || type === 'equity';
            });
            setCoaAccounts(filtered);
        }
    };

    const calculateTotal = (amount, tds) => {
        const amt = parseFloat(amount) || 0;
        const tax = parseFloat(tds) || 0;
        return amt + tax; // Total invoice value cleared is Amount Received + TDS Deducted by client
    };

    const handleChange = (field, value) => {
        let newData = { ...formData, [field]: value };

        if (field === 'amount' || field === 'tdsReceivable') {
            newData.totalCredited = calculateTotal(newData.amount, newData.tdsReceivable);
        }

        setFormData(newData);
    };

    const handleSubmit = async () => {
        if (!formData.coaAccount) return alert('Please select a Ledger Account');
        setLoading(true);
        try {
            const selectedAcc = coaAccounts.find(a => a._id === formData.coaAccount);
            const txnData = {
                transactionId: formData.receiptNo,
                type: 'INCOME',
                category: selectedAcc ? selectedAcc.name : 'Revenue',
                coaAccount: formData.coaAccount,
                amount: parseFloat(formData.amount),
                project: formData.projectId,
                paymentMode: formData.receiptMode,
                referenceId: formData.referenceNo,
                description: formData.narration || `Receipt from ${formData.payerName}`,
                businessVertical: formData.businessType.toUpperCase(),
                ledgerDate: formData.date
            };

            const res = await financeService.createTransaction(txnData);
            if (res.success) {
                alert('Receipt recorded successfully!');
                if (onSuccess) onSuccess();
                onClose();
            } else {
                alert('Error: ' + res.message);
            }
        } catch (error) {
            alert('Failed to record receipt');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="w-full max-w-2xl bg-white dark:bg-slate-950 rounded-3xl overflow-hidden shadow-2xl relative border border-white/10 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <div>
                        <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                            Record Receipt
                        </h3>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                            Client Payments & Income
                        </p>
                    </div>
                    <button onClick={onClose} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors">
                        <FiX size={24} className="text-slate-500 dark:text-slate-400" />
                    </button>
                </div>

                {/* Form Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Top Row: Receipt No & Date */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Receipt No</label>
                            <input
                                type="text"
                                value={formData.receiptNo}
                                readOnly
                                className="w-full h-12 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-500 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Date Received</label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => handleChange('date', e.target.value)}
                                className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                            />
                        </div>
                    </div>

                    {/* Payer Selection */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Received From</label>
                            <select
                                value={formData.receivedFrom}
                                onChange={(e) => handleChange('receivedFrom', e.target.value)}
                                className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                            >
                                <option value="client">Client</option>
                                <option value="other_income">Other Income</option>
                                <option value="refund">Refund</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Payer Name / Client</label>
                            <input
                                type="text"
                                placeholder="Enter client or payer name..."
                                value={formData.payerName}
                                onChange={(e) => handleChange('payerName', e.target.value)}
                                className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                            />
                        </div>
                    </div>

                    {/* Project & Business Type */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Project Linked</label>
                            <select
                                value={formData.projectId}
                                onChange={(e) => handleChange('projectId', e.target.value)}
                                className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                            >
                                <option value="">Select Project</option>
                                {projects.map(p => (
                                    <option key={p._id} value={p._id}>{p.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Business Type</label>
                            <select
                                value={formData.businessType}
                                onChange={(e) => handleChange('businessType', e.target.value)}
                                className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                            >
                                <option value="construction">Construction</option>
                                <option value="architecture">Architecture</option>
                                <option value="interior">Interior</option>
                            </select>
                        </div>
                    </div>

                    {/* Receipt Details */}
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Mode</label>
                                <select
                                    value={formData.receiptMode}
                                    onChange={(e) => handleChange('receiptMode', e.target.value)}
                                    className="w-full h-12 px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                                >
                                    <option value="bank_transfer">Bank Transfer</option>
                                    <option value="cheque">Cheque</option>
                                    <option value="cash">Cash</option>
                                    <option value="upi">UPI</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Reference No</label>
                                <input
                                    type="text"
                                    placeholder="Transaction ID / UTR"
                                    value={formData.referenceNo}
                                    onChange={(e) => handleChange('referenceNo', e.target.value)}
                                    className="w-full h-12 px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1 block">Amount Received</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 font-bold">₹</span>
                                    <input
                                        type="number"
                                        value={formData.amount}
                                        onChange={(e) => handleChange('amount', e.target.value)}
                                        className="w-full h-12 pl-8 pr-4 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 font-bold outline-none focus:ring-2 focus:ring-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1 block">TDS Deducted (by Client)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-400 font-bold">+₹</span>
                                    <input
                                        type="number"
                                        value={formData.tdsReceivable}
                                        onChange={(e) => handleChange('tdsReceivable', e.target.value)}
                                        className="w-full h-12 pl-10 pr-4 rounded-xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/30 font-bold outline-none focus:ring-2 focus:ring-rose-500/20 text-rose-600"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Total Credited</label>
                                <div className="h-12 flex items-center px-4 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl opacity-60">
                                    <span className="font-black text-lg text-slate-700 dark:text-slate-300">₹{formData.totalCredited.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Ledger Account (Revenue / Income Head)</label>
                        <select
                            value={formData.coaAccount}
                            onChange={(e) => handleChange('coaAccount', e.target.value)}
                            className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold outline-none focus:ring-2 focus:ring-emerald-500/20 mb-4"
                        >
                            <option value="">Select Account</option>
                            {coaAccounts.map(acc => (
                                <option key={acc._id} value={acc._id}>{acc.code} - {acc.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Narration</label>
                        <textarea
                            value={formData.narration}
                            onChange={(e) => handleChange('narration', e.target.value)}
                            rows={2}
                            placeholder="Being amount received from..."
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
                        {loading ? 'Recording...' : <><FiCheckCircle size={18} /> Record Receipt</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReceiptVoucherModal;
