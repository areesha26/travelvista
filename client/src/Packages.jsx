import { useNavigate } from "react-router-dom";
import "./App.css"; // Ye ensure karta hai ke aapki premium CSS apply ho

const packagesData = [
  {
    id: 1,
    name: "Dubai City Tour",
    location: "United Arab Emirates",
    duration: "5 Days / 4 Nights",
    price: "Rs. 185,000",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Baku & Azerbaijan",
    location: "Azerbaijan",
    duration: "6 Days / 5 Nights",
    price: "Rs. 145,000",
    image: "https://d20jhx4r9t6zw8.cloudfront.net/2121062_xlarge_4c1ca88e.jpg",
  },
  {
    id: 3,
    name: "Magical Turkey",
    location: "Istanbul & Cappadocia",
    duration: "7 Days / 6 Nights",
    price: "Rs. 165,000",
    image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Maldives Paradise",
    location: "Maldives",
    duration: "5 Days / 4 Nights",
    price: "Rs. 220,000",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Thailand Beach Escape",
    location: "Phuket & Bangkok",
    duration: "6 Days / 5 Nights",
    price: "Rs. 115,000",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Northern Pakistan",
    location: "Hunza & Skardu",
    duration: "7 Days / 6 Nights",
    price: "Rs. 85,000",
    image: "https://images.unsplash.com/photo-1597040663342-45b6af3d91a5?auto=format&fit=crop&w=800&q=80",
  },
];

function Packages() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    navigate("/");
  }

  return (
    <section className="section">
      <p className="eyebrow">EXCLUSIVE TOUR PACKAGES</p>
      <h2 className="section-title">Explore the World with Us</h2>
      <p className="section-text">
        Handpicked destinations, luxury stays, and unforgettable memories. Choose your next adventure!
      </p>

      <div className="destination-grid">
        {packagesData.map((pkg) => (
          <article key={pkg.id} className="card">
            <img src={pkg.image} alt={pkg.name} className="card-image" />
            <div className="card-body">
              {/* CSS ki .country class location ke liye perfect hai */}
              <span className="country">{pkg.location}</span>
              <h3>{pkg.name}</h3>
              
              {/* Duration aur Price ke liye CSS variables use kiye hain */}
              <p style={{ color: "var(--muted)", fontSize: "14px", margin: "8px 0", fontWeight: "500" }}>
                🕒 {pkg.duration}
              </p>
              <p style={{ fontSize: "24px", fontWeight: 700, color: "var(--navy)", margin: "12px 0" }}>
                {pkg.price}
              </p>
              
              <button className="submit-button" style={{ width: "100%" }}>
                Book This Tour
              </button>
            </div>
          </article>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <button onClick={handleLogout} className="back-button" style={{ fontSize: "15px", padding: "8px 16px" }}>
          ← Logout
        </button>
      </div>
    </section>
  );
}

export default Packages;