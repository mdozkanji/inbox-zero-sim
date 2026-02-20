import { useEffect } from "react"
import { useSimulationStore } from "../../store/useSimulationStore"

function NotificationCenter() {
  const notifications = useSimulationStore(state => state.notifications)
  const removeNotification = useSimulationStore(state => state.removeNotification)

  useEffect(() => {
    if (notifications.length === 0) return

    const timers = notifications.map(notification =>
      setTimeout(() => {
        removeNotification(notification.id)
      }, 4000)
    )

    return () => timers.forEach(clearTimeout)
  }, [notifications, removeNotification])

  return (
    <div className="fixed top-4 right-4 space-y-3 z-50">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`px-4 py-3 rounded shadow-lg text-white min-w-[250px]
            ${notification.type === "danger" ? "bg-red-600" :
              notification.type === "success" ? "bg-green-600" :
              "bg-blue-600"}`}
        >
          <div className="flex justify-between items-center">
            <span>{notification.message}</span>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-3 text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NotificationCenter;