import React, { useState } from 'react';
import { FiFileText, FiMapPin, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const SuperAdminDailyReports = () => {
    // Mock data for global daily reports
    const [reports, setReports] = useState([
        { id: 1, project: 'Skyline Residency', company: 'HARR Construction', supervisor: 'Robert Fox', status: 'Submitted', type: 'Daily Progress', time: '10:30 AM', items: 12, summary: 'Foundation work completed on sector A. Column casting in progress.' },
        { id: 2, project: 'Metro Bridge Ph-II', company: 'ABC Builders', supervisor: 'Jane Cooper', status: 'Pending', type: 'Site Safety', time: '09:15 AM', items: 8, summary: 'Safety drill conducted. Minor harness issue noted and corrected.' },
        { id: 3, project: 'Green Valley Villas', company: 'XYZ Infra', supervisor: 'Guy Hawkins', status: 'Critical', type: 'Material Shortage', time: 'Yesterday', items: 5, summary: 'Cement delivery delayed by 48 hours. Mixing station idle.' },
        { id: 4, project: 'Industrial Park', company: 'HARR Construction', supervisor: 'Cody Fisher', status: 'Submitted', type: 'Quality Audit', time: 'Yesterday', items: 15, summary: 'Structural integrity test passed for main warehouse block.' },
        { id: 5, project: 'Smart City Project', company: 'ABC Builders', supervisor: 'Esther Howard', status: 'Submitted', type: 'Daily Progress', time: '2 days ago', items: 10, summary: 'Electrical conduit layout started for residential tower 1.' },
    ]);

    const [isConsolidating, setIsConsolidating] = useState(false);
    const [streamFilter, setStreamFilter] = useState('all'); // all, critical
    const [selectedReport, setSelectedReport] = useState(null);

    const handleAction = (id, action) => {
        if (action === 'verify') {
            setReports(reports.map(r => r.id === id ? { ...r, status: 'Submitted' } : r));
        } else if (action === 'flag') {
            setReports(reports.map(r => r.id === id ? { ...r, status: 'Critical' } : r));
        }
    };

    const handleVerifyAll = () => {
        if (window.confirm('Verify all pending and critical reports across all enterprise tenants?')) {
            setReports(reports.map(r => ({ ...r, status: 'Submitted' })));
            alert('Batch Verification Complete: All site streams are now marked as verified.');
        }
    };

    const handleConsolidatePDF = () => {
        setIsConsolidating(true);
        setTimeout(() => {
            setIsConsolidating(false);
            alert('PDF Consolidation Complete: Master Site Intelligence report for all active projects has been generated and is ready for download.');
        }, 2000);
    };

    const filteredReports = streamFilter === 'all'
        ? reports
        : reports.filter(r => r.status === 'Critical');

    return (
        <div className="space-y-8 pb-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Daily Logs</h1>
                    <p className="text-sm font-bold text-gray-900 mt-1">Global Site Intelligence & Real-time Log Monitoring</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleConsolidatePDF}
                        disabled={isConsolidating}
                        className={`px-5 py-2.5 rounded-xl border border-brand-100 text-brand-600 text-[11px] font-black uppercase tracking-widest transition-all shadow-sm ${isConsolidating ? 'bg-gray-50 opacity-50 cursor-not-allowed' : 'bg-white hover:bg-brand-50'
                            }`}
                    >
                        {isConsolidating ? 'Processing...' : 'Consolidate PDF'}
                    </button>
                    <button className="px-5 py-2.5 rounded-xl bg-brand-600 text-white text-[11px] font-black uppercase tracking-widest hover:bg-brand-700 shadow-premium transition-all" onClick={handleVerifyAll}>Verify All</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Reports Today', value: '24', detail: 'Across 12 Projects', icon: <FiFileText />, color: 'text-brand-600', bg: 'bg-brand-50' },
                    { label: 'Verification Rate', value: '94%', detail: 'Auto-verified', icon: <FiCheckCircle />, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Flags Raised', value: '03', detail: 'Needs Attention', icon: <FiAlertCircle />, color: 'text-red-600', bg: 'bg-red-50' },
                ].map((stat, i) => (
                    <div key={i} className="card-premium p-6 flex flex-col gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${stat.bg} ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-800 uppercase tracking-widest">{stat.label}</p>
                            <h3 className="text-3xl font-black text-gray-900 mt-1">{stat.value}</h3>
                            <p className="text-[11px] font-bold text-gray-900 mt-1 italic">{stat.detail}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div className="card-premium overflow-hidden">
                    <div className="p-8 border-b border-brand-50 bg-brand-50/30 flex justify-between items-center">
                        <h2 className="text-xl font-black text-gray-900">Live Global Feed</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setStreamFilter('all')}
                                className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${streamFilter === 'all' ? 'bg-brand-600 text-white shadow-md' : 'bg-white border border-brand-100 text-brand-400 hover:bg-brand-50'
                                    }`}
                            >
                                All Streams
                            </button>
                            <button
                                onClick={() => setStreamFilter('critical')}
                                className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${streamFilter === 'critical' ? 'bg-red-600 text-white shadow-md' : 'bg-white border border-brand-100 text-brand-400 hover:bg-red-50'
                                    }`}
                            >
                                Critical Only
                            </button>
                        </div>
                    </div>
                    <div className="divide-y divide-brand-50">
                        {filteredReports.map((report) => (
                            <div key={report.id} className="group p-8 hover:bg-brand-50/30 transition-all flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div
                                        onClick={() => setSelectedReport(report)}
                                        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm cursor-pointer transition-all hover:scale-105 active:scale-95 ${report.status === 'Critical' ? 'bg-red-50 text-red-600' :
                                            report.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                                                'bg-brand-50 text-brand-600'
                                            }`}
                                    >
                                        <FiFileText />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors">{report.project}</h4>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-[10px] font-black text-brand-500 uppercase tracking-widest">{report.type}</span>
                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                            <span className="text-[10px] font-black text-gray-800 uppercase tracking-widest">{report.company}</span>
                                        </div>
                                        <div className="flex items-center gap-4 mt-3 text-[11px] font-bold text-gray-900">
                                            <span className="flex items-center gap-1"><FiMapPin className="text-brand-600" /> Ground Floor Slab</span>
                                            <span className="flex items-center gap-1"><FiClock className="text-brand-600" /> {report.time}</span>
                                            <span className="flex items-center gap-1 text-brand-600 bg-brand-50 px-2 py-0.5 rounded-lg">{report.items} check-items</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-gray-900">{report.supervisor}</p>
                                        <p className="text-[10px] font-black text-gray-800 uppercase tracking-tighter">Field Supervisor</p>
                                    </div>
                                    <span className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest border rounded-xl ${report.status === 'Submitted' ? 'bg-green-50 text-green-700 border-green-200' :
                                        report.status === 'Critical' ? 'bg-red-50 text-red-700 border-red-200' :
                                            'bg-amber-50 text-amber-700 border-amber-200'
                                        }`}>
                                        {report.status}
                                    </span>
                                    <button
                                        onClick={() => handleAction(report.id, report.status === 'Submitted' ? 'flag' : 'verify')}
                                        className={`w-10 h-10 rounded-xl bg-white border flex items-center justify-center transition-all active:scale-95 shadow-sm ${report.status === 'Submitted' ? 'text-red-600 border-red-100 hover:bg-red-600 hover:text-white' : 'text-brand-600 border-brand-100 hover:bg-brand-600 hover:text-white'
                                            }`}
                                        title={report.status === 'Submitted' ? 'Flag as Critical' : 'Verify Report'}
                                    >
                                        {report.status === 'Submitted' ? '!' : '✓'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-6 bg-brand-50/10 text-center border-t border-brand-50">
                        <button className="text-[11px] font-black text-brand-600 uppercase tracking-[0.2em] hover:text-brand-800 transition-colors">Load Archive Clusters</button>
                    </div>
                </div>
            </div>

            {/* Daily Report Inspection Modal */}
            {selectedReport && (
                <div className="fixed inset-0 bg-brand-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto p-4 border border-brand-100 animate-fade-in-up">
                        <div className="p-8 border-b border-brand-50 bg-brand-50/30 flex justify-between items-center text-left">
                            <div>
                                <h2 className="text-xl font-black text-gray-900">{selectedReport.project}</h2>
                                <p className="text-xs font-black text-gray-800 uppercase tracking-widest mt-1">
                                    Full Daily Inspection Signature
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedReport(null)}
                                className="w-10 h-10 rounded-full hover:bg-white flex items-center justify-center text-gray-900 hover:text-gray-900 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-8 space-y-8">
                            <div className="grid grid-cols-2 gap-8 text-left">
                                <div>
                                    <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Deployment Type</label>
                                    <p className="font-bold text-gray-900 mt-1">{selectedReport.type}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Site Supervisor</label>
                                    <p className="font-bold text-gray-900 mt-1">{selectedReport.supervisor}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Entity Context</label>
                                    <p className="font-bold text-gray-900 mt-1">{selectedReport.company}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Operational Status</label>
                                    <p className={`font-bold mt-1 ${selectedReport.status === 'Critical' ? 'text-red-600' : 'text-green-600'}`}>
                                        {selectedReport.status}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-brand-50/30 p-6 rounded-2xl border border-brand-50 text-left">
                                <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">Progress Intelligence Summary</label>
                                <p className="text-gray-900 font-medium mt-3 leading-relaxed">
                                    {selectedReport.summary}
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setSelectedReport(null)}
                                    className="flex-1 px-4 py-4 rounded-2xl bg-gray-50 text-gray-800 text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100"
                                >
                                    Close Inspection
                                </button>
                                <button
                                    onClick={() => {
                                        handleAction(selectedReport.id, 'verify');
                                        setSelectedReport(null);
                                    }}
                                    className="flex-2 px-8 py-4 bg-brand-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-brand-700 shadow-premium transition-all active:scale-95"
                                >
                                    Verify Site Data
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuperAdminDailyReports;
