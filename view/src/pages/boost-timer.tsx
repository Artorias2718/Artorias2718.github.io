import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Bell, BellOff, Smartphone, Info, Zap, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

function loadTimer(key: string, defaultDuration: number): { endAt: number | null; remaining: number; state: TimerState } {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return { endAt: null, remaining: defaultDuration, state: "idle" };
    return JSON.parse(raw);
  } catch {
    return { endAt: null, remaining: defaultDuration, state: "idle" };
  }
}

function persistTimer(key: string, endAt: number | null, remaining: number, state: TimerState) {
  localStorage.setItem(key, JSON.stringify({ endAt, remaining, state }));
}

async function sendNotification(title: string, body: string, tag: string) {
  if (!("serviceWorker" in navigator)) {
    if (Notification.permission === "granted") new Notification(title, { body, icon: "/favicon.ico", tag });
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
    if (Notification.permission === "granted") new Notification(title, { body, icon: "/favicon.ico", tag });
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

  // Restore from localStorage on mount
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

// ─── TimerCard component ──────────────────────────────────────────────────────

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
}: TimerCardProps) {
  const { toast } = useToast();
  const { state, remaining, start, pause, reset, onExpire } = useCountdownTimer(storageKey, duration);

  onExpire.current = () => {
    if (notifPermission === "granted") sendNotification(notifTitle, notifBody, notifTag);
    toast({ title: toastTitle, description: toastDescription });
  };

  const progress = remaining / duration;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  const ringStroke =
    state === "expired"
      ? "#ef4444"
      : remaining <= Math.min(duration * 0.05, 300)
      ? "#f59e0b"
      : accentColor;

  const statusLabel = {
    idle: "Ready",
    running: label + " active",
    paused: "Paused",
    expired: "Collect now!",
  }[state];

  return (
    <div className="bg-card rounded-3xl border border-border/50 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 pt-6 pb-4 border-b border-border/50">
        <div className="p-2 rounded-xl" style={{ backgroundColor: `${accentColor}20` }}>
          <Icon className="w-5 h-5" style={{ color: accentColor }} />
        </div>
        <div>
          <h2 className="font-serif font-bold text-lg leading-none">{label}</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>
        </div>
      </div>

      <div className="p-6">
        {/* Ring */}
        <div className="flex justify-center mb-6">
          <div className="relative w-48 h-48" data-testid={`${testIdPrefix}-ring`}>
            <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r={RADIUS} fill="none" stroke="hsl(var(--border))" strokeWidth="10" />
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
                style={{ transition: "stroke-dashoffset 0.8s linear, stroke 0.4s ease" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="font-mono font-bold tabular-nums tracking-tight text-foreground"
                style={{ fontSize: duration >= 3600 ? "1.6rem" : "2rem" }}
                data-testid={`${testIdPrefix}-display`}
              >
                {formatTime(remaining)}
              </span>
              <span className="text-xs text-muted-foreground mt-1 uppercase tracking-widest font-medium">
                {statusLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {state === "running" ? (
            <Button
              size="lg"
              variant="outline"
              onClick={pause}
              className="h-11 px-5 gap-2"
              data-testid={`${testIdPrefix}-pause`}
            >
              <Pause className="w-4 h-4" /> Pause
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={start}
              disabled={remaining === 0}
              className="h-11 px-5 gap-2 shadow-md"
              style={state !== "expired" ? { boxShadow: `0 4px 14px ${accentColor}33` } : {}}
              data-testid={`${testIdPrefix}-start`}
            >
              <Play className="w-4 h-4" />
              {state === "idle" ? "Start" : state === "paused" ? "Resume" : "Restart"}
            </Button>
          )}
          <Button
            size="lg"
            variant="ghost"
            onClick={reset}
            className="h-11 px-4"
            data-testid={`${testIdPrefix}-reset`}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* How it works */}
        <div className="space-y-2">
          {howItWorks.map((item) => (
            <div key={item.step} className="flex gap-3 text-sm">
              <span
                className="w-5 h-5 rounded-full text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                style={{ backgroundColor: accentColor }}
              >
                {item.step}
              </span>
              <div>
                <span className="font-semibold text-foreground">{item.title} — </span>
                <span className="text-muted-foreground">{item.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Notification permission banner ───────────────────────────────────────────

function NotificationBanner({
  permission,
  onRequest,
}: {
  permission: NotifPermission;
  onRequest: () => void;
}) {
  return (
    <Card
      className={`border ${
        permission === "granted"
          ? "border-primary/30 bg-primary/5"
          : permission === "denied"
          ? "border-destructive/30 bg-destructive/5"
          : "border-border/50 bg-card"
      }`}
    >
      <CardContent className="p-5 flex items-start gap-4">
        <div
          className={`p-2.5 rounded-xl flex-shrink-0 ${
            permission === "granted"
              ? "bg-primary/10 text-primary"
              : permission === "denied"
              ? "bg-destructive/10 text-destructive"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {permission === "granted" ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
        </div>
        <div className="flex-1 min-w-0">
          {permission === "granted" && (
            <>
              <p className="font-semibold text-sm text-primary mb-0.5">Notifications on</p>
              <p className="text-xs text-muted-foreground">
                Both timers will send you an alert linking to Atlas Earth when they expire.
              </p>
            </>
          )}
          {permission === "denied" && (
            <>
              <p className="font-semibold text-sm text-destructive mb-0.5">Notifications blocked</p>
              <p className="text-xs text-muted-foreground">
                Open your browser's site settings and allow notifications to re-enable alerts.
              </p>
            </>
          )}
          {permission === "default" && (
            <>
              <p className="font-semibold text-sm mb-0.5">Enable notifications for both timers</p>
              <p className="text-xs text-muted-foreground mb-3">
                Get push alerts that open Atlas Earth when your boost or daily reward expires — even with this tab in the background.
              </p>
              <Button size="sm" onClick={onRequest} className="gap-2" data-testid="button-enable-notifications">
                <Bell className="w-4 h-4" /> Enable Notifications
              </Button>
            </>
          )}
          {permission === "unsupported" && (
            <>
              <p className="font-semibold text-sm mb-0.5">Notifications not supported</p>
              <p className="text-xs text-muted-foreground">
                Your browser does not support web notifications. Both timers will still count down while this tab is open.
              </p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BoostTimer() {
  const { toast } = useToast();
  const [notifPermission, setNotifPermission] = useState<NotifPermission>("unsupported");

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
      try { await navigator.serviceWorker.register("/sw.js"); } catch { /* best-effort */ }
    }
    const permission = await Notification.requestPermission();
    setNotifPermission(permission as NotifPermission);
    if (permission === "granted") {
      toast({ title: "Notifications enabled", description: "You'll be alerted when either timer expires." });
    } else if (permission === "denied") {
      toast({ title: "Notifications blocked", description: "Enable notifications in your browser site settings." });
    }
  };

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-background pt-16 pb-12 border-b border-border/50">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Bell className="w-4 h-4" />
            <span>Never miss a reward</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 tracking-tight">
            Game Reminders
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Two timers, one page. Track your ad boost and your daily login reward — with push notifications that open Atlas Earth the moment either one is ready.
          </p>
        </div>
      </section>

      {/* Timers */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Notification banner — shared for both timers */}
          <div className="mb-10">
            <NotificationBanner permission={notifPermission} onRequest={handleRequestNotifications} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <TimerCard
              label="Boost Timer"
              sublabel="20 minutes · Ad rent multiplier"
              icon={Zap}
              accentColor="hsl(var(--primary))"
              storageKey="atlasearth-boost-timer"
              duration={BOOST_DURATION}
              notifPermission={notifPermission}
              notifTitle="Boost expired — time to watch an ad!"
              notifBody="Open Atlas Earth and watch a short ad to reactivate your rent multiplier."
              notifTag="boost-expired"
              toastTitle="Boost expired!"
              toastDescription="Watch another ad in Atlas Earth to keep your boost going."
              testIdPrefix="boost"
              howItWorks={[
                { step: "1", title: "Watch an ad", description: "Tap the boost button in Atlas Earth and watch a short ad." },
                { step: "2", title: "Start this timer", description: "Come back here and hit Start — it counts down 20 minutes." },
                { step: "3", title: "Get notified", description: "Tap the alert to open Atlas Earth and watch another ad." },
              ]}
            />

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
              howItWorks={[
                { step: "1", title: "Collect your reward", description: "Open Atlas Earth and tap the daily login reward to claim it." },
                { step: "2", title: "Start this timer", description: "Come back and hit Start — it counts down 24 hours." },
                { step: "3", title: "Get notified", description: "You'll get an alert when the next reward is ready to collect." },
              ]}
            />
          </div>

          {/* Notes */}
          <div className="mt-8 space-y-3">
            <div className="p-5 bg-card rounded-2xl border border-border/50 flex gap-3">
              <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Timers persist across page reloads.</strong> If you navigate away and come back, each timer picks up where it left off as long as your browser session is active.
              </p>
            </div>
            <div className="p-5 bg-amber-50/50 rounded-2xl border border-amber-200 dark:bg-amber-900/10 dark:border-amber-900/40 flex gap-3">
              <Smartphone className="w-5 h-5 text-amber-700 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-700 dark:text-amber-500 leading-relaxed">
                <strong className="text-amber-800 dark:text-amber-300">On iPhone?</strong> iOS requires this site to be added to your Home Screen before notifications work. In Safari, tap the Share icon → "Add to Home Screen" → reopen from your home screen → enable notifications.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
