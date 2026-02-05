import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import UserList from "./Pages/Dashboard/Components/UserList";
import ProjectList from "./Pages/Dashboard/Components/ProjectList";
import InviteUser from "./Pages/Dashboard/Components/InviteUser";
import CreateProject from "./Pages/Dashboard/Components/CreateProject";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Navigate to="users" />} />
          <Route path="users" element={<UserList />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="invite-user" element={<InviteUser />} />
          <Route path="create-project" element={<CreateProject />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
