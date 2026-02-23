"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"
import {
  loadSettings,
  saveSettings,
  DEFAULT_SETTINGS,
  type PlayerSettings,
} from "@/lib/settings"

type SettingsContextValue = PlayerSettings & {
  updateSettings: (partial: Partial<PlayerSettings>) => void
}

const SettingsContext = createContext<SettingsContextValue>({
  ...DEFAULT_SETTINGS,
  updateSettings: () => {},
})

export function useSettings() {
  return useContext(SettingsContext)
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<PlayerSettings>(DEFAULT_SETTINGS)

  useEffect(() => {
    setSettings(loadSettings())
  }, [])

  const updateSettings = useCallback((partial: Partial<PlayerSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial }
      saveSettings(next)
      return next
    })
  }, [])

  return (
    <SettingsContext.Provider value={{ ...settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}
