import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuth } from "../context/AuthContext";
import EditModal from "../component/EditModal";
import TodoCard from "../component/TodoCard";

const Home = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  const getTodos = async () => {
    if (!user) return;

    try {
      const q = query(
        collection(db, "todos"),
        where("uid", "==", user.uid)
      );

      const querySnapshot = await getDocs(q);

      const todoList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTodos(todoList);
    } catch (error) {
      alert(error.message)
    }
  };

  const handleAddTodo = async () => {
    if (!todo.trim()) {
      alert("Please enter a task.");
      return;
    }

    try {
      await addDoc(collection(db, "todos"), {
        title: todo,
        completed: false,
        uid: user.uid,
        createdAt: serverTimestamp(),
      });

      setTodo("");
      getTodos();
    } catch (error) {
      alert(error.message);
    }
  };


  const handleUpdateTodo = async () => {
    if (!editText.trim()) return;

    try {
      await updateDoc(doc(db, "todos", editId), {
        title: editText,
      });

      setEditId(null);
      setEditText("");
      setIsModalOpen(false);

      getTodos();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteTodo = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "todos", id));
      getTodos();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleToggleComplete = async (item) => {
    try {
      await updateDoc(doc(db, "todos", item.id), {
        completed: !item.completed,
      });

      setEditId(null);
      setEditText("");

      getTodos();
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getTodos();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }


  const filteredTodos = todos.filter((item) => {
    if (filter === "pending") return !item.completed;
    if (filter === "completed") return item.completed;
    return true;
  });


  return (
    <div className="min-h-screen py-10 px-4 bg-[#F8F3EE] bg-[radial-gradient(#D7C4B3_1px,transparent_1px)] [background-size:28px_28px]">
      <div className="max-w-4xl mx-auto">

        <div className="bg-[#FFF8F1]/90 backdrop-blur-md border border-[#D8C3A5] rounded-3xl shadow-xl p-7 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-8 transition-all duration-300 hover:shadow-2xl">
          <div>
            <h1 className="text-4xl font-extrabold tracking-wide text-[#5C4033]">
              TaskFlow
            </h1>
            <p className="mt-2 text-[#8A6A55] text-sm break-all">{user?.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#6F4E37] hover:bg-[#5C4033] text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105"
          >
            Logout
          </button>
        </div>


        <div className="bg-[#FFF8F1]/90 backdrop-blur-md border border-[#D8C3A5] rounded-3xl shadow-xl p-7 mb-8 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-[#5C4033] mb-5">
            Add New Task
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddTodo();
                }
              }}
              placeholder="Enter your task..."
              className="flex-1 rounded-2xl border-2 border-[#D8C3A5] bg-[#FFFDF9] px-5 py-3 text-[#5C4033] placeholder:text-[#A1887F] focus:outline-none focus:ring-2 focus:ring-[#8B6B4A] focus:border-[#8B6B4A] transition-all"
            />

            <button
              onClick={handleAddTodo}
              className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-[#6F4E37] hover:bg-[#5C4033] text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Add
            </button>
          </div>
        </div>


        <div className="bg-[#FFF8F1]/90 backdrop-blur-md border border-[#D8C3A5] rounded-3xl shadow-xl p-7">
          <h2 className="text-2xl font-bold text-[#5C4033] mb-6">
            My Tasks
          </h2>

          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-sm ${filter === "all"
                ? "bg-[#6F4E37] text-white shadow-md"
                : "bg-[#F3E7D8] text-[#5C4033] hover:bg-[#E8D6C3]"
                }`}
            >
              All ({todos.length})
            </button>

            <button
              onClick={() => setFilter("pending")}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-sm ${filter === "pending"
                ? "bg-[#C68B59] text-white shadow-md"
                : "bg-[#F3E7D8] text-[#5C4033] hover:bg-[#E8D6C3]"
                }`}
            >
              Pending ({todos.filter((todo) => !todo.completed).length})
            </button>

            <button
              onClick={() => setFilter("completed")}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-sm ${filter === "completed"
                ? "bg-[#6B8E5A] text-white shadow-md"
                : "bg-[#F3E7D8] text-[#5C4033] hover:bg-[#E8D6C3]"
                }`}
            >
              Completed ({todos.filter((todo) => todo.completed).length})
            </button>
          </div>

          {filteredTodos.length === 0 ? (
            <p className="bg-[#F7EFE5] border-2 border-dashed border-[#D8C3A5] rounded-2xl py-12 text-center">
              {filter === "all" && "No tasks available."}
              {filter === "pending" && "No pending tasks."}
              {filter === "completed" && "No completed tasks."}
            </p>
          ) : (
            filteredTodos.map((item) => (
              <TodoCard
                key={item.id}
                item={item}
                onToggle={handleToggleComplete}
                onDelete={handleDeleteTodo}
                onEdit={() => {
                  setEditId(item.id);
                  setEditText(item.title);
                  setIsModalOpen(true);
                }}
              />
            ))
          )}
        </div>

      </div>
      <EditModal
        isOpen={isModalOpen}
        editText={editText}
        setEditText={setEditText}
        onClose={() => {
          setIsModalOpen(false);
          setEditId(null);
          setEditText("");
        }}
        onSave={handleUpdateTodo}
      />
    </div>
  );
};

export default Home;