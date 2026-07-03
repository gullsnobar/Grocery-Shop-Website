import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BikeIcon, Mail, Lock, User } from "lucide-react";
import heroBg from "../assets/hero_bg.jpeg";

const Login = () => {
  const [isLoginState, setIsLoginState] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    setIsLoginState((prev) => !prev);
    // Clear fields so leftover data doesn't carry across sign in / sign up
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // TODO: replace with real sign in / sign up request
    } finally {
      // try/finally guarantees loading resets even if the request throws
      setLoading(false);
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center">
        <img
          src={heroBg}
          alt="Hero background"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-app-green/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative text-center px-12 z-10 flex flex-col justify-center items-center h-full">
          <h2 className="text-5xl font-extrabold text-white mb-4">
            Welcome back to Instacart
          </h2>
          <p className="text-white/80 font-serif text-lg max-w-lg mx-auto">
            Fresh groceries and organic produce, delivered to your doorstep.
          </p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 bg-app-cream">
        <div className="w-full max-w-md text-center">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2 mb-5">
            <BikeIcon className="size-8 text-app-green" />
            <span className="text-2xl font-semibold text-app-green">Instacart</span>
          </Link>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {isLoginState ? "Sign in to your account" : "Create an account"}
          </h1>

          <p className="text-sm text-app-text-light mb-6">
            {isLoginState ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={toggleMode}
              className="text-orange-500 font-semibold hover:text-orange-600 transition-colors"
            >
              {isLoginState ? "Create one" : "Sign in"}
            </button>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-left" autoComplete="off">
            {!isLoginState && (
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <input
                    id="fullName"
                    name="fullName"
                    autoComplete="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border border-gray-200 rounded-lg pl-10 pr-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-app-green/40"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-200 rounded-lg pl-10 pr-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-app-green/40"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isLoginState ? "current-password" : "new-password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full border border-gray-200 rounded-lg pl-10 pr-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-app-green/40"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-app-green text-white font-semibold py-2.5 rounded-full hover:bg-app-green/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Please wait..." : isLoginState ? "Sign In" : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;