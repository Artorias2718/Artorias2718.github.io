import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import { ExternalLink, MessageSquare, AlertCircle, HelpCircle, Bug } from "lucide-react";
import { SiReddit, SiFacebook } from "react-icons/si";

// ─── shared sub-component ─────────────────────────────────────────────────────

interface ChannelCardProps {
  icon: React.ReactNode;
  iconBg: string | ((theme: any) => string);
  iconColor: string;
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
  external?: boolean;
  buttonVariant?: "contained" | "outlined";
}

function ChannelCard({
  icon,
  iconBg,
  iconColor,
  title,
  description,
  buttonLabel,
  href,
  external = true,
  buttonVariant = "outlined",
}: ChannelCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        bgcolor: "background.paper",
        transition: "border-color 0.2s",
        "&:hover": { borderColor: "primary.main" },
        height: "100%",
      }}
    >
      <CardContent sx={{ p: 3, display: "flex", gap: 2, alignItems: "flex-start", height: "100%" }}>
        <Box
          sx={{
            flexShrink: 0,
            p: 1.5,
            borderRadius: 2.5,
            bgcolor: iconBg,
            color: iconColor,
            display: "flex",
          }}
        >
          {icon}
        </Box>

        <Stack spacing={0} sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 700, fontSize: "1.05rem", mb: 0.75 }}>
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", lineHeight: 1.7, mb: 2.5, flex: 1 }}
          >
            {description}
          </Typography>
          <Box>
            <Button
              component="a"
              href={href}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              variant={buttonVariant}
              size="small"
              endIcon={<ExternalLink size={14} />}
            >
              {buttonLabel}
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Contact() {
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
              bgcolor: (t) => alpha(t.palette.primary.main, 0.1),
              color: "primary.main",
              mb: 4,
            }}
          >
            <MessageSquare size={16} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Get help from real players
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
            Contact &amp; Support
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              lineHeight: 1.8,
              fontSize: "1.1rem",
              maxWidth: 580,
              mx: "auto",
            }}
          >
            Atlas Earth HQ is a community resource. For the quickest answers, the
            communities below are the best place to reach active players and veteran members.
          </Typography>
        </Container>
      </Box>

      {/* Community Channels */}
      <Box component="section" sx={{ py: 12, bgcolor: "background.default" }}>
        <Container maxWidth="lg" sx={{ maxWidth: 900 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5 }}>
            Community channels
          </Typography>
          <Typography sx={{ color: "text.secondary", lineHeight: 1.8, mb: 5 }}>
            The Atlas Earth community is active, welcoming, and quick to help. These are the
            best places to ask questions, discuss strategy, and connect with other players.
          </Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <ChannelCard
                icon={<SiReddit size={24} />}
                iconBg={() => alpha("#f97316", 0.1)}
                iconColor="#f97316"
                title="r/AtlasEarth"
                description="The primary Reddit community for Atlas Earth players. A great place to ask questions, share strategies, celebrate milestones, and stay up to date with game news."
                buttonLabel="Visit Subreddit"
                href="https://www.reddit.com/r/AtlasEarth/"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <ChannelCard
                icon={<SiReddit size={24} />}
                iconBg={() => alpha("#f97316", 0.1)}
                iconColor="#f97316"
                title="r/AtlasEarthOfficial"
                description="The official subreddit moderated in partnership with Atlas Reality. Check here for official announcements, patch notes, and developer communications."
                buttonLabel="Visit Subreddit"
                href="https://www.reddit.com/r/AtlasEarthOfficial/"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <ChannelCard
                icon={<SiFacebook size={24} />}
                iconBg={() => alpha("#2563eb", 0.1)}
                iconColor="#2563eb"
                title="Atlas Earth Facebook Groups"
                description='Multiple active Facebook groups host tens of thousands of players. Search "Atlas Earth" in Facebook Groups to find the most active communities near you or for your region.'
                buttonLabel="Search Facebook Groups"
                href="https://www.facebook.com/groups/search/results/?q=atlas+earth"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <ChannelCard
                icon={<HelpCircle size={24} />}
                iconBg={(t: any) => alpha(t.palette.primary.main, 0.1)}
                iconColor="primary.main"
                title="Official FAQ on This Site"
                description="Before posting a question in any community, check our FAQ first. Over 30 of the most commonly asked questions are answered and searchable."
                buttonLabel="Search the FAQ"
                href="/faq"
                external={false}
                buttonVariant="contained"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Official Support */}
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
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5 }}>
            Official Atlas Earth support
          </Typography>
          <Typography sx={{ color: "text.secondary", lineHeight: 1.8, mb: 5 }}>
            For account issues, missing rewards, payment problems, or bug reports, you need to
            contact Atlas Reality directly. Community members cannot access your account or fix
            technical issues.
          </Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <ChannelCard
                icon={<Bug size={20} />}
                iconBg={(t: any) => alpha(t.palette.primary.main, 0.1)}
                iconColor="primary.main"
                title="Report a Bug or Account Issue"
                description="For missing parcels, broken rewards, payout issues, or anything account-related, use the in-app support button or visit the official help center."
                buttonLabel="Atlas Earth Help Center"
                href="https://atlasreality.helpshift.com/hc/en/3-atlas-earth/"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <ChannelCard
                icon={<AlertCircle size={20} />}
                iconBg={(t: any) => alpha(t.palette.primary.main, 0.1)}
                iconColor="primary.main"
                title="In-App Support"
                description='The fastest way to reach Atlas Reality is through the app itself. Go to your profile, tap the settings icon, then "Help & Support" to open a support ticket.'
                buttonLabel="Atlas Earth Official Site"
                href="https://www.atlasearth.com"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* About This Site */}
      <Box component="section" sx={{ py: 12, bgcolor: "background.default" }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
            About this website
          </Typography>

          <Stack spacing={2.5} sx={{ color: "text.secondary" }}>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              Atlas Earth HQ is a fan-made, community-maintained resource. It is not
              affiliated with Atlas Reality, Inc. or the official Atlas Earth game. The site is
              maintained by active Atlas Earth players who want to make the community a more
              welcoming place for new players.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              If you notice outdated information, an incorrect answer, or a question we have
              not covered, the best way to flag it is to post in one of the community channels
              above — particularly the Reddit communities, where the guide maintainers are
              active.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              This site does not collect personal data beyond standard web analytics. See our{" "}
              <Typography
                component={Link}
                to="/privacypolicy"
                sx={{ color: "primary.main", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
              >
                Privacy Policy
              </Typography>{" "}
              for full details.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}