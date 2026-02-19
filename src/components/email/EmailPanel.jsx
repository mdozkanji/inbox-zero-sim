import { useSimulationStore } from "../../store/useSimulationStore";

function EmailPanel() {
  const updateThreatLevel = useSimulationStore(
    (state) => state.updateThreatLevel
  );

  return (
    <div className="flex-1 bg-gray-700 p-6 overflow-auto">
      <div className="bg-gray-800 rounded-lg h-full p-6 shadow-inner">
        <h2 className="text-2xl font-semibold mb-4">Inbox</h2>

        <div className="text-gray-400">
          Your emails will appear here.
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