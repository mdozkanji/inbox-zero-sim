import { useSimulationStore } from "../../store/useSimulationStore";

function TopBar() {
  const threatLevel = useSimulationStore((state) => state.threatLevel);
  const securityScore = useSimulationStore((state) => state.securityScore);

  return (
    <div className="h-12 bg-gray-900 border-b border-gray-700 flex items-center justify-between px-4 shadow-md">
      <div className="font-semibold tracking-wide">
        Inbox Zero Simulation
      </div>

      <div className="flex items-center space-x-6 text-sm">
        <span className="text-gray-400">
          Threat: <span className="text-red-400">{threatLevel}</span>
        </span>

        <span className="text-gray-400">
          Security: <span className="text-green-400">{securityScore}</span>
        </span>

        <span className="text-gray-400">
          09:00
        </span>
      </div>
    </div>
  );
}

export default TopBar;