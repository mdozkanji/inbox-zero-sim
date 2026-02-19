import { useSimulationStore } from "../../store/useSimulationStore";
import { emails } from "../../data/emails"
import { useState } from "react"

function EmailPanel() {
  const updateThreatLevel = useSimulationStore(
    (state) => state.updateThreatLevel
  );

  const [selectedEmail, setSelectedEmail] = useState(null)
  const [emailList, setEmailList] = useState(
    emails.map(email => ({
      ...email,
      isRead: false
    }))
  )

  return (
    <div className="flex-1 bg-gray-700 p-6 overflow-auto">
      <div className="bg-gray-800 rounded-lg h-full p-6 shadow-inner">
        <h2 className="text-2xl font-semibold mb-4">Inbox</h2>

        <div className="email-panel">
          <div className="email-list">
            {emailList.map((email) => (
              <div
                key={email.id}
                className={`
                  email-item
                  p-3 rounded cursor-pointer transition
                  ${selectedEmail?.id === email.id ? "bg-gray-600" : "bg-gray-700 hover:bg-gray-600"}
                `}
                onClick={() => {
                  setSelectedEmail(email)

                  setEmailList(prev =>
                    prev.map(e =>
                      e.id === email.id
                        ? { ...e, isRead: true }
                        : e
                    )
                  )
                }}
              >
                <strong className={email.isRead ? "font-normal" : "font-bold"}>
                  {email.subject}
                </strong>
                <p className={email.isRead ? "text-gray-400" : "text-white"}>
                  {email.preview}
                </p>
                <small>{email.from}</small>
                {!email.isRead && (
                  <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                )}
              </div>
            ))}
          </div>

          <div className="email-viewer">
            {selectedEmail ? (
              <>
                <h2>{selectedEmail.subject}</h2>
                <p><strong>From:</strong> {selectedEmail.from}</p>
                <hr />
                <p>{selectedEmail.body}</p>
              </>
            ) : (
              <p>Select an email to view</p>
            )}
          </div>
        </div>

        <button
          onClick={() => updateThreatLevel(10)}
          className="mt-6 px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
        >
          Simulate Threat +10
        </button>
      </div>
    </div>
  );
}

export default EmailPanel;