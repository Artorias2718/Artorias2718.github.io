import { useState } from "react";
import { Search, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { glossaryTerms } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Glossary() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTerms = glossaryTerms.filter(
    (item) => 
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.definition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl min-h-[calc(100vh-16rem)]">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-secondary/10 text-secondary rounded-2xl mb-6">
          <BookOpen className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Glossary of Terms</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          The Atlas Earth community uses a lot of jargon and acronyms. Here's a quick reference to help you translate.
        </p>
      </div>

      <div className="relative max-w-md mx-auto mb-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input 
          type="search"
          placeholder="Search terms (e.g., AB, SRB, Badge)..."
          className="h-12 pl-12 rounded-xl shadow-sm border-border bg-card"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredTerms.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">No terms found matching "{searchQuery}".</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTerms.map((item, idx) => (
            <Card key={idx} className="bg-card border-border shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
              <CardHeader className="pb-3 border-b border-border/50 bg-muted/20">
                <CardTitle className="text-xl font-serif text-primary">{item.term}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 flex-1">
                <p className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: item.definition }}></p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
