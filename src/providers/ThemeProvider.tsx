// src/providers/ThemeProvider.tsx
import { ThemeProvider } from 'styled-components';
import theme from "../styles/theme.ts";

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};