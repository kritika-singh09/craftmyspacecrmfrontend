import { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useMaterials } from '../../../hooks/useMaterials.jsx';
import { useProjects } from '../../../hooks/useProjects.jsx';
import { FiFileText, FiCheckCircle, FiClock, FiPlus, FiX } from 'react-icons/fi';

const IndentManager = () => {
    const { theme } = useTheme();
    const { getIndents, createIndent, approveIndent, issueIndent, getMaterialsMaster } = useMaterials();
    const { projects } = useProjects();

    const [indents, setIndents] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        materialMasterId: '',
        project: '',
        quantity: '',
        purpose: '',
        priority: 'NORMAL',
        remarks: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [indentsData, materialsData] = await Promise.all([
                getIndents(),
                getMaterialsMaster()
            ]);
            setIndents(indentsData);
            setMaterials(materialsData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createIndent(formData);
            setShowForm(false);
            fetchData();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleAction = async (id, action) => {
        try {
            if (action === 'APPROVE') await approveIndent(id, 'Approved by Manager');
            if (action === 'ISSUE') await issueIndent(id);
            fetchData();
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-black" style={{ color: theme.textPrimary }}>Material Requests (Indents)</h3>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all hover:-translate-y-1"
                    style={{ background: theme.gradients.button }}
                >
                    <FiPlus /> New Indent
                </button>
            </div>

            <div className="overflow-hidden rounded-2xl border" style={{ borderColor: theme.cardBorder }}>
                <table className="w-full text-left border-collapse">
                    <thead style={{ backgroundColor: `${theme.iconBg}05` }}>
                        <tr>
                            <th className="p-4 text-[10px] font-black uppercase tracking-widest opacity-60">ID</th>
                            <th className="p-4 text-[10px] font-black uppercase tracking-widest opacity-60">Material</th>
                            <th className="p-4 text-[10px] font-black uppercase tracking-widest opacity-60">Qty</th>
                            <th className="p-4 text-[10px] font-black uppercase tracking-widest opacity-60">Project</th>
                            <th className="p-4 text-[10px] font-black uppercase tracking-widest opacity-60">Priority</th>
                            <th className="p-4 text-[10px] font-black uppercase tracking-widest opacity-60">Status</th>
                            <th className="p-4 text-[10px] font-black uppercase tracking-widest opacity-60 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y" style={{ borderColor: theme.cardBorder }}>
                        {indents.map(indent => (
                            <tr key={indent._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="p-4 text-xs font-bold">{indent.requestId}</td>
                                <td className="p-4">
                                    <p className="text-xs font-black" style={{ color: theme.textPrimary }}>{indent.materialMaster?.name}</p>
                                    <p className="text-[10px] opacity-60">{indent.materialMaster?.itemCode}</p>
                                </td>
                                <td className="p-4 text-xs font-bold">{indent.quantity} {indent.materialMaster?.unit}</td>
                                <td className="p-4 text-xs font-medium opacity-80">{indent.project?.name || 'N/A'}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${indent.priority === 'CRITICAL' ? 'bg-red-100 text-red-600' :
                                        indent.priority === 'URGENT' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                        {indent.priority}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${indent.status === 'ISSUED' ? 'bg-green-500' :
                                            indent.status === 'APPROVED' ? 'bg-blue-500' : 'bg-amber-500'
                                            }`}></span>
                                        <span className="text-xs font-bold">{indent.status}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-right">
                                    {indent.status === 'PENDING' && (
                                        <button onClick={() => handleAction(indent._id, 'APPROVE')} className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-blue-100">Approve</button>
                                    )}
                                    {indent.status === 'APPROVED' && (
                                        <button onClick={() => handleAction(indent._id, 'ISSUE')} className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-green-100">Issue</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* NEW INDENT MODAL */}
            {showForm && (
                <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-[100] p-4 bg-slate-900/40">
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col" style={{ backgroundColor: theme.cardBg }}>
                        <div className="p-6 text-white flex justify-between items-center" style={{ background: theme.gradients.primary }}>
                            <h2 className="text-xl font-black uppercase tracking-tight">Raise Indent</h2>
                            <button onClick={() => setShowForm(false)} className="text-white"><FiX /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-4">
                            <div>
                                <label className="text-xs font-bold opacity-60 mb-1 block">Material</label>
                                <select
                                    className="w-full p-3 rounded-xl border bg-transparent font-bold text-xs"
                                    value={formData.materialMasterId}
                                    onChange={e => setFormData({ ...formData, materialMasterId: e.target.value })}
                                    required
                                >
                                    <option value="">Select Material</option>
                                    {materials.map(m => <option key={m._id} value={m._id}>{m.name} ({m.itemCode})</option>)}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold opacity-60 mb-1 block">Project</label>
                                    <select
                                        className="w-full p-3 rounded-xl border bg-transparent font-bold text-xs"
                                        value={formData.project}
                                        onChange={e => setFormData({ ...formData, project: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Project</option>
                                        {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold opacity-60 mb-1 block">Quantity</label>
                                    <input
                                        type="number"
                                        className="w-full p-3 rounded-xl border bg-transparent font-bold text-xs"
                                        value={formData.quantity}
                                        onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold opacity-60 mb-1 block">Priority</label>
                                <select
                                    className="w-full p-3 rounded-xl border bg-transparent font-bold text-xs"
                                    value={formData.priority}
                                    onChange={e => setFormData({ ...formData, priority: e.target.value })}
                                >
                                    <option value="NORMAL">Normal</option>
                                    <option value="URGENT">Urgent</option>
                                    <option value="CRITICAL">Critical</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold opacity-60 mb-1 block">Purpose of Request</label>
                                <textarea
                                    className="w-full p-3 rounded-xl border bg-transparent font-bold text-xs h-20 resize-none"
                                    value={formData.purpose}
                                    onChange={e => setFormData({ ...formData, purpose: e.target.value })}
                                    placeholder="e.g. Slab Casting, Wall Plastering..."
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <label className="text-xs font-bold opacity-60 mb-1 block">Additional Remarks</label>
                                <textarea
                                    className="w-full p-3 rounded-xl border bg-transparent font-bold text-xs h-16 resize-none"
                                    value={formData.remarks}
                                    onChange={e => setFormData({ ...formData, remarks: e.target.value })}
                                ></textarea>
                            </div>
                            <button className="w-full py-3 rounded-xl text-white font-black uppercase tracking-wider text-xs shadow-lg mt-4" style={{ background: theme.gradients.button }}>Submit Request</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IndentManager;
