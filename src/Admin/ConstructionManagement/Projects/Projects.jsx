import { useState } from 'react';
import { useTenant } from '../../../hooks/useTenant.jsx';
import { tenantData } from '../../../data/tenantData';
import { useAuth } from '../../../hooks/useAuth.jsx';
import { useNavigate } from 'react-router-dom';
import RoleGuard from '../../../common/RoleGuard';

const Projects = () => {
  const { currentTenant } = useTenant();
  const { user } = useAuth();
  const navigate = useNavigate();
  const data = tenantData[currentTenant.id];

  const handleEdit = (project) => {
    navigate(`/projects/edit/${project.id}`);
  };

  return (
    <div className="space-y-8 pb-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Projects</h2>
          <p className="text-sm font-medium text-gray-400 dark:text-brand-300 mt-1">{currentTenant.name} / {user?.role}</p>
        </div>
        <RoleGuard requiredRole="manager">
          <button
            onClick={() => navigate('/projects/add')}
            className="group flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-premium hover:bg-brand-700 transition-all hover:-translate-y-0.5"
          >
            <span className="text-xl leading-none group-hover:rotate-90 transition-transform">+</span>
            New Project
          </button>
        </RoleGuard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.projects.map((project) => (
          <div key={project.id} className="card-premium p-8 group flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-tight mb-1">{project.name}</h3>
                <p className="text-[11px] font-semibold text-gray-400 dark:text-brand-400 uppercase tracking-widest flex items-center">
                  <span className="mr-1.5 text-brand-400">📍</span>
                  {project.location}
                </p>
              </div>
              <span className={`px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-lg border ${project.status === 'Ongoing' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' :
                project.status === 'Planning' ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800' :
                  project.status === 'Completed' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800' :
                    'bg-gray-50 dark:bg-brand-900/20 text-gray-700 dark:text-brand-300 border-gray-200 dark:border-brand-800'
                }`}>
                {project.status}
              </span>
            </div>

            <div className="mb-8 mt-auto">
              <div className="flex justify-between items-end mb-2.5">
                <span className="text-[10px] font-bold text-gray-400 dark:text-brand-400 uppercase tracking-widest">Construction Progress</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{project.progress}%</span>
              </div>
              <div className="w-full bg-brand-50 dark:bg-brand-900/30 rounded-full h-3 p-0.5 border border-brand-100/30 dark:border-brand-800/30">
                <div
                  className="bg-gradient-to-r from-brand-400 to-brand-600 h-full rounded-full shadow-sm relative overflow-hidden"
                  style={{ width: `${project.progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-4 border-y border-gray-100 dark:border-brand-800/50 mb-6">
              <span className="text-[11px] font-semibold text-gray-400 dark:text-brand-400 uppercase tracking-tight">Project Budget</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">₹{(project.budget / 10000000).toFixed(1)} Cr</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-auto">
              <button className="py-2.5 px-4 rounded-xl bg-brand-50 dark:bg-brand-800/50 text-brand-600 dark:text-brand-200 text-[11px] font-bold uppercase tracking-wider hover:bg-brand-600 dark:hover:bg-brand-500 hover:text-white transition-all">
                Details
              </button>
              <RoleGuard requiredRole="manager">
                <button
                  onClick={() => handleEdit(project)}
                  className="py-2.5 px-4 rounded-xl bg-gray-50 dark:bg-brand-900/30 text-gray-700 dark:text-brand-300 text-[11px] font-bold uppercase tracking-wider hover:bg-gray-200 dark:hover:bg-brand-800 transition-all"
                >
                  Edit
                </button>
              </RoleGuard>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default Projects;
