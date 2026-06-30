import { useState } from "react";
import { Search, BookOpen } from "lucide-react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
import { glossaryTerms } from "@/lib/constants.ts";

export default function Glossary() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTerms = glossaryTerms.filter(
    (item) =>
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container
      maxWidth="lg"
      sx={{ maxWidth: 1100, py: 8, minHeight: "calc(100vh - 16rem)" }}
    >
      {/* Header */}
      <Stack sx={{ alignItems: "center", textAlign: "center", mb: 7 }}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 3,
            bgcolor: (t) => alpha(t.palette.secondary.main, 0.1),
            color: "secondary.main",
            mb: 3,
            display: "flex",
          }}
        >
          <BookOpen size={32} />
        </Box>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.02em",
            mb: 2,
            fontSize: { xs: "2.25rem", md: "3rem" },
          }}
        >
          Glossary of Terms
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: "text.secondary", fontWeight: 400, lineHeight: 1.7, maxWidth: 560 }}
        >
          The Atlas Earth community uses a lot of jargon and acronyms. Here's a quick
          reference to help you translate.
        </Typography>
      </Stack>

      {/* Search */}
      <Box sx={{ maxWidth: 480, mx: "auto", mb: 7 }}>
        <TextField
          fullWidth
          type="search"
          placeholder="Search terms (e.g., AB, SRB, Badge)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} />
                </InputAdornment>
              ),
              sx: {
                height: 48,
                borderRadius: 2.5,
                bgcolor: "background.paper",
              },
            },
          }}
        />
      </Box>

      {/* Results */}
      {filteredTerms.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 12 }}>
          <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "1.1rem" }}>
            No terms found matching "{searchQuery}".
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredTerms.map((item, idx) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={idx}>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "box-shadow 0.2s",
                  "&:hover": {
                    boxShadow: (t) =>
                      `0 4px 20px ${alpha(t.palette.common.black, 0.08)}`,
                  },
                }}
              >
                <CardHeader
                  title={item.term}
                  slotProps={{
                    title: {
                      variant: "h6",
                      sx: { fontWeight: 700, color: "primary.main", fontSize: "1.15rem" },
                    },
                  }}
                  sx={{
                    pb: 1.5,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    bgcolor: (t) => alpha(t.palette.action.hover, 0.4),
                  }}
                />
                <CardContent sx={{ pt: 2, flex: 1 }}>
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ color: "text.secondary", lineHeight: 1.8 }}
                    dangerouslySetInnerHTML={{ __html: item.definition }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}