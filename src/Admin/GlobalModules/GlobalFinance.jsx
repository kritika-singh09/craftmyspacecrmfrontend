import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

import InvoiceGenerationModal from './InvoiceGenerationModal';
import PaymentVoucherModal from './PaymentVoucherModal';
import ReceiptVoucherModal from './ReceiptVoucherModal';
import COAManagerModal from './COAManagerModal';
import BillPreview from '../ConstructionManagement/Finance/BillPreview';
import {
    FiPieChart, FiFileText, FiCreditCard, FiBarChart2,
    FiActivity, FiDollarSign, FiPlus, FiArrowUp,
    FiArrowDown, FiTrendingUp, FiTrendingDown, FiClock,
    FiEye, FiPrinter, FiSend
} from 'react-icons/fi';
import { GiHammerNails } from 'react-icons/gi';
import { MdArchitecture, MdConstruction } from 'react-icons/md';
import financeService from '../../services/financeService';

const GlobalFinance = ({ contextType }) => {
    const { theme } = useTheme();

    // All Hooks must be at the top level
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showReceiptModal, setShowReceiptModal] = useState(false);
    const [showCOAModal, setShowCOAModal] = useState(false);
    const [dateFilter, setDateFilter] = useState('thisMonth');
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [invoices, setInvoices] = useState([]);
    const [cashFlowData, setCashFlowData] = useState([]);
    const [chartOfAccounts, setChartOfAccounts] = useState([]);
    const [stats, setStats] = useState([
        { label: 'Total Revenue', value: '₹0L', change: '0%', icon: <FiTrendingUp />, color: 'emerald' },
        { label: 'Project Expenses', value: '₹0L', change: '0%', icon: <FiArrowDown />, color: 'rose' },
        { label: 'Outstanding', value: '₹0L', change: '0%', icon: <FiClock />, color: 'amber' },
        { label: 'Net Margin', value: '0%', change: '0%', icon: <FiActivity />, color: 'blue' }
    ]);

    useEffect(() => {
        fetchFinanceData();
    }, []);

    const fetchFinanceData = async () => {
        setLoading(true);
        try {
            const params = contextType ? { businessVertical: contextType.toUpperCase() } : {};
            const [txnRes, invRes, coaRes] = await Promise.all([
                financeService.getTransactions(params),
                financeService.getInvoices(params),
                financeService.getCOA()
            ]);

            if (txnRes.success) setCashFlowData(txnRes.data);
            if (invRes.success) setInvoices(invRes.data);
            if (coaRes.success) setChartOfAccounts(coaRes.data);

            // Update stats based on real data
            if (txnRes.success && invRes.success) {
                const totalRevenue = invRes.data.reduce((sum, inv) => sum + (inv.status === 'PAID' ? inv.totalAmount : 0), 0);
                const totalExpenses = txnRes.data.reduce((sum, txn) => sum + (txn.type === 'EXPENSE' ? txn.amount : 0), 0);
                const outstanding = invRes.data.reduce((sum, inv) => sum + (inv.status !== 'PAID' ? inv.totalAmount : 0), 0);

                setStats([
                    { label: 'Total Revenue', value: `₹${(totalRevenue / 100000).toFixed(1)}L`, change: '+0%', icon: <FiTrendingUp />, color: 'emerald' },
                    { label: 'Project Expenses', value: `₹${(totalExpenses / 100000).toFixed(1)}L`, change: '+0%', icon: <FiArrowDown />, color: 'rose' },
                    { label: 'Outstanding', value: `₹${(outstanding / 100000).toFixed(1)}L`, change: '+0%', icon: <FiClock />, color: 'amber' },
                    { label: 'Net Margin', value: `${totalRevenue > 0 ? (((totalRevenue - totalExpenses) / totalRevenue) * 100).toFixed(1) : 0}%`, change: '+0%', icon: <FiActivity />, color: 'blue' }
                ]);
            }
        } catch (error) {
            console.error('Failed to fetch finance data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (type, id, newStatus) => {
        try {
            let res;
            if (type === 'transaction') {
                res = await financeService.updateTransactionStatus(id, newStatus);
            } else if (type === 'invoice') {
                res = await financeService.updateInvoiceStatus(id, newStatus);
            }

            if (res?.success) {
                fetchFinanceData();
            } else {
                alert('Update failed: ' + (res?.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Status update error:', error);
            alert('Failed to update status');
        }
    };

    const getStatusColor = (status) => {
        const s = status?.toUpperCase();
        const colors = {
            PAID: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-600', border: 'border-emerald-200' },
            SETTLED: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-600', border: 'border-emerald-200' },
            APPROVED: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600', border: 'border-blue-200' },
            PENDING: { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-600', border: 'border-amber-200' },
            OVERDUE: { bg: 'bg-rose-50 dark:bg-rose-900/20', text: 'text-rose-600', border: 'border-rose-200' },
            CANCELLED: { bg: 'bg-slate-50 dark:bg-slate-900/20', text: 'text-slate-600', border: 'border-slate-200' }
        };
        return colors[s] || colors.PENDING;
    };

    // Early return AFTER all hooks


    return (
        <div className="space-y-8 pb-12 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white dark:bg-slate-900/40 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-premium">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-2xl relative overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-600">
                        <div className="absolute inset-0 bg-white/10"></div>
                        <span className="relative z-10">💰</span>
                    </div>
                    <div>
                        <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Financial Ledger</h1>
                        <p className="text-sm font-bold mt-1 text-slate-500 uppercase tracking-widest dark:text-slate-400">
                            Unified Accounting • Construction + Architecture + Interior
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={() => setShowInvoiceModal(true)} className="group flex items-center gap-3 px-6 py-4 rounded-2xl text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-all hover:-translate-y-1 bg-gradient-to-r from-emerald-500 to-emerald-600">
                        <FiPlus className="text-lg transition-transform group-hover:rotate-90" /> New Invoice
                    </button>
                    <button onClick={() => setShowCOAModal(true)} className="group flex items-center gap-3 px-6 py-4 rounded-2xl text-slate-600 dark:text-slate-300 font-black text-xs uppercase tracking-[0.2em] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-emerald-500 transition-all">
                        <FiPieChart className="text-lg" /> Chart of Accounts
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="card-premium p-8 group border-none ring-1 ring-slate-100 dark:ring-slate-800 hover:ring-emerald-500/30 transition-all" style={{ backgroundColor: theme.cardBg }}>
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-4 rounded-2xl bg-${stat.color}-50 dark:bg-${stat.color}-900/20 text-${stat.color}-600 dark:text-${stat.color}-400 group-hover:scale-110 transition-transform`}>
                                {stat.icon}
                            </div>
                            <span className={`text-xs font-black px-3 py-1 rounded-full bg-slate-50 dark:bg-white/5 text-${stat.color}-600`}>
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Tabs & Main View */}
            <div className="card-premium p-8 border-none ring-1 ring-slate-100 dark:ring-slate-800" style={{ backgroundColor: theme.cardBg }}>
                <div className="flex gap-8 border-b border-slate-100 dark:border-white/5 mb-8">
                    {[
                        { id: 'overview', label: 'Cash Flow' },
                        { id: 'invoices', label: 'Invoices' },
                        { id: 'ledger', label: 'Ledger' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-4 text-xs font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === tab.id ? 'text-emerald-500' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {tab.label}
                            {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 rounded-full animate-in slide-in-from-left duration-300" />}
                        </button>
                    ))}
                </div>

                <div className="min-h-[400px]">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Financial Transactions</h3>
                                <div className="flex gap-3 w-full sm:w-auto">
                                    <button
                                        onClick={() => setShowReceiptModal(true)}
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase tracking-widest border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-all shadow-sm"
                                    >
                                        <FiArrowDown className="text-sm" /> Record Receipt
                                    </button>
                                    <button
                                        onClick={() => setShowPaymentModal(true)}
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 font-black text-[10px] uppercase tracking-widest border border-rose-200 dark:border-rose-800 hover:bg-rose-100 transition-all shadow-sm"
                                    >
                                        <FiArrowUp className="text-sm" /> Record Payment
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <th className="px-6 py-4 text-left">TransactionID</th>
                                            <th className="px-6 py-4 text-left">Category / Description</th>
                                            <th className="px-6 py-4 text-right">Amount</th>
                                            <th className="px-6 py-4 text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                                        {cashFlowData.map(txn => (
                                            <tr key={txn.id} className="group hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-5">
                                                    <p className="text-sm font-black text-slate-900 dark:text-white">{txn.transactionId || txn.id}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">{new Date(txn.ledgerDate || txn.date).toLocaleDateString()}</p>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{txn.description}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-wider">{txn.category}</p>
                                                </td>
                                                <td className={`px-6 py-5 text-right font-black text-lg ${txn.type === 'INCOME' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                    {txn.type === 'INCOME' ? '+' : '-'} ₹{txn.amount.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <select
                                                        value={txn.status}
                                                        onChange={(e) => handleStatusUpdate('transaction', txn._id || txn.id, e.target.value)}
                                                        className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border outline-none cursor-pointer transition-all ${getStatusColor(txn.status).bg} ${getStatusColor(txn.status).text} ${getStatusColor(txn.status).border} hover:shadow-lg`}
                                                    >
                                                        <option value="PENDING">Pending</option>
                                                        <option value="APPROVED">Approved</option>
                                                        <option value="SETTLED">Settled</option>
                                                        <option value="CANCELLED">Cancelled</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'invoices' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Recent Invoices</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <th className="px-6 py-4 text-left">Invoice</th>
                                            <th className="px-6 py-4 text-left">Project / Client</th>
                                            <th className="px-6 py-4 text-right">Amount</th>
                                            <th className="px-6 py-4 text-center">Status</th>
                                            <th className="px-6 py-4 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                                        {invoices.map(inv => (
                                            <tr key={inv.id} className="group hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-5">
                                                    <p className="text-sm font-black text-slate-900 dark:text-white">{inv.invoiceNumber || inv.id}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">{new Date(inv.issuedDate || inv.date).toLocaleDateString()}</p>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{inv.project?.name || inv.project}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">{inv.client}</p>
                                                </td>
                                                <td className="px-6 py-5 text-right font-black text-slate-900 dark:text-white">
                                                    ₹{(inv.totalAmount || inv.amount).toLocaleString()}
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <select
                                                        value={inv.status}
                                                        onChange={(e) => handleStatusUpdate('invoice', inv._id || inv.id, e.target.value)}
                                                        className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border outline-none cursor-pointer transition-all ${getStatusColor(inv.status).bg} ${getStatusColor(inv.status).text} ${getStatusColor(inv.status).border} hover:shadow-lg`}
                                                    >
                                                        <option value="PENDING">Pending</option>
                                                        <option value="PAID">Paid</option>
                                                        <option value="OVERDUE">Overdue</option>
                                                        <option value="CANCELLED">Cancelled</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex justify-center gap-2">
                                                        <button
                                                            onClick={() => setSelectedInvoice(inv)}
                                                            className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-emerald-500 transition-colors"
                                                            title="View Invoice"
                                                        >
                                                            <FiEye />
                                                        </button>
                                                        <button
                                                            onClick={() => setSelectedInvoice(inv)}
                                                            className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-emerald-500 transition-colors"
                                                            title="Print Invoice"
                                                        >
                                                            <FiPrinter />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'ledger' && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Main Ledger</h3>
                            <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-white/5">
                                <table className="w-full">
                                    <thead className="bg-slate-50/50 dark:bg-white/5">
                                        <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <th className="px-6 py-4 text-left">Code</th>
                                            <th className="px-6 py-4 text-left">Account Name</th>
                                            <th className="px-6 py-4 text-left">Type</th>
                                            <th className="px-6 py-4 text-right">Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                                        {chartOfAccounts.length > 0 ? (
                                            chartOfAccounts.map(acc => (
                                                <tr key={acc.code} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                                                    <td className="px-6 py-4 text-sm font-bold text-slate-500">{acc.code}</td>
                                                    <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white">{acc.name}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase ${acc.type === 'Asset' ? 'bg-blue-50 text-blue-600' :
                                                            acc.type === 'Liability' ? 'bg-rose-50 text-rose-600' :
                                                                'bg-amber-50 text-amber-600'
                                                            }`}>
                                                            {acc.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right text-sm font-black text-slate-900 dark:text-white">
                                                        ₹{((acc.balance || 0) / 100000).toFixed(2)}L
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-12 text-center">
                                                    <div className="flex flex-col items-center gap-3">
                                                        <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-2xl text-slate-400">
                                                            📚
                                                        </div>
                                                        <div>
                                                            <p className="font-black text-slate-900 dark:text-white uppercase tracking-tight">Your Ledger is empty</p>
                                                            <p className="text-xs font-bold text-slate-500 mt-1">Click "Chart of Accounts" &gt; "Quick Setup Defaults" to begin.</p>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
            <InvoiceGenerationModal
                isOpen={showInvoiceModal}
                onClose={() => setShowInvoiceModal(false)}
                onSuccess={fetchFinanceData}
                initialBusinessType={contextType}
            />
            <PaymentVoucherModal
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                onSuccess={fetchFinanceData}
                initialBusinessType={contextType}
            />
            <ReceiptVoucherModal
                isOpen={showReceiptModal}
                onClose={() => setShowReceiptModal(false)}
                onSuccess={fetchFinanceData}
                initialBusinessType={contextType}
            />
            <COAManagerModal
                isOpen={showCOAModal}
                onClose={() => setShowCOAModal(false)}
                onSuccess={fetchFinanceData}
            />

            {/* Invoice Preview */}
            {selectedInvoice && (
                <BillPreview
                    bill={selectedInvoice}
                    theme={theme}
                    onClose={() => setSelectedInvoice(null)}
                />
            )}
        </div>
    );
};

export default GlobalFinance;
