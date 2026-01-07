import { useState } from 'react'
import './global.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>🏓 Pickle Guide Cebu</h1>
          <p className="tagline">Your Central Guide to Pickleball Court Rentals in Cebu</p>
        </div>
      </header>

      <main className="main-content">
        <section className="hero-section">
          <h2>Welcome to Cebu's Premier Pickleball Directory</h2>
          <p className="hero-description">
            Discover the best pickleball courts in Cebu. Find, compare, and book your next game location with ease.
          </p>
          <div className="cta-buttons">
            <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
              Find Courts ({count})
            </button>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </section>

        <section className="features-section">
          <h3>Why Choose Pickle Guide Cebu?</h3>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📍</div>
              <h4>Easy Location</h4>
              <p>Find courts near you with detailed location information</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h4>Best Prices</h4>
              <p>Compare prices and find the best deals for your budget</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h4>Quality Courts</h4>
              <p>Browse verified courts with ratings and reviews</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🕐</div>
              <h4>Real-time Availability</h4>
              <p>Check court availability and book instantly</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>&copy; 2026 Pickle Guide Cebu. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
