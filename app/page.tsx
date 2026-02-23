"use client"

import { useState, useCallback, useMemo, useRef, useEffect } from "react"
import Link from "next/link"
import { Settings, BarChart3 } from "lucide-react"
import { TitleBar } from "@/components/title-bar"
import { ModeSelector } from "@/components/mode-selector"
import { EqualizerVisualizer } from "@/components/equalizer-visualizer"
import { TimerDisplay } from "@/components/timer-display"
import { SessionLogPanel } from "@/components/session-log-panel"
import { TransportBar } from "@/components/transport-bar"
import { MediaPanel } from "@/components/media-panel"
import { useTimer } from "@/hooks/use-timer"
import { useSettings } from "@/components/settings-provider"
import { useSessions } from "@/hooks/use-sessions"

export default function PlayerPage() {
  const settings = useSettings()
  const { sessions, addSession, todayFocusMinutes, focusSessionsCompletedToday } = useSessions()
  const [mode, setMode] = useState<"focus" | "break">("focus")
  const totalSessions = settings.sessionsBeforeLongBreak
  const currentSession = totalSessions > 0 ? (focusSessionsCompletedToday % totalSessions) + 1 : 1
  const isLongBreak =
    mode === "break" &&
    totalSessions > 0 &&
    currentSession > 0 &&
    currentSession % settings.sessionsBeforeLongBreak === 0

  const durationSec = useMemo(() => {
    if (mode === "focus") return settings.focusDurationMinutes * 60
    return (isLongBreak ? settings.longBreakMinutes : settings.shortBreakMinutes) * 60
  }, [mode, isLongBreak, settings.focusDurationMinutes, settings.shortBreakMinutes, settings.longBreakMinutes])

  const autoStartBreakRef = useRef(false)

  const handleComplete = useCallback(() => {
    addSession({
      type: mode,
      durationMs: durationSec * 1000,
      completedAt: new Date().toISOString(),
      wasCompleted: true,
    })
    if (mode === "focus" && settings.autoStartBreaks) {
      autoStartBreakRef.current = true
      setMode("break")
    }
  }, [addSession, mode, durationSec, settings.autoStartBreaks])

  const timer = useTimer(durationSec, handleComplete)

  useEffect(() => {
    if (mode === "break" && autoStartBreakRef.current) {
      autoStartBreakRef.current = false
      timer.start()
    }
  }, [mode, timer])

  const handleSkip = useCallback(() => {
    if (timer.status === "running" || timer.status === "paused") {
      const elapsedMs = (durationSec - timer.remaining) * 1000
      if (elapsedMs > 0) {
        addSession({
          type: mode,
          durationMs: elapsedMs,
          completedAt: new Date().toISOString(),
          wasCompleted: false,
        })
      }
    }
    timer.reset()
  }, [timer, mode, durationSec])

  const spotifyUrl = settings.spotifyUrl || null
  const youtubeUrl = settings.youtubeUrl || null
  const setSpotifyUrl = useCallback(
    (url: string) => settings.updateSettings({ spotifyUrl: url }),
    [settings]
  )
  const setYoutubeUrl = useCallback(
    (url: string) => settings.updateSettings({ youtubeUrl: url }),
    [settings]
  )

  const handleModeChange = useCallback((newMode: "focus" | "break") => {
    setMode(newMode)
    timer.reset()
  }, [timer])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
  }

  const sessionLabel = `${mode.toUpperCase()} SESSION ${currentSession} / ${totalSessions}`

  return (
    <main className="relative min-h-screen flex flex-col items-center p-4 lg:p-8">
      <div className="w-full max-w-[1280px] flex flex-col gap-0">
        {/* Title Bar */}
        <div className="relative">
          <TitleBar title="SKY PLAYER v1.0" />
          <div className="absolute right-20 top-1/2 -translate-y-1/2 flex gap-2">
            <Link href="/stats" className="chrome-btn flex items-center justify-center w-8 h-8 rounded-xl" aria-label="Stats">
              <BarChart3 className="w-4 h-4" />
            </Link>
            <Link href="/settings" className="chrome-btn flex items-center justify-center w-8 h-8 rounded-xl" aria-label="Settings">
              <Settings className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Main 3-Column Layout */}
        <div className="flex gap-4 mt-3" style={{ minHeight: 420 }}>
          {/* Left Panel */}
          <div className="w-[210px] shrink-0">
            <ModeSelector
              mode={mode}
              onModeChange={handleModeChange}
              todayFocusMinutes={todayFocusMinutes}
              currentSession={currentSession}
              totalSessions={totalSessions}
            />
          </div>

          {/* Center */}
          <div className="flex-1 flex flex-col gap-3">
            <EqualizerVisualizer isActive={timer.status === "running"} mode={mode} />
            <div className="flex-1">
              <TimerDisplay
                timeRemaining={formatTime(timer.remaining)}
                totalSeconds={durationSec}
                elapsedSeconds={durationSec - timer.remaining}
                mode={mode}
                status={timer.status}
              />
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-[230px] shrink-0">
            <SessionLogPanel
            sessions={[...sessions].reverse()}
            todayFocusMinutes={todayFocusMinutes}
          />
          </div>
        </div>

        {/* Transport Bar */}
        <div className="mt-3">
          <TransportBar
            timeRemaining={formatTime(timer.remaining)}
            totalDuration={durationSec}
            elapsed={durationSec - timer.remaining}
            isPlaying={timer.status === "running"}
            sessionLabel={sessionLabel}
            onPlay={timer.start}
            onPause={timer.pause}
            onReset={timer.reset}
            onSkip={handleSkip}
          />
        </div>

        {/* Media Panel */}
        <div className="mt-3 mb-6">
          <MediaPanel
            spotifyUrl={spotifyUrl}
            youtubeUrl={youtubeUrl}
            onSpotifyLoad={setSpotifyUrl}
            onYoutubeLoad={setYoutubeUrl}
          />
        </div>
      </div>
    </main>
  )
}
