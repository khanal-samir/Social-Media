import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
// sticky top-0 h-screen to make it fixed
import { Nav, Sidebar } from "./components";
function App() {
  const location = useLocation();
  const hideHeaderFooter =
    location.pathname === "/login" || location.pathname === "/signup";
  return (
    <div>
      {hideHeaderFooter ? (
        <div>
          <Outlet />
        </div>
      ) : (
        <div className="grid grid-cols-6 sm:grid-cols-12 lg:px-16">
          <div className="col-span-1 sm:col-span-3 sticky top-0 h-screen">
            <Nav />
          </div>

          <div className="col-span-5 sm:col-span-6 overflow-y-auto">
            <Outlet />
          </div>

          <div className="hidden sm:block sm:col-span-3 sticky top-0 h-screen">
            <Sidebar />
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default App;
