import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';

export const useMaterials = () => {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    const fetchWithAuth = useCallback(async (endpoint, options = {}) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}${endpoint}`, {
                ...options,
                headers: {
                    ...options.headers,
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Something went wrong');
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [token]);

    // ===========================
    // MASTER REGISTRY
    // ===========================
    const getMaterialsMaster = useCallback(() => fetchWithAuth('/materials/master'), [fetchWithAuth]);

    const createMaterialMaster = useCallback((data) => fetchWithAuth('/materials/master', {
        method: 'POST',
        body: JSON.stringify(data)
    }), [fetchWithAuth]);

    // ===========================
    // INVENTORY
    // ===========================
    const getInventory = useCallback(() => fetchWithAuth('/materials/inventory'), [fetchWithAuth]);

    const adjustStock = useCallback((data) => fetchWithAuth('/materials/inventory/adjustment', {
        method: 'POST',
        body: JSON.stringify(data)
    }), [fetchWithAuth]);

    // ===========================
    // INDENTS (REQUESTS)
    // ===========================
    const getIndents = useCallback(() => fetchWithAuth('/materials/requests'), [fetchWithAuth]);

    const createIndent = useCallback((data) => fetchWithAuth('/materials/requests', {
        method: 'POST',
        body: JSON.stringify(data)
    }), [fetchWithAuth]);

    const approveIndent = useCallback((id, note) => fetchWithAuth(`/materials/requests/${id}/approve`, {
        method: 'PUT',
        body: JSON.stringify({ note })
    }), [fetchWithAuth]);

    const issueIndent = useCallback((id) => fetchWithAuth(`/materials/requests/${id}/issue`, {
        method: 'PUT'
    }), [fetchWithAuth]);

    // ===========================
    // QUALITY CONTROL
    // ===========================
    const verifyQuality = useCallback((data) => fetchWithAuth('/materials/quality/verify', {
        method: 'POST',
        body: JSON.stringify(data)
    }), [fetchWithAuth]);

    const getQCRecords = useCallback((params) => {
        const query = new URLSearchParams(params).toString();
        return fetchWithAuth(`/materials/quality?${query}`);
    }, [fetchWithAuth]);

    return {
        loading,
        error,
        getMaterialsMaster,
        createMaterialMaster,
        getInventory,
        adjustStock,
        getIndents,
        createIndent,
        approveIndent,
        issueIndent,
        verifyQuality,
        getQCRecords
    };
};
