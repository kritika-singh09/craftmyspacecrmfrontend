import React, { useState } from 'react';
import { FiHome, FiMail, FiPhone, FiMapPin, FiGlobe, FiCreditCard, FiUpload, FiShoppingBag, FiInfo } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

const IntProfile = () => {
    const { theme } = useTheme();

    // Form State
    const [formData, setFormData] = useState({
        companyName: 'Artisan Interior Design Studio',
        gstNumber: '22AAAAA0000A1Z5',
        email: 'studio@artisan.id',
        phone: '+91 99999 88888',
        website: 'www.artisaninteriors.design',
        address: '402, Design District, Satellite Rd.',
        bankName: 'HDFC Bank Ltd.',
        accountNumber: '50100023456789',
        ifsc: 'HDFC0001234',
        holderName: 'Artisan Interior Pvt Ltd',
        procurementType: 'Full Turnkey'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        // In a real app, this would make an API call
        console.log('Saving Interior Profile:', formData);
        alert('Profile Settings Saved Successfully!');
    };

    return (
        <div className="space-y-10 pb-12 animate-in slide-in-from-bottom-8 duration-700">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight uppercase" style={{ color: theme.textPrimary }}>
                        Studio <span style={{ color: theme.secondary }}>Identity</span>
                    </h1>
                    <p className="mt-2 font-bold tracking-wide opacity-80" style={{ color: theme.textSecondary }}>
                        Manage your interior design firm's branding, financials, and vendor preferences.
                    </p>
                </div>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-3 px-8 py-4 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all"
                    style={{ background: theme.gradients.button }}
                >
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Branding & Logo */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="p-10 rounded-[3.5rem] shadow-premium border flex flex-col items-center text-center"
                        style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
                    >
                        <div className="w-40 h-40 rounded-[3rem] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer group transition-all hover:scale-105"
                            style={{
                                backgroundColor: `${theme.primary}10`,
                                borderColor: `${theme.primary}40`,
                                color: theme.primary
                            }}
                        >
                            <FiUpload className="text-3xl mb-2" />
                            <p className="text-[10px] font-black uppercase tracking-widest">Upload Logo</p>
                        </div>
                        <h3 className="mt-8 text-2xl font-black uppercase tracking-tight underline decoration-4"
                            style={{ color: theme.textPrimary, textDecorationColor: theme.secondary }}
                        >
                            {formData.companyName}
                        </h3>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] mt-2" style={{ color: theme.secondary }}>
                            Boutique Design Studio
                        </p>
                    </div>

                    <div className="p-8 rounded-[3rem] shadow-premium border"
                        style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
                    >
                        <h4 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-3" style={{ color: theme.textPrimary }}>
                            <FiShoppingBag style={{ color: theme.secondary }} /> Procurement Type
                        </h4>
                        <div className="space-y-4">
                            {['Full Turnkey', 'Design Consultancy', 'PMC Basis'].map(type => (
                                <label key={type} className="flex items-center gap-3 p-4 rounded-2xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border border-transparent"
                                    style={{ backgroundColor: `${theme.primary}05` }}
                                >
                                    <input
                                        type="radio"
                                        name="procurementType"
                                        value={type}
                                        checked={formData.procurementType === type}
                                        onChange={handleChange}
                                        className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500"
                                    />
                                    <span className="text-xs font-bold uppercase tracking-tight" style={{ color: theme.textPrimary }}>{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Form Fields */}
                <div className="lg:col-span-2 p-10 lg:p-12 rounded-[3.5rem] shadow-premium border space-y-12"
                    style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { name: 'companyName', label: 'Company Name', icon: <FiHome /> },
                            { name: 'gstNumber', label: 'GST Number', icon: <FiInfo /> },
                            { name: 'email', label: 'Primary Email', icon: <FiMail /> },
                            { name: 'phone', label: 'Contact Phone', icon: <FiPhone /> },
                            { name: 'website', label: 'Website URL', icon: <FiGlobe /> },
                            { name: 'address', label: 'Address', icon: <FiMapPin /> },
                        ].map((field, i) => (
                            <div key={i} className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest ml-4" style={{ color: theme.textSecondary }}>{field.label}</label>
                                <div className="relative">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2" style={{ color: theme.secondary }}>{field.icon}</div>
                                    <input
                                        type="text"
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        className="w-full border rounded-3xl py-4 pl-12 pr-6 text-sm font-bold placeholder:opacity-40 focus:outline-none focus:ring-2 transition-all"
                                        style={{
                                            backgroundColor: `${theme.primary}05`,
                                            borderColor: `${theme.primary}20`,
                                            color: theme.textPrimary
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-8 pt-8 border-t" style={{ borderColor: theme.cardBorder }}>
                        <h4 className="text-lg font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>Settlement Accounts</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { name: 'bankName', label: 'Bank Name' },
                                { name: 'accountNumber', label: 'Account Number' },
                                { name: 'ifsc', label: 'IFSC Code' },
                                { name: 'holderName', label: 'Holder Name' },
                            ].map((bank, i) => (
                                <div key={i} className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest ml-4" style={{ color: theme.textSecondary }}>{bank.label}</label>
                                    <input
                                        type="text"
                                        name={bank.name}
                                        value={formData[bank.name]}
                                        onChange={handleChange}
                                        className="w-full border rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none transition-all shadow-inner"
                                        style={{
                                            backgroundColor: '#fff',
                                            borderColor: `${theme.primary}20`,
                                            color: theme.textPrimary
                                        }}
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
