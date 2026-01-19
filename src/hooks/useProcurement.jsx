import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';

export const useProcurement = () => {
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
    // PURCHASE ORDERS
    // ===========================
    const getPurchaseOrders = useCallback((params) => {
        const query = new URLSearchParams(params).toString();
        return fetchWithAuth(`/purchase-orders?${query}`);
    }, [fetchWithAuth]);

    const createPO = useCallback((data) => fetchWithAuth('/purchase-orders', {
        method: 'POST',
        body: JSON.stringify(data)
    }), [fetchWithAuth]);

    const submitPO = useCallback((id) => fetchWithAuth(`/purchase-orders/${id}/submit`, {
        method: 'PUT'
    }), [fetchWithAuth]);

    const approvePO = useCallback((id, level, comments) => fetchWithAuth(`/purchase-orders/${id}/approve`, {
        method: 'PUT',
        body: JSON.stringify({ level, comments })
    }), [fetchWithAuth]);

    const issuePO = useCallback((id) => fetchWithAuth(`/purchase-orders/${id}/issue`, {
        method: 'PUT'
    }), [fetchWithAuth]);

    const closePO = useCallback((id) => fetchWithAuth(`/purchase-orders/${id}/close`, {
        method: 'PUT'
    }), [fetchWithAuth]);

    // ===========================
    // DELIVERIES (GRN)
    // ===========================
    const recordDelivery = useCallback((id, deliveryData) => fetchWithAuth(`/purchase-orders/${id}/delivery`, {
        method: 'PUT',
        body: JSON.stringify(deliveryData)
    }), [fetchWithAuth]);

    return {
        loading,
        error,
        getPurchaseOrders,
        createPO,
        submitPO,
        approvePO,
        issuePO,
        closePO,
        recordDelivery
    };
};
