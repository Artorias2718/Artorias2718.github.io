import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, DollarSign, Users, ChevronRight, Globe2, Wallet, Landmark, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-20 pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Globe2 className="w-4 h-4" />
              <span>The unofficial community guide by <strong>Artorias2718</strong></span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground tracking-tight mb-6 leading-tight">
              Welcome to <span className="text-primary relative whitespace-nowrap">
                Atlas Earth
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Buy virtual plots of real-world land. Build your empire. Earn rent. 
              Whether you're just starting out or looking to optimize your strategy, you're in the right place.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="h-14 px-8 text-base shadow-lg shadow-primary/20 hover:scale-105 transition-transform duration-200">
                <Link href="/faq">
                  Read the FAQ <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base bg-background/50 backdrop-blur">
                <Link href="/glossary">
                  View Glossary
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Mechanics */}
      <section className="py-24 bg-card border-y border-border/50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">How it works</h2>
            <p className="text-muted-foreground text-lg">The core loop of Atlas Earth is simple, but building a profitable empire takes time and strategy.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-background/50 border-border/50 backdrop-blur hover:border-primary/30 transition-colors group">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-primary">
                  <MapPin className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-serif">1. Buy Land</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Purchase 30ft x 30ft virtual parcels of real-world locations. Every parcel you own is yours to keep, and comes in four rarities: Common, Rare, Epic, and Legendary.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/50 border-border/50 backdrop-blur hover:border-secondary/30 transition-colors group">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors text-secondary">
                  <DollarSign className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-serif">2. Earn Rent</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every parcel generates virtual rent every second of every day. The higher the rarity of your parcel, the more rent it generates automatically.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/50 border-border/50 backdrop-blur hover:border-primary/30 transition-colors group">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-primary">
                  <Wallet className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-serif">3. Cash Out</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Once your virtual rent reaches the $5 threshold, you can cash out to real money via PayPal, gift cards, or reinvest it into more Atlas Bucks.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Before you start */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Before you buy your first parcel...</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 bg-primary/20 p-1.5 rounded-full h-fit">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">It's a game, not an investment</h4>
                    <p className="text-muted-foreground">Atlas Earth should be treated as a fun game that happens to pay out coffee money over time. Do not expect to get rich quick or quit your job.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 bg-primary/20 p-1.5 rounded-full h-fit">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Free-to-play is viable</h4>
                    <p className="text-muted-foreground">You don't need to spend real money. By watching ads, spinning the wheel, and collecting diamonds, you can build a large empire entirely for free.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 bg-primary/20 p-1.5 rounded-full h-fit">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Boosts are everything</h4>
                    <p className="text-muted-foreground">Watching ads to boost your rent multiplier is the absolute most important mechanic in the game. Keep your boost active!</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <Landmark className="w-48 h-48" />
              </div>
              <h3 className="font-serif font-bold text-2xl mb-4 relative z-10">Got specific questions?</h3>
              <p className="text-muted-foreground mb-8 relative z-10 leading-relaxed">
                The community has answered the same questions hundreds of times. We compiled them all into one searchable database.
              </p>
              <div className="space-y-3 relative z-10 mb-8">
                <div className="bg-background/80 p-3 rounded-lg text-sm font-medium border border-border flex items-center justify-between">
                  <span>How much can I realistically earn?</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="bg-background/80 p-3 rounded-lg text-sm font-medium border border-border flex items-center justify-between">
                  <span>What happens if someone already owns a parcel?</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="bg-background/80 p-3 rounded-lg text-sm font-medium border border-border flex items-center justify-between">
                  <span>What's the best strategy for new players?</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
              <Button asChild className="w-full h-12 text-base shadow-sm relative z-10">
                <Link href="/faq">Go to the FAQ</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <Users className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Join the Community</h2>
          <p className="text-primary-foreground/80 text-xl mb-10 leading-relaxed">
            Atlas Earth has a massive, active community of players discussing strategy, sharing milestones, and helping newcomers.
          </p>
          <Button asChild size="lg" variant="secondary" className="h-14 px-8 text-base shadow-xl text-primary font-bold">
            <a href="https://www.reddit.com/r/AtlasEarthOfficial/" target="_blank" rel="noreferrer">
              Visit r/AtlasEarthOfficial <ExternalLink className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
