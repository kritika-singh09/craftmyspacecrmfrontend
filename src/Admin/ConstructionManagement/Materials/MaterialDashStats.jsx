import { useTheme } from '../../../context/ThemeContext';
import { FiBox, FiAlertTriangle, FiFileText, FiShoppingCart } from 'react-icons/fi';

const MaterialDashStats = ({ inventory = [], indents = [], orders = [] }) => {
    const { theme } = useTheme();

    // Calculate Stats
    const lowStockCount = inventory.filter(i => i.availableStock <= i.reorderLevel).length;
    const pendingIndents = indents.filter(i => i.status === 'PENDING').length;
    const pendingPOs = orders.filter(o => o.status === 'PENDING_APPROVAL').length;
    const totalValue = inventory.reduce((sum, item) => sum + (item.totalStock * 100), 0); // Placeholder rate 100 if unknown

    const cards = [
        {
            label: 'Inventory Value',
            value: `₹${(totalValue / 100000).toFixed(2)}L`,
            icon: <FiBox />,
            color: 'text-blue-500',
            bg: 'bg-blue-50',
            border: 'border-blue-100'
        },
        {
            label: 'Critical Stock',
            value: lowStockCount,
            icon: <FiAlertTriangle />,
            color: lowStockCount > 0 ? 'text-red-500' : 'text-green-500',
            bg: lowStockCount > 0 ? 'bg-red-50' : 'bg-green-50',
            border: lowStockCount > 0 ? 'border-red-100' : 'border-green-100'
        },
        {
            label: 'Pending Indents',
            value: pendingIndents,
            icon: <FiFileText />,
            color: 'text-amber-500',
            bg: 'bg-amber-50',
            border: 'border-amber-100'
        },
        {
            label: 'Open POs',
            value: pendingPOs,
            icon: <FiShoppingCart />,
            color: 'text-purple-500',
            bg: 'bg-purple-50',
            border: 'border-purple-100'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cards.map((card, i) => (
                <div key={i} className={`p-6 rounded-2xl border ${card.bg} ${card.border} flex items-center gap-4 transition-transform hover:-translate-y-1`}>
                    <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center text-xl shadow-sm ${card.color}`}>
                        {card.icon}
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: theme.textSecondary }}>{card.label}</p>
                        <h3 className="text-2xl font-black mt-1" style={{ color: theme.textPrimary }}>{card.value}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MaterialDashStats;
