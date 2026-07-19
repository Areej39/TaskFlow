import React from "react";

const EditModal = ({ isOpen, editText, setEditText, onClose, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#3E2723]/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-3xl border border-[#D8C3A5] bg-[#FFF8F1] p-7 shadow-2xl animate-in fade-in zoom-in duration-200">

        <h2 className="text-2xl font-bold text-[#5C4033] mb-2">
          Edit Task
        </h2>

        <p className="text-[#8A6A55] mb-6">
          Update your task below.
        </p>

        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          placeholder="Update your task..."
          className="w-full rounded-2xl border-2 border-[#D8C3A5] bg-[#FFFDF9] px-5 py-3 text-[#5C4033] placeholder:text-[#A1887F] focus:outline-none focus:ring-2 focus:ring-[#8B6B4A] focus:border-[#8B6B4A] transition-all"
        />

        <div className="mt-7 flex flex-col-reverse sm:flex-row justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-3 rounded-2xl bg-[#E9DED2] text-[#5C4033] font-medium hover:bg-[#DCCBBC] transition-all duration-300 hover:scale-105"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="px-5 py-3 rounded-2xl bg-[#6F4E37] text-white font-semibold shadow-lg hover:bg-[#5C4033] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Save Changes
          </button>

        </div>
      </div>
    </div>
  );
};

export default EditModal;