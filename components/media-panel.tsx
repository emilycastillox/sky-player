"use client"

import { useState } from "react"

interface MediaPanelProps {
  spotifyUrl: string | null
  youtubeUrl: string | null
  onSpotifyLoad: (url: string) => void
  onYoutubeLoad: (url: string) => void
}

function extractSpotifyId(url: string) {
  const match = url.match(/(?:playlist|track|album)\/([a-zA-Z0-9]+)/)
  return match ? match[0] : null
}

function extractYoutubeId(url: string) {
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
  return match ? match[1] : null
}

function MediaSlot({
  label,
  url,
  onLoad,
  renderEmbed,
  embedHeight,
}: {
  label: string
  url: string | null
  onLoad: (url: string) => void
  renderEmbed: (url: string) => React.ReactNode
  embedHeight: number
}) {
  const [input, setInput] = useState("")

  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-[9px] uppercase tracking-[0.2em] font-semibold" style={{ color: "#90A4AE" }}>
        {label}
      </span>
      {url ? (
        <div className="rounded-2xl overflow-hidden inset-panel w-full" style={{ height: embedHeight }}>
          {renderEmbed(url)}
        </div>
      ) : (
        <div
          className="inset-panel rounded-2xl flex flex-col items-center justify-center gap-3 w-full"
          style={{ height: embedHeight }}
        >
          <span className="font-mono text-[10px]" style={{ color: "#90A4AE" }}>
            Paste {label.toLowerCase()} link
          </span>
          <div className="flex gap-2 w-full max-w-sm px-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`${label} URL`}
              className="flex-1 min-w-0 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-ring/30"
              style={{
                background: "rgba(255,255,255,0.8)",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow: "inset 0 1px 3px rgba(0,80,140,0.06)",
                color: "#37474F",
              }}
            />
            <button
              onClick={() => { if (input.trim()) onLoad(input.trim()) }}
              className="chrome-btn text-[10px] uppercase px-4 py-2 rounded-xl font-semibold shrink-0"
            >
              Load
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export function MediaPanel({ spotifyUrl, youtubeUrl, onSpotifyLoad, onYoutubeLoad }: MediaPanelProps) {
  return (
    <div className="glass-panel p-5">
      <span className="text-[9px] uppercase tracking-[0.15em] font-semibold block mb-4" style={{ color: "#90A4AE" }}>
        Media
      </span>
      <div className="flex flex-col gap-4 w-full">
        {/* YouTube - 16:9 ratio container */}
        <MediaSlot
          label="YouTube"
          url={youtubeUrl}
          onLoad={onYoutubeLoad}
          embedHeight={320}
          renderEmbed={(url) => {
            const id = extractYoutubeId(url)
            if (!id) return <span className="text-xs p-3" style={{ color: "#E53935" }}>Invalid URL</span>
            return (
              <iframe
                src={`https://www.youtube.com/embed/${id}`}
                width="100%"
                height="100%"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube embed"
                className="border-0"
              />
            )
          }}
        />

        {/* Spotify - compact embed, full width */}
        <MediaSlot
          label="Spotify"
          url={spotifyUrl}
          onLoad={onSpotifyLoad}
          embedHeight={152}
          renderEmbed={(url) => {
            const path = extractSpotifyId(url)
            if (!path) return <span className="text-xs p-3" style={{ color: "#E53935" }}>Invalid URL</span>
            return (
              <iframe
                src={`https://open.spotify.com/embed/${path}?theme=0`}
                width="100%"
                height="100%"
                allow="encrypted-media"
                title="Spotify embed"
                className="border-0"
              />
            )
          }}
        />
      </div>
    </div>
  )
}
