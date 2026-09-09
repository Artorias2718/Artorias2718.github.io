import { useEffect } from "react";
import { useIsFetching } from "@tanstack/react-query";
import useGetFAQs from "@/api/queryHooks/FAQ/useGetFAQs.ts";
import useGetAboutDetails from "@/api/queryHooks/About/useGetAboutDetails.ts";

function usePrerenderSignal() {
    const aboutDetailsIcons = useGetAboutDetails(true);
    const aboutDetailsNoIcons = useGetAboutDetails(false);
    const faq = useGetFAQs();
    const queries = [aboutDetailsIcons, aboutDetailsNoIcons, faq];

    const fetching = useIsFetching();
    const ready = queries.every(q => q.isSuccess || q.isError);
    useEffect(() => {
        if (fetching === 0) {
            const id = requestAnimationFrame(() => {
                document.documentElement.dataset.prerenderReady = 'true';
            });
            return () => cancelAnimationFrame(id);
        }
        delete document.documentElement.dataset.prerenderReady;
    }, [fetching]);

    useEffect(() => {
        if(ready) {
            document.documentElement.dataset.prerenderReady = 'true';
        }
    }, [ready]);
};

export { usePrerenderSignal };