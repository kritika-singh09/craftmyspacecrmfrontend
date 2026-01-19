import { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../hooks/useAuth';
import { FiUser, FiPhone, FiShield, FiTool, FiBriefcase, FiAlertCircle, FiEdit2, FiStar, FiCheckCircle } from 'react-icons/fi';

const ContractorProfile = ({ contractor, onClose, onEdit }) => {
    const { theme } = useTheme();
    const { token } = useAuth();
    const [fullData, setFullData] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${API_URL}/construction/contractors/${contractor._id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setFullData(data);
                }
            } catch (error) {
                console.error("Error fetching details:", error);
            } finally {
                setLoading(false);
            }
        };
        if (contractor._id) fetchData();
    }, [contractor._id, token]);

    if (loading) return <div className="p-10 text-white font-bold">Loading Profile...</div>;
    if (!fullData) return <div className="p-10 text-white font-bold">Error loading profile.</div>;

    const {
        name, type, specialization, contactPerson, phone, email, address,
        legal, skills, compliance, workOrders
    } = fullData;

    const Section = ({ title, icon, children }) => (
        <div className="card-premium p-6 rounded-2xl mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <div className="flex items-center gap-3 mb-4 pb-2 border-b" style={{ borderColor: theme.cardBorder }}>
                <span className="text-blue-500 text-xl">{icon}</span>
                <h3 className="text-sm font-black uppercase tracking-widest" style={{ color: theme.textPrimary }}>{title}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                {children}
            </div>
        </div>
    );

    const Field = ({ label, value, fullWidth = false, isTag = false, color = 'blue' }) => (
        <div className={fullWidth ? "col-span-2" : ""}>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1" style={{ color: theme.textSecondary }}>{label}</p>
            {isTag ? (
                <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-${color}-50 text-${color}-600 dark:bg-${color}-900/30 dark:text-${color}-400`}>
                    {value || 'N/A'}
                </span>
            ) : (
                <p className="text-sm font-bold break-words" style={{ color: theme.textPrimary }}>{value || 'N/A'}</p>
            )}
        </div>
    );

    return (
        <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col h-[90vh]" style={{ backgroundColor: theme.background }}>
            {/* Header */}
            <div className="relative h-48 flex items-end p-8" style={{ background: theme.gradients.primary }}>
                <div className="absolute top-6 right-6 flex gap-3">
                    <button onClick={onEdit} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/20 hover:bg-white/30 text-white transition-all transform hover:scale-110"><FiEdit2 /></button>
                    <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all">✕</button>
                </div>
                <div className="flex items-end gap-6 w-full">
                    <div className="w-24 h-24 rounded-2xl bg-white shadow-xl flex items-center justify-center text-4xl font-black text-slate-800 transform translate-y-4 border-4 border-white dark:border-slate-800">
                        {name.charAt(0)}
                    </div>
                    <div className="mb-2">
                        <div className="flex items-center gap-3 mb-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-white/20 text-white backdrop-blur-sm">{type}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-amber-500/20 text-amber-100 backdrop-blur-sm border border-amber-500/40">{specialization}</span>
                        </div>
                        <h1 className="text-3xl font-black text-white leading-none">{name}</h1>
                        <div className="flex text-amber-400 text-sm mt-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                                <FiStar key={i} className={i < (skills?.rating || 3) ? "fill-current" : "opacity-30"} />
                            ))}
                        </div>
                    </div>
                    <div className="ml-auto text-white text-right mb-2">
                        <p className="text-[10px] font-bold uppercase opacity-60">Compliance Score</p>
                        <div className="flex items-center justify-end gap-2">
                            {compliance?.safetyTraining ? <FiCheckCircle className="text-emerald-400" /> : <FiAlertCircle className="text-red-400" />}
                            <span className="text-xl font-black">{compliance?.rating}/5</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 pt-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <Section title="Basic & Contact" icon={<FiUser />}>
                            <Field label="Contact Person" value={contactPerson} />
                            <Field label="Phone" value={phone} />
                            <Field label="Email" value={email} />
                            <Field label="Address" value={address} fullWidth />
                        </Section>

                        <Section title="Active Projects & Work Orders" icon={<FiBriefcase />}>
                            {workOrders && workOrders.length > 0 ? (
                                <div className="col-span-2 space-y-3">
                                    {workOrders.map((wo, idx) => (
                                        <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h4 className="font-bold text-sm" style={{ color: theme.textPrimary }}>{wo.projectName || 'Project Link Pending'}</h4>
                                                    <p className="text-xs opacity-60">{wo.scopeOfWork}</p>
                                                </div>
                                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${wo.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>
                                                    {wo.status}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-xs font-mono opacity-80">
                                                <span>{wo.contractValue ? `₹${wo.contractValue.toLocaleString()}` : 'Rate Based'}</span>
                                                <span>{new Date(wo.startDate || Date.now()).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="col-span-2 text-center py-6 opacity-50 text-xs font-bold uppercase tracking-wider">No active work orders</div>
                            )}
                        </Section>

                        <Section title="Legal & Banking" icon={<FiShield />}>
                            <Field label="PAN" value={legal?.pan} />
                            <Field label="GST" value={legal?.gst} />
                            <Field label="License No." value={legal?.licenseNumber} />
                            <Field label="KYC Status" value={legal?.kycStatus} isTag color={legal?.kycStatus === 'Verified' ? 'green' : 'amber'} />
                            <div className="col-span-2 border-t pt-4 mt-2 border-dashed opacity-70">
                                <Field label="Bank Name" value={legal?.bankDetails?.bankName} />
                                <div className="grid grid-cols-2 mt-2">
                                    <Field label="Account No." value={legal?.bankDetails?.accountNumber} />
                                    <Field label="IFSC" value={legal?.bankDetails?.ifsc} />
                                </div>
                            </div>
                        </Section>
                    </div>

                    <div className="space-y-6">
                        <Section title="Expertise" icon={<FiTool />}>
                            <Field label="Specialization" value={specialization} isTag color="purple" />
                            <Field label="Skill Level" value={skills?.level} isTag color="blue" />
                            <Field label="Experience" value={`${skills?.experienceYears || 0} Years`} />
                            <Field label="Standard Rates" value={skills?.standardRates} fullWidth />
                        </Section>

                        <div className="card-premium p-6 rounded-2xl" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                            <h3 className="text-sm font-black uppercase tracking-widest mb-4" style={{ color: theme.textPrimary }}>Compliance Checklist</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                    <span className="text-xs font-bold">Safety Training</span>
                                    {compliance?.safetyTraining ? <FiCheckCircle className="text-emerald-500" /> : <FiAlertCircle className="text-amber-500" />}
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                    <span className="text-xs font-bold">PPE Compliant</span>
                                    {compliance?.ppeCompliant ? <FiCheckCircle className="text-emerald-500" /> : <FiAlertCircle className="text-amber-500" />}
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                    <span className="text-xs font-bold">Quality Issues</span>
                                    <span className={`text-xs font-black px-2 py-0.5 rounded ${compliance?.qualityIssues > 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>{compliance?.qualityIssues || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContractorProfile;
