import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Venues from '../components/Venues';
import VenueSubmission from '../components/VenueSubmission';
import logo from '../resources/pickleheaderlogo.svg';

const Home = () => {
    const [showSubmissionModal, setShowSubmissionModal] = useState(false);

    return (
        <div className="page-container">
            <Header />
            
            <main className="main-content">
                {/* Hero Section */}
                <section className="hero-section">
                    <img 
                        src={logo} 
                        alt="Pickleball Courts in Cebu"
                        className="h-40 w-full"
                    ></img>
                    <p className="hero-description">
                        Welcome to Pickle Guide Cebu! Your central hub for discovering and booking pickleball courts across Cebu. 
                        Whether you're a seasoned player or just starting out, we've got the perfect venue for you.
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
