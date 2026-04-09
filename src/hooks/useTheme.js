import { useState, useEffect } from "react";
import { MONTH_THEMES } from "../utils/themes";

export function useTheme(month) {
    const [darkMode, setDarkMode] = useState(false);
    const theme = MONTH_THEMES[month];

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty("--color-primary", theme.primary);
        root.style.setProperty("--color-accent", theme.accent);
        root.style.setProperty("--color-light", theme.light);
        root.style.setProperty("--color-text", theme.text);
        root.style.setProperty("--color-gradient", theme.gradient);
    }, [month, theme]);

    useEffect(() => {
        document.documentElement.setAttribute("data-dark", darkMode ? "true" : "false");
    }, [darkMode]);

    return { theme, darkMode, setDarkMode };
}
