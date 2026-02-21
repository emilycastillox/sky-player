"use client"

import { useState } from "react"
import { TitleBar } from "@/components/title-bar"
import { useTheme, SKINS, type SkinId } from "@/components/theme-provider"

function SliderControl({ label, min, max, value, onChange, unit = "min" }: {
  label: string; min: number; max: number; value: number; onChange: (v: number) => void; unit?: string
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: "#90A4AE" }}>{label}</span>
        <span className="text-sm font-bold" style={{ color: "#37474F" }}>{value} {unit}</span>
      </div>
      <div
        className="relative h-2.5 rounded-full cursor-pointer"
        style={{
          background: "rgba(255,255,255,0.6)",
          boxShadow: "inset 0 1px 3px rgba(0,80,140,0.08), 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        <div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, var(--skin-bar), var(--skin-bar-mid), var(--skin-bar-light))",
            boxShadow: "0 0 10px var(--skin-glow), inset 0 1px 0 rgba(255,255,255,0.5)",
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full pointer-events-none"
          style={{
            left: `calc(${pct}% - 10px)`,
            background: "linear-gradient(180deg, #ffffff 0%, #E3F2FD 100%)",
            border: "2.5px solid var(--skin-bar)",
            boxShadow: "0 2px 6px rgba(0,80,140,0.2), inset 0 1px 0 rgba(255,255,255,1)",
          }}
        />
      </div>
    </div>
  )
}

function ToggleSwitch({ label, checked, onChange }: {
  label: string; checked: boolean; onChange: (v: boolean) => void
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between w-full py-1"
    >
      <span className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: "#90A4AE" }}>{label}</span>
      <div
        className="w-12 h-7 rounded-full relative transition-all"
        style={{
          background: checked
            ? "linear-gradient(180deg, var(--skin-gradient-start), var(--skin-gradient-end))"
            : "rgba(255,255,255,0.6)",
          border: checked ? "1.5px solid var(--skin-border)" : "1.5px solid rgba(0,80,140,0.1)",
          boxShadow: checked
            ? "0 0 10px var(--skin-glow), inset 0 1px 0 rgba(255,255,255,0.4)"
            : "inset 0 1px 3px rgba(0,60,120,0.06)",
        }}
      >
        <div
          className="absolute top-[3px] w-5 h-5 rounded-full transition-all"
          style={{
            left: checked ? "calc(100% - 23px)" : "3px",
            background: "linear-gradient(180deg, #ffffff, #f0f8ff)",
            boxShadow: "0 1px 4px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,1)",
          }}
        />
      </div>
    </button>
  )
}

export default function SettingsPage() {
  const { skin, setSkin } = useTheme()
  const [focusDuration, setFocusDuration] = useState(25)
  const [shortBreak, setShortBreak] = useState(5)
  const [longBreak, setLongBreak] = useState(15)
  const [sessionsBeforeLong, setSessionsBeforeLong] = useState(4)
  const [autoStartBreaks, setAutoStartBreaks] = useState(false)
  const [audioChime, setAudioChime] = useState(true)
  const [spotifyLink, setSpotifyLink] = useState("")
  const [youtubeLink, setYoutubeLink] = useState("")

  return (
    <main className="relative min-h-screen flex flex-col items-center p-4 lg:p-8">
      <div className="w-full max-w-[800px] flex flex-col gap-3">
        <TitleBar title="MEDIA PLAYER -- SETTINGS" backHref="/" />

        {/* Timer Settings */}
        <div className="glass-panel p-6 mt-1">
          <h2 className="text-[10px] uppercase tracking-[0.25em] mb-5 font-semibold" style={{ color: "#90A4AE" }}>
            Timer Settings
          </h2>
          <div className="flex flex-col gap-5">
            <SliderControl label="Focus Duration" min={1} max={90} value={focusDuration} onChange={setFocusDuration} />
            <SliderControl label="Short Break" min={1} max={30} value={shortBreak} onChange={setShortBreak} />
            <SliderControl label="Long Break" min={1} max={60} value={longBreak} onChange={setLongBreak} />

            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: "#90A4AE" }}>
                Long break after
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSessionsBeforeLong(Math.max(1, sessionsBeforeLong - 1))}
                  className="chrome-btn w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold"
                >
                  -
                </button>
                <span className="text-sm font-bold w-8 text-center" style={{ color: "#37474F" }}>
                  {sessionsBeforeLong}
                </span>
                <button
                  onClick={() => setSessionsBeforeLong(Math.min(10, sessionsBeforeLong + 1))}
                  className="chrome-btn w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold"
                >
                  +
                </button>
                <span className="text-[10px] ml-1 font-semibold" style={{ color: "#90A4AE" }}>sessions</span>
              </div>
            </div>

            <div className="pt-3 flex flex-col gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.5)" }}>
              <ToggleSwitch label="Auto-start breaks" checked={autoStartBreaks} onChange={setAutoStartBreaks} />
              <ToggleSwitch label="Audio chime on complete" checked={audioChime} onChange={setAudioChime} />
            </div>
          </div>
        </div>

        {/* Media Links */}
        <div className="glass-panel p-6">
          <h2 className="text-[10px] uppercase tracking-[0.25em] mb-4 font-semibold" style={{ color: "#90A4AE" }}>
            Media Links
          </h2>
          <div className="flex flex-col gap-4">
            {[
              { label: "Spotify Playlist / Track URL", value: spotifyLink, onChange: setSpotifyLink },
              { label: "YouTube URL", value: youtubeLink, onChange: setYoutubeLink },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-[10px] uppercase tracking-[0.15em] block mb-2 font-semibold" style={{ color: "#90A4AE" }}>
                  {field.label}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder="Paste URL..."
                    className="flex-1 rounded-xl px-3 py-2.5 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-ring/30"
                    style={{
                      background: "rgba(255,255,255,0.8)",
                      border: "1px solid rgba(255,255,255,0.9)",
                      boxShadow: "inset 0 1px 3px rgba(0,80,140,0.06)",
                      color: "#37474F",
                    }}
                  />
                  <button className="chrome-btn text-[10px] uppercase px-5 py-2.5 rounded-xl font-semibold">
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Player Skin */}
        <div className="glass-panel p-6">
          <h2 className="text-[10px] uppercase tracking-[0.25em] mb-4 font-semibold" style={{ color: "#90A4AE" }}>
            Player Skin
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {(Object.keys(SKINS) as SkinId[]).map((id) => {
              const s = SKINS[id]
              const isActive = skin === id
              return (
                <button
                  key={id}
                  onClick={() => setSkin(id)}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className="w-full aspect-[3/2] rounded-2xl overflow-hidden flex flex-wrap transition-all"
                    style={{
                      border: isActive
                        ? "2.5px solid var(--skin-bar)"
                        : "1.5px solid rgba(255,255,255,0.8)",
                      boxShadow: isActive
                        ? "0 0 14px var(--skin-glow), inset 0 1px 0 rgba(255,255,255,0.5)"
                        : "0 2px 8px rgba(0,80,140,0.06), inset 0 1px 0 rgba(255,255,255,0.6)",
                      transform: isActive ? "scale(1.04)" : "scale(1)",
                    }}
                  >
                    {s.colors.map((c, i) => (
                      <div key={i} className="w-1/2 h-1/2" style={{ background: c }} />
                    ))}
                  </div>
                  <span
                    className="text-[9px] uppercase tracking-wider font-semibold transition-colors"
                    style={{ color: isActive ? "var(--skin-text)" : "#78909C" }}
                  >
                    {s.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Save Button */}
        <button
          className="w-full py-3.5 rounded-2xl text-sm uppercase tracking-wider font-bold transition-all mb-6"
          style={{
            background: "linear-gradient(180deg, var(--skin-gradient-start) 0%, var(--skin-gradient-end) 45%, var(--skin-gradient-deep) 100%)",
            border: "2px solid rgba(255,255,255,0.6)",
            boxShadow: "0 4px 20px var(--skin-glow), inset 0 1px 0 rgba(255,255,255,0.6)",
            color: "#ffffff",
            textShadow: "0 1px 2px rgba(0,0,0,0.15)",
          }}
        >
          Save Settings
        </button>
      </div>
    </main>
  )
}
