import React from 'react';
import { FiSettings, FiSliders, FiBell, FiLock, FiDatabase, FiLayers } from 'react-icons/fi';

const ArchSettings = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-12 animate-in zoom-in-95 duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight uppercase tracking-tight">Studio <span className="text-brand-600">Settings</span></h1>
                    <p className="text-gray-800 dark:text-brand-300 mt-2 font-medium">Fine-tune your architectural workflow, permissions, and firm defaults.</p>
                </div>
            </div>

            <div className="space-y-6">
                {[
                    { title: 'Workflow Configuration', desc: 'Define default design phases (Concept to Support) and mandatory deliverables.', icon: <FiLayers />, color: 'brand' },
                    { title: 'Approval Flow', desc: 'Configure multi-stage client approval cycles and e-signature requirements.', icon: <FiSliders />, color: 'indigo' },
                    { title: 'Privacy & Security', desc: 'Two-factor authentication, session management, and restricted team access.', icon: <FiLock />, color: 'emerald' },
                    { title: 'Notification Center', desc: 'Manage email and system alerts for approvals, deadlines, and revisions.', icon: <FiBell />, color: 'amber' },
                    { title: 'Storage & Files', desc: 'Auto-CAD file size limits, cloud sync preferences, and backup frequency.', icon: <FiDatabase />, color: 'rose' },
                ].map((item, i) => (
                    <div key={i} className="group bg-white dark:bg-brand-900/30 p-8 rounded-[2.5rem] shadow-premium border border-brand-50/50 dark:border-brand-800/50 hover:bg-brand-50/30 transition-all duration-300 flex items-center gap-8 cursor-pointer">
                        <div className={`w-16 h-16 rounded-2xl bg-${item.color}-50 dark:bg-${item.color}-900/20 text-${item.color}-600 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                            {item.icon}
                        </div>
                        <div className="flex-1 text-indigo-900 dark:text-white">
                            <h3 className="text-lg font-black uppercase tracking-tight">{item.title}</h3>
                            <p className="text-xs font-medium text-gray-800 dark:text-brand-300 mt-1">{item.desc}</p>
                        </div>
                        <button className="px-6 py-2 bg-brand-50 dark:bg-brand-800 text-brand-600 dark:text-brand-300 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-brand-600 hover:text-white transition-all">Configure</button>
                    </div>
                ))}
            </div>

            {/* Danger Zone */}
            <div className="bg-rose-50/50 dark:bg-rose-900/10 p-10 rounded-[3rem] border border-rose-100 dark:border-rose-900/40 mt-12">
                <h4 className="text-xl font-black text-rose-800 dark:text-rose-400 uppercase tracking-tight">Professional Danger Zone</h4>
                <p className="text-xs font-medium text-rose-700 dark:text-rose-500 mt-1">Actions here are irreversible. Be cautious when deleting project history or firm data.</p>
                <button className="mt-8 px-8 py-3 bg-rose-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-rose-700 transition-all">Deactivate Business Unit</button>
            </div>
        </div>
    );
};

export default ArchSettings;
