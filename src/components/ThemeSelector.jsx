import React from 'react';
import { useTheme } from '../context/ThemeContext.jsx';
import { FiCheck } from 'react-icons/fi';

const ThemeSelector = () => {
    const { themes, themeId, setThemeId, theme } = useTheme();

    return (
        <div className="flex flex-col gap-4 p-4 bg-white rounded-2xl shadow-premium border border-gray-100">
            <div className="flex flex-col">
                <h3 className="text-sm font-bold" style={{ color: theme.textPrimary }}>Custom Branding</h3>
                <p className="text-[10px] font-medium" style={{ color: theme.textMuted }}>Select a gradient theme for your workspace</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {themes.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setThemeId(t.id)}
                        className={`relative group flex flex-col items-start p-3 rounded-xl border-2 transition-all duration-300 ${themeId === t.id
                            ? 'border-gray-900 bg-gray-50'
                            : 'border-transparent bg-gray-50/50 hover:bg-gray-100'
                            }`}
                    >
                        <div
                            className="w-full h-8 rounded-lg mb-2 shadow-sm"
                            style={{ background: t.gradients.primary }}
                        />
                        <div className="flex items-center justify-between w-full">
                            <span className="text-[10px] font-bold text-gray-900">{t.name}</span>
                            {themeId === t.id && (
                                <FiCheck className="text-gray-900 w-3 h-3" />
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ThemeSelector;
