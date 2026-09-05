import type { ReactNode } from "react";
import type { UseQueryResult } from "@tanstack/react-query";
import { Box, CircularProgress, Typography, Alert, Button } from "@mui/material";

interface ApiStateProps<TData> {
  query: UseQueryResult<TData>;
  loadingLabel?: string;
  children: (data: TData) => ReactNode;
}

export function ApiState<TData>({
  query,
  loadingLabel = "Loading…",
  children,
}: ApiStateProps<TData>) {
  if (query.isPending) {
    const warming = query.failureCount > 0;
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center",
                 justifyContent: "center", gap: 2, py: 8 }}>
        <CircularProgress />
        <Typography variant="body2" color="text.secondary">
          {warming ? "Waking up the server…" : loadingLabel}
        </Typography>
        {warming && (
          <Typography variant="caption" color="text.secondary">
            This can take up to a minute after a period of inactivity.
          </Typography>
        )}
      </Box>
    );
  }

  if (query.isError) {
    return (
      <Alert severity="error"
             action={
               <Button color="inherit" size="small"
                       onClick={() => query.refetch()} disabled={query.isFetching}>
                 Retry
               </Button>
             }>
        Couldn’t reach the server — it may still be starting up.
      </Alert>
    );
  }

  return <>{children(query.data)}</>;
}