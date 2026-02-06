import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar";


const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left - 20% */}
      <div className="w-1/5">
        <Sidebar />
      </div>

      {/* Right - 80% */}
      <div className="w-4/5 p-8 bg-BGWhite">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

