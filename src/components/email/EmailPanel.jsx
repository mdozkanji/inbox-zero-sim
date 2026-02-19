function EmailPanel() {
  return (
    <div className="flex-1 bg-gray-700 p-6 overflow-auto">
      <div className="bg-gray-800 rounded-lg h-full p-6 shadow-inner">
        <h2 className="text-2xl font-semibold mb-4">Inbox</h2>

        <div className="text-gray-400">
          Your emails will appear here.
        </div>
      </div>
    </div>
  );
}

export default EmailPanel;