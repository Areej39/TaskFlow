import React from 'react'
import { useState } from 'react'
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate, NavLink } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      console.log("Logged In User:", userCredential.user);

      alert("Login Successful!");

      setFormData({
        email: "",
        password: ""
      });

      navigate("/home");

    } catch (error) {
      switch (error.code) {
        case "auth/invalid-credential":
          alert("Invalid email or password.");
          break;

        case "auth/invalid-email":
          alert("Please enter a valid email.");
          break;

        case "auth/user-disabled":
          alert("This account has been disabled.");
          break;

        default:
          alert(error.message);
      }

      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F1E9] via-[#EADBC8] to-[#D7C0AE] flex items-center justify-center px-4 relative overflow-hidden">

      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#6F4E37_1px,transparent_0)] bg-[size:30px_30px]" />

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md bg-[#FFF9F3]/90 backdrop-blur-md border border-[#D2B48C] rounded-3xl shadow-2xl p-8"
      >
        <h1 className="text-4xl font-bold text-center text-[#5C4033]">
           Welcome Back
        </h1>

        <p className="text-center text-[#8B6B4A] mt-2 mb-8">
          Continue brewing your productivity.
        </p>

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
          className="w-full rounded-xl bg-[#6F4E37] py-3 font-semibold text-white transition duration-300 hover:bg-[#5C4033] hover:shadow-lg active:scale-95"
        >
          Login
        </button>

        <p className="mt-7 text-center text-[#8B6B4A]">
          Don't have an account?{" "}
          <NavLink
            to="/"
            className="font-semibold text-[#6F4E37] hover:text-[#5C4033] hover:underline"
          >
            Sign Up
          </NavLink>
        </p>
      </form>
    </div>
  );
}

export default Login