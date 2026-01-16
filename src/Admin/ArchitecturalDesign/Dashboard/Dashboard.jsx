import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import {
    UpdateCard,
    MetricCard,
    TransactionList,
    RevenueChart,
    PerformanceDonut,
    SalesReport,
    PromotionalCard
} from '../../../components/DashboardComponents';

const ArchDashboard = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();

    // Architecture specific transactions
    const transactions = [
        { icon: '📐', name: 'Villa Blueprint Design', date: 'Jan 15th 2024', transactionId: '0.ARCH2578GC', status: 'Completed' },
        { icon: '🏢', name: 'Corporate HQ Tower', date: 'Jan 14th 2024', transactionId: '0.ARCH2579GC', status: 'Pending' },
        { icon: '🏗️', name: 'Factory Layout Plan', date: 'Jan 13th 2024', transactionId: '0.ARCH2580GC', status: 'Processing' },
        { icon: '🏛️', name: 'Museum Restoration', date: 'Jan 12th 2024', transactionId: '0.ARCH2581GC', status: 'Completed' },
        { icon: '🌆', name: 'Smart City Concept', date: 'Jan 11th 2024', transactionId: '0.ARCH2582GC', status: 'Completed' },
        { icon: '🏘️', name: 'Township Master Plan', date: 'Jan 10th 2024', transactionId: '0.ARCH2583GC', status: 'Pending' },
        { icon: '🏫', name: 'University Campus', date: 'Jan 9th 2024', transactionId: '0.ARCH2584GC', status: 'Completed' }
    ];

    // Architecture revenue data
    const revenueData = {
        income: [95, 110, 125, 145, 135, 160],
        expenses: [35, 40, 45, 50, 55, 60]
    };
    const revenueLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    // Architecture performance metrics
    const performanceMetrics = [
        { label: 'In Planning', value: '285K', percentage: 32, color: theme.textPrimary },
        { label: 'Approvals', value: '220K', percentage: 25, color: '#FF6B6B' },
        { label: 'Completed', value: '385K', percentage: 43, color: theme.iconBg }
    ];

    // Architecture project categories
    const salesReportItems = [
        { label: 'Residential Architecture', value: '32', progress: 92, color: theme.textPrimary },
        { label: 'Commercial Buildings', value: '24', progress: 78, color: theme.textSecondary },
        { label: 'Urban Planning', value: '16', progress: 68, color: theme.iconBg }
    ];

    return (
        <div className="space-y-6 pb-8">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight" style={{ color: theme.textPrimary }}>Architectural Design Dashboard</h2>
                    <p className="text-sm font-medium mt-1" style={{ color: theme.textMuted }}>Design excellence with precision and innovation.</p>
                </div>
                <div
                    className="px-4 py-2 rounded-xl shadow-sm border text-xs font-semibold"
                    style={{
                        background: theme.cardBg || 'white',
                        borderColor: theme.borderColor || `${theme.iconBg}15`,
                        color: theme.textPrimary
                    }}
                >
                    📅 January 2024 - June 2024
                </div>
            </div>

            {/* Top Row: Update Card, Metrics, Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <UpdateCard
                    title="Project submissions increased"
                    percentage="45%"
                    timeframe="1 Month"
                    link="See Statistics"
                    icon="📐"
                    bgGradient={theme.gradients?.primary || 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)'}
                />

                <MetricCard
                    label="Professional Fees"
                    value="560,000"
                    trend="up"
                    trendValue="+22%"
                    prefix="$"
                />

                <MetricCard
                    label="Authority Approvals"
                    value="28"
                    trend="up"
                    trendValue="+14%"
                    prefix=""
                />

                <PerformanceDonut
                    title="Project Status"
                    total="890K"
                    metrics={performanceMetrics}
                />
            </div>

            {/* Middle Row: Transactions and Revenue Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <TransactionList
                    title="Recent Submissions"
                    transactions={transactions}
                    viewAllLink={true}
                />

                <div className="lg:col-span-2">
                    <RevenueChart
                        title="Professional Fees"
                        total="560,000"
                        trend="up"
                        trendValue="+35%"
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
                    title="Scale your practice"
                    subtitle="to enterprise level."
                    description="Advanced BIM tools, AI-powered design, and real-time collaboration."
                    buttonText="Upgrade to Enterprise"
                    emoji="🏗️"
                    bgGradient={theme.gradients?.sidebar || 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)'}
                    onClick={() => navigate('/profile')}
                />
            </div>
        </div>
    );
};

export default ArchDashboard;
