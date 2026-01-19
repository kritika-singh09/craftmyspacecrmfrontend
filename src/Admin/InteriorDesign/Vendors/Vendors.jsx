import React, { useState } from 'react';
import { commonVendors as initialVendors } from '../../../data/tenantData';
import { useTheme } from '../../../context/ThemeContext';
import VendorForm from '../../GlobalModules/Vendors/VendorForm';
import POForm from '../../GlobalModules/Vendors/POForm';
import VendorDetails from '../../GlobalModules/Vendors/VendorDetails';
import RoleGuard from '../../../common/RoleGuard';
import { FiPlus, FiEdit2, FiTrash2, FiPackage, FiInfo, FiX, FiCheckCircle } from 'react-icons/fi';

const IntVendors = () => {
    const { theme } = useTheme();
    const [vendorList, setVendorList] = useState(initialVendors);
    const [showForm, setShowForm] = useState(false);
    const [editingVendor, setEditingVendor] = useState(null);

    const [showPOForm, setShowPOForm] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);

    const [poOrders, setPOOrders] = useState([
        { id: 1, poNumber: "PO-INT-001", vendorName: "Modular Kraft", material: "Ply & Laminate", amount: 120000, status: "Pending", details: "Kitchen Module" },
        { id: 2, poNumber: "PO-INT-002", vendorName: "Glow Electricals", material: "Lights", amount: 45000, status: "Delivered", details: "Living Room Setup" }
    ]);

    const handleCreatePO = (vendor) => {
        setSelectedVendor(vendor);
        setShowPOForm(true);
    };

    const handlePOSubmit = (poData) => {
        const newOrder = {
            id: poOrders.length + 1,
            poNumber: poData.poNumber,
            vendorName: poData.vendorName,
            material: poData.material,
            amount: poData.totalAmount,
            status: "Pending",
            details: `${poData.quantity} Units ${poData.material}`
        };
        setPOOrders([newOrder, ...poOrders]);
        setShowPOForm(false);
    };

    const handleViewDetails = (vendor) => {
        setSelectedVendor(vendor);
        setShowDetails(true);
    };

    const handleAdd = () => {
        setEditingVendor(null);
        setShowForm(true);
    };

    const handleEdit = (vendor) => {
        setEditingVendor(vendor);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to remove this vendor?")) {
            setVendorList(vendorList.filter(v => v.id !== id));
        }
    };

    const handleFormSubmit = (formData) => {
        if (editingVendor) {
            setVendorList(vendorList.map(v =>
                v.id === editingVendor.id ? { ...v, ...formData } : v
            ));
        } else {
            const newVendor = {
                ...formData,
                id: Math.max(0, ...vendorList.map(v => v.id)) + 1
            };
            setVendorList([...vendorList, newVendor]);
        }
        setShowForm(false);
    };

    if (showDetails && selectedVendor) {
        return (
            <VendorDetails
                vendor={selectedVendor}
                onBack={() => setShowDetails(false)}
            />
        );
    }

    return (
        <div className="space-y-8 pb-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: theme.textPrimary }}>Vendor <span style={{ color: theme.secondary }}>Eco-system</span></h2>
                    <p className="text-sm font-medium mt-1" style={{ color: theme.textSecondary }}>Sourcing and Procurement Hub</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="group flex items-center gap-2 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-[0.15em] text-[11px] shadow-premium transition-all hover:-translate-y-0.5"
                    style={{ background: theme.gradients.button }}
                >
                    <FiPlus className="text-sm group-hover:rotate-90 transition-transform" />
                    Onboard Vendor
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendorList.map((vendor) => (
                    <div key={vendor.id} className="card-premium p-6 group flex flex-col" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-lg font-black transition-colors leading-tight mb-1" style={{ color: theme.textPrimary }}>{vendor.name}</h3>
                                <div className="flex items-center gap-1.5">
                                    <FiCheckCircle className="text-[10px] text-green-500" />
                                    <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: theme.textMuted }}>Certified Supplier</p>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                {/* Removed RoleGuard for simplicity in this context or keep if needed */}
                                <button
                                    onClick={() => handleEdit(vendor)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg border transition-all hover:text-white"
                                    style={{ borderColor: theme.cardBorder, color: theme.textSecondary }}
                                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = theme.primary; e.currentTarget.style.borderColor = theme.primary; }}
                                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = theme.cardBorder; }}
                                >
                                    <FiEdit2 size={14} />
                                </button>
                                <button
                                    onClick={() => handleDelete(vendor.id)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-red-100 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                                >
                                    <FiTrash2 size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6 flex-grow">
                            <div className="flex justify-between items-center py-2.5 border-b" style={{ borderColor: theme.cardBorder }}>
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textMuted }}>Primary Material</span>
                                <span className="text-xs font-black uppercase tracking-tight" style={{ color: theme.textPrimary }}>{vendor.material || 'General'}</span>
                            </div>
                            <div className="flex justify-between items-center py-2.5 border-b" style={{ borderColor: theme.cardBorder }}>
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textMuted }}>Current Rate</span>
                                <span className="text-sm font-black" style={{ color: theme.textSecondary }}>₹{vendor.rate || 'N/A'}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-auto">
                            <button
                                onClick={() => handleCreatePO(vendor)}
                                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white text-[11px] font-black uppercase tracking-[0.15em] shadow-premium-sm transition-all hover:-translate-y-0.5"
                                style={{ background: theme.gradients.button }}
                            >
                                <FiPackage className="text-sm" />
                                Create PO
                            </button>
                            <button
                                onClick={() => handleViewDetails(vendor)}
                                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] transition-all border-2"
                                style={{ backgroundColor: theme.background, color: theme.textPrimary, borderColor: theme.cardBorder }}
                                onMouseOver={(e) => { e.currentTarget.style.borderColor = theme.primary; e.currentTarget.style.color = theme.primary; }}
                                onMouseOut={(e) => { e.currentTarget.style.borderColor = theme.cardBorder; e.currentTarget.style.color = theme.textPrimary; }}
                            >
                                <FiInfo className="text-sm" />
                                Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showForm && (
                <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-[100] p-4" style={{ backgroundColor: `${theme.textPrimary}40` }}>
                    <div className="bg-white rounded-[2.5rem] shadow-premium w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-300" style={{ backgroundColor: theme.cardBg }}>
                        <div className="table-header-premium p-6 text-white relative" style={{ background: theme.gradients.primary }}>
                            <div className="pr-12">
                                <h3 className="text-xl font-black">
                                    {editingVendor ? 'Edit Vendor' : 'Register New Vendor'}
                                </h3>
                                <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest mt-1">Certified Supply Partner</p>
                            </div>
                            <button
                                onClick={() => setShowForm(false)}
                                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white"
                            >
                                <FiX />
                            </button>
                        </div>
                        <div className="p-8">
                            <VendorForm
                                onSubmit={handleFormSubmit}
                                initialData={editingVendor}
                            />
                        </div>
                    </div>
                </div>
            )}

            {showPOForm && selectedVendor && (
                <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-[100] p-4" style={{ backgroundColor: `${theme.textPrimary}40` }}>
                    <div className="bg-white rounded-[2.5rem] shadow-premium w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-300" style={{ backgroundColor: theme.cardBg }}>
                        <div className="table-header-premium p-6 text-white relative" style={{ background: theme.gradients.primary }}>
                            <div className="pr-12">
                                <h3 className="text-xl font-black">Create Purchase Order</h3>
                                <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest mt-1">Inventory Replenishment</p>
                            </div>
                            <button
                                onClick={() => setShowPOForm(false)}
                                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white"
                            >
                                <FiX />
                            </button>
                        </div>
                        <div className="p-8">
                            <POForm
                                vendor={selectedVendor}
                                onSubmit={handlePOSubmit}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Purchase Orders Section */}
            <div className="card-premium p-8" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-lg font-bold" style={{ color: theme.textPrimary }}>Recent Purchase Orders</h3>
                    <button className="text-xs font-semibold hover:text-opacity-80 transition-colors uppercase tracking-wider" style={{ color: theme.textSecondary }}>View All Orders</button>
                </div>
                <div className="space-y-4">
                    {poOrders.map((order) => (
                        <div
                            key={order.id}
                            className="group flex justify-between items-center p-4 rounded-2xl border transition-all cursor-pointer"
                            style={{
                                backgroundColor: `${theme.iconBg}10`,
                                borderColor: theme.cardBorder
                            }}
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-lg shadow-sm border group-hover:scale-110 transition-transform"
                                    style={{
                                        backgroundColor: theme.cardBg,
                                        borderColor: theme.cardBorder,
                                        color: theme.textSecondary
                                    }}
                                >📄</div>
                                <div>
                                    <p className="font-bold transition-colors" style={{ color: theme.textPrimary }}>{order.poNumber} - {order.vendorName}</p>
                                    <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: theme.textMuted }}>{order.details} • ₹{order.amount.toLocaleString()}</p>
                                </div>
                            </div>
                            <span
                                className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-xl border ${order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                    }`}
                            >
                                {order.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IntVendors;
