import { useEffect } from "react";
import { useIsFetching } from "@tanstack/react-query";

function usePrerenderSignal() {
    const fetching = useIsFetching();
    useEffect(() => {
        if (fetching === 0) {
            const id = requestAnimationFrame(() => {
                document.documentElement.dataset.prerenderReady = 'true';
            });
            return () => cancelAnimationFrame(id);
        }
        delete document.documentElement.dataset.prerenderReady;
    }, [fetching]);
};

export { usePrerenderSignal };