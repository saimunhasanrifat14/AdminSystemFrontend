import React from "react";
import { useForm } from "react-hook-form";
import api from "../../../api/client";

const EditProject = ({ project, onSave, onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: project.name,
      description: project.description,
      status: project.status,
      isDeleted: project.isDeleted ? "Yes" : "No",
    },
  });

  const onSubmit = async (data) => {
    try {
      // Check if nothing changed
      if (
        data.name === project.name &&
        data.description === project.description &&
        data.status === project.status &&
        data.isDeleted === (project.isDeleted ? "Yes" : "No")
      ) {
        alert("No changes detected");
        return;
      }

      const res = await api.put(
        `/api/v1/project/update-project/${project._id}`,
        data,
      );

      if (res.data?.success) {
        onSave(res.data.data); // updated project
        onClose(); // close modal
      }
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Failed to update project");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[420px]">
        <h2 className="text-lg font-semibold mb-4">Edit Project</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* NAME */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Project Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Project name is required" })}
              className="w-full border rounded px-3 py-2"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              rows="3"
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full border rounded px-3 py-2"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* STATUS */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              {...register("status", { required: "Status is required" })}
              className="w-full border rounded px-3 py-2 disabled:bg-gray-200"
            >
              <option value="ACTIVE">Active</option>
              <option value="ARCHIVED">Archived</option>
              <option value="DELETED">Deleted</option>
            </select>
          </div>

          {/* DELETE / RESTORE */}
          <div>
            <label className="block text-sm font-medium mb-1">Is Deleted</label>
            <select
              {...register("isDeleted")}
              className="w-full border rounded px-3 py-2"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 border rounded"
            >
              Back
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProject;
