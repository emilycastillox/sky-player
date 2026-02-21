"use client"

import { useState, useRef, useCallback, useEffect } from "react"

type TimerStatus = "idle" | "running" | "paused" | "complete"

export function useTimer(durationSec: number) {
  const [remaining, setRemaining] = useState(durationSec)
  const [status, setStatus] = useState<TimerStatus>("idle")
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearTick = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    if (status === "complete") return
    setStatus("running")
    clearTick()
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearTick()
          setStatus("complete")
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [status, clearTick])

  const pause = useCallback(() => {
    setStatus("paused")
    clearTick()
  }, [clearTick])

  const reset = useCallback(() => {
    clearTick()
    setRemaining(durationSec)
    setStatus("idle")
  }, [durationSec, clearTick])

  // Reset when duration changes (mode switch)
  useEffect(() => {
    clearTick()
    setRemaining(durationSec)
    setStatus("idle")
  }, [durationSec, clearTick])

  // Cleanup on unmount
  useEffect(() => {
    return clearTick
  }, [clearTick])

  return { remaining, status, start, pause, reset }
}
