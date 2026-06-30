import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import { ExternalLink, Calculator, Map, MessageCircle, Layers, Globe2 } from "lucide-react";
import { SiReddit, SiDiscord, SiFacebook, SiYoutube } from "react-icons/si";

// ─── data ─────────────────────────────────────────────────────────────────────

const resources = [
  {
    category: "Calculators & Tools",
    description:
      "Make smarter decisions about which parcels to buy and how to grow your empire.",
    items: [
      {
        name: "Atlas Earth Calculator",
        url: "https://www.atlasearthcalculator.com",
        icon: Calculator,
        iconColor: "#059669",
        iconBg: "#ecfdf5",
        description:
          "The go-to community calculator for Atlas Earth. Estimate how long it will take to earn back your investment on a parcel, compare parcel rarities, and figure out optimal Atlas Buck spending strategies. An essential tool for any serious player.",
        badge: "Most Used",
      },
      {
        name: "Parcely",
        url: "https://parcely.app",
        icon: Layers,
        iconColor: "#2563eb",
        iconBg: "#eff6ff",
        description:
          "A companion app and web tool for Atlas Earth that helps you track your parcel portfolio, monitor your earnings over time, and visualize your land holdings on a map. Great for players with a large number of parcels who want better visibility into their empire.",
        badge: "Portfolio Tracker",
      },
    ],
  },
  {
    category: "Community & Discussion",
    description:
      "Connect with thousands of active players, ask questions, and share strategies.",
    items: [
      {
        name: "r/AtlasEarth",
        url: "https://www.reddit.com/r/AtlasEarth/",
        icon: SiReddit,
        iconColor: "#f97316",
        iconBg: "#fff7ed",
        description:
          "The largest community-run subreddit for Atlas Earth. A welcoming place to ask questions, share your parcel milestones, discuss strategy, and browse tips from other players. Great for finding answers to questions not covered in official docs.",
        badge: "Most Active",
      },
      {
        name: "r/AtlasEarthOfficial",
        url: "https://www.reddit.com/r/AtlasEarthOfficial/",
        icon: SiReddit,
        iconColor: "#f97316",
        iconBg: "#fff7ed",
        description:
          "The official subreddit maintained in partnership with Atlas Reality. This is where you'll find developer announcements, patch notes, official event posts, and responses from the Atlas Earth team.",
        badge: "Official",
      },
      {
        name: "Atlas Earth Discord",
        url: "https://discord.gg/atlasearth",
        icon: SiDiscord,
        iconColor: "#6366f1",
        iconBg: "#eef2ff",
        description:
          "The official Atlas Earth Discord server. Join real-time chats, ask questions in dedicated help channels, participate in giveaways, and stay up to date on announcements. The Discord is one of the fastest places to get an answer from another player.",
        badge: "Official",
      },
      {
        name: "Atlas Earth Facebook Groups",
        url: "https://www.facebook.com/groups/search/results/?q=atlas+earth",
        icon: SiFacebook,
        iconColor: "#2563eb",
        iconBg: "#eff6ff",
        description:
          "There are dozens of active Facebook Groups for Atlas Earth players, including regional groups and general strategy groups. Search for 'Atlas Earth' in Facebook Groups to find communities near you or focused on topics you care about.",
        badge: null,
      },
    ],
  },
  {
    category: "Official Resources",
    description:
      "Straight from Atlas Reality — the source of truth for game rules, policies, and updates.",
    items: [
      {
        name: "Atlas Earth Official Website",
        url: "https://www.atlasearth.com",
        icon: Globe2,
        iconColor: "primary",
        iconBg: "primary",
        description:
          "The official home of Atlas Earth. Download the app, learn about the game, read about new features, and find links to official social channels. Always check here for the most accurate and up-to-date information about the game.",
        badge: "Official",
      },
      {
        name: "Atlas Earth Help Center",
        url: "https://atlasreality.helpshift.com/hc/en/3-atlas-earth/",
        icon: MessageCircle,
        iconColor: "primary",
        iconBg: "primary",
        description:
          "The official support knowledge base from Atlas Reality. Covers account issues, payout problems, technical bugs, and in-depth explanations of game mechanics directly from the developers. If you have an account or payment issue, start here.",
        badge: "Official",
      },
      {
        name: "Atlas Earth on YouTube",
        url: "https://www.youtube.com/results?search_query=atlas+earth+game",
        icon: SiYoutube,
        iconColor: "#ef4444",
        iconBg: "#fef2f2",
        description:
          "A wealth of community-made video content covering Atlas Earth strategy, earning guides, parcel tours, and payout walkthroughs. Searching YouTube for 'Atlas Earth' surfaces a broad range of tutorials from experienced players — great for visual learners.",
        badge: null,
      },
    ],
  },
  {
    category: "In-App Features Worth Knowing",
    description:
      "Not external links, but built-in Atlas Earth features that new players often miss.",
    items: [
      {
        name: "The Daily Wheel & Diamonds",
        url: "https://www.atlasearth.com",
        icon: Map,
        iconColor: "#d97706",
        iconBg: "#fffbeb",
        description:
          "New players often overlook the free Atlas Bucks available every day. The daily spin wheel, diamond collection on the map, and ad-watching rewards add up quickly. Free-to-play players who stay consistent with these mechanics can accumulate enough Atlas Bucks to buy multiple parcels per week without spending a cent.",
        badge: "In-App",
      },
    ],
  },
];

// ─── badge config ─────────────────────────────────────────────────────────────

type BadgeName = "Most Used" | "Most Active" | "Official" | "Portfolio Tracker" | "In-App";

const badgeProps: Record<BadgeName, { bg: string; color: string }> = {
  "Most Used":        { bg: "#d1fae5", color: "#065f46" },
  "Most Active":      { bg: "#ffedd5", color: "#9a3412" },
  "Official":         { bg: "primary", color: "primary" },
  "Portfolio Tracker":{ bg: "#dbeafe", color: "#1e40af" },
  "In-App":           { bg: "#ede9fe", color: "#5b21b6" },
};

// ─── ResourceCard ─────────────────────────────────────────────────────────────

function ResourceCard({ item }: { item: (typeof resources)[0]["items"][0] }) {
  const IconComponent = item.icon;
  const isPrimary = item.iconColor === "primary";
  const slug = item.name.toLowerCase().replace(/\s+/g, "-");
  const badge = item.badge as BadgeName | null;
  const bp = badge ? badgeProps[badge] : null;
  const isPrimaryBadge = bp?.bg === "primary";

  return (
    <Card
      variant="outlined"
      data-testid={`card-resource-${slug}`}
      sx={{
        transition: "border-color 0.2s, box-shadow 0.2s",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: (t) => `0 4px 20px ${alpha(t.palette.common.black, 0.08)}`,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" gap={2.5} alignItems="flex-start">
          {/* Icon */}
          <Box
            sx={{
              flexShrink: 0,
              p: 1.5,
              borderRadius: 2.5,
              bgcolor: isPrimary
                ? (t) => alpha(t.palette.primary.main, 0.1)
                : item.iconBg,
              color: isPrimary ? "primary.main" : item.iconColor,
              display: "flex",
            }}
          >
            <IconComponent size={24} />
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" flexWrap="wrap" alignItems="center" gap={1.5} mb={1}>
              <Typography fontWeight={700} fontSize="1.05rem" lineHeight={1.3}>
                {item.name}
              </Typography>
              {badge && bp && (
                <Chip
                  label={badge}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    bgcolor: isPrimaryBadge
                      ? (t) => alpha(t.palette.primary.main, 0.1)
                      : bp.bg,
                    color: isPrimaryBadge ? "primary.main" : bp.color,
                    border: "none",
                  }}
                />
              )}
            </Stack>

            <Typography
              variant="body2"
              color="text.secondary"
              lineHeight={1.7}
              mb={2}
            >
              {item.description}
            </Typography>

            <Button
              component="a"
              href={item.url}
              target="_blank"
              rel="noreferrer noopener"
              variant="outlined"
              size="small"
              endIcon={<ExternalLink size={14} />}
              data-testid={`link-resource-${slug}`}
            >
              Visit {item.name}
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Resources() {
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
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={1}
            sx={{
              display: "inline-flex",
              px: 2,
              py: 0.75,
              borderRadius: 99,
              bgcolor: (t) => alpha(t.palette.primary.main, 0.1),
              color: "primary.main",
              mb: 4,
            }}
          >
            <ExternalLink size={16} />
            <Typography variant="body2" fontWeight={500}>
              Handpicked community tools and links
            </Typography>
          </Stack>

          <Typography
            variant="h2"
            fontWeight={800}
            letterSpacing="-0.02em"
            mb={3}
            sx={{ fontSize: { xs: "2.25rem", md: "3rem" } }}
          >
            Atlas Earth Resources
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            lineHeight={1.8}
            fontSize="1.1rem"
            sx={{ maxWidth: 580, mx: "auto" }}
          >
            Everything the community has built around Atlas Earth in one place — calculators,
            trackers, discussion forums, and official channels.
          </Typography>
        </Container>
      </Box>

      {/* Resource sections */}
      <Box component="section" sx={{ py: 10, bgcolor: "background.default" }}>
        <Container maxWidth="lg" sx={{ maxWidth: 900 }}>
          <Stack spacing={12}>
            {resources.map((section) => (
              <Box key={section.category}>
                <Box mb={4}>
                  <Typography
                    variant="h4"
                    fontWeight={800}
                    mb={1}
                    sx={{ fontSize: { xs: "1.5rem", md: "1.75rem" } }}
                  >
                    {section.category}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                    {section.description}
                  </Typography>
                </Box>

                <Stack spacing={2}>
                  {section.items.map((item) => (
                    <ResourceCard key={item.name} item={item} />
                  ))}
                </Stack>
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* CTA */}
      <Box
        component="section"
        sx={{
          py: 10,
          bgcolor: "background.paper",
          borderTop: "1px solid",
          borderColor: "divider",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h5" fontWeight={800} mb={1.5}>
            Know a resource we missed?
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            lineHeight={1.8}
            mb={4}
            sx={{ maxWidth: 520, mx: "auto" }}
          >
            The Atlas Earth community is always building new tools. If you know of a
            calculator, tracker, or community we should add here, drop a comment in the
            subreddit and tag the guide.
          </Typography>
          <Button
            component="a"
            href="https://www.reddit.com/r/AtlasEarth/"
            target="_blank"
            rel="noreferrer noopener"
            variant="outlined"
            size="large"
            startIcon={<SiReddit style={{ color: "#f97316" }} />}
          >
            Suggest a resource on Reddit
          </Button>
        </Container>
      </Box>
    </Box>
  );
}