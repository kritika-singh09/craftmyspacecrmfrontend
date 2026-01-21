import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { FiArrowLeft, FiUploadCloud, FiFileText } from 'react-icons/fi';

const OfficeStaffForm = ({ onSubmit, onBack, editData }) => {
    const { theme } = useTheme();
    const [formData, setFormData] = useState({
        workerType: editData?.category || 'Staff',
        name: editData?.personalDetails?.name || '',
        designation: editData?.officeDetails?.designation || '',
        department: editData?.officeDetails?.department || '',
        employeeId: editData?.workerId || '',
        mobile: editData?.personalDetails?.mobile || '',
        email: editData?.personalDetails?.email || '',
        dateOfJoining: editData?.personalDetails?.dateOfJoining ? new Date(editData.personalDetails.dateOfJoining).toISOString().split('T')[0] : '',
        address: editData?.personalDetails?.address || '',
        emergencyContact: editData?.officeDetails?.emergencyContact || '',
        aadharNumber: editData?.personalDetails?.aadharNumber || '',
        panNumber: editData?.personalDetails?.panNumber || '',
        salary: editData?.dailyWage || '',
        bankDetails: {
            accountHolderName: editData?.bankDetails?.accountHolderName || '',
            accountNumber: editData?.bankDetails?.accountNumber || '',
            bankName: editData?.bankDetails?.bankName || '',
            ifscCode: editData?.bankDetails?.ifscCode || '',
            branchName: editData?.bankDetails?.branchName || ''
        },
        documents: editData?.documents || []
    });

    const [showBankDetails, setShowBankDetails] = useState(!!editData?.bankDetails?.accountNumber);
    const fileInputRef = useRef(null);

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

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newDocs = files.map(file => ({
            name: file.name,
            url: URL.createObjectURL(file), // Mock URL
            uploadedAt: new Date()
        }));
        setFormData(prev => ({
            ...prev,
            documents: [...prev.documents, ...newDocs]
        }));
    };

    const removeDoc = (index) => {
        setFormData(prev => ({
            ...prev,
            documents: prev.documents.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Sanitize payload: If ID is empty, dont send it (let backend generate)
        let finalId = formData.employeeId;
        if (!finalId || finalId.trim() === '') {
            finalId = undefined;
        }

        const payload = {
            workerId: finalId,
            type: 'Office',
            category: 'Staff',
            personalDetails: {
                name: formData.name,
                mobile: formData.mobile,
                email: formData.email,
                dateOfJoining: formData.dateOfJoining,
                address: formData.address,
                aadharNumber: formData.aadharNumber,
                panNumber: formData.panNumber
            },
            officeDetails: {
                designation: formData.designation,
                department: formData.department,
                employeeId: finalId, // Also sync here, though schema uses workerId mostly
                emergencyContact: formData.emergencyContact
            },
            dailyWage: Number(formData.salary) || 0, // Sending salary as dailyWage
            bankDetails: formData.bankDetails,
            documents: formData.documents
        };

        // Remove undefined keys
        Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

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
                <h3 className="text-lg font-black" style={{ color: theme.textPrimary }}>{editData ? 'Edit Office Staff' : 'Office Staff Registration'}</h3>
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

                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Monthly Salary (₹)</label>
                    <input type="number" name="salary" value={formData.salary} onChange={handleChange} className={inputClasses} style={inputStyle} placeholder="e.g. 50000" />
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
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Documents (CV, Offer Letter, ID Proof)</label>
                    <div
                        onClick={() => fileInputRef.current.click()}
                        className="border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer hover:bg-slate-50 transition-colors flex flex-col items-center justify-center gap-2"
                        style={{ borderColor: theme.cardBorder }}
                    >
                        <FiUploadCloud size={32} className="text-slate-300" />
                        <p className="text-xs font-bold" style={{ color: theme.textSecondary }}>Drag & drop files or click to upload</p>
                        <p className="text-[10px] opacity-50" style={{ color: theme.textSecondary }}>Supported: PDF, JPG, PNG</p>
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                    {formData.documents.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {formData.documents.map((doc, idx) => (
                                <div key={idx} className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-xl border border-slate-200">
                                    <FiFileText className="text-slate-400" />
                                    <span className="text-xs font-bold truncate max-w-[150px]">{doc.name}</span>
                                    <button type="button" onClick={() => removeDoc(idx)} className="text-rose-500 hover:text-rose-700 ml-1">×</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <button
                type="submit"
                className="w-full text-white py-3.5 px-6 rounded-2xl font-black uppercase tracking-widest shadow-premium hover:-translate-y-0.5 active:translate-y-0 transition-all mt-6"
                style={{ background: theme.gradients.button }}
            >
                {editData ? 'Update Office Staff' : 'Register Office Staff'}
            </button>
        </form>
    );
};

export default OfficeStaffForm;
