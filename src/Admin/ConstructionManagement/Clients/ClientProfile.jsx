import { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../hooks/useAuth';
import { FiUser, FiPhone, FiMapPin, FiShield, FiFileText, FiDollarSign, FiAlertTriangle, FiActivity, FiEdit2 } from 'react-icons/fi';

const ClientProfile = ({ client, onClose, onEdit }) => {
    const { theme } = useTheme();
    const { token } = useAuth();
    const [fullClientData, setFullClientData] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        const fetchClientDetails = async () => {
            try {
                const res = await fetch(`${API_URL}/construction/clients/${client._id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setFullClientData(data);
                }
            } catch (error) {
                console.error("Error fetching client details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (client._id) {
            fetchClientDetails();
        }
    }, [client._id, token]);

    if (loading) return <div className="text-white p-10 font-bold">Loading Profile...</div>;
    if (!fullClientData) return <div className="text-white p-10 font-bold">Error loading profile.</div>;

    const {
        name, type, authorizedContact, phone, email, address,
        legal, contract, financial, communication, site, riskProfile,
        projects, computedStats
    } = fullClientData;

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
            {/* Header / Hero */}
            <div className="relative h-48 flex items-end p-8" style={{ background: theme.gradients.primary }}>
                <div className="absolute top-6 right-6 flex gap-3">
                    <button onClick={onEdit} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/20 hover:bg-white/30 text-white transition-all transform hover:scale-110">
                        <FiEdit2 />
                    </button>
                    <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all">
                        ✕
                    </button>
                </div>
                <div className="flex items-end gap-6 w-full">
                    <div className="w-24 h-24 rounded-2xl bg-white shadow-xl flex items-center justify-center text-4xl font-black text-slate-800 transform translate-y-4 border-4 border-white dark:border-slate-800">
                        {name.charAt(0)}
                    </div>
                    <div className="mb-2">
                        <div className="flex items-center gap-3 mb-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-white/20 text-white backdrop-blur-sm">{type}</span>
                            {riskProfile?.riskTag === 'High Risk' && <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-red-500 text-white shadow-lg animate-pulse">High Risk</span>}
                        </div>
                        <h1 className="text-3xl font-black text-white leading-none">{name}</h1>
                        <p className="text-white/80 font-bold text-sm mt-1 flex items-center gap-2">
                            <FiUser className="inline" /> {authorizedContact} <span className="opacity-40">|</span> <FiPhone className="inline" /> {phone}
                        </p>
                    </div>
                    <div className="ml-auto flex gap-6 text-white text-right mb-2">
                        <div>
                            <p className="text-[10px] font-bold uppercase opacity-60">Total Contract Value</p>
                            <p className="text-2xl font-black">₹{computedStats?.totalContractValue?.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase opacity-60">Projects</p>
                            <div className="flex gap-2 items-center justify-end">
                                <span className="text-2xl font-black">{computedStats?.activeProjects}</span>
                                <span className="text-xs font-bold opacity-60">Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Scrollable */}
            <div className="flex-1 overflow-y-auto p-8 pt-12">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Core Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <Section title="Contact & Address" icon={<FiMapPin />}>
                            <Field label="Email Address" value={email} />
                            <Field label="Phone Contact" value={phone} />
                            <Field label="Registered Address" value={address?.registered} fullWidth />
                            <Field label="Site Address" value={address?.site} fullWidth />
                        </Section>

                        <Section title="Contract & Commercials" icon={<FiFileText />}>
                            <Field label="Contract Type" value={contract?.type} isTag color="purple" />
                            <Field label="Contract Value" value={`₹${contract?.value?.toLocaleString()}`} />
                            <Field label="Payment Terms" value={contract?.paymentTerms} />
                            <Field label="Retention" value={`${contract?.retentionPercentage}%`} />
                            <Field label="Defect Liability" value={contract?.defectLiabilityPeriod} />
                            <Field label="Start Date" value={contract?.startDate ? new Date(contract.startDate).toLocaleDateString() : '-'} />
                            <Field label="End Date" value={contract?.endDate ? new Date(contract.endDate).toLocaleDateString() : '-'} />
                        </Section>

                        <Section title="Communication & Approvals" icon={<FiPhone />}>
                            <Field label="Preferred Mode" value={communication?.preferredMode} isTag color="green" />
                            <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <div>
                                    <p className="text-[9px] font-black uppercase opacity-50 mb-1">Client Side Approver</p>
                                    <p className="text-xs font-bold">{communication?.approvers?.clientSide || 'Not Set'}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] font-black uppercase opacity-50 mb-1">Design Authority</p>
                                    <p className="text-xs font-bold">{communication?.approvers?.designAuthority || 'Not Set'}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] font-black uppercase opacity-50 mb-1">Payment Authority</p>
                                    <p className="text-xs font-bold">{communication?.approvers?.paymentAuthority || 'Not Set'}</p>
                                </div>
                            </div>
                        </Section>

                        <Section title="Site Coordination" icon={<FiMapPin />}>
                            <Field label="Site In-Charge" value={site?.inCharge} />
                            <Field label="Security Contact" value={site?.securityContact} />
                            <Field label="Working Hours" value={site?.workingHours} fullWidth />
                            <Field label="Entry Rules" value={site?.entryRules} fullWidth />
                        </Section>
                    </div>

                    {/* Right Column: Financials & Risk */}
                    <div className="space-y-6">
                        <Section title="Financial Snapshot" icon={<FiDollarSign />}>
                            <Field label="Credit Limit" value={`₹${financial?.creditLimit?.toLocaleString()}`} />
                            <Field label="Opening Balance" value={`₹${financial?.openingBalance?.toLocaleString()}`} />
                            <Field label="Outstanding" value={`₹${financial?.outstandingAmount?.toLocaleString()}`} color="red" />
                            <Field label="Advance Received" value={`₹${financial?.advanceReceived?.toLocaleString()}`} color="green" />
                            <Field label="Retention Held" value={`₹${financial?.retentionHeld?.toLocaleString()}`} color="amber" />
                        </Section>

                        <Section title="Legal Profile" icon={<FiShield />}>
                            <Field label="PAN Number" value={legal?.pan} />
                            <Field label="GST Number" value={legal?.gst} />
                            <Field label="CIN" value={legal?.cin} />
                            <Field label="KYC Status" value={legal?.kycStatus} isTag color={legal?.kycStatus === 'Verified' ? 'green' : 'amber'} />
                        </Section>

                        <Section title="Risk Analysis" icon={<FiAlertTriangle />}>
                            <Field label="Payment Behaviour" value={riskProfile?.paymentBehaviour} isTag color={riskProfile?.paymentBehaviour === 'Good' ? 'green' : 'red'} />
                            <Field label="Risk Level" value={riskProfile?.riskTag} isTag color={riskProfile?.riskTag === 'Normal' ? 'blue' : 'red'} />
                            {riskProfile?.remarks && <Field label="Internal Remarks" value={riskProfile?.remarks} fullWidth />}
                        </Section>

                        <div className="card-premium p-6 rounded-2xl" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                            <div className="flex items-center gap-3 mb-4 pb-2 border-b" style={{ borderColor: theme.cardBorder }}>
                                <span className="text-emerald-500 text-xl"><FiActivity /></span>
                                <h3 className="text-sm font-black uppercase tracking-widest" style={{ color: theme.textPrimary }}>Active Projects</h3>
                            </div>
                            <div className="space-y-3">
                                {projects && projects.length > 0 ? projects.map(proj => (
                                    <div key={proj._id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
                                        <div>
                                            <p className="text-xs font-bold" style={{ color: theme.textPrimary }}>{proj.name}</p>
                                            <p className="text-[10px] font-bold uppercase opacity-50" style={{ color: theme.textSecondary }}>{proj.status}</p>
                                        </div>
                                        <span className="text-xs font-bold font-mono">₹{proj.budget?.toLocaleString()}</span>
                                    </div>
                                )) : (
                                    <p className="text-xs opacity-50 italic">No active projects linked.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientProfile;
