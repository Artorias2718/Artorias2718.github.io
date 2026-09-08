import { useMemo, useState } from "react";
import {
    alpha,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Stack,
    Typography
} from "@mui/material";
import { ExternalLink, Globe2 } from "lucide-react";
import { SiReddit } from "react-icons/si";
import ResourceSearch from './ResourceSearch';
import useGetResources from "@/api/queryHooks/Resource/useGetResources";
import { iconMap } from "@/../public/iconMap";
import type { IResourceGroupRead } from "@/Types";

// ─── badge config ─────────────────────────────────────────────────────────────

type BadgeName = "Most Used" | "Most Active" | "Official" | "Community" | "Portfolio Tracker" | "In-App";

const badgeProps: Record<BadgeName, { bg: string; color: string }> = {
    "Community": {bg: "secondary", color: "primary"},
    "Most Used": {bg: "#d1fae5", color: "#065f46"},
    "Most Active": {bg: "#ffedd5", color: "#9a3412"},
    "Official": {bg: "primary", color: "primary"},
    "Portfolio Tracker": {bg: "#dbeafe", color: "#1e40af"},
    "In-App": {bg: "#ede9fe", color: "#5b21b6"},
};

type Section = IResourceGroupRead;
type ResourceItem = IResourceGroupRead["items"][number];

function filterResources(resources: Section[], query: string): Section[] {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return resources;
    // ...rest unchanged
}

// ─── ResourceCard ─────────────────────────────────────────────────────────────

function ResourceCard({ item }: { item: ResourceItem }) {
    const IconComponent = iconMap[item.icon] ?? Globe2;
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
            <CardContent sx={{p: 3}}>
                <Stack sx={{flexDirection: "row", gap: 2.5, alignItems: "flex-start"}}>
                    {/* Icon */}
                    <Box
                        sx={{
                            flexShrink: 0,
                            p: 1.5,
                            borderRadius: 2.5,
                            bgcolor: isPrimary
                                ? (t) => alpha(t.palette.primary.main, 0.1)
                                : item.iconBackground,
                            color: isPrimary ? "primary.main" : item.iconColor,
                            display: "flex",
                        }}
                    >
                        <IconComponent size={24}/>
                    </Box>

                    {/* Content */}
                    <Box sx={{flex: 1, minWidth: 0}}>
                        <Stack
                            sx={{
                                flexDirection: "row",
                                flexWrap: "wrap",
                                alignItems: "center",
                                gap: 1.5,
                                mb: 1,
                            }}
                        >
                            <Typography sx={{fontWeight: 700, fontSize: "1.05rem", lineHeight: 1.3}}>
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
                            sx={{color: "text.secondary", lineHeight: 1.7, mb: 2}}
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
                            endIcon={<ExternalLink size={14}/>}
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
    const { data: resources } = useGetResources();

    const [query, setQuery] = useState("");
    const visible = useMemo(
        () => filterResources(resources, query),
        [resources, query]);
    const resultCount = useMemo(() =>
            visible && visible.reduce(
                (n, s) => s.items && (n + s.items.length), 0),
        [visible]
    );

    console.log('Visible: ', visible);

    return (
        <Box sx={{width: "100%"}}>
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
                <Container maxWidth="md" sx={{textAlign: "center"}}>
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
                        <ExternalLink size={16}/>
                        <Typography variant="body2" sx={{fontWeight: 500}}>
                            Handpicked community tools and links
                        </Typography>
                    </Stack>

                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 800,
                            letterSpacing: "-0.02em",
                            mb: 3,
                            fontSize: {xs: "2.25rem", md: "3rem"},
                        }}
                    >
                        Atlas Earth Resources
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
                        Everything the community has built around Atlas Earth in one place — calculators,
                        trackers, discussion forums, and official channels.
                    </Typography>
                    <ResourceSearch value={query} onChange={setQuery} resultCount={resultCount}/>
                </Container>
            </Box>

            {/* Resource sections */}
            <Box component="section" sx={{py: 10, bgcolor: "background.default"}}>
                <Container maxWidth="lg" sx={{maxWidth: 900}}>
                    {visible && visible.length === 0
                        ? (
                            <Box sx={{textAlign: "center", py: 6}}>
                                <Typography variant="h6" sx={{fontWeight: 700, mb: 1}}>
                                    No resources match “{query.trim()}”
                                </Typography>
                                <Typography variant="body1" sx={{color: "text.secondary", mb: 3}}>
                                    Try a broader term like “calculator”, “discord”, or “official”.
                                </Typography>
                                <Button variant="outlined" onClick={() => setQuery("")}>
                                    Clear search
                                </Button>
                            </Box>
                        )
                        : (
                            <Stack sx={{gap: 12}}>
                                {visible && visible.map((section) => (
                                    <Box key={section.category}>
                                        <Box sx={{mb: 4}}>
                                            <Typography
                                                variant="h4"
                                                sx={{fontWeight: 800, mb: 1, fontSize: {xs: "1.5rem", md: "1.75rem"}}}
                                            >
                                                {section.category}
                                            </Typography>
                                            <Typography variant="body1" sx={{color: "text.secondary", lineHeight: 1.7}}>
                                                {section.description}
                                            </Typography>
                                        </Box>

                                        <Stack sx={{gap: 2}}>
                                            {section.items.map((item) => (
                                                <ResourceCard key={item.name} item={item}/>
                                            ))}
                                        </Stack>
                                    </Box>
                                ))}
                            </Stack>
                        )}
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
                    <Typography variant="h5" sx={{fontWeight: 800, mb: 1.5}}>
                        Know a resource we missed?
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{color: "text.secondary", lineHeight: 1.8, mb: 4, maxWidth: 520, mx: "auto"}}
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
                        startIcon={<SiReddit style={{color: "#f97316"}}/>}
                    >
                        Suggest a resource on Reddit
                    </Button>
                </Container>
            </Box>
        </Box>
    );
}