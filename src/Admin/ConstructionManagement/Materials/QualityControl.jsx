import { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useMaterials } from '../../../hooks/useMaterials.jsx';
import { FiCheckCircle, FiXCircle, FiClock, FiSearch } from 'react-icons/fi';

const QualityControl = () => {
    const { theme } = useTheme();
    const { getQCRecords } = useMaterials();
    const [records, setRecords] = useState([]);

    useEffect(() => {
        fetchQC();
    }, []);

    const fetchQC = async () => {
        try {
            const res = await getQCRecords();
            const data = await res.json();
            setRecords(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-black" style={{ color: theme.textPrimary }}>Quality Verification Logs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {records.map(rec => (
                    <div key={rec._id} className="p-6 rounded-2xl border flex flex-col" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="font-bold text-sm mb-1" style={{ color: theme.textPrimary }}>{rec.batch?.batchNumber}</h4>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-50" style={{ color: theme.textSecondary }}>{rec.materialMaster?.name}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest ${rec.qualityStatus === 'APPROVED' ? 'bg-green-50 text-green-600' :
                                rec.qualityStatus === 'REJECTED' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                                }`}>
                                {rec.qualityStatus}
                            </span>
                        </div>

                        <div className="space-y-2 mb-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-xs">
                            <div className="flex justify-between">
                                <span className="opacity-60">Tested By</span>
                                <span className="font-bold">{rec.inspectionDetails?.inspector?.name || 'QC Team'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="opacity-60">Date</span>
                                <span className="font-bold">{new Date(rec.testDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="opacity-60">Test Cert</span>
                                <span className="font-bold text-blue-500 cursor-pointer">View PDF</span>
                            </div>
                        </div>

                        {rec.qualityStatus === 'REJECTED' && (
                            <div className="mt-auto p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-xs font-bold">
                                ⚠️ Reason: {rec.rejectionReason}
                            </div>
                        )}
                    </div>
                ))}

                {records.length === 0 && (
                    <div className="col-span-full py-12 text-center opacity-50 text-sm">No quality records found.</div>
                )}
            </div>
        </div>
    );
};

export default QualityControl;
