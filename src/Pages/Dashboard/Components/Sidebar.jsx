import { NavLink } from "react-router-dom";
import Theme from "../../../CommonComponents/Theme";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../../api/client";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user , setUser } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const linkClass = ({ isActive }) =>
    `block py-2 px-6 rounded ${isActive ? "bg-blue-700 font-semibold" : "hover:bg-blue-600"} `;


  // handle logout
  const handleLogout = async () => {
    try {
      await api.post("/api/v1/auth/logout");
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error(
        "Logout failed:",
        err.response?.data?.message || err.message,
      );
      alert("Logout failed. Try again.");
    }
  };

  return (
    <div className="h-full bg-blue-500 text-white ">
      <div className="w-full flex items-center p-6 justify-between">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <Theme />
      </div>

      <nav className=" ">
        <NavLink to="/users" className={linkClass}>
          User Management
        </NavLink>

        <NavLink to="/projects" className={linkClass}>
          Project Management
        </NavLink>

        {isAdmin && (
          <NavLink to="/invite-user" className={linkClass}>
            Invite User
          </NavLink>
        )}
        <NavLink to="/create-project" className={linkClass}>
          Create Project
        </NavLink>
        <span
          onClick={handleLogout}
          className="block py-2 px-6 rounded hover:bg-blue-600 cursor-pointer"
        >
          Logout
        </span>
      </nav>
    </div>
  );
};

export default Sidebar;
