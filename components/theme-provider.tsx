"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

export type SkinId = "aero" | "y2k" | "classic" | "aqua"

interface SkinConfig {
  name: string
  colors: string[]
  vars: Record<string, string>
}

export const SKINS: Record<SkinId, SkinConfig> = {
  aero: {
    name: "Frutiger Aero",
    colors: ["#42A5F5", "#81D4FA", "#ffffff", "#0288D1"],
    vars: {
      "--skin-gradient-start": "#4FC3F7",
      "--skin-gradient-end": "#0288D1",
      "--skin-gradient-deep": "#0277BD",
      "--skin-bar": "#0288D1",
      "--skin-bar-mid": "#29B6F6",
      "--skin-bar-light": "#81D4FA",
      "--skin-text": "#0277BD",
      "--skin-glow": "rgba(2,136,209,0.3)",
      "--skin-subtle": "rgba(2,136,209,0.12)",
      "--skin-border": "rgba(2,136,209,0.4)",
      "--skin-title-start": "rgba(150,210,255,0.85)",
      "--skin-title-mid": "rgba(80,170,240,0.75)",
      "--skin-title-end": "rgba(160,215,255,0.8)",
    },
  },
  y2k: {
    name: "Y2K Gloss",
    colors: ["#F48FB1", "#FCE4EC", "#ffffff", "#E91E63"],
    vars: {
      "--skin-gradient-start": "#F48FB1",
      "--skin-gradient-end": "#E91E63",
      "--skin-gradient-deep": "#C2185B",
      "--skin-bar": "#E91E63",
      "--skin-bar-mid": "#F06292",
      "--skin-bar-light": "#F8BBD0",
      "--skin-text": "#C2185B",
      "--skin-glow": "rgba(233,30,99,0.3)",
      "--skin-subtle": "rgba(233,30,99,0.12)",
      "--skin-border": "rgba(233,30,99,0.4)",
      "--skin-title-start": "rgba(248,187,208,0.85)",
      "--skin-title-mid": "rgba(240,98,146,0.75)",
      "--skin-title-end": "rgba(248,187,208,0.8)",
    },
  },
  classic: {
    name: "Windows Classic",
    colors: ["#5C92C5", "#87B1D4", "#ffffff", "#1565C0"],
    vars: {
      "--skin-gradient-start": "#5C92C5",
      "--skin-gradient-end": "#1565C0",
      "--skin-gradient-deep": "#0D47A1",
      "--skin-bar": "#1565C0",
      "--skin-bar-mid": "#5C92C5",
      "--skin-bar-light": "#87B1D4",
      "--skin-text": "#0D47A1",
      "--skin-glow": "rgba(21,101,192,0.3)",
      "--skin-subtle": "rgba(21,101,192,0.12)",
      "--skin-border": "rgba(21,101,192,0.4)",
      "--skin-title-start": "rgba(135,177,212,0.85)",
      "--skin-title-mid": "rgba(92,146,197,0.75)",
      "--skin-title-end": "rgba(135,177,212,0.8)",
    },
  },
  aqua: {
    name: "Aqua",
    colors: ["#66BB6A", "#A5D6A7", "#ffffff", "#2E7D32"],
    vars: {
      "--skin-gradient-start": "#66BB6A",
      "--skin-gradient-end": "#2E7D32",
      "--skin-gradient-deep": "#1B5E20",
      "--skin-bar": "#2E7D32",
      "--skin-bar-mid": "#66BB6A",
      "--skin-bar-light": "#A5D6A7",
      "--skin-text": "#1B5E20",
      "--skin-glow": "rgba(46,125,50,0.3)",
      "--skin-subtle": "rgba(46,125,50,0.12)",
      "--skin-border": "rgba(46,125,50,0.4)",
      "--skin-title-start": "rgba(165,214,167,0.85)",
      "--skin-title-mid": "rgba(102,187,106,0.75)",
      "--skin-title-end": "rgba(165,214,167,0.8)",
    },
  },
}

interface ThemeContextValue {
  skin: SkinId
  setSkin: (id: SkinId) => void
  config: SkinConfig
}

const ThemeContext = createContext<ThemeContextValue>({
  skin: "aero",
  setSkin: () => {},
  config: SKINS.aero,
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [skin, setSkinState] = useState<SkinId>("aero")

  const applySkin = useCallback((id: SkinId) => {
    const config = SKINS[id]
    const root = document.documentElement
    Object.entries(config.vars).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
  }, [])

  const setSkin = useCallback((id: SkinId) => {
    setSkinState(id)
    applySkin(id)
    try { localStorage.setItem("player-skin", id) } catch {}
  }, [applySkin])

  useEffect(() => {
    try {
      const saved = localStorage.getItem("player-skin") as SkinId | null
      if (saved && SKINS[saved]) {
        setSkinState(saved)
        applySkin(saved)
        return
      }
    } catch {}
    applySkin("aero")
  }, [applySkin])

  return (
    <ThemeContext.Provider value={{ skin, setSkin, config: SKINS[skin] }}>
      {children}
    </ThemeContext.Provider>
  )
}
