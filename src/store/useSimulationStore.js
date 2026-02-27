import { create } from "zustand";
import RAW_EMAILS from "../data/emails";

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

function buildInitialEmailStates(emails) {
  const states = {};
  emails.forEach((e) => {
    states[e.id] = { isRead: false, isDeleted: false, decision: null };
  });
  return states;
}

const useSimulationStore = create((set, get) => ({
  // ── Emails ──────────────────────────────────────
  emails: RAW_EMAILS,
  emailStates: buildInitialEmailStates(RAW_EMAILS),
  selectedId: null,

  selectEmail: (id) => {
    set((state) => ({
      selectedId: id,
      emailStates: {
        ...state.emailStates,
        [id]: { ...state.emailStates[id], isRead: true },
      },
    }));
  },

  applyEmailAction: (emailId, actionId) => {
    set((state) => ({
      emailStates: {
        ...state.emailStates,
        [emailId]: {
          ...state.emailStates[emailId],
          decision: actionId,
          isDeleted:
            actionId === "delete"
              ? true
              : state.emailStates[emailId].isDeleted,
        },
      },
      selectedId: actionId === "delete" ? null : state.selectedId,
    }));
  },

  // Future hook: inject new emails dynamically (e.g. from a time-based event engine)
  injectEmail: (email) => {
    set((state) => ({
      emails: [...state.emails, email],
      emailStates: {
        ...state.emailStates,
        [email.id]: { isRead: false, isDeleted: false, decision: null },
      },
    }));
  },

  // ── Threat Level ─────────────────────────────────
  threatLevel: 0,

  updateThreatLevel: (amount) => {
    set((state) => ({
      threatLevel: Math.max(0, Math.min(100, state.threatLevel + amount)),
    }));
  },

  // ── Notifications ────────────────────────────────
  notifications: [],

  addNotification: (message, type = "info") => {
    const id = generateId();
    set((state) => ({
      notifications: [...state.notifications, { id, message, type }],
    }));
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },
}));

export default useSimulationStore;
