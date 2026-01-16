import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { FiCalendar, FiPackage, FiImage } from 'react-icons/fi';
import { MdChair, MdLightbulb, MdPalette, MdWindow, MdBed, MdLocalFlorist } from 'react-icons/md';
import { GiSparkles } from 'react-icons/gi';
import {
    UpdateCard,
    MetricCard,
    TransactionList,
    RevenueChart,
    PerformanceDonut,
    SalesReport,
    PromotionalCard
} from '../../../components/DashboardComponents';

const IntDashboard = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();

    // Interior Design specific transactions
    const transactions = [
        { icon: <MdChair className="text-2xl" />, name: 'Italian Leather Sofa', date: 'Jan 15th 2024', transactionId: '0.INT2578GC', status: 'Completed' },
        { icon: <MdLightbulb className="text-2xl" />, name: 'Chandelier Collection', date: 'Jan 14th 2024', transactionId: '0.INT2579GC', status: 'Pending' },
        { icon: <MdPalette className="text-2xl" />, name: 'Premium Wall Texture', date: 'Jan 13th 2024', transactionId: '0.INT2580GC', status: 'Completed' },
        { icon: <MdWindow className="text-2xl" />, name: 'Smart Blinds System', date: 'Jan 12th 2024', transactionId: '0.INT2581GC', status: 'Processing' },
        { icon: <MdBed className="text-2xl" />, name: 'Custom Wardrobe', date: 'Jan 11th 2024', transactionId: '0.INT2582GC', status: 'Completed' },
        { icon: <FiImage className="text-2xl" />, name: 'Contemporary Art', date: 'Jan 10th 2024', transactionId: '0.INT2583GC', status: 'Completed' },
        { icon: <MdLocalFlorist className="text-2xl" />, name: 'Vertical Garden', date: 'Jan 9th 2024', transactionId: '0.INT2584GC', status: 'Pending' }
    ];

    // Interior design revenue data
    const revenueData = {
        income: [85, 95, 105, 125, 115, 135],
        expenses: [45, 50, 55, 65, 70, 75]
    };
    const revenueLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    // Interior performance metrics
    const performanceMetrics = [
        { label: 'Client Approvals', value: '245K', percentage: 35, color: theme.textPrimary },
        { label: '3D Renders', value: '180K', percentage: 28, color: '#FF6B6B' },
        { label: 'Installations', value: '265K', percentage: 37, color: theme.iconBg }
    ];

    // Interior design categories
    const salesReportItems = [
        { label: 'Residential Interiors', value: '24', progress: 88, color: theme.textPrimary },
        { label: 'Office Spaces', value: '16', progress: 72, color: theme.textSecondary },
        { label: 'Retail Design', value: '12', progress: 65, color: theme.iconBg }
    ];

    return (
        <div className="space-y-6 pb-8">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight" style={{ color: theme.textPrimary }}>Interior Design Dashboard</h2>
                    <p className="text-sm font-medium mt-1" style={{ color: theme.textMuted }}>Transform spaces with precision and creativity.</p>
                </div>
                <div
                    className="px-4 py-2 rounded-xl shadow-sm border text-xs font-semibold"
                    style={{
                        background: theme.cardBg || 'white',
                        borderColor: theme.borderColor || `${theme.iconBg}15`,
                        color: theme.textPrimary
                    }}
                >
                    <FiCalendar className="inline mr-2" /> January 2024 - June 2024
                </div>
            </div>

            {/* Top Row: Update Card, Metrics, Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <UpdateCard
                    title="Design approvals increased"
                    percentage="38%"
                    timeframe="1 Month"
                    link="See Statistics"
                    icon={<MdPalette className="text-3xl" />}
                    bgGradient={theme.gradients?.primary || 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)'}
                />

                <MetricCard
                    label="Design Revenue"
                    value="325,000"
                    trend="up"
                    trendValue="+18%"
                    prefix="$"
                />

                <MetricCard
                    label="Client Satisfaction"
                    value="96.5"
                    trend="up"
                    trendValue="+4.2%"
                    prefix=""
                />

                <PerformanceDonut
                    title="Design Status"
                    total="690K"
                    metrics={performanceMetrics}
                />
            </div>

            {/* Middle Row: Transactions and Revenue Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <TransactionList
                    title="Recent Orders"
                    transactions={transactions}
                    viewAllLink={true}
                />

                <div className="lg:col-span-2">
                    <RevenueChart
                        title="Design Revenue"
                        total="325,000"
                        trend="up"
                        trendValue="+26%"
                        data={revenueData}
                        labels={revenueLabels}
                    />
                </div>
            </div>

            {/* Bottom Row: Sales Report and Promotional Card */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SalesReport
                    title="Design Categories"
                    items={salesReportItems}
                />

                <PromotionalCard
                    title="Elevate your designs"
                    subtitle="to premium tier."
                    description="Access exclusive materials, 3D visualization, and VR walkthroughs."
                    buttonText="Upgrade to Premium"
                    emoji={<GiSparkles />}
                    bgGradient={theme.gradients?.sidebar || 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'}
                    onClick={() => navigate('/profile')}
                />
            </div>
        </div>
    );
};

export default IntDashboard;
