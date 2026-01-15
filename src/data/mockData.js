// Mock data for Construction Management CRM
export const companies = [
  { id: 1, name: "HARR Construction", projects: 3, status: "Active" },
  { id: 2, name: "ABC Builders", projects: 2, status: "Active" }
];

export const projects = [
  { id: 1, name: "Shopping Mall", location: "Lucknow", status: "Ongoing", progress: 65, budget: 50000000 },
  { id: 2, name: "Residential Tower", location: "Delhi", status: "Ongoing", progress: 40, budget: 30000000 },
  { id: 3, name: "Highway Project", location: "Kanpur", status: "Planning", progress: 10, budget: 100000000 }
];

export const contractors = [
  { id: 1, name: "Foundation Specialist", type: "Foundation", projects: ["Mall", "Tower"] },
  { id: 2, name: "Electrical Contractor", type: "Electrical", projects: ["Mall"] },
  { id: 3, name: "Plumbing Contractor", type: "Plumbing", projects: ["Tower"] }
];

export const vendors = [
  { id: 1, name: "Shree Cement Ltd", material: "Cement", rate: 380 },
  { id: 2, name: "Steel India", material: "Steel", rate: 45000 },
  { id: 3, name: "Sand Suppliers", material: "Sand", rate: 1200 }
];

export const materials = [
  { id: 1, name: "Cement", unit: "Bags", stock: 500, minStock: 50 },
  { id: 2, name: "Steel", unit: "Tons", stock: 25, minStock: 5 },
  { id: 3, name: "Sand", unit: "Trucks", stock: 15, minStock: 3 }
];

export const workforce = [
  { id: 1, name: "Rajesh Kumar", role: "Mason", wage: 800, project: "Mall" },
  { id: 2, name: "Suresh Singh", role: "Electrician", wage: 1200, project: "Mall" },
  { id: 3, name: "Amit Sharma", role: "Supervisor", wage: 2000, project: "Tower" }
];