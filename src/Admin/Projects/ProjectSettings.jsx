import React from 'react';
import { useSubscription } from '../../hooks/useSubscription';
import { FiCheckCircle, FiLock, FiInfo } from 'react-icons/fi';

const ProjectSettings = ({ project }) => {
    const { subscription, toggleModule, isModuleLocked } = useSubscription();

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
            <div className="flex items-center gap-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/50">
                <FiInfo className="text-blue-600 text-xl shrink-0" />
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
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
                            className={`relative card-premium p-6 flex flex-col border-none ring-1 transition-all ${isEnabled ? 'ring-emerald-500/50 bg-emerald-50/5 dark:bg-emerald-900/5' : 'ring-slate-200 dark:ring-slate-800'
                                } ${isLocked ? 'opacity-60 grayscale' : ''}`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl border ${isEnabled ? 'bg-emerald-100 text-emerald-600 border-emerald-200' : 'bg-slate-100 text-slate-400 border-slate-200'
                                    }`}>
                                    {isEnabled ? <FiCheckCircle /> : mod.id === 'Interior' ? '🏠' : mod.id === 'Architecture' ? '📐' : '🏗️'}
                                </div>
                                {isLocked && (
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
                                        <FiLock size={10} /> LOCK
                                    </div>
                                )}
                            </div>

                            <h4 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{mod.name}</h4>
                            <p className="text-xs font-medium text-slate-500 mt-2 mb-8 flex-1">{mod.desc}</p>

                            <button
                                onClick={() => handleToggle(mod.id)}
                                className={`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${isEnabled
                                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                                    } ${isLocked ? 'cursor-not-allowed' : 'active:scale-95'}`}
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
