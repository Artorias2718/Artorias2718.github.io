import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe2, Users, BookOpen, HelpCircle, ExternalLink, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-background pt-16 pb-20 border-b border-border/50">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Heart className="w-4 h-4" />
            <span>Community built, player driven</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 tracking-tight">
            About This Guide
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Atlas Earth Guide is an independent, fan-made resource created by players, for players. We are not affiliated with Atlas Reality, Inc. or the official Atlas Earth game in any way.
          </p>
        </div>
      </section>

      {/* Why This Exists */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">Why this guide exists</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  If you have spent any time in Atlas Earth Facebook Groups or the r/AtlasEarth subreddit, you have seen the same handful of questions posted every single day. <em>"How do I earn money?" "Is this a scam?" "What is the best strategy?"</em>
                </p>
                <p>
                  Veteran players are generous, but answering the same question for the hundredth time gets exhausting. This site was built so that anyone can drop a single link and give a new player everything they need to get started — without having to type it out again.
                </p>
                <p>
                  Our goal is to be the most comprehensive, honest, and up-to-date unofficial guide to Atlas Earth on the internet. We try to set realistic expectations (this is a slow-burn game, not a get-rich scheme), explain every mechanic clearly, and keep the community informed.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Card className="bg-card border-border/50">
                <CardContent className="p-6 flex gap-4 items-start">
                  <div className="bg-primary/10 p-2.5 rounded-xl text-primary flex-shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Comprehensive FAQ</h3>
                    <p className="text-sm text-muted-foreground">Over 30 answered questions covering every aspect of Atlas Earth, from the basics to advanced strategy.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border/50">
                <CardContent className="p-6 flex gap-4 items-start">
                  <div className="bg-primary/10 p-2.5 rounded-xl text-primary flex-shrink-0">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Plain Language Glossary</h3>
                    <p className="text-sm text-muted-foreground">Every term a new player might encounter, explained simply — no prior gaming knowledge required.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border/50">
                <CardContent className="p-6 flex gap-4 items-start">
                  <div className="bg-primary/10 p-2.5 rounded-xl text-primary flex-shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Community Maintained</h3>
                    <p className="text-sm text-muted-foreground">Written and reviewed by active Atlas Earth players. We update the content as the game evolves.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What We Cover */}
      <section className="py-20 bg-card border-y border-border/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-serif font-bold mb-10 text-center">What we cover</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Getting Started",
                description: "What Atlas Earth is, how to download it, what parcels are, and what to expect as a brand new player."
              },
              {
                title: "Game Mechanics",
                description: "How rent works, what Atlas Bucks and Atlas Coins are, the difference between rarity tiers, and how boosts function."
              },
              {
                title: "Buying Land",
                description: "How to find and buy parcels, what the different map colors mean, and how proximity-based purchasing works."
              },
              {
                title: "Earnings & Payouts",
                description: "Realistic earning expectations, how the payout system works, minimum thresholds, and payout methods."
              },
              {
                title: "Strategy & Tips",
                description: "Free-to-play strategies, whether premium land is worth buying, common mistakes, and how to maximize your rent income."
              },
              {
                title: "Community Resources",
                description: "Where to find other players, the official Discord, subreddits, Facebook groups, and how to contact Atlas Reality support."
              }
            ].map((item) => (
              <div key={item.title} className="bg-background rounded-2xl p-6 border border-border/50">
                <h3 className="font-bold text-base mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-serif font-bold mb-6">Disclaimer</h2>
          <div className="prose prose-sm text-muted-foreground space-y-4 leading-relaxed">
            <p>
              <strong className="text-foreground">Atlas Earth Guide is an independent, unofficial fan site.</strong> We are not affiliated with, endorsed by, or in any way connected to Atlas Reality, Inc., the developers of Atlas Earth.
            </p>
            <p>
              All trademarks, service marks, trade names, and game content referenced on this site are the property of their respective owners. References to Atlas Earth, Atlas Bucks, Atlas Coins, and related terms are used solely for informational and editorial purposes.
            </p>
            <p>
              The information on this site is provided for educational purposes only and reflects our best understanding of how the game works based on community experience. Game mechanics, payout structures, and policies can change at any time. Always refer to the <a href="https://www.atlasearth.com" target="_blank" rel="noreferrer" className="text-primary hover:underline">official Atlas Earth website</a> and <a href="https://atlasreality.helpshift.com/hc/en/3-atlas-earth/" target="_blank" rel="noreferrer" className="text-primary hover:underline">official support documentation</a> for the most current and authoritative information.
            </p>
            <p>
              Nothing on this site constitutes financial advice. Atlas Earth should be approached as a game, not as a financial investment.
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <Link href="/faq">
                <HelpCircle className="mr-2 w-4 h-4" />
                Browse the FAQ
              </Link>
            </Button>
            <Button asChild variant="outline">
              <a href="https://www.atlasearth.com" target="_blank" rel="noreferrer">
                Official Atlas Earth Site <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
