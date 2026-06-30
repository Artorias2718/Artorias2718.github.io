import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Stack,
  Typography,
  IconButton,
  Button,
  Drawer,
  Snackbar,
  Alert,
  Divider,
  alpha,
} from "@mui/material";
import {
  Menu,
  X,
  Map,
  HelpCircle,
  BookOpen,
  ExternalLink,
  Info,
  Share2,
  Timer,
  ShieldCheck,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme as useAppTheme } from "@/components/ThemeProvider";

const links = [
  { href: "/", label: "Guide", icon: Map },
  { href: "/faq", label: "FAQ", icon: HelpCircle },
  { href: "/glossary", label: "Glossary", icon: BookOpen },
  { href: "/resources", label: "Resources", icon: ExternalLink },
  { href: "/boosttimer", label: "Boost Timer", icon: Timer },
  { href: "/progressvault", label: "Vault", icon: ShieldCheck },
  { href: "/about", label: "About", icon: Info },
];

export function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { theme, toggleTheme } = useAppTheme();

  const handleShare = () => {
    const url = window.location.origin + "/faq";
    navigator.clipboard.writeText(url);
    setSnackbarOpen(true);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: (t) => alpha(t.palette.background.default, 0.95),
          backdropFilter: "blur(8px)",
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1200,
            mx: "auto",
            width: "100%",
            px: { xs: 2, sm: 3 },
            height: 64,
            minHeight: 64,
          }}
        >
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
              color: "primary.main",
              fontWeight: 800,
              fontSize: "1.25rem",
              "&:hover": { opacity: 0.9 },
            }}
          >
            <Box
              sx={{
                bgcolor: "primary.main",
                color: "primary.contrastText",
                p: 0.75,
                borderRadius: 2,
                display: "flex",
                boxShadow: 1,
              }}
            >
              <Map size={20} />
            </Box>
            <Typography
              component="span"
              sx={{ fontWeight: 800, letterSpacing: '-0.01rem', display: { xs: "none", sm: "inline-block" } }}
            >
              Atlas Earth HQ
            </Typography>
            <Typography
              component="span"
              sx={{ fontWeight: 800, letterSpacing: '-0.01rem', display: { xs: "inline-block", sm: "none" } }}
            >
              AE HQ
            </Typography>
          </Box>

          <Box sx={{ flex: 1 }} />

          {/* Desktop nav */}
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              gap: 3,
              display: { xs: "none", md: "flex" },
            }}
          >
            {links.map((link) => {
              const active = location.pathname === link.href;
              return (
                <Box
                  key={link.href}
                  component={Link}
                  to={link.href}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.75,
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    color: active ? "primary.main" : "text.secondary",
                    transition: "color 0.2s",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  <link.icon size={16} />
                  {link.label}
                </Box>
              );
            })}

            <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 24, alignSelf: "center" }} />

            <IconButton
              size="small"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </IconButton>

            <Button
              variant="outlined"
              size="small"
              onClick={handleShare}
              startIcon={<Share2 size={16} />}
            >
              Share FAQ
            </Button>
          </Stack>

          {/* Mobile controls */}
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              gap: 0.5,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton onClick={toggleTheme} aria-label="Toggle dark mode" sx={{ color: "text.secondary" }}>
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </IconButton>
            <IconButton onClick={handleShare} aria-label="Share FAQ" sx={{ color: "text.secondary" }}>
              <Share2 size={20} />
            </IconButton>
            <IconButton onClick={() => setIsOpen(true)} aria-label="Toggle Menu" sx={{ color: "text.primary" }}>
              <Menu size={24} />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer anchor="top" open={isOpen} onClose={() => setIsOpen(false)}>
        <Box sx={{ pt: 1, pb: 2 }}>
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "flex-end",
              px: 2,
              py: 1,
            }}
          >
            <IconButton onClick={() => setIsOpen(false)} aria-label="Close Menu">
              <X size={24} />
            </IconButton>
          </Stack>
          <Stack sx={{ flexDirection: "column", px: 2, gap: 1 }}>
            {links.map((link) => {
              const active = location.pathname === link.href;
              return (
                <Box
                  key={link.href}
                  component={Link}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: 2,
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: "1rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    color: active ? "primary.main" : "text.primary",
                    bgcolor: active ? (t) => alpha(t.palette.primary.main, 0.1) : "transparent",
                    transition: "background-color 0.2s",
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <link.icon
                    size={20}
                    color={active ? undefined : "currentColor"}
                    style={{ opacity: active ? 1 : 0.7 }}
                  />
                  {link.label}
                </Box>
              );
            })}
          </Stack>
        </Box>
      </Drawer>

      {/* Share toast */}
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
          You can now paste the FAQ link anywhere.
        </Alert>
      </Snackbar>
    </>
  );
}