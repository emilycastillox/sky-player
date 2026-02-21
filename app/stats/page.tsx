import { TitleBar } from "@/components/title-bar"

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const WEEKLY_MINUTES = [120, 95, 145, 60, 180, 40, 75]
const MAX_MINUTES = Math.max(...WEEKLY_MINUTES)

const HISTORY = [
  { date: "Feb 20", type: "focus" as const, duration: "25:00", completed: true },
  { date: "Feb 20", type: "break" as const, duration: "05:00", completed: true },
  { date: "Feb 20", type: "focus" as const, duration: "25:00", completed: true },
  { date: "Feb 19", type: "focus" as const, duration: "25:00", completed: true },
  { date: "Feb 19", type: "focus" as const, duration: "25:00", completed: false },
  { date: "Feb 19", type: "break" as const, duration: "05:00", completed: true },
  { date: "Feb 18", type: "focus" as const, duration: "50:00", completed: true },
  { date: "Feb 18", type: "focus" as const, duration: "25:00", completed: true },
  { date: "Feb 17", type: "focus" as const, duration: "25:00", completed: true },
]

export default function StatsPage() {
  const todayIndex = new Date().getDay()
  const todayDayIndex = todayIndex === 0 ? 6 : todayIndex - 1

  return (
    <main className="relative min-h-screen flex flex-col items-center p-4 lg:p-8">
      <div className="w-full max-w-[1280px] flex flex-col gap-3">
        <TitleBar title="MEDIA PLAYER — STATS" backHref="/" />

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
                        height: `${(WEEKLY_MINUTES[i] / MAX_MINUTES) * 100}%`,
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
                {HISTORY.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl"
                    style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.4)" : "transparent" }}
                  >
                    <span className="font-mono text-xs w-[60px]" style={{ color: "#90A4AE" }}>
                      {s.date}
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
                    <span className="text-xs flex-1 font-semibold" style={{ color: "#37474F" }}>{s.duration}</span>
                    <span className="text-xs font-bold" style={{ color: s.completed ? "var(--skin-bar)" : "#E53935" }}>
                      {s.completed ? "\u2713" : "\u2717"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-[300px] shrink-0 flex flex-col gap-3">
            {/* Streak Card */}
            <div
              className="glass-panel p-6 flex flex-col items-center"
              style={{
                background: "linear-gradient(180deg, color-mix(in srgb, var(--skin-gradient-start) 20%, transparent) 0%, rgba(255,255,255,0.6) 100%)",
              }}
            >
              <span className="text-4xl font-bold lcd-glow" style={{ color: "var(--skin-bar)" }}>5</span>
              <span className="text-[10px] uppercase tracking-[0.3em] mt-1 font-semibold" style={{ color: "#90A4AE" }}>
                Day Streak
              </span>
            </div>

            {/* Summary Stats */}
            {[
              { label: "Total Focus Time", value: "47h 20m" },
              { label: "Sessions Complete", value: "114" },
              { label: "Best Day", value: "3h 45m" },
            ].map((stat) => (
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
