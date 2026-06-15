import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Upload,
  Download,
  Trash2,
  ImageIcon,
  ShieldCheck,
  Info,
  X,
  CheckCircle2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// ─── IndexedDB helpers ────────────────────────────────────────────────────────

const DB_NAME = "atlasearth-vault";
const STORE = "screenshots";
const DB_VERSION = 1;

function openVaultDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "tag" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function saveEntry(entry: VaultEntry): Promise<void> {
  const db = await openVaultDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(entry);
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}

async function loadAllEntries(): Promise<VaultEntry[]> {
  const db = await openVaultDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).getAll();
    req.onsuccess = () => { db.close(); resolve(req.result as VaultEntry[]); };
    req.onerror = () => { db.close(); reject(req.error); };
  });
}

async function deleteEntry(tag: string): Promise<void> {
  const db = await openVaultDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(tag);
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}

// ─── types ────────────────────────────────────────────────────────────────────

interface VaultEntry {
  tag: string;
  blob: Blob;
  filename: string;
  uploadedAt: number;
}

// ─── constants ────────────────────────────────────────────────────────────────

const SUGGESTED_TAGS = [
  "Parcel Count",
  "Passport",
  "Leaderboard Rank",
  "Total Earnings",
  "Badge Collection",
  "Atlas Bucks Balance",
  "Parcel Map",
];

function formatDate(ts: number): string {
  return new Date(ts).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── ScreenshotCard ───────────────────────────────────────────────────────────

function ScreenshotCard({
  entry,
  onDelete,
}: {
  entry: VaultEntry;
  onDelete: (tag: string) => void;
}) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const objectUrl = URL.createObjectURL(entry.blob);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [entry.blob]);

  const handleDownload = () => {
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = entry.filename;
    a.click();
  };

  return (
    <Card
      className="bg-card border-border/50 overflow-hidden group hover:border-primary/30 transition-all hover:shadow-md"
      data-testid={`card-vault-${entry.tag}`}
    >
      {/* Image */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        {url ? (
          <img
            src={url}
            alt={entry.tag}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="w-10 h-10 text-muted-foreground/40" />
          </div>
        )}
        {/* Overlay actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleDownload}
            className="gap-1.5 shadow-lg"
            data-testid={`button-download-${entry.tag}`}
          >
            <Download className="w-4 h-4" /> Download
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(entry.tag)}
            className="gap-1.5 shadow-lg"
            data-testid={`button-delete-${entry.tag}`}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      {/* Meta */}
      <CardContent className="p-4">
        <p className="font-semibold text-sm truncate" title={entry.tag}>{entry.tag}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{formatDate(entry.uploadedAt)}</p>
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProgressVault() {
  const { toast } = useToast();

  const [entries, setEntries] = useState<VaultEntry[]>([]);
  const [tag, setTag] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [overwriteWarning, setOverwriteWarning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const refresh = useCallback(async () => {
    try {
      const all = await loadAllEntries();
      all.sort((a, b) => b.uploadedAt - a.uploadedAt);
      setEntries(all);
    } catch {
      toast({ title: "Could not load vault", description: "Check that your browser supports IndexedDB.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { refresh(); }, [refresh]);

  // Update overwrite warning when tag changes
  useEffect(() => {
    const trimmed = tag.trim();
    setOverwriteWarning(trimmed !== "" && entries.some((e) => e.tag.toLowerCase() === trimmed.toLowerCase()));
  }, [tag, entries]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const handleTagSelect = (t: string) => {
    setTag(t);
  };

  const handleUpload = async () => {
    const trimmed = tag.trim();
    if (!trimmed || !file) return;
    setUploading(true);
    try {
      await saveEntry({
        tag: trimmed,
        blob: file,
        filename: file.name,
        uploadedAt: Date.now(),
      });
      await refresh();
      toast({
        title: overwriteWarning ? `"${trimmed}" updated` : `"${trimmed}" saved`,
        description: overwriteWarning
          ? "The previous screenshot was replaced."
          : "Your screenshot is saved to the vault.",
      });
      setTag("");
      setFile(null);
      if (preview) { URL.revokeObjectURL(preview); setPreview(null); }
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      toast({ title: "Upload failed", description: "Something went wrong saving your screenshot.", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (t: string) => {
    try {
      await deleteEntry(t);
      setDeleteTarget(null);
      await refresh();
      toast({ title: `"${t}" removed`, description: "Screenshot deleted from your vault." });
    } catch {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  const canUpload = tag.trim() !== "" && file !== null && !uploading;

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-background pt-16 pb-12 border-b border-border/50">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <ShieldCheck className="w-4 h-4" />
            <span>Your personal proof-of-progress archive</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 tracking-tight">
            Progress Vault
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Upload screenshots of your parcels, passport, leaderboard rank, and earnings. Each screenshot is stored locally in your browser under a unique tag — upload again with the same tag to replace it with your latest.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Upload panel */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <h2 className="text-xl font-serif font-bold mb-5">Add a screenshot</h2>

                {/* Tag input */}
                <div className="mb-3">
                  <label className="text-sm font-medium text-foreground block mb-1.5" htmlFor="tag-input">
                    Tag <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="tag-input"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="e.g. Parcel Count"
                    className="h-10"
                    data-testid="input-tag"
                  />
                  {overwriteWarning && (
                    <p className="text-xs text-amber-600 mt-1.5 flex items-center gap-1">
                      <X className="w-3.5 h-3.5" /> A screenshot with this tag already exists and will be overwritten.
                    </p>
                  )}
                  {!overwriteWarning && tag.trim() && (
                    <p className="text-xs text-primary mt-1.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> New slot — will be saved as "{tag.trim()}".
                    </p>
                  )}
                </div>

                {/* Suggested tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {SUGGESTED_TAGS.map((t) => (
                    <button
                      key={t}
                      onClick={() => handleTagSelect(t)}
                      className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                        tag === t
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted/50 text-muted-foreground border-border/50 hover:border-primary/40 hover:text-foreground"
                      }`}
                      data-testid={`chip-tag-${t.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* File picker */}
                <div className="mb-5">
                  <label className="text-sm font-medium text-foreground block mb-1.5" htmlFor="file-input">
                    Screenshot <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="file-input"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border file:border-border file:text-xs file:font-medium file:bg-muted file:text-foreground hover:file:bg-muted/80 cursor-pointer"
                    data-testid="input-file"
                  />
                </div>

                {/* Preview */}
                {preview && (
                  <div className="mb-5 rounded-xl overflow-hidden border border-border/50 aspect-video bg-muted">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}

                <Button
                  onClick={handleUpload}
                  disabled={!canUpload}
                  className="w-full h-11 gap-2"
                  data-testid="button-upload"
                >
                  <Upload className="w-4 h-4" />
                  {uploading ? "Saving…" : overwriteWarning ? "Overwrite & Save" : "Save to Vault"}
                </Button>

                {/* Storage note */}
                <div className="mt-5 p-4 bg-muted/40 rounded-xl border border-border/50 flex gap-2.5">
                  <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Screenshots are stored in your browser only — nothing is uploaded to a server. Use the Download button on each image to save a local copy for durable proof.
                  </p>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-serif font-bold">
                  Your vault
                  {entries.length > 0 && (
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      ({entries.length} screenshot{entries.length !== 1 ? "s" : ""})
                    </span>
                  )}
                </h2>
              </div>

              {loading ? (
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="rounded-2xl bg-muted animate-pulse aspect-video" />
                  ))}
                </div>
              ) : entries.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border/50 rounded-3xl">
                  <ImageIcon className="w-14 h-14 text-muted-foreground/30 mb-4" />
                  <p className="font-semibold text-muted-foreground">No screenshots yet</p>
                  <p className="text-sm text-muted-foreground/70 mt-1 max-w-xs">
                    Upload your first screenshot using the panel on the left to start building your proof archive.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {entries.map((entry) => (
                    <ScreenshotCard
                      key={entry.tag}
                      entry={entry}
                      onDelete={(t) => setDeleteTarget(t)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why this matters */}
      <section className="py-16 bg-card border-t border-border/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-serif font-bold mb-8 text-center">Why keep your own proof?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Data loss happens",
                description:
                  "Even well-maintained systems can lose data. A regular screenshot of your parcel count and passport is the simplest insurance policy against any discrepancy.",
              },
              {
                title: "Leaderboard disputes",
                description:
                  "If your ranking ever looks off or your stats are questioned, having timestamped screenshots with your username visible is the clearest form of proof.",
              },
              {
                title: "Track your own growth",
                description:
                  "Overwriting each tag with a fresh screenshot every week or month gives you a living record of how your empire has grown over time.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-background rounded-2xl p-6 border border-border/50">
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delete confirm dialog */}
      {deleteTarget !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-background rounded-2xl border border-border shadow-2xl p-6 max-w-sm w-full">
            <h3 className="font-serif font-bold text-lg mb-2">Delete screenshot?</h3>
            <p className="text-sm text-muted-foreground mb-6">
              This will permanently remove the <strong>"{deleteTarget}"</strong> screenshot from your vault. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => handleDelete(deleteTarget)}
                data-testid="button-confirm-delete"
              >
                Delete
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setDeleteTarget(null)}
                data-testid="button-cancel-delete"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
