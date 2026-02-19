import DesktopLayout from "./components/desktop/DesktopLayout";
import TopBar from "./components/desktop/TopBar";
import Sidebar from "./components/desktop/Sidebar";
import EmailPanel from "./components/email/EmailPanel";
import NotificationCenter from "./components/notifications/NotificationCenter";

function App() {
  return (
    <DesktopLayout>
      <TopBar />
      <div className="flex flex-1">
        <Sidebar />
        <EmailPanel />
      </div>
      <NotificationCenter />
    </DesktopLayout>
  );
}

export default App;