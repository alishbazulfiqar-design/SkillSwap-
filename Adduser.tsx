import { X, ChevronDown } from "lucide-react";
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "../validation/createUserSchema";
import { createUser } from "../api/usersApi";
import { useQueryClient } from "@tanstack/react-query";

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
}
interface CreateUserFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  password: string;
  confirm_password: string;
  role: string;
}
const CreateUserModal = ({ open, onClose }: CreateUserModalProps) => {
    const {
 register,
  handleSubmit,
  formState: { errors },
} = useForm<CreateUserFormData>({
  resolver: zodResolver(createUserSchema),
  
});
  const queryClient = useQueryClient();//manager
const onSubmit = async (data: CreateUserFormData) => {
  const userData = {
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    full_name: `${data.first_name} ${data.last_name}`,
    phone: data.phone || "",
    password: data.password,
  };
//Exception Handling for some errors 
 try {
    console.log("Sending user data:", userData);
    const response = await createUser(userData);

    console.log("User created successfully:", response);

    await queryClient.invalidateQueries({
      queryKey: ["users"],
    });
 console.log("USERS QUERY INVALIDATED");
    onClose();
  } catch (error) {
    console.error("Failed to create user:", error);
  }
};

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="relative flex max-h-[90vh] w-full max-w-[840px] flex-col rounded-xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-7 py-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Create New User
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 transition hover:text-gray-800"  >
            <X size={22} />
          </button>
        </div>
        
       {/* Form */}
<form
  onSubmit={handleSubmit(onSubmit)}
  className="flex min-h-0 flex-1 flex-col">
  {/* Form Fields */}
  <div className="min-h-0 flex-1 overflow-y-auto px-7 py-7">
    <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2">
      {/* First Name */}
      <div>
        <label className="mb-2 block text-lg font-medium text-gray-900">
          First Name
        </label>
      <input
  type="text"
  {...register("first_name")}
  className="h-[50px] w-full rounded-lg border border-gray-300 px-4 text-base outline-none transition focus:border-black focus:ring-1 focus:ring-black"
/>
{errors.first_name && (
  <p className="mt-1 text-sm text-red-500">
    {errors.first_name.message}
  </p>
)}        
      </div>

      {/* Last Name */}
      <div>
        <label className="mb-2 block text-lg font-medium text-gray-900">
          Last Name
        </label>

        <input
          type="text"
          {...register("last_name")}
          className="h-[50px] w-full rounded-lg border border-gray-300 px-4 text-base outline-none transition focus:border-black focus:ring-1 focus:ring-black"
        />
        {errors.last_name && (
  <p className="mt-1 text-sm text-red-500">
    {errors.last_name.message}
  </p>
)}
      </div>

      {/* Email */}
      <div>
        <label className="mb-2 block text-lg font-medium text-gray-900">
          Email
        </label>

        <input
          type="email"
          {...register("email")}
          className="h-[50px] w-full rounded-lg border border-gray-300 px-4 text-base outline-none transition focus:border-black focus:ring-1 focus:ring-black"
        />
        {errors.email && (
  <p className="mt-1 text-sm text-red-500">
    {errors.email.message}
  </p>
)}
      </div>
      {/* Phone */}
      <div>
        <label className="mb-2 block text-lg font-medium text-gray-900">
          Phone (optional)
        </label>

        <input
          type="text"
          {...register("phone")}
          className="h-[50px] w-full rounded-lg border border-gray-300 px-4 text-base outline-none transition focus:border-black focus:ring-1 focus:ring-black"
        />
      </div>
      {/* Password */}
      <div>
        <label className="mb-2 block text-lg font-medium text-gray-900">
          Password
        </label>
        <input
          type="password"
          {...register("password")}
          className="h-[50px] w-full rounded-lg border border-gray-300 px-4 text-base outline-none transition focus:border-black focus:ring-1 focus:ring-black"
        />
        {errors.password && (
  <p className="mt-1 text-sm text-red-500">
    {errors.password.message}
  </p>
)}
      </div>
      {/* Confirm Password */}
      <div>
        <label className="mb-2 block text-lg font-medium text-gray-900">
          Confirm Password
        </label>
        <input
          type="password"
          {...register("confirm_password")}
          className="h-[50px] w-full rounded-lg border border-gray-300 px-4 text-base outline-none transition focus:border-black focus:ring-1 focus:ring-black"
        />
      </div>
      {/* Role */}
      <div className="md:col-span-2">
        <label className="mb-2 block text-lg font-medium text-gray-900">
          Role
        </label>
        <div className="relative">
          <select
            {...register("role")}
            defaultValue=""
            className="h-[50px] w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 text-base text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black">
            {errors.role && (
  <p className="mt-1 text-sm text-red-500">
    {errors.role.message}
  </p>
)}
            <option value="" disabled>
              Select a role
            </option>
            <option value="admin">Admin</option>
            <option value="hr">HR</option>
            <option value="employee">Employee</option>
          </select>

          <ChevronDown
            size={20}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>
    </div>
  </div>
  {/* Footer — INSIDE FORM */}
  <div className="flex shrink-0 justify-end gap-3 border-t border-gray-200 px-7 py-5">
    <button
      type="button"
      onClick={onClose}
      className="rounded-lg border border-gray-300 px-5 py-3 text-base font-medium text-gray-800 transition hover:bg-gray-50">
      Cancel
    </button>
    <button  
      type="submit"
      className="rounded-lg bg-sky-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-sky-600">
      Create
    </button>
  </div>
</form>
      </div>
    </div>
  );
};
export default CreateUserModal;