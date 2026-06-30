import { useState, useEffect, useRef, useCallback } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Skeleton,
  Snackbar,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
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

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info";
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
      variant="outlined"
      data-testid={`card-vault-${entry.tag}`}
      sx={{
        overflow: "hidden",
        transition: "border-color 0.2s, box-shadow 0.2s",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: (t) => `0 4px 20px ${alpha(t.palette.common.black, 0.1)}`,
        },
        "& .vault-overlay": { opacity: 0, transition: "opacity 0.2s" },
        "&:hover .vault-overlay": { opacity: 1 },
        "& .vault-img": { transition: "transform 0.3s" },
        "&:hover .vault-img": { transform: "scale(1.02)" },
      }}
    >
      {/* Image */}
      <Box
        sx={{
          position: "relative",
          aspectRatio: "16/9",
          bgcolor: "action.hover",
          overflow: "hidden",
        }}
      >
        {url ? (
          <Box
            component="img"
            src={url}
            alt={entry.tag}
            className="vault-img"
            sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <Stack sx={{ alignItems: "center", justifyContent: "center", height: "100%" }}>
            <Box sx={{ color: (t) => alpha(t.palette.text.secondary, 0.3) }}>
              <ImageIcon size={40} />
            </Box>
          </Stack>
        )}

        {/* Hover overlay */}
        <Stack
          className="vault-overlay"
          sx={{
            flexDirection: "row",
            gap: 1,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.35)",
          }}
        >
          <Button
            size="small"
            variant="contained"
            color="inherit"
            startIcon={<Download size={14} />}
            onClick={handleDownload}
            data-testid={`button-download-${entry.tag}`}
            sx={{ bgcolor: "white", color: "text.primary", "&:hover": { bgcolor: "grey.100" } }}
          >
            Download
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => onDelete(entry.tag)}
            data-testid={`button-delete-${entry.tag}`}
            sx={{ minWidth: 0, px: 1.25 }}
          >
            <Trash2 size={14} />
          </Button>
        </Stack>
      </Box>

      {/* Meta */}
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Typography
          noWrap
          title={entry.tag}
          sx={{ fontWeight: 600, fontSize: "0.875rem" }}
        >
          {entry.tag}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.25 }}>
          {formatDate(entry.uploadedAt)}
        </Typography>
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProgressVault() {
  const [entries, setEntries] = useState<VaultEntry[]>([]);
  const [tag, setTag] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [overwriteWarning, setOverwriteWarning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = useCallback(
    (message: string, severity: SnackbarState["severity"] = "success") => {
      setSnackbar({ open: true, message, severity });
    },
    []
  );

  const refresh = useCallback(async () => {
    try {
      const all = await loadAllEntries();
      all.sort((a, b) => b.uploadedAt - a.uploadedAt);
      setEntries(all);
    } catch {
      showToast("Could not load vault. Check that your browser supports IndexedDB.", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => { refresh(); }, [refresh]);

  useEffect(() => {
    const trimmed = tag.trim();
    setOverwriteWarning(
      trimmed !== "" && entries.some((e) => e.tag.toLowerCase() === trimmed.toLowerCase())
    );
  }, [tag, entries]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const handleUpload = async () => {
    const trimmed = tag.trim();
    if (!trimmed || !file) return;
    setUploading(true);
    try {
      await saveEntry({ tag: trimmed, blob: file, filename: file.name, uploadedAt: Date.now() });
      await refresh();
      showToast(
        overwriteWarning
          ? `"${trimmed}" updated — previous screenshot replaced.`
          : `"${trimmed}" saved to your vault.`,
        "success"
      );
      setTag("");
      setFile(null);
      if (preview) { URL.revokeObjectURL(preview); setPreview(null); }
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      showToast("Something went wrong saving your screenshot.", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (t: string) => {
    try {
      await deleteEntry(t);
      setDeleteTarget(null);
      await refresh();
      showToast(`"${t}" removed from your vault.`);
    } catch {
      showToast("Delete failed.", "error");
    }
  };

  const canUpload = tag.trim() !== "" && file !== null && !uploading;

  return (
    <Box sx={{ width: "100%" }}>
      {/* Hero */}
      <Box
        component="section"
        sx={{
          bgcolor: "background.default",
          pt: 10,
          pb: 8,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
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
            <ShieldCheck size={16} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Your personal proof-of-progress archive
            </Typography>
          </Stack>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.02em",
              mb: 2,
              fontSize: { xs: "2.25rem", md: "3rem" },
            }}
          >
            Progress Vault
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              lineHeight: 1.8,
              fontSize: "1.1rem",
              maxWidth: 620,
              mx: "auto",
            }}
          >
            Upload screenshots of your parcels, passport, leaderboard rank, and earnings.
            Each screenshot is stored locally in your browser under a unique tag — upload again
            with the same tag to replace it with your latest.
          </Typography>
        </Container>
      </Box>

      {/* Main */}
      <Box component="section" sx={{ py: 10, bgcolor: "background.default" }}>
        <Container maxWidth="lg" sx={{ maxWidth: 1000 }}>
          <Grid container spacing={6}>
            {/* ── Upload panel ── */}
            <Grid size={{ xs: 12, lg: 5 }}>
              <Box sx={{ position: "sticky", top: 96 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>
                  Add a screenshot
                </Typography>

                {/* Tag input */}
                <Box sx={{ mb: 1.5 }}>
                  <Typography
                    component="label"
                    htmlFor="tag-input"
                    variant="body2"
                    sx={{ fontWeight: 600, display: "block", mb: 0.75 }}
                  >
                    Tag{" "}
                    <Typography component="span" sx={{ color: "error.main" }}>
                      *
                    </Typography>
                  </Typography>
                  <Box
                    component="input"
                    id="tag-input"
                    value={tag}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTag(e.target.value)}
                    placeholder="e.g. Parcel Count"
                    data-testid="input-tag"
                    sx={{
                      width: "100%",
                      height: 40,
                      px: 1.5,
                      borderRadius: 1.5,
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor: "background.paper",
                      color: "text.primary",
                      fontSize: "0.875rem",
                      outline: "none",
                      boxSizing: "border-box",
                      "&:focus": { borderColor: "primary.main" },
                    }}
                  />
                  {overwriteWarning && (
                    <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.5, mt: 0.75 }}>
                      <Box sx={{ color: "warning.main", display: "flex" }}>
                        <X size={14} />
                      </Box>
                      <Typography variant="caption" sx={{ color: "warning.main" }}>
                        A screenshot with this tag already exists and will be overwritten.
                      </Typography>
                    </Stack>
                  )}
                  {!overwriteWarning && tag.trim() && (
                    <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.5, mt: 0.75 }}>
                      <Box sx={{ color: "primary.main", display: "flex" }}>
                        <CheckCircle2 size={14} />
                      </Box>
                      <Typography variant="caption" sx={{ color: "primary.main" }}>
                        New slot — will be saved as "{tag.trim()}".
                      </Typography>
                    </Stack>
                  )}
                </Box>

                {/* Suggested tag chips */}
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                  {SUGGESTED_TAGS.map((t) => (
                    <Chip
                      key={t}
                      label={t}
                      size="small"
                      onClick={() => setTag(t)}
                      color={tag === t ? "primary" : "default"}
                      variant={tag === t ? "filled" : "outlined"}
                      data-testid={`chip-tag-${t.toLowerCase().replace(/\s+/g, "-")}`}
                      sx={{ cursor: "pointer" }}
                    />
                  ))}
                </Box>

                {/* File picker */}
                <Box sx={{ mb: 3 }}>
                  <Typography
                    component="label"
                    htmlFor="file-input"
                    variant="body2"
                    sx={{ fontWeight: 600, display: "block", mb: 0.75 }}
                  >
                    Screenshot{" "}
                    <Typography component="span" sx={{ color: "error.main" }}>
                      *
                    </Typography>
                  </Typography>
                  <Box
                    component="input"
                    id="file-input"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    data-testid="input-file"
                    sx={{
                      display: "block",
                      width: "100%",
                      fontSize: "0.8125rem",
                      color: "text.secondary",
                      cursor: "pointer",
                      "::file-selector-button": {
                        mr: 1.5,
                        py: 0.75,
                        px: 1.5,
                        borderRadius: 1,
                        border: "1px solid",
                        borderColor: "divider",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        bgcolor: "action.hover",
                        color: "text.primary",
                        cursor: "pointer",
                      },
                    }}
                  />
                </Box>

                {/* Preview */}
                {preview && (
                  <Box
                    sx={{
                      mb: 3,
                      borderRadius: 2.5,
                      overflow: "hidden",
                      border: "1px solid",
                      borderColor: "divider",
                      aspectRatio: "16/9",
                      bgcolor: "action.hover",
                    }}
                  >
                    <Box
                      component="img"
                      src={preview}
                      alt="Preview"
                      sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </Box>
                )}

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<Upload size={16} />}
                  onClick={handleUpload}
                  disabled={!canUpload}
                  data-testid="button-upload"
                  sx={{ height: 44 }}
                >
                  {uploading ? "Saving…" : overwriteWarning ? "Overwrite & Save" : "Save to Vault"}
                </Button>

                {/* Storage note */}
                <Paper
                  variant="outlined"
                  sx={{
                    mt: 2.5,
                    p: 2,
                    borderRadius: 2.5,
                    display: "flex",
                    gap: 1.25,
                    alignItems: "flex-start",
                    bgcolor: (t) => alpha(t.palette.action.hover, 0.5),
                  }}
                >
                  <Box sx={{ color: "text.secondary", flexShrink: 0, mt: 0.25 }}>
                    <Info size={16} />
                  </Box>
                  <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
                    Screenshots are stored in your browser only — nothing is uploaded to a server.
                    Use the Download button on each image to save a local copy for durable proof.
                  </Typography>
                </Paper>
              </Box>
            </Grid>

            {/* ── Gallery ── */}
            <Grid size={{ xs: 12, lg: 7 }}>
              <Stack sx={{ flexDirection: "row", alignItems: "center", mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Your vault
                </Typography>
                {entries.length > 0 && (
                  <Typography variant="body2" sx={{ color: "text.secondary", ml: 1 }}>
                    ({entries.length} screenshot{entries.length !== 1 ? "s" : ""})
                  </Typography>
                )}
              </Stack>

              {loading ? (
                <Grid container spacing={2}>
                  {[1, 2, 3, 4].map((i) => (
                    <Grid size={{ xs: 6 }} key={i}>
                      <Skeleton
                        variant="rectangular"
                        sx={{ borderRadius: 2.5, aspectRatio: "16/9" }}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : entries.length === 0 ? (
                <Stack
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    py: 12,
                    px: 4,
                    border: "2px dashed",
                    borderColor: "divider",
                    borderRadius: 4,
                  }}
                >
                  <Box sx={{ color: (t) => alpha(t.palette.text.secondary, 0.3), mb: 2 }}>
                    <ImageIcon size={56} />
                  </Box>
                  <Typography sx={{ fontWeight: 600, color: "text.secondary", mb: 0.5 }}>
                    No screenshots yet
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.disabled", maxWidth: 280 }}>
                    Upload your first screenshot using the panel on the left to start building
                    your proof archive.
                  </Typography>
                </Stack>
              ) : (
                <Grid container spacing={2}>
                  {entries.map((entry) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={entry.tag}>
                      <ScreenshotCard
                        entry={entry}
                        onDelete={(t) => setDeleteTarget(t)}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Why this matters */}
      <Box
        component="section"
        sx={{
          py: 10,
          bgcolor: "background.paper",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg" sx={{ maxWidth: 1000 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, textAlign: "center", mb: 5 }}>
            Why keep your own proof?
          </Typography>
          <Grid container spacing={3}>
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
              <Grid size={{ xs: 12, md: 4 }} key={item.title}>
                <Paper
                  variant="outlined"
                  sx={{ p: 3, borderRadius: 3, bgcolor: "background.default", height: "100%" }}
                >
                  <Typography sx={{ fontWeight: 700, mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
                    {item.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Delete confirm dialog */}
      <Dialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        maxWidth="xs"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 3 } } }}
      >
        <DialogTitle sx={{ fontWeight: 800 }}>Delete screenshot?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will permanently remove the{" "}
            <Box component="strong" sx={{ color: "text.primary" }}>
              "{deleteTarget}"
            </Box>{" "}
            screenshot from your vault. This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            variant="outlined"
            onClick={() => setDeleteTarget(null)}
            data-testid="button-cancel-delete"
            fullWidth
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteTarget && handleDelete(deleteTarget)}
            data-testid="button-confirm-delete"
            fullWidth
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}