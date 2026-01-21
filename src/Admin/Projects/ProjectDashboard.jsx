import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProject } from '../../hooks/useProjects';
import { useTheme } from '../../context/ThemeContext';
import { FiEdit, FiUsers, FiCalendar, FiDollarSign, FiTrendingUp, FiMapPin, FiClock, FiFileText, FiUploadCloud, FiDownload, FiTrash2 } from 'react-icons/fi';
import { MdHome, MdArchitecture } from 'react-icons/md';
import { GiHammerNails } from 'react-icons/gi';

const ProjectDashboard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { project, loading, error } = useProject(id);
    const [showReportForm, setShowReportForm] = useState(false);
    const [showUploadForm, setShowUploadForm] = useState(false);

    const handleReportSubmit = (e) => {
        e.preventDefault();
        setShowReportForm(false);
        // Mock success
        alert('Daily Site Report submitted successfully!');
    };

    const handleUploadSubmit = (e) => {
        e.preventDefault();
        setShowUploadForm(false);
        // Mock success
        alert('Document uploaded successfully!');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-xl font-bold" style={{ color: theme.textPrimary }}>Loading project...</div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-xl font-bold text-red-600">{error || 'Project not found'}</div>
            </div>
        );
    }

    const moduleConfigs = [
        { id: 'architecture', name: 'Architecture', icon: <MdArchitecture className="text-3xl" />, color: 'emerald' },
        { id: 'interior', name: 'Interior', icon: <MdHome className="text-3xl" />, color: 'orange' },
        { id: 'construction', name: 'Construction', icon: <GiHammerNails className="text-3xl" />, color: 'blue' }
    ];

    const getStatusColor = (status) => {
        const colors = {
            'Planning': 'bg-blue-100 text-blue-800 border-blue-200',
            'In Progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
            'Ongoing': 'bg-green-100 text-green-800 border-green-200',
            'On Hold': 'bg-orange-100 text-orange-800 border-orange-200',
            'Completed': 'bg-emerald-100 text-emerald-800 border-emerald-200',
            'Cancelled': 'bg-red-100 text-red-800 border-red-200'
        };
        return colors[status] || 'bg-gray-800 text-gray-900 border-gray-800';
    };

    const budgetUsed = project.actualSpend || 0;
    const budgetPercentage = (budgetUsed / project.budget) * 100;

    const inputStyle = {
        backgroundColor: `${theme.iconBg}10`,
        borderColor: theme.cardBorder,
        color: theme.textPrimary
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-4 mb-2">
                        <h1 className="text-4xl font-black tracking-tight" style={{ color: theme.textPrimary }}>
                            {project.name}
                        </h1>
                        <span className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest border ${getStatusColor(project.status)}`}>
                            {project.status}
                        </span>
                    </div>
                    <p className="text-sm font-bold" style={{ color: theme.textMuted }}>
                        Project Code: <span className="font-black" style={{ color: theme.textPrimary }}>{project.projectCode}</span>
                    </p>
                </div>
                <button
                    onClick={() => navigate(`/projects/edit/${project._id}`)}
                    className="flex items-center gap-2 px-6 py-3 text-white rounded-xl font-bold text-sm transition-all"
                    style={{ background: theme.gradients.button }}
                >
                    <FiEdit /> Edit Project
                </button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {/* Progress */}
                <div className="card-premium p-6" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                    <div className="flex items-center justify-between mb-4">
                        <FiTrendingUp className="text-2xl" style={{ color: theme.primary }} />
                        <span className="text-3xl font-black" style={{ color: theme.textPrimary }}>{project.progress}%</span>
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest" style={{ color: theme.textMuted }}>Overall Progress</p>
                </div>

                {/* Budget */}
                <div className="card-premium p-6" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                    <div className="flex items-center justify-between mb-4">
                        <FiDollarSign className="text-2xl" style={{ color: theme.primary }} />
                        <span className="text-xl font-black" style={{ color: theme.textPrimary }}>₹{(project.budget / 100000).toFixed(1)}L</span>
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest" style={{ color: theme.textMuted }}>Total Budget</p>
                </div>

                {/* Location */}
                <div className="card-premium p-6" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                    <div className="flex items-center gap-3 mb-4">
                        <FiMapPin className="text-2xl" style={{ color: theme.primary }} />
                        <span className="text-sm font-black truncate" style={{ color: theme.textPrimary }}>{project.location}</span>
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest" style={{ color: theme.textMuted }}>Location</p>
                </div>

                {/* Client */}
                <div className="card-premium p-6" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                    <div className="flex items-center gap-3 mb-4">
                        <FiUsers className="text-2xl" style={{ color: theme.primary }} />
                        <span className="text-sm font-black truncate" style={{ color: theme.textPrimary }}>{project.client}</span>
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest" style={{ color: theme.textMuted }}>Client</p>
                </div>
            </div>

            {/* Progress Ring & Modules */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Progress Ring */}
                <div className="card-premium p-8 flex flex-col items-center justify-center" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                    <div className="relative w-48 h-48 mb-6">
                        <svg className="transform -rotate-90 w-48 h-48">
                            <circle
                                cx="96"
                                cy="96"
                                r="88"
                                stroke={theme.borderColor}
                                strokeWidth="12"
                                fill="none"
                            />
                            <circle
                                cx="96"
                                cy="96"
                                r="88"
                                stroke={theme.primary}
                                strokeWidth="12"
                                fill="none"
                                strokeDasharray={`${(project.progress / 100) * 553} 553`}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-black" style={{ color: theme.textPrimary }}>{project.progress}%</span>
                            <span className="text-xs font-black uppercase tracking-widest mt-2" style={{ color: theme.textMuted }}>Complete</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-black" style={{ color: theme.textPrimary }}>Overall Progress</h3>
                </div>

                {/* Modules */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {moduleConfigs.map(module => {
                        const moduleData = project.modules[module.id];
                        const isEnabled = moduleData?.enabled;
                        const status = moduleData?.status || 'LOCKED';

                        return (
                            <div
                                key={module.id}
                                className={`card-premium p-6 border-2 transition-all`}
                                style={{
                                    backgroundColor: theme.cardBg,
                                    borderColor: isEnabled ? theme.primary : theme.cardBorder
                                }}
                            >
                                <div className="flex flex-col items-center text-center select-none">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4`}
                                        style={{
                                            backgroundColor: isEnabled ? `${theme.primary}20` : `${theme.iconBg}10`,
                                            color: isEnabled ? theme.primary : theme.textMuted
                                        }}>
                                        {module.icon}
                                    </div>
                                    <h4 className="font-black text-lg mb-2" style={{ color: theme.textPrimary }}>{module.name}</h4>
                                    <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest ${status === 'ONGOING' ? 'bg-green-100 text-green-800' :
                                        status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                                            'bg-gray-800 text-gray-400'
                                        }`}>
                                        {status === 'LOCKED' ? '🔒 Locked' : status === 'ONGOING' ? '⚡ Ongoing' : '✅ Completed'}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Budget & Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Budget Tracking */}
                <div className="card-premium p-8" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                    <h3 className="text-xl font-black mb-6" style={{ color: theme.textPrimary }}>Budget Tracking</h3>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-bold" style={{ color: theme.textMuted }}>Total Budget</span>
                            <span className="text-lg font-black" style={{ color: theme.textPrimary }}>₹{(project.budget / 100000).toFixed(2)}L</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-bold" style={{ color: theme.textMuted }}>Actual Spend</span>
                            <span className="text-lg font-black text-orange-600">₹{(budgetUsed / 100000).toFixed(2)}L</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-bold" style={{ color: theme.textMuted }}>Remaining</span>
                            <span className="text-lg font-black text-green-600">₹{((project.budget - budgetUsed) / 100000).toFixed(2)}L</span>
                        </div>

                        <div className="pt-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-black uppercase tracking-widest" style={{ color: theme.textMuted }}>Budget Used</span>
                                <span className="text-sm font-black" style={{ color: theme.textPrimary }}>{budgetPercentage.toFixed(1)}%</span>
                            </div>
                            <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: `${theme.iconBg}20` }}>
                                <div
                                    className={`h-full rounded-full transition-all ${budgetPercentage > 90 ? 'bg-red-500' :
                                        budgetPercentage > 75 ? 'bg-orange-500' :
                                            'bg-green-500'
                                        }`}
                                    style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Timeline */}
                <div className="card-premium p-8" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                    <h3 className="text-xl font-black mb-6" style={{ color: theme.textPrimary }}>Status History</h3>

                    <div className="space-y-4">
                        {project.statusHistory?.map((history, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="flex flex-col items-center">
                                    <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-brand-600' : 'bg-gray-800'}`} style={index === 0 ? { background: theme.primary } : { background: theme.textMuted }} />
                                    {index < project.statusHistory.length - 1 && (
                                        <div className="w-0.5 h-8" style={{ backgroundColor: theme.borderColor }} />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase ${getStatusColor(history.status)}`}>
                                            {history.status}
                                        </span>
                                        <span className="text-xs font-bold" style={{ color: theme.textMuted }}>
                                            <FiCalendar className="inline mr-1" />
                                            {new Date(history.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Project Details */}
            {project.description && (
                <div className="card-premium p-8" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                    <h3 className="text-xl font-black mb-4" style={{ color: theme.textPrimary }}>Project Description</h3>
                    <p className="text-sm font-medium leading-relaxed" style={{ color: theme.textSecondary }}>
                        {project.description}
                    </p>
                </div>
            )}

            {/* Timeline */}
            <div className="card-premium p-8" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                <h3 className="text-xl font-black mb-6" style={{ color: theme.textPrimary }}>Project Timeline</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                            <FiClock className="text-green-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest" style={{ color: theme.textMuted }}>Start Date</p>
                            <p className="text-lg font-black" style={{ color: theme.textPrimary }}>
                                {new Date(project.start_date).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                            <FiClock className="text-red-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest" style={{ color: theme.textMuted }}>End Date</p>
                            <p className="text-lg font-black" style={{ color: theme.textPrimary }}>
                                {new Date(project.end_date).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Daily Site Reports & Documents */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Daily Site Reports */}
                <div className="card-premium p-8" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-black" style={{ color: theme.textPrimary }}>Daily Site Reports</h3>
                        <button
                            onClick={() => setShowReportForm(true)}
                            className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                            style={{ backgroundColor: `${theme.primary}10`, color: theme.primary }}
                        >
                            + Add Report
                        </button>
                    </div>

                    <div className="space-y-4">
                        {[1, 2, 3].map((_, index) => (
                            <div key={index} className="flex items-center justify-between p-4 rounded-xl border transition-all group" style={{ borderColor: theme.borderColor }}>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${theme.primary}10`, color: theme.primary }}>
                                        <FiFileText className="text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold" style={{ color: theme.textPrimary }}>Site Report #{2024001 + index}</p>
                                        <p className="text-xs" style={{ color: theme.textMuted }}>{new Date().toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <span className="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase rounded-md">Verified</span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors" style={{ color: theme.primary }}>
                        View All Reports
                    </button>
                </div>

                {/* Documents */}
                <div className="card-premium p-8" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-black" style={{ color: theme.textPrimary }}>Documents</h3>
                        <button
                            onClick={() => setShowUploadForm(true)}
                            className="flex items-center gap-2 px-4 py-2 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                            style={{ background: theme.gradients.button }}
                        >
                            <FiUploadCloud /> Upload
                        </button>
                    </div>

                    <div className="space-y-4">
                        {[
                            { name: 'Project_Blueprints.pdf', size: '24 MB', type: 'PDF' },
                            { name: 'Contract_Agreement.docx', size: '2.5 MB', type: 'DOC' },
                            { name: 'Site_Plan_v2.jpg', size: '5.1 MB', type: 'IMG' }
                        ].map((doc, index) => (
                            <div key={index} className="flex items-center justify-between p-4 rounded-xl border transition-all" style={{ borderColor: theme.borderColor }}>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                                        <FiFileText className="text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold truncate max-w-[150px]" style={{ color: theme.textPrimary }}>{doc.name}</p>
                                        <p className="text-xs" style={{ color: theme.textMuted }}>{doc.size} • {doc.type}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 rounded-lg transition-colors" style={{ color: theme.textMuted }} title="Download">
                                        <FiDownload />
                                    </button>
                                    <button className="p-2 rounded-lg transition-colors" style={{ color: theme.textMuted }} title="Delete">
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors" style={{ color: theme.primary }}>
                        View All Documents
                    </button>
                </div>
            </div>


            {/* Daily Site Report Modal */}
            {
                showReportForm && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                        <div className="rounded-2xl w-full max-w-2xl shadow-2xl transform scale-100 transition-all" style={{ backgroundColor: theme.cardBg }}>
                            <div className="p-6 border-b" style={{ borderColor: theme.borderColor }}>
                                <h3 className="text-xl font-black" style={{ color: theme.textPrimary }}>New Daily Site Report</h3>
                                <p className="text-sm mt-1" style={{ color: theme.textSecondary }}>Record today's progress and issues</p>
                            </div>
                            <form onSubmit={handleReportSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>Report Content</label>
                                    <textarea
                                        className="w-full p-4 rounded-xl outline-none resize-none font-medium text-sm focus:ring-2"
                                        style={inputStyle}
                                        rows="6"
                                        placeholder="Describe work completed, materials used, and any issues encountered..."
                                        required
                                    ></textarea>
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowReportForm(false)}
                                        className="flex-1 px-4 py-3 rounded-xl font-bold transition-colors"
                                        style={{ backgroundColor: `${theme.iconBg}20`, color: theme.textPrimary }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-3 text-white rounded-xl font-bold transition-colors shadow-lg"
                                        style={{ background: theme.gradients.button }}
                                    >
                                        Submit Report
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            {/* Document Upload Modal */}
            {
                showUploadForm && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                        <div className="rounded-2xl w-full max-w-md shadow-2xl transform scale-100 transition-all" style={{ backgroundColor: theme.cardBg }}>
                            <div className="p-6 border-b" style={{ borderColor: theme.borderColor }}>
                                <h3 className="text-xl font-black" style={{ color: theme.textPrimary }}>Upload Document</h3>
                                <p className="text-sm mt-1" style={{ color: theme.textSecondary }}>Add drawings, contracts, or specs</p>
                            </div>
                            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>Document Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Revised Floor Plan"
                                        className="w-full p-3 border rounded-xl outline-none font-medium focus:ring-2"
                                        style={inputStyle}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>Category</label>
                                    <select className="w-full p-3 border rounded-xl outline-none font-medium focus:ring-2" style={inputStyle}>
                                        <option>Drawing</option>
                                        <option>Contract</option>
                                        <option>BOQ</option>
                                        <option>Report</option>
                                        <option>Invoice</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>File</label>
                                    <div className="border-2 border-dashed rounded-xl p-6 text-center transition-colors hover:opacity-80"
                                        style={{ borderColor: theme.borderColor, backgroundColor: `${theme.iconBg}05` }}>
                                        <FiUploadCloud className="mx-auto text-3xl mb-2" style={{ color: theme.textMuted }} />
                                        <p className="text-sm font-medium" style={{ color: theme.textSecondary }}>Click to browse or drag file here</p>
                                        <input type="file" className="hidden" id="file-upload" />
                                        <label htmlFor="file-upload" className="absolute inset-0 cursor-pointer"></label>
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowUploadForm(false)}
                                        className="flex-1 px-4 py-3 rounded-xl font-bold transition-colors"
                                        style={{ backgroundColor: `${theme.iconBg}20`, color: theme.textPrimary }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-3 text-white rounded-xl font-bold transition-colors shadow-lg"
                                        style={{ background: theme.gradients.button }}
                                    >
                                        Upload File
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default ProjectDashboard;
