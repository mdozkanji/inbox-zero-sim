export default function TopBar({ time, date, threatLevel }) {
  const pct = Math.min(100, threatLevel);
  const statusColor =
    pct >= 60 ? "#ef4444" : pct >= 30 ? "#f59e0b" : "#22c55e";

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "28px",
        background: "rgba(18,20,26,0.96)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        zIndex: 100,
        fontFamily: "monospace",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#e95420",
            boxShadow: "0 0 6px rgba(233,84,32,0.6)",
          }}
        />
        <span style={{ color: "#64748b", fontSize: "11px", letterSpacing: "0.5px" }}>
          ACME-CORP-WS-07
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: statusColor,
              boxShadow: `0 0 5px ${statusColor}`,
            }}
          />
          <span
            style={{ color: statusColor, fontSize: "10px", letterSpacing: "1px" }}
          >
            SYS.SECURE
          </span>
        </div>
        <span style={{ color: "#64748b", fontSize: "11px" }}>{date}</span>
        <span style={{ color: "#e2e8f0", fontSize: "11px", fontWeight: 600 }}>
          {time}
        </span>
      </div>
    </div>
  );
}
