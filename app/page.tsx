"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { Settings, BarChart3 } from "lucide-react"
import { TitleBar } from "@/components/title-bar"
import { ModeSelector } from "@/components/mode-selector"
import { EqualizerVisualizer } from "@/components/equalizer-visualizer"
import { TimerDisplay } from "@/components/timer-display"
import { SessionLogPanel, type Session } from "@/components/session-log-panel"
import { TransportBar } from "@/components/transport-bar"
import { MediaPanel } from "@/components/media-panel"
import { useTimer } from "@/hooks/use-timer"

const MOCK_SESSIONS: Session[] = [
  { id: "1", type: "focus", durationMs: 1500000, completedAt: new Date(Date.now() - 120000).toISOString(), wasCompleted: true },
  { id: "2", type: "break", durationMs: 300000, completedAt: new Date(Date.now() - 600000).toISOString(), wasCompleted: true },
  { id: "3", type: "focus", durationMs: 1500000, completedAt: new Date(Date.now() - 3600000).toISOString(), wasCompleted: true },
  { id: "4", type: "focus", durationMs: 1500000, completedAt: new Date(Date.now() - 7200000).toISOString(), wasCompleted: false },
]

export default function PlayerPage() {
  const [mode, setMode] = useState<"focus" | "break">("focus")
  const [spotifyUrl, setSpotifyUrl] = useState<string | null>(null)
  const [youtubeUrl, setYoutubeUrl] = useState<string | null>(null)

  const durationSec = mode === "focus" ? 25 * 60 : 5 * 60
  const timer = useTimer(durationSec)

  const currentSession = 3
  const totalSessions = 4

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
          <TitleBar title="MEDIA PLAYER v1.0" />
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
              streakDays={5}
              todayFocusMinutes={165}
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
            <SessionLogPanel sessions={MOCK_SESSIONS} todayFocusMinutes={165} streakDays={5} />
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
            onSkip={timer.reset}
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
