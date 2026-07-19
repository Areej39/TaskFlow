const TodoCard = ({ item, onToggle, onDelete, onEdit }) => {
  return (
    <div
      className={`mb-5 rounded-3xl border p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        item.completed
          ? "bg-[#E9F2E2] border-[#A8C89A]"
          : "bg-[#FFFDF9] border-[#D8C3A5]"
      }`}
    >
      <div className="flex items-center gap-4 flex-1">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => onToggle(item)}
          className="w-6 h-6 cursor-pointer accent-[#6B8E5A] shrink-0"
        />

        <div className="flex-1">
          <p
            className={`text-xl font-semibold ${
              item.completed
                ? "line-through text-[#9B8B80]"
                : "text-[#5C4033]"
            }`}
          >
            {item.title}
          </p>

          <p className="text-sm text-[#8A6A55] mt-1">
            {item.createdAt
              ? `${item.createdAt.toDate().toLocaleDateString()} • ${item.createdAt
                  .toDate()
                  .toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`
              : ""}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 w-full sm:w-auto">
        <button
          disabled={item.completed}
          onClick={onEdit}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-white transition-all duration-300 hover:scale-105 ${
            item.completed
              ? "bg-[#C7B8AA] cursor-not-allowed"
              : "bg-[#C68B59] hover:bg-[#B27646]"
          }`}
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(item.id)}
          className="flex-1 sm:flex-none bg-[#8B3A3A] hover:bg-[#732F2F] text-white px-5 py-2.5 rounded-xl transition-all duration-300 hover:scale-105"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoCard;