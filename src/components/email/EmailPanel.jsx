import { useState } from "react";
import ThreatMeter from "./ThreatMeter";

// ── Icons ────────────────────────────────────────────────────────────────────

function MailIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

// ── EmailListItem ─────────────────────────────────────────────────────────────

function EmailListItem({ email, isSelected, isUnread, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "12px 14px",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        cursor: "pointer",
        background: isSelected
          ? "rgba(233,84,32,0.1)"
          : hovered
          ? "rgba(255,255,255,0.03)"
          : "transparent",
        borderLeft: isSelected
          ? "2px solid #e95420"
          : "2px solid transparent",
        transition: "all 0.15s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
        {isUnread && (
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#3b82f6",
              flexShrink: 0,
              marginTop: "5px",
              boxShadow: "0 0 5px rgba(59,130,246,0.5)",
            }}
          />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              color: isUnread ? "#e2e8f0" : "#94a3b8",
              fontSize: "12px",
              fontWeight: isUnread ? 600 : 400,
              fontFamily: "monospace",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {email.from}
          </div>
          <div
            style={{
              color: isUnread ? "#cbd5e1" : "#64748b",
              fontSize: "11.5px",
              fontWeight: isUnread ? 600 : 400,
              marginTop: "2px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontFamily: "sans-serif",
            }}
          >
            {email.subject}
          </div>
          <div
            style={{
              color: "#475569",
              fontSize: "11px",
              marginTop: "3px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontFamily: "sans-serif",
            }}
          >
            {email.preview}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ActionButton ──────────────────────────────────────────────────────────────

function ActionButton({ action, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "6px 14px",
        borderRadius: "5px",
        border: `1px solid ${isActive ? action.color : action.border}`,
        background: isActive || hovered ? action.bg : "transparent",
        color: action.color,
        fontSize: "12px",
        fontFamily: "monospace",
        cursor: "pointer",
        transition: "all 0.15s ease",
        letterSpacing: "0.3px",
        transform: hovered ? "translateY(-1px)" : "none",
        boxShadow: isActive ? `0 0 10px ${action.bg}` : "none",
      }}
    >
      {action.label}
    </button>
  );
}

// ── EmailViewer ───────────────────────────────────────────────────────────────

const EMAIL_ACTIONS = [
  { id: "reply",  label: "Reply",  color: "#3b82f6", bg: "rgba(59,130,246,0.1)",  border: "rgba(59,130,246,0.3)" },
  { id: "ignore", label: "Ignore", color: "#94a3b8", bg: "rgba(148,163,184,0.08)", border: "rgba(148,163,184,0.2)" },
  { id: "delete", label: "Delete", color: "#ef4444", bg: "rgba(239,68,68,0.1)",   border: "rgba(239,68,68,0.3)" },
];

const PHISHING_ACTIONS = [
  ...EMAIL_ACTIONS,
  { id: "open-link", label: "Open Link", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)" },
];

function EmailViewer({ email, state, onAction }) {
  const actions = email.isPhishing ? PHISHING_ACTIONS : EMAIL_ACTIONS;
  const currentDecision = state?.decision;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div
        style={{
          padding: "20px 24px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            color: "#f1f5f9",
            fontSize: "16px",
            fontWeight: 600,
            fontFamily: "sans-serif",
            marginBottom: "12px",
            lineHeight: 1.3,
          }}
        >
          {email.subject}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "rgba(233,84,32,0.15)",
              border: "1px solid rgba(233,84,32,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#e95420",
              fontSize: "13px",
              fontFamily: "monospace",
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {email.from[0].toUpperCase()}
          </div>
          <div style={{ color: "#94a3b8", fontSize: "12px", fontFamily: "monospace" }}>
            {email.from}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: "24px", overflowY: "auto" }}>
        <pre
          style={{
            color: "#94a3b8",
            fontSize: "13px",
            lineHeight: "1.75",
            fontFamily: "monospace",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            margin: 0,
          }}
        >
          {email.body}
        </pre>
      </div>

      {/* Action bar */}
      <div
        style={{
          padding: "14px 24px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(0,0,0,0.2)",
          display: "flex",
          gap: "8px",
          alignItems: "center",
        }}
      >
        {currentDecision && (
          <div
            style={{
              marginRight: "auto",
              color: "#475569",
              fontSize: "11px",
              fontFamily: "monospace",
              letterSpacing: "0.5px",
            }}
          >
            ACTION: {currentDecision.toUpperCase()}
          </div>
        )}
        {actions.map((action) => (
          <ActionButton
            key={action.id}
            action={action}
            isActive={currentDecision === action.id}
            onClick={() => onAction(email.id, action.id)}
          />
        ))}
      </div>
    </div>
  );
}

// ── EmptyViewer ───────────────────────────────────────────────────────────────

function EmptyViewer() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: "12px",
      }}
    >
      <MailIcon size={32} color="#1e293b" />
      <div
        style={{
          color: "#334155",
          fontSize: "12px",
          fontFamily: "monospace",
          letterSpacing: "1px",
        }}
      >
        SELECT AN EMAIL TO READ
      </div>
    </div>
  );
}

// ── EmailPanel (root export) ──────────────────────────────────────────────────

export default function EmailPanel({
  emails,
  emailStates,
  selectedId,
  onSelect,
  onAction,
  threatLevel,
}) {
  const selected = emails.find((e) => e.id === selectedId);
  const selectedState = selectedId ? emailStates[selectedId] : null;
  const visibleEmails = emails.filter((e) => !emailStates[e.id]?.isDeleted);
  const unreadCount = visibleEmails.filter((e) => !emailStates[e.id]?.isRead).length;

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        background: "#0f1117",
        borderRadius: "8px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03)",
      }}
    >
      {/* Left: email list */}
      <div
        style={{
          width: "280px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          background: "#0d0f14",
        }}
      >
        {/* List header */}
        <div
          style={{
            padding: "16px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                color: "#e2e8f0",
                fontSize: "14px",
                fontWeight: 600,
                fontFamily: "monospace",
              }}
            >
              Inbox
            </div>
            <div
              style={{
                color: "#475569",
                fontSize: "11px",
                marginTop: "1px",
                fontFamily: "monospace",
              }}
            >
              {unreadCount} unread
            </div>
          </div>
          <div
            style={{
              background: "rgba(233,84,32,0.15)",
              border: "1px solid rgba(233,84,32,0.3)",
              borderRadius: "4px",
              padding: "3px 7px",
              color: "#e95420",
              fontSize: "10px",
              fontFamily: "monospace",
            }}
          >
            {visibleEmails.length}
          </div>
        </div>

        <ThreatMeter threatLevel={threatLevel} />

        {/* List items */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {visibleEmails.length === 0 ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "120px",
                color: "#334155",
                fontSize: "12px",
                fontFamily: "monospace",
              }}
            >
              Inbox empty
            </div>
          ) : (
            visibleEmails.map((email) => (
              <EmailListItem
                key={email.id}
                email={email}
                isSelected={email.id === selectedId}
                isUnread={!emailStates[email.id]?.isRead}
                onClick={() => onSelect(email.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* Right: email viewer */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#0f1117" }}>
        {selected && !selectedState?.isDeleted ? (
          <EmailViewer
            email={selected}
            state={selectedState}
            onAction={onAction}
          />
        ) : (
          <EmptyViewer />
        )}
      </div>
    </div>
  );
}
