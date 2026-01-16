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

    // forest: {
    //     id: "forest",
    //     name: "Forest Calm",
    //     gradients: {
    //         primary: "linear-gradient(135deg, #0B2B26, #163832, #235347)",
    //         sidebar: "linear-gradient(180deg, #023e31ff, #015744ff)",
    //         button: "linear-gradient(135deg, #0B2B26, #8EB69B)",
    //         progress: "linear-gradient(90deg, #0B2B26, #8EB69B)"
    //     },
    //     background: "#DAF1DE",
    //     cardBg: "#FFFFFF",
    //     cardBorder: "#8EB69B",
    //     textPrimary: "#051F20",
    //     textSecondary: "#235347",
    //     textOnPrimary: "#FFFFFF",
    //     textMuted: "#4B5563",
    //     iconBg: "#8EB69B"
    // },

    // classic: {
    //     id: "classic",
    //     name: "Classic CRM",
    //     gradients: {
    //         primary: "linear-gradient(135deg, #c162a8ff, #cb5aadff, #c475afff)",
    //         sidebar: "linear-gradient(180deg, #3a2234ff, #3a2434ff, #372432ff)",
    //         button: "linear-gradient(135deg, #ef24b9ff, #e50dafff)",
    //         progress: "linear-gradient(90deg, #ae719eff, #A26E95)"
    //     },
    //     background: "#F8F5F7",
    //     cardBg: "#FFFFFF",
    //     cardBorder: "#E9DFE6",
    //     textPrimary: "#714B67",
    //     textSecondary: "#8E5D81",
    //     textOnPrimary: "#FFFFFF",
    //     textMuted: "#6B7280",
    //     iconBg: "#A26E95"
    // },
    // classic: {
    //     // ... baki settings same rahegi
    //     gradients: {
    //         primary: "linear-gradient(135deg, #8E5D81 0%, #714B67 100%)",

    //         // Sidebar: Deep Charcoal with a hint of purple for premium feel
    //         sidebar: "linear-gradient(180deg, #3a2935ff 0%, #55394cff 100%)",

    //         // Active Button: Glassmorphism effect (Soft & Classy)
    //         button: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)",

    //         progress: "linear-gradient(90deg, #A26E95, #8E5D81)"
    //     },
    //     // Sidebar text improvement
    //     textSecondary: "#A3939E", // Muted icons/text for non-active items
    //     textOnPrimary: "#FFFFFF",  // Bright white for active item

    //     background: "#FBF9FA",      // Off-white with a hint of rose (Very Clean)
    //     cardBg: "#FFFFFF",          // Pure white for cards to pop
    //     cardBorder: "#F0E7ED",      // Very subtle border
    //     textPrimary: "#4A3442",     // Deep brownish-purple (Easier on eyes than black)
    //     textSecondary: "#7D6273",   // Muted mid-tone
    //     textOnPrimary: "#FFFFFF",
    //     textMuted: "#A3939E",       // Soft grey-purple for labels
    //     iconBg: "#F4ECF1"           // Light tint for icon backgrounds
    // },
    classic: {
        id: "classic",
        name: "Classic CRM",
        gradients: {
            primary: "linear-gradient(135deg, #8E5D81 0%, #714B67 100%)",

            // SIDEBAR: Soft Off-White/Grey with a clean vertical separator feel
            sidebar: "linear-gradient(180deg, #58203cff 0%, #5e1f4eff 100%)",

            // ACTIVE BUTTON: Soft Mauve background (Not too loud)
            button: "linear-gradient(135deg, #A26E95 0%, #8E5D81 100%)",

            progress: "linear-gradient(90deg, #B58BA9, #8E5D81)"
        },
        background: "#FBF9FA",
        cardBg: "#FFFFFF",
        cardBorder: "#E9DFE6",

        // TEXT HIERARCHY (Optimized for Visibility)
        textPrimary: "#3A2A35",     // Sharper dark for titles
        textSecondary: "#6B5264",   // Darker muted tone for sidebar labels
        textOnPrimary: "#FFFFFF",
        textMuted: "#A3939E",

        iconBg: "rgba(142, 93, 129, 0.08)" // Soft circles for sidebar icons
    },
    emerald: {
        id: "emerald",
        name: "Emerald Isle",
        gradients: {
            primary: "linear-gradient(135deg, #2ba07dff, #33997eff, #059669)",
            sidebar: "linear-gradient(180deg, #05563fff, #09654aff, #06684eff)",
            button: "linear-gradient(135deg, #03a26dff, #089a65ff)",
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
            primary: "linear-gradient(135deg, #4d69b3ff, #516cb8ff, #1D4ED8)",
            sidebar: "linear-gradient(180deg, #0d2156ff, #102b73ff, #0d2463ff)",
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
    },
    blueprint: {
        id: "blueprint",
        name: "Architect Light",
        gradients: {
            primary: "linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)", // Professional Blue
            sidebar: "linear-gradient(180deg, #a3bdd7ff 0%, #8099b3ff 100%)", // Ultra Light Grey
            button: "linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)",
            progress: "linear-gradient(90deg, #818CF8, #4F46E5)"
        },
        background: "#F1F5F9",
        cardBg: "#FFFFFF",
        cardBorder: "#E2E8F0",
        textPrimary: "#1E293B",     // Slate Blue-Black
        textSecondary: "#64748B",   // Steel Grey
        textOnPrimary: "#FFFFFF",
        textMuted: "#64748B",
        iconBg: "rgba(79, 70, 229, 0.08)"
    },
    interior: {
        id: "interior",
        name: "Luxury Interior",
        gradients: {
            primary: "linear-gradient(135deg, #A27B91 0%, #7D5A73 100%)", // Muted Plum
            sidebar: "linear-gradient(180deg, #FAF7F8 0%, #F3EDF1 100%)", // Soft Blush White
            button: "linear-gradient(135deg, #A26E95 0%, #8E5D81 100%)",
            progress: "linear-gradient(90deg, #D4B2C5, #B57BA6)"
        },
        background: "#FBF9FA",
        cardBg: "#FFFFFF",
        cardBorder: "#F0E7ED",
        textPrimary: "#4A3442",     // Deep Cocoa
        textSecondary: "#8A7182",   // Muted Mauve
        textOnPrimary: "#FFFFFF",
        textMuted: "#8E7D8A",
        iconBg: "#F4ECF1"
    },
    construction: {
        id: "construction",
        name: "Site Manager",
        gradients: {
            primary: "linear-gradient(135deg, #059669 0%, #10B981 100%)", // Emerald Green
            sidebar: "linear-gradient(180deg, #F0FDF4 0%, #DCFCE7 100%)", // Very Light Mint
            button: "linear-gradient(135deg, #059669 0%, #047857 100%)",
            progress: "linear-gradient(90deg, #6EE7B7, #059669)"
        },
        background: "#F9FAFB",
        cardBg: "#FFFFFF",
        cardBorder: "#E5E7EB",
        textPrimary: "#064E3B",     // Deep Forest Green
        textSecondary: "#374151",   // Dark Charcoal
        textOnPrimary: "#FFFFFF",
        textMuted: "#6B7280",
        iconBg: "rgba(16, 185, 129, 0.1)"
    },
    zenith: {
        id: "zenith",
        name: "Zenith Corporate",
        gradients: {
            primary: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)", // Deep Navy
            sidebar: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)", // Pure White Sidebar
            button: "linear-gradient(135deg, #334155 0%, #1E293B 100%)",
            progress: "linear-gradient(90deg, #94A3B8, #475569)"
        },
        background: "#F1F5F9",
        cardBg: "#FFFFFF",
        cardBorder: "rgba(0,0,0,0.05)",
        textPrimary: "#0F172A",
        textSecondary: "#475569",
        textOnPrimary: "#FFFFFF",
        textMuted: "#64748B",
        iconBg: "#F1F5F9"
    },
    obsidian: {
        id: "obsidian",
        name: "Midnight Obsidian",
        gradients: {
            primary: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)", // Electric Indigo
            sidebar: "linear-gradient(180deg, #111827 0%, #0F172A 100%)", // Deepest Charcoal
            button: "linear-gradient(135deg, #6366F1 0%, #4338CA 100%)",
            progress: "linear-gradient(90deg, #818CF8, #6366F1)"
        },
        background: "#0B0F1A",      // Dark Space background
        cardBg: "#1F2937",          // Slightly lighter card for depth
        cardBorder: "#374151",      // Subtle outline
        textPrimary: "#F9FAFB",     // Crisp White
        textSecondary: "#9CA3AF",   // Muted Silver
        textOnPrimary: "#FFFFFF",
        textMuted: "#6B7280",
        iconBg: "rgba(99, 102, 241, 0.15)"
    },
    noblePlum: {
        id: "noblePlum",
        name: "Noble Plum",
        gradients: {
            primary: "linear-gradient(135deg, #A26E95 0%, #7D516F 100%)", // Royal Plum
            sidebar: "linear-gradient(180deg, #1A1418 0%, #150F13 100%)", // Deepest Plum-Black
            button: "linear-gradient(135deg, #B57BA6 0%, #8E5D81 100%)",
            progress: "linear-gradient(90deg, #D4B2C5, #B57BA6)"
        },
        background: "#120D10",      // Rich dark background
        cardBg: "#1C161B",          // Velvet-toned dark card
        cardBorder: "rgba(162, 110, 149, 0.15)", // Glowing border
        textPrimary: "#FDFCFD",
        textSecondary: "#A3939E",   // Muted Lavender Grey
        textOnPrimary: "#FFFFFF",
        textMuted: "#6B5264",
        iconBg: "rgba(162, 110, 149, 0.1)"
    },
    highVis: {
        id: "highVis",
        name: "High-Vis Safety",
        gradients: {
            primary: "linear-gradient(135deg, #d5c257ff, #f1cf69ff, #f7a949ff)",
            sidebar: "linear-gradient(180deg, #606365ff, #544d4dff)",
            button: "linear-gradient(135deg, #FFD700, #FF8C00)",
            progress: "linear-gradient(90deg, #FFD700, #FF8C00)"
        },
        background: "#454647ff",
        cardBg: "#2D3136",
        cardBorder: "#4B5563",
        textPrimary: "#FFD700",
        textSecondary: "#FF8C00",
        textOnPrimary: "#000000",
        textMuted: "#6B7280",
        iconBg: "#FFD700"
    }
};

export const ThemeProvider = ({ children }) => {
    const [themeId, setThemeId] = useState(() => {
        const savedTheme = localStorage.getItem("hmsTheme");
        // Check if saved theme exists, otherwise default to classic
        return (savedTheme && themes[savedTheme]) ? savedTheme : "classic";
    });

    useEffect(() => {
        localStorage.setItem("hmsTheme", themeId);
        // Safety check in case theme object is somehow undefined
        const currentTheme = themes[themeId] || themes.classic;
        if (currentTheme) {
            // Set background and text color directly on body
            document.body.style.background = currentTheme.background;
            document.body.style.color = currentTheme.textPrimary;

            // Set CSS variables for usage in components/CSS
            const root = document.documentElement;

            // Gradients
            root.style.setProperty('--gradient-primary', currentTheme.gradients.primary);
            root.style.setProperty('--gradient-sidebar', currentTheme.gradients.sidebar);
            root.style.setProperty('--gradient-button', currentTheme.gradients.button);
            root.style.setProperty('--gradient-progress', currentTheme.gradients.progress);

            // Colors
            root.style.setProperty('--color-bg', currentTheme.background);
            root.style.setProperty('--color-card-bg', currentTheme.cardBg);
            root.style.setProperty('--color-card-border', currentTheme.cardBorder);

            // Text Colors
            root.style.setProperty('--color-text-primary', currentTheme.textPrimary);
            root.style.setProperty('--color-text-secondary', currentTheme.textSecondary);
            root.style.setProperty('--color-text-on-primary', currentTheme.textOnPrimary);
            root.style.setProperty('--color-text-muted', currentTheme.textMuted);

            // Misc
            root.style.setProperty('--color-icon-bg', currentTheme.iconBg);

            // Remove dark class if it exists as we're moving away from dark/light
            document.documentElement.classList.remove('dark');
        }
    }, [themeId]);

    return (
        <ThemeContext.Provider
            value={{
                theme: themes[themeId] || themes.classic,
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
