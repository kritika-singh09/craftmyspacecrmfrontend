import React from 'react';
import { FiTruck, FiUsers, FiClock, FiPlus, FiAlertCircle, FiCamera, FiCheckCircle } from 'react-icons/fi';

const IntSiteExecution = () => {
    const logs = [
        { date: 'Jan 14, 2024', work: 'Living Room False Ceiling Framework', workers: 4, supervisor: 'Rohit V.', status: 'On Track', issues: 'None' },
        { date: 'Jan 13, 2024', work: 'Kitchen Cabinetry Installation', workers: 6, supervisor: 'Mohit S.', status: 'Delayed', issues: 'Material shortage (Hardware)' },
        { date: 'Jan 12, 2024', work: 'Electrical First Fix - Master Bedroom', workers: 2, supervisor: 'Rohit V.', status: 'Completed', issues: 'None' },
    ];

    return (
        <div className="space-y-10 pb-12 animate-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight uppercase tracking-tight">Site <span className="text-orange-600">Execution</span></h1>
                    <p className="text-gray-800 dark:text-orange-300 mt-2 font-medium tracking-wide">Daily work logs, manpower tracking, and on-site issue management.</p>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all">
                    <FiPlus className="text-lg" /> Create Daily Log
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3 space-y-6">
                    {logs.map((log, i) => (
                        <div key={i} className="bg-white dark:bg-brand-900/30 p-8 rounded-[3rem] border border-orange-50 dark:border-brand-800 shadow-premium flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group hover:border-orange-500 transition-all duration-300">
                            <div className="flex items-start gap-6">
                                <div className="p-5 bg-orange-50 dark:bg-brand-800 rounded-3xl text-orange-600 shadow-inner group-hover:bg-orange-600 group-hover:text-white transition-all">
                                    <p className="text-[10px] font-black uppercase tracking-widest leading-tight">{log.date.split(',')[0].split(' ')[0]}</p>
                                    <p className="text-2xl font-black tracking-tighter">{log.date.split(',')[0].split(' ')[1]}</p>
                                </div>
                                <div className="text-indigo-900 dark:text-white">
                                    <h4 className="text-lg font-black uppercase tracking-tight group-hover:text-orange-600 transition-colors">{log.work}</h4>
                                    <div className="flex flex-wrap gap-4 mt-2">
                                        <span className="flex items-center gap-2 text-[10px] font-bold opacity-60 uppercase"><FiUsers className="text-orange-600" /> {log.workers} Workers</span>
                                        <span className="flex items-center gap-2 text-[10px] font-bold opacity-60 uppercase"><FiClock className="text-orange-600" /> Sup: {log.supervisor}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                                <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${log.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                        log.status === 'Delayed' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                                    }`}>{log.status}</span>
                                <button className="flex items-center gap-2 text-orange-600 text-[10px] font-black uppercase tracking-widest hover:underline"><FiCamera /> Site Photos</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-8">
                    <div className="p-8 bg-brand-900 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                        <FiAlertCircle className="text-orange-600 text-5xl mb-4" />
                        <h4 className="text-xl font-black uppercase tracking-tight mb-4">Urgent Issues</h4>
                        <ul className="space-y-4">
                            <li className="text-xs font-medium border-l-2 border-orange-500 pl-4 py-1">Electrical outlet mismatch in Kitchen island. Needs designer input.</li>
                            <li className="text-xs font-medium border-l-2 border-orange-500 pl-4 py-1 text-orange-200">Pending delivery: Hardware for Wardrobes (Delayed 2 days).</li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-brand-900/30 p-8 rounded-[2.5rem] border border-orange-50 dark:border-brand-800 text-indigo-900 dark:text-white">
                        <h4 className="text-sm font-black uppercase tracking-widest mb-6 border-b border-orange-50 dark:border-brand-800 pb-4">Efficiency Score</h4>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold opacity-60 uppercase">On-time Completion</span>
                            <span className="text-xs font-black text-orange-600 italic">88%</span>
                        </div>
                        <div className="h-2 bg-orange-50 dark:bg-brand-800 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500" style={{ width: '88%' }}></div>
                        </div>
                        <p className="text-[9px] font-medium text-gray-900 mt-4 leading-relaxed italic">Site staff productivity is currently above target for current sprint.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntSiteExecution;
