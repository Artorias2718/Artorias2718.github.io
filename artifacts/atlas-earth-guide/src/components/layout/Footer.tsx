import { Link } from "wouter";
import { Map, HelpCircle, BookOpen, ExternalLink, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/50 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-serif font-bold text-xl text-primary mb-4">
              <Map className="w-5 h-5" />
              Atlas Earth Guide
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed mb-6">
              A community-built resource to help new players navigate the virtual real estate world of Atlas Earth. Not affiliated with Atlas Reality.
            </p>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-muted/50 w-fit px-3 py-1.5 rounded-full border border-border/50">
              Made with <Heart className="w-3.5 h-3.5 text-destructive fill-destructive" /> by players
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Map className="w-4 h-4" /> Home Guide
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" /> Player FAQ
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Glossary
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Official Links</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="https://www.atlasearth.com" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  Atlas Earth Website <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://atlasreality.helpshift.com/hc/en/3-atlas-earth/" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  Official Support <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>This is a fan-made resource guide. All product names, logos, and brands are property of their respective owners.</p>
        </div>
      </div>
    </footer>
  );
}
