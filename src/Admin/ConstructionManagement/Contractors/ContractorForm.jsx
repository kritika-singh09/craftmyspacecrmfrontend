import { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../hooks/useAuth';
import { FiUser, FiShield, FiTool, FiDollarSign, FiAlertTriangle, FiCheckCircle, FiPhone } from 'react-icons/fi';

const ContractorForm = ({ onClose, onSuccess, initialData = null }) => {
    const { theme } = useTheme();
    const { token } = useAuth();
    const [submitting, setSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState('basic');

    const [formData, setFormData] = useState({
        type: 'Labour Contractor',
        specialization: 'General',
        name: '',
        contactPerson: '',
        phone: '',
        email: '',
        address: '',
        legal: {
            pan: '', gst: '', licenseNumber: '', kycStatus: 'Pending',
            bankDetails: { accountNumber: '', ifsc: '', bankName: '' }
        },
        skills: { level: 'Basic', experienceYears: 0, standardRates: '', status: 'Active' },
        compliance: { safetyTraining: false, ppeCompliant: false, rating: 5, qualityIssues: 0, penaltyApplied: 0 }
    });

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...formData,
                ...initialData,
                legal: { ...formData.legal, ...initialData.legal, bankDetails: { ...formData.legal.bankDetails, ...initialData.legal?.bankDetails } },
                skills: { ...formData.skills, ...initialData.skills },
                compliance: { ...formData.compliance, ...initialData.compliance }
            });
        }
    }, [initialData]);

    const handleChange = (section, field, value) => {
        if (section) {
            if (section === 'bankDetails') {
                setFormData(prev => ({
                    ...prev,
                    legal: { ...prev.legal, bankDetails: { ...prev.legal.bankDetails, [field]: value } }
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    [section]: { ...prev[section], [field]: value }
                }));
            }
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const url = initialData
                ? `${API_URL}/construction/contractors/${initialData._id}`
                : `${API_URL}/construction/contractors`;

            const method = initialData ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                onSuccess(await res.json());
            } else {
                const err = await res.json();
                alert(`Error: ${err.message}`);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to submit contractor data");
        } finally {
            setSubmitting(false);
        }
    };

    const tabs = [
        { id: 'basic', label: 'Basic Details', icon: <FiUser /> },
        { id: 'legal', label: 'Legal & Bank', icon: <FiShield /> },
        { id: 'skills', label: 'Skills & Scope', icon: <FiTool /> },
        { id: 'compliance', label: 'Compliance', icon: <FiCheckCircle /> },
    ];

    const renderInput = (label, value, onChange, type = "text", placeholder = "", required = false, width = "w-full") => (
        <div className={width}>
            <label className="text-[10px] font-black uppercase tracking-widest ml-1 block mb-1.5 opacity-60" style={{ color: theme.textSecondary }}>
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-3 rounded-xl border font-bold text-xs outline-none transition-all focus:ring-2 focus:ring-blue-500/20"
                style={{
                    backgroundColor: theme.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)',
                    borderColor: theme.cardBorder,
                    color: theme.textPrimary
                }}
                required={required}
            />
        </div>
    );

    const renderSelect = (label, value, onChange, options, width = "w-full") => (
        <div className={width}>
            <label className="text-[10px] font-black uppercase tracking-widest ml-1 block mb-1.5 opacity-60" style={{ color: theme.textSecondary }}>{label}</label>
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border font-bold text-xs outline-none transition-all"
                style={{
                    backgroundColor: theme.mode === 'dark' ? '#1e293b' : '#f8fafc',
                    borderColor: theme.cardBorder,
                    color: theme.textPrimary
                }}
            >
                {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        </div>
    );

    return (
        <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]" style={{ backgroundColor: theme.cardBg }}>
            <div className="p-6 text-white flex justify-between items-center" style={{ background: theme.gradients.primary }}>
                <div>
                    <h2 className="text-xl font-black uppercase tracking-tight">{initialData ? 'Edit Contractor' : 'Register New Contractor'}</h2>
                    <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest opacity-80">Partner Onboarding</p>
                </div>
                <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-all text-white">✕</button>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <div className="w-64 border-r p-4 space-y-2 overflow-y-auto" style={{ borderColor: theme.cardBorder, backgroundColor: `${theme.cardBg}50` }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === tab.id ? 'text-white shadow-md' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                            style={activeTab === tab.id ? { background: theme.gradients.button } : { color: theme.textSecondary }}
                        >
                            <span className="text-lg">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="flex-1 p-8 overflow-y-auto">
                    {activeTab === 'basic' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h3 className="text-lg font-black uppercase tracking-tight text-blue-500 mb-6 flex items-center gap-2"><FiUser /> Basic Identity</h3>
                            <div className="grid grid-cols-2 gap-6">
                                {renderSelect("Contractor Type", formData.type, v => handleChange(null, 'type', v), ['Labour Contractor', 'Subcontractor', 'Specialist'])}
                                {renderInput("Firm / Contractor Name", formData.name, v => handleChange(null, 'name', v), "text", "Name", true)}
                                {renderInput("Contact Person", formData.contactPerson, v => handleChange(null, 'contactPerson', v), "text", "Primary Contact", true)}
                                {renderInput("Phone", formData.phone, v => handleChange(null, 'phone', v), "tel", "+91 ...", true)}
                                {renderInput("Email", formData.email, v => handleChange(null, 'email', v), "email")}
                            </div>
                            {renderInput("Registered Account", formData.address, v => handleChange(null, 'address', v), "text", "Full Address", true)}
                        </div>
                    )}

                    {activeTab === 'legal' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h3 className="text-lg font-black uppercase tracking-tight text-blue-500 mb-6 flex items-center gap-2"><FiShield /> Legal & Banking</h3>
                            <div className="grid grid-cols-2 gap-6">
                                {renderInput("PAN Number", formData.legal.pan, v => handleChange('legal', 'pan', v), "text", "ABCDE1234F")}
                                {renderInput("GST Number", formData.legal.gst, v => handleChange('legal', 'gst', v), "text", "22AAAAA0000A1Z5")}
                                {renderInput("Labour License No.", formData.legal.licenseNumber, v => handleChange('legal', 'licenseNumber', v))}
                                {renderSelect("KYC Status", formData.legal.kycStatus, v => handleChange('legal', 'kycStatus', v), ['Pending', 'Verified', 'Rejected'])}
                            </div>
                            <h4 className="text-sm font-bold uppercase mt-4 mb-2 opacity-70" style={{ color: theme.textPrimary }}>Bank Details (For Payments)</h4>
                            <div className="grid grid-cols-2 gap-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                {renderInput("Bank Name", formData.legal.bankDetails.bankName, v => handleChange('bankDetails', 'bankName', v))}
                                {renderInput("Account Number", formData.legal.bankDetails.accountNumber, v => handleChange('bankDetails', 'accountNumber', v))}
                                {renderInput("IFSC Code", formData.legal.bankDetails.ifsc, v => handleChange('bankDetails', 'ifsc', v))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'skills' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h3 className="text-lg font-black uppercase tracking-tight text-blue-500 mb-6 flex items-center gap-2"><FiTool /> Skills & Expertise</h3>
                            <div className="grid grid-cols-2 gap-6">
                                {renderSelect("Core Specialization", formData.specialization, v => handleChange(null, 'specialization', v), ['General', 'RCC', 'Brickwork', 'Electrical', 'Plumbing', 'HVAC', 'Painting', 'Interior Finishing'])}
                                {renderSelect("Skill Level", formData.skills.level, v => handleChange('skills', 'level', v), ['Basic', 'Intermediate', 'Expert'])}
                                {renderInput("Years of Experience", formData.skills.experienceYears, v => handleChange('skills', 'experienceYears', v), "number")}
                                {renderSelect("Work Status", formData.skills.status, v => handleChange('skills', 'status', v), ['Active', 'In-Review', 'Suspended', 'Blacklisted'])}
                            </div>
                            {renderInput("Standard Rates (Internal Ref)", formData.skills.standardRates, v => handleChange('skills', 'standardRates', v), "text", "e.g. Brickwork: 25/sqft")}
                        </div>
                    )}

                    {activeTab === 'compliance' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h3 className="text-lg font-black uppercase tracking-tight text-blue-500 mb-6 flex items-center gap-2"><FiCheckCircle /> Compliance</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <label className="flex items-center gap-3 p-4 rounded-xl border cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50" style={{ borderColor: theme.cardBorder, color: theme.textPrimary }}>
                                    <input
                                        type="checkbox"
                                        checked={formData.compliance.safetyTraining}
                                        onChange={e => handleChange('compliance', 'safetyTraining', e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="font-bold text-sm">Safety Training Completed</span>
                                </label>
                                <label className="flex items-center gap-3 p-4 rounded-xl border cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50" style={{ borderColor: theme.cardBorder, color: theme.textPrimary }}>
                                    <input
                                        type="checkbox"
                                        checked={formData.compliance.ppeCompliant}
                                        onChange={e => handleChange('compliance', 'ppeCompliant', e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="font-bold text-sm">PPE Compliant</span>
                                </label>
                            </div>
                            <div className="grid grid-cols-3 gap-6 pt-6 border-t" style={{ borderColor: theme.cardBorder }}>
                                {renderInput("Initial Rating (1-5)", formData.compliance.rating, v => handleChange('compliance', 'rating', Number(v)), "number")}
                                {renderInput("Quality Issues Count", formData.compliance.qualityIssues, v => handleChange('compliance', 'qualityIssues', Number(v)), "number")}
                                {renderInput("Penalties Applied", formData.compliance.penaltyApplied, v => handleChange('compliance', 'penaltyApplied', Number(v)), "number")}
                            </div>
                        </div>
                    )}
                </form>
            </div>

            <div className="p-6 border-t flex justify-end gap-4" style={{ borderColor: theme.cardBorder, backgroundColor: theme.cardBg }}>
                <button onClick={onClose} className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all hover:bg-slate-100 dark:hover:bg-slate-800" style={{ color: theme.textSecondary }}>Cancel</button>
                <button onClick={handleSubmit} disabled={submitting} className="px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl disabled:opacity-50" style={{ background: theme.gradients.button }}>
                    {submitting ? 'Saving...' : initialData ? 'Update Contractor' : 'Register Contractor'}
                </button>
            </div>
        </div>
    );
};

export default ContractorForm;
