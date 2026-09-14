import { useState } from "react";
import type { Users } from "../types/user"; 

interface EditUserModalProps {
  open: boolean;
  user: Users | null;
  onClose: () => void;
  onSave: (
    firstName: string,
    lastName: string,
    phone: string
  ) => void;
}

const EditUserModal = ({
  open,
  user,
  
    onSave,
}: EditUserModalProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Edit User
          </h2>

          <button
            
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">

          <div>
            <label className="mb-1 block text-sm font-medium">
              First Name
            </label>

            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Last Name
            </label>

            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Phone
            </label>

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
           
            className="rounded-lg border border-gray-300 px-4 py-2"
          >
            Cancel
          </button>

         <button
        onClick={() => onSave(firstName, lastName, phone)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Save Changes
               </button>
        </div>

      </div>
    </div>
  );
};

export default EditUserModal;