import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { FiArrowLeft } from 'react-icons/fi';

const OfficeStaffForm = ({ onSubmit, onBack }) => {
    const { theme } = useTheme();
    const [formData, setFormData] = useState({
        workerType: 'Staff',
        name: '',
        designation: '',
        department: '',
        employeeId: '',
        mobile: '',
        email: '',
        dateOfJoining: '',
        address: '',
        emergencyContact: '',
        aadharNumber: '',
        panNumber: '',
        bankDetails: {
            accountHolderName: '',
            accountNumber: '',
            bankName: '',
            ifscCode: '',
            branchName: ''
        },
        documents: []
    });

    const [showBankDetails, setShowBankDetails] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('bank.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                bankDetails: { ...prev.bankDetails, [field]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            type: 'Office',
            category: 'Staff',
            workerId: formData.employeeId // Ensure mapping
        };
        onSubmit(payload);
    };

    const inputClasses = "w-full px-5 py-3 border rounded-2xl focus:ring-4 outline-none transition-all font-semibold text-sm";
    const inputStyle = {
        backgroundColor: `${theme.iconBg}10`,
        borderColor: theme.cardBorder,
        color: theme.textPrimary
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <button type="button" onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <FiArrowLeft size={20} style={{ color: theme.textPrimary }} />
                </button>
                <h3 className="text-lg font-black" style={{ color: theme.textPrimary }}>Office Staff Registration</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Employee ID</label>
                    <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} className={inputClasses} style={inputStyle} placeholder="EMP-001" required />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClasses} style={inputStyle} placeholder="Jane Doe" required />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Designation</label>
                    <input type="text" name="designation" value={formData.designation} onChange={handleChange} className={inputClasses} style={inputStyle} placeholder="Project Manager" required />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Department</label>
                    <input type="text" name="department" value={formData.department} onChange={handleChange} className={inputClasses} style={inputStyle} placeholder="Management" />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Mobile Number</label>
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className={inputClasses} style={inputStyle} placeholder="+91 9876543210" required />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClasses} style={inputStyle} placeholder="jane@example.com" required />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Date of Joining</label>
                    <input type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} className={inputClasses} style={inputStyle} />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Address</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} className={inputClasses} style={inputStyle} rows="2" placeholder="Full Address" />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Emergency Contact</label>
                    <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} className={inputClasses} style={inputStyle} />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Aadhar Number</label>
                    <input type="text" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} className={inputClasses} style={inputStyle} />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>PAN Number</label>
                    <input type="text" name="panNumber" value={formData.panNumber} onChange={handleChange} className={inputClasses} style={inputStyle} />
                </div>
            </div>

            <div className="border-t pt-4" style={{ borderColor: theme.cardBorder }}>
                <button
                    type="button"
                    onClick={() => setShowBankDetails(!showBankDetails)}
                    className="flex items-center gap-2 text-sm font-bold underline"
                    style={{ color: theme.primary }}
                >
                    {showBankDetails ? '- Hide Bank Details' : '+ Add Bank Details'}
                </button>
            </div>

            {showBankDetails && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-top-2">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Account Holder Name</label>
                        <input type="text" name="bank.accountHolderName" value={formData.bankDetails.accountHolderName} onChange={handleChange} className={inputClasses} style={inputStyle} />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Account Number</label>
                        <input type="text" name="bank.accountNumber" value={formData.bankDetails.accountNumber} onChange={handleChange} className={inputClasses} style={inputStyle} />
                    </div>
                </div>
            )}

            <div className="border-t pt-4" style={{ borderColor: theme.cardBorder }}>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Upload Documents</label>
                    <div className="border-2 border-dashed rounded-2xl p-6 text-center" style={{ borderColor: theme.cardBorder }}>
                        <p className="text-xs font-bold" style={{ color: theme.textSecondary }}>Drag and drop files here, or click to upload</p>
                        <input type="file" multiple className="hidden" />
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className="w-full text-white py-3.5 px-6 rounded-2xl font-black uppercase tracking-widest shadow-premium hover:-translate-y-0.5 active:translate-y-0 transition-all mt-6"
                style={{ background: theme.gradients.button }}
            >
                Register Office Staff
            </button>
        </form>
    );
};

export default OfficeStaffForm;
