import { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useMaterials } from '../../../hooks/useMaterials.jsx';
import MaterialMasterForm from './MaterialMasterForm';
import { FiPlus, FiDatabase, FiTag } from 'react-icons/fi';

const MaterialMasterList = () => {
    const { theme } = useTheme();
    const { getMaterialsMaster } = useMaterials();
    const [materials, setMaterials] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchMaterials = async () => {
        try {
            const data = await getMaterialsMaster();
            setMaterials(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMaterials();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-black" style={{ color: theme.textPrimary }}>Material Registry</h3>
                    <p className="text-xs opacity-60" style={{ color: theme.textSecondary }}>Standardized Item Codes & Specifications</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all hover:-translate-y-1"
                    style={{ background: theme.gradients.button }}
                >
                    <FiPlus /> Add Item
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {materials.map(mat => (
                    <div key={mat._id} className="p-6 rounded-2xl border hover:shadow-md transition-all group" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg bg-slate-50 text-slate-500">
                                <FiDatabase />
                            </div>
                            <span className="px-2 py-1 rounded-md bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                {mat.itemCode}
                            </span>
                        </div>
                        <h4 className="font-bold text-sm mb-1" style={{ color: theme.textPrimary }}>{mat.name}</h4>
                        <div className="flex gap-2 mb-4">
                            <span className="text-[10px] uppercase font-bold text-blue-500">{mat.category}</span>
                            <span className="text-[10px] text-slate-400">•</span>
                            <span className="text-[10px] uppercase font-bold text-slate-500">{mat.unit}</span>
                        </div>

                        <div className="pt-4 border-t space-y-2" style={{ borderColor: theme.cardBorder }}>
                            <div className="flex justify-between text-xs">
                                <span className="opacity-50">Brand</span>
                                <span className="font-bold">{mat.brand || 'Generic'}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="opacity-50">Grade</span>
                                <span className="font-bold">{mat.grade || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                ))}

                {materials.length === 0 && !loading && (
                    <div className="col-span-full py-12 text-center opacity-50 text-sm">No materials defined in master registry.</div>
                )}
            </div>

            {showForm && (
                <MaterialMasterForm
                    onClose={() => setShowForm(false)}
                    onSuccess={() => {
                        setShowForm(false);
                        fetchMaterials();
                    }}
                />
            )}
        </div>
    );
};

export default MaterialMasterList;
