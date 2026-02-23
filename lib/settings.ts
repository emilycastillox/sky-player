const STORAGE_KEY = "sky-player-settings"

export interface PlayerSettings {
  focusDurationMinutes: number
  shortBreakMinutes: number
  longBreakMinutes: number
  sessionsBeforeLongBreak: number
  autoStartBreaks: boolean
  audioChimeOnComplete: boolean
  spotifyUrl: string
  youtubeUrl: string
}

export const DEFAULT_SETTINGS: PlayerSettings = {
  focusDurationMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  sessionsBeforeLongBreak: 4,
  autoStartBreaks: false,
  audioChimeOnComplete: true,
  spotifyUrl: "",
  youtubeUrl: "",
}

export function loadSettings(): PlayerSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_SETTINGS
    const parsed = JSON.parse(raw) as Partial<PlayerSettings>
    return { ...DEFAULT_SETTINGS, ...parsed }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveSettings(settings: Partial<PlayerSettings>): void {
  if (typeof window === "undefined") return
  try {
    const current = loadSettings()
    const next = { ...current, ...settings }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {}
}
