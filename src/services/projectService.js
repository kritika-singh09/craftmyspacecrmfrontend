import axios from 'axios';

const API_URL = 'http://localhost:5000/api/projects';

// Get auth token from localStorage
const getAuthToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.token;
};

// Create axios instance with auth
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Project Service
const projectService = {
    // Create new project
    createProject: async (projectData) => {
        try {
            const response = await apiClient.post('/', projectData);
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to create project'
            };
        }
    },

    // Get all projects
    getProjects: async () => {
        try {
            const response = await apiClient.get('/');
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to fetch projects'
            };
        }
    },

    // Get project by ID
    getProjectById: async (id) => {
        try {
            const response = await apiClient.get(`/${id}`);
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to fetch project'
            };
        }
    },

    // Update project
    updateProject: async (id, updates) => {
        try {
            const response = await apiClient.put(`/${id}`, updates);
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to update project'
            };
        }
    },

    // Enable/Disable module
    toggleModule: async (projectId, moduleName, enabled, status = 'ONGOING') => {
        try {
            const modules = {
                [moduleName]: {
                    enabled,
                    status: enabled ? status : 'LOCKED'
                }
            };

            const response = await apiClient.put(`/${projectId}`, { modules });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to toggle module'
            };
        }
    },

    // Update project status
    updateStatus: async (projectId, status) => {
        try {
            const response = await apiClient.put(`/${projectId}`, { status });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to update status'
            };
        }
    },

    // Update project progress
    updateProgress: async (projectId, progress) => {
        try {
            const response = await apiClient.put(`/${projectId}`, { progress });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to update progress'
            };
        }
    },

    // Add team member
    addTeamMember: async (projectId, userId, role) => {
        try {
            const project = await projectService.getProjectById(projectId);
            if (!project.success) return project;

            const teamMembers = [...(project.data.teamMembers || []), { user: userId, role }];
            const response = await apiClient.put(`/${projectId}`, { teamMembers });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to add team member'
            };
        }
    },

    // Remove team member
    removeTeamMember: async (projectId, userId) => {
        try {
            const project = await projectService.getProjectById(projectId);
            if (!project.success) return project;

            const teamMembers = project.data.teamMembers.filter(
                member => member.user._id !== userId
            );
            const response = await apiClient.put(`/${projectId}`, { teamMembers });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to remove team member'
            };
        }
    }
};

export default projectService;
