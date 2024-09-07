import React, { useState } from "react";
import { motion } from "framer-motion";
import { Loader, Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";
import PasswordStrengthMeter from "../components/password-strength-meter";
import { useAuthStore } from "../store/auth-store";

function SignUpPage(): React.JSX.Element {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { signUp, isLoading, error } = useAuthStore();

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    try {
      await signUp(email, password, fullName);
      navigate("/verify-email");
    } catch (err) {}
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 
      backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-8">
        <h2
          className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500
        text-transparent bg-clip-text"
        >
          Create Account
        </h2>
        <form onSubmit={handleSignUp}>
          <Input
            Icon={User}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            placeholder="Full Name"
            type="text"
            value={fullName}
          />
          <Input
            Icon={Mail}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            type="text"
            value={email}
          />
          <Input
            Icon={Lock}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            type="password"
            value={password}
          />
          {Boolean(error) && (
            <p className="text-red-500 font-semibold mt-2">{error}</p>
          )}
          <PasswordStrengthMeter password={password} />
          <motion.button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 
            text-white font-bold rounded-lg shadow-lg hover:from-green-600 
            hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 
            focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin  mx-auto" />
            ) : (
              "Sign up"
            )}
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            className="text-green-400 hover:underline"
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default SignUpPage;
