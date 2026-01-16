import { useState, useEffect } from 'react';
import projectService from '../services/projectService';

export const useProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProjects = async () => {
        setLoading(true);
        const result = await projectService.getProjects();

        if (result.success) {
            setProjects(result.data);
            setError(null);
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return { projects, loading, error, refetch: fetchProjects };
};

export const useProject = (projectId) => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProject = async () => {
        if (!projectId) return;

        setLoading(true);
        const result = await projectService.getProjectById(projectId);

        if (result.success) {
            setProject(result.data);
            setError(null);
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProject();
    }, [projectId]);

    return { project, loading, error, refetch: fetchProject };
};

export const useProjectMutations = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createProject = async (projectData) => {
        setLoading(true);
        setError(null);
        const result = await projectService.createProject(projectData);
        setLoading(false);

        if (!result.success) {
            setError(result.message);
        }

        return result;
    };

    const updateProject = async (projectId, updates) => {
        setLoading(true);
        setError(null);
        const result = await projectService.updateProject(projectId, updates);
        setLoading(false);

        if (!result.success) {
            setError(result.message);
        }

        return result;
    };

    const toggleModule = async (projectId, moduleName, enabled) => {
        setLoading(true);
        setError(null);
        const result = await projectService.toggleModule(projectId, moduleName, enabled);
        setLoading(false);

        if (!result.success) {
            setError(result.message);
        }

        return result;
    };

    const updateStatus = async (projectId, status) => {
        setLoading(true);
        setError(null);
        const result = await projectService.updateStatus(projectId, status);
        setLoading(false);

        if (!result.success) {
            setError(result.message);
        }

        return result;
    };

    const updateProgress = async (projectId, progress) => {
        setLoading(true);
        setError(null);
        const result = await projectService.updateProgress(projectId, progress);
        setLoading(false);

        if (!result.success) {
            setError(result.message);
        }

        return result;
    };

    return {
        createProject,
        updateProject,
        toggleModule,
        updateStatus,
        updateProgress,
        loading,
        error
    };
};
