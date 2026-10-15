import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Packages from "./Packages"; // Naya page import kiya

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check karo ke user login hai ya nahi
    const user = localStorage.getItem("user");
    if (user) setIsLoggedIn(true);
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">TravelVista ✈</Link>
      <div className="nav-links">
        <Link to="/" className="link">Home</Link>
        <Link to="/packages" className="link">Packages</Link>
        <a href="#destinations" className="link">Destinations</a>
        <a href="#about" className="link">About</a>
        
        {/* Agar user login hai to Logout, warna Login/Signup */}
        {isLoggedIn ? (
          <button onClick={handleLogout} className="signup-link" style={{ border: "none", cursor: "pointer" }}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="link">Login</Link>
            <Link to="/signup" className="signup-link">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">DISCOVER YOUR NEXT ADVENTURE</p>
          <h1 className="hero-title">
            The world is waiting.
            <br />
            <span className="highlight">Go explore it.</span>
          </h1>
          <p className="hero-text">
            Find beautiful destinations and make memories that last a lifetime.
          </p>
          <Link to="/packages" className="hero-button">
            Explore Packages →
          </Link>
        </div>
      </section>

      <section id="destinations" className="section">
        <p className="eyebrow">YOUR NEXT JOURNEY</p>
        <h2 className="section-title">Explore amazing places</h2>
        <p className="section-text">
          From peaceful valleys to tropical beaches, your next adventure starts here.
        </p>
        <div style={{ textAlign: "center" }}>
            <Link to="/packages" className="hero-button" style={{ background: "#123b5d", color: "#fff" }}>
                View All Packages
            </Link>
        </div>
      </section>

      <section id="about" className="about">
        <h2>Travel more. Worry less.</h2>
        <p>
          TravelVista helps you discover destinations and start planning your next trip.
          Your next adventure is only one step away.
        </p>
      </section>

      <footer className="footer">
        © 2026 TravelVista. Made for travellers.
      </footer>
    </>
  );
}

function AuthPage({ isSignup }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isSignup 
        ? "http://localhost:5000/api/auth/signup" 
        : "http://localhost:5000/api/auth/login";
        
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      if (isSignup) {
        alert("Account created successfully! Please login.");
        navigate("/login");
      } else {
        // LOGIN SUCCESS! User ko localStorage mein save karo
        localStorage.setItem("user", JSON.stringify(data.user || { email }));
        alert("Login successful! Welcome back.");
        navigate("/packages"); // Yahan user ko Packages page par bhej do
      }
    } catch (err) {
      setError(err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <form onSubmit={handleSubmit} className="auth-card">
        <Link to="/" className="logo">TravelVista ✈</Link>
        <h1>{isSignup ? "Create your account" : "Welcome back!"}</h1>
        <p className="subtitle">
          {isSignup ? "Sign up to start planning." : "Login to continue your journey."}
        </p>

        {error && <div className="error-message">{error}</div>}

        <label className="label" htmlFor="email">Email address</label>
        <input id="email" name="email" autoComplete="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="input" />

        <label className="label" htmlFor="password">Password</label>
        <input id="password" name={isSignup ? "new-password" : "current-password"} autoComplete={isSignup ? "new-password" : "current-password"} type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={isSignup ? 8 : 1} required className="input" />

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Please wait..." : (isSignup ? "Create Account" : "Login")}
        </button>

        <p className="switch-auth">
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <Link to={isSignup ? "/login" : "/signup"} className="card-link">
            {isSignup ? "Login" : "Sign up"}
          </Link>
        </p>
        <button type="button" onClick={() => navigate("/")} className="back-button">← Back to Home</button>
      </form>
    </main>
  );
}

function NotFound() {
  return (
    <main className="not-found">
      <h1>404</h1>
      <p>Sorry, this page could not be found.</p>
      <Link to="/" className="signup-link">Back to Home</Link>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage isSignup={false} />} />
        <Route path="/signup" element={<AuthPage isSignup />} />
        <Route path="/packages" element={<Packages />} /> {/* Naya Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;