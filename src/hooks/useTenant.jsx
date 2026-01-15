import { createContext, useContext, useState } from 'react';

const TenantContext = createContext();

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within TenantProvider');
  }
  return context;
};

export const TenantProvider = ({ children }) => {
  const [currentTenant, setCurrentTenant] = useState({
    id: 'TENANT_001',
    name: 'HARR Construction',
    logo: 'H',
    color: 'blue'
  });

  const tenants = [
    { id: 'TENANT_001', name: 'HARR Construction', logo: 'H', color: 'blue' },
    { id: 'TENANT_002', name: 'ABC Builders', logo: 'A', color: 'green' },
    { id: 'TENANT_003', name: 'XYZ Infra', logo: 'X', color: 'purple' },
    { id: 'TENANT_004', name: 'Sharma Constructions', logo: 'S', color: 'red' }
  ];

  const switchTenant = (tenantId) => {
    const tenant = tenants.find(t => t.id === tenantId);
    if (tenant) {
      setCurrentTenant(tenant);
    }
  };

  return (
    <TenantContext.Provider value={{
      currentTenant,
      tenants,
      switchTenant
    }}>
      {children}
    </TenantContext.Provider>
  );
};