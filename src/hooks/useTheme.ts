import { useContext } from "react";
import { ThemeContext } from '../app/providers/ThemeProvider';
import { Theme } from "../config/theme";

/**
 * Custom hook to access the current theme (colors, spacing, etc.)
 * This is the primary way to style components in this kit.
 */

export const useTheme = (): Theme => {
    const context = useContext(ThemeContext);

    // Safety check: If a dev forgets to wrap the app in ThemeProvider, 
    // this error will tell them exactly what is wrong.
    if (!context) {
        throw new Error(
            'useTheme must be used within a ThemeProvider. ' +
            'Check if you wrapped your App.tsx with AppProviders.'
        );
    }
    return context;
}