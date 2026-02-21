"use client"

interface EqualizerVisualizerProps {
  isActive: boolean
  mode: "focus" | "break"
}

const BAR_COUNT = 24

export function EqualizerVisualizer({ isActive, mode }: EqualizerVisualizerProps) {
  const focusGradient = "linear-gradient(to top, var(--skin-bar), var(--skin-bar-mid), var(--skin-bar-light))"
  const breakGradient = "linear-gradient(to top, #43A047, #66BB6A, #A5D6A7)"
  const gradient = mode === "focus" ? focusGradient : breakGradient
  const glowColor = mode === "focus" ? "var(--skin-glow)" : "rgba(102,187,106,0.5)"

  return (
    <div
      className="inset-panel flex items-end justify-center gap-[3px] px-4 py-4 h-[160px] rounded-2xl"
      style={{
        background: "linear-gradient(180deg, rgba(220,240,255,0.5) 0%, rgba(240,248,255,0.3) 100%)",
      }}
    >
      {Array.from({ length: BAR_COUNT }).map((_, i) => {
        const delay = `${(i * 800) / BAR_COUNT}ms`
        // Deterministic from index so server and client match (avoids hydration mismatch)
        const activeDuration = `${200 + ((i * 17) % 400)}ms`
        const idleDuration = `${2000 + ((i * 43) % 1000)}ms`
        const eqMin = `${10 + ((i * 7) % 10)}%`
        const eqMax = `${60 + ((i * 11) % 35)}%`
        const idleMin = `${5 + Math.sin((i / BAR_COUNT) * Math.PI) * 5}%`
        const idleMax = `${10 + Math.sin((i / BAR_COUNT) * Math.PI) * 15}%`

        return (
          <div
            key={i}
            className="flex-1 max-w-[10px]"
            style={{
              background: gradient,
              opacity: isActive ? 0.85 : 0.25,
              borderRadius: "6px 6px 2px 2px",
              boxShadow: isActive ? `0 0 10px ${glowColor}, inset 0 1px 0 rgba(255,255,255,0.5)` : "none",
              // Longhand only: avoid mixing shorthand `animation` with `animationDelay` (prevents style bugs)
              animationName: isActive ? "eq-bounce" : "eq-idle",
              animationDuration: isActive ? activeDuration : idleDuration,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDelay: delay,
              ["--eq-min" as string]: eqMin,
              ["--eq-max" as string]: eqMax,
              ["--eq-idle-min" as string]: idleMin,
              ["--eq-idle-max" as string]: idleMax,
            }}
          />
        )
      })}
    </div>
  )
}
