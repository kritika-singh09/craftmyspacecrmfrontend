import React from 'react';
import { FiDownload, FiPrinter, FiSend, FiX } from 'react-icons/fi';

const BillPreview = ({ bill, theme, onClose }) => {
    if (!bill) return null;

    const handlePrint = () => {
        const printContent = document.getElementById('printable-bill');
        const originalContent = document.body.innerHTML;
        document.body.innerHTML = printContent.outerHTML;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload(); // Reload to restore React state and styles
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `Bill ${bill.invoiceNumber || bill.id}`,
                text: `Financial details for ${bill.project?.name || bill.project}`,
                url: window.location.href,
            }).catch(console.error);
        } else {
            alert('Sharing is not supported on this browser. Link copied to clipboard.');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
            <div
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col h-[90vh] animate-in zoom-in-95 duration-300 border border-slate-200 dark:border-slate-800">
                {/* Header Actions */}
                <div className="p-4 md:p-6 border-b flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50" style={{ borderColor: theme.cardBorder }}>
                    <div className="flex gap-2">
                        <button
                            onClick={handlePrint}
                            className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm"
                        >
                            <FiPrinter size={16} /> Print
                        </button>
                        <button
                            onClick={handleShare}
                            className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-brand-700 transition-all shadow-lg"
                        >
                            <FiSend size={16} /> Send to Client
                        </button>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                {/* Bill Content Area */}
                <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-slate-50 dark:bg-slate-950 custom-scrollbar">
                    <div
                        id="printable-bill"
                        className="bg-white dark:bg-slate-900 p-10 md:p-16 rounded-lg shadow-xl mx-auto max-w-3xl border border-slate-100 dark:border-slate-800 print:shadow-none print:border-none"
                    >
                        {/* Bill Header */}
                        <div className="flex justify-between items-start mb-12 border-b-4 border-slate-900 dark:border-white pb-8">
                            <div>
                                <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900 dark:text-white mb-2">INVOICE</h1>
                                <p className="text-sm font-bold text-slate-400">ID: {bill.invoiceNumber || bill.id}</p>
                            </div>
                            <div className="text-right">
                                <h2 className="text-xl font-black text-slate-800 dark:text-white">CONSTRUCTION CRM</h2>
                                <p className="text-xs font-medium text-slate-500 mt-1">123 Builder Avenue, High Rise Plaza</p>
                                <p className="text-xs font-medium text-slate-500">Mumbai, Maharashtra - 400001</p>
                            </div>
                        </div>

                        {/* Bill Info */}
                        <div className="grid grid-cols-2 gap-12 mb-12">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Billed To</p>
                                <p className="font-black text-slate-800 dark:text-white text-lg">{bill.project?.name || bill.project} Management</p>
                                <p className="text-sm text-slate-500 font-medium">{bill.client}</p>
                                <p className="text-sm text-slate-500">Contact: +91 98765 43210</p>
                            </div>
                            <div className="text-right">
                                <div className="mb-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Date Issued</p>
                                    <p className="font-black text-slate-800 dark:text-white">{bill.issuedDate ? new Date(bill.issuedDate).toLocaleDateString() : bill.date}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status</p>
                                    <p className={`font-black uppercase text-sm ${bill.status === 'Certified' ? 'text-green-600' : 'text-yellow-600'}`}>{bill.status}</p>
                                </div>
                            </div>
                        </div>

                        {/* Bill Items Table */}
                        <table className="w-full mb-12">
                            <thead>
                                <tr className="border-b-2 border-slate-200 dark:border-slate-800">
                                    <th className="py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Description</th>
                                    <th className="py-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {bill.items && bill.items.length > 0 ? (
                                    bill.items.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="py-6">
                                                <p className="font-black text-slate-800 dark:text-white">{item.description}</p>
                                                <p className="text-xs text-slate-400 font-medium mt-1">Quantity: {item.quantity} | Unit Price: ₹{item.unitPrice?.toLocaleString()}</p>
                                            </td>
                                            <td className="py-6 text-right font-black text-slate-800 dark:text-white text-lg">
                                                ₹{item.total?.toLocaleString()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="py-6">
                                            <p className="font-black text-slate-800 dark:text-white">General Billing</p>
                                        </td>
                                        <td className="py-6 text-right font-black text-slate-800 dark:text-white text-lg">
                                            ₹{(bill.amount || 0).toLocaleString()}
                                        </td>
                                    </tr>
                                )}
                                {bill.certified > 0 && (
                                    <tr>
                                        <td className="py-4 italic text-sm text-slate-500">Certified Amount for Release</td>
                                        <td className="py-4 text-right text-sm font-bold text-green-600">₹{bill.certified.toLocaleString()}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Totals Section */}
                        <div className="flex justify-end border-t-2 border-slate-900 dark:border-white pt-8">
                            <div className="w-64 space-y-4">
                                <div className="flex justify-between items-center text-sm font-bold text-slate-400">
                                    <span>Subtotal</span>
                                    <span className="text-slate-800 dark:text-white">₹{(bill.amount || bill.totalAmount || 0).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-bold text-rose-500">
                                    <span>Retention</span>
                                    <span>- ₹{(bill.retention || 0).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-bold text-blue-500 border-b border-slate-100 dark:border-slate-800 pb-4">
                                    <span>Tax Amount (GST)</span>
                                    <span>+ ₹{(bill.taxAmount || 0).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-xl font-black text-slate-900 dark:text-white pt-2">
                                    <span>Total Due</span>
                                    <span>₹{(bill.totalAmount || bill.amount || 0).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer Note */}
                        <div className="mt-20 text-center border-t border-slate-100 dark:border-slate-800 pt-8">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Thank you for your business</p>
                            <p className="text-[10px] text-slate-300 mt-2">This is a computer generated document. No signature required.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillPreview;
