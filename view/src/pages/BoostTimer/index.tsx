import { useState, useEffect, useRef, useCallback } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Snackbar,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import {
  Play,
  Pause,
  RotateCcw,
  Bell,
  BellOff,
  Smartphone,
  Info,
  Zap,
  Gift,
} from "lucide-react";

// ─── constants ────────────────────────────────────────────────────────────────

const BOOST_DURATION = 20 * 60;
const DAILY_DURATION = 24 * 60 * 60;
const RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// ─── types ────────────────────────────────────────────────────────────────────

type TimerState = "idle" | "running" | "paused" | "expired";
type NotifPermission = "default" | "granted" | "denied" | "unsupported";

// ─── helpers ──────────────────────────────────────────────────────────────────

function formatTime(seconds: number): string {
  if (seconds >= 3600) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function loadTimer(
  key: string,
  defaultDuration: number
): { endAt: number | null; remaining: number; state: TimerState } {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return { endAt: null, remaining: defaultDuration, state: "idle" };
    return JSON.parse(raw);
  } catch {
    return { endAt: null, remaining: defaultDuration, state: "idle" };
  }
}

function persistTimer(
  key: string,
  endAt: number | null,
  remaining: number,
  state: TimerState
) {
  localStorage.setItem(key, JSON.stringify({ endAt, remaining, state }));
}

async function sendNotification(title: string, body: string, tag: string) {
  if (!("serviceWorker" in navigator)) {
    if (Notification.permission === "granted")
      new Notification(title, { body, icon: "/favicon.ico", tag });
    return;
  }
  try {
    const reg = await navigator.serviceWorker.ready;
    reg.showNotification(title, {
      body,
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      tag,
      requireInteraction: true,
      actions: [
        { action: "ios", title: "Open on iPhone" },
        { action: "android", title: "Open on Android" },
      ],
      data: { url: "https://www.atlasearth.com" },
    } as NotificationOptions);
  } catch {
    if (Notification.permission === "granted")
      new Notification(title, { body, icon: "/favicon.ico", tag });
  }
}

// ─── hook ─────────────────────────────────────────────────────────────────────

function useCountdownTimer(storageKey: string, duration: number) {
  const [state, setState] = useState<TimerState>("idle");
  const [remaining, setRemaining] = useState(duration);
  const endAtRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTick = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    const stored = loadTimer(storageKey, duration);
    if (stored.state === "running" && stored.endAt !== null) {
      const diff = Math.max(0, Math.round((stored.endAt - Date.now()) / 1000));
      if (diff > 0) {
        endAtRef.current = stored.endAt;
        setRemaining(diff);
        setState("running");
      } else {
        setRemaining(0);
        setState("expired");
        persistTimer(storageKey, null, 0, "expired");
      }
    } else {
      setRemaining(stored.remaining);
      setState(stored.state);
    }
    // eslint-disable-next-line react-api/exhaustive-deps
  }, []);

  const onExpire = useRef<(() => void) | null>(null);

  const tick = useCallback(() => {
    if (endAtRef.current === null) return;
    const diff = Math.max(0, Math.round((endAtRef.current - Date.now()) / 1000));
    setRemaining(diff);
    persistTimer(storageKey, endAtRef.current, diff, "running");
    if (diff <= 0) {
      clearTick();
      endAtRef.current = null;
      setState("expired");
      persistTimer(storageKey, null, 0, "expired");
      onExpire.current?.();
    }
  }, [storageKey, clearTick]);

  useEffect(() => {
    if (state === "running") {
      tick();
      intervalRef.current = setInterval(tick, 1000);
    }
    return clearTick;
  }, [state, tick, clearTick]);

  const start = useCallback(() => {
    const endAt = Date.now() + remaining * 1000;
    endAtRef.current = endAt;
    persistTimer(storageKey, endAt, remaining, "running");
    setState("running");
  }, [storageKey, remaining]);

  const pause = useCallback(() => {
    clearTick();
    endAtRef.current = null;
    persistTimer(storageKey, null, remaining, "paused");
    setState("paused");
  }, [storageKey, remaining, clearTick]);

  const reset = useCallback(() => {
    clearTick();
    endAtRef.current = null;
    persistTimer(storageKey, null, duration, "idle");
    setRemaining(duration);
    setState("idle");
  }, [storageKey, duration, clearTick]);

  return { state, remaining, start, pause, reset, onExpire };
}

// ─── TimerCard ────────────────────────────────────────────────────────────────

interface TimerCardProps {
  label: string;
  sublabel: string;
  icon: React.ElementType;
  accentColor: string;
  storageKey: string;
  duration: number;
  notifPermission: NotifPermission;
  notifTitle: string;
  notifBody: string;
  notifTag: string;
  toastTitle: string;
  toastDescription: string;
  howItWorks: { step: string; title: string; description: string }[];
  testIdPrefix: string;
  onToast: (title: string, description: string) => void;
}

function TimerCard({
  label,
  sublabel,
  icon: Icon,
  accentColor,
  storageKey,
  duration,
  notifPermission,
  notifTitle,
  notifBody,
  notifTag,
  toastTitle,
  toastDescription,
  howItWorks,
  testIdPrefix,
  onToast,
}: TimerCardProps) {
  const theme = useTheme();
  const { state, remaining, start, pause, reset, onExpire } = useCountdownTimer(
    storageKey,
    duration
  );

  onExpire.current = () => {
    if (notifPermission === "granted")
      sendNotification(notifTitle, notifBody, notifTag);
    onToast(toastTitle, toastDescription);
  };

  const progress = remaining / duration;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  const ringStroke =
    state === "expired"
      ? theme.palette.error.main
      : remaining <= Math.min(duration * 0.05, 300)
      ? theme.palette.warning.main
      : accentColor;

  const statusLabel = {
    idle: "Ready",
    running: label + " active",
    paused: "Paused",
    expired: "Collect now!",
  }[state];

  const startLabel =
    state === "idle" ? "Start" : state === "paused" ? "Resume" : "Restart";

  return (
    <Paper
      variant="outlined"
      sx={{ borderRadius: 4, overflow: "hidden", bgcolor: "background.paper" }}
    >
      {/* Header */}
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: 1.5,
          px: 3,
          pt: 3,
          pb: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            p: 1,
            borderRadius: 2.5,
            bgcolor: alpha(accentColor, 0.12),
            color: accentColor,
            display: "flex",
          }}
        >
          <Icon size={20} />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: "1.05rem", lineHeight: 1.1 }}>
            {label}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", display: "block", mt: 0.25 }}
          >
            {sublabel}
          </Typography>
        </Box>
      </Stack>

      <Box sx={{ p: 3 }}>
        {/* Ring */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Box
            sx={{ position: "relative", width: 192, height: 192 }}
            data-testid={`${testIdPrefix}-ring`}
          >
            <Box
              component="svg"
              sx={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}
              viewBox="0 0 200 200"
            >
              {/* Track */}
              <circle
                cx="100"
                cy="100"
                r={RADIUS}
                fill="none"
                stroke={theme.palette.divider}
                strokeWidth="10"
              />
              {/* Progress */}
              <circle
                cx="100"
                cy="100"
                r={RADIUS}
                fill="none"
                stroke={ringStroke}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                style={{
                  transition: "stroke-dashoffset 0.8s linear, stroke 0.4s ease",
                }}
              />
            </Box>

            {/* Center label */}
            <Stack
              sx={{
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                inset: 0,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  fontSize: duration >= 3600 ? "1.6rem" : "2rem",
                  lineHeight: 1,
                }}
                data-testid={`${testIdPrefix}-display`}
              >
                {formatTime(remaining)}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontWeight: 600,
                  mt: 0.5,
                }}
              >
                {statusLabel}
              </Typography>
            </Stack>
          </Box>
        </Box>

        {/* Controls */}
        <Stack sx={{ flexDirection: "row", justifyContent: "center", gap: 1.5, mb: 3 }}>
          {state === "running" ? (
            <Button
              variant="outlined"
              size="large"
              onClick={pause}
              startIcon={<Pause size={16} />}
              data-testid={`${testIdPrefix}-pause`}
              sx={{ height: 44, px: 3 }}
            >
              Pause
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              onClick={start}
              disabled={remaining === 0}
              startIcon={<Play size={16} />}
              data-testid={`${testIdPrefix}-start`}
              sx={{
                height: 44,
                px: 3,
                ...(state !== "expired" && {
                  boxShadow: `0 4px 14px ${alpha(accentColor, 0.35)}`,
                  bgcolor: accentColor,
                  "&:hover": { bgcolor: alpha(accentColor, 0.85) },
                }),
              }}
            >
              {startLabel}
            </Button>
          )}
          <Button
            variant="text"
            size="large"
            onClick={reset}
            data-testid={`${testIdPrefix}-reset`}
            sx={{ height: 44, minWidth: 44, px: 1.5, color: "text.secondary" }}
          >
            <RotateCcw size={18} />
          </Button>
        </Stack>

        {/* How it works */}
        <Stack spacing={1.25}>
          {howItWorks.map((item) => (
            <Stack key={item.step} sx={{ flexDirection: "row", gap: 1.5, alignItems: "flex-start" }}>
              <Box
                sx={{
                  flexShrink: 0,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  bgcolor: accentColor,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  mt: 0.25,
                }}
              >
                {item.step}
              </Box>
              <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                <Box component="span" sx={{ fontWeight: 700, color: "text.primary" }}>
                  {item.title}
                </Box>{" "}
                <Box component="span" sx={{ color: "text.secondary" }}>
                  — {item.description}
                </Box>
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Paper>
  );
}

// ─── Notification banner ──────────────────────────────────────────────────────

function NotificationBanner({
  permission,
  onRequest,
}: {
  permission: NotifPermission;
  onRequest: () => void;
}) {
  const granted = permission === "granted";
  const denied = permission === "denied";

  const borderColor = granted
    ? "primary.main"
    : denied
    ? "error.main"
    : "divider";

  const bgColor = granted
    ? (theme: any) => alpha(theme.palette.primary.main, 0.05)
    : denied
    ? (theme: any) => alpha(theme.palette.error.main, 0.05)
    : "background.paper";

  const iconBg = granted
    ? (theme: any) => alpha(theme.palette.primary.main, 0.1)
    : denied
    ? (theme: any) => alpha(theme.palette.error.main, 0.1)
    : "action.hover";

  const iconColor = granted ? "primary.main" : denied ? "error.main" : "text.secondary";

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor,
        bgcolor: bgColor,
      }}
    >
      <CardContent
        sx={{ p: 2.5, display: "flex", gap: 2, alignItems: "flex-start", "&:last-child": { pb: 2.5 } }}
      >
        <Box
          sx={{
            flexShrink: 0,
            p: 1.25,
            borderRadius: 2.5,
            bgcolor: iconBg,
            color: iconColor,
            display: "flex",
          }}
        >
          {granted ? <Bell size={20} /> : <BellOff size={20} />}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          {granted && (
            <>
              <Typography variant="body2" sx={{ fontWeight: 700, color: "primary.main", mb: 0.25 }}>
                Notifications on
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Both timers will send you an alert linking to Atlas Earth when they expire.
              </Typography>
            </>
          )}
          {denied && (
            <>
              <Typography variant="body2" sx={{ fontWeight: 700, color: "error.main", mb: 0.25 }}>
                Notifications blocked
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Open your browser's site settings and allow notifications to re-enable alerts.
              </Typography>
            </>
          )}
          {permission === "default" && (
            <>
              <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.25 }}>
                Enable notifications for both timers
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", display: "block", mb: 1.5 }}
              >
                Get push alerts that open Atlas Earth when your boost or daily reward expires
                — even with this tab in the background.
              </Typography>
              <Button
                size="small"
                variant="contained"
                startIcon={<Bell size={14} />}
                onClick={onRequest}
                data-testid="button-enable-notifications"
              >
                Enable Notifications
              </Button>
            </>
          )}
          {permission === "unsupported" && (
            <>
              <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.25 }}>
                Notifications not supported
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Your browser does not support web notifications. Both timers will still count
                down while this tab is open.
              </Typography>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BoostTimer() {
  const theme = useTheme();
  const [notifPermission, setNotifPermission] = useState<NotifPermission>("unsupported");
  const [snackbar, setSnackbar] = useState<{ open: boolean; title: string; body: string }>({
    open: false,
    title: "",
    body: "",
  });

  const showToast = useCallback((title: string, description: string) => {
    setSnackbar({ open: true, title, body: description });
  }, []);

  const closeSnackbar = () => setSnackbar((s) => ({ ...s, open: false }));

  useEffect(() => {
    if (!("Notification" in window)) {
      setNotifPermission("unsupported");
    } else {
      setNotifPermission(Notification.permission as NotifPermission);
    }
  }, []);

  const handleRequestNotifications = async () => {
    if (!("Notification" in window)) return;
    if ("serviceWorker" in navigator) {
      try {
        await navigator.serviceWorker.register("/sw.js");
      } catch {
        /* best-effort */
      }
    }
    const permission = await Notification.requestPermission();
    setNotifPermission(permission as NotifPermission);
    if (permission === "granted") {
      showToast("Notifications enabled", "You'll be alerted when either timer expires.");
    } else if (permission === "denied") {
      showToast(
        "Notifications blocked",
        "Enable notifications in your browser site settings."
      );
    }
  };

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
            <Bell size={16} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Never miss a reward
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
            Game Reminders
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              lineHeight: 1.8,
              fontSize: "1.1rem",
              maxWidth: 520,
              mx: "auto",
            }}
          >
            Two timers, one page. Track your ad boost and your daily login reward — with push
            notifications that open Atlas Earth the moment either one is ready.
          </Typography>
        </Container>
      </Box>

      {/* Timers */}
      <Box component="section" sx={{ py: 10, bgcolor: "background.default" }}>
        <Container maxWidth="lg" sx={{ maxWidth: 900 }}>
          {/* Notification banner */}
          <Box sx={{ mb: 5 }}>
            <NotificationBanner
              permission={notifPermission}
              onRequest={handleRequestNotifications}
            />
          </Box>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TimerCard
                label="Boost Timer"
                sublabel="20 minutes · Ad rent multiplier"
                icon={Zap}
                accentColor={theme.palette.primary.main}
                storageKey="atlasearth-boost-timer"
                duration={BOOST_DURATION}
                notifPermission={notifPermission}
                notifTitle="Boost expired — time to watch an ad!"
                notifBody="Open Atlas Earth and watch a short ad to reactivate your rent multiplier."
                notifTag="boost-expired"
                toastTitle="Boost expired!"
                toastDescription="Watch another ad in Atlas Earth to keep your boost going."
                testIdPrefix="boost"
                onToast={showToast}
                howItWorks={[
                  { step: "1", title: "Watch an ad", description: "Tap the boost button in Atlas Earth and watch a short ad." },
                  { step: "2", title: "Start this timer", description: "Come back here and hit Start — it counts down 20 minutes." },
                  { step: "3", title: "Get notified", description: "Tap the alert to open Atlas Earth and watch another ad." },
                ]}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TimerCard
                label="Daily Reward"
                sublabel="24 hours · Login reward reset"
                icon={Gift}
                accentColor="#8b5cf6"
                storageKey="atlasearth-daily-timer"
                duration={DAILY_DURATION}
                notifPermission={notifPermission}
                notifTitle="Daily login reward is ready!"
                notifBody="Open Atlas Earth to collect today's login reward before it resets."
                notifTag="daily-reward"
                toastTitle="Daily reward ready!"
                toastDescription="Open Atlas Earth and collect your daily login reward."
                testIdPrefix="daily"
                onToast={showToast}
                howItWorks={[
                  { step: "1", title: "Collect your reward", description: "Open Atlas Earth and tap the daily login reward to claim it." },
                  { step: "2", title: "Start this timer", description: "Come back and hit Start — it counts down 24 hours." },
                  { step: "3", title: "Get notified", description: "You'll get an alert when the next reward is ready to collect." },
                ]}
              />
            </Grid>
          </Grid>

          {/* Notes */}
          <Stack spacing={1.5} sx={{ mt: 4 }}>
            <Paper
              variant="outlined"
              sx={{ p: 2.5, borderRadius: 3, display: "flex", gap: 1.5, alignItems: "flex-start" }}
            >
              <Box sx={{ color: "text.secondary", flexShrink: 0, mt: 0.25 }}>
                <Info size={20} />
              </Box>
              <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
                <Box component="strong" sx={{ color: "text.primary" }}>
                  Timers persist across page reloads.
                </Box>{" "}
                If you navigate away and come back, each timer picks up where it left off as
                long as your browser session is active.
              </Typography>
            </Paper>

            <Paper
              variant="outlined"
              sx={{
                p: 2.5,
                borderRadius: 3,
                display: "flex",
                gap: 1.5,
                alignItems: "flex-start",
                bgcolor: (t) => alpha(t.palette.warning.main, 0.06),
                borderColor: (t) => alpha(t.palette.warning.main, 0.35),
              }}
            >
              <Box
                sx={{
                  color: "warning.dark",
                  flexShrink: 0,
                  mt: 0.25,
                }}
              >
                <Smartphone size={20} />
              </Box>
              <Typography variant="body2" sx={{ color: "warning.dark", lineHeight: 1.7 }}>
                <Box component="strong">On iPhone?</Box> iOS requires this site to be added to
                your Home Screen before notifications work. In Safari, tap the Share icon →
                "Add to Home Screen" → reopen from your home screen → enable notifications.
              </Typography>
            </Paper>
          </Stack>
        </Container>
      </Box>

      {/* Toast snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={closeSnackbar} severity="info" variant="filled" sx={{ width: "100%" }}>
          <Box component="strong" sx={{ display: "block" }}>
            {snackbar.title}
          </Box>
          {snackbar.body}
        </Alert>
      </Snackbar>
    </Box>
  );
}