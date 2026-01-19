import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Loader = ({ fullScreen = false, message = "Loading Intelligence..." }) => {
    const { theme } = useTheme();

    const loaderContent = (
        <div className="flex flex-col items-center justify-center gap-6 animate-in fade-in zoom-in duration-500">
            <div className="relative">
                {/* Outer Ring */}
                <div
                    className="w-20 h-20 rounded-[2rem] border-4 border-transparent border-t-blue-500 animate-spin transition-all"
                    style={{ borderTopColor: theme.primary }}
                />

                {/* Inner Ring (Reverse Spin) */}
                <div
                    className="absolute inset-2 w-16 h-16 rounded-[1.5rem] border-4 border-transparent border-b-purple-500 animate-spin-slow transition-all shadow-xl"
                    style={{ borderBottomColor: theme.secondary || '#9333ea' }}
                />

                {/* Center Core */}
                <div
                    className="absolute inset-6 rounded-2xl bg-white shadow-brand-lg flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: theme.cardBg }}
                >
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" style={{ backgroundColor: theme.primary }} />
                </div>
            </div>

            <div className="text-center space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40" style={{ color: theme.textSecondary }}>
                    {message}
                </p>
                <div className="flex gap-1 justify-center">
                    <span className="w-1 h-1 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]" style={{ backgroundColor: theme.primary }} />
                    <span className="w-1 h-1 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]" style={{ backgroundColor: theme.primary }} />
                    <span className="w-1 h-1 rounded-full bg-blue-500 animate-bounce" style={{ backgroundColor: theme.primary }} />
                </div>
            </div>

            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(-360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 3s linear infinite;
                }
            `}</style>
        </div>
    );

    if (fullScreen) {
        return (
            <div
                className="fixed inset-0 z-[1000] flex items-center justify-center backdrop-blur-xl transition-all"
                style={{ backgroundColor: `${theme.cardBg}CC` }}
            >
                {loaderContent}
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center p-12 w-full h-full min-h-[300px]">
            {loaderContent}
        </div>
    );
};

export default Loader;
