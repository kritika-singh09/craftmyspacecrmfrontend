import React, { useState } from 'react';
import { FiX, FiPlus, FiTrash2, FiSave, FiEye, FiPrinter, FiSend } from 'react-icons/fi';
import financeService from '../../services/financeService';
import projectService from '../../services/projectService';

const InvoiceGenerationModal = ({ isOpen, onClose, onSuccess, initialBusinessType }) => {
    const [projects, setProjects] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [formData, setFormData] = useState({
        invoiceNumber: 'INV-2024-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
        invoiceDate: new Date().toISOString().split('T')[0],
        dueDate: '',
        clientId: '',
        projectId: '',
        businessType: initialBusinessType || 'construction',
        invoiceType: 'tax',
        lineItems: [
            { description: '', quantity: 1, unit: 'nos', rate: 0, amount: 0, costHead: 'material', taxCode: 'GST18' }
        ],
        subtotal: 0,
        cgst: 0,
        sgst: 0,
        igst: 0,
        retention: 0,
        advanceAdjustment: 0,
        netPayable: 0,
        paymentTerms: '30 days from invoice date',
        notes: '',
        bankDetails: 'HDFC Bank, A/c: 50200012345678'
    });

    React.useEffect(() => {
        if (isOpen) {
            fetchProjects();
        }
    }, [isOpen]);

    const fetchProjects = async () => {
        const res = await projectService.getProjects();
        if (res.success) {
            setProjects(res.data);
        }
    };

    const invoiceTypes = [
        { value: 'proforma', label: 'Proforma Invoice' },
        { value: 'tax', label: 'Tax Invoice' },
        { value: 'progress', label: 'Progress Invoice (Construction)' },
        { value: 'milestone', label: 'Milestone Invoice (Construction)' },
        { value: 'phase', label: 'Phase Invoice (Architecture)' },
        { value: 'item', label: 'Item Invoice (Interior)' },
        { value: 'credit', label: 'Credit Note' },
        { value: 'debit', label: 'Debit Note' }
    ];

    const costHeads = [
        { value: 'material', label: 'Material' },
        { value: 'labor', label: 'Labor' },
        { value: 'design', label: 'Design' },
        { value: 'consultancy', label: 'Consultancy' },
        { value: 'siteExpense', label: 'Site Expense' },
        { value: 'furniture', label: 'Furniture & Fixtures' },
        { value: 'mep', label: 'MEP' },
        { value: 'subcontract', label: 'Subcontract' },
        { value: 'overhead', label: 'Overhead' }
    ];

    const taxCodes = [
        { value: 'GST18', cgst: 9, sgst: 9, igst: 18 },
        { value: 'GST12', cgst: 6, sgst: 6, igst: 12 },
        { value: 'GST5', cgst: 2.5, sgst: 2.5, igst: 5 },
        { value: 'GST0', cgst: 0, sgst: 0, igst: 0 }
    ];

    const addLineItem = () => {
        setFormData(prev => ({
            ...prev,
            lineItems: [
                ...prev.lineItems,
                { description: '', quantity: 1, unit: 'nos', rate: 0, amount: 0, costHead: 'material', taxCode: 'GST18' }
            ]
        }));
    };

    const removeLineItem = (index) => {
        if (formData.lineItems.length > 1) {
            const newItems = formData.lineItems.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, lineItems: newItems }));
            calculateTotals(newItems);
        }
    };

    const updateLineItem = (index, field, value) => {
        const newItems = [...formData.lineItems];
        newItems[index][field] = value;

        // Auto-calculate amount
        if (field === 'quantity' || field === 'rate') {
            newItems[index].amount = newItems[index].quantity * newItems[index].rate;
        }

        setFormData(prev => ({ ...prev, lineItems: newItems }));
        calculateTotals(newItems);
    };

    const calculateTotals = (items) => {
        const subtotal = items.reduce((sum, item) => sum + item.amount, 0);

        // For simplicity, using CGST+SGST (assuming intra-state)
        const cgst = subtotal * 0.09; // 9%
        const sgst = subtotal * 0.09; // 9%
        const igst = 0; // Inter-state would use this

        const retention = subtotal * 0.05; // 5% retention
        const netPayable = subtotal + cgst + sgst + igst - retention - formData.advanceAdjustment;

        setFormData(prev => ({
            ...prev,
            subtotal,
            cgst,
            sgst,
            igst,
            retention,
            netPayable
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const invoiceData = {
                invoiceNumber: formData.invoiceNumber,
                client: formData.clientId || 'Walking Client', // Fallback name
                project: formData.projectId,
                amount: formData.subtotal,
                taxAmount: formData.cgst + formData.sgst + formData.igst,
                totalAmount: formData.netPayable,
                dueDate: formData.dueDate,
                businessVertical: formData.businessType.toUpperCase(),
                items: formData.lineItems.map(item => ({
                    description: item.description,
                    quantity: item.quantity,
                    unitPrice: item.rate,
                    total: item.amount
                })),
                notes: formData.notes
            };

            console.log('Final Invoice Payload:', invoiceData);

            const res = await financeService.createInvoice(invoiceData);
            if (res.success) {
                alert('Invoice created successfully!');
                if (onSuccess) onSuccess();
                onClose();
            } else {
                alert('Error: ' + res.message);
            }
        } catch (error) {
            alert('Failed to create invoice');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="w-full max-w-6xl bg-white dark:bg-slate-950 rounded-3xl overflow-hidden shadow-2xl relative border border-white/10 max-h-[95vh] flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <div>
                        <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                            Generate Invoice
                        </h3>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                            Unified Invoicing System • Auto Ledger Posting
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                {/* Form Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Invoice Header Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Invoice Number</label>
                            <input
                                type="text"
                                value={formData.invoiceNumber}
                                onChange={(e) => setFormData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                                className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Invoice Date</label>
                            <input
                                type="date"
                                value={formData.invoiceDate}
                                onChange={(e) => setFormData(prev => ({ ...prev, invoiceDate: e.target.value }))}
                                className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Due Date</label>
                            <input
                                type="date"
                                value={formData.dueDate}
                                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                                className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                            />
                        </div>
                    </div>

                    {/* Client, Project, Business Type */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Client</label>
                            <select
                                value={formData.clientId}
                                onChange={(e) => setFormData(prev => ({ ...prev, clientId: e.target.value }))}
                                className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                            >
                                <option value="">Select Client</option>
                                <option value="1">Realty Corp</option>
                                <option value="2">Metro Developers</option>
                                <option value="3">Urban Spaces Ltd</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Project</label>
                            <select
                                value={formData.projectId}
                                onChange={(e) => setFormData(prev => ({ ...prev, projectId: e.target.value }))}
                                className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                            >
                                <option value="">Select Project</option>
                                {projects.map(p => (
                                    <option key={p._id} value={p._id}>{p.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Business Type</label>
                            <select
                                value={formData.businessType}
                                onChange={(e) => setFormData(prev => ({ ...prev, businessType: e.target.value }))}
                                className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                            >
                                <option value="construction">Construction</option>
                                <option value="architecture">Architecture</option>
                                <option value="interior">Interior</option>
                            </select>
                        </div>
                    </div>

                    {/* Invoice Type */}
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Invoice Type</label>
                        <select
                            value={formData.invoiceType}
                            onChange={(e) => setFormData(prev => ({ ...prev, invoiceType: e.target.value }))}
                            className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                        >
                            {invoiceTypes.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Line Items Section */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h4 className="text-sm font-black uppercase tracking-tight text-slate-900 dark:text-white">Line Items</h4>
                            <button
                                onClick={addLineItem}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all"
                            >
                                <FiPlus /> Add Item
                            </button>
                        </div>

                        {/* Line Item Labels */}
                        <div className="hidden lg:grid grid-cols-12 gap-3 px-4">
                            <div className="col-span-4"><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</span></div>
                            <div className="col-span-1"><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Qty</span></div>
                            <div className="col-span-1"><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unit</span></div>
                            <div className="col-span-2"><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rate</span></div>
                            <div className="col-span-2"><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cost Head</span></div>
                            <div className="col-span-1 text-right"><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</span></div>
                            <div className="col-span-1"></div>
                        </div>

                        <div className="space-y-3">
                            {formData.lineItems.map((item, index) => (
                                <div key={index} className="grid grid-cols-12 gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
                                    <div className="col-span-12 lg:col-span-4">
                                        <input
                                            type="text"
                                            placeholder="Description"
                                            value={item.description}
                                            onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                                            className="w-full h-10 px-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        />
                                    </div>
                                    <div className="col-span-4 lg:col-span-1">
                                        <input
                                            type="number"
                                            placeholder="Qty"
                                            value={item.quantity}
                                            onChange={(e) => updateLineItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                                            className="w-full h-10 px-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        />
                                    </div>
                                    <div className="col-span-4 lg:col-span-1">
                                        <select
                                            value={item.unit}
                                            onChange={(e) => updateLineItem(index, 'unit', e.target.value)}
                                            className="w-full h-10 px-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        >
                                            <option value="nos">Nos</option>
                                            <option value="sqft">Sqft</option>
                                            <option value="cum">Cum</option>
                                            <option value="kg">Kg</option>
                                            <option value="ls">LS</option>
                                        </select>
                                    </div>
                                    <div className="col-span-4 lg:col-span-2">
                                        <input
                                            type="number"
                                            placeholder="Rate"
                                            value={item.rate}
                                            onChange={(e) => updateLineItem(index, 'rate', parseFloat(e.target.value) || 0)}
                                            className="w-full h-10 px-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        />
                                    </div>
                                    <div className="col-span-6 lg:col-span-2">
                                        <select
                                            value={item.costHead}
                                            onChange={(e) => updateLineItem(index, 'costHead', e.target.value)}
                                            className="w-full h-10 px-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        >
                                            {costHeads.map(head => (
                                                <option key={head.value} value={head.value}>{head.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-span-5 lg:col-span-1">
                                        <div className="h-10 px-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 flex items-center justify-end">
                                            <span className="text-sm font-black text-emerald-600">₹{item.amount.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <button
                                            onClick={() => removeLineItem(index)}
                                            disabled={formData.lineItems.length === 1}
                                            className="w-full h-10 rounded-lg bg-rose-50 dark:bg-rose-900/20 text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
                                        >
                                            <FiTrash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Totals Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Payment Terms</label>
                                <input
                                    type="text"
                                    value={formData.paymentTerms}
                                    onChange={(e) => setFormData(prev => ({ ...prev, paymentTerms: e.target.value }))}
                                    className="w-full h-10 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Notes</label>
                                <textarea
                                    value={formData.notes}
                                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
                                    placeholder="Additional notes or instructions..."
                                />
                            </div>
                        </div>

                        <div className="space-y-3 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-500">Subtotal</span>
                                <span className="text-lg font-black text-slate-900 dark:text-white">₹{formData.subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-500">CGST (9%)</span>
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">₹{formData.cgst.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-500">SGST (9%)</span>
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">₹{formData.sgst.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-rose-600">
                                <span className="text-xs font-bold">Retention (5%)</span>
                                <span className="text-sm font-bold">-₹{formData.retention.toLocaleString()}</span>
                            </div>
                            <div className="pt-3 border-t-2 border-slate-300 dark:border-slate-700 flex justify-between items-center">
                                <span className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Net Payable</span>
                                <span className="text-2xl font-black text-emerald-600">₹{formData.netPayable.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex flex-wrap gap-3 p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-emerald-600 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-700 transition-all disabled:opacity-50"
                    >
                        {loading ? 'Submitting...' : <><FiSave /> Save & Post to Ledger</>}
                    </button>
                    <button className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-black text-xs uppercase tracking-widest text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                        <FiEye /> Preview PDF
                    </button>
                    <button className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-black text-xs uppercase tracking-widest text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                        <FiSend /> Send to Client
                    </button>
                    <button
                        onClick={onClose}
                        className="ml-auto px-6 py-4 rounded-2xl bg-slate-200 dark:bg-slate-800 font-black text-xs uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvoiceGenerationModal;
