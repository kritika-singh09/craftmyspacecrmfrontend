import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiBriefcase, FiSearch, FiFilter, FiPlus, FiMoreVertical, FiMapPin, FiCalendar, FiDollarSign, FiUsers, FiActivity } from 'react-icons/fi';
import ProjectForm from './ProjectForm';
import { useAuth } from '../../../hooks/useAuth';

const SuperAdminProjects = () => {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState('All Entities');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const [projectsRes, companiesRes] = await Promise.all([
                fetch('http://localhost:5000/api/projects'),
                fetch('http://localhost:5000/api/companies'),
            ]);

            const projectsData = await projectsRes.json();
            const companiesData = await companiesRes.json();

            if (projectsData.success) setProjects(projectsData.data);
            if (companiesData) setCompanies(companiesData);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = async (data) => {
        try {
            const url = editingProject
                ? `http://localhost:5000/api/projects/${editingProject._id}`
                : 'http://localhost:5000/api/projects';

            const response = await fetch(url, {
                method: editingProject ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, createdBy: user?._id }),
            });

            if (response.ok) {
                fetchInitialData();
                setIsModalOpen(false);
                setEditingProject(null);
            }
        } catch (error) {
            console.error('Error saving project:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to archive this project?')) {
            try {
                const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) fetchInitialData();
            } catch (error) {
                console.error('Error archiving project:', error);
            }
        }
    };

    const filteredProjects = projects.filter(p => {
        const title = p.projectName || '';
        const companyName = p.company?.name || '';
        const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            companyName.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCompany = selectedCompany === 'All Entities' || p.company?._id === selectedCompany;

        return matchesSearch && matchesCompany;
    });

    if (loading) return (
        <div className="flex items-center justify-center h-[60vh]">
            <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-brand-100 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 border-t-4 border-brand-600 rounded-full animate-spin"></div>
            </div>
        </div>
    );

    return (
        <div className="space-y-8 pb-12 animate-fade-in">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                        <span className="bg-brand-600 w-1.5 h-10 rounded-full"></span>
                        Project Management
                    </h1>
                    <p className="text-sm font-bold text-gray-500 mt-2 uppercase tracking-widest pl-4">Manage and track all company projects</p>
                </div>

                <div className="flex flex-wrap gap-4 items-center w-full lg:w-auto">
                    <div className="relative flex-1 lg:flex-none">
                        <input
                            type="text"
                            placeholder="Search Projects..."
                            className="pl-12 pr-6 py-4 bg-white/70 backdrop-blur-md border border-brand-100/50 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none w-full lg:w-72 shadow-premium transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-600 text-xl"><FiSearch /></span>
                    </div>

                    <div className="relative">
                        <select
                            value={selectedCompany}
                            onChange={(e) => setSelectedCompany(e.target.value)}
                            className="pl-12 pr-10 py-4 bg-white/70 backdrop-blur-md border border-brand-100/50 rounded-2xl text-[11px] font-black uppercase tracking-widest outline-none focus:ring-4 focus:ring-brand-500/10 transition-all appearance-none cursor-pointer shadow-premium"
                        >
                            <option value="All Entities">All Entities</option>
                            {companies.map(c => (
                                <option key={c._id} value={c._id}>{c.name}</option>
                            ))}
                        </select>
                        <FiFilter className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-600" />
                    </div>

                    <button
                        onClick={() => { setEditingProject(null); setIsModalOpen(true); }}
                        className="px-8 py-4 bg-gradient-to-r from-brand-600 to-brand-700 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:shadow-brand transition-all flex items-center gap-3 group active:scale-95"
                    >
                        <FiPlus className="text-lg group-hover:rotate-90 transition-transform" />
                        Add New Project
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Projects', val: projects.length, label_sub: 'All registered', icon: <FiBriefcase />, color: 'brand' },
                    { label: 'Total Budget', val: '₹' + projects.reduce((acc, p) => acc + (p.budget || 0), 0).toLocaleString() + ' Cr', label_sub: 'Aggregate Capital', icon: <FiDollarSign />, color: 'emerald' },
                    { label: 'Active Projects', val: projects.filter(p => p.status === 'ONGOING').length, label_sub: 'In progress', icon: <FiActivity />, color: 'blue' },
                    { label: 'Team Members', val: projects.reduce((acc, p) => acc + (p.teamMembers?.length || 0), 0), label_sub: 'Total staff', icon: <FiUsers />, color: 'purple' },
                ].map((s, i) => (
                    <div key={i} className="group relative overflow-hidden card-premium p-8 hover:transform hover:-translate-y-1 transition-all duration-300">
                        <div className={`absolute -right-4 -top-4 w-24 h-24 bg-${s.color}-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <p className={`text-[10px] font-black text-${s.color}-600 uppercase tracking-[0.2em] mb-1`}>{s.label}</p>
                                <h3 className="text-3xl font-black text-gray-900 tracking-tight">{s.val}</h3>
                                <p className="text-[10px] font-bold text-gray-400 mt-1">{s.label_sub}</p>
                            </div>
                            <div className={`w-14 h-14 rounded-2xl bg-${s.color}-50 flex items-center justify-center text-2xl text-${s.color}-600`}>
                                {s.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content: Projects Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {filteredProjects.map((p) => (
                    <div key={p._id} className="group flex flex-col lg:flex-row card-premium overflow-hidden hover:shadow-premium-xl transition-all duration-500 border-l-4 border-l-brand-600">
                        <div className="flex-1 p-8 space-y-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="text-2xl font-black text-gray-900 group-hover:text-brand-600 transition-colors">{p.projectName}</h4>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="px-3 py-1 bg-brand-50 text-brand-600 text-[9px] font-black uppercase tracking-widest rounded-lg border border-brand-100">
                                            {p.projectCode}
                                        </span>
                                        <span className="text-xs font-bold text-gray-400">|</span>
                                        <span className="text-xs font-black text-gray-600 uppercase tracking-tight">{p.company?.name}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => { setEditingProject(p); setIsModalOpen(true); }} className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-brand-600 hover:text-white transition-all shadow-sm"><FiMoreVertical /></button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <p className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest"><FiMapPin className="text-brand-500" /> Location</p>
                                    <p className="text-sm font-bold text-gray-800">{p.location?.city || 'Not Specified'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest"><FiCalendar className="text-brand-500" /> Deadline</p>
                                    <p className="text-sm font-bold text-gray-800">{p.endDate ? new Date(p.endDate).toLocaleDateString() : 'Active'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest"><FiUsers className="text-brand-500" /> Lead</p>
                                    <p className="text-sm font-bold text-gray-800">{p.projectLead?.name || 'N/A'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest"><FiDollarSign className="text-brand-500" /> Budget</p>
                                    <p className="text-sm font-black text-gray-900">₹ {(p.budget || 0).toLocaleString()} Cr</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Project Status / Progress</span>
                                    <span className="text-[11px] font-black text-brand-600">{p.progressPercentage || 0}% Complete</span>
                                </div>
                                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-100 shadow-inner">
                                    <div
                                        className="h-full bg-gradient-to-r from-brand-500 to-brand-700 rounded-full transition-all duration-1000 shadow-brand-sm"
                                        style={{ width: `${p.progressPercentage || 0}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-32 bg-brand-50/50 p-6 flex lg:flex-col justify-between items-center border-l border-brand-100">
                            <span className={`px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] rounded-xl border-2 ${p.status === 'ONGOING' ? 'bg-green-100 text-green-700 border-green-200' :
                                p.status === 'PLANNING' ? 'bg-brand-100 text-brand-700 border-brand-200' :
                                    'bg-red-100 text-red-700 border-red-200'
                                }`}>
                                {p.status}
                            </span>

                            <button
                                onClick={() => handleDelete(p._id)}
                                className="w-12 h-12 rounded-2xl bg-white border border-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-premium active:scale-95"
                            >
                                <span className="transform rotate-45 text-2xl">+</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && createPortal(
                <div className="fixed inset-0 bg-brand-950/80 backdrop-blur-xl flex items-center justify-center z-[9999] px-4 py-8 animate-fade-in">
                    <div className="bg-white rounded-[2.5rem] shadow-premium-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden border border-white/20 animate-scale-up relative">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-400 via-brand-600 to-brand-400"></div>
                        <div className="p-6 lg:p-8 border-b border-brand-50 bg-brand-50/30 flex justify-between items-center shrink-0">
                            <div>
                                <h2 className="text-xl lg:text-2xl font-black text-gray-900 tracking-tight">
                                    {editingProject ? 'Edit Project' : 'Add New Project'}
                                </h2>
                                <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mt-1">Project details and configuration</p>
                            </div>
                            <button
                                onClick={() => { setIsModalOpen(false); setEditingProject(null); }}
                                className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-white border border-brand-100 flex items-center justify-center text-gray-400 hover:text-brand-600 transition-all shadow-premium group"
                            >
                                <span className="text-lg lg:text-xl group-hover:scale-125 transition-transform">✕</span>
                            </button>
                        </div>
                        <div className="p-8 lg:p-10 overflow-y-auto custom-scrollbar flex-1">
                            <ProjectForm
                                initialData={editingProject}
                                companies={companies}
                                onSubmit={handleFormSubmit}
                                onCancel={() => { setIsModalOpen(false); setEditingProject(null); }}
                            />
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default SuperAdminProjects;
