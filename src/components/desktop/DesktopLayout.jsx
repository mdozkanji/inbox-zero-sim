function DesktopLayout({ children }) {
  return (
    <div className="h-screen bg-gray-800 text-white flex flex-col">
      {children}
    </div>
  );
}

export default DesktopLayout;