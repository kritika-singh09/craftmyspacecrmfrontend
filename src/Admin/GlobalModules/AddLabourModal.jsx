import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FiX, FiUpload, FiUser } from 'react-icons/fi';
import { useTenant } from '../../hooks/useTenant';

const AddLabourModal = ({ onClose, onSuccess, initialData }) => {
    const { theme } = useTheme();
    const { currentTenant } = useTenant();
    const [formData, setFormData] = useState({
        fullName: '',
        mobile: '',
        aadharNumber: '',
        gender: '',
        address: '',
        category: '',
        dailyWage: '',
        photo: null
    });
    const [photoPreview, setPhotoPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const labourCategories = [
        'Helper / Mazdoor',
        'Mason (Mistri)',
        'Electrician',
        'Plumber',
        'Carpenter',
        'Painter',
        'Tile Layer',
        'Bar Bender',
        'Supervisor (Site)'
    ];

    useEffect(() => {
        if (initialData) {
            setFormData({
                fullName: initialData.fullName || '',
                mobile: initialData.mobile || '',
                aadharNumber: initialData.aadharNumber || '',
                gender: initialData.gender || '',
                address: initialData.address || '',
                category: initialData.category || '',
                dailyWage: initialData.dailyWage || '',
                photo: null // Reset photo as we don't handle file objects from servers
            });
            if (initialData.photo) {
                setPhotoPreview(initialData.photo);
            }
        }
    }, [initialData]);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, photo: file });
            const reader = new FileReader();
            reader.onloadend = () => setPhotoPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            const labourData = {
                fullName: formData.fullName,
                mobile: formData.mobile,
                aadharNumber: formData.aadharNumber,
                gender: formData.gender,
                address: formData.address,
                category: formData.category,
                dailyWage: Number(formData.dailyWage) || 0,
                tenantId: currentTenant?._id || '507f1f77bcf86cd799439011' // Fallback for safety
            };

            formDataToSend.append('labourData', JSON.stringify(labourData));

            if (formData.photo) {
                formDataToSend.append('photo', formData.photo);
            }

            const url = initialData
                ? `${import.meta.env.VITE_API_BASE_URL}/api/labour/${initialData._id}`
                : `${import.meta.env.VITE_API_BASE_URL}/api/labour`;

            const method = initialData ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formDataToSend
            });

            let result;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                result = await response.json();
            } else {
                const text = await response.text();
                console.error('Non-JSON response received:', text);
                throw new Error(`Server returned ${response.status}: ${text.slice(0, 100)}...`);
            }

            if (result.success) {
                alert(initialData ? 'Labour updated successfully!' : 'Labour added successfully!');
                onSuccess(result.data);
                onClose();
            } else {
                alert(`Failed to ${initialData ? 'update' : 'add'} labour: ` + (result.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error submitting labour form:', error);
            alert(`Error: ${error.message || 'Failed to submit form. Please try again.'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-full max-w-2xl bg-white dark:bg-slate-950 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 max-h-[95vh] flex flex-col">
                <div className="p-4 sm:p-6 text-white relative flex-shrink-0" style={{ background: theme.gradients.primary }}>
                    <button onClick={onClose} className="absolute right-4 sm:right-6 top-4 sm:top-6 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                        <FiX size={20} />
                    </button>
                    <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">{initialData ? 'Edit Labour Worker' : 'Add Labour Worker'}</h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mt-1">{initialData ? 'Update Profile' : 'Personnel Registration'}</p>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 sm:space-y-8 custom-scrollbar">
                    <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
                        <div className="relative group">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-white/5 border-2 border-dashed border-slate-200 dark:border-white/10 flex items-center justify-center overflow-hidden transition-all group-hover:border-brand-500/50">
                                {photoPreview ? (
                                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <FiUser size={40} className="text-slate-200" />
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                    <FiUpload className="text-white" size={24} />
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                />
                            </div>
                            <p className="text-[9px] font-black text-center mt-3 text-slate-400 uppercase tracking-widest">Update Photo</p>
                        </div>

                        <div className="flex-1 w-full space-y-4 sm:space-y-6">
                            <div className="space-y-1.5 flex-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name *</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    className="w-full h-12 px-5 rounded-xl bg-slate-50 dark:bg-white/5 border-none outline-none font-bold text-sm focus:ring-2 focus:ring-brand-500/20 transition-all"
                                    placeholder="Enter full name"
                                    style={{ color: theme.textPrimary }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-1.5 text-left">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Number *</label>
                            <input
                                required
                                type="tel"
                                value={formData.mobile}
                                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                className="w-full h-12 px-5 rounded-xl bg-slate-50 dark:bg-white/5 border-none outline-none font-bold text-sm"
                                placeholder="10-digit number"
                                style={{ color: theme.textPrimary }}
                            />
                        </div>

                        <div className="space-y-1.5 text-left">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Aadhar Number *</label>
                            <input
                                required
                                type="text"
                                value={formData.aadharNumber}
                                onChange={(e) => setFormData({ ...formData, aadharNumber: e.target.value })}
                                className="w-full h-12 px-5 rounded-xl bg-slate-50 dark:bg-white/5 border-none outline-none font-bold text-sm"
                                placeholder="12-digit number"
                                style={{ color: theme.textPrimary }}
                            />
                        </div>

                        <div className="space-y-1.5 text-left">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Gender *</label>
                            <select
                                required
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                className="w-full h-12 px-5 rounded-xl bg-slate-50 dark:bg-white/5 border-none outline-none font-bold text-sm"
                                style={{ color: theme.textPrimary }}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="space-y-1.5 text-left text-teal-800">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Labour Category *</label>
                            <select
                                required
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-white/5 border-none outline-none font-bold text-sm appearance-none cursor-pointer"
                                style={{ color: theme.textPrimary }}
                            >
                                <option value="">Select Category</option>
                                {labourCategories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1.5 text-left">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Daily Wage (₹) *</label>
                            <input
                                required
                                type="number"
                                value={formData.dailyWage}
                                onChange={(e) => setFormData({ ...formData, dailyWage: e.target.value })}
                                className="w-full h-12 px-5 rounded-xl bg-slate-50 dark:bg-white/5 border-none outline-none font-bold text-sm"
                                placeholder="e.g. 800"
                                style={{ color: theme.textPrimary }}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Permanent Address</label>
                        <textarea
                            rows="2"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border-none outline-none font-bold text-sm resize-none"
                            placeholder="Complete address with pin code"
                            style={{ color: theme.textPrimary }}
                        ></textarea>
                    </div>

                    <div className="pt-4 flex-shrink-0">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full h-14 sm:h-16 text-white rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            style={{ background: theme.gradients.button }}
                        >
                            {loading ? (initialData ? 'Updating...' : 'Registering...') : (initialData ? 'Update Labour Worker' : 'Register Labour Worker')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLabourModal;
