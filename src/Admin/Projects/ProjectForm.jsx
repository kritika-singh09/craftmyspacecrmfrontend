import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectMutations } from '../../hooks/useProjects';
import { useTheme } from '../../context/ThemeContext';
import { useSubscription } from '../../hooks/useSubscription';
import { FiSave, FiX, FiCheck, FiAlertCircle, FiLock } from 'react-icons/fi';
import { MdHome, MdArchitecture } from 'react-icons/md';
import { GiHammerNails } from 'react-icons/gi';

const ProjectForm = ({ existingProject = null, initialModule = null, onClose }) => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { isModuleLocked, updatePlan, processPayment } = useSubscription();
    const { createProject, updateProject, loading, error } = useProjectMutations();

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        client: '',
        budget: '',
        start_date: '',
        end_date: '',
        status: 'Planning',
        progress: 0,
        projectLead: '',
        description: '',
        modules: {
            architecture: { enabled: false, status: 'LOCKED' },
            interior: { enabled: false, status: 'LOCKED' },
            construction: { enabled: false, status: 'LOCKED' }
        }
    });

    const [draftSaved, setDraftSaved] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [pendingModule, setPendingModule] = useState(null);

    // Load existing project or draft
    useEffect(() => {
        if (existingProject) {
            setFormData({
                name: existingProject.name || '',
                location: existingProject.location || '',
                client: existingProject.client || '',
                budget: existingProject.budget || '',
                start_date: existingProject.start_date?.split('T')[0] || '',
                end_date: existingProject.end_date?.split('T')[0] || '',
                status: existingProject.status || 'Planning',
                progress: existingProject.progress || 0,
                projectLead: existingProject.projectLead?._id || '',
                description: existingProject.description || '',
                modules: existingProject.modules || formData.modules
            });
            // Load draft from localStorage
            const draft = localStorage.getItem('projectDraft');
            if (draft) {
                setFormData(JSON.parse(draft));
            } else if (initialModule) {
                // Pre-select module if provided
                setFormData(prev => ({
                    ...prev,
                    modules: {
                        architecture: { enabled: initialModule === 'architecture', status: initialModule === 'architecture' ? 'ONGOING' : 'LOCKED' },
                        interior: { enabled: initialModule === 'interior', status: initialModule === 'interior' ? 'ONGOING' : 'LOCKED' },
                        construction: { enabled: initialModule === 'construction', status: initialModule === 'construction' ? 'ONGOING' : 'LOCKED' }
                    }
                }));
            }
        }
    }, [existingProject, initialModule]);

    // Auto-save draft every 30 seconds
    useEffect(() => {
        if (!existingProject) {
            const timer = setInterval(() => {
                localStorage.setItem('projectDraft', JSON.stringify(formData));
                setDraftSaved(true);
                setTimeout(() => setDraftSaved(false), 2000);
            }, 30000);

            return () => clearInterval(timer);
        }
    }, [formData, existingProject]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear validation error for this field
        if (validationErrors[name]) {
            setValidationErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const toggleModule = (moduleName) => {
        // Find config to get subscription key
        const config = moduleConfigs.find(m => m.id === moduleName);
        if (config && isModuleLocked(config.subscriptionKey)) {
            setPendingModule(config);
            setShowPaymentModal(true);
            return;
        }

        const isCurrentlyEnabled = formData.modules[moduleName].enabled;

        // Force single selection: disable all first, then enable selected if it wasn't already
        const newModules = {
            architecture: { enabled: false, status: 'LOCKED' },
            interior: { enabled: false, status: 'LOCKED' },
            construction: { enabled: false, status: 'LOCKED' }
        };

        if (!isCurrentlyEnabled) {
            newModules[moduleName] = { enabled: true, status: 'ONGOING' };
        }

        setFormData(prev => ({
            ...prev,
            modules: newModules
        }));
    };

    const handleSimulatedPayment = () => {
        if (!pendingModule) return;

        // 1. Update the plan in context (e.g., to 'Pro' if construction, 'Basic' if architecture)
        const targetPlan = pendingModule.id === 'construction' ? 'Pro' : 'Basic';
        updatePlan(targetPlan);

        // 2. Process simulation
        processPayment(true);

        // 3. Update local form state for the module (and lock others)
        setFormData(prev => ({
            ...prev,
            modules: {
                architecture: { enabled: pendingModule.id === 'architecture', status: pendingModule.id === 'architecture' ? 'ONGOING' : 'LOCKED' },
                interior: { enabled: pendingModule.id === 'interior', status: pendingModule.id === 'interior' ? 'ONGOING' : 'LOCKED' },
                construction: { enabled: pendingModule.id === 'construction', status: pendingModule.id === 'construction' ? 'ONGOING' : 'LOCKED' }
            }
        }));

        // 4. Cleanup
        setShowPaymentModal(false);
        setPendingModule(null);
        alert(`${pendingModule.name} has been successfully unlocked and enabled!`);
    };

    const validate = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = 'Project name is required';
        if (!formData.location.trim()) errors.location = 'Location is required';
        if (!formData.client.trim()) errors.client = 'Client name is required';
        if (!formData.budget || formData.budget <= 0) errors.budget = 'Valid budget is required';
        if (!formData.start_date) errors.start_date = 'Start date is required';
        if (!formData.end_date) errors.end_date = 'End date is required';

        if (formData.start_date && formData.end_date && new Date(formData.start_date) > new Date(formData.end_date)) {
            errors.end_date = 'End date must be after start date';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        const result = existingProject
            ? await updateProject(existingProject._id, formData)
            : await createProject(formData);

        if (result.success) {
            // Clear draft
            localStorage.removeItem('projectDraft');

            if (onClose) {
                onClose();
            } else {
                navigate('/projects');
            }
        }
    };

    const statusOptions = ['Planning', 'In Progress', 'Ongoing', 'On Hold', 'Completed', 'Cancelled'];

    const moduleConfigs = [
        { id: 'architecture', name: 'Architecture', subscriptionKey: 'Architecture', icon: <MdArchitecture className="text-2xl" />, color: 'emerald' },
        { id: 'interior', name: 'Interior Design', subscriptionKey: 'Interior', icon: <MdHome className="text-2xl" />, color: 'orange' },
        { id: 'construction', name: 'Construction', subscriptionKey: 'Construction', icon: <GiHammerNails className="text-2xl" />, color: 'blue' }
    ];

    const inputStyle = {
        backgroundColor: `${theme.iconBg}10`,
        borderColor: theme.cardBorder,
        color: theme.textPrimary
    };


    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <style>{`
                .theme-focus:focus {
                    border-color: ${theme.primary} !important;
                    box-shadow: 0 0 0 2px ${theme.primary}20 !important;
                }
                .range-slider {
                    accent-color: ${theme.primary};
                }
                /* Webkit scrollbar for form */
                ::-webkit-scrollbar {
                  width: 8px;
                }
                ::-webkit-scrollbar-track {
                  background: transparent; 
                }
                ::-webkit-scrollbar-thumb {
                  background: ${theme.borderColor}; 
                  border-radius: 4px;
                }
                ::-webkit-scrollbar-thumb:hover {
                  background: ${theme.textSecondary}; 
                }
            `}</style>

            {/* Error Display */}
            {error && (
                <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <FiAlertCircle className="text-red-600 text-xl" />
                    <p className="text-sm font-bold text-red-800">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="card-premium overflow-hidden" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>

                    {/* Dark Header Section */}
                    <div className="px-8 py-6" style={{
                        background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary || theme.primary})`,
                        color: 'white'
                    }}>
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-3xl font-black tracking-tight text-white">
                                    {existingProject ? 'Edit Project' : 'Create New Project'}
                                </h2>
                                <p className="text-sm font-medium mt-1 text-white/80">
                                    {existingProject ? `Project Code: ${existingProject.projectCode}` : 'Project code will be auto-generated'}
                                </p>
                            </div>
                            {draftSaved && !existingProject && (
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl text-sm font-bold">
                                    <FiCheck /> Draft Saved
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Basic Information */}
                        <div className="mb-10">
                            <h3 className="text-xl font-black mb-6" style={{ color: theme.textPrimary }}>Basic Information</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Project Name */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>
                                        Project Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-xl border ${validationErrors.name ? 'border-red-500' : ''} focus:outline-none theme-focus`}
                                        style={inputStyle}
                                        placeholder="Enter project name"
                                    />
                                    {validationErrors.name && (
                                        <p className="text-xs text-red-500 mt-1 font-bold">{validationErrors.name}</p>
                                    )}
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>
                                        Location <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-xl border ${validationErrors.location ? 'border-red-500' : ''} focus:outline-none theme-focus`}
                                        style={inputStyle}
                                        placeholder="City, State, Country"
                                    />
                                    {validationErrors.location && (
                                        <p className="text-xs text-red-500 mt-1 font-bold">{validationErrors.location}</p>
                                    )}
                                </div>

                                {/* Client */}
                                <div>
                                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>
                                        Client Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="client"
                                        value={formData.client}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-xl border ${validationErrors.client ? 'border-red-500' : ''} focus:outline-none theme-focus`}
                                        style={inputStyle}
                                        placeholder="Enter client name"
                                    />
                                    {validationErrors.client && (
                                        <p className="text-xs text-red-500 mt-1 font-bold">{validationErrors.client}</p>
                                    )}
                                </div>

                                {/* Budget */}
                                <div>
                                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>
                                        Budget (₹) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-xl border ${validationErrors.budget ? 'border-red-500' : ''} focus:outline-none theme-focus`}
                                        style={inputStyle}
                                        placeholder="Enter budget amount"
                                        min="0"
                                    />
                                    {validationErrors.budget && (
                                        <p className="text-xs text-red-500 mt-1 font-bold">{validationErrors.budget}</p>
                                    )}
                                </div>

                                {/* Start Date */}
                                <div>
                                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>
                                        Start Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="start_date"
                                        value={formData.start_date}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-xl border ${validationErrors.start_date ? 'border-red-500' : ''} focus:outline-none theme-focus`}
                                        style={{
                                            ...inputStyle,
                                            colorScheme: theme.mode === 'dark' ? 'dark' : 'light'
                                        }}
                                    />
                                    {validationErrors.start_date && (
                                        <p className="text-xs text-red-500 mt-1 font-bold">{validationErrors.start_date}</p>
                                    )}
                                </div>

                                {/* End Date */}
                                <div>
                                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>
                                        End Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="end_date"
                                        value={formData.end_date}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-xl border ${validationErrors.end_date ? 'border-red-500' : ''} focus:outline-none theme-focus`}
                                        style={{
                                            ...inputStyle,
                                            colorScheme: theme.mode === 'dark' ? 'dark' : 'light'
                                        }}
                                    />
                                    {validationErrors.end_date && (
                                        <p className="text-xs text-red-500 mt-1 font-bold">{validationErrors.end_date}</p>
                                    )}
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border focus:outline-none theme-focus"
                                        style={inputStyle}
                                    >
                                        {statusOptions.map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Progress */}
                                <div>
                                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>
                                        Progress: {formData.progress}%
                                    </label>
                                    <input
                                        type="range"
                                        name="progress"
                                        value={formData.progress}
                                        onChange={handleChange}
                                        min="0"
                                        max="100"
                                        className="w-full range-slider cursor-pointer"
                                    />
                                </div>

                                {/* Description */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>
                                        Description / Notes
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full px-4 py-3 rounded-xl border focus:outline-none theme-focus"
                                        style={inputStyle}
                                        placeholder="Enter project description or notes"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Module Selection */}
                        <div className="mb-10">
                            <h3 className="text-xl font-black mb-4" style={{ color: theme.textPrimary }}>Project Modules</h3>
                            <p className="text-sm font-medium mb-6" style={{ color: theme.textMuted }}>
                                Select which modules to enable for this project
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {moduleConfigs.map(module => {
                                    const isEnabled = formData.modules[module.id].enabled;
                                    const isLocked = isModuleLocked(module.subscriptionKey);

                                    return (
                                        <div
                                            key={module.id}
                                            onClick={() => toggleModule(module.id)}
                                            className={`p-6 rounded-2xl border-2 transition-all relative overflow-hidden group cursor-pointer hover:-translate-y-1 ${isLocked ? 'opacity-80' : ''}`}
                                            style={{
                                                borderColor: isEnabled
                                                    ? theme.primary
                                                    : isLocked ? theme.cardBorder : theme.cardBorder,
                                                backgroundColor: isEnabled
                                                    ? `${theme.primary}10`
                                                    : isLocked ? theme.background : theme.background
                                            }}
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center`}
                                                    style={{
                                                        backgroundColor: isEnabled ? theme.primary : `${theme.iconBg}20`,
                                                        color: isEnabled ? 'white' : theme.textMuted
                                                    }}
                                                >
                                                    {isLocked ? <FiLock className="text-xl" /> : module.icon}
                                                </div>
                                                {isEnabled && <FiCheck className="text-xl" style={{ color: theme.primary }} />}
                                                {isLocked && (
                                                    <div className="text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider"
                                                        style={{ backgroundColor: theme.iconBg, color: theme.textSecondary }}>
                                                        Locked
                                                    </div>
                                                )}
                                            </div>
                                            <h4 className="font-black text-lg" style={{ color: theme.textPrimary }}>{module.name}</h4>
                                            <p className="text-xs mt-2 font-bold uppercase tracking-wide" style={{ color: isEnabled ? theme.primary : theme.textMuted }}>
                                                {isEnabled ? 'Enabled' : 'Click to enable'}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-4 pt-6" style={{ borderTop: `1px solid ${theme.borderColor || theme.cardBorder}` }}>
                            <button
                                type="button"
                                onClick={() => onClose ? onClose() : navigate('/projects')}
                                className="px-6 py-3 rounded-xl font-bold text-sm border hover:bg-opacity-10 transition-all"
                                style={{ color: theme.textPrimary, borderColor: theme.cardBorder, backgroundColor: theme.background }}
                            >
                                <FiX className="inline mr-2" /> Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 rounded-xl font-bold text-sm text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:-translate-y-0.5"
                                style={{ background: theme.gradients.button }}
                            >
                                <FiSave className="inline mr-2" />
                                {loading ? 'Saving...' : existingProject ? 'Update Project' : 'Create Project'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            {/* Simulated Payment Modal */}
            {showPaymentModal && pendingModule && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
                    <div className="card-premium w-full max-w-lg overflow-hidden border-none shadow-2xl scale-100 animate-in zoom-in-95 duration-300"
                        style={{ backgroundColor: theme.cardBg }}>

                        {/* Modal Header */}
                        <div className="p-8 text-center bg-gradient-to-br from-slate-900 to-slate-800 text-white relative">
                            <div className="absolute top-4 right-4 text-white/50 hover:text-white cursor-pointer" onClick={() => setShowPaymentModal(false)}>
                                <FiX size={24} />
                            </div>
                            <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-2xl shadow-black/50`}
                                style={{ backgroundColor: pendingModule.id === 'construction' ? '#3b82f6' : '#8b5cf6' }}>
                                <FiLock />
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight">Unlock {pendingModule.name}</h3>
                            <p className="text-sm font-medium text-white/60 mt-2">Enterprise-grade capabilities for your project</p>
                        </div>

                        {/* Modal Content */}
                        <div className="p-10 space-y-8">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">Current Plan</span>
                                    <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Trial Mode</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">Target Upgrade</span>
                                    <span className="text-sm font-black text-brand-600 uppercase tracking-widest">{pendingModule.id === 'construction' ? 'Pro Plan' : 'Basic Plan'}</span>
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Amount Due</span>
                                    <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">₹{pendingModule.id === 'construction' ? '25,000' : '15,000'}<span className="text-xs font-bold text-slate-400 ml-1">/yr</span></span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={handleSimulatedPayment}
                                    className="w-full py-5 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                                    style={{ background: theme.gradients?.button || 'linear-gradient(135deg, #714B67, #452c3f)' }}
                                >
                                    <FiCheck /> Confirm & Unlock
                                </button>
                                <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-widest">
                                    Secure Transaction Powered by Razorpay/Stripe
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectForm;
