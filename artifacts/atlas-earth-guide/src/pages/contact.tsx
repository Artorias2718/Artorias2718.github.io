import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, MessageSquare, AlertCircle, HelpCircle, Bug } from "lucide-react";
import { SiReddit, SiFacebook } from "react-icons/si";

export default function Contact() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-background pt-16 pb-20 border-b border-border/50">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <MessageSquare className="w-4 h-4" />
            <span>Get help from real players</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 tracking-tight">
            Contact & Support
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Atlas Earth Guide is a community resource. For the quickest answers, the communities below are the best place to reach active players and veteran members.
          </p>
        </div>
      </section>

      {/* Community Channels */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-serif font-bold mb-4">Community channels</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            The Atlas Earth community is active, welcoming, and quick to help. These are the best places to ask questions, discuss strategy, and connect with other players.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-500/10 p-3 rounded-xl flex-shrink-0">
                    <SiReddit className="w-6 h-6 text-orange-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg mb-1">r/AtlasEarth</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      The primary Reddit community for Atlas Earth players. A great place to ask questions, share strategies, celebrate milestones, and stay up to date with game news.
                    </p>
                    <Button asChild variant="outline" size="sm" className="gap-2">
                      <a href="https://www.reddit.com/r/AtlasEarth/" target="_blank" rel="noreferrer">
                        Visit Subreddit <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-500/10 p-3 rounded-xl flex-shrink-0">
                    <SiReddit className="w-6 h-6 text-orange-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg mb-1">r/AtlasEarthOfficial</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      The official subreddit moderated in partnership with Atlas Reality. Check here for official announcements, patch notes, and developer communications.
                    </p>
                    <Button asChild variant="outline" size="sm" className="gap-2">
                      <a href="https://www.reddit.com/r/AtlasEarthOfficial/" target="_blank" rel="noreferrer">
                        Visit Subreddit <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600/10 p-3 rounded-xl flex-shrink-0">
                    <SiFacebook className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg mb-1">Atlas Earth Facebook Groups</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      Multiple active Facebook groups host tens of thousands of players. Search "Atlas Earth" in Facebook Groups to find the most active communities near you or for your region.
                    </p>
                    <Button asChild variant="outline" size="sm" className="gap-2">
                      <a href="https://www.facebook.com/groups/search/results/?q=atlas+earth" target="_blank" rel="noreferrer">
                        Search Facebook Groups <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl flex-shrink-0">
                    <HelpCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg mb-1">Official FAQ on This Site</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      Before posting a question in any community, check our FAQ first. Over 30 of the most commonly asked questions are answered and searchable.
                    </p>
                    <Button asChild size="sm" className="gap-2">
                      <a href="/faq">
                        Search the FAQ <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Official Support */}
      <section className="py-20 bg-card border-y border-border/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-serif font-bold mb-4">Official Atlas Earth support</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            For account issues, missing rewards, payment problems, or bug reports, you need to contact Atlas Reality directly. Community members cannot access your account or fix technical issues.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-background border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2.5 rounded-xl text-primary flex-shrink-0">
                    <Bug className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Report a Bug or Account Issue</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      For missing parcels, broken rewards, payout issues, or anything account-related, use the in-app support button or visit the official help center.
                    </p>
                    <Button asChild variant="outline" size="sm" className="gap-2">
                      <a href="https://atlasreality.helpshift.com/hc/en/3-atlas-earth/" target="_blank" rel="noreferrer">
                        Atlas Earth Help Center <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2.5 rounded-xl text-primary flex-shrink-0">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">In-App Support</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      The fastest way to reach Atlas Reality is through the app itself. Go to your profile, tap the settings icon, then "Help & Support" to open a support ticket.
                    </p>
                    <Button asChild variant="outline" size="sm" className="gap-2">
                      <a href="https://www.atlasearth.com" target="_blank" rel="noreferrer">
                        Atlas Earth Official Site <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About This Site contact */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-serif font-bold mb-4">About this website</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Atlas Earth Guide is a fan-made, community-maintained resource. It is not affiliated with Atlas Reality, Inc. or the official Atlas Earth game. The site is maintained by active Atlas Earth players who want to make the community a more welcoming place for new players.
            </p>
            <p>
              If you notice outdated information, an incorrect answer, or a question we have not covered, the best way to flag it is to post in one of the community channels above — particularly the Reddit communities, where the guide maintainers are active.
            </p>
            <p>
              This site does not collect personal data beyond standard web analytics. See our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a> for full details.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
