import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import {
  ArrowRight,
  MapPin,
  DollarSign,
  Users,
  ChevronRight,
  Globe2,
  Wallet,
  Landmark,
  ExternalLink,
} from "lucide-react";

export default function Home() {
  return (
    <Box sx={{ width: "100%" }}>
      {/* Hero Section */}
      <Box
        component="section"
        sx={{
          position: "relative",
          overflow: "hidden",
          bgcolor: "background.default",
          pt: 12,
          pb: 20,
        }}
      >
        {/* Radial gradient overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: (theme) =>
              `radial-gradient(ellipse at top right, ${alpha(theme.palette.primary.main, 0.1)}, transparent 60%)`,
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Stack sx={{ alignItems: "center", textAlign: "center", maxWidth: 720, mx: "auto" }}>
            {/* Eyebrow badge */}
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 0.75,
                borderRadius: 99,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                color: "primary.main",
                mb: 4,
              }}
            >
              <Globe2 size={16} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                The unofficial community guide by <strong>Artorias2718</strong>
              </Typography>
            </Stack>

            {/* Headline */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.75rem", md: "4.5rem" },
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                mb: 3,
              }}
            >
              Welcome to{" "}
              <Box
                component="span"
                sx={{ color: "primary.main", position: "relative", whiteSpace: "nowrap" }}
              >
                Atlas Earth
                <Box
                  component="svg"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                  sx={{
                    position: "absolute",
                    bottom: -8,
                    left: 0,
                    width: "100%",
                    height: 12,
                    color: (theme) => alpha(theme.palette.primary.main, 0.3),
                  }}
                >
                  <path
                    d="M0,5 Q50,10 100,5"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                </Box>
              </Box>
            </Typography>

            <Typography
              variant="h6"
              sx={{ color: "text.secondary", fontWeight: 400, mb: 5, lineHeight: 1.7, maxWidth: 560 }}
            >
              Buy virtual plots of real-world land. Build your empire. Earn rent. Whether
              you're just starting out or looking to optimize your strategy, you're in the
              right place.
            </Typography>

            <Stack sx={{ flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
              <Button
                component={Link}
                to="/faq"
                variant="contained"
                size="large"
                endIcon={<ArrowRight size={20} />}
                sx={{
                  height: 56,
                  px: 4,
                  fontSize: "1rem",
                  boxShadow: (theme) =>
                    `0 8px 24px ${alpha(theme.palette.primary.main, 0.25)}`,
                  "&:hover": { transform: "scale(1.03)" },
                  transition: "transform 0.2s",
                }}
              >
                Read the FAQ
              </Button>
              <Button
                component={Link}
                to="/glossary"
                variant="outlined"
                size="large"
                sx={{ height: 56, px: 4, fontSize: "1rem" }}
              >
                View Glossary
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Core Mechanics */}
      <Box
        component="section"
        sx={{
          py: 14,
          bgcolor: "background.paper",
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg">
          <Stack sx={{ alignItems: "center", textAlign: "center", maxWidth: 560, mx: "auto", mb: 10 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
              How it works
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "1.125rem" }}>
              The core loop of Atlas Earth is simple, but building a profitable empire takes
              time and strategy.
            </Typography>
          </Stack>

          <Grid container spacing={4}>
            {[
              {
                icon: <MapPin size={28} />,
                color: "primary" as const,
                title: "1. Buy Land",
                body: "Purchase 30ft × 30ft virtual parcels of real-world locations. Every parcel you own is yours to keep, and comes in four rarities: Common, Rare, Epic, and Legendary.",
              },
              {
                icon: <DollarSign size={28} />,
                color: "secondary" as const,
                title: "2. Earn Rent",
                body: "Every parcel generates virtual rent every second of every day. The higher the rarity of your parcel, the more rent it generates automatically.",
              },
              {
                icon: <Wallet size={28} />,
                color: "primary" as const,
                title: "3. Cash Out",
                body: "Once your virtual rent reaches the $5 threshold, you can cash out to real money via PayPal, gift cards, or reinvest it into more Atlas Bucks.",
              },
            ].map(({ icon, color, title, body }) => (
              <Grid size={{ xs: 12, md: 4 }} key={title}>
                <Card
                  sx={{
                    height: "100%",
                    bgcolor: "background.default",
                    border: "1px solid",
                    borderColor: "divider",
                    transition: "border-color 0.2s",
                    "&:hover": { borderColor: `${color}.main` },
                    "&:hover .icon-box": {
                      bgcolor: `${color}.main`,
                      color: `${color}.contrastText`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      className="icon-box"
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: (theme) => alpha(theme.palette[color].main, 0.1),
                        color: `${color}.main`,
                        mb: 3,
                        transition: "background-color 0.2s, color 0.2s",
                      }}
                    >
                      {icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                      {title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
                      {body}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Before you start */}
      <Box component="section" sx={{ py: 14, bgcolor: "background.default" }}>
        <Container maxWidth="lg" sx={{ maxWidth: 900 }}>
          <Grid container spacing={10} sx={{ alignItems: "center" }}>
            {/* Left column */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, lineHeight: 1.2 }}>
                Before you buy your first parcel...
              </Typography>
              <Stack spacing={4}>
                {[
                  {
                    title: "It's a game, not an investment",
                    body: "Atlas Earth should be treated as a fun game that happens to pay out coffee money over time. Do not expect to get rich quick or quit your job.",
                  },
                  {
                    title: "Free-to-play is viable",
                    body: "You don't need to spend real money. By watching ads, spinning the wheel, and collecting diamonds, you can build a large empire entirely for free.",
                  },
                  {
                    title: "Boosts are everything",
                    body: "Watching ads to boost your rent multiplier is the absolute most important mechanic in the game. Keep your boost active!",
                  },
                ].map(({ title, body }) => (
                  <Stack key={title} sx={{ flexDirection: "row", gap: 2 }}>
                    <Box
                      sx={{
                        mt: 0.5,
                        flexShrink: 0,
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: "primary.main",
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: "1.05rem", mb: 0.5 }}>
                        {title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
                        {body}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Grid>

            {/* Right column — FAQ card */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={6}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  position: "relative",
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    p: 3,
                    opacity: 0.05,
                    pointerEvents: "none",
                  }}
                >
                  <Landmark size={192} />
                </Box>

                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5, position: "relative" }}>
                  Got specific questions?
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: 4, lineHeight: 1.7, position: "relative" }}
                >
                  The community has answered the same questions hundreds of times. We
                  compiled them all into one searchable database.
                </Typography>

                <Stack spacing={1.5} sx={{ mb: 4, position: "relative" }}>
                  {[
                    "How much can I realistically earn?",
                    "What happens if someone already owns a parcel?",
                    "What's the best strategy for new players?",
                  ].map((q) => (
                    <Paper
                      key={q}
                      variant="outlined"
                      sx={{
                        px: 2,
                        py: 1.5,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        bgcolor: "background.default",
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {q}
                      </Typography>
                      <ChevronRight size={16} color="gray" />
                    </Paper>
                  ))}
                </Stack>

                <Button
                  component={Link}
                  to="/faq"
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{ height: 48, fontSize: "1rem", position: "relative" }}
                >
                  Go to the FAQ
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box
        component="section"
        sx={{
          py: 14,
          bgcolor: "primary.main",
          color: "#ffffff",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ mb: 3, opacity: 0.8 }}>
            <Users size={64} />
          </Box>
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, mb: 3, fontSize: { xs: "2rem", md: "3rem" } }}
          >
            Join the Community
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 400, mb: 6, lineHeight: 1.7, opacity: 0.85 }}
          >
            Atlas Earth has a massive, active community of players discussing strategy,
            sharing milestones, and helping newcomers.
          </Typography>
          <Button
            component="a"
            href="https://www.reddit.com/r/AtlasEarthOfficial/"
            target="_blank"
            rel="noreferrer"
            variant="contained"
            color="inherit"
            size="large"
            endIcon={<ExternalLink size={20} />}
            sx={{
              height: 56,
              px: 5,
              fontSize: "1rem",
              fontWeight: 700,
              bgcolor: "white",
              color: "primary.main",
              "&:hover": { bgcolor: "grey.100" },
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            Visit r/AtlasEarthOfficial
          </Button>
        </Container>
      </Box>
    </Box>
  );
}