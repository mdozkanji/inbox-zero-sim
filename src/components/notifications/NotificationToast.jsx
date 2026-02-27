import { useState, useEffect } from "react";

const TOAST_COLORS = {
  info:    { bg: "#1e3a5f", border: "#2d6aad",    text: "#93c5fd", dot: "#3b82f6" },
  success: { bg: "#14402a", border: "#22c55e44",  text: "#86efac", dot: "#22c55e" },
  danger:  { bg: "#4a1515", border: "#ef444466",  text: "#fca5a5", dot: "#ef4444" },
  warning: { bg: "#3d2e0a", border: "#f59e0b44",  text: "#fcd34d", dot: "#f59e0b" },
};

function ToastItem({ notification, onDismiss }) {
  const [visible, setVisible] = useState(false);
  const c = TOAST_COLORS[notification.type] || TOAST_COLORS.info;

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss(notification.id), 300);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: "8px",
        padding: "12px 14px",
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(20px)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
      }}
    >
      <div
        style={{
          width: "7px",
          height: "7px",
          borderRadius: "50%",
          background: c.dot,
          marginTop: "5px",
          flexShrink: 0,
          boxShadow: `0 0 6px ${c.dot}`,
        }}
      />
      <div style={{ flex: 1 }}>
        <div
          style={{
            color: c.text,
            fontSize: "12.5px",
            lineHeight: "1.5",
            fontFamily: "monospace",
          }}
        >
          {notification.message}
        </div>
      </div>
      <button
        onClick={() => onDismiss(notification.id)}
        style={{
          background: "none",
          border: "none",
          color: c.text,
          cursor: "pointer",
          padding: "0",
          opacity: 0.6,
          fontSize: "14px",
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        ×
      </button>
    </div>
  );
}

export default function NotificationToast({ notifications, removeNotification }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "44px",
        right: "16px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "340px",
      }}
    >
      {notifications.map((n) => (
        <ToastItem key={n.id} notification={n} onDismiss={removeNotification} />
      ))}
    </div>
  );
}
