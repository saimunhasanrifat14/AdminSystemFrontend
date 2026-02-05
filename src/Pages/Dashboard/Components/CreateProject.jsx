import { useForm } from 'react-hook-form';
import api from '../../../api/client';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/api/v1/project/create-project', data);
      alert(res.data.message || 'Project created successfully!');
      reset();
      navigate('/projects');
    } catch (error) {
      console.error(error.response?.data || error);
      alert(error.response?.data?.message || 'Failed to create project');
    }
  };

  return (
    <div className="bg-BGWhite max-w-xl p-5 rounded shadow">
      <h2 className="text-xl text-TextBlack font-semibold mb-4">
        Create New Project
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Project Name */}
        <div>
          <label className="block text-TextBlack text-md font-medium mb-1">
            Project Name
          </label>
          <input
            type="text"
            placeholder="Enter project name"
            className="w-full border border-GrayBorder text-TextGray rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('name', {
              required: 'Project name is required',
              minLength: {
                value: 3,
                message: 'Name must be at least 3 characters',
              },
              maxLength: {
                value: 60,
                message: 'Name cannot exceed 60 characters',
              },
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-md font-medium mb-1">
            Description
          </label>
          <textarea
            rows={4}
            placeholder="Write project description..."
            className="w-full border border-GrayBorder text-TextGray rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            {...register('description', {
              required: 'Description is required',
              minLength: {
                value: 10,
                message: 'Description must be at least 10 characters',
              },
              maxLength: {
                value: 500,
                message: 'Description cannot exceed 500 characters',
              },
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-800 disabled:bg-blue-400 text-white py-2 rounded cursor-pointer"
        >
          {isSubmitting ? 'Creating...' : 'Create Project'}
        </button>
      </form>
    </div>
  );
};

export default CreateProject;