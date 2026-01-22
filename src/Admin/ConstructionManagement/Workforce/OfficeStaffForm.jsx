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
        // Store the actual File objects so we can access file.type and create object URLs
        setFormData(prev => ({
            ...prev,
            documents: [...prev.documents, ...files]
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

    const inputClasses = "w-full px-4 py-2.5 sm:px-5 sm:py-3 border rounded-xl sm:rounded-2xl focus:ring-4 outline-none transition-all font-semibold text-sm";
    const inputStyle = {
        backgroundColor: `${theme.iconBg}10`,
        borderColor: theme.cardBorder,
        color: theme.textPrimary
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <button type="button" onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <FiArrowLeft size={20} style={{ color: theme.textPrimary }} />
                </button>
                <h3 className="text-base sm:text-lg font-black" style={{ color: theme.textPrimary }}>{editData ? 'Edit Office Staff' : 'Office Staff Registration'}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
                        className="border-2 border-dashed rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center cursor-pointer hover:bg-slate-50 transition-colors flex flex-col items-center justify-center gap-2"
                        style={{ borderColor: theme.cardBorder }}
                    >
                        <FiUploadCloud size={28} className="sm:w-8 sm:h-8 text-slate-300" />
                        <p className="text-xs sm:text-sm font-bold text-center" style={{ color: theme.textSecondary }}>Drag & drop files or click to upload</p>
                        <p className="text-[10px] opacity-40 sm:opacity-50 text-center" style={{ color: theme.textSecondary }}>Supported: PDF, JPG, PNG</p>
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                    {formData.documents.length > 0 && (
                        <div className="mt-4 space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Uploaded Files ({formData.documents.length})</p>
                            <div className="grid grid-cols-1 gap-2">
                                {formData.documents.map((doc, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border-2 bg-white" style={{ borderColor: theme.cardBorder }}>
                                        {doc.type?.startsWith('image/') ? (
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden flex-shrink-0 border" style={{ borderColor: theme.cardBorder }}>
                                                <img
                                                    src={URL.createObjectURL(doc)}
                                                    alt={doc.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${theme.primary}15` }}>
                                                <FiFileText size={20} className="sm:w-6 sm:h-6" style={{ color: theme.primary }} />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs sm:text-sm font-bold truncate" style={{ color: theme.textPrimary }}>{doc.name}</p>
                                            <p className="text-[10px] sm:text-xs" style={{ color: theme.textMuted }}>{doc.size ? (doc.size / 1024).toFixed(1) + ' KB' : 'Unknown size'}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeDoc(idx)}
                                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors flex-shrink-0"
                                            style={{ color: '#ef4444' }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
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
