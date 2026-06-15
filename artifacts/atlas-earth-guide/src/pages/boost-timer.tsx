import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Bell, BellOff, Smartphone, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BOOST_DURATION = 20 * 60;
const STORAGE_KEY = "atlasearth-boost-timer";
const RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

type TimerState = "idle" | "running" | "paused" | "expired";
type NotifPermission = "default" | "granted" | "denied" | "unsupported";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function getStoredTimer(): { endAt: number | null; remaining: number; state: TimerState } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { endAt: null, remaining: BOOST_DURATION, state: "idle" };
    return JSON.parse(raw);
  } catch {
    return { endAt: null, remaining: BOOST_DURATION, state: "idle" };
  }
}

function saveTimer(endAt: number | null, remaining: number, state: TimerState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ endAt, remaining, state }));
}

async function requestSWNotification(title: string, body: string, tag: string) {
  if (!("serviceWorker" in navigator)) {
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
    if (Notification.permission === "granted") {
      new Notification(title, { body, icon: "/favicon.ico", tag });
    }
  }
}

export default function BoostTimer() {
  const { toast } = useToast();

  const [timerState, setTimerState] = useState<TimerState>("idle");
  const [remaining, setRemaining] = useState(BOOST_DURATION);
  const [notifPermission, setNotifPermission] = useState<NotifPermission>("unsupported");
  const endAtRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const fireExpiredNotification = useCallback(() => {
    if (notifPermission === "granted") {
      requestSWNotification(
        "Boost expired — time to watch an ad!",
        "Open Atlas Earth and watch an ad to reactivate your 2× rent boost.",
        "boost-expired"
      );
    }
    toast({
      title: "Boost expired!",
      description: "Time to watch another ad in Atlas Earth to keep your boost active.",
    });
  }, [notifPermission, toast]);

  const tick = useCallback(() => {
    if (endAtRef.current === null) return;
    const now = Date.now();
    const diff = Math.max(0, Math.round((endAtRef.current - now) / 1000));
    setRemaining(diff);
    saveTimer(endAtRef.current, diff, "running");

    if (diff <= 0) {
      stopInterval();
      endAtRef.current = null;
      setTimerState("expired");
      saveTimer(null, 0, "expired");
      fireExpiredNotification();
    }
  }, [stopInterval, fireExpiredNotification]);

  useEffect(() => {
    if (!("Notification" in window)) {
      setNotifPermission("unsupported");
    } else {
      setNotifPermission(Notification.permission as NotifPermission);
    }

    const stored = getStoredTimer();
    if (stored.state === "running" && stored.endAt !== null) {
      const now = Date.now();
      const diff = Math.max(0, Math.round((stored.endAt - now) / 1000));
      if (diff > 0) {
        endAtRef.current = stored.endAt;
        setRemaining(diff);
        setTimerState("running");
      } else {
        setRemaining(0);
        setTimerState("expired");
        saveTimer(null, 0, "expired");
      }
    } else {
      setRemaining(stored.remaining);
      setTimerState(stored.state);
    }
  }, []);

  useEffect(() => {
    if (timerState === "running") {
      tick();
      intervalRef.current = setInterval(tick, 1000);
    }
    return () => stopInterval();
  }, [timerState, tick, stopInterval]);

  const handleStart = () => {
    const endAt = Date.now() + remaining * 1000;
    endAtRef.current = endAt;
    saveTimer(endAt, remaining, "running");
    setTimerState("running");
  };

  const handlePause = () => {
    stopInterval();
    endAtRef.current = null;
    saveTimer(null, remaining, "paused");
    setTimerState("paused");
  };

  const handleReset = () => {
    stopInterval();
    endAtRef.current = null;
    saveTimer(null, BOOST_DURATION, "idle");
    setRemaining(BOOST_DURATION);
    setTimerState("idle");
  };

  const handleRequestNotifications = async () => {
    if (!("Notification" in window)) return;

    if ("serviceWorker" in navigator) {
      try {
        await navigator.serviceWorker.register("/sw.js");
      } catch {
        // SW registration failed, fall through to basic Notification
      }
    }

    const permission = await Notification.requestPermission();
    setNotifPermission(permission as NotifPermission);

    if (permission === "granted") {
      toast({
        title: "Notifications enabled",
        description: "You will get an alert when your boost expires.",
      });
    } else if (permission === "denied") {
      toast({
        title: "Notifications blocked",
        description: "Enable notifications for this site in your browser settings.",
      });
    }
  };

  const progress = remaining / BOOST_DURATION;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  const ringColor =
    timerState === "expired"
      ? "#ef4444"
      : remaining <= 60
      ? "#f59e0b"
      : remaining <= 300
      ? "#f59e0b"
      : "hsl(var(--primary))";

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-background pt-16 pb-12 border-b border-border/50">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Bell className="w-4 h-4" />
            <span>Never miss a free Atlas Bucks collection</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 tracking-tight">
            Boost Timer
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Watch an ad in Atlas Earth, then start this timer. You'll get a notification the moment your 20-minute boost expires — so you never waste a second without multiplied rent.
          </p>
        </div>
      </section>

      {/* Timer */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-lg">
          {/* Ring */}
          <div className="flex justify-center mb-8">
            <div className="relative w-56 h-56" data-testid="timer-ring">
              <svg
                className="w-full h-full -rotate-90"
                viewBox="0 0 200 200"
                aria-label={`Timer: ${formatTime(remaining)} remaining`}
              >
                <circle
                  cx="100"
                  cy="100"
                  r={RADIUS}
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="10"
                />
                <circle
                  cx="100"
                  cy="100"
                  r={RADIUS}
                  fill="none"
                  stroke={ringColor}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={dashOffset}
                  style={{ transition: "stroke-dashoffset 0.8s linear, stroke 0.4s ease" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className="text-4xl font-mono font-bold tabular-nums tracking-tight text-foreground"
                  data-testid="timer-display"
                >
                  {formatTime(remaining)}
                </span>
                <span className="text-xs text-muted-foreground mt-1 uppercase tracking-widest font-medium">
                  {timerState === "idle" && "Ready"}
                  {timerState === "running" && "Boost active"}
                  {timerState === "paused" && "Paused"}
                  {timerState === "expired" && "Boost expired!"}
                </span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 mb-10">
            {timerState === "running" ? (
              <Button
                size="lg"
                variant="outline"
                onClick={handlePause}
                className="h-12 px-6 gap-2"
                data-testid="button-pause"
              >
                <Pause className="w-5 h-5" /> Pause
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={handleStart}
                disabled={remaining === 0}
                className="h-12 px-6 gap-2 shadow-md shadow-primary/20"
                data-testid="button-start"
              >
                <Play className="w-5 h-5" />
                {timerState === "idle" ? "Start Timer" : timerState === "paused" ? "Resume" : "Restart"}
              </Button>
            )}
            <Button
              size="lg"
              variant="ghost"
              onClick={handleReset}
              className="h-12 px-4"
              data-testid="button-reset"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
          </div>

          {/* Notification permission */}
          <Card
            className={`border mb-8 ${
              notifPermission === "granted"
                ? "border-primary/30 bg-primary/5"
                : notifPermission === "denied"
                ? "border-destructive/30 bg-destructive/5"
                : "border-border/50 bg-card"
            }`}
          >
            <CardContent className="p-5 flex items-start gap-4">
              <div
                className={`p-2.5 rounded-xl flex-shrink-0 ${
                  notifPermission === "granted"
                    ? "bg-primary/10 text-primary"
                    : notifPermission === "denied"
                    ? "bg-destructive/10 text-destructive"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {notifPermission === "granted" ? (
                  <Bell className="w-5 h-5" />
                ) : (
                  <BellOff className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                {notifPermission === "granted" && (
                  <>
                    <p className="font-semibold text-sm text-primary mb-0.5">Notifications on</p>
                    <p className="text-xs text-muted-foreground">
                      You'll get an alert with a link to Atlas Earth when your boost expires.
                    </p>
                  </>
                )}
                {notifPermission === "denied" && (
                  <>
                    <p className="font-semibold text-sm text-destructive mb-0.5">Notifications blocked</p>
                    <p className="text-xs text-muted-foreground">
                      To enable, open your browser's site settings and allow notifications for this page.
                    </p>
                  </>
                )}
                {notifPermission === "default" && (
                  <>
                    <p className="font-semibold text-sm mb-0.5">Enable notifications</p>
                    <p className="text-xs text-muted-foreground mb-3">
                      Get an alert that opens Atlas Earth when your boost expires, even if this tab is in the background.
                    </p>
                    <Button
                      size="sm"
                      onClick={handleRequestNotifications}
                      className="gap-2"
                      data-testid="button-enable-notifications"
                    >
                      <Bell className="w-4 h-4" /> Enable Notifications
                    </Button>
                  </>
                )}
                {notifPermission === "unsupported" && (
                  <>
                    <p className="font-semibold text-sm mb-0.5">Notifications not supported</p>
                    <p className="text-xs text-muted-foreground">
                      Your browser does not support web notifications. The timer will still count down while this tab is open.
                    </p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* iOS tip */}
          <Card className="border border-amber-200 bg-amber-50/50 dark:border-amber-900/40 dark:bg-amber-900/10">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700 flex-shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm text-amber-800 dark:text-amber-400 mb-0.5">On iPhone?</p>
                <p className="text-xs text-amber-700 dark:text-amber-500 leading-relaxed">
                  iOS requires the site to be added to your Home Screen before notifications work. Tap the Share icon in Safari, then "Add to Home Screen", then reopen the site from your home screen and enable notifications.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-card border-t border-border/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-serif font-bold mb-8 text-center">How the boost works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Watch an ad in Atlas Earth",
                description:
                  "In the app, tap the boost button and watch a short ad. This activates a rent multiplier on all of your parcels for the next 20 minutes.",
              },
              {
                step: "2",
                title: "Start this timer",
                description:
                  "Come back here and hit Start. The 20-minute countdown begins. Allow notifications so you don't have to keep the app open.",
              },
              {
                step: "3",
                title: "Get notified, watch again",
                description:
                  "When the timer hits zero, you'll receive a push notification. Tap it to go straight to Atlas Earth and watch another ad to keep the boost going.",
              },
            ].map((item) => (
              <div key={item.step} className="bg-background rounded-2xl p-6 border border-border/50">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 bg-background rounded-2xl border border-border/50 flex gap-3">
            <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Timer persists across page reloads.</strong> If you close this tab and reopen the site, the timer will pick up where it left off as long as your browser session is active. Notifications require the tab to still be open (or the site added to your iPhone Home Screen).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
