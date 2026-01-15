// Tenant-specific data for multi-company CRM
export const tenantData = {
  'TENANT_001': { // HARR Construction
    projects: [
      { id: 1, name: "Shopping Mall", location: "Lucknow", status: "Ongoing", progress: 65, budget: 50000000 },
      { id: 2, name: "Residential Tower", location: "Delhi", status: "Ongoing", progress: 40, budget: 30000000 },
      { id: 3, name: "Highway Project", location: "Kanpur", status: "Planning", progress: 10, budget: 100000000 }
    ],
    contractors: [
      { id: 1, name: "Foundation Specialist", type: "Foundation", projects: ["Mall", "Tower"] },
      { id: 2, name: "Electrical Contractor", type: "Electrical", projects: ["Mall"] },
      { id: 3, name: "Plumbing Contractor", type: "Plumbing", projects: ["Tower"] }
    ],
    clients: [
      { id: 1, name: "Rajesh Enterprises", project: "Shopping Mall", contact: "+91 9876543210", status: "Active" },
      { id: 2, name: "Sharma Builders", project: "Residential Tower", contact: "+91 9876543211", status: "Active" }
    ],
    workforce: [
      { id: 1, name: "Rajesh Kumar", role: "Mason", wage: 800, project: "Mall" },
      { id: 2, name: "Suresh Singh", role: "Electrician", wage: 1200, project: "Mall" },
      { id: 3, name: "Amit Sharma", role: "Supervisor", wage: 2000, project: "Tower" }
    ]
  },
  
  'TENANT_002': { // ABC Builders
    projects: [
      { id: 1, name: "Office Complex", location: "Mumbai", status: "Ongoing", progress: 75, budget: 80000000 },
      { id: 2, name: "School Building", location: "Pune", status: "Completed", progress: 100, budget: 25000000 }
    ],
    contractors: [
      { id: 1, name: "Steel Works Ltd", type: "Structure", projects: ["Office Complex"] },
      { id: 2, name: "Interior Designs", type: "Interior", projects: ["School Building"] }
    ],
    clients: [
      { id: 1, name: "Tech Corp", project: "Office Complex", contact: "+91 9876543220", status: "Active" },
      { id: 2, name: "Education Board", project: "School Building", contact: "+91 9876543221", status: "Completed" }
    ],
    workforce: [
      { id: 1, name: "Vikram Patel", role: "Engineer", wage: 3000, project: "Office Complex" },
      { id: 2, name: "Ravi Gupta", role: "Mason", wage: 900, project: "Office Complex" }
    ]
  },

  'TENANT_003': { // XYZ Infra
    projects: [
      { id: 1, name: "Bridge Construction", location: "Bangalore", status: "Ongoing", progress: 30, budget: 150000000 },
      { id: 2, name: "Metro Station", location: "Chennai", status: "Planning", progress: 5, budget: 200000000 }
    ],
    contractors: [
      { id: 1, name: "Heavy Machinery Co", type: "Equipment", projects: ["Bridge"] },
      { id: 2, name: "Concrete Specialists", type: "Structure", projects: ["Bridge", "Metro"] }
    ],
    clients: [
      { id: 1, name: "State Government", project: "Bridge Construction", contact: "+91 9876543230", status: "Active" },
      { id: 2, name: "Metro Authority", project: "Metro Station", contact: "+91 9876543231", status: "Planning" }
    ],
    workforce: [
      { id: 1, name: "Arjun Singh", role: "Site Engineer", wage: 4000, project: "Bridge" },
      { id: 2, name: "Mohan Das", role: "Operator", wage: 1500, project: "Bridge" }
    ]
  },

  'TENANT_004': { // Sharma Constructions
    projects: [
      { id: 1, name: "Villa Project", location: "Goa", status: "Ongoing", progress: 85, budget: 15000000 },
      { id: 2, name: "Apartment Complex", location: "Jaipur", status: "Ongoing", progress: 55, budget: 45000000 }
    ],
    contractors: [
      { id: 1, name: "Luxury Interiors", type: "Interior", projects: ["Villa"] },
      { id: 2, name: "Garden Landscaping", type: "Landscaping", projects: ["Villa", "Apartment"] }
    ],
    clients: [
      { id: 1, name: "Resort Owner", project: "Villa Project", contact: "+91 9876543240", status: "Active" },
      { id: 2, name: "Housing Society", project: "Apartment Complex", contact: "+91 9876543241", status: "Active" }
    ],
    workforce: [
      { id: 1, name: "Kiran Joshi", role: "Interior Designer", wage: 2500, project: "Villa" },
      { id: 2, name: "Deepak Yadav", role: "Gardener", wage: 700, project: "Villa" }
    ]
  }
};

// Common materials and vendors (shared across tenants but with tenant-specific usage)
export const commonMaterials = [
  { id: 1, name: "Cement", unit: "Bags", stock: 500, minStock: 50 },
  { id: 2, name: "Steel", unit: "Tons", stock: 25, minStock: 5 },
  { id: 3, name: "Sand", unit: "Trucks", stock: 15, minStock: 3 }
];

export const commonVendors = [
  { id: 1, name: "Shree Cement Ltd", material: "Cement", rate: 380 },
  { id: 2, name: "Steel India", material: "Steel", rate: 45000 },
  { id: 3, name: "Sand Suppliers", material: "Sand", rate: 1200 }
];