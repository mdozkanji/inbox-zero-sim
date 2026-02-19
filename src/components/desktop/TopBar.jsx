function TopBar() {
  return (
    <div className="h-12 bg-gray-900 border-b border-gray-700 flex items-center justify-between px-4 shadow-md">
      <div className="font-semibold tracking-wide">
        Inbox Zero Simulation
      </div>

      <div className="text-sm text-gray-400">
        09:00
      </div>
    </div>
  );
}

export default TopBar;