import React from 'react';
import { FiHome, FiMail, FiPhone, FiMapPin, FiGlobe, FiCreditCard, FiUpload, FiShoppingBag, FiInfo } from 'react-icons/fi';

const IntProfile = () => {
    return (
        <div className="space-y-10 pb-12 animate-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight uppercase tracking-tight">Studio <span className="text-orange-600">Identity</span></h1>
                    <p className="text-gray-800 dark:text-orange-300 mt-2 font-bold tracking-wide">Manage your interior design firm's branding, financials, and vendor preferences.</p>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all">
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Branding & Logo */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="p-10 bg-white dark:bg-brand-900/30 rounded-[3.5rem] shadow-premium border border-orange-50 dark:border-brand-800 flex flex-col items-center text-center">
                        <div className="w-40 h-40 rounded-[3rem] bg-orange-50 dark:bg-brand-800 border-2 border-dashed border-orange-200 dark:border-brand-700 flex flex-col items-center justify-center cursor-pointer group hover:border-orange-500 transition-all">
                            <FiUpload className="text-3xl text-orange-400 group-hover:text-orange-600 mb-2" />
                            <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Upload Logo</p>
                        </div>
                        <h3 className="mt-8 text-2xl font-black text-indigo-900 dark:text-white uppercase tracking-tight underline decoration-orange-500 decoration-4">Artisan Interior</h3>
                        <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mt-2">Boutique Design Studio</p>
                    </div>

                    <div className="p-8 bg-white dark:bg-brand-900/30 rounded-[3rem] shadow-premium border border-orange-50 dark:border-brand-800 text-indigo-900 dark:text-white">
                        <h4 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                            <FiShoppingBag className="text-orange-600" /> Procurement Type
                        </h4>
                        <div className="space-y-4">
                            {['Full Turnkey', 'Design Consultancy', 'PMC Basis'].map(type => (
                                <label key={type} className="flex items-center gap-3 p-4 bg-orange-50/30 dark:bg-brand-800/20 rounded-2xl cursor-pointer hover:bg-orange-100 transition-all border border-transparent hover:border-orange-200">
                                    <input type="checkbox" className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500" defaultChecked={type === 'Full Turnkey'} />
                                    <span className="text-xs font-bold uppercase tracking-tight">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Form Fields */}
                <div className="lg:col-span-2 bg-white dark:bg-brand-900/30 p-10 lg:p-12 rounded-[3.5rem] shadow-premium border border-orange-50/50 dark:border-brand-800/50 space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { label: 'Company Name', placeholder: 'Artisan Interior Design Studio', icon: <FiHome /> },
                            { label: 'GST Number', placeholder: '22AAAAA0000A1Z5', icon: <FiInfo /> },
                            { label: 'Primary Email', placeholder: 'studio@artisan.id', icon: <FiMail /> },
                            { label: 'Contact Phone', placeholder: '+91 99999 88888', icon: <FiPhone /> },
                            { label: 'Website URL', placeholder: 'www.artisaninteriors.design', icon: <FiGlobe /> },
                            { label: 'Address', placeholder: '402, Design District, Satellite Rd.', icon: <FiMapPin /> },
                        ].map((field, i) => (
                            <div key={i} className="space-y-2">
                                <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest ml-4">{field.label}</label>
                                <div className="relative">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-600">{field.icon}</div>
                                    <input
                                        type="text"
                                        placeholder={field.placeholder}
                                        className="w-full bg-orange-50/30 dark:bg-brand-800/30 border border-orange-200 dark:border-brand-700 rounded-3xl py-4 pl-12 pr-6 text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-8 pt-8 border-t border-orange-50 dark:border-brand-800">
                        <h4 className="text-lg font-black text-indigo-900 dark:text-white uppercase tracking-tight">Settlement Accounts</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { label: 'Bank Name', placeholder: 'HDFC Bank Ltd.' },
                                { label: 'Account Number', placeholder: '50100023456789' },
                                { label: 'IFSC Code', placeholder: 'HDFC0001234' },
                                { label: 'Holder Name', placeholder: 'Artisan Interior Pvt Ltd' },
                            ].map((bank, i) => (
                                <div key={i} className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest ml-4">{bank.label}</label>
                                    <input
                                        type="text"
                                        placeholder={bank.placeholder}
                                        className="w-full bg-white dark:bg-brand-800/20 border border-orange-100 dark:border-brand-800 rounded-2xl py-4 px-6 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-all shadow-inner"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntProfile;
