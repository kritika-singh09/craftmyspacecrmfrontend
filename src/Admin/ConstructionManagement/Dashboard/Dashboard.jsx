import { useTenant } from '../../../hooks/useTenant.jsx';
import { useAuth } from '../../../hooks/useAuth.jsx';
import { useTheme } from '../../../context/ThemeContext.jsx';
import { tenantData } from '../../../data/tenantData';
import { FiCalendar, FiTool, FiTruck, FiUsers, FiPackage, FiZap, FiGrid } from 'react-icons/fi';
import { GiConcreteBag, GiBrickWall, GiWindow } from 'react-icons/gi';
import {
  UpdateCard,
  MetricCard,
  TransactionList,
  RevenueChart,
  PerformanceDonut,
  SalesReport,
  PromotionalCard
} from '../../../components/DashboardComponents';

const Dashboard = () => {
  const { currentTenant } = useTenant();
  const { user } = useAuth();
  const { theme } = useTheme();
  const data = tenantData[currentTenant.id];

  // Calculate construction-specific metrics
  const activeProjects = data.projects.filter(p => p.status === 'Ongoing').length;
  const totalRevenue = 485000;
  const netIncome = 485000;
  const totalReturn = 125000;

  // Construction-specific transactions
  const transactions = [
    { icon: <GiConcreteBag className="text-2xl" />, name: 'Concrete Delivery', date: 'Jan 15th 2024', transactionId: '0.CONS2578GC', status: 'Completed' },
    { icon: <FiTruck className="text-2xl" />, name: 'Excavator Rental', date: 'Jan 14th 2024', transactionId: '0.CONS2579GC', status: 'Pending' },
    { icon: <FiUsers className="text-2xl" />, name: 'Labor Payment', date: 'Jan 13th 2024', transactionId: '0.CONS2580GC', status: 'Completed' },
    { icon: <FiPackage className="text-2xl" />, name: 'Steel Beams Order', date: 'Jan 12th 2024', transactionId: '0.CONS2581GC', status: 'Processing' },
    { icon: <GiBrickWall className="text-2xl" />, name: 'Brick Supply', date: 'Jan 11th 2024', transactionId: '0.CONS2582GC', status: 'Completed' },
    { icon: <FiZap className="text-2xl" />, name: 'Electrical Materials', date: 'Jan 10th 2024', transactionId: '0.CONS2583GC', status: 'Completed' },
    { icon: <GiWindow className="text-2xl" />, name: 'Window Installation', date: 'Jan 9th 2024', transactionId: '0.CONS2584GC', status: 'Pending' }
  ];

  // Construction revenue data
  const revenueData = {
    income: [120, 145, 135, 180, 165, 195],
    expenses: [65, 75, 85, 95, 105, 115]
  };
  const revenueLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  // Construction performance metrics
  const performanceMetrics = [
    { label: 'On Schedule', value: '285K', percentage: 42, color: theme.textPrimary },
    { label: 'Delayed', value: '125K', percentage: 18, color: '#FF6B6B' },
    { label: 'Completed', value: '275K', percentage: 40, color: theme.iconBg }
  ];

  // Construction project categories
  const salesReportItems = [
    { label: 'Residential Projects', value: '18', progress: 85, color: theme.textPrimary },
    { label: 'Commercial Projects', value: '12', progress: 68, color: theme.textSecondary },
    { label: 'Infrastructure', value: '8', progress: 92, color: theme.iconBg }
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight" style={{ color: theme.textPrimary }}>
            Construction Management Dashboard
          </h2>
          <p className="text-sm font-medium mt-1" style={{ color: theme.textMuted }}>
            Build with precision, deliver with excellence.
          </p>
        </div>
        <div
          className="px-4 py-2 rounded-xl shadow-sm border text-xs font-semibold"
          style={{ background: 'white', borderColor: `${theme.iconBg}15`, color: theme.textPrimary }}
        >
          <FiCalendar className="inline mr-2" /> January 2024 - June 2024
        </div>
      </div>

      {/* Top Row: Update Card, Metrics, Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <UpdateCard
          title="Active projects increased"
          percentage="42%"
          timeframe="1 Month"
          link="See Statistics"
          icon={<FiTool className="text-3xl" />}
          bgGradient={theme.gradients?.primary || 'linear-gradient(135deg, #065f46 0%, #0f766e 100%)'}
        />

        <MetricCard
          label="Project Revenue"
          value="485,000"
          trend="up"
          trendValue="+15%"
          prefix="$"
        />

        <MetricCard
          label="Net Profit"
          value="125,000"
          trend="up"
          trendValue="+12%"
          prefix="$"
        />

        <PerformanceDonut
          title="Project Status"
          total="685K"
          metrics={performanceMetrics}
        />
      </div>

      {/* Middle Row: Transactions and Revenue Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TransactionList
          title="Recent Transactions"
          transactions={transactions}
          viewAllLink={true}
        />

        <div className="lg:col-span-2">
          <RevenueChart
            title="Project Revenue"
            total="485,000"
            trend="up"
            trendValue="+32%"
            data={revenueData}
            labels={revenueLabels}
          />
        </div>
      </div>

      {/* Bottom Row: Sales Report and Promotional Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesReport
          title="Project Categories"
          items={salesReportItems}
        />

        <PromotionalCard
          title="Scale your construction"
          subtitle="to enterprise level."
          description="Advanced project management tools and real-time site monitoring."
          buttonText="Upgrade to Pro"
          emoji={<FiTool />}
          bgGradient={theme.gradients?.sidebar || 'linear-gradient(135deg, #A8D08D 0%, #F5F5DC 100%)'}
        />
      </div>
    </div>
  );
};

export default Dashboard;
