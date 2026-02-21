"use client"

interface ModeSelectorProps {
  mode: "focus" | "break"
  onModeChange: (mode: "focus" | "break") => void
  streakDays: number
  todayFocusMinutes: number
  currentSession: number
  totalSessions: number
}

export function ModeSelector({
  mode,
  onModeChange,
  streakDays,
  todayFocusMinutes,
  currentSession,
  totalSessions,
}: ModeSelectorProps) {
  const hours = Math.floor(todayFocusMinutes / 60)
  const mins = todayFocusMinutes % 60
  const timeStr = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`

  return (
    <div className="glass-panel flex flex-col gap-5 p-4 h-full">
      {/* Mode Toggle */}
      <div className="flex flex-col gap-2">
        {(["focus", "break"] as const).map((m) => {
          const isActive = mode === m
          const focusActive: React.CSSProperties = {
            background: "linear-gradient(180deg, var(--skin-gradient-start) 0%, var(--skin-gradient-end) 100%)",
            color: "#ffffff",
            border: "1px solid var(--skin-border)",
            boxShadow: `0 2px 12px var(--skin-glow), inset 0 1px 0 rgba(255,255,255,0.6)`,
            textShadow: "0 1px 2px rgba(0,0,0,0.15)",
          }
          const breakActive: React.CSSProperties = {
            background: "linear-gradient(180deg, #81C784 0%, #43A047 100%)",
            color: "#ffffff",
            border: "1px solid rgba(67,160,71,0.4)",
            boxShadow: "0 2px 12px rgba(67,160,71,0.3), inset 0 1px 0 rgba(255,255,255,0.6)",
            textShadow: "0 1px 2px rgba(0,0,0,0.15)",
          }
          const inactive: React.CSSProperties = {
            background: "linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(240,248,255,0.6) 100%)",
            color: "#78909C",
            border: "1px solid rgba(255,255,255,0.7)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 4px rgba(0,80,140,0.08)",
          }

          return (
            <button
              key={m}
              onClick={() => onModeChange(m)}
              className="text-sm font-bold uppercase tracking-wider px-3 py-3 rounded-2xl transition-all"
              style={isActive ? (m === "focus" ? focusActive : breakActive) : inactive}
            >
              {m}
            </button>
          )
        })}
      </div>

      {/* Stats */}
      <div className="flex flex-col gap-3">
        <div>
          <span className="text-[9px] uppercase tracking-[0.2em] block font-semibold" style={{ color: "#90A4AE" }}>
            Streak
          </span>
          <span className="text-sm font-bold lcd-glow" style={{ color: "var(--skin-bar)" }}>
            {streakDays} days
          </span>
        </div>
        <div>
          <span className="text-[9px] uppercase tracking-[0.2em] block font-semibold" style={{ color: "#90A4AE" }}>
            Today
          </span>
          <span className="text-sm font-semibold" style={{ color: "#37474F" }}>
            {timeStr}
          </span>
        </div>
      </div>

      {/* Session Progress */}
      <div>
        <span className="text-[9px] uppercase tracking-[0.2em] block mb-2 font-semibold" style={{ color: "#90A4AE" }}>
          Session
        </span>
        <div className="flex gap-2">
          {Array.from({ length: totalSessions }).map((_, i) => {
            const isCompleted = i < currentSession - 1
            const isCurrent = i === currentSession - 1
            return (
              <div
                key={i}
                className="w-4 h-4 rounded-full"
                style={{
                  background: isCompleted || isCurrent
                    ? "linear-gradient(180deg, var(--skin-gradient-start), var(--skin-gradient-end))"
                    : "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(230,240,250,0.7))",
                  border: isCompleted || isCurrent
                    ? "1.5px solid var(--skin-border)"
                    : "1.5px solid rgba(255,255,255,0.8)",
                  boxShadow: isCompleted
                    ? `0 0 8px var(--skin-glow), inset 0 1px 0 rgba(255,255,255,0.5)`
                    : isCurrent
                    ? `0 0 12px var(--skin-glow), inset 0 1px 0 rgba(255,255,255,0.5)`
                    : "0 1px 4px rgba(0,80,140,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
                  animation: isCurrent ? "pulse-glow 2s ease-in-out infinite" : "none",
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
