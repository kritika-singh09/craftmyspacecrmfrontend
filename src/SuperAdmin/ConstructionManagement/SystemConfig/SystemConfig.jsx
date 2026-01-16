import React, { useState } from 'react';
import { FiSettings, FiPackage } from 'react-icons/fi';

const SuperAdminSystemConfig = () => {
    const [config, setConfig] = useState({
        currency: 'INR',
        units: 'metric', // metric (m, kg) or imperial (ft, lb)
        dateFormat: 'DD/MM/YYYY',
        timezone: 'Asia/Kolkata',
        taxName: 'GST',
        taxRate: 18,
    });

    const [modules, setModules] = useState({
        finance: true,
        qa: true,
        vendor: true,
        betaFeatures: false,
    });

    const handleConfigChange = (e) => {
        setConfig({ ...config, [e.target.name]: e.target.value });
    };

    const handleModuleToggle = (moduleName) => {
        setModules({ ...modules, [moduleName]: !modules[moduleName] });
    };

    const handleSave = () => {
        // API call to save config would go here
        alert('System configuration saved successfully!');
    };

    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">System Core</h1>
                    <p className="text-sm font-bold text-gray-900 mt-1">Global Parameters and Module Entitlements</p>
                </div>
                <button
                    onClick={handleSave}
                    className="px-8 py-3 bg-brand-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-700 shadow-premium hover:-translate-y-0.5 transition-all active:scale-95"
                >
                    Commit Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Global Settings */}
                <div className="card-premium overflow-hidden">
                    <div className="p-8 border-b border-brand-50 bg-brand-50/30">
                        <h2 className="text-xl font-black text-gray-900 flex items-center gap-3">
                            <span className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-600"><FiSettings className="w-5 h-5" /></span>
                            Regional Standards
                        </h2>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-1">Ledger Currency</label>
                                <select
                                    name="currency"
                                    value={config.currency}
                                    onChange={handleConfigChange}
                                    className="w-full px-5 py-3.5 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-semibold appearance-none cursor-pointer"
                                >
                                    <option value="INR">INR (₹) - Indian Rupee</option>
                                    <option value="USD">USD ($) - US Dollar</option>
                                    <option value="EUR">EUR (€) - Euro</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-1">Measurement Base</label>
                                <select
                                    name="units"
                                    value={config.units}
                                    onChange={handleConfigChange}
                                    className="w-full px-5 py-3.5 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-semibold appearance-none cursor-pointer"
                                >
                                    <option value="metric">Metric Standards (m/kg)</option>
                                    <option value="imperial">Imperial Base (ft/lb)</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-1">Temporal Format</label>
                                <select
                                    name="dateFormat"
                                    value={config.dateFormat}
                                    onChange={handleConfigChange}
                                    className="w-full px-5 py-3.5 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-semibold appearance-none cursor-pointer"
                                >
                                    <option value="DD/MM/YYYY">DD / MM / YYYY</option>
                                    <option value="MM/DD/YYYY">MM / DD / YYYY</option>
                                    <option value="YYYY-MM-DD">YYYY - MM - DD</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-1">Standard Timezone</label>
                                <select
                                    name="timezone"
                                    value={config.timezone}
                                    onChange={handleConfigChange}
                                    className="w-full px-5 py-3.5 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-semibold appearance-none cursor-pointer"
                                >
                                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                                    <option value="America/New_York">America/New_York (EST)</option>
                                    <option value="Europe/London">Europe/London (GMT)</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-2">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-1">Taxation Label</label>
                                <input
                                    type="text"
                                    name="taxName"
                                    value={config.taxName}
                                    onChange={handleConfigChange}
                                    className="w-full px-5 py-3.5 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-semibold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] ml-1">Yield Tax Rate (%)</label>
                                <input
                                    type="number"
                                    name="taxRate"
                                    value={config.taxRate}
                                    onChange={handleConfigChange}
                                    className="w-full px-5 py-3.5 bg-brand-50/30 border border-brand-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-semibold"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Module Control */}
                <div className="card-premium overflow-hidden">
                    <div className="p-8 border-b border-brand-50 bg-brand-50/30">
                        <h2 className="text-xl font-black text-gray-900 flex items-center gap-3">
                            <span className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-purple-600"><FiPackage className="w-5 h-5" /></span>
                            Global Entitlements
                        </h2>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="p-4 bg-brand-50/50 rounded-2xl border border-brand-100 flex items-center gap-4 mb-2">
                            <div className="text-xl">💡</div>
                            <p className="text-[10px] font-black text-brand-800 uppercase tracking-tight leading-relaxed">Changes here propagate instantly to all managed enterprise tenants.</p>
                        </div>

                        <div className="space-y-4">
                            {[
                                { id: 'finance', name: 'Treasury & Yield', desc: 'Financial lifecycle and budget tracking' },
                                { id: 'qa', name: 'Integrity Assurance', desc: 'High-fidelity QA/QC audit protocols' },
                                { id: 'vendor', name: 'Supply Chain Portal', desc: 'Secure stakeholder and vendor access' },
                                { id: 'betaFeatures', name: 'Experimental Core', desc: 'Bleeding-edge feature deployments' },
                            ].map((module) => (
                                <div key={module.id} className="flex items-center justify-between p-5 bg-brand-50/20 rounded-2xl border border-brand-50 group hover:bg-brand-50/50 transition-all">
                                    <div className="flex-1">
                                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest text-[11px]">{module.name}</h3>
                                        <p className="text-[10px] font-black text-gray-800 mt-0.5">{module.desc}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={modules[module.id]}
                                            onChange={() => handleModuleToggle(module.id)}
                                        />
                                        <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-600 shadow-inner"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminSystemConfig;
