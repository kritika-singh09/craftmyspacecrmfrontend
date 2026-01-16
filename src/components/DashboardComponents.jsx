import React from 'react';
import { FiTrendingUp, FiTrendingDown, FiMoreVertical, FiBarChart2, FiTrendingUp as FiChart } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

// Update Notification Card
export const UpdateCard = ({ title, subtitle, percentage, timeframe, link, icon, bgGradient }) => {
    const { theme } = useTheme();

    return (
        <div
            className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg group cursor-pointer transition-transform hover:scale-[1.02]"
            style={{ background: bgGradient || 'linear-gradient(135deg, #065f46 0%, #0f766e 100%)' }}
        >
            <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>

            <div className="flex items-start gap-4">
                <div className="text-3xl">{icon || <FiBarChart2 />}</div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold uppercase tracking-wider opacity-90">Update</span>
                    </div>
                    <h3 className="text-lg font-bold leading-tight mb-1">{title}</h3>
                    <p className="text-2xl font-bold mb-2">
                        <span className="text-green-300">{percentage}</span> in {timeframe}
                    </p>
                    {subtitle && (
                        <p className="text-xs opacity-75 mb-3">{subtitle}</p>
                    )}
                    <button className="text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                        {link || 'See Statistics'} →
                    </button>
                </div>
            </div>
        </div>
    );
};

// Financial Metric Card
export const MetricCard = ({ label, value, trend, trendValue, prefix = '$', menuIcon = true }) => {
    const { theme } = useTheme();
    const isPositive = trend === 'up';

    return (
        <div
            className="rounded-2xl p-6 shadow-sm border transition-all hover:shadow-md"
            style={{
                background: theme.cardBg || 'white',
                borderColor: theme.borderColor || `${theme.iconBg}15`
            }}
        >
            <div className="flex justify-between items-start mb-4">
                <h4 className="text-sm font-semibold" style={{ color: theme.textSecondary }}>{label}</h4>
                {menuIcon && <FiMoreVertical style={{ color: theme.textMuted }} className="cursor-pointer hover:opacity-70" />}
            </div>

            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
                    {prefix}{value}
                </span>
            </div>

            {trendValue && (
                <div className="flex items-center gap-1 mt-2">
                    {isPositive ? (
                        <FiTrendingUp className="text-green-600 text-sm" />
                    ) : (
                        <FiTrendingDown className="text-red-600 text-sm" />
                    )}
                    <span className={`text-xs font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {isPositive ? '+' : ''}{trendValue} from last month
                    </span>
                </div>
            )}
        </div>
    );
};

// Transaction Item
export const TransactionItem = ({ icon, name, date, transactionId, status }) => {
    const { theme } = useTheme();
    const statusColors = {
        'Completed': 'bg-teal-50 text-teal-700 border-teal-200',
        'Pending': 'bg-orange-50 text-orange-700 border-orange-200',
        'Processing': 'bg-blue-50 text-blue-700 border-blue-200'
    };

    return (
        <div className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: `${theme.iconBg}10` }}>
            <div className="flex items-center gap-3">
                <div className="text-2xl">{icon}</div>
                <div>
                    <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>{name}</p>
                    <p className="text-xs font-mono" style={{ color: theme.textMuted }}>{transactionId}</p>
                </div>
            </div>
            <div className="text-right">
                <span className={`text-xs font-semibold px-2 py-1 rounded-lg border ${statusColors[status] || statusColors['Pending']}`}>
                    {status}
                </span>
                <p className="text-xs mt-1" style={{ color: theme.textMuted }}>{date}</p>
            </div>
        </div>
    );
};

// Transaction List
export const TransactionList = ({ title, transactions, viewAllLink }) => {
    const { theme } = useTheme();

    return (
        <div
            className="rounded-2xl p-6 shadow-sm border"
            style={{
                background: theme.cardBg || 'white',
                borderColor: theme.borderColor || `${theme.iconBg}15`
            }}
        >
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold" style={{ color: theme.textPrimary }}>{title}</h3>
                {viewAllLink && <FiMoreVertical style={{ color: theme.textMuted }} className="cursor-pointer hover:opacity-70" />}
            </div>

            <div className="space-y-1">
                {transactions.map((transaction, index) => (
                    <TransactionItem key={index} {...transaction} />
                ))}
            </div>
        </div>
    );
};

// Revenue Chart
export const RevenueChart = ({ title, total, trend, trendValue, data, labels }) => {
    const { theme } = useTheme();
    const isPositive = trend === 'up';

    // Calculate max value for scaling
    const maxValue = Math.max(...data.income, ...data.expenses);

    return (
        <div
            className="rounded-2xl p-6 shadow-sm border"
            style={{
                background: theme.cardBg || 'white',
                borderColor: theme.borderColor || `${theme.iconBg}15`
            }}
        >
            <div className="mb-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold" style={{ color: theme.textPrimary }}>{title}</h3>
                    <div className="flex gap-4 text-xs font-semibold">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm" style={{ background: theme.textPrimary }}></div>
                            <span style={{ color: theme.textSecondary }}>Income</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm" style={{ background: theme.iconBg }}></div>
                            <span style={{ color: theme.textSecondary }}>Expenses</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
                        ${total}
                    </span>
                    {trendValue && (
                        <div className="flex items-center gap-1">
                            {isPositive ? (
                                <FiTrendingUp className="text-green-600 text-sm" />
                            ) : (
                                <FiTrendingDown className="text-red-600 text-sm" />
                            )}
                            <span className={`text-xs font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                {isPositive ? '+' : ''}{trendValue} from last month
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Bar Chart */}
            <div className="flex items-end justify-between gap-2 h-48">
                {labels.map((label, index) => {
                    const incomeHeight = (data.income[index] / maxValue) * 100;
                    const expenseHeight = (data.expenses[index] / maxValue) * 100;

                    return (
                        <div key={index} className="flex-1 flex flex-col items-center gap-2">
                            <div className="w-full flex justify-center gap-1 items-end h-40">
                                <div
                                    className="w-full rounded-t-lg transition-all hover:opacity-80"
                                    style={{
                                        height: `${incomeHeight}%`,
                                        background: theme.textPrimary,
                                        minHeight: '4px'
                                    }}
                                ></div>
                                <div
                                    className="w-full rounded-t-lg transition-all hover:opacity-80"
                                    style={{
                                        height: `${expenseHeight}%`,
                                        background: theme.iconBg,
                                        minHeight: '4px'
                                    }}
                                ></div>
                            </div>
                            <span className="text-xs font-semibold" style={{ color: theme.textMuted }}>{label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Performance Donut Chart
export const PerformanceDonut = ({ title, total, metrics }) => {
    const { theme } = useTheme();

    // Calculate total percentage
    const totalPercentage = metrics.reduce((sum, m) => sum + m.percentage, 0);

    // Generate donut segments
    let currentAngle = 0;
    const segments = metrics.map(metric => {
        const angle = (metric.percentage / 100) * 360;
        const segment = {
            ...metric,
            startAngle: currentAngle,
            endAngle: currentAngle + angle
        };
        currentAngle += angle;
        return segment;
    });

    return (
        <div
            className="rounded-2xl p-6 shadow-sm border"
            style={{
                background: theme.cardBg || 'white',
                borderColor: theme.borderColor || `${theme.iconBg}15`
            }}
        >
            <h3 className="text-lg font-bold mb-6" style={{ color: theme.textPrimary }}>{title}</h3>

            <div className="flex flex-col items-center">
                {/* Donut Chart */}
                <div className="relative w-40 h-40 mb-6">
                    <svg viewBox="0 0 100 100" className="transform -rotate-90">
                        {segments.map((segment, index) => {
                            const radius = 40;
                            const circumference = 2 * Math.PI * radius;
                            const strokeDasharray = `${(segment.percentage / 100) * circumference} ${circumference}`;
                            const strokeDashoffset = -((segment.startAngle / 360) * circumference);

                            return (
                                <circle
                                    key={index}
                                    cx="50"
                                    cy="50"
                                    r={radius}
                                    fill="none"
                                    stroke={segment.color}
                                    strokeWidth="20"
                                    strokeDasharray={strokeDasharray}
                                    strokeDashoffset={strokeDashoffset}
                                    className="transition-all hover:opacity-80"
                                />
                            );
                        })}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold" style={{ color: theme.textPrimary }}>{total}</span>
                    </div>
                </div>

                {/* Legend */}
                <div className="w-full space-y-3">
                    {metrics.map((metric, index) => (
                        <div key={index} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ background: metric.color }}></div>
                                <span className="font-semibold" style={{ color: theme.textSecondary }}>{metric.label}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-semibold" style={{ color: theme.textMuted }}>{metric.value}</span>
                                <span className="font-bold" style={{ color: theme.textPrimary }}>{metric.percentage}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Sales Report Bar
export const SalesReportBar = ({ label, value, progress, color = '#A8D08D' }) => {
    const { theme } = useTheme();

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-sm font-semibold" style={{ color: theme.textPrimary }}>
                    {label} <span className="text-xs font-normal" style={{ color: theme.textMuted }}>({value})</span>
                </span>
            </div>
            <div className="w-full rounded-full h-2.5 overflow-hidden" style={{ background: theme.background || '#f3f4f6' }}>
                <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                        width: `${progress}%`,
                        background: color
                    }}
                ></div>
            </div>
        </div>
    );
};

// Sales Report Section
export const SalesReport = ({ title, items }) => {
    const { theme } = useTheme();

    return (
        <div
            className="rounded-2xl p-6 shadow-sm border"
            style={{
                background: theme.cardBg || 'white',
                borderColor: theme.borderColor || `${theme.iconBg}15`
            }}
        >
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold" style={{ color: theme.textPrimary }}>{title}</h3>
                <FiMoreVertical style={{ color: theme.textMuted }} className="cursor-pointer hover:opacity-70" />
            </div>

            <div className="space-y-4">
                {items.map((item, index) => (
                    <SalesReportBar key={index} {...item} />
                ))}
            </div>
        </div>
    );
};

// Promotional Card
export const PromotionalCard = ({ title, subtitle, description, buttonText, bgGradient, emoji }) => {
    const { theme } = useTheme();

    return (
        <div
            className="relative overflow-hidden rounded-2xl p-8 shadow-lg group cursor-pointer transition-transform hover:scale-[1.02]"
            style={{ background: bgGradient || 'linear-gradient(135deg, #A8D08D 0%, #F5F5DC 100%)' }}
        >
            <div className="absolute top-0 right-0 text-9xl opacity-10 transform rotate-12">
                {emoji || <FiChart />}
            </div>

            <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{title}</h3>
                {subtitle && <p className="text-sm font-semibold text-white opacity-90 mb-3">{subtitle}</p>}
                {description && <p className="text-sm text-white opacity-80 mb-6 leading-relaxed">{description}</p>}

                <button
                    className="px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
                    style={{ background: 'white', color: theme.textPrimary }}
                >
                    {buttonText || 'Learn More'}
                </button>
            </div>
        </div>
    );
};
