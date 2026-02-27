import { useEffect, useState } from "react";
import TopBar from "./components/desktop/TopBar";
import Dock from "./components/desktop/Dock";
import Desktop from "./components/desktop/Desktop";
import NotificationToast from "./components/NotificationToast";
import useSimulationStore from "./store/useSimulationStore";

function formatTime(date) {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

// Threat scoring rules
const THREAT_RULES = {
  phishing: {
    "open-link": +10,
    reply:       +15,
    ignore:      +5,
    delete:      -5,
  },
  legitimate: {
    delete: +5,
  },
};

export default function App() {
  const [time, setTime] = useState(formatTime(new Date()));
  const [date]          = useState(formatDate(new Date()));

  const {
    emails,
    emailStates,
    selectedId,
    selectEmail,
    applyEmailAction,
    threatLevel,
    updateThreatLevel,
    notifications,
    addNotification,
    removeNotification,
  } = useSimulationStore();

  // Clock tick every 10s (static feel, ready for live clock later)
  useEffect(() => {
    const interval = setInterval(() => setTime(formatTime(new Date())), 10_000);
    return () => clearInterval(interval);
  }, []);

  // Boot notification
  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification(
        "Inbox loaded. Stay alert — phishing detected in recent campaigns.",
        "info"
      );
    }, 800);
    return () => clearTimeout(timer);
  }, [addNotification]);

  // Watch for threat reaching 100
  useEffect(() => {
    if (threatLevel >= 100) {
      addNotification(
        "CRITICAL: System integrity compromised. Threat level maxed.",
        "danger"
      );
    }
  }, [threatLevel >= 100]);

  const handleSelect = (id) => {
    selectEmail(id);
  };

  const handleAction = (emailId, actionId) => {
    const email = emails.find((e) => e.id === emailId);
    if (!email) return;

    console.log(`[ACTION] id=${emailId} action=${actionId} isPhishing=${email.isPhishing}`);

    applyEmailAction(emailId, actionId);

    // Determine threat delta and notification
    if (email.isPhishing) {
      const delta = THREAT_RULES.phishing[actionId];
      if (delta !== undefined) updateThreatLevel(delta);

      if (actionId === "open-link") {
        addNotification(
          "WARNING: Phishing link accessed. Credentials may be compromised.",
          "danger"
        );
      } else if (actionId === "delete") {
        addNotification("Phishing email deleted. Threat mitigated.", "success");
      } else if (actionId === "reply") {
        addNotification(
          "ALERT: Reply sent to phishing address. High risk exposure.",
          "danger"
        );
      } else if (actionId === "ignore") {
        addNotification(
          "Phishing email left unaddressed. Threat persists.",
          "warning"
        );
      }
    } else {
      const delta = THREAT_RULES.legitimate[actionId];
      if (delta !== undefined) updateThreatLevel(delta);

      if (actionId === "delete") {
        addNotification(
          "Legitimate email deleted. Workflow disruption detected.",
          "warning"
        );
      } else if (actionId === "reply") {
        addNotification("Reply sent.", "success");
      }
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#070a0e",
        backgroundImage: `
          radial-gradient(ellipse at 20% 50%, rgba(233,84,32,0.04) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 20%, rgba(30,58,95,0.06) 0%, transparent 50%)
        `,
        fontFamily: "monospace",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <TopBar time={time} date={date} threatLevel={threatLevel} />
      <Dock />
      <Desktop
        emails={emails}
        emailStates={emailStates}
        selectedId={selectedId}
        onSelect={handleSelect}
        onAction={handleAction}
        threatLevel={threatLevel}
      />
      <NotificationToast
        notifications={notifications}
        removeNotification={removeNotification}
      />
    </div>
  );
}
