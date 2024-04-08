import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import upload from "../assets/upload.png";

const Register = () => {
  const navigate = useNavigate();
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  useEffect(() => {
    console.log(formData);
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form_data = new FormData();

      // key in [key, value] --> key = "name"
      for (var key in formData) {
        form_data.append(key, formData[key]);
      }

      const response = await fetch(
        "https://ne-retreats-api.vercel.app/auth/signup",
        {
          method: "POST",
          body: form_data,
        }
      );

      if (response.ok) {
        navigate("/login");
      }
    } catch (error) {
      console.log("Registration failed", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        {/* Add your sign-up form here */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName" className="block mb-1">
              First name
            </label>
            <input
              placeholder="First Name"
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FA5252]"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-1">
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FA5252]"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FA5252]"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FA5252]"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FA5252]"
            />
            {!passwordMatch && (
              <p style={{ color: "red" }}>Passwords are not matched!</p>
            )}
          </div>
          <div>
            <label htmlFor="profileImage" className="flex  mb-1">
              {formData.profileImage ? (
                <img
                  src={URL.createObjectURL(formData.profileImage)}
                  alt="Profile"
                  className="w-20 h-20 rounded-full"
                />
              ) : (
                <img src={upload} alt="add profile" />
              )}
              <span className="pl-5 mt-2">Upload Profile Photo</span>
            </label>
            <input
              type="file"
              style={{ display: "none" }}
              id="profileImage"
              name="profileImage"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FA5252]"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={!passwordMatch}
              className="w-full bg-[#FA5252] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#577399]"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="mt-5 flex justify-center">
          <Link to="/login">
            Already have an account?{" "}
            <span className="text-blue-500">Log In</span> Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
