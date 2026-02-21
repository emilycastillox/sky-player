"use client"

export interface Session {
  id: string
  type: "focus" | "break"
  durationMs: number
  completedAt: string
  wasCompleted: boolean
}

interface SessionLogPanelProps {
  sessions: Session[]
  todayFocusMinutes: number
  streakDays: number
}

function formatDuration(ms: number) {
  const totalSec = Math.floor(ms / 1000)
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

function relativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "now"
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export function SessionLogPanel({ sessions, todayFocusMinutes, streakDays }: SessionLogPanelProps) {
  const hours = Math.floor(todayFocusMinutes / 60)
  const mins = todayFocusMinutes % 60
  const timeStr = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`

  return (
    <div className="glass-panel flex flex-col h-full">
      {/* Header */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.5)" }}
      >
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{
            background: "linear-gradient(180deg, var(--skin-gradient-start), var(--skin-gradient-end))",
            boxShadow: "0 0 6px var(--skin-glow), inset 0 1px 0 rgba(255,255,255,0.5)",
          }}
        />
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: "#90A4AE" }}>
          Session Log
        </span>
      </div>

      {/* Session List */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {sessions.length === 0 ? (
          <p className="text-center text-xs p-4 font-mono" style={{ color: "#90A4AE" }}>
            No sessions yet
          </p>
        ) : (
          sessions.map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-3 px-4 py-2.5 transition-colors"
              style={{
                borderLeft: `3px solid ${s.type === "focus" ? "var(--skin-bar-mid)" : "#66BB6A"}`,
                borderRadius: "0 10px 10px 0",
                background: "transparent",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.4)" }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent" }}
            >
              <span
                className="text-xs font-bold"
                style={{ color: s.wasCompleted ? "var(--skin-bar)" : "#E53935" }}
              >
                {s.wasCompleted ? "\u2713" : "\u2717"}
              </span>
              <span className="text-xs flex-1 font-semibold" style={{ color: "#37474F" }}>
                {formatDuration(s.durationMs)}
              </span>
              <span className="font-mono text-[10px]" style={{ color: "#90A4AE" }}>
                {relativeTime(s.completedAt)}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div
        className="px-4 py-3 flex justify-between text-[10px] uppercase tracking-wider"
        style={{ borderTop: "1px solid rgba(255,255,255,0.5)" }}
      >
        <div>
          <span className="block font-semibold" style={{ color: "#90A4AE" }}>Today</span>
          <span className="font-bold" style={{ color: "var(--skin-bar)" }}>{timeStr}</span>
        </div>
        <div className="text-right">
          <span className="block font-semibold" style={{ color: "#90A4AE" }}>Streak</span>
          <span className="font-bold" style={{ color: "var(--skin-bar)" }}>{streakDays} days</span>
        </div>
      </div>
    </div>
  )
}
