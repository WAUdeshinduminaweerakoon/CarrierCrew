import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_ROUTES from "../../configs/config"; // Adjust path if needed

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Please enter your username");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_ROUTES.ACCOUNT + "/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/verify-otp", {
          state: {
            email: data.email,
            userId: data.userId,
            userType:data.userType,
          },
        });
      } else {
        setError(data.message || "No account found with this username.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-700">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-gray-600">
            Enter your username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none border-gray-300"
            placeholder="Username"
          />
          {error && <p className="mb-2 text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-blue-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

