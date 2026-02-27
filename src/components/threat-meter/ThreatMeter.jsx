export default function ThreatMeter({ threatLevel }) {
  const pct = Math.min(100, Math.max(0, threatLevel));
  const color =
    pct >= 60 ? "#ef4444" : pct >= 30 ? "#f59e0b" : "#22c55e";
  const label =
    pct >= 60 ? "HIGH" : pct >= 30 ? "ELEVATED" : "LOW";
  const glowColor =
    pct >= 60
      ? "rgba(239,68,68,0.3)"
      : pct >= 30
      ? "rgba(245,158,11,0.3)"
      : "rgba(34,197,94,0.3)";

  return (
    <div
      style={{
        padding: "12px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <span
          style={{
            color: "#94a3b8",
            fontSize: "10px",
            letterSpacing: "1.5px",
            fontFamily: "monospace",
          }}
        >
          THREAT LEVEL
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              color,
              fontSize: "10px",
              fontFamily: "monospace",
              letterSpacing: "1px",
              fontWeight: 700,
            }}
          >
            {label}
          </span>
          <span
            style={{ color, fontSize: "11px", fontFamily: "monospace" }}
          >
            {pct}%
          </span>
        </div>
      </div>

      <div
        style={{
          height: "4px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: color,
            borderRadius: "2px",
            boxShadow: `0 0 8px ${glowColor}`,
            transition:
              "width 0.6s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s ease",
          }}
        />
      </div>
    </div>
  );
}
