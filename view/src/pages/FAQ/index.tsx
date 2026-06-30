import { useState, useMemo, useEffect, useCallback } from "react";
import { Search, Link as LinkIcon, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  Alert,
  Stack,
  TextField,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { faqData } from "@/lib/constants.ts";
import { useLocation } from "react-router-dom";

// ─── helpers ──────────────────────────────────────────────────────────────────

function generateId(question: string): string {
  return question
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState<string[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const location = useLocation();

  // ── Filter data by search query ──────────────────────────────────────────
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return faqData;
    const query = searchQuery.toLowerCase();
    return faqData
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (q) =>
            q.q.toLowerCase().includes(query) || q.a.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.questions.length > 0);
  }, [searchQuery]);

  // ── Accordion toggle (multi-expand) ─────────────────────────────────────
  const handleToggle = useCallback((category: string) => {
    setExpanded((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }, []);

  // ── Open item from URL hash on mount ─────────────────────────────────────
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      for (const category of faqData) {
        if (category.questions.some((q) => generateId(q.q) === hash)) {
          setExpanded([category.category]);
          setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
          break;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── When searching, expand all matching categories ────────────────────────
  useEffect(() => {
    if (searchQuery) {
      setExpanded(filteredData.map((c) => c.category));
    }
  }, [searchQuery, filteredData]);

  // ── Copy link ────────────────────────────────────────────────────────────
  const handleCopyLink = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const url = `${window.location.origin}${location}#${id}`;
    navigator.clipboard.writeText(url);
    setSnackbarOpen(true);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ maxWidth: 880, py: 8, minHeight: "calc(100vh - 16rem)" }}
    >
      {/* Header */}
      <Stack sx={{ alignItems: 'center', textAlign: "center", mb: 7 }} >
        <Box
          sx={{
            p: 1.5,
            borderRadius: 3,
            bgcolor: (t) => alpha(t.palette.primary.main, 0.1),
            color: "primary.main",
            mb: 3,
            display: "flex",
          }}
        >
          <HelpCircle size={32} />
        </Box>
        <Typography
          variant="h2"
          sx={{ fontWeight: 800, letterSpacing: '-0.02rem', mb: 2, fontSize: { xs: "2.25rem", md: "3rem" } }}
        >
          Frequently Asked Questions
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: 'text.secondary', fontWeight: 400, lineHeight: 1.7, maxWidth: 560 }}
        >
          Everything you need to know about Atlas Earth. Search below or browse by category.
        </Typography>
      </Stack>

      {/* Search */}
      <Box sx={{ maxWidth: 600, mx: "auto", mb: 9 }}>
        <TextField
          fullWidth
          type="search"
          placeholder="Search for answers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20}/>
                  </InputAdornment>
              ),
              sx: {
                height: 56,
                borderRadius: 3,
                fontSize: "1.1rem",
                bgColor: "background.paper",
              }
            }
          }}
        />
      </Box>

      {/* Results */}
      {filteredData.length === 0 ? (
        <Paper
          variant="outlined"
          sx={{ textAlign: "center", py: 12, px: 4, borderRadius: 4 }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            No results found
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            We couldn't find any questions matching "{searchQuery}".
          </Typography>
          <Button variant="text" onClick={() => setSearchQuery("")}>
            Clear search
          </Button>
        </Paper>
      ) : (
        <Stack spacing={3}>
          {filteredData.map((category) => {
            const isExpanded = expanded.includes(category.category);
            return (
              <Paper
                key={category.category}
                variant="outlined"
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  transition: "box-shadow 0.2s",
                  ...(isExpanded && {
                    boxShadow: (t) =>
                      `0 4px 20px ${alpha(t.palette.common.black, 0.08)}`,
                  }),
                }}
              >
                <Accordion
                  expanded={isExpanded}
                  onChange={() => handleToggle(category.category)}
                  disableGutters
                  elevation={0}
                  sx={{
                    bgcolor: "background.paper",
                    "&:before": { display: "none" }, // remove MUI's default top divider
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      px: 3,
                      py: 1,
                      "& .MuiAccordionSummary-content": { my: 2 },
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      {category.category}
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails sx={{ px: 3, pt: 0, pb: 3 }}>
                    <Stack sx={{ spacing: 1, mt: 1 }}>
                      {category.questions.map((q, qIdx) => {
                        const id = generateId(q.q);
                        return (
                          <Box
                            key={qIdx}
                            id={id}
                            sx={{
                              scrollMarginTop: "6rem",
                              borderRadius: 2.5,
                              px: 2,
                              py: 1.5,
                              mx: -2,
                              transition: "background-color 0.2s",
                              "& .copy-btn": { opacity: 0 },
                              "&:hover": {
                                bgcolor: (t) =>
                                  alpha(t.palette.action.hover, 0.5),
                              },
                              "&:hover .copy-btn": { opacity: 1 },
                            }}
                          >
                            {/* Question row */}
                            <Stack
                              direction="row"
                              sx={{ alignItems: 'flex-start', gap: 1, mb: 1 }}
                            >
                              <Typography
                                sx={{ fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.5, flex: 1 }}
                              >
                                {q.q}
                              </Typography>
                              <Tooltip title="Copy link to this question">
                                <IconButton
                                  className="copy-btn"
                                  size="small"
                                  onClick={(e) => handleCopyLink(e, id)}
                                  sx={{
                                    flexShrink: 0,
                                    transition: "opacity 0.2s",
                                    color: "text.secondary",
                                  }}
                                >
                                  <LinkIcon size={14} />
                                </IconButton>
                              </Tooltip>
                            </Stack>

                            {/* Answer */}
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ lineHeight: 1.8 }}
                              component="div"
                              dangerouslySetInnerHTML={{ __html: q.a }}
                            />
                          </Box>
                        );
                      })}
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              </Paper>
            );
          })}
        </Stack>
      )}

      {/* Copy link snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          <Box component="strong" sx={{ display: 'block' }}>
            Link copied!
          </Box>
          Direct link to this question copied to clipboard.
        </Alert>
      </Snackbar>
    </Container>
  );
}