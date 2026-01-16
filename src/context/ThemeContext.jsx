import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const themes = {
    purple: {
        id: "purple",
        name: "Royal Purple",
        gradients: {
            primary: "linear-gradient(135deg, #3A1A4A, #49225B, #6E3482)",
            sidebar: "linear-gradient(180deg, #251030, #3A1A4A, #49225B)",
            button: "linear-gradient(135deg, #6E3482, #A56ABD)",
            progress: "linear-gradient(90deg, #6E3482, #A56ABD)"
        },
        background: "#F5EBFA",
        cardBg: "#FFFFFF",
        cardBorder: "#E7DBEF",
        textPrimary: "#49225B",
        textSecondary: "#6E3482",
        textOnPrimary: "#FFFFFF",
        textMuted: "#6B7280",
        iconBg: "#A56ABD"
    },

    steel: {
        id: "steel",
        name: "Steel Slate",
        gradients: {
            primary: "linear-gradient(135deg, #11212D, #253745, #4A5C6A)",
            sidebar: "linear-gradient(180deg, #050C10, #000000)",
            button: "linear-gradient(135deg, #253745, #4A5C6A)",
            progress: "linear-gradient(90deg, #253745, #4A5C6A)"
        },
        background: "#CCD0CF",
        cardBg: "#FFFFFF",
        cardBorder: "#9BA8AB",
        textPrimary: "#06141B",
        textSecondary: "#253745",
        textOnPrimary: "#FFFFFF",
        textMuted: "#4B5563",
        iconBg: "#4A5C6A"
    },

    forest: {
        id: "forest",
        name: "Forest Calm",
        gradients: {
            primary: "linear-gradient(135deg, #0B2B26, #163832, #235347)",
            sidebar: "linear-gradient(180deg, #040D0B, #000000)",
            button: "linear-gradient(135deg, #0B2B26, #8EB69B)",
            progress: "linear-gradient(90deg, #0B2B26, #8EB69B)"
        },
        background: "#DAF1DE",
        cardBg: "#FFFFFF",
        cardBorder: "#8EB69B",
        textPrimary: "#051F20",
        textSecondary: "#235347",
        textOnPrimary: "#FFFFFF",
        textMuted: "#4B5563",
        iconBg: "#8EB69B"
    },

    classic: {
        id: "classic",
        name: "Classic CRM",
        gradients: {
            primary: "linear-gradient(135deg, #5A3C52, #714B67, #8E5D81)",
            sidebar: "linear-gradient(180deg, #452D3F, #5A3C52, #714B67)",
            button: "linear-gradient(135deg, #8E5D81, #A26E95)",
            progress: "linear-gradient(90deg, #8E5D81, #A26E95)"
        },
        background: "#F8F5F7",
        cardBg: "#FFFFFF",
        cardBorder: "#E9DFE6",
        textPrimary: "#714B67",
        textSecondary: "#8E5D81",
        textOnPrimary: "#FFFFFF",
        textMuted: "#6B7280",
        iconBg: "#A26E95"
    },

    emerald: {
        id: "emerald",
        name: "Emerald Isle",
        gradients: {
            primary: "linear-gradient(135deg, #053F2E, #064E3B, #059669)",
            sidebar: "linear-gradient(180deg, #032A1F, #053F2E, #064E3B)",
            button: "linear-gradient(135deg, #059669, #34D399)",
            progress: "linear-gradient(90deg, #059669, #34D399)"
        },
        background: "#ECFDF5",
        cardBg: "#FFFFFF",
        cardBorder: "#A7F3D0",
        textPrimary: "#064E3B",
        textSecondary: "#059669",
        textOnPrimary: "#FFFFFF",
        textMuted: "#4B5563",
        iconBg: "#34D399"
    },

    ocean: {
        id: "ocean",
        name: "Ocean Deep",
        gradients: {
            primary: "linear-gradient(135deg, #193175, #1E3A8A, #1D4ED8)",
            sidebar: "linear-gradient(180deg, #122457, #193175, #1E3A8A)",
            button: "linear-gradient(135deg, #1D4ED8, #60A5FA)",
            progress: "linear-gradient(90deg, #1D4ED8, #60A5FA)"
        },
        background: "#EFF6FF",
        cardBg: "#FFFFFF",
        cardBorder: "#DBEAFE",
        textPrimary: "#1E3A8A",
        textSecondary: "#1D4ED8",
        textOnPrimary: "#FFFFFF",
        textMuted: "#4B5563",
        iconBg: "#60A5FA"
    }
};

export const ThemeProvider = ({ children }) => {
    const [themeId, setThemeId] = useState(
        localStorage.getItem("hmsTheme") || "classic"
    );

    useEffect(() => {
        localStorage.setItem("hmsTheme", themeId);
        document.body.style.background = themes[themeId].background;
        // Remove dark class if it exists as we're moving away from dark/light
        document.documentElement.classList.remove('dark');
    }, [themeId]);

    return (
        <ThemeContext.Provider
            value={{
                theme: themes[themeId],
                themeId,
                setThemeId,
                themes: Object.values(themes)
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
