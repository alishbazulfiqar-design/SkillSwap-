type DeactivateUserModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeactivateUserModal = ({
  open,
  onClose,
  onConfirm,
}: DeactivateUserModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-gray-800">
          Deactivate User
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Are you sure you want to deactivate this user?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
          >
            Deactivate
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeactivateUserModal;