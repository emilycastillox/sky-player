"use client"

import { useEffect, useState } from "react"

interface Bubble {
  id: number
  size: number
  left: number
  delay: number
  duration: number
  drift: number
  opacity: number
}

export function AeroBackground() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])

  useEffect(() => {
    setBubbles(
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        size: 10 + Math.random() * 60,
        left: Math.random() * 98,
        delay: Math.random() * 22,
        duration: 10 + Math.random() * 18,
        drift: -45 + Math.random() * 90,
        opacity: 0.35 + Math.random() * 0.55,
      }))
    )
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden select-none pointer-events-none" aria-hidden="true">
      {/* Sky gradient - vivid royal blue to light */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #0066dd 0%, #0088ee 8%, #2ea0f5 18%, #4db8f9 30%, #7dccfb 42%, #a8dffd 54%, #ccecfe 66%, #e4f5ff 78%, #d8f0fd 88%, #b0dffa 100%)",
        }}
      />

      {/* Sun with lens flare */}
      <div
        className="absolute"
        style={{
          top: "2%",
          right: "10%",
          width: 110,
          height: 110,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,240,0.85) 20%, rgba(255,255,200,0.35) 50%, transparent 80%)",
          boxShadow: "0 0 80px 50px rgba(255,255,230,0.3), 0 0 180px 90px rgba(255,255,200,0.12)",
        }}
      />
      {/* Lens flare streaks */}
      <div
        className="absolute"
        style={{
          top: "4.5%",
          right: "11.5%",
          width: 200,
          height: 3,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.7) 30%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.7) 70%, transparent)",
          transform: "rotate(-15deg)",
          filter: "blur(1px)",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "3%",
          right: "10.5%",
          width: 160,
          height: 2,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5) 30%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.5) 70%, transparent)",
          transform: "rotate(25deg)",
          filter: "blur(0.5px)",
        }}
      />

      {/* Rainbow arc */}
      <div
        className="absolute"
        style={{
          top: "5%",
          left: "5%",
          width: 400,
          height: 200,
          borderRadius: "200px 200px 0 0",
          border: "none",
          background: "transparent",
          overflow: "hidden",
          opacity: 0.35,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "200px 200px 0 0",
            background: "conic-gradient(from 180deg at 50% 100%, #ff0000 0deg, #ff8800 30deg, #ffff00 60deg, #00cc00 90deg, #0088ff 120deg, #4400cc 150deg, transparent 180deg)",
            mask: "radial-gradient(ellipse 200px 200px at 50% 100%, transparent 65%, black 66%, black 72%, transparent 73%)",
            WebkitMask: "radial-gradient(ellipse 200px 200px at 50% 100%, transparent 65%, black 66%, black 72%, transparent 73%)",
          }}
        />
      </div>

      {/* Hot air balloon 1 */}
      <div
        className="absolute"
        style={{
          top: "6%",
          left: "8%",
          animation: "float-balloon 18s ease-in-out infinite",
        }}
      >
        <HotAirBalloon size={60} colors={["#FF6B35", "#FFD700", "#FF4444"]} />
      </div>

      {/* Hot air balloon 2 - smaller, further away */}
      <div
        className="absolute"
        style={{
          top: "12%",
          left: "18%",
          animation: "float-balloon 22s ease-in-out infinite",
          animationDelay: "-8s",
        }}
      >
        <HotAirBalloon size={36} colors={["#4488FF", "#44CC88", "#66BBFF"]} />
      </div>

      {/* Clouds - uniform fluffy */}
      {CLOUD_DATA.map((c) => (
        <div
          key={c.id}
          className="absolute"
          style={{
            top: c.top,
            animation: `drift-right ${c.speed}s linear infinite`,
            animationDelay: `${c.delay}s`,
          }}
        >
          <FluffyCloud width={c.width} opacity={c.opacity} />
        </div>
      ))}

      {/* Rhythmic wave bands */}
      <div className="absolute left-0 right-0" style={{ top: "66%", height: "8%" }}>
        <svg width="200%" height="100%" viewBox="0 0 2880 60" preserveAspectRatio="none" style={{ position: "absolute", top: 0 }}>
          <path
            d="M0,30 C120,10 240,50 360,30 C480,10 600,50 720,30 C840,10 960,50 1080,30 C1200,10 1320,50 1440,30 C1560,10 1680,50 1800,30 C1920,10 2040,50 2160,30 C2280,10 2400,50 2520,30 C2640,10 2760,50 2880,30 L2880,60 L0,60 Z"
            fill="rgba(255,255,255,0.35)"
            style={{ animation: "wave-shift 4s ease-in-out infinite" }}
          />
        </svg>
        <svg width="200%" height="100%" viewBox="0 0 2880 60" preserveAspectRatio="none" style={{ position: "absolute", top: "8px" }}>
          <path
            d="M0,35 C160,15 320,55 480,35 C640,15 800,55 960,35 C1120,15 1280,55 1440,35 C1600,15 1760,55 1920,35 C2080,15 2240,55 2400,35 C2560,15 2720,55 2880,35 L2880,60 L0,60 Z"
            fill="rgba(255,255,255,0.22)"
            style={{ animation: "wave-shift 5.5s ease-in-out infinite reverse" }}
          />
        </svg>
        <svg width="200%" height="100%" viewBox="0 0 2880 60" preserveAspectRatio="none" style={{ position: "absolute", top: "14px" }}>
          <path
            d="M0,28 C100,45 200,15 300,28 C400,42 500,14 600,28 C700,42 800,14 900,28 C1000,42 1100,14 1200,28 C1300,42 1400,14 1500,28 C1600,42 1700,14 1800,28 C1900,42 2000,14 2100,28 C2200,42 2300,14 2400,28 C2500,42 2600,14 2700,28 C2800,42 2880,25 2880,28 L2880,60 L0,60 Z"
            fill="rgba(180,230,255,0.18)"
            style={{ animation: "wave-shift 7s ease-in-out infinite" }}
          />
        </svg>
        {/* Shimmer line on crest */}
        <div
          className="absolute inset-x-0 top-0 h-[2px]"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 15%, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 65%, rgba(255,255,255,0.6) 85%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: "water-shimmer 6s ease-in-out infinite",
            filter: "blur(1px)",
          }}
        />
      </div>

      {/* Underwater zone */}
      <div
        className="absolute left-0 right-0 bottom-0"
        style={{
          top: "72%",
          background: "linear-gradient(180deg, rgba(0,100,200,0.08) 0%, rgba(0,80,180,0.15) 40%, rgba(0,60,140,0.22) 100%)",
        }}
      />

      {/* Caustic ripples underwater */}
      <div
        className="absolute left-0 right-0 bottom-0"
        style={{
          top: "72%",
          backgroundImage: `
            radial-gradient(ellipse 120px 55px at 12% 28%, rgba(255,255,255,0.1) 0%, transparent 70%),
            radial-gradient(ellipse 150px 65px at 42% 55%, rgba(255,255,255,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 90px 45px at 68% 22%, rgba(255,255,255,0.1) 0%, transparent 70%),
            radial-gradient(ellipse 130px 60px at 85% 65%, rgba(255,255,255,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 100px 50px at 28% 80%, rgba(255,255,255,0.06) 0%, transparent 70%)
          `,
          animation: "caustic 8s ease-in-out infinite alternate",
        }}
      />

      {/* Glossy Bubbles */}
      {bubbles.map((b) => (
        <GlossyBubble key={b.id} bubble={b} />
      ))}

      {/* Clownfish school - longhand animation to avoid mixing with animationDelay */}
      <div className="absolute" style={{ bottom: "14%", animationName: "swim-right", animationDuration: "28s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite", animationDelay: "-3s" }}>
        <ClownFish size={48} flip={false} />
      </div>
      <div className="absolute" style={{ bottom: "7%", animationName: "swim-left", animationDuration: "34s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite", animationDelay: "-14s" }}>
        <ClownFish size={38} flip={true} />
      </div>
      <div className="absolute" style={{ bottom: "20%", animationName: "swim-right", animationDuration: "40s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite", animationDelay: "-22s" }}>
        <ClownFish size={28} flip={false} />
      </div>
      <div className="absolute" style={{ bottom: "4%", animationName: "swim-right", animationDuration: "36s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite", animationDelay: "-9s" }}>
        <ClownFish size={32} flip={false} />
      </div>

      {/* Dolphin leaping */}
      <div className="absolute" style={{ bottom: "28%", animationName: "swim-right", animationDuration: "48s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite", animationDelay: "-6s" }}>
        <GlossyDolphin size={90} />
      </div>
      {/* Second dolphin further back */}
      <div className="absolute" style={{ bottom: "32%", animationName: "swim-left", animationDuration: "55s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite", animationDelay: "-20s" }}>
        <GlossyDolphin size={65} />
      </div>
    </div>
  )
}

/* ---- Cloud layout data ---- */
const CLOUD_DATA = [
  { id: 1, top: "2%", width: 320, opacity: 0.92, speed: 100, delay: -25 },
  { id: 2, top: "10%", width: 240, opacity: 0.78, speed: 125, delay: -70 },
  { id: 3, top: "15%", width: 280, opacity: 0.85, speed: 95, delay: -45 },
  { id: 4, top: "5%", width: 200, opacity: 0.62, speed: 135, delay: -90 },
  { id: 5, top: "20%", width: 260, opacity: 0.72, speed: 110, delay: -10 },
  { id: 6, top: "0%", width: 190, opacity: 0.55, speed: 145, delay: -55 },
  { id: 7, top: "8%", width: 160, opacity: 0.5, speed: 150, delay: -35 },
]

/* ---- Sub-components ---- */

function FluffyCloud({ width, opacity }: { width: number; opacity: number }) {
  const h = width * 0.38
  return (
    <svg width={width} height={h} viewBox="0 0 300 114" fill="none" style={{ opacity }}>
      <defs>
        <radialGradient id="cg" cx="0.5" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="70%" stopColor="white" stopOpacity="0.88" />
          <stop offset="100%" stopColor="white" stopOpacity="0.5" />
        </radialGradient>
      </defs>
      <ellipse cx="150" cy="88" rx="138" ry="24" fill="rgba(180,220,255,0.22)" />
      <ellipse cx="150" cy="78" rx="140" ry="32" fill="url(#cg)" />
      <ellipse cx="90" cy="60" rx="78" ry="52" fill="url(#cg)" />
      <ellipse cx="200" cy="58" rx="74" ry="50" fill="url(#cg)" />
      <ellipse cx="145" cy="42" rx="66" ry="42" fill="white" fillOpacity="0.95" />
      <ellipse cx="110" cy="48" rx="58" ry="38" fill="white" fillOpacity="0.92" />
      <ellipse cx="185" cy="46" rx="56" ry="36" fill="white" fillOpacity="0.9" />
      <ellipse cx="142" cy="28" rx="48" ry="18" fill="white" fillOpacity="0.7" />
    </svg>
  )
}

function HotAirBalloon({ size, colors }: { size: number; colors: [string, string, string] }) {
  const h = size * 1.5
  return (
    <svg width={size} height={h} viewBox="0 0 60 90" fill="none">
      <defs>
        <radialGradient id={`bal-${colors[0]}`} cx="0.35" cy="0.25" r="0.7">
          <stop offset="0%" stopColor="white" stopOpacity="0.5" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Envelope */}
      <ellipse cx="30" cy="28" rx="24" ry="28" fill={colors[0]} />
      {/* Stripes */}
      <path d="M12 16 C12 16, 18 0, 30 0 C30 0, 30 56, 30 56 C18 56, 12 40, 12 28 Z" fill={colors[1]} opacity="0.7" />
      <path d="M48 16 C48 16, 42 0, 30 0 C30 0, 30 56, 30 56 C42 56, 48 40, 48 28 Z" fill={colors[2]} opacity="0.6" />
      {/* Gloss */}
      <ellipse cx="30" cy="28" rx="24" ry="28" fill={`url(#bal-${colors[0]})`} />
      {/* Highlight */}
      <ellipse cx="22" cy="18" rx="8" ry="10" fill="white" fillOpacity="0.3" />
      {/* Ropes */}
      <line x1="18" y1="54" x2="22" y2="70" stroke="#8B6914" strokeWidth="0.7" />
      <line x1="42" y1="54" x2="38" y2="70" stroke="#8B6914" strokeWidth="0.7" />
      {/* Basket */}
      <rect x="22" y="70" width="16" height="10" rx="2" fill="#A0522D" />
      <rect x="22" y="70" width="16" height="3" rx="1" fill="#C4823E" />
    </svg>
  )
}

function GlossyBubble({ bubble: b }: { bubble: Bubble }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "3%",
        left: `${b.left}%`,
        width: b.size,
        height: b.size,
        borderRadius: "50%",
        background: `
          radial-gradient(circle at 28% 22%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.5) 14%, transparent 38%),
          radial-gradient(circle at 72% 78%, rgba(130,210,255,0.25) 0%, transparent 35%),
          radial-gradient(circle at 50% 50%, rgba(210,240,255,0.18) 0%, rgba(200,238,255,0.06) 55%, transparent 100%)
        `,
        border: `${Math.max(0.5, b.size * 0.015)}px solid rgba(255,255,255,0.75)`,
        boxShadow: `
          inset 0 -${b.size * 0.12}px ${b.size * 0.25}px rgba(90,180,240,0.1),
          inset 0 ${b.size * 0.06}px ${b.size * 0.12}px rgba(255,255,255,0.95),
          0 0 ${b.size * 0.15}px rgba(160,220,255,0.06)
        `,
        animation: `float-up ${b.duration}s ease-in-out infinite`,
        animationDelay: `${b.delay}s`,
        opacity: b.opacity,
        ["--drift" as string]: `${b.drift}px`,
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "18%",
          width: b.size * 0.2,
          height: b.size * 0.12,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.4)",
          filter: "blur(1px)",
        }}
      />
    </div>
  )
}

function ClownFish({ size, flip }: { size: number; flip: boolean }) {
  const h = size * 0.7
  const id = `cf-${size}-${flip ? "l" : "r"}`
  return (
    <svg width={size} height={h} viewBox="0 0 90 63" fill="none" style={{ transform: flip ? "scaleX(-1)" : "none" }}>
      <defs>
        <linearGradient id={`${id}-b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF7A2E" />
          <stop offset="40%" stopColor="#FF5722" />
          <stop offset="100%" stopColor="#E64A19" />
        </linearGradient>
        <radialGradient id={`${id}-g`} cx="0.4" cy="0.2" r="0.55">
          <stop offset="0%" stopColor="white" stopOpacity="0.55" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d="M6 31 C-2 20, 0 12, 7 18 C5 23, 5 26, 6 31 Z" fill="#FF8A50" />
      <path d="M6 31 C-2 42, 0 50, 7 44 C5 39, 5 36, 6 31 Z" fill="#FF8A50" />
      <path d="M4 21 C2 18, 1 16, 3 14" stroke="#1a1a1a" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M4 41 C2 44, 1 46, 3 48" stroke="#1a1a1a" strokeWidth="0.8" fill="none" opacity="0.5" />
      <ellipse cx="42" cy="31" rx="34" ry="19" fill={`url(#${id}-b)`} />
      <path d="M58 14 C60 20, 60 42, 58 48" stroke="white" strokeWidth="4.5" fill="none" />
      <path d="M56 13 C58 20, 58 42, 56 49" stroke="#1a1a1a" strokeWidth="0.7" fill="none" opacity="0.4" />
      <path d="M60 15 C62 20, 62 42, 60 47" stroke="#1a1a1a" strokeWidth="0.7" fill="none" opacity="0.4" />
      <path d="M38 13 C40 21, 40 41, 38 49" stroke="white" strokeWidth="4" fill="none" />
      <path d="M36 14 C38 22, 38 40, 36 48" stroke="#1a1a1a" strokeWidth="0.6" fill="none" opacity="0.4" />
      <path d="M40 13 C42 21, 42 41, 40 49" stroke="#1a1a1a" strokeWidth="0.6" fill="none" opacity="0.4" />
      <path d="M20 18 C22 25, 22 37, 20 44" stroke="white" strokeWidth="3.5" fill="none" />
      <path d="M18 19 C20 26, 20 36, 18 43" stroke="#1a1a1a" strokeWidth="0.5" fill="none" opacity="0.35" />
      <path d="M22 18 C24 25, 24 37, 22 44" stroke="#1a1a1a" strokeWidth="0.5" fill="none" opacity="0.35" />
      <path d="M30 12 Q38 2, 50 12" fill="#FF7A2E" stroke="#1a1a1a" strokeWidth="0.6" opacity="0.8" />
      <path d="M32 50 Q38 58, 46 50" fill="#FF7A2E" stroke="#1a1a1a" strokeWidth="0.5" opacity="0.6" />
      <path d="M50 36 Q46 46, 54 44 Q52 40, 50 36 Z" fill="#FF8A50" opacity="0.7" />
      <ellipse cx="42" cy="31" rx="34" ry="19" fill={`url(#${id}-g)`} />
      <circle cx="66" cy="27" r="5" fill="white" />
      <circle cx="67.5" cy="27" r="3.2" fill="#1a1a1a" />
      <circle cx="68.5" cy="25.5" r="1.3" fill="white" />
      <path d="M76 31 Q78 33, 76 35" stroke="#BF360C" strokeWidth="0.8" fill="none" opacity="0.5" />
    </svg>
  )
}

function GlossyDolphin({ size }: { size: number }) {
  const h = size * 0.5
  return (
    <svg width={size} height={h} viewBox="0 0 130 65" fill="none">
      <defs>
        <linearGradient id="db" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6abfed" />
          <stop offset="45%" stopColor="#4a9fcf" />
          <stop offset="100%" stopColor="#2d7aaa" />
        </linearGradient>
        <radialGradient id="dg" cx="0.4" cy="0.18" r="0.65">
          <stop offset="0%" stopColor="white" stopOpacity="0.5" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d="M6 33 C-3 24, -1 16, 6 22 C4 26, 4 30, 6 33 Z" fill="#5090b8" />
      <path d="M6 33 C-3 42, -1 50, 6 44 C4 40, 4 36, 6 33 Z" fill="#5090b8" />
      <path d="M6 33 C14 22, 30 14, 54 15 C74 16, 92 22, 105 28 C112 31, 116 33, 114 36 C110 40, 94 42, 74 40 C52 38, 28 44, 6 33 Z" fill="url(#db)" />
      <path d="M6 33 C14 22, 30 14, 54 15 C74 16, 92 22, 105 28 C112 31, 116 33, 114 36 C110 40, 94 42, 74 40 C52 38, 28 44, 6 33 Z" fill="url(#dg)" />
      <path d="M22 40 C38 46, 60 44, 85 39 C95 37, 104 34, 110 32" stroke="#a0d4ee" strokeWidth="4" fill="none" opacity="0.5" strokeLinecap="round" />
      <path d="M56 15 Q58 3, 66 13" fill="#3f8ab4" />
      <path d="M78 36 Q74 46, 84 44 Q82 40, 78 36 Z" fill="#5090b8" opacity="0.7" />
      <circle cx="102" cy="29" r="2.8" fill="white" />
      <circle cx="103" cy="29" r="1.6" fill="#1a2a3a" />
      <circle cx="103.5" cy="28.3" r="0.7" fill="white" />
      <path d="M114 34 Q120 32, 126 29" stroke="#5090b8" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      <path d="M110 33 Q114 36, 116 34" stroke="#3a7fa0" strokeWidth="0.7" fill="none" opacity="0.5" />
    </svg>
  )
}
