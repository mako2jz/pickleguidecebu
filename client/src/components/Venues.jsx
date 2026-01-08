import { useState, useEffect } from 'react';
import api from '../api/axios';
import VenueCard from './VenueCard';
import VenueModal from './VenueModal';

const Venues = () => {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedVenue, setSelectedVenue] = useState(null);

    useEffect(() => {
        fetchVenues();
    }, []);

    const fetchVenues = async () => {
        try {
            const { data } = await api.get('/courts');
            if (data.success) {
                // Fetch reviews count for each venue
                const venuesWithReviews = await Promise.all(
                    data.data.map(async (venue) => {
                        try {
                            const reviewsRes = await api.get(`/venues/${venue.id}/reviews`);
                            return {
                                ...venue,
                                averageRating: reviewsRes.data.data.averageRating || 0,
                                reviewCount: reviewsRes.data.data.count || 0
                            };
                        } catch {
                            return { ...venue, averageRating: 0, reviewCount: 0 };
                        }
                    })
                );
                setVenues(venuesWithReviews);
            }
        } catch (err) {
            setError('Failed to load venues');
            console.error('Error fetching venues:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleVenueClick = (venue) => {
        setSelectedVenue(venue);
    };

    const handleCloseModal = () => {
        setSelectedVenue(null);
    };

    if (loading) {
        return (
            <section className="venues-section">
                <div className="venues-loading">Loading venues...</div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="venues-section">
                <div className="venues-error">{error}</div>
            </section>
        );
    }

    return (
        <section className="venues-section">
            <div className="venues-header">
                <h2>Available Venues</h2>
                <p>Browse through {venues.length} pickleball venues in Cebu</p>
            </div>

            <div className="venues-grid">
                {venues.map((venue) => (
                    <VenueCard 
                        key={venue.id} 
                        venue={venue} 
                        onClick={handleVenueClick}
                    />
                ))}
            </div>

            {venues.length === 0 && (
                <div className="venues-empty">
                    <p>No venues available yet. Check back soon!</p>
                </div>
            )}

            {/* Venue Detail Modal */}
            {selectedVenue && (
                <VenueModal 
                    venue={selectedVenue} 
                    onClose={handleCloseModal}
                />
            )}
        </section>
    );
};

export default Venues;
