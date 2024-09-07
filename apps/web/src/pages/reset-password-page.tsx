import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/auth-store";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/input";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";

function ResetPasswordPage(): React.JSX.Element {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { resetPassword, error, isLoading } = useAuthStore();

  const { token } = useParams();
  const navigate = useNavigate();
  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    await resetPassword(token as string, password);
    toast.success("Password reset success!");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Reset Password
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <Input
            Icon={Lock}
            placeholder="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            Icon={Lock}
            placeholder="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <motion.button
            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            disabled={isLoading}
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? "Resetting..." : "Set New Password"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
export default ResetPasswordPage;
