import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Venues from '../components/Venues';
import VenueSubmission from '../components/VenueSubmission';

const Home = () => {
    const [showSubmissionModal, setShowSubmissionModal] = useState(false);

    return (
        <div className="page-container">
            <Header />
            
            <main className="main-content">
                {/* Hero Section */}
                <section className="hero-section">
                    <h1>🏓 Pickle Guide Cebu</h1>
                    <p className="hero-description">
                        Your Central Guide to Pickleball Court Rentals in Cebu.
                        Discover the best pickleball courts, compare prices, and find your next game location.
                    </p>
                    <div className="cta-buttons">
                        <a href="#venues" className="btn btn-primary">Find Courts</a>
                        <button 
                            className="btn btn-secondary"
                            onClick={() => setShowSubmissionModal(true)}
                        >
                            Submit a Venue
                        </button>
                    </div>
                </section>

                {/* Features Section */}
                <section className="features-section">
                    <h2>Why Choose Pickle Guide Cebu?</h2>
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
                            <div className="feature-icon">🏆</div>
                            <h4>Community Driven</h4>
                            <p>Submit venues and help grow the Cebu pickleball community</p>
                        </div>
                    </div>
                </section>

                {/* Venues Section */}
                <div id="venues">
                    <Venues />
                </div>
            </main>

            <Footer />

            {/* Venue Submission Modal */}
            <VenueSubmission 
                isOpen={showSubmissionModal} 
                onClose={() => setShowSubmissionModal(false)} 
            />
        </div>
    );
};

export default Home;
