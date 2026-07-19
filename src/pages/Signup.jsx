import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;


      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: serverTimestamp(),
      });

      alert("Signup Successful!");

      setFormData({
        email: "",
        password: "",
      });

      navigate("/login");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F8F1E9] via-[#EADBC8] to-[#D7C0AE] flex items-center justify-center px-4 relative overflow-hidden">

      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#6F4E37_1px,transparent_0)] bg-[size:30px_30px]" />

      <div className="relative w-full max-w-md bg-[#FFF9F3]/90 backdrop-blur-md border border-[#D2B48C] rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center text-[#5C4033]">
          TaskFlow
        </h1>

        <p className="text-center text-[#8B6B4A] mt-2 mb-8">
          Brew your productivity.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="mb-5">
            <label className="block mb-2 font-semibold text-[#5C4033]">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-[#D2B48C] bg-[#FFFDF9] px-4 py-3 text-[#5C4033] placeholder:text-[#B18B67] outline-none transition focus:ring-2 focus:ring-[#A67B5B]"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold text-[#5C4033]">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-[#D2B48C] bg-[#FFFDF9] px-4 py-3 text-[#5C4033] placeholder:text-[#B18B67] outline-none transition focus:ring-2 focus:ring-[#A67B5B]"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#6F4E37] py-3 font-semibold text-white transition hover:bg-[#5C4033] hover:shadow-lg active:scale-95"
          >
            Create Account
          </button>

        </form>

        <p className="mt-7 text-center text-[#8B6B4A]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#6F4E37] hover:text-[#5C4033] hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;