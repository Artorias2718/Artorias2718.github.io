import { Link, useLocation } from "wouter";
import { Menu, X, Map, HelpCircle, BookOpen, Share2, Info, ExternalLink, Timer, ShieldCheck, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/ThemeProvider";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();

  const links = [
    { href: "/", label: "Guide", icon: Map },
    { href: "/faq", label: "FAQ", icon: HelpCircle },
    { href: "/glossary", label: "Glossary", icon: BookOpen },
    { href: "/resources", label: "Resources", icon: ExternalLink },
    { href: "/boost-timer", label: "Boost Timer", icon: Timer },
    { href: "/progress-vault", label: "Vault", icon: ShieldCheck },
    { href: "/about", label: "About", icon: Info },
  ];

  const handleShare = () => {
    const url = window.location.origin + "/faq";
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: "You can now paste the FAQ link anywhere.",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-serif font-bold text-xl text-primary hover:opacity-90 transition-opacity">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg shadow-sm">
            <Map className="w-5 h-5" />
          </div>
          <span className="hidden sm:inline-block tracking-tight">Atlas Earth Guide</span>
          <span className="sm:hidden tracking-tight">AE Guide</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                location === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </Link>
          ))}
          <div className="w-px h-6 bg-border mx-2" />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="text-muted-foreground hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
            <Share2 className="w-4 h-4" />
            Share FAQ
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle dark mode">
            {theme === "dark" ? <Sun className="w-5 h-5 text-muted-foreground" /> : <Moon className="w-5 h-5 text-muted-foreground" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={handleShare} aria-label="Share FAQ">
            <Share2 className="w-5 h-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-b bg-background animate-in slide-in-from-top-2">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium transition-colors hover:bg-muted",
                  location === link.href ? "bg-primary/10 text-primary" : "text-foreground"
                )}
              >
                <link.icon className={cn("w-5 h-5", location === link.href ? "text-primary" : "text-muted-foreground")} />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
