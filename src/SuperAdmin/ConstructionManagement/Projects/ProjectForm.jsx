import React, { useState, useEffect } from 'react';
import { FiLayout, FiMap, FiCalendar, FiUsers, FiDollarSign } from 'react-icons/fi';

const ProjectForm = ({ initialData, companies, onSubmit, onCancel }) => {
    const [activeTab, setActiveTab] = useState('General');
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState(initialData || {
        projectName: '',
        projectCode: '',
        projectType: 'CONSTRUCTION',
        company: companies?.[0]?._id || '',
        description: '',
        location: {
            address: '',
            city: '',
            state: '',
            pincode: ''
        },
        startDate: '',
        endDate: '',
        projectLead: '',
        budget: 0,
        currency: 'INR',
        status: 'PLANNING',
        progressPercentage: 0
    });

    const displayCompanies = companies.length > 0 ? companies : [
        { _id: 'mock-1', name: 'HARR Construction (Demo)' },
        { _id: 'mock-2', name: 'Global Projects (Demo)' }
    ];

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (!formData.company && displayCompanies.length > 0) {
            setFormData(prev => ({ ...prev, company: displayCompanies[0]._id }));
        }
    }, [displayCompanies]);

    useEffect(() => {
        if (!formData.projectLead && users.length > 0) {
            setFormData(prev => ({ ...prev, projectLead: users[0]._id }));
        }
    }, [users]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const tabs = [
        { id: 'General', icon: <FiLayout />, label: 'Basic Info' },
        { id: 'Location', icon: <FiMap />, label: 'Location' },
        { id: 'Timeline', icon: <FiCalendar />, label: 'Timeline' },
        { id: 'Resources', icon: <FiUsers />, label: 'Team' },
        { id: 'Finance', icon: <FiDollarSign />, label: 'Budget' },
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Horizontal Sub-Navigation */}
            <div className="flex flex-wrap gap-1 p-1 bg-brand-50/50 rounded-xl border border-brand-100/50 backdrop-blur-sm shadow-inner">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === tab.id
                            ? 'bg-white text-brand-600 shadow-premium scale-[1.02]'
                            : 'text-gray-900 hover:text-brand-500 hover:bg-white/50'
                            }`}
                    >
                        <span className="text-base">{tab.icon}</span>
                        <span className="hidden md:inline text-[10px]">{tab.label}</span>
                    </button>
                ))}
            </div>

            <div className="min-h-[300px] animate-scale-up">
                {activeTab === 'General' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-2">Project Name</label>
                            <input type="text" name="projectName" value={formData.projectName} onChange={handleChange} required className="input-premium py-3 px-4" placeholder="Enter project name..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-2">Project Code</label>
                            <input type="text" name="projectCode" value={formData.projectCode} onChange={handleChange} required className="input-premium py-3 px-4" placeholder="PRJ-XXXX" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-2">Company</label>
                            <select name="company" value={formData.company || ''} onChange={handleChange} required className="input-premium py-3 px-4 appearance-none cursor-pointer">
                                <option value="" disabled>Select Company...</option>
                                {displayCompanies.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-2">Project Type</label>
                            <select name="projectType" value={formData.projectType} onChange={handleChange} className="input-premium py-3 px-4 appearance-none cursor-pointer">
                                <option value="CONSTRUCTION">Infrastructure / Construction</option>
                                <option value="INTERIOR">Interior Architecture</option>
                                <option value="ARCHITECT">Architectural Design</option>
                            </select>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-[11px] font-black text-gray-900 uppercase tracking-[0.2em] ml-2">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="input-premium py-3 px-4 resize-none" placeholder="Provide a brief project description..." />
                        </div>
                    </div>
                )}

                {activeTab === 'Location' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-2">Address</label>
                            <input type="text" name="location.address" value={formData.location.address} onChange={handleChange} className="input-premium py-3 px-4" placeholder="Enter project address..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-2">City</label>
                            <input type="text" name="location.city" value={formData.location.city} onChange={handleChange} className="input-premium py-3 px-4" placeholder="e.g. Mumbai" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-2">State</label>
                            <input type="text" name="location.state" value={formData.location.state} onChange={handleChange} className="input-premium py-3 px-4" placeholder="e.g. Maharashtra" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-2">Pincode</label>
                            <input type="text" name="location.pincode" value={formData.location.pincode} onChange={handleChange} className="input-premium py-3 px-4" placeholder="XXXXXX" />
                        </div>
                    </div>
                )}

                {activeTab === 'Timeline' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-2">Commencement Date</label>
                            <input type="date" name="startDate" value={formData.startDate?.split('T')[0]} onChange={handleChange} className="input-premium py-3 px-4" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-2">Scheduled Completion</label>
                            <input type="date" name="endDate" value={formData.endDate?.split('T')[0]} onChange={handleChange} className="input-premium py-3 px-4" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-2">Project Status</label>
                            <select name="status" value={formData.status} onChange={handleChange} className="input-premium py-3 px-4 appearance-none">
                                <option value="PLANNING">Planning</option>
                                <option value="ONGOING">Ongoing</option>
                                <option value="ON_HOLD">On Hold</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELLED">Cancelled</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-2">Progress (%)</label>
                            <input type="number" name="progressPercentage" value={formData.progressPercentage} onChange={handleChange} min="0" max="100" className="input-premium py-3 px-4" />
                        </div>
                    </div>
                )}

                {activeTab === 'Resources' && (
                    <div className="grid grid-cols-1 gap-5">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-gray-900 uppercase tracking-[0.2em] ml-2">Project Lead</label>
                            <select name="projectLead" value={formData.projectLead} onChange={handleChange} required className="input-premium py-3 px-4 appearance-none">
                                <option value="" disabled>Select Lead...</option>
                                {users.length > 0 ? users.map(u => (
                                    <option key={u._id} value={u._id}>
                                        {u.name} ({u.role}) {u.company ? `- ${u.company.name}` : ''}
                                    </option>
                                )) : <option value="dummy">Demo User (Super Admin)</option>}
                            </select>
                            <p className="text-[9px] font-bold text-gray-900 pl-2">Select the person in charge of this project.</p>
                        </div>
                    </div>
                )}

                {activeTab === 'Finance' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-2">Total Budget</label>
                            <div className="relative">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-600 font-bold">₹</span>
                                <input type="number" name="budget" value={formData.budget} onChange={handleChange} required className="input-premium py-3 px-4 pl-10" placeholder="0.00" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-2">Currency</label>
                            <select name="currency" value={formData.currency} onChange={handleChange} className="input-premium py-3 px-4 appearance-none">
                                <option value="INR">Indian Rupee (INR)</option>
                                <option value="USD">US Dollar (USD)</option>
                                <option value="EUR">Euro (EUR)</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-brand-50">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 px-6 py-4 rounded-xl bg-gray-50 text-gray-800 text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100 shadow-sm"
                >
                    Discard Changes
                </button>
                <button
                    type="submit"
                    className="flex-[2] px-10 py-4 bg-gradient-to-r from-brand-600 to-brand-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:shadow-brand hover:-translate-y-0.5 transition-all active:scale-95 shadow-premium"
                >
                    {initialData ? 'Update Project' : 'Save Project'}
                </button>
            </div>
        </form>
    );
};

export default ProjectForm;
