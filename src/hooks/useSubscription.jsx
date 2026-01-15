import React, { createContext, useContext, useState, useEffect } from 'react';

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
    // Mock initial state: Trial plan, Interior enabled by default
    const [subscription, setSubscription] = useState(() => {
        const saved = localStorage.getItem('subscription_data');
        return saved ? JSON.parse(saved) : {
            plan: 'Trial', // Trial, Basic, Pro
            status: 'ACTIVE', // ACTIVE, INACTIVE, PENDING
            activatedAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
            enabledModules: ['Interior'], // 'Interior', 'Architecture', 'Construction'
            paymentHistory: []
        };
    });

    useEffect(() => {
        localStorage.setItem('subscription_data', JSON.stringify(subscription));
    }, [subscription]);

    const updatePlan = (newPlan) => {
        setSubscription(prev => ({
            ...prev,
            plan: newPlan,
            status: 'PENDING'
        }));
    };

    const processPayment = (success) => {
        if (success) {
            setSubscription(prev => ({
                ...prev,
                status: 'ACTIVE',
                activatedAt: new Date().toISOString(),
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
                paymentHistory: [
                    { date: new Date().toISOString(), amount: prev.plan === 'Pro' ? 25000 : 15000, plan: prev.plan },
                    ...prev.paymentHistory
                ]
            }));
            return true;
        }
        return false;
    };

    const toggleModule = (moduleName) => {
        // Rule: Plan must be ACTIVE
        if (subscription.status !== 'ACTIVE') {
            return { success: false, message: "Please activate your plan to enable modules." };
        }

        // Logic: Can only toggle if plan permits
        const planLimits = {
            'Trial': ['Interior'],
            'Basic': ['Interior', 'Architecture'],
            'Pro': ['Interior', 'Architecture', 'Construction']
        };

        if (!planLimits[subscription.plan].includes(moduleName)) {
            return { success: false, message: `Upgrade to ${moduleName === 'Construction' ? 'Pro' : 'Basic'} to unlock this module.` };
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
        // Rule: Plan must be ACTIVE
        if (subscription.status !== 'ACTIVE') return true;

        const planLimits = {
            'Trial': ['Interior'],
            'Basic': ['Interior', 'Architecture'],
            'Pro': ['Interior', 'Architecture', 'Construction']
        };
        return !planLimits[subscription.plan].includes(moduleName);
    };

    return (
        <SubscriptionContext.Provider value={{
            subscription,
            updatePlan,
            processPayment,
            toggleModule,
            isModuleLocked
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
