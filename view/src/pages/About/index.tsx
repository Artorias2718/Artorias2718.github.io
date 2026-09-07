import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import Kaiba from "../../assets/Kaiba.jpg";
import { decode } from 'html-entities';
import useGetAboutDetails from "@/api/queryHooks/About/useGetAboutDetails";
import useGetCommunityLinks from "@/api/queryHooks/About/useGetCommunityLinks";
import { iconMap } from "@/../public/iconMap";
import { ExternalLink, Heart, HelpCircle } from "lucide-react";

export default function About() {
  const { data: aboutDetails1 } = useGetAboutDetails(true);
    const { data: aboutDetails2 } = useGetAboutDetails(false);
    const { data: communityLinks } = useGetCommunityLinks();

    //console.log(aboutDetails2);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Hero */}
      <Box
        component="section"
        sx={{
          bgcolor: "background.default",
          pt: 10,
          pb: 12,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              display: "inline-flex",
              px: 2,
              py: 0.75,
              borderRadius: 99,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
              color: "primary.main",
              mb: 4,
            }}
          >
            <Heart size={16} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Community built, player driven
            </Typography>
          </Stack>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.02em",
              mb: 3,
              fontSize: { xs: "2.25rem", md: "3rem" },
            }}
          >
            About This Guide
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: "text.secondary", lineHeight: 1.8, fontSize: "1.1rem" }}
          >
            Atlas Earth HQ is an independent, fan-made resource created by players, for
            players. We are not affiliated with Atlas Reality, Inc. or the official Atlas Earth
            game in any way.
          </Typography>
        </Container>
      </Box>

      {/* Why This Exists */}
      <Box component="section" sx={{ py: 12, bgcolor: "background.default" }}>
        <Container maxWidth="lg" sx={{ maxWidth: 900 }}>
          <Grid container spacing={8} sx={{ alignItems: "flex-start" }}>
            {/* Left — prose */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
                Why this guide exists
              </Typography>
              <Stack spacing={2.5} sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  If you have spent any time in Atlas Earth Facebook Groups or the r/AtlasEarth
                  subreddit, you have seen the same handful of questions posted every single day.{" "}
                  <em>
                    "How do I earn money?" "Is this a scam?" "What is the best strategy?"
                  </em>
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  Veteran players are generous, but answering the same question for the hundredth
                  time gets exhausting. This site was built so that anyone can drop a single link
                  and give a new player everything they need to get started — without having to
                  type it out again.
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  Our goal is to be the most comprehensive, honest, and up-to-date unofficial
                  guide to Atlas Earth on the internet. We try to set realistic expectations (this
                  is a slow-burn game, not a get-rich scheme), explain every mechanic clearly, and
                  keep the community informed.
                </Typography>
              </Stack>
            </Grid>

            {/* Right — feature cards */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={2}>
                  {aboutDetails1 && aboutDetails1.map(({ icon, title, description }) => {
                      const IconComponent = iconMap[icon];
                      return (
                          <Card
                              key={title}
                              variant="outlined"
                              sx={{ bgcolor: "background.paper" }}
                          >
                              <CardContent sx={{ p: 3, display: "flex", gap: 2, alignItems: "flex-start" }}>
                                  <Box
                                      sx={{
                                          flexShrink: 0,
                                          p: 1.25,
                                          borderRadius: 2.5,
                                          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                                          color: "primary.main",
                                          display: "flex",
                                      }}
                                  >
                                      {icon && <IconComponent />}
                                  </Box>
                                  <Box>
                                      <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
                                          {decode(title)}
                                      </Typography>
                                      <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
                                          {decode(description)}
                                      </Typography>
                                  </Box>
                              </CardContent>
                          </Card>
                      )
                  }
                )}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* What We Cover */}
      <Box
        component="section"
        sx={{
          py: 12,
          bgcolor: "background.paper",
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg" sx={{ maxWidth: 900 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 6, textAlign: "center" }}>
            What we cover
          </Typography>
          <Grid container spacing={3}>
              {aboutDetails2 && aboutDetails2.map(({ title, description }) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={title}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: "background.default",
                    height: "100%",
                  }}
                >
                  <Typography sx={{ fontWeight: 700, mb: 1 }}>
                    {decode(title)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
                    {decode(description)}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Author */}
      <Box
        component="section"
        sx={{
          py: 12,
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg" sx={{ maxWidth: 900 }}>
          <Grid container spacing={8} sx={{ alignItems: "center" }}>
            {/* Left — bio */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="overline"
                sx={{
                  color: "primary.main",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  display: "block",
                  mb: 1,
                }}
              >
                The person behind this
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 2.5 }}>
                Artorias2718
              </Typography>
              <Stack spacing={2.5} sx={{ color: "text.secondary" }}>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  This guide was researched, written, and built by{" "}
                  <Typography component="strong" sx={{ color: "text.primary", fontWeight: 700 }}>
                    Artorias2718
                  </Typography>{" "}
                  — a veteran Atlas Earth whale and long-time community member with one of the
                  largest parcel portfolios in the game.
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  After years of watching the same beginner questions cycle through every Facebook
                  Group and subreddit thread, the decision was made to build one definitive
                  resource and end the repetition for good. If a new player's question is answered
                  somewhere on this site, that's a small win for everyone.
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  You'll find Artorias2718 active in the Atlas Earth Reddit communities and
                  Facebook Groups — feel free to say hi.
                </Typography>
              </Stack>
            </Grid>

            {/* Right — profile card */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                variant="outlined"
                sx={{ p: 4, borderRadius: 4, bgcolor: "background.default" }}
              >
                {/* Avatar row */}
                <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 2, mb: 3 }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 3,
                      overflow: "hidden",
                      flexShrink: 0,
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    }}
                  >
                    <Box
                      component="img"
                      src={Kaiba}
                      alt=""
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: "1.1rem", lineHeight: 1.2 }}>
                      Artorias2718
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
                      AE Whale · Community Guide Author
                    </Typography>
                  </Box>
                </Stack>

                {/* Stats */}
                <Stack divider={<Divider />}>
                  {[
                    { label: "Status", value: "Active Player", color: "primary.main" },
                    { label: "Player type", value: "AE Whale", color: "text.primary" },
                    { label: "Community", value: communityLinks || [], color: "text.primary" },
                  ].map(({ label, value, color }) => (
                    <Stack
                      key={label}
                      sx={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 1.5,
                      }}
                    >
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {label}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color }}>
                          {typeof(value) !== 'string' && value.map(({href, icon, alt}, index) => <Link key={index} to={href}><img src={icon} style={{ width: '4rem', }} alt={alt} /></Link>)}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Disclaimer */}
      <Box component="section" sx={{ py: 12, bgcolor: "background.default" }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
            Disclaimer
          </Typography>

          <Stack spacing={2.5} sx={{ color: "text.secondary" }}>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              <Typography component="strong" sx={{ color: "text.primary", fontWeight: 700 }}>
                Atlas Earth HQ is an independent, unofficial fan site.
              </Typography>{" "}
              We are not affiliated with, endorsed by, or in any way connected to Atlas Reality,
              Inc., the developers of Atlas Earth.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              All trademarks, service marks, trade names, and game content referenced on this
              site are the property of their respective owners. References to Atlas Earth, Atlas
              Bucks, Atlas Coins, and related terms are used solely for informational and
              editorial purposes.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              The information on this site is provided for educational purposes only and reflects
              our best understanding of how the game works based on community experience. Game
              mechanics, payout structures, and policies can change at any time. Always refer to
              the{" "}
              <Typography
                component="a"
                href="https://www.atlasearth.com"
                target="_blank"
                rel="noreferrer"
                sx={{
                  color: "primary.main",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                official Atlas Earth website
              </Typography>{" "}
              and{" "}
              <Typography
                component="a"
                href="https://atlasreality.helpshift.com/hc/en/3-atlas-earth/"
                target="_blank"
                rel="noreferrer"
                sx={{
                  color: "primary.main",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                official support documentation
              </Typography>{" "}
              for the most current and authoritative information.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              Nothing on this site constitutes financial advice. Atlas Earth should be approached
              as a game, not as a financial investment.
            </Typography>
          </Stack>

          <Stack sx={{ flexDirection: { xs: "column", sm: "row" }, gap: 2, mt: 6 }}>
            <Button
              component={Link}
              to="/faq"
              variant="contained"
              startIcon={<HelpCircle size={16} />}
              size="large"
            >
              Browse the FAQ
            </Button>
            <Button
              component="a"
              href="https://www.atlasearth.com"
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              endIcon={<ExternalLink size={16} />}
              size="large"
            >
              Official Atlas Earth Site
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}