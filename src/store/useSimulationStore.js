import { create } from "zustand";

export const useSimulationStore = create((set) => ({
  // ===== STATE =====
  currentTime: "09:00",
  securityScore: 100,
  threatLevel: 0,
  inbox: [],
  notifications: [],
  flags: {},

  // ===== ACTIONS =====
  setInbox: (emails) =>
    set(() => ({
      inbox: emails,
    })),

  addNotification: (message, type = "info") =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          id: Date.now(),
          message,
          type
        }
      ]
    })),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id)
    })),

  updateThreatLevel: (amount) =>
    set((state) => ({
      threatLevel: state.threatLevel + amount,
    })),

  updateSecurityScore: (amount) =>
    set((state) => ({
      securityScore: state.securityScore + amount,
    })),

  setFlag: (key, value) =>
    set((state) => ({
      flags: {
        ...state.flags,
        [key]: value,
      },
    })),
}));