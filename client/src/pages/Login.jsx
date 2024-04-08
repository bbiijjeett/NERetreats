import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/state";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        /* Get data after fetching */
        const loggedIn = await response.json();
        // console.log(loggedIn);
        if (loggedIn) {
          dispatch(
            setLogin({
              user: loggedIn.user,
              token: loggedIn.token,
            })
          );
          navigate("/");
        }
      } else if (response.status === 400) {
        // Handle 400 error, stay on the same page
        console.log("Login failed: Bad Request");
        navigate("/login");
      } else {
        // Handle other errors
        console.log("Login failed:", response.statusText);
        navigate("/login");
      }
    } catch (error) {
      console.log("Login failed", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
        {/* Add your sign-in form here */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="mt-5 flex justify-center">
          <Link to="/register">
            Don't have an account?{" "}
            <span className="text-blue-500">Register</span> Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
