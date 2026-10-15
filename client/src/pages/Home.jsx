
import { Link } from "react-router-dom";

const destinations = [
  {
    name: "Hunza Valley",
    country: "Pakistan",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Bali",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Swiss Alps",
    country: "Switzerland",
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80"
  }
];

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">YOUR NEXT ADVENTURE STARTS HERE</p>

          <h1>
            Explore the World,
            <br />
            One Journey at a Time.
          </h1>

          <p className="hero-description">
            Discover beautiful destinations, experience new
            cultures, and create memories that last forever.
          </p>

          <a href="#destinations" className="primary-btn">
            Explore Destinations →
          </a>
        </div>
      </section>

      <section className="destinations" id="destinations">
        <p className="eyebrow">FIND YOUR NEXT ESCAPE</p>
        <h2>Popular Destinations</h2>
        <p className="section-description">
          A little inspiration for your next unforgettable trip.
        </p>

        <div className="destination-grid">
          {destinations.map((destination) => (
            <article className="destination-card" key={destination.name}>
              <img
                src={destination.image}
                alt={destination.name}
              />

              <div className="destination-info">
                <h3>{destination.name}</h3>
                <p>{destination.country}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" id="about">
        <h2>Your journey, your story.</h2>
        <p>
          TravelVista helps you find inspiration for your next adventure.
        </p>
        <Link to="/signup" className="primary-btn">
          Join TravelVista
        </Link>
      </section>
    </>
  );
}

export default Home;
