import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../hooks/useAuth';
import { FiUser, FiBriefcase, FiCreditCard, FiCheckCircle, FiTool, FiCheckSquare } from 'react-icons/fi';

const VendorForm = ({ onClose, onSuccess, initialData = null }) => {
    const { theme } = useTheme();
    const { token } = useAuth();
    const [submitting, setSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState('basic');

    const [formData, setFormData] = useState({
        name: '',
        category: 'MATERIAL',
        contactPerson: { name: '', phone: '', email: '' },
        domains: [], // ['CONSTRUCTION', 'INTERIOR']
        specializations: [], // ['Cement', 'Furniture']
        gstNumber: '',
        panNumber: '',
        bankDetails: { accountNumber: '', ifscCode: '', bankName: '', branch: '' },
        operatingRegions: [],
        creditLimit: 0
    });

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    const domainsList = [
        { id: 'CONSTRUCTION', label: 'Construction', desc: 'Civil, Structure, Raw Material' },
        { id: 'ARCHITECTURE', label: 'Architecture', desc: 'Design, Consulting, Testing' },
        { id: 'INTERIOR', label: 'Interior Design', desc: 'Furniture, Lighting, Decor' }
    ];

    const commonSpecializations = {
        'CONSTRUCTION': ['Cement', 'Steel', 'Sand', 'Bricks', 'RMC', 'Aggregates'],
        'ARCHITECTURE': ['Structural Consultant', 'Soil Testing', 'Surveyor', 'MEP Consultant'],
        'INTERIOR': ['Furniture', 'Lighting', 'False Ceiling', 'Flooring', 'Wallpapers', 'Paint']
    };

    const toggleDomain = (domain) => {
        setFormData(prev => {
            const newDomains = prev.domains.includes(domain)
                ? prev.domains.filter(d => d !== domain)
                : [...prev.domains, domain];
            return { ...prev, domains: newDomains };
        });
    };

    const toggleSpec = (spec) => {
        setFormData(prev => {
            const newSpecs = prev.specializations.includes(spec)
                ? prev.specializations.filter(s => s !== spec)
                : [...prev.specializations, spec];
            return { ...prev, specializations: newSpecs };
        });
    };

    const handleChange = (section, field, value) => {
        if (section) {
            setFormData(prev => ({
                ...prev,
                [section]: { ...prev[section], [field]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.domains.length === 0) {
            alert("Please select at least one domain (Construction/Architecture/Interior)");
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch(`${API_URL}/vendors`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                onSuccess();
            } else {
                const err = await res.json();
                alert(`Error: ${err.message}`);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to save vendor");
        } finally {
            setSubmitting(false);
        }
    };

    const renderInput = (label, value, onChange, placeholder = "") => (
        <div className="w-full">
            <label className="text-[10px] font-black uppercase tracking-widest ml-1 block mb-1.5 opacity-60" style={{ color: theme.textSecondary }}>{label}</label>
            <input
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-3 rounded-xl border font-bold text-xs outline-none transition-all focus:ring-2 focus:ring-blue-500/20"
                style={{ backgroundColor: theme.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)', borderColor: theme.cardBorder, color: theme.textPrimary }}
            />
        </div>
    );

    const tabs = [
        { id: 'basic', label: 'Identity', icon: <FiUser /> },
        { id: 'domains', label: 'Domain & Scope', icon: <FiBriefcase /> },
        { id: 'legal', label: 'Legal & Bank', icon: <FiCreditCard /> },
    ];

    return (
        <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]" style={{ backgroundColor: theme.cardBg }}>
            <div className="p-6 text-white flex justify-between items-center" style={{ background: theme.gradients.primary }}>
                <div>
                    <h2 className="text-xl font-black uppercase tracking-tight">Onboard Vendor</h2>
                    <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest opacity-80">Universal Vendor Master</p>
                </div>
                <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-all text-white">✕</button>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <div className="w-64 border-r p-4 space-y-2" style={{ borderColor: theme.cardBorder, backgroundColor: `${theme.cardBg}50` }}>
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

                <div className="flex-1 p-8 overflow-y-auto">
                    {activeTab === 'basic' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-2 gap-6">
                                {renderInput("Vendor / Firm Name", formData.name, v => handleChange(null, 'name', v), "Company Name")}
                                <div className="w-full">
                                    <label className="text-[10px] font-black uppercase tracking-widest ml-1 block mb-1.5 opacity-60" style={{ color: theme.textSecondary }}>Type</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => handleChange(null, 'category', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border font-bold text-xs outline-none"
                                        style={{ backgroundColor: theme.mode === 'dark' ? '#1e293b' : '#f8fafc', borderColor: theme.cardBorder, color: theme.textPrimary }}
                                    >
                                        <option value="MATERIAL">Material Supplier</option>
                                        <option value="SERVICE">Service Provider</option>
                                        <option value="EQUIPMENT">Equipment Supplier</option>
                                        <option value="SUBCONTRACTOR">Subcontractor</option>
                                    </select>
                                </div>
                            </div>

                            <h4 className="flex items-center gap-2 text-sm font-bold text-blue-500 mt-4"><FiUser /> Contact Person</h4>
                            <div className="grid grid-cols-3 gap-4">
                                {renderInput("Name", formData.contactPerson.name, v => handleChange('contactPerson', 'name', v))}
                                {renderInput("Phone", formData.contactPerson.phone, v => handleChange('contactPerson', 'phone', v))}
                                {renderInput("Email", formData.contactPerson.email, v => handleChange('contactPerson', 'email', v))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'domains' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-widest mb-4" style={{ color: theme.textPrimary }}>1. Select Business Domains</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {domainsList.map(item => {
                                        const isSelected = formData.domains.includes(item.id);
                                        return (
                                            <div
                                                key={item.id}
                                                onClick={() => toggleDomain(item.id)}
                                                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${isSelected ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-dashed hover:border-blue-300'}`}
                                                style={{ borderColor: isSelected ? '' : theme.cardBorder }}
                                            >
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${isSelected ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-300'}`}>
                                                        {isSelected && <FiCheckSquare size={14} />}
                                                    </div>
                                                    <span className={`font-bold text-xs ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'}`}>{item.label}</span>
                                                </div>
                                                <p className="text-[10px] opacity-60 leading-tight pl-7">{item.desc}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {formData.domains.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-widest mb-4" style={{ color: theme.textPrimary }}>2. Select Specializations</h3>
                                    <div className="space-y-4">
                                        {formData.domains.map(domain => (
                                            <div key={domain} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                                <h4 className="text-[10px] font-black uppercase tracking-wider mb-3 text-slate-500">{domainsList.find(d => d.id === domain)?.label} Items</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {commonSpecializations[domain].map(spec => (
                                                        <button
                                                            key={spec}
                                                            onClick={() => toggleSpec(spec)}
                                                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${formData.specializations.includes(spec) ? 'bg-blue-500 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-500 border'}`}
                                                        >
                                                            {spec}
                                                        </button>
                                                    ))}
                                                    <button className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase border border-dashed border-slate-300 text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-colors">+ Add Custom</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'legal' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h3 className="text-sm font-black uppercase tracking-widest mb-4 text-blue-500"><FiCheckCircle className="inline mr-2" /> Compliance Details</h3>
                            <div className="grid grid-cols-2 gap-6">
                                {renderInput("GST Number", formData.gstNumber, v => handleChange(null, 'gstNumber', v))}
                                {renderInput("PAN Number", formData.panNumber, v => handleChange(null, 'panNumber', v))}
                            </div>

                            <h3 className="text-sm font-black uppercase tracking-widest mb-4 mt-6 text-blue-500"><FiCreditCard className="inline mr-2" /> Banking Information</h3>
                            <div className="grid grid-cols-2 gap-6">
                                {renderInput("Bank Name", formData.bankDetails.bankName, v => handleChange('bankDetails', 'bankName', v))}
                                {renderInput("Branch", formData.bankDetails.branch, v => handleChange('bankDetails', 'branch', v))}
                                {renderInput("Account Number", formData.bankDetails.accountNumber, v => handleChange('bankDetails', 'accountNumber', v))}
                                {renderInput("IFSC Code", formData.bankDetails.ifscCode, v => handleChange('bankDetails', 'ifscCode', v))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-6 border-t flex justify-end gap-4" style={{ borderColor: theme.cardBorder, backgroundColor: theme.cardBg }}>
                <button onClick={onClose} className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all hover:bg-slate-100 dark:hover:bg-slate-800" style={{ color: theme.textSecondary }}>Cancel</button>
                <button onClick={handleSubmit} disabled={submitting} className="px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl disabled:opacity-50" style={{ background: theme.gradients.button }}>
                    {submitting ? 'Saving...' : 'Register Vendor'}
                </button>
            </div>
        </div>
    );
};

export default VendorForm;
