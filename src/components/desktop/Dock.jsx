import { useState } from "react";

function MailIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function TerminalIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function FilesIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  );
}

function DockIcon({ app }) {
  const [hovered, setHovered] = useState(false);
  const Icon = app.icon;

  return (
    <div style={{ position: "relative" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: app.active
            ? "rgba(233,84,32,0.2)"
            : hovered
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0.04)",
          border: app.active
            ? "1px solid rgba(233,84,32,0.4)"
            : "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: app.active ? "default" : "not-allowed",
          transition: "all 0.2s ease",
          transform: hovered ? "scale(1.05)" : "scale(1)",
        }}
      >
        <Icon size={18} color={app.active ? "#e95420" : "#475569"} />
      </div>

      {app.active && (
        <div
          style={{
            position: "absolute",
            left: "-3px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "3px",
            height: "20px",
            background: "#e95420",
            borderRadius: "0 2px 2px 0",
            boxShadow: "0 0 6px rgba(233,84,32,0.6)",
          }}
        />
      )}

      {hovered && (
        <div
          style={{
            position: "absolute",
            left: "52px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.8)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "4px",
            padding: "3px 8px",
            whiteSpace: "nowrap",
            fontSize: "11px",
            color: "#e2e8f0",
            fontFamily: "monospace",
            pointerEvents: "none",
          }}
        >
          {app.label}
        </div>
      )}
    </div>
  );
}

const DOCK_APPS = [
  { id: "mail", label: "Mail", icon: MailIcon, active: true },
  { id: "terminal", label: "Terminal", icon: TerminalIcon, active: false },
  { id: "files", label: "Files", icon: FilesIcon, active: false },
];

export default function Dock() {
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: "28px",
        bottom: 0,
        width: "56px",
        background: "rgba(18,20,26,0.92)",
        backdropFilter: "blur(12px)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "16px",
        gap: "8px",
        zIndex: 90,
      }}
    >
      {DOCK_APPS.map((app) => (
        <DockIcon key={app.id} app={app} />
      ))}
    </div>
  );
}
