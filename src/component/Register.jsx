import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthProvider";




const Register = () => {

  useEffect(() => {
    document.title = "register"; 
  }, []);
   useEffect(() => {
              document.title = "Registration Pages"; 
            }, []);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", photoURL: "" });
  const navigate = useNavigate();

     let {createRegistered,updateUserProfile}=useContext(AuthContext) 

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(formData.password)) {
      toast.error("Password must be at least 6 characters long and include uppercase and lowercase letters.");
      return;
    }

    createRegistered( formData.email, formData.password)
      .then((userCredential) => {
        updateUserProfile(userCredential.user, {
          displayName: formData.name,
          photoURL: formData.photoURL,
        }).then(() => {
          toast.success("Registration successful!");
          navigate("/");
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (

  




    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="photoURL" className="block text-sm font-medium">Photo URL</label>
            <input
              type="url"
              id="photoURL"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Register</button>
        </form>
        <p className="text-center mt-4 text-sm">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;