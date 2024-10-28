import { Outlet, useLocation } from "react-router-dom";

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
        <div className="min-h-screen grid grid-cols-6 sm:grid-cols-12 lg:px-16">
          <div className="col-span-1 sm:col-span-2">
            <Nav />
          </div>

          <div className="col-span-5 sm:col-span-7">
            <Outlet />
          </div>

          <div className="hidden sm:block sm:col-span-3">
            <Sidebar />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
