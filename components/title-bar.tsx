import Link from "next/link"

interface TitleBarProps {
  title: string
  backHref?: string
}

export function TitleBar({ title, backHref }: TitleBarProps) {
  return (
    <div
      className="flex items-center justify-between px-5 py-3"
      style={{
        background: "linear-gradient(180deg, var(--skin-title-start) 0%, var(--skin-title-mid) 45%, var(--skin-title-mid) 55%, var(--skin-title-end) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1.5px solid rgba(255,255,255,0.8)",
        borderBottom: "1px solid rgba(255,255,255,0.4)",
        borderRadius: "16px 16px 0 0",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.95), 0 4px 16px rgba(0,100,180,0.1)",
      }}
    >
      <div className="flex items-center gap-3">
        {backHref && (
          <Link
            href={backHref}
            className="chrome-btn flex items-center justify-center w-8 h-8 rounded-xl text-sm"
            aria-label="Back"
          >
            {"\u25C0"}
          </Link>
        )}
        <span
          className="text-sm font-bold tracking-wide"
          style={{
            color: "#ffffff",
            textShadow: "0 1px 2px rgba(0,60,120,0.3), 0 0 10px rgba(255,255,255,0.3)",
          }}
        >
          {title}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] leading-none font-bold"
          style={{
            background: "linear-gradient(180deg, #fee066 0%, #f5c842 40%, #e0a820 100%)",
            border: "1px solid rgba(180,130,0,0.5)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), 0 1px 3px rgba(0,0,0,0.15)",
            color: "#7a5a00",
          }}
          aria-label="Minimize"
        >
          -
        </button>
        <button
          className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] leading-none font-bold"
          style={{
            background: "linear-gradient(180deg, #86e086 0%, #5dd85d 40%, #3cb83c 100%)",
            border: "1px solid rgba(0,130,0,0.5)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), 0 1px 3px rgba(0,0,0,0.15)",
            color: "#1a5a1a",
          }}
          aria-label="Maximize"
        >
          +
        </button>
        <button
          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] leading-none font-bold"
          style={{
            background: "linear-gradient(180deg, #ff8888 0%, #ff5555 40%, #e04040 100%)",
            border: "1px solid rgba(180,0,0,0.5)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), 0 1px 3px rgba(0,0,0,0.15)",
            color: "#600",
          }}
          aria-label="Close"
        >
          x
        </button>
      </div>
    </div>
  )
}
