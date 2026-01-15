import React, { useState } from 'react';
import { FiSave, FiUpload, FiMapPin, FiMail, FiPhone, FiGlobe, FiClock, FiCreditCard } from 'react-icons/fi';

const ArchProfile = () => {
    const [formData, setFormData] = useState({
        companyName: 'Studio Arch-Design',
        companyType: 'ARCHITECT_DESIGN_COMPANY',
        regNo: 'ARCH/REG/2024/056',
        gstNo: '07AAAAA0000A1Z5',
        email: 'hello@archdesign.com',
        phone: '+91 98765 43210',
        website: 'www.archdesign.com',
        address: 'Suite 405, Creative Plaza, MG Road, Bangalore - 560001',
        bankName: 'National Bank of Architecture',
        accountNo: '344556677889',
        ifscCode: 'NBAI0005432',
        workingHours: '09:00 AM - 07:00 PM (Mon-Sat)'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-6xl mx-auto space-y-10 pb-12 animate-in slide-in-from-bottom-8 duration-700">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Firm <span className="text-brand-600">Profile</span></h1>
                    <p className="text-gray-500 dark:text-brand-300 mt-2 font-medium">Manage your architectural firm's identity and professional details.</p>
                </div>
                <button className="flex items-center gap-2 px-8 py-4 bg-brand-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:bg-brand-700 transition-all active:scale-95">
                    <FiSave className="text-lg" /> Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Branding & Logo */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-white dark:bg-brand-900/30 p-10 rounded-[3rem] shadow-premium border border-brand-50/50 dark:border-brand-800/50 flex flex-col items-center text-center">
                        <div className="relative group">
                            <div className="w-40 h-40 rounded-[2.5rem] bg-brand-50 dark:bg-brand-900 border-4 border-brand-100 dark:border-brand-800 overflow-hidden flex items-center justify-center shadow-inner">
                                <span className="text-6xl text-brand-200">📐</span>
                            </div>
                            <button className="absolute -bottom-2 -right-2 w-12 h-12 bg-brand-600 text-white rounded-2xl flex items-center justify-center shadow-brand transform hover:scale-110 transition-transform">
                                <FiUpload />
                            </button>
                        </div>
                        <h2 className="mt-6 text-2xl font-black text-gray-900 dark:text-white">{formData.companyName}</h2>
                        <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest mt-1">Professional Architect Firm</p>

                        <div className="mt-8 pt-8 border-t border-brand-50 dark:border-brand-800 w-full space-y-4">
                            <div className="flex items-center gap-3 text-gray-500 dark:text-brand-300 text-sm">
                                <FiMail className="shrink-0 text-brand-600" />
                                <span className="truncate">{formData.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-500 dark:text-brand-300 text-sm">
                                <FiGlobe className="shrink-0 text-brand-600" />
                                <span>{formData.website}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-600 to-brand-700 p-10 rounded-[3rem] shadow-brand text-white">
                        <h4 className="flex items-center gap-2 text-lg font-black tracking-tight mb-4">
                            <FiClock className="text-brand-200" /> Working Hours
                        </h4>
                        <p className="text-sm font-medium opacity-90">{formData.workingHours}</p>
                        <div className="mt-8 pt-6 border-t border-white/10">
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Status</p>
                            <p className="text-sm font-bold mt-1 text-emerald-300 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                Currently Open
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Details Form */}
                <div className="lg:col-span-2 space-y-10">
                    <div className="bg-white dark:bg-brand-900/30 p-10 lg:p-12 rounded-[3.5rem] shadow-premium border border-brand-50/50 dark:border-brand-800/50">
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-10 flex items-center gap-3">
                            <span className="w-1.5 h-8 bg-brand-600 rounded-full"></span> General Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                            {[
                                { label: 'Company Name', name: 'companyName', value: formData.companyName },
                                { label: 'Firm Type', name: 'companyType', value: formData.companyType, disabled: true },
                                { label: 'Registration No', name: 'regNo', value: formData.regNo },
                                { label: 'GST Number', name: 'gstNo', value: formData.gstNo },
                                { label: 'Phone Number', name: 'phone', value: formData.phone },
                                { label: 'Official Website', name: 'website', value: formData.website },
                            ].map((field, i) => (
                                <div key={i} className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 dark:text-brand-400 uppercase tracking-[0.2em] ml-2">{field.label}</label>
                                    <input
                                        type="text"
                                        name={field.name}
                                        value={field.value}
                                        onChange={handleChange}
                                        disabled={field.disabled}
                                        className="w-full bg-brand-50/30 dark:bg-brand-800/30 border-2 border-brand-50 dark:border-brand-800/50 rounded-2xl px-6 py-4 text-sm font-bold text-gray-800 dark:text-white focus:border-brand-600/50 focus:ring-4 focus:ring-brand-500/5 outline-none transition-all"
                                    />
                                </div>
                            ))}
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black text-gray-400 dark:text-brand-400 uppercase tracking-[0.2em] ml-2">Firm Address</label>
                                <div className="relative">
                                    <FiMapPin className="absolute left-6 top-5 text-brand-600" />
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full bg-brand-50/30 dark:bg-brand-800/30 border-2 border-brand-50 dark:border-brand-800/50 rounded-[2rem] px-14 py-4 text-sm font-bold text-gray-800 dark:text-white focus:border-brand-600/50 outline-none transition-all resize-none"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-brand-900/40 p-10 lg:p-12 rounded-[3.5rem] shadow-premium border border-brand-50/50 dark:border-brand-800/50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 text-6xl"><FiCreditCard /></div>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-10 flex items-center gap-3">
                            <span className="w-1.5 h-8 bg-brand-600 rounded-full"></span> Bank Details (for Billing)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                            {[
                                { label: 'Bank Name', name: 'bankName', value: formData.bankName },
                                { label: 'Account Number', name: 'accountNo', value: formData.accountNo },
                                { label: 'IFSC Code', name: 'ifscCode', value: formData.ifscCode },
                            ].map((field, i) => (
                                <div key={i} className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 dark:text-brand-400 uppercase tracking-[0.2em] ml-2">{field.label}</label>
                                    <input
                                        type="text"
                                        name={field.name}
                                        value={field.value}
                                        onChange={handleChange}
                                        className="w-full bg-brand-50/30 dark:bg-brand-800/30 border-2 border-brand-50 dark:border-brand-800/50 rounded-2xl px-6 py-4 text-sm font-bold text-gray-800 dark:text-white focus:border-brand-600/50 focus:ring-4 focus:ring-brand-500/5 outline-none transition-all"
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

export default ArchProfile;
