import { useState } from 'react';
import { useProjects } from '../../../hooks/useProjects.jsx';
import { useAuth } from '../../../hooks/useAuth.jsx';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext.jsx';
import RoleGuard from '../../../common/RoleGuard';
import { FiMapPin, FiPlus, FiLoader, FiX, FiArrowRight, FiEdit2 } from 'react-icons/fi';
import { MdHome, MdArchitecture } from 'react-icons/md';
import { GiHammerNails } from 'react-icons/gi';
import ProjectForm from '../../Projects/ProjectForm';

const Projects = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { projects, loading, error, refetch } = useProjects();
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const handleViewDetails = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const handleCreateProject = () => {
    setEditingProject(null);
    setShowProjectForm(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowProjectForm(true);
  };

  const handleFormClose = () => {
    setShowProjectForm(false);
    setEditingProject(null);
    refetch(); // Refresh list after create/update
  };

  const getStatusColor = (status) => {
    const colors = {
      'Planning': 'bg-blue-100 text-blue-800 border-blue-200',
      'In Progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Ongoing': 'bg-green-100 text-green-800 border-green-200',
      'On Hold': 'bg-orange-100 text-orange-800 border-orange-200',
      'Completed': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Cancelled': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || 'bg-gray-800 text-gray-900 border-gray-800';
  };

  const getModuleIcon = (moduleName) => {
    const icons = {
      architecture: <MdArchitecture className="text-lg" />,
      interior: <MdHome className="text-lg" />,
      construction: <GiHammerNails className="text-lg" />
    };
    return icons[moduleName] || null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <FiLoader className="text-4xl animate-spin" style={{ color: theme.textPrimary }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-xl font-bold text-red-600 mb-2">{error}</p>
          <p className="text-sm" style={{ color: theme.textMuted }}>Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight" style={{ color: theme.textPrimary }}>Projects</h2>
          <p className="text-sm font-medium mt-1" style={{ color: theme.textSecondary }}>
            {projects.length} {projects.length === 1 ? 'project' : 'projects'} • {user?.role}
          </p>
        </div>
        <RoleGuard requiredRole="manager">
          <button
            onClick={handleCreateProject}
            className="group flex items-center gap-2 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-premium transition-all hover:-translate-y-0.5"
            style={{ background: theme.gradients.button }}
          >
            <FiPlus className="text-xl group-hover:rotate-90 transition-transform" />
            New Project
          </button>
        </RoleGuard>
      </div>

      {projects.length === 0 ? (
        <div className="card-premium p-12 text-center" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <p className="text-xl font-bold mb-2" style={{ color: theme.textPrimary }}>No projects yet</p>
          <p className="text-sm mb-6" style={{ color: theme.textMuted }}>Create your first project to get started</p>
          <button
            onClick={handleCreateProject}
            className="px-6 py-3 text-white rounded-xl font-bold text-sm transition-all"
            style={{ background: theme.gradients.button }}
          >
            <FiPlus className="inline mr-2" /> Create Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const enabledModules = Object.entries(project.modules || {})
              .filter(([_, mod]) => mod.enabled)
              .map(([name]) => name);

            return (
              <div key={project._id} className="card-premium p-8 group flex flex-col hover:shadow-xl transition-all" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold transition-colors leading-tight mb-1" style={{ color: theme.textPrimary }}>
                      {project.name}
                    </h3>
                    <p className="text-xs font-bold mb-2" style={{ color: theme.textMuted }}>
                      {project.projectCode}
                    </p>
                    <p className="text-[11px] font-semibold uppercase tracking-widest flex items-center" style={{ color: theme.textSecondary }}>
                      <FiMapPin className="mr-1.5" style={{ color: theme.primary }} />
                      {project.location}
                    </p>
                  </div>
                  <span className={`px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-lg border ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                {/* Enabled Modules */}
                {enabledModules.length > 0 && (
                  <div className="flex gap-2 mb-4">
                    {enabledModules.map(moduleName => (
                      <div
                        key={moduleName}
                        className="px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1"
                        style={{ backgroundColor: `${theme.primary}10`, color: theme.primary }}
                        title={moduleName}
                      >
                        {getModuleIcon(moduleName)}
                      </div>
                    ))}
                  </div>
                )}

                <div className="mb-8 mt-auto">
                  <div className="flex justify-between items-end mb-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: theme.textMuted }}>Progress</span>
                    <span className="text-sm font-bold" style={{ color: theme.textPrimary }}>{project.progress}%</span>
                  </div>
                  <div className="w-full rounded-full h-3 p-0.5 border" style={{ background: theme.background, borderColor: theme.borderColor }}>
                    <div
                      className="h-full rounded-full shadow-sm relative overflow-hidden"
                      style={{ background: theme.gradients.primary, width: `${project.progress}%` }}
                    >
                      <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-4 border-y mb-6" style={{ borderColor: theme.borderColor }}>
                  <span className="text-[11px] font-semibold uppercase tracking-tight" style={{ color: theme.textMuted }}>Budget</span>
                  <span className="text-sm font-bold" style={{ color: theme.textPrimary }}>
                    ₹{(project.budget / 100000).toFixed(1)}L
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <button
                    onClick={() => handleViewDetails(project._id)}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] transition-all text-white shadow-sm hover:shadow-lg hover:-translate-y-0.5"
                    style={{
                      background: theme.gradients.button,
                    }}
                  >
                    Details
                    <FiArrowRight className="text-sm" />
                  </button>
                  <RoleGuard requiredRole="manager">
                    <button
                      onClick={() => handleEdit(project)}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] transition-all border-2"
                      style={{
                        background: theme.background,
                        color: theme.textPrimary,
                        borderColor: theme.cardBorder
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = theme.primary;
                        e.currentTarget.style.color = theme.primary;
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = theme.cardBorder;
                        e.currentTarget.style.color = theme.textPrimary;
                      }}
                    >
                      <FiEdit2 className="text-sm" />
                      Edit
                    </button>
                  </RoleGuard>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Project Form Modal */}
      {showProjectForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-900 opacity-75" onClick={() => setShowProjectForm(false)}></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div
              className="inline-block align-bottom rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
              style={{ backgroundColor: theme.background }}
            >
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setShowProjectForm(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  style={{ color: theme.textSecondary }}
                >
                  <FiX size={24} />
                </button>
              </div>
              <div className="max-h-[90vh] overflow-y-auto">
                <ProjectForm
                  existingProject={editingProject}
                  onClose={handleFormClose}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
