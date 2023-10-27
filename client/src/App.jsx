import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navBar";
import SideBar from "./components/sideBar";
import { useAuth } from "./hooks/useAuth";
import Dashboard from "./pages/dashboard";

function App() {
  const { isLogin } = useAuth();
  const location = useLocation();
  return (
    <>
      <Navbar />
      <div className="flex h-full min-h-[94vh]">
        {/* sideBar Component */}
        {isLogin() ? (
          <>
            <div>
              <SideBar />
            </div>
            <div className="w-full py-5 px-2 md:px-4 lg:px-5">
              {location.pathname == "/" ? <Dashboard /> : <Outlet />}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default App;
