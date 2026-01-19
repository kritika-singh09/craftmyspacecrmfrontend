import React, { useState } from 'react';
import { FiSave, FiUpload, FiMapPin, FiMail, FiPhone, FiGlobe, FiClock, FiCreditCard, FiEdit3 } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

const ArchProfile = () => {
    const { theme } = useTheme();
    const [isEditing, setIsEditing] = useState(false);
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
                    <h1 className="text-4xl font-black tracking-tight" style={{ color: theme.textPrimary }}>
                        Firm <span style={{ color: theme.secondary }}>Profile</span>
                    </h1>
                    <p className="mt-2 font-medium" style={{ color: theme.textSecondary }}>
                        Manage your architectural firm's identity and professional details.
                    </p>
                </div>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 px-8 py-4 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg transition-all active:scale-95"
                    style={{ background: theme.gradients.button }}
                >
                    {isEditing ? <><FiSave className="text-lg" /> Save Changes</> : <><FiEdit3 className="text-lg" /> Edit Profile</>}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Branding & Logo */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="p-10 rounded-[3rem] shadow-premium border flex flex-col items-center text-center"
                        style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
                    >
                        <div className="relative group">
                            <div className="w-40 h-40 rounded-[2.5rem] border-4 overflow-hidden flex items-center justify-center shadow-inner"
                                style={{ backgroundColor: theme.background, borderColor: `${theme.primary}20` }}
                            >
                                <span className="text-6xl" style={{ filter: 'grayscale(100%)' }}>📐</span>
                            </div>
                            {isEditing && (
                                <button className="absolute -bottom-2 -right-2 w-12 h-12 text-white rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform"
                                    style={{ background: theme.primary }}
                                >
                                    <FiUpload />
                                </button>
                            )}
                        </div>
                        <h2 className="mt-6 text-2xl font-black" style={{ color: theme.textPrimary }}>{formData.companyName}</h2>
                        <p className="text-[10px] font-black uppercase tracking-widest mt-1" style={{ color: theme.primary }}>Professional Architect Firm</p>

                        <div className="mt-8 pt-8 border-t w-full space-y-4" style={{ borderColor: theme.cardBorder }}>
                            <div className="flex items-center gap-3 text-sm" style={{ color: theme.textSecondary }}>
                                <FiMail className="shrink-0" style={{ color: theme.primary }} />
                                <span className="truncate">{formData.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm" style={{ color: theme.textSecondary }}>
                                <FiGlobe className="shrink-0" style={{ color: theme.primary }} />
                                <span>{formData.website}</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-10 rounded-[3rem] shadow-lg text-white" style={{ background: theme.gradients.primary }}>
                        <h4 className="flex items-center gap-2 text-lg font-black tracking-tight mb-4">
                            <FiClock className="text-white/80" /> Working Hours
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
                    <div className="p-10 lg:p-12 rounded-[3.5rem] shadow-premium border"
                        style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
                    >
                        <h3 className="text-2xl font-black tracking-tight mb-10 flex items-center gap-3" style={{ color: theme.textPrimary }}>
                            <span className="w-1.5 h-8 rounded-full" style={{ backgroundColor: theme.primary }}></span> General Information
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
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-2" style={{ color: theme.textSecondary }}>{field.label}</label>
                                    <input
                                        type="text"
                                        name={field.name}
                                        value={field.value}
                                        onChange={handleChange}
                                        disabled={!isEditing || field.disabled}
                                        className={`w-full border-2 rounded-2xl px-6 py-4 text-sm font-bold outline-none transition-all ${isEditing ? 'focus:ring-4' : 'opacity-70 cursor-not-allowed'}`}
                                        style={{
                                            backgroundColor: theme.background,
                                            borderColor: theme.cardBorder,
                                            color: theme.textPrimary,
                                            boxShadow: isEditing ? `0 0 0 4px ${theme.primary}10` : 'none'
                                        }}
                                    />
                                </div>
                            ))}
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-2" style={{ color: theme.textSecondary }}>Firm Address</label>
                                <div className="relative">
                                    <FiMapPin className="absolute left-6 top-5" style={{ color: theme.primary }} />
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        rows="3"
                                        className={`w-full border-2 rounded-[2rem] px-14 py-4 text-sm font-bold outline-none transition-all resize-none ${isEditing ? 'focus:ring-4' : 'opacity-70 cursor-not-allowed'}`}
                                        style={{
                                            backgroundColor: theme.background,
                                            borderColor: theme.cardBorder,
                                            color: theme.textPrimary,
                                            boxShadow: isEditing ? `0 0 0 4px ${theme.primary}10` : 'none'
                                        }}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-10 lg:p-12 rounded-[3.5rem] shadow-premium border relative overflow-hidden"
                        style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 text-6xl" style={{ color: theme.textPrimary }}><FiCreditCard /></div>
                        <h3 className="text-2xl font-black tracking-tight mb-10 flex items-center gap-3" style={{ color: theme.textPrimary }}>
                            <span className="w-1.5 h-8 rounded-full" style={{ backgroundColor: theme.primary }}></span> Bank Details (for Billing)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                            {[
                                { label: 'Bank Name', name: 'bankName', value: formData.bankName },
                                { label: 'Account Number', name: 'accountNo', value: formData.accountNo },
                                { label: 'IFSC Code', name: 'ifscCode', value: formData.ifscCode },
                            ].map((field, i) => (
                                <div key={i} className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-2" style={{ color: theme.textSecondary }}>{field.label}</label>
                                    <input
                                        type="text"
                                        name={field.name}
                                        value={field.value}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={`w-full border-2 rounded-2xl px-6 py-4 text-sm font-bold outline-none transition-all ${isEditing ? 'focus:ring-4' : 'opacity-70 cursor-not-allowed'}`}
                                        style={{
                                            backgroundColor: theme.background,
                                            borderColor: theme.cardBorder,
                                            color: theme.textPrimary,
                                            boxShadow: isEditing ? `0 0 0 4px ${theme.primary}10` : 'none'
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

export default ArchProfile;
