import { NavLink } from "react-router-dom";
import Theme from "../../../CommonComponents/Theme";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `block py-2 px-6 rounded ${isActive ? "bg-blue-700 font-semibold" : "hover:bg-blue-600"} `;

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

        <NavLink to="/invite-user" className={linkClass}>
          Invite User
        </NavLink>
        <NavLink to="/create-project" className={linkClass}>
          Create Project
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
