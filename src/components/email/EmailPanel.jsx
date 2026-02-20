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
      isRead: false,
      isDeleted: false,
      decision: null
    }))
  )

  const handleAction = (actionType) => {
    if (!selectedEmail) return;

    console.log(`Action taken: ${actionType} on ${selectedEmail.subject}`);

    setEmailList(prev => {
      const updated = prev.map(email =>
        email.id === selectedEmail.id
          ? {
              ...email,
              decision: actionType,
              isDeleted: actionType === "delete"
            }
          : email
      );

      const updatedSelected = updated.find(e => e.id === selectedEmail.id);

      if (actionType === "delete") {
        setSelectedEmail(null);
      } else {
        setSelectedEmail(updatedSelected);
      }

      return updated;
    });
  };

  return (
    <div className="flex-1 bg-gray-700 p-6 overflow-auto">
      <div className="bg-gray-800 rounded-lg h-full p-6 shadow-inner">
        <h2 className="text-2xl font-semibold mb-4">Inbox</h2>

        <div className="email-panel">
          <div className="email-list">
            {emailList
              .filter(email => !email.isDeleted)
              .map((email) => (
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
                {selectedEmail.decision && (
                  <p className="mt-2 text-sm text-green-400">
                    Action Taken: {selectedEmail.decision}
                  </p>
                )}
                <p><strong>From:</strong> {selectedEmail.from}</p>
                <hr />
                <p>{selectedEmail.body}</p>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => handleAction("reply")}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                  >
                    Reply
                  </button>

                  <button
                    onClick={() => handleAction("ignore")}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
                  >
                    Ignore
                  </button>

                  <button
                    onClick={() => handleAction("delete")}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                  >
                    Delete
                  </button>

                  {selectedEmail?.isPhishing && (
                    <button
                      onClick={() => handleAction("open-link")}
                      className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded"
                    >
                      Open Link
                    </button>
                  )}
                </div>
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