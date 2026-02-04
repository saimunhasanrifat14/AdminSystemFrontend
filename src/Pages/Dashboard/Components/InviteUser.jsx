import { useForm } from "react-hook-form";
import api from "../../../api/client";

const InviteUser = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      role: "User",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/invite/create-invite", data);

      alert(res.data.message || "Invitation sent successfully!");
      reset();
    } catch (error) {
      console.error(error.response?.data || error);
      alert(error.response?.data?.message || "Failed to send invitation");
    }
  };

  return (
    <div className="bg-BGWhite max-w-xl p-4 rounded shadow">
      <h2 className="text-xl text-TextBlack font-semibold mb-4">
        Invite New User
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-TextBlack text-md font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full border border-GrayBorder text-TextGray rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="user@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="block text-md font-medium mb-1">Role</label>
          <select
            className="w-full bg-BGWhite border border-GrayBorder text-TextGray rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("role", { required: true })}
          >
            <option value="User">User</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-800 disabled:bg-blue-400 text-white py-2 rounded cursor-pointer"
        >
          {isSubmitting ? "Sending..." : "Send Invitation"}
        </button>
      </form>
    </div>
  );
};

export default InviteUser;
