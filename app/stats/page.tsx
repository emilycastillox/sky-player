"use client"

import { useMemo } from "react"
import { TitleBar } from "@/components/title-bar"
import { useSessions } from "@/hooks/use-sessions"
import { weeklyFocusMinutes } from "@/lib/sessions"

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

function formatSessionDate(iso: string) {
  const d = new Date(iso)
  const mon = d.toLocaleString("en-US", { month: "short" })
  const day = d.getDate()
  return `${mon} ${day}`
}

function formatDuration(ms: number) {
  const m = Math.floor(ms / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

export default function StatsPage() {
  const { sessions, todayFocusMinutes } = useSessions()
  const todayIndex = new Date().getDay()
  const todayDayIndex = todayIndex === 0 ? 6 : todayIndex - 1

  const weeklyMinutes = useMemo(() => weeklyFocusMinutes(sessions), [sessions])
  const maxMinutes = Math.max(1, ...weeklyMinutes)

  const todayHours = Math.floor(todayFocusMinutes / 60)
  const todayRem = todayFocusMinutes % 60
  const totalTodayStr = todayHours > 0 ? `${todayHours}h ${todayRem}m` : `${todayRem}m`

  const historyRows = useMemo(() => {
    return [...sessions]
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
      .slice(0, 50)
  }, [sessions])

  return (
    <main className="relative min-h-screen flex flex-col items-center p-4 lg:p-8">
      <div className="w-full max-w-[1280px] flex flex-col gap-3">
        <TitleBar title="SKY PLAYER — STATS" backHref="/" />

        <div className="flex gap-4 mt-1">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-3">
            {/* Weekly Chart */}
            <div className="glass-panel p-5">
              <h2 className="text-[10px] uppercase tracking-[0.25em] mb-4 font-semibold" style={{ color: "#90A4AE" }}>
                Weekly Focus
              </h2>
              <div className="inset-panel p-4 flex items-end justify-between gap-2" style={{ height: 200 }}>
                {DAYS.map((day, i) => (
                  <div key={day} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <div
                      className="w-full max-w-[32px] transition-all"
                      style={{
                        height: `${(weeklyMinutes[i] / maxMinutes) * 100}%`,
                        background: i === todayDayIndex
                          ? "linear-gradient(to top, var(--skin-bar), var(--skin-bar-mid), var(--skin-bar-light))"
                          : "linear-gradient(to top, var(--skin-subtle), rgba(200,230,255,0.2))",
                        boxShadow: i === todayDayIndex
                          ? "0 0 12px var(--skin-glow), inset 0 1px 0 rgba(255,255,255,0.5)"
                          : "none",
                        borderRadius: "8px 8px 2px 2px",
                      }}
                    />
                    <span className="font-mono text-[9px]" style={{ color: "#90A4AE" }}>{day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Session History */}
            <div className="glass-panel p-5 flex-1">
              <h2 className="text-[10px] uppercase tracking-[0.25em] mb-3 font-semibold" style={{ color: "#90A4AE" }}>
                Session History
              </h2>
              <div className="flex flex-col gap-0.5">
                {historyRows.length === 0 ? (
                  <p className="text-center text-xs p-4 font-mono" style={{ color: "#90A4AE" }}>
                    No sessions yet
                  </p>
                ) : (
                  historyRows.map((s, i) => (
                    <div
                      key={s.id}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl"
                      style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.4)" : "transparent" }}
                    >
                      <span className="font-mono text-xs w-[60px]" style={{ color: "#90A4AE" }}>
                        {formatSessionDate(s.completedAt)}
                      </span>
                      <span
                        className="text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-xl font-semibold"
                        style={{
                          background: s.type === "focus" ? "var(--skin-subtle)" : "rgba(67,160,71,0.12)",
                          color: s.type === "focus" ? "var(--skin-text)" : "#2E7D32",
                          border: `1px solid ${s.type === "focus" ? "var(--skin-border)" : "rgba(67,160,71,0.2)"}`,
                        }}
                      >
                        {s.type}
                      </span>
                      <span className="text-xs flex-1 font-semibold" style={{ color: "#37474F" }}>
                        {formatDuration(s.durationMs)}
                      </span>
                      <span className="text-xs font-bold" style={{ color: s.wasCompleted ? "var(--skin-bar)" : "#E53935" }}>
                        {s.wasCompleted ? "\u2713" : "\u2717"}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-[300px] shrink-0 flex flex-col gap-3">
            {/* Total today card */}
            <div
              className="glass-panel p-6 flex flex-col items-center"
              style={{
                background: "linear-gradient(180deg, color-mix(in srgb, var(--skin-gradient-start) 20%, transparent) 0%, rgba(255,255,255,0.6) 100%)",
              }}
            >
              <span className="text-4xl font-bold lcd-glow" style={{ color: "var(--skin-bar)" }}>{totalTodayStr}</span>
              <span className="text-[10px] uppercase tracking-[0.3em] mt-1 font-semibold" style={{ color: "#90A4AE" }}>
                Total today
              </span>
            </div>

            {/* Summary Stats */}
            {(() => {
              const totalMs = sessions
                .filter((s) => s.type === "focus" && s.wasCompleted)
                .reduce((sum, s) => sum + s.durationMs, 0)
              const totalM = Math.floor(totalMs / 60000)
              const totalH = Math.floor(totalM / 60)
              const totalRem = totalM % 60
              const totalStr = totalH > 0 ? `${totalH}h ${totalRem}m` : `${totalRem}m`
              const completeCount = sessions.filter((s) => s.wasCompleted).length
              const bestDayMins = weeklyMinutes.length ? Math.max(...weeklyMinutes) : 0
              const bestH = Math.floor(bestDayMins / 60)
              const bestRem = bestDayMins % 60
              const bestStr = bestH > 0 ? `${bestH}h ${bestRem}m` : `${bestRem}m`
              return [
                { label: "Total Focus Time", value: totalStr },
                { label: "Sessions Complete", value: String(completeCount) },
                { label: "Best Day", value: bestStr },
              ]
            })().map((stat) => (
              <div key={stat.label} className="glass-panel p-4">
                <span className="text-[9px] uppercase tracking-[0.2em] block mb-1 font-semibold" style={{ color: "#90A4AE" }}>
                  {stat.label}
                </span>
                <span className="text-lg font-bold" style={{ color: "#37474F" }}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
