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
        <section className="py-8 px-4">
            <div className="container mx-auto">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-[#393F36]">Available Venues</h2>
                    <p className="text-[#5C6657]">Browse through {venues.length} pickleball venues in Cebu</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {venues.map((venue) => (
                        <VenueCard 
                            key={venue.id} 
                            venue={venue} 
                            onClick={handleVenueClick}
                        />
                    ))}
                </div>

                {venues.length === 0 && (
                    <div className="text-center py-12 text-foreground/60">
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
            </div>
            <div className="mt-4">
                <p className="text-foreground/70">Don't see a venue you like? Submit one! 
                    <a href="#hero" className="text-primary hover:underline"> Submit a Venue</a>
                </p>
            </div>
        </section>
    );
};

export default Venues;
