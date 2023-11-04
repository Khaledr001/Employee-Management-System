import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navBar";
import SideBar from "./components/sideBar";
import { useAuth } from "./hooks/useAuth";
import Dashboard from "./pages/dashboard";
import Login from "./pages/authentication/login";

function App() {
  const { isLogin } = useAuth();
  const location = useLocation();
  return (
    <>
      {isLogin() ? (
        <>
          <Navbar />
          <div className="flex h-full min-h-[94vh]">
            {/* sideBar Component */}
            <>
              <div>
                <SideBar />
              </div>
              <div className="w-full py-5 px-2 md:px-4 lg:px-5">
                {location.pathname === "/" ? <Dashboard /> : <Outlet />}
              </div>
            </>
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
