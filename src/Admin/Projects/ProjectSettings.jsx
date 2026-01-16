import React from 'react';
import { useSubscription } from '../../hooks/useSubscription';
import { useTheme } from '../../context/ThemeContext';
import { FiCheckCircle, FiLock, FiInfo } from 'react-icons/fi';

const ProjectSettings = ({ project }) => {
    const { subscription, toggleModule, isModuleLocked } = useSubscription();
    const { theme } = useTheme();

    const moduleConfigs = [
        { id: 'Interior', name: 'Interior Design', desc: 'Manage 3D renders, BOQ, and site execution.' },
        { id: 'Architecture', name: 'Architectural Design', desc: 'Handle design phases, drawings, and revisions.' },
        { id: 'Construction', name: 'Construction Management', desc: 'Track workforce, materials, and daily site logs.' }
    ];

    const handleToggle = (moduleId) => {
        const result = toggleModule(moduleId);
        if (!result.success) {
            alert(result.message);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center gap-4 p-6 rounded-2xl border transition-colors" style={{ backgroundColor: `${theme.primary}10`, borderColor: `${theme.primary}30` }}>
                <FiInfo className="text-xl shrink-0" style={{ color: theme.primary }} />
                <p className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Select which modules are active for <span className="font-bold underline">{project?.name || 'this project'}</span>.
                    Available modules depend on your current <span className="font-bold">{subscription.plan}</span> plan.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {moduleConfigs.map((mod) => {
                    const isLocked = isModuleLocked(mod.id);
                    const isEnabled = subscription.enabledModules.includes(mod.id);

                    return (
                        <div
                            key={mod.id}
                            className={`relative card-premium p-6 flex flex-col border-none ring-1 transition-all ${isLocked ? 'opacity-60 grayscale' : ''}`}
                            style={{
                                backgroundColor: isEnabled ? `${theme.primary}05` : theme.cardBg,
                                ringColor: isEnabled ? theme.primary : theme.cardBorder,
                                boxShadow: isEnabled ? `0 4px 20px ${theme.primary}15` : 'none'
                            }}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl border`}
                                    style={{
                                        backgroundColor: isEnabled ? `${theme.primary}20` : `${theme.iconBg}10`,
                                        color: isEnabled ? theme.primary : theme.textMuted,
                                        borderColor: isEnabled ? `${theme.primary}30` : theme.cardBorder
                                    }}>
                                    {isEnabled ? <FiCheckCircle /> : mod.id === 'Interior' ? '🏠' : mod.id === 'Architecture' ? '📐' : '🏗️'}
                                </div>
                                {isLocked && (
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-900 text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
                                        <FiLock size={10} /> LOCK
                                    </div>
                                )}
                            </div>

                            <h4 className="text-lg font-black tracking-tight" style={{ color: theme.textPrimary }}>{mod.name}</h4>
                            <p className="text-xs font-medium mt-2 mb-8 flex-1" style={{ color: theme.textSecondary }}>{mod.desc}</p>

                            <button
                                onClick={() => handleToggle(mod.id)}
                                className={`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${isLocked ? 'cursor-not-allowed' : 'active:scale-95'}`}
                                style={{
                                    background: isEnabled ? theme.gradients.button : `${theme.iconBg}20`,
                                    color: isEnabled ? 'white' : theme.textSecondary,
                                    boxShadow: isEnabled ? '0 4px 15px rgba(0,0,0,0.1)' : 'none'
                                }}
                            >
                                {isEnabled ? 'ACTIVE' : isLocked ? 'UPGRADE TO ENABLE' : 'ENABLE MODULE'}
                            </button>

                            {isLocked && (
                                <div className="absolute inset-0 cursor-not-allowed" onClick={() => handleToggle(mod.id)}></div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProjectSettings;
