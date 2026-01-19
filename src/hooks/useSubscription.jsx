import React, { createContext, useContext, useState, useEffect } from 'react';

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
    // Initial state: Free plan with no modules enabled
    const [subscription, setSubscription] = useState(() => {
        const saved = localStorage.getItem('subscription_data');
        return saved ? JSON.parse(saved) : {
            plan: 'Free', // Free or Custom (when modules are purchased individually)
            status: 'ACTIVE',
            activatedAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            enabledModules: [], // Array of purchased modules
            paymentHistory: []
        };
    });

    useEffect(() => {
        localStorage.setItem('subscription_data', JSON.stringify(subscription));
    }, [subscription]);

    // Module pricing (per month)
    const modulePricing = {
        'Construction': 999,
        'Architecture': 999,
        'Interior': 999
    };

    const updatePlan = (newPlan) => {
        setSubscription(prev => ({
            ...prev,
            plan: newPlan,
            status: 'PENDING'
        }));
    };

    const purchaseModule = (moduleName) => {
        setSubscription(prev => ({
            ...prev,
            status: 'PENDING',
            plan: 'Custom' // Switch to custom plan when purchasing individual modules
        }));
    };

    const processPayment = (success, moduleName = null) => {
        if (success) {
            setSubscription(prev => {
                const newEnabledModules = moduleName
                    ? [...new Set([...prev.enabledModules, moduleName])] // Add module if specified
                    : prev.enabledModules;

                return {
                    ...prev,
                    status: 'ACTIVE',
                    enabledModules: newEnabledModules,
                    activatedAt: new Date().toISOString(),
                    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                    paymentHistory: [
                        {
                            date: new Date().toISOString(),
                            amount: moduleName ? modulePricing[moduleName] : 0,
                            module: moduleName || 'Plan',
                            plan: prev.plan
                        },
                        ...prev.paymentHistory
                    ]
                };
            });
            return true;
        }
        return false;
    };

    const toggleModule = (moduleName) => {
        if (subscription.status !== 'ACTIVE') {
            return { success: false, message: "Please activate your plan to enable modules." };
        }

        if (!subscription.enabledModules.includes(moduleName)) {
            return { success: false, message: `Purchase the ${moduleName} module to unlock it.` };
        }

        setSubscription(prev => {
            const isEnabled = prev.enabledModules.includes(moduleName);
            return {
                ...prev,
                enabledModules: isEnabled
                    ? prev.enabledModules.filter(m => m !== moduleName)
                    : [...prev.enabledModules, moduleName]
            };
        });
        return { success: true };
    };

    const isModuleLocked = (moduleName) => {
        if (subscription.status !== 'ACTIVE') return true;
        return !subscription.enabledModules.includes(moduleName);
    };

    return (
        <SubscriptionContext.Provider value={{
            subscription,
            updatePlan,
            purchaseModule,
            processPayment,
            toggleModule,
            isModuleLocked,
            modulePricing
        }}>
            {children}
        </SubscriptionContext.Provider>
    );
};

export const useSubscription = () => {
    const context = useContext(SubscriptionContext);
    if (!context) {
        throw new Error('useSubscription must be used within a SubscriptionProvider');
    }
    return context;
};
