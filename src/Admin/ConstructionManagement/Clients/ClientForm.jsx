import { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../hooks/useAuth';
import { FiUser, FiFileText, FiDollarSign, FiShield, FiAlertTriangle, FiCheckCircle, FiPhone, FiBox, FiCheck } from 'react-icons/fi';

const ClientForm = ({ onClose, onSuccess, initialData = null }) => {
  const { theme } = useTheme();
  const { token } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('identity');

  const [formData, setFormData] = useState({
    type: 'Company',
    name: '',
    authorizedContact: '',
    phone: '',
    email: '',
    address: { registered: '', site: '' },
    legal: { pan: '', gst: '', cin: '', billingAddress: '', kycStatus: 'Pending' },
    contract: { type: 'Item Rate', value: 0, startDate: '', endDate: '', retentionPercentage: 5, paymentTerms: '30 Days', defectLiabilityPeriod: '12 Months' },
    financial: { creditLimit: 0, openingBalance: 0, outstandingAmount: 0, advanceReceived: 0, retentionHeld: 0 },
    communication: { approvers: { clientSide: '', designAuthority: '', paymentAuthority: '' }, preferredMode: 'Email' },
    site: { inCharge: '', securityContact: '', workingHours: '9 AM - 6 PM', entryRules: '' },
    riskProfile: { paymentBehaviour: 'Good', riskTag: 'Normal', remarks: '' }
  });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...formData,
        ...initialData,
        address: { ...formData.address, ...initialData.address },
        legal: {
          ...formData.legal,
          ...initialData.legal,
          documents: { ...formData.legal.documents, ...(initialData.legal?.documents || {}) }
        },
        contract: {
          ...formData.contract,
          ...initialData.contract,
          files: { ...formData.contract.files, ...(initialData.contract?.files || {}) }
        },
        financial: { ...formData.financial, ...initialData.financial },
        communication: {
          ...formData.communication,
          ...initialData.communication,
          approvers: { ...formData.communication.approvers, ...(initialData.communication?.approvers || {}) }
        },
        site: { ...formData.site, ...initialData.site },
        riskProfile: { ...formData.riskProfile, ...initialData.riskProfile }
      });
    }
  }, [initialData]);

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
    setSubmitting(true);
    try {
      const url = initialData
        ? `${API_URL}/construction/clients/${initialData._id}`
        : `${API_URL}/construction/clients`;

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
        onClose();
      } else {
        const err = await res.json();
        alert(`Error: ${err.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit client data");
    } finally {
      setSubmitting(false);
    }
  };

  const tabs = [
    { id: 'identity', label: 'Identity', icon: <FiUser /> },
    { id: 'legal', label: 'Legal & Tax', icon: <FiShield /> },
    { id: 'contract', label: 'Contract', icon: <FiFileText /> },
    { id: 'financial', label: 'Financial', icon: <FiDollarSign /> },
    { id: 'coordination', label: 'Coordination', icon: <FiPhone /> },
    { id: 'site', label: 'Site Rules', icon: <FiBox /> },
    { id: 'risk', label: 'Risk Profile', icon: <FiAlertTriangle /> },
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

  const renderSelect = (label, value, onChange, options, width = "w-full", placeholder = "") => (
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
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]" style={{ backgroundColor: theme.cardBg }}>
      {/* Header */}
      <div className="p-6 text-white flex justify-between items-center" style={{ background: theme.gradients.primary }}>
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight">{initialData ? 'Edit Client' : 'Register New Client'}</h2>
          <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest opacity-80">Comprehensive Client Setup</p>
        </div>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-all text-white">✕</button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
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

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 p-8 overflow-y-auto">
          {activeTab === 'identity' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-lg font-black uppercase tracking-tight text-blue-500 mb-6 flex items-center gap-2"><FiUser /> Basic Identity</h3>
              <div className="grid grid-cols-2 gap-6">
                {renderSelect("Client Type", formData.type, v => handleChange(null, 'type', v), ['Individual', 'Company', 'Government', 'Trust'])}
                {renderInput("Client / Company Name", formData.name, v => handleChange(null, 'name', v), "text", "Full Legal Name", true)}
                {renderInput("Authorized Contact Person", formData.authorizedContact, v => handleChange(null, 'authorizedContact', v), "text", "Name of primary contact", true)}
                {renderInput("Phone Number", formData.phone, v => handleChange(null, 'phone', v), "tel", "+91 ...", true)}
                {renderInput("Email Address", formData.email, v => handleChange(null, 'email', v), "email", "client@domain.com", true)}
              </div>
              <div className="grid grid-cols-2 gap-6">
                {renderInput("Registered Office Address", formData.address.registered, v => handleChange('address', 'registered', v), "text", "Official Address", true)}
                {renderInput("Site Address (Optional)", formData.address.site, v => handleChange('address', 'site', v), "text", "Project Site Address")}
              </div>
            </div>
          )}

          {activeTab === 'legal' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-lg font-black uppercase tracking-tight text-blue-500 mb-6 flex items-center gap-2"><FiShield /> Legal & Compliance</h3>
              <div className="grid grid-cols-2 gap-6">
                {renderInput("PAN Number", formData.legal.pan, v => handleChange('legal', 'pan', v), "text", "ABCDE1234F")}
                {renderInput("GST Number", formData.legal.gst, v => handleChange('legal', 'gst', v), "text", "22AAAAA0000A1Z5")}
                {renderInput("CIN (Companies Only)", formData.legal.cin, v => handleChange('legal', 'cin', v), "text", "U12345MH2023PTC... ")}
                {renderSelect("KYC Status", formData.legal.kycStatus, v => handleChange('legal', 'kycStatus', v), ['Pending', 'Verified', 'Rejected'])}
                {renderInput("Billing Address (If different)", formData.legal.billingAddress, v => handleChange('legal', 'billingAddress', v))}
              </div>

              <div className="mt-6 pt-6 border-t" style={{ borderColor: theme.cardBorder }}>
                <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-50">Document Links (URLs)</h4>
                <div className="grid grid-cols-2 gap-6">
                  {renderInput("PAN Card URL", formData.legal.documents?.panCard || '', v => setFormData(prev => ({ ...prev, legal: { ...prev.legal, documents: { ...(prev.legal.documents || {}), panCard: v } } })))}
                  {renderInput("GST Certificate URL", formData.legal.documents?.gstCertificate || '', v => setFormData(prev => ({ ...prev, legal: { ...prev.legal, documents: { ...(prev.legal.documents || {}), gstCertificate: v } } })))}
                  {renderInput("Agreement URL", formData.legal.documents?.agreement || '', v => setFormData(prev => ({ ...prev, legal: { ...prev.legal, documents: { ...(prev.legal.documents || {}), agreement: v } } })))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contract' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-lg font-black uppercase tracking-tight text-blue-500 mb-6 flex items-center gap-2"><FiFileText /> Contract Details</h3>
              <div className="grid grid-cols-2 gap-6">
                {renderSelect("Contract Type", formData.contract.type, v => handleChange('contract', 'type', v), ['Fixed Cost', 'Item Rate', 'Turnkey', 'Cost + Margin'])}
                {renderInput("Contract Value (₹)", formData.contract.value, v => handleChange('contract', 'value', Number(v)), "number")}
                {renderInput("Start Date", formData.contract.startDate ? formData.contract.startDate.split('T')[0] : '', v => handleChange('contract', 'startDate', v), "date")}
                {renderInput("End Date", formData.contract.endDate ? formData.contract.endDate.split('T')[0] : '', v => handleChange('contract', 'endDate', v), "date")}
                {renderInput("Retention (%)", formData.contract.retentionPercentage, v => handleChange('contract', 'retentionPercentage', v), "number", "5")}
                {renderInput("Payment Terms", formData.contract.paymentTerms, v => handleChange('contract', 'paymentTerms', v), "text", "e.g. Net 30")}
                {renderInput("Defect Liability Period", formData.contract.defectLiabilityPeriod || '12 Months', v => handleChange('contract', 'defectLiabilityPeriod', v), "text", "e.g. 12 Months")}
              </div>

              <div className="mt-6 pt-6 border-t" style={{ borderColor: theme.cardBorder }}>
                <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-50">File References (URLs)</h4>
                <div className="grid grid-cols-2 gap-6">
                  {renderInput("Signed Agreement URL", formData.contract.files?.signedAgreement || '', v => setFormData(prev => ({ ...prev, contract: { ...prev.contract, files: { ...(prev.contract.files || {}), signedAgreement: v } } })))}
                  {renderInput("Work Order URL", formData.contract.files?.workOrder || '', v => setFormData(prev => ({ ...prev, contract: { ...prev.contract, files: { ...(prev.contract.files || {}), workOrder: v } } })))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'financial' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-lg font-black uppercase tracking-tight text-blue-500 mb-6 flex items-center gap-2"><FiDollarSign /> Financial Profile</h3>
              <div className="grid grid-cols-2 gap-6">
                {renderInput("Credit Limit (₹)", formData.financial.creditLimit, v => handleChange('financial', 'creditLimit', Number(v)), "number")}
                {renderInput("Opening Balance (₹)", formData.financial.openingBalance, v => handleChange('financial', 'openingBalance', Number(v)), "number")}
                {renderInput("Outstanding Amount (₹)", formData.financial.outstandingAmount || 0, v => handleChange('financial', 'outstandingAmount', Number(v)), "number")}
                {renderInput("Advance Received (₹)", formData.financial.advanceReceived || 0, v => handleChange('financial', 'advanceReceived', Number(v)), "number")}
                {renderInput("Retention Held (₹)", formData.financial.retentionHeld || 0, v => handleChange('financial', 'retentionHeld', Number(v)), "number")}
              </div>
            </div>
          )}

          {activeTab === 'coordination' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-lg font-black uppercase tracking-tight text-blue-500 mb-6 flex items-center gap-2"><FiPhone /> Communication & Approval</h3>
              <div className="grid grid-cols-2 gap-6">
                {renderInput("Client-side Approver", formData.communication.approvers.clientSide, v => setFormData(prev => ({ ...prev, communication: { ...prev.communication, approvers: { ...prev.communication.approvers, clientSide: v } } })))}
                {renderInput("Design Approval Authority", formData.communication.approvers.designAuthority, v => setFormData(prev => ({ ...prev, communication: { ...prev.communication, approvers: { ...prev.communication.approvers, designAuthority: v } } })))}
                {renderInput("Payment Approx Authority", formData.communication.approvers.paymentAuthority, v => setFormData(prev => ({ ...prev, communication: { ...prev.communication, approvers: { ...prev.communication.approvers, paymentAuthority: v } } })))}
                {renderSelect("Preferred Mode", formData.communication.preferredMode, v => handleChange('communication', 'preferredMode', v), ['Email', 'WhatsApp', 'Portal'], "w-full", "Select Mode")}
              </div>
            </div>
          )}

          {activeTab === 'site' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-lg font-black uppercase tracking-tight text-blue-500 mb-6 flex items-center gap-2"><FiBox /> Site Coordination</h3>
              <div className="grid grid-cols-2 gap-6">
                {renderInput("Site In-Charge", formData.site.inCharge, v => handleChange('site', 'inCharge', v))}
                {renderInput("Security Contact", formData.site.securityContact, v => handleChange('site', 'securityContact', v))}
                {renderInput("Working Hours", formData.site.workingHours, v => handleChange('site', 'workingHours', v))}
                {renderInput("Entry/Safety Rules", formData.site.entryRules, v => handleChange('site', 'entryRules', v), "text", "Special instructions...")}
              </div>
            </div>
          )}

          {activeTab === 'risk' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-lg font-black uppercase tracking-tight text-blue-500 mb-6 flex items-center gap-2"><FiAlertTriangle /> Risk & Behaviour</h3>
              <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30">
                <div className="grid grid-cols-2 gap-6">
                  {renderSelect("Payment Behaviour", formData.riskProfile.paymentBehaviour, v => handleChange('riskProfile', 'paymentBehaviour', v), ['Good', 'Average', 'Delayed'])}
                  {renderSelect("Risk Tag", formData.riskProfile.riskTag, v => handleChange('riskProfile', 'riskTag', v), ['Normal', 'High Risk', 'VIP'])}
                  {renderInput("Legal History", formData.riskProfile.legalHistory || '', v => handleChange('riskProfile', 'legalHistory', v))}
                </div>
                <div className="mt-4">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-1 block mb-1.5 opacity-60" style={{ color: theme.textSecondary }}>Internal Remarks (Private)</label>
                  <textarea
                    value={formData.riskProfile.remarks}
                    onChange={e => handleChange('riskProfile', 'remarks', e.target.value)}
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border font-bold text-xs outline-none transition-all focus:ring-2 focus:ring-blue-500/20"
                    style={{
                      backgroundColor: theme.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)',
                      borderColor: theme.cardBorder,
                      color: theme.textPrimary
                    }}
                    placeholder="Confidential notes about client behavior..."
                  ></textarea>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Footer */}
      <div className="p-6 border-t flex justify-end gap-4" style={{ borderColor: theme.cardBorder, backgroundColor: theme.cardBg }}>
        <button
          onClick={onClose}
          className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
          style={{ color: theme.textSecondary }}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:translate-y-0"
          style={{ background: theme.gradients.button }}
        >
          {submitting ? 'Saving...' : initialData ? 'Update Client' : 'Create Client'}
        </button>
      </div>
    </div>
  );
};

export default ClientForm;
