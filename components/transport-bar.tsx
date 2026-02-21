"use client"

import { Play, Pause, SkipBack, SkipForward } from "lucide-react"

interface TransportBarProps {
  timeRemaining: string
  totalDuration: number
  elapsed: number
  isPlaying: boolean
  sessionLabel: string
  onPlay: () => void
  onPause: () => void
  onReset: () => void
  onSkip: () => void
}

export function TransportBar({
  timeRemaining,
  totalDuration,
  elapsed,
  isPlaying,
  sessionLabel,
  onPlay,
  onPause,
  onReset,
  onSkip,
}: TransportBarProps) {
  const progress = totalDuration > 0 ? elapsed / totalDuration : 0

  return (
    <div className="glass-panel">
      {/* Controls Row */}
      <div className="flex items-center px-5 py-3">
        {/* Left: Session label */}
        <div className="w-[200px]">
          <span className="text-[10px] uppercase tracking-[0.15em] font-semibold" style={{ color: "#78909C" }}>
            {sessionLabel}
          </span>
        </div>

        {/* Center: Buttons */}
        <div className="flex-1 flex items-center justify-center gap-3">
          <button
            onClick={onReset}
            className="chrome-btn flex items-center justify-center w-11 h-11 rounded-full"
            aria-label="Reset"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={isPlaying ? onPause : onPlay}
            className="flex items-center justify-center w-[68px] h-[68px] rounded-full transition-all"
            style={{
              background: "linear-gradient(180deg, var(--skin-gradient-start) 0%, var(--skin-gradient-end) 45%, var(--skin-gradient-deep) 100%)",
              border: "2.5px solid rgba(255,255,255,0.7)",
              boxShadow: `0 4px 20px var(--skin-glow), inset 0 2px 0 rgba(255,255,255,0.6), inset 0 -2px 4px rgba(0,0,0,0.08)`,
              color: "#ffffff",
            }}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7" />
            ) : (
              <Play className="w-7 h-7 ml-0.5" />
            )}
          </button>

          <button
            onClick={onSkip}
            className="chrome-btn flex items-center justify-center w-11 h-11 rounded-full"
            aria-label="Skip"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Time */}
        <div className="w-[200px] text-right">
          <span className="font-mono text-sm font-bold lcd-glow" style={{ color: "var(--skin-text)" }}>
            {timeRemaining}
          </span>
        </div>
      </div>

      {/* Scrubber */}
      <div className="px-5 pb-4">
        <div
          className="relative h-2.5 rounded-full overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.6)",
            boxShadow: "inset 0 1px 3px rgba(0,80,140,0.1), 0 1px 0 rgba(255,255,255,0.9)",
          }}
        >
          <div
            className="absolute top-0 left-0 h-full rounded-full transition-all duration-300"
            style={{
              width: `${progress * 100}%`,
              background: "linear-gradient(90deg, var(--skin-bar), var(--skin-bar-mid), var(--skin-bar-light))",
              boxShadow: "0 0 10px var(--skin-glow), inset 0 1px 0 rgba(255,255,255,0.5)",
            }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full transition-all duration-300"
            style={{
              left: `calc(${progress * 100}% - 10px)`,
              background: "linear-gradient(180deg, #ffffff 0%, #E3F2FD 100%)",
              border: "2.5px solid var(--skin-bar)",
              boxShadow: "0 2px 6px rgba(0,80,140,0.25), inset 0 1px 0 rgba(255,255,255,1)",
            }}
          />
        </div>
      </div>
    </div>
  )
}
