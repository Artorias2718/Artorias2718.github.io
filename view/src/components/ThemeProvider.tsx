import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem("ae-guide-theme") as Theme | null;
    if (stored === "dark" || stored === "light") return stored;
  } catch {}
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    // Kept for any remaining CSS that still keys off this (e.g. scrollbar styling,
    // third-party widgets). Harmless to leave in even though MUI doesn't use it.
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("ae-guide-theme", theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // Rebuild the MUI theme whenever the mode changes. This is what actually
  // drives every `background.default`, `text.secondary`, `divider`, etc.
  // token used across the app's `sx` props.
  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,
          primary: {
            main: "#22c55e",
            light: "#4ade80",
            dark: "#16a34a",
            contrastText: "#0a0f1e",
          },
          secondary: {
            main: "#38bdf8",
          },
          ...(theme === "dark"
            ? {
                background: {
                  default: "#0a0f1e",
                  paper: "#0f1729",
                },
                text: {
                  primary: "#f1f5f9",
                  secondary: "#94a3b8",
                },
                divider: "rgba(148, 163, 184, 0.15)",
              }
            : {
                background: {
                  default: "#ffffff",
                  paper: "#f8fafc",
                },
              }),
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },
      }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}