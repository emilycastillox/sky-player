"use client"

interface TimerDisplayProps {
  timeRemaining: string
  totalSeconds: number
  elapsedSeconds: number
  mode: "focus" | "break"
  status: "idle" | "running" | "paused" | "complete"
}

export function TimerDisplay({
  timeRemaining,
  totalSeconds,
  elapsedSeconds,
  mode,
  status,
}: TimerDisplayProps) {
  const progress = totalSeconds > 0 ? elapsedSeconds / totalSeconds : 0
  const isFocus = mode === "focus"
  const barColor = isFocus ? "var(--skin-bar)" : "#43A047"
  const lowTime = totalSeconds - elapsedSeconds < 300 && status === "running"

  const timerColor = (() => {
    switch (status) {
      case "idle": return "#78909C"
      case "running": return isFocus ? "var(--skin-text)" : "#2E7D32"
      case "paused": return isFocus ? "var(--skin-text)" : "#2E7D32"
      case "complete": return "var(--skin-bar)"
    }
  })()

  const timerStyle: React.CSSProperties = {
    color: timerColor,
    fontSize: "clamp(52px, 8vw, 100px)",
    fontWeight: 700,
    letterSpacing: "0.05em",
    ...(status === "running" && {
      textShadow: `0 0 15px ${isFocus ? "rgba(2,136,209,0.3)" : "rgba(67,160,71,0.3)"}, 0 2px 4px rgba(0,0,0,0.08)`,
    }),
    ...(status === "paused" && {
      animation: "blink 1s ease-in-out infinite",
    }),
    ...(status === "complete" && {
      textShadow: "0 0 15px rgba(0,145,213,0.5), 0 0 40px rgba(0,184,230,0.2)",
    }),
  }

  return (
    <div className="glass-panel flex flex-col items-center justify-center p-8 h-full">
      <span className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-2" style={{ color: "#78909C" }}>
        {mode === "focus" ? "FOCUS SESSION" : "BREAK TIME"}
      </span>

      <div className="font-mono leading-none" style={timerStyle}>
        {status === "complete" ? "00:00" : timeRemaining}
      </div>

      {status === "complete" && (
        <span
          className="text-xs uppercase tracking-[0.2em] mt-3 font-semibold"
          style={{
            color: "#0091d5",
            textShadow: "0 0 8px rgba(0,145,213,0.4)",
            animation: "pulse-glow 1.5s ease-in-out infinite",
          }}
        >
          TRACK COMPLETE
        </span>
      )}

      {/* Progress bar */}
      <div
        className="w-full mt-5 h-2.5 rounded-full overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.5)",
          boxShadow: "inset 0 1px 3px rgba(0,80,140,0.1), 0 1px 0 rgba(255,255,255,0.8)",
        }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progress * 100}%`,
            background: lowTime
              ? "linear-gradient(90deg, #EF5350, #E53935)"
              : isFocus
                ? `linear-gradient(90deg, var(--skin-bar), var(--skin-gradient-start))`
                : "linear-gradient(90deg, #43A047, #81C784)",
            boxShadow: `0 0 10px ${lowTime ? "rgba(229,57,53,0.4)" : "var(--skin-glow)"}, inset 0 1px 0 rgba(255,255,255,0.5)`,
          }}
        />
      </div>
    </div>
  )
}
