import axios from 'axios';

const API_URL = 'http://localhost:5000/api/finance';

const getAuthToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.token;
};

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const financeService = {
    // Transactions
    getTransactions: async (params) => {
        try {
            const response = await apiClient.get('/transactions', { params });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to fetch transactions'
            };
        }
    },

    createTransaction: async (data) => {
        try {
            const response = await apiClient.post('/transactions', data);
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to create transaction'
            };
        }
    },

    updateTransactionStatus: async (id, status) => {
        try {
            const response = await apiClient.put(`/transactions/${id}/status`, { status });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to update transaction'
            };
        }
    },

    // COA
    getCOA: async () => {
        try {
            const response = await apiClient.get('/coa');
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to fetch COA'
            };
        }
    },

    createCOA: async (data) => {
        try {
            const response = await apiClient.post('/coa', data);
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to create COA account'
            };
        }
    },

    setupDefaultCOA: async () => {
        try {
            const response = await apiClient.post('/coa/defaults');
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to setup default accounts'
            };
        }
    },

    // Invoices
    getInvoices: async (params) => {
        try {
            const response = await apiClient.get('/invoices', { params });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to fetch invoices'
            };
        }
    },

    createInvoice: async (data) => {
        try {
            const response = await apiClient.post('/invoices', data);
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to create invoice'
            };
        }
    },

    updateInvoiceStatus: async (id, status) => {
        try {
            const response = await apiClient.put(`/invoices/${id}/status`, { status });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to update invoice'
            };
        }
    },

    // Analytics
    getCashFlowForecast: async () => {
        try {
            const response = await apiClient.get('/cash-flow');
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to fetch cash flow'
            };
        }
    }
};

export default financeService;
