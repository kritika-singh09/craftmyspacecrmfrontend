import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { FiUser, FiBriefcase, FiArrowLeft, FiUploadCloud, FiFileText } from 'react-icons/fi';

const SiteStaffForm = ({ onSubmit, onBack, projects = [], editData }) => {
    const { theme } = useTheme();
    const [formData, setFormData] = useState({
        workerType: editData?.category || 'Worker',
        vendorSubType: editData?.vendorSubType || '',
        userRole: '',
        name: editData?.personalDetails?.name || '',
        workerId: editData?.workerId || '',
        mobile: editData?.personalDetails?.mobile || '',
        email: editData?.personalDetails?.email || '',
        dateOfJoining: editData?.personalDetails?.dateOfJoining ? new Date(editData.personalDetails.dateOfJoining).toISOString().split('T')[0] : '',
        address: editData?.personalDetails?.address || '',
        aadharNumber: editData?.personalDetails?.aadharNumber || '',
        panNumber: editData?.personalDetails?.panNumber || '',
        wage: editData?.dailyWage || '',
        project: projects[0]?.name || '',
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

    const workerTypes = ['Client', 'Staff', 'Worker', 'Investor', 'Vendor'];
    const vendorSubTypes = ['Material Supplier', 'Labour Contractor', 'Equipment Supplier', 'Contractor', 'Other Vendor'];

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
        // In a real app, you'd upload to cloud/server here. 
        // For now, we simulate by adding them to the state.
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
        // or send it as undefined so backend logic catches it easily.
        let finalId = formData.workerId;
        if (!finalId || finalId.trim() === '') {
            finalId = undefined;
        }

        const payload = {
            workerId: finalId, // Will be undefined if empty
            type: 'Site',
            category: formData.workerType,
            vendorSubType: formData.workerType === 'Vendor' ? formData.vendorSubType : undefined,
            personalDetails: {
                name: formData.name,
                mobile: formData.mobile,
                email: formData.email,
                dateOfJoining: formData.dateOfJoining,
                address: formData.address,
                aadharNumber: formData.aadharNumber,
                panNumber: formData.panNumber
            },
            bankDetails: formData.bankDetails,
            dailyWage: Number(formData.wage) || 0,
            documents: formData.documents
        };

        // Remove undefined keys to keep payload clean
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
                <h3 className="text-lg font-black" style={{ color: theme.textPrimary }}>{editData ? 'Edit Site Staff' : 'Site Staff Registration'}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Worker Type</label>
                    <select name="workerType" value={formData.workerType} onChange={handleChange} className={inputClasses} style={inputStyle}>
                        {workerTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>

                {formData.workerType === 'Vendor' && (
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Vendor Type</label>
                        <select name="vendorSubType" value={formData.vendorSubType} onChange={handleChange} className={inputClasses} style={inputStyle} required>
                            <option value="">Select Vendor Type</option>
                            {vendorSubTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                )}

                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Worker ID</label>
                    <input type="text" name="workerId" value={formData.workerId} onChange={handleChange} className={inputClasses} style={inputStyle} placeholder="ID-001" required />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClasses} style={inputStyle} placeholder="John Doe" required />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Mobile Number</label>
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className={inputClasses} style={inputStyle} placeholder="+91 9876543210" required />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClasses} style={inputStyle} placeholder="john@example.com" />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Date of Joining</label>
                    <input type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} className={inputClasses} style={inputStyle} />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Daily Wage (₹)</label>
                    <input type="number" name="wage" value={formData.wage} onChange={handleChange} className={inputClasses} style={inputStyle} placeholder="e.g. 800" />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Address</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} className={inputClasses} style={inputStyle} rows="2" placeholder="Full Address" />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Aadhar Number</label>
                    <input type="text" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} className={inputClasses} style={inputStyle} placeholder="1234 5678 9012" />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>PAN Number</label>
                    <input type="text" name="panNumber" value={formData.panNumber} onChange={handleChange} className={inputClasses} style={inputStyle} placeholder="ABCDE1234F" />
                </div>
            </div>

            {/* Bank Details Section Toggle */}
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
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Bank Name</label>
                        <input type="text" name="bank.bankName" value={formData.bankDetails.bankName} onChange={handleChange} className={inputClasses} style={inputStyle} />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>IFSC Code</label>
                        <input type="text" name="bank.ifscCode" value={formData.bankDetails.ifscCode} onChange={handleChange} className={inputClasses} style={inputStyle} />
                    </div>
                </div>
            )}

            <div className="border-t pt-4" style={{ borderColor: theme.cardBorder }}>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: theme.textMuted }}>Documents (Aadhar, Photo, Contract, etc.)</label>
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
                {editData ? 'Update Staff Member' : 'Create Staff Member'}
            </button>
        </form>
    );
};

export default SiteStaffForm;
