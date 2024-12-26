import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthProvider";

const Login = () => {
  useEffect(() => {
    document.title = "login"; 
  }, []);
   useEffect(() => {
              document.title = "Login Pages"; 
            }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();



  let location= useLocation()
  const redirectPath = location.state?.from || "/";

  let { loginSetup, googleSign } = useContext(AuthContext);

  // Map Firebase error codes to user-friendly messages
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/user-not-found":
        return "No user found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/invalid-email":
        return "Invalid email format.";
      case "auth/user-disabled":
        return "This user account has been disabled.";
      case "auth/network-request-failed":
        return "Network error. Please check your connection.";
      default:
        return "Login failed. Please try again.";
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    loginSetup(email, password)
      .then(() => {
        toast.success("Login successful!");
        navigate(redirectPath)

      })
      .catch((error) => {
        const errorMessage = getErrorMessage(error.code);
        toast.error(errorMessage);
      });
  };

  const handleGoogleLogin = () => {
    googleSign()
      .then(() => {
        toast.success("Google login successful!");
        navigate(redirectPath)

      })
      .catch((error) => {
        const errorMessage = getErrorMessage(error.code);
        toast.error(errorMessage);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Login with Google
        </button>
        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;