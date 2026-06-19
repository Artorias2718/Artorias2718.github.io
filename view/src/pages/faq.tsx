import { useState, useMemo, useEffect } from "react";
import { Search, Link as LinkIcon, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { faqData } from "@/lib/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLocation } from "wouter";

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const [location] = useLocation();

  const handleCopyLink = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const url = `${window.location.origin}${location}#${id}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: "Direct link to this question copied to clipboard.",
    });
  };

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return faqData;
    
    const query = searchQuery.toLowerCase();
    
    return faqData.map(category => {
      const filteredQuestions = category.questions.filter(
        q => q.q.toLowerCase().includes(query) || q.a.toLowerCase().includes(query)
      );
      
      return {
        ...category,
        questions: filteredQuestions
      };
    }).filter(category => category.questions.length > 0);
  }, [searchQuery]);

  // Open item if there's a hash in the URL on mount
  const [defaultValues, setDefaultValues] = useState<string[]>([]);
  
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      // Find the category containing this hash
      for (const category of faqData) {
        if (category.questions.some(q => generateId(q.q) === hash)) {
          setDefaultValues([category.category]);
          setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              element.classList.add('bg-primary/5', 'transition-colors', 'duration-1000');
              setTimeout(() => element.classList.remove('bg-primary/5'), 2000);
            }
          }, 100);
          break;
        }
      }
    } else if (searchQuery) {
      // If searching, open all categories with results
      setDefaultValues(filteredData.map(c => c.category));
    }
  }, [searchQuery, filteredData]);

  const generateId = (question: string) => {
    return question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl min-h-[calc(100vh-16rem)]">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-2xl mb-6">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Everything you need to know about Atlas Earth. Search below or browse by category.
        </p>
      </div>

      <div className="relative max-w-2xl mx-auto mb-16">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input 
          type="search"
          placeholder="Search for answers..."
          className="h-14 pl-12 text-lg rounded-2xl shadow-sm border-border bg-card focus-visible:ring-primary/20"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-12">
        {filteredData.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground">We couldn't find any questions matching "{searchQuery}".</p>
            <Button variant="link" onClick={() => setSearchQuery("")} className="mt-4">
              Clear search
            </Button>
          </div>
        ) : (
          <Accordion 
            type="multiple" 
            defaultValue={defaultValues}
            value={searchQuery ? filteredData.map(c => c.category) : undefined}
            className="space-y-8"
          >
            {filteredData.map((category) => (
              <AccordionItem 
                key={category.category} 
                value={category.category}
                className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm px-6 py-2 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-2xl font-serif font-bold hover:no-underline py-6 [&[data-state=open]>div>svg]:rotate-180">
                  <div className="flex items-center justify-between w-full">
                    <span>{category.category}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-6 pt-2">
                    {category.questions.map((q, qIdx) => {
                      const id = generateId(q.q);
                      return (
                        <div key={qIdx} id={id} className="scroll-mt-24 group rounded-xl p-4 -mx-4 hover:bg-muted/50 transition-colors">
                          <div className="flex items-start gap-4">
                            <div className="flex-1">
                              <h4 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                                {q.q}
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={(e) => handleCopyLink(e, id)}
                                  title="Copy link to this question"
                                >
                                  <LinkIcon className="w-3.5 h-3.5 text-muted-foreground" />
                                </Button>
                              </h4>
                              <p className="text-muted-foreground leading-relaxed">
                                <span dangerouslySetInnerHTML={{ __html: q.a }} />
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
}
