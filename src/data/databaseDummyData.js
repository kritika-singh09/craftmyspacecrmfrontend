// Complete Database Schema Dummy Data for Construction CRM

// 1. TENANT / COMPANY TABLE
export const tenants = [
  {
    tenant_id: 'TENANT_001',
    name: 'HARR Construction',
    address: '123 Construction Plaza, Lucknow, UP 226001',
    contact_email: 'info@harrconstruction.com',
    contact_phone: '+91 9876543210',
    gst_number: '09AAAAA0000A1Z5',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T10:30:00Z'
  },
  {
    tenant_id: 'TENANT_002',
    name: 'ABC Builders',
    address: '456 Builder Street, Mumbai, MH 400001',
    contact_email: 'contact@abcbuilders.com',
    contact_phone: '+91 9876543220',
    gst_number: '27BBBBB1111B2Z6',
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-14T15:45:00Z'
  },
  {
    tenant_id: 'TENANT_003',
    name: 'XYZ Infra',
    address: '789 Infrastructure Road, Bangalore, KA 560001',
    contact_email: 'admin@xyzinfra.com',
    contact_phone: '+91 9876543230',
    gst_number: '29CCCCC2222C3Z7',
    created_at: '2024-01-03T00:00:00Z',
    updated_at: '2024-01-13T09:15:00Z'
  }
];

// 2. USER / EMPLOYEE TABLE
export const users = [
  {
    user_id: 'USER_001',
    tenant_id: 'TENANT_001',
    name: 'Admin User',
    email: 'admin@harr.com',
    password_hash: '$2b$10$hashedpassword123',
    role: 'Admin',
    phone: '+91 9876543211',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T10:30:00Z'
  },
  {
    user_id: 'USER_002',
    tenant_id: 'TENANT_001',
    name: 'Project Manager',
    email: 'manager@harr.com',
    password_hash: '$2b$10$hashedpassword456',
    role: 'Manager',
    phone: '+91 9876543212',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-14T14:20:00Z'
  },
  {
    user_id: 'USER_003',
    tenant_id: 'TENANT_001',
    name: 'Site Engineer',
    email: 'engineer@harr.com',
    password_hash: '$2b$10$hashedpassword789',
    role: 'Engineer',
    phone: '+91 9876543213',
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-13T11:45:00Z'
  }
];

// 3. CLIENT TABLE
export const clients = [
  {
    client_id: 'CLIENT_001',
    tenant_id: 'TENANT_001',
    name: 'Rajesh Enterprises',
    email: 'rajesh@enterprises.com',
    phone: '+91 9876543250',
    address: '321 Business Park, Lucknow, UP',
    gst_number: '09DDDDD3333D4Z8',
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-01-12T16:30:00Z'
  },
  {
    client_id: 'CLIENT_002',
    tenant_id: 'TENANT_001',
    name: 'Sharma Builders Pvt Ltd',
    email: 'contact@sharmabuilders.com',
    phone: '+91 9876543251',
    address: '654 Commercial Complex, Delhi',
    gst_number: '07EEEEE4444E5Z9',
    created_at: '2024-01-06T00:00:00Z',
    updated_at: '2024-01-11T12:15:00Z'
  }
];

// 4. PROJECT TABLE
export const projects = [
  {
    project_id: 'PROJECT_001',
    tenant_id: 'TENANT_001',
    name: 'Shopping Mall Construction',
    location: 'Lucknow, UP',
    client_id: 'CLIENT_001',
    budget: 50000000.00,
    start_date: '2024-01-10',
    end_date: '2024-12-31',
    status: 'Ongoing',
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-15T14:20:00Z'
  },
  {
    project_id: 'PROJECT_002',
    tenant_id: 'TENANT_001',
    name: 'Residential Tower',
    location: 'Delhi',
    client_id: 'CLIENT_002',
    budget: 30000000.00,
    start_date: '2024-02-01',
    end_date: '2024-11-30',
    status: 'Ongoing',
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-01-14T10:45:00Z'
  }
];

// 5. CONTRACTOR TABLE
export const contractors = [
  {
    contractor_id: 'CONTRACTOR_001',
    tenant_id: 'TENANT_001',
    name: 'Foundation Specialist Co',
    skill: 'Foundation',
    phone: '+91 9876543260',
    rate_per_unit: 1500.00,
    created_at: '2024-01-08T00:00:00Z',
    updated_at: '2024-01-13T09:30:00Z'
  },
  {
    contractor_id: 'CONTRACTOR_002',
    tenant_id: 'TENANT_001',
    name: 'Electrical Works Ltd',
    skill: 'Electrical',
    phone: '+91 9876543261',
    rate_per_unit: 2000.00,
    created_at: '2024-01-09T00:00:00Z',
    updated_at: '2024-01-12T15:20:00Z'
  }
];

// 6. VENDOR TABLE
export const vendors = [
  {
    vendor_id: 'VENDOR_001',
    tenant_id: 'TENANT_001',
    name: 'Shree Cement Ltd',
    contact_email: 'sales@shreecement.com',
    contact_phone: '+91 9876543270',
    gst_number: '09FFFFF5555F6Z0',
    material_type: 'Cement',
    created_at: '2024-01-07T00:00:00Z',
    updated_at: '2024-01-14T11:10:00Z'
  },
  {
    vendor_id: 'VENDOR_002',
    tenant_id: 'TENANT_001',
    name: 'Steel India Corporation',
    contact_email: 'orders@steelindia.com',
    contact_phone: '+91 9876543271',
    gst_number: '09GGGGG6666G7Z1',
    material_type: 'Steel',
    created_at: '2024-01-08T00:00:00Z',
    updated_at: '2024-01-13T13:25:00Z'
  }
];

// 7. SITE TABLE
export const sites = [
  {
    site_id: 'SITE_001',
    project_id: 'PROJECT_001',
    name: 'Mall Main Building',
    location: 'Gomti Nagar, Lucknow',
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-15T16:40:00Z'
  },
  {
    site_id: 'SITE_002',
    project_id: 'PROJECT_001',
    name: 'Mall Parking Area',
    location: 'Gomti Nagar, Lucknow',
    created_at: '2024-01-11T00:00:00Z',
    updated_at: '2024-01-14T12:30:00Z'
  }
];

// 8. MATERIAL & INVENTORY TABLE
export const materials = [
  {
    material_id: 'MATERIAL_001',
    tenant_id: 'TENANT_001',
    project_id: 'PROJECT_001',
    vendor_id: 'VENDOR_001',
    name: 'OPC Cement',
    quantity: 500.00,
    unit: 'Bags',
    issued_to_site: 150.00,
    reorder_level: 50.00,
    created_at: '2024-01-12T00:00:00Z',
    updated_at: '2024-01-15T14:15:00Z'
  },
  {
    material_id: 'MATERIAL_002',
    tenant_id: 'TENANT_001',
    project_id: 'PROJECT_001',
    vendor_id: 'VENDOR_002',
    name: 'TMT Steel Bars',
    quantity: 25.00,
    unit: 'Tons',
    issued_to_site: 8.00,
    reorder_level: 5.00,
    created_at: '2024-01-13T00:00:00Z',
    updated_at: '2024-01-14T10:20:00Z'
  }
];

// 9. TASK / WORKFLOW TABLE
export const tasks = [
  {
    task_id: 'TASK_001',
    project_id: 'PROJECT_001',
    site_id: 'SITE_001',
    contractor_id: 'CONTRACTOR_001',
    name: 'Foundation Excavation',
    start_date: '2024-01-15',
    end_date: '2024-01-25',
    status: 'Ongoing',
    progress_percent: 65,
    daily_report: 'Foundation work progressing well. Weather conditions favorable.',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T17:30:00Z'
  },
  {
    task_id: 'TASK_002',
    project_id: 'PROJECT_001',
    site_id: 'SITE_001',
    contractor_id: 'CONTRACTOR_002',
    name: 'Electrical Wiring - Ground Floor',
    start_date: '2024-01-20',
    end_date: '2024-02-05',
    status: 'Pending',
    progress_percent: 0,
    daily_report: 'Waiting for foundation completion.',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T17:30:00Z'
  }
];

// 10. FINANCE / EXPENSE TABLE
export const finances = [
  {
    finance_id: 'FINANCE_001',
    project_id: 'PROJECT_001',
    type: 'Expense',
    description: 'Cement purchase for foundation',
    amount: 76000.00,
    vendor_id: 'VENDOR_001',
    contractor_id: null,
    client_id: null,
    status: 'Paid',
    payment_date: '2024-01-12',
    created_at: '2024-01-12T00:00:00Z',
    updated_at: '2024-01-12T14:20:00Z'
  },
  {
    finance_id: 'FINANCE_002',
    project_id: 'PROJECT_001',
    type: 'Revenue',
    description: 'First milestone payment from client',
    amount: 1500000.00,
    vendor_id: null,
    contractor_id: null,
    client_id: 'CLIENT_001',
    status: 'Paid',
    payment_date: '2024-01-14',
    created_at: '2024-01-14T00:00:00Z',
    updated_at: '2024-01-14T16:45:00Z'
  },
  {
    finance_id: 'FINANCE_003',
    project_id: 'PROJECT_001',
    type: 'Payment',
    description: 'Foundation contractor payment',
    amount: 500000.00,
    vendor_id: null,
    contractor_id: 'CONTRACTOR_001',
    client_id: null,
    status: 'Pending',
    payment_date: null,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T18:10:00Z'
  }
];

// 11. DAILY REPORT / ATTENDANCE TABLE
export const dailyReports = [
  {
    report_id: 'REPORT_001',
    project_id: 'PROJECT_001',
    site_id: 'SITE_001',
    user_id: 'USER_003',
    attendance: {
      total_workers: 25,
      present: 22,
      absent: 3,
      workers: [
        { name: 'Rajesh Kumar', role: 'Mason', status: 'Present', hours: 8 },
        { name: 'Suresh Singh', role: 'Helper', status: 'Present', hours: 8 },
        { name: 'Amit Sharma', role: 'Electrician', status: 'Absent', hours: 0 }
      ]
    },
    work_progress: {
      foundation: { planned: 100, actual: 65, status: 'On Track' },
      excavation: { planned: 80, actual: 85, status: 'Ahead' }
    },
    materials_used: {
      cement: { quantity: 15, unit: 'Bags' },
      steel: { quantity: 2.5, unit: 'Tons' },
      sand: { quantity: 8, unit: 'Trucks' }
    },
    photos: [
      'https://example.com/site-photo-1.jpg',
      'https://example.com/site-photo-2.jpg'
    ],
    created_at: '2024-01-15T18:00:00Z',
    updated_at: '2024-01-15T18:00:00Z'
  }
];

// ADDITIONAL HELPER DATA
export const roles = ['Admin', 'Manager', 'Engineer', 'Supervisor', 'Contractor', 'Vendor', 'Accountant', 'Client'];
export const projectStatuses = ['Planning', 'Ongoing', 'Paused', 'Completed', 'Cancelled'];
export const taskStatuses = ['Pending', 'Ongoing', 'Completed', 'On Hold'];
export const financeTypes = ['Expense', 'Revenue', 'Payment'];
export const paymentStatuses = ['Pending', 'Paid', 'Overdue', 'Cancelled'];

// SUMMARY STATISTICS
export const summaryStats = {
  totalTenants: tenants.length,
  totalUsers: users.length,
  totalProjects: projects.length,
  totalClients: clients.length,
  totalContractors: contractors.length,
  totalVendors: vendors.length,
  totalMaterials: materials.length,
  totalTasks: tasks.length,
  totalFinanceRecords: finances.length,
  totalDailyReports: dailyReports.length
};