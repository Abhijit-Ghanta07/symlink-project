import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "../includes/includes.js";
function RootLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />
        {/* Main Content */}
        <main className="flex-1 p-4 bg-gray-100 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default RootLayout;
