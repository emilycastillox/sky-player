const STORAGE_KEY = "sky-player-sessions"

export interface Session {
  id: string
  type: "focus" | "break"
  durationMs: number
  completedAt: string
  wasCompleted: boolean
}

function isToday(iso: string): boolean {
  const d = new Date(iso)
  const now = new Date()
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  )
}

export function loadSessions(): Session[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Session[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveSessions(sessions: Session[]): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
  } catch {}
}

export function addSession(sessions: Session[], session: Omit<Session, "id">): Session[] {
  const id = typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `s-${Date.now()}-${Math.random().toString(36).slice(2)}`
  const next = [...sessions, { ...session, id }]
  saveSessions(next)
  return next
}

/** Focus minutes completed today (wasCompleted focus sessions only) */
export function todayFocusMinutes(sessions: Session[]): number {
  const ms = sessions
    .filter((s) => s.type === "focus" && s.wasCompleted && isToday(s.completedAt))
    .reduce((sum, s) => sum + s.durationMs, 0)
  return Math.floor(ms / 60000)
}

/** Number of focus sessions completed today (for Pomodoro cycle position) */
export function focusSessionsCompletedToday(sessions: Session[]): number {
  return sessions.filter(
    (s) => s.type === "focus" && s.wasCompleted && isToday(s.completedAt)
  ).length
}

/** Minutes of completed focus per day this week [Mon=0, ..., Sun=6] */
export function weeklyFocusMinutes(sessions: Session[]): number[] {
  const now = new Date()
  const out = [0, 0, 0, 0, 0, 0, 0]
  const dayOfWeek = now.getDay()
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  const weekStart = new Date(now)
  weekStart.setDate(weekStart.getDate() + mondayOffset)
  weekStart.setHours(0, 0, 0, 0)
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekEnd.getDate() + 7)
  weekEnd.setMilliseconds(-1)
  sessions
    .filter((s) => s.type === "focus" && s.wasCompleted)
    .forEach((s) => {
      const d = new Date(s.completedAt)
      if (d < weekStart || d > weekEnd) return
      const dayIndex = (d.getDay() + 6) % 7
      out[dayIndex] += Math.floor(s.durationMs / 60000)
    })
  return out
}
