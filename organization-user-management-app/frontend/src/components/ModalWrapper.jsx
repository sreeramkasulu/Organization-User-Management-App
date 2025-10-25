import { X } from "lucide-react";

export default function ModalWrapper({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitText = "Add",
  cancelText = "Cancel",
  isSubmitting = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 w-full flex items-center justify-end">
      {/* Backdrop - greyed out background */}
      <div className="absolute inset-0 bg-black/50 " onClick={onClose} />

      {/* Modal Panel */}
      {/* <div className="relative bg-white h-full md:w-[50%] min-w-[500px] w-full shadow-2xl flex flex-col animate-slide-in"> */}
      <div className="relative bg-white h-full w-full md:w-[50%] md:min-w-[500px] shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-6 shadow-sm border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 ">{children}</div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 text-secondary bg-[#F0EBFF] disabled:cursor-not-allowed hover:bg-gray-100 rounded transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 bg-secondary text-white disabled:cursor-not-allowed hover:bg-purple-700 rounded transition"
          >
            {isSubmitting ? "saving ..." : submitText}
          </button>
        </div>
      </div>
    </div>
  );
}
