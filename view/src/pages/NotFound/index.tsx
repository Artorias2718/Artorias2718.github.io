import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.50",
        px: 2,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 448 }}>
        <CardContent sx={{ pt: 3 }}>
          <Stack direction="row" alignItems="center" gap={1.5} mb={2}>
            <Box sx={{ color: "error.main", display: "flex" }}>
              <AlertCircle size={32} />
            </Box>
            <Typography variant="h5" fontWeight={700}>
              404 Page Not Found
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Did you forget to add the page to the router?
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}