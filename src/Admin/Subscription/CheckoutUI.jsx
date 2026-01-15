import React, { useState } from 'react';
import { FiLock, FiCheckCircle, FiLoader, FiCreditCard } from 'react-icons/fi';
import { useSubscription } from '../../hooks/useSubscription';

const CheckoutUI = ({ plan, onCancel }) => {
    const { processPayment } = useSubscription();
    const [step, setStep] = useState('review'); // review, processing, success
    const price = plan === 'Pro' ? '25,000' : '15,000';

    const handlePayment = () => {
        setStep('processing');
        setTimeout(() => {
            processPayment(true);
            setStep('success');
        }, 2000);
    };

    if (step === 'success') {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 mb-6">
                    <FiCheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Payment Successful!</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8">Your {plan} plan is now active. All modules are unlocked.</p>
                <button
                    onClick={() => { onCancel(); window.location.href = '/profile'; }}
                    className="px-8 py-3 bg-brand-600 text-white rounded-xl font-bold uppercase text-xs tracking-widest shadow-lg shadow-brand-600/20"
                >
                    Verify in Profile
                </button>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Secure <span className="text-brand-600">Checkout</span></h3>
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-slate-500">
                    <FiLock size={12} /> SSL SECURED
                </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 mb-8 border border-slate-100 dark:border-slate-700">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{plan} Plan Subscription</span>
                    <span className="text-lg font-black text-slate-900 dark:text-white">₹{price}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">Total Charged today</span>
                    <span className="text-xl font-black text-brand-600">₹{price}</span>
                </div>
            </div>

            {step === 'processing' ? (
                <div className="flex flex-col items-center justify-center py-12">
                    <FiLoader className="animate-spin text-brand-600 mb-4" size={32} />
                    <p className="text-sm font-bold text-slate-600 dark:text-slate-400">Processing Secure Payment...</p>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="p-6 border-2 border-brand-600 rounded-2xl bg-brand-50/50 dark:bg-brand-900/10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-brand-600 shadow-sm border border-slate-100 dark:border-slate-700">
                                <FiCreditCard size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-widest">Card / UPI / Netbanking</p>
                                <p className="text-[10px] text-slate-500">Secure payment via Razorpay</p>
                            </div>
                        </div>
                        <div className="w-5 h-5 rounded-full border-2 border-brand-600 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 bg-brand-600 rounded-full"></div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={onCancel}
                            className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-200 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handlePayment}
                            className="flex-[2] py-4 bg-brand-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-brand-600/30 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            Pay Now ₹{price}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutUI;
