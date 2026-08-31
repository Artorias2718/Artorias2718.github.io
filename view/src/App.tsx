import { useEffect } from 'react'; // 1. Import useEffect
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Outlet, useMatches } from 'react-router-dom';
import type { RouteHandle } from './main';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {usePrerenderSignal} from "@/hooks/prerender/usePrerenderSignal.ts";

interface UIMatchWithHandle {
    id: string;
    pathname: string;
    params: Record<string, string | undefined>;
    data: unknown;
    handle: RouteHandle;
}

const hourAsMilliseconds= 1000 * 60 * 60;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: hourAsMilliseconds,
            gcTime: hourAsMilliseconds * 2,
            refetchOnWindowFocus: false,
        }
    }
});

function AppPreRenderer() {
    const matches = useMatches();
    const currentMatch = matches[matches.length - 1] as UIMatchWithHandle | undefined;
    const pageName = currentMatch?.handle?.pageName || '';

    usePrerenderSignal();
    useEffect(() => {
        document.title = pageName ? `Atlas Earth HQ | ${pageName}` : 'Atlas Earth HQ';
    }, [pageName]);

    return (
        <ThemeProvider>
            {/* Remove the static <title> JSX tag completely from here */}

            <header>
                <Navbar />
            </header>

            <Footer />
        </ThemeProvider>
    );
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppPreRenderer />
            <Outlet />
        </QueryClientProvider>
    );
}

export default App;
