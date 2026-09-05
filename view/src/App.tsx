import { useEffect } from 'react'; // 1. Import useEffect
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Outlet, useMatches } from 'react-router-dom';
import type { RouteHandle } from './main';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { usePrerenderSignal } from "@/hooks/prerender/usePrerenderSignal.ts";

interface UIMatchWithHandle {
    id: string;
    pathname: string;
    params: Record<string, string | undefined>;
    data: unknown;
    handle: RouteHandle;
}

function getErrorStatus(error: unknown): number | undefined {
    if (typeof error === 'object' && error !== null) {
        const resp = (error as { response?: { status?: unknown } }).response;
        if (resp && typeof resp.status === 'number') return resp.status;

        const status = (error as { status?: unknown }).status;
        if (typeof status === 'number') return status;
    }
    return undefined;
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Retry transient/cold-start failures, but not genuine 4xx (e.g. a real 404)
            retry: (failureCount, error) => {
                const status = getErrorStatus(error);
                if(status && status >= 400 && status < 500 && status !== 408) {
                    return false;
                }

                return failureCount < 8;
            },
            // Capped exponential backoff: ~1+2+4+8+15*3 \aeq 60
            retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 15000),
            staleTime: 60_000,
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

            <Outlet />
            <Footer />
        </ThemeProvider>
    );
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppPreRenderer />
        </QueryClientProvider>
    );
}

export default App;
