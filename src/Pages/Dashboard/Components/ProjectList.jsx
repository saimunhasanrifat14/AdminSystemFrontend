import React, { useEffect, useState } from "react";
import api from "../../../api/client";
import EditProject from "./EditProject";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/v1/project/get-all-projects");
        setProjects(res.data?.data?.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleSave = (updatedProject) => {
    setProjects((prev) =>
      prev.map((p) => (p._id === updatedProject._id ? updatedProject : p)),
    );
    setSelectedProject(null);
  };

  const truncateWords = (text = "", limit = 8) => {
    const words = text.split(" ");
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  };

  if (loading)
    return (
      <div className="p-6 text-center text-TextGray">Loading projects...</div>
    );

  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-BGWhite rounded-lg relative">
      <table className="w-full">
        <thead>
          <tr className="border-b text-left text-TextGray">
            <th>Name</th>
            <th>Description</th>
            <th>Created By</th>
            <th>Status</th>
            <th>Deleted</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => (
            <tr
              key={project._id}
              className="border-b border-GrayBorder text-TextBlack last:border-none"
            >
              <td className="py-2">{project.name}</td>
              <td>{truncateWords(project.description)}</td>
              <td>{project.createdBy?.name}</td>
              <td>{project.status}</td>
              <td>{project.isDeleted ? "Yes" : "No"}</td>
              <td>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProject && (
        <EditProject
          project={selectedProject}
          onSave={handleSave}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default ProjectList;
