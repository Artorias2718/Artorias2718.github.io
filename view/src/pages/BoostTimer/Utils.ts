import type { TimerState } from "@/pages/BoostTimer/Types.ts";

const formatTime = (seconds: number): string  => {
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

const loadTimer = (
    key: string,
    defaultDuration: number
): { endAt: number | null; remaining: number; state: TimerState } => {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return { endAt: null, remaining: defaultDuration, state: "idle" };
        return JSON.parse(raw);
    } catch {
        return { endAt: null, remaining: defaultDuration, state: "idle" };
    }
}

const persistTimer = (
    key: string,
    endAt: number | null,
    remaining: number,
    state: TimerState
) => {
    localStorage.setItem(key, JSON.stringify({ endAt, remaining, state }));
}

const sendNotification = async (title: string, body: string, tag: string) => {
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

export { formatTime, loadTimer, persistTimer, sendNotification };