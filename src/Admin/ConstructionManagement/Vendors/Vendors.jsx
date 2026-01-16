import { vendors } from '../../../data/mockData';

const Vendors = () => {
  return (
    <div className="space-y-8 pb-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Vendors</h2>
          <p className="text-sm font-medium text-gray-900 dark:text-brand-300 mt-1">Sourcing and Procurement Hub</p>
        </div>
        <button className="group flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-premium hover:bg-brand-700 transition-all hover:-translate-y-0.5">
          <span className="text-xl leading-none group-hover:rotate-90 transition-transform">+</span>
          Add Vendor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="card-premium p-8 group">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-tight mb-1">{vendor.name}</h3>
                <p className="text-[10px] font-semibold text-gray-900 dark:text-brand-400 uppercase tracking-widest">Certified Supplier</p>
              </div>
              <span className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-800 rounded-lg">
                Active
              </span>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-2 border-b border-brand-50/50 dark:border-brand-800/50">
                <span className="text-[11px] font-bold text-gray-900 dark:text-brand-400 uppercase tracking-tight">Primary Material</span>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{vendor.material}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-brand-800/50">
                <span className="text-[11px] font-semibold text-gray-900 dark:text-brand-400 uppercase tracking-tight">Current Rate</span>
                <span className="text-sm font-bold text-brand-600 dark:text-brand-300 font-display">₹{vendor.rate}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-auto">
              <button className="py-2.5 px-4 rounded-xl bg-brand-600 text-white text-[11px] font-bold uppercase tracking-wider hover:bg-brand-700 shadow-sm transition-all">
                Create PO
              </button>
              <button className="py-2.5 px-4 rounded-xl bg-gray-50 dark:bg-brand-900/30 text-gray-900 dark:text-brand-300 text-[11px] font-bold uppercase tracking-wider hover:bg-gray-100 dark:hover:bg-brand-800 transition-all">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Purchase Orders Section */}
      <div className="card-premium p-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Purchase Orders</h3>
          <button className="text-xs font-semibold text-brand-600 dark:text-brand-300 hover:text-brand-800 dark:hover:text-white transition-colors uppercase tracking-wider">View All Orders</button>
        </div>
        <div className="space-y-4">
          <div className="group flex justify-between items-center p-4 bg-blue-50/30 dark:bg-blue-900/40 rounded-2xl border border-blue-100/50 dark:border-blue-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/60 transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white dark:bg-brand-800 rounded-xl flex items-center justify-center text-lg shadow-sm border border-brand-100 dark:border-brand-700 group-hover:scale-110 transition-transform text-brand-600 dark:text-brand-200">📄</div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">PO-001 - Shree Cement Ltd</p>
                <p className="text-[11px] font-bold text-gray-900 dark:text-brand-400 uppercase tracking-widest">200 Bags Cement • ₹76,000</p>
              </div>
            </div>
            <span className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800 rounded-xl">
              Pending
            </span>
          </div>
          <div className="group flex justify-between items-center p-4 bg-blue-50/30 dark:bg-blue-900/40 rounded-2xl border border-blue-100/50 dark:border-blue-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/60 transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white dark:bg-brand-800 rounded-xl flex items-center justify-center text-lg shadow-sm border border-brand-100 dark:border-brand-700 group-hover:scale-110 transition-transform text-brand-600 dark:text-brand-200">📄</div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">PO-002 - Steel India</p>
                <p className="text-[11px] font-bold text-gray-900 dark:text-brand-400 uppercase tracking-widest">5 Tons Steel • ₹2,25,000</p>
              </div>
            </div>
            <span className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 rounded-xl">
              Delivered
            </span>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Vendors;
