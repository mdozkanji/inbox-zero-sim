import EmailPanel from "./EmailPanel";

export default function Desktop({ emails, emailStates, selectedId, onSelect, onAction, threatLevel }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "28px",
        left: "56px",
        right: 0,
        bottom: 0,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Window chrome */}
      <div
        style={{
          height: "36px",
          background: "rgba(13,15,20,0.95)",
          borderRadius: "8px 8px 0 0",
          border: "1px solid rgba(255,255,255,0.07)",
          borderBottom: "none",
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          gap: "8px",
          flexShrink: 0,
        }}
      >
        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ef4444", opacity: 0.8 }} />
        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#f59e0b", opacity: 0.8 }} />
        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#22c55e", opacity: 0.8 }} />
        <div
          style={{
            marginLeft: "12px",
            color: "#475569",
            fontSize: "11px",
            fontFamily: "monospace",
          }}
        >
          Mail — Inbox
        </div>
      </div>

      {/* Email application */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <EmailPanel
          emails={emails}
          emailStates={emailStates}
          selectedId={selectedId}
          onSelect={onSelect}
          onAction={onAction}
          threatLevel={threatLevel}
        />
      </div>
    </div>
  );
}
