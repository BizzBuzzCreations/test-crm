import React, { useState } from 'react';
import logo from '../assets/images/logo.png'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Tell the server we're sending JSON
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json(); // Parse the response

      if (response.ok) {
        // On success, store the token (or session data)
        // In this example, we're simulating that the response includes a 'token'
        localStorage.setItem('authToken', data.token || 'sample-token'); // This token should come from your backend
        // Redirect the user to the dashboard or home page
        window.location.href = '/dashboard';
      } else {
        // On failure, show the error from the backend response
        setError(data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error("Error sending data:", error); // Handle any errors
      setError('An error occurred, please try again later.');
    }
  };

  return (
    <section className='flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-200'>
      <div className="flex flex-col items-center gap-10 border border-gray-200 w-full max-w-xl rounded-lg shadow m-auto p-10 bg-white">
        <div className='h-16'>
          <img className='h-full w-full' src={logo} alt="BizzBuzz Creations" />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
          <label
            htmlFor="Username"
            className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-[#8b5cf6] focus-within:ring-2 focus-within:ring-[#f3eefe]"
          >
            <input
              type="text"
              id="Username"
              className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span
              className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
            >
              Username
            </span>
          </label>

          <label
            htmlFor="Password"
            className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-[#8b5cf6] focus-within:ring-2 focus-within:ring-[#f3eefe]"
          >
            <input
              type="password"
              id="Password"
              className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
            >
              Password
            </span>
          </label>

          {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

          <button
            type='submit'
            className="group relative inline-flex items-center overflow-hidden rounded-sm bg-[#8b5cf6] px-8 py-3 text-white focus:ring-3 focus:outline-hidden w-fit"
          >
            <span className="absolute -end-full transition-all group-hover:end-4">
              <svg
                className="size-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
            <span className="text-sm font-medium transition-all group-hover:me-4"> Log in </span>
          </button>
        </form>
      </div>
    </section>
  )
}

export default Login;