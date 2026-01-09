import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Venues from '../components/Venues';
import VenueSubmission from '../components/VenueSubmission';
import Questions from '../components/Questions';

const Home = () => {
    const [showSubmissionModal, setShowSubmissionModal] = useState(false);

    return (
        <div className="page-container">
            <Header />
            
            <main className="main-content">
                {/* Hero Section */}
                <Hero onSubmitVenue={() => setShowSubmissionModal(true)} />

                {/* Venues Section */}
                <div id="venues">
                    <Venues />
                </div>

                {/* FAQ Section */}
                <div id="faq-questions">
                    <Questions />
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
