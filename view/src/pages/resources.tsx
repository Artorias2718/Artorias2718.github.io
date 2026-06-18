import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calculator, Map, MessageCircle, Layers, Globe2 } from "lucide-react";
import { SiReddit, SiDiscord, SiFacebook, SiYoutube } from "react-icons/si";

const resources = [
  {
    category: "Calculators & Tools",
    description: "Make smarter decisions about which parcels to buy and how to grow your empire.",
    items: [
      {
        name: "Atlas Earth Calculator",
        url: "https://www.atlasearthcalculator.com",
        icon: Calculator,
        iconColor: "text-emerald-600",
        iconBg: "bg-emerald-50",
        description:
          "The go-to community calculator for Atlas Earth. Estimate how long it will take to earn back your investment on a parcel, compare parcel rarities, and figure out optimal Atlas Buck spending strategies. An essential tool for any serious player.",
        badge: "Most Used",
      },
      {
        name: "Parcely",
        url: "https://parcely.app",
        icon: Layers,
        iconColor: "text-blue-600",
        iconBg: "bg-blue-50",
        description:
          "A companion app and web tool for Atlas Earth that helps you track your parcel portfolio, monitor your earnings over time, and visualize your land holdings on a map. Great for players with a large number of parcels who want better visibility into their empire.",
        badge: "Portfolio Tracker",
      },
    ],
  },
  {
    category: "Community & Discussion",
    description: "Connect with thousands of active players, ask questions, and share strategies.",
    items: [
      {
        name: "r/AtlasEarth",
        url: "https://www.reddit.com/r/AtlasEarth/",
        icon: SiReddit,
        iconColor: "text-orange-500",
        iconBg: "bg-orange-50",
        description:
          "The largest community-run subreddit for Atlas Earth. A welcoming place to ask questions, share your parcel milestones, discuss strategy, and browse tips from other players. Great for finding answers to questions not covered in official docs.",
        badge: "Most Active",
      },
      {
        name: "r/AtlasEarthOfficial",
        url: "https://www.reddit.com/r/AtlasEarthOfficial/",
        icon: SiReddit,
        iconColor: "text-orange-500",
        iconBg: "bg-orange-50",
        description:
          "The official subreddit maintained in partnership with Atlas Reality. This is where you'll find developer announcements, patch notes, official event posts, and responses from the Atlas Earth team.",
        badge: "Official",
      },
      {
        name: "Atlas Earth Discord",
        url: "https://discord.gg/atlasearth",
        icon: SiDiscord,
        iconColor: "text-indigo-500",
        iconBg: "bg-indigo-50",
        description:
          "The official Atlas Earth Discord server. Join real-time chats, ask questions in dedicated help channels, participate in giveaways, and stay up to date on announcements. The Discord is one of the fastest places to get an answer from another player.",
        badge: "Official",
      },
      {
        name: "Atlas Earth Facebook Groups",
        url: "https://www.facebook.com/groups/search/results/?q=atlas+earth",
        icon: SiFacebook,
        iconColor: "text-blue-600",
        iconBg: "bg-blue-50",
        description:
          "There are dozens of active Facebook Groups for Atlas Earth players, including regional groups and general strategy groups. Search for 'Atlas Earth' in Facebook Groups to find communities near you or focused on topics you care about.",
        badge: null,
      },
    ],
  },
  {
    category: "Official Resources",
    description: "Straight from Atlas Reality — the source of truth for game rules, policies, and updates.",
    items: [
      {
        name: "Atlas Earth Official Website",
        url: "https://www.atlasearth.com",
        icon: Globe2,
        iconColor: "text-primary",
        iconBg: "bg-primary/10",
        description:
          "The official home of Atlas Earth. Download the app, learn about the game, read about new features, and find links to official social channels. Always check here for the most accurate and up-to-date information about the game.",
        badge: "Official",
      },
      {
        name: "Atlas Earth Help Center",
        url: "https://atlasreality.helpshift.com/hc/en/3-atlas-earth/",
        icon: MessageCircle,
        iconColor: "text-primary",
        iconBg: "bg-primary/10",
        description:
          "The official support knowledge base from Atlas Reality. Covers account issues, payout problems, technical bugs, and in-depth explanations of game mechanics directly from the developers. If you have an account or payment issue, start here.",
        badge: "Official",
      },
      {
        name: "Atlas Earth on YouTube",
        url: "https://www.youtube.com/results?search_query=atlas+earth+game",
        icon: SiYoutube,
        iconColor: "text-red-500",
        iconBg: "bg-red-50",
        description:
          "A wealth of community-made video content covering Atlas Earth strategy, earning guides, parcel tours, and payout walkthroughs. Searching YouTube for 'Atlas Earth' surfaces a broad range of tutorials from experienced players — great for visual learners.",
        badge: null,
      },
    ],
  },
  {
    category: "In-App Features Worth Knowing",
    description: "Not external links, but built-in Atlas Earth features that new players often miss.",
    items: [
      {
        name: "The Daily Wheel & Diamonds",
        url: "https://www.atlasearth.com",
        icon: Map,
        iconColor: "text-amber-600",
        iconBg: "bg-amber-50",
        description:
          "New players often overlook the free Atlas Bucks available every day. The daily spin wheel, diamond collection on the map, and ad-watching rewards add up quickly. Free-to-play players who stay consistent with these mechanics can accumulate enough Atlas Bucks to buy multiple parcels per week without spending a cent.",
        badge: "In-App",
      },
    ],
  },
];

const badgeColors: Record<string, string> = {
  "Most Used": "bg-emerald-100 text-emerald-700",
  "Most Active": "bg-orange-100 text-orange-700",
  "Official": "bg-primary/10 text-primary",
  "Portfolio Tracker": "bg-blue-100 text-blue-700",
  "In-App": "bg-violet-100 text-violet-700",
};

export default function Resources() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-background pt-16 pb-20 border-b border-border/50">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <ExternalLink className="w-4 h-4" />
            <span>Handpicked community tools and links</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 tracking-tight">
            Atlas Earth Resources
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Everything the community has built around Atlas Earth in one place — calculators, trackers, discussion forums, and official channels.
          </p>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl space-y-20">
          {resources.map((section) => (
            <div key={section.category}>
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-2">
                  {section.category}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{section.description}</p>
              </div>

              <div className="grid gap-5">
                {section.items.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Card
                      key={item.name}
                      data-testid={`card-resource-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="bg-card border-border/50 hover:border-primary/30 transition-all hover:shadow-md group"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-5">
                          <div className={`p-3 rounded-xl flex-shrink-0 ${item.iconBg}`}>
                            <IconComponent className={`w-6 h-6 ${item.iconColor}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                              <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                              {item.badge && (
                                <span
                                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                    badgeColors[item.badge] ?? "bg-muted text-muted-foreground"
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                              {item.description}
                            </p>
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="gap-2 group-hover:border-primary/50 transition-colors"
                              data-testid={`link-resource-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                            >
                              <a href={item.url} target="_blank" rel="noreferrer noopener">
                                Visit {item.name} <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Submit a resource CTA */}
      <section className="py-16 bg-card border-t border-border/50">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl font-serif font-bold mb-3">Know a resource we missed?</h2>
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-xl mx-auto">
            The Atlas Earth community is always building new tools. If you know of a calculator, tracker, or community we should add here, drop a comment in the subreddit and tag the guide.
          </p>
          <Button asChild variant="outline" className="gap-2">
            <a href="https://www.reddit.com/r/AtlasEarth/" target="_blank" rel="noreferrer noopener">
              <SiReddit className="w-4 h-4 text-orange-500" />
              Suggest a resource on Reddit
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
