function DesktopLayout({ children }) {
  return (
    <div className="h-screen w-screen bg-[#1f2937] text-gray-100 overflow-hidden">
      {children}
    </div>
  );
}

export default DesktopLayout;