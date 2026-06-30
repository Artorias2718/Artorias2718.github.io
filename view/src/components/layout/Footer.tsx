import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import {
  Map,
  HelpCircle,
  BookOpen,
  ExternalLink,
  Heart,
  Info,
  Mail,
  Shield,
  Layers,
  Timer,
  ShieldCheck,
} from "lucide-react";

// ─── data ─────────────────────────────────────────────────────────────────────

const navLinks = [
  { href: "/", label: "Home Guide", icon: Map },
  { href: "/faq", label: "Player FAQ", icon: HelpCircle },
  { href: "/glossary", label: "Glossary", icon: BookOpen },
  { href: "/resources", label: "Resources", icon: Layers },
  { href: "/boost-timer", label: "Boost Timer", icon: Timer },
  { href: "/progress-vault", label: "Progress Vault", icon: ShieldCheck },
  { href: "/about", label: "About", icon: Info },
  { href: "/contact", label: "Contact", icon: Mail },
];

const officialLinks = [
  { href: "https://www.atlasearth.com", label: "Atlas Earth Website" },
  { href: "https://atlasreality.helpshift.com/hc/en/3-atlas-earth/", label: "Official Support" },
  { href: "https://www.reddit.com/r/AtlasEarthOfficial/", label: "Official Subreddit" },
];

// ─── shared link styles ────────────────────────────────────────────────────────

const footerLinkSx = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  fontSize: "0.875rem",
  color: "text.secondary",
  textDecoration: "none",
  transition: "color 0.2s",
  "&:hover": { color: "primary.main" },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        py: 6,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Brand column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontWeight: 800,
                fontSize: "1.25rem",
                color: "primary.main",
                textDecoration: "none",
                mb: 2,
              }}
            >
              <Map size={20} />
              Atlas Earth HQ
            </Box>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", lineHeight: 1.7, maxWidth: 380, mb: 3 }}
            >
              A community-built resource to help new players navigate the virtual real estate
              world of Atlas Earth. Not affiliated with Atlas Reality.
            </Typography>
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: 0.5,
                width: "fit-content",
                fontSize: "0.875rem",
                bgcolor: "background.default",
                px: 2,
                py: 1,
                borderRadius: 99,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography component="span" sx={{ fontSize: "0.875rem", color: "primary.main" }}>
                Made with
              </Typography>
              <Heart size={14} style={{ color: "#ef4444", fill: "#ef4444" }} />
              <Typography component="span" sx={{ fontSize: "0.875rem", color: "primary.main" }}>
                by
              </Typography>
              <Typography
                component="span"
                sx={{ fontSize: "0.875rem", fontWeight: 700, color: "text.primary" }}
              >
                Artorias2718
              </Typography>
            </Stack>
          </Grid>

          {/* Navigate column */}
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography sx={{ fontWeight: 700, mb: 2 }}>Navigate</Typography>
            <Stack
              component="ul"
              sx={{ flexDirection: "column", listStyle: "none", m: 0, p: 0, gap: 1.5 }}
            >
              {navLinks.map((link) => (
                <Box component="li" key={link.href}>
                  <Box component={Link} to={link.href} sx={footerLinkSx}>
                    <link.icon size={16} />
                    {link.label}
                  </Box>
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Official links column */}
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography sx={{ fontWeight: 700, mb: 2 }}>Official Links</Typography>
            <Stack
              component="ul"
              sx={{ flexDirection: "column", listStyle: "none", m: 0, p: 0, gap: 1.5 }}
            >
              {officialLinks.map((link) => (
                <Box component="li" key={link.href}>
                  <Box
                    component="a"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    sx={footerLinkSx}
                  >
                    {link.label}
                    <ExternalLink size={12} />
                  </Box>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom bar */}
        <Stack
          sx={{
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            pt: 4,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            This is a fan-made resource guide. All product names, logos, and brands are
            property of their respective owners.
          </Typography>

          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
            <Box
              component={Link}
              to="/privacypolicy"
              sx={{ ...footerLinkSx, fontSize: "0.75rem" }}
            >
              <Shield size={14} /> Privacy Policy
            </Box>
            <Box component={Link} to="/about" sx={{ ...footerLinkSx, fontSize: "0.75rem" }}>
              About
            </Box>
            <Box component={Link} to="/contact" sx={{ ...footerLinkSx, fontSize: "0.75rem" }}>
              Contact
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}