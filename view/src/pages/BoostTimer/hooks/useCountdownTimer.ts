import { useCallback, useEffect, useRef, useState } from "react";
import { loadTimer, persistTimer } from "@/pages/BoostTimer/Utils.ts";
import type { TimerState } from "@/pages/BoostTimer/Types.ts";

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

export { useCountdownTimer };