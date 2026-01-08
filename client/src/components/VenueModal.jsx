import { useState, useEffect } from 'react';
import api from '../api/axios';

const VenueModal = ({ venue, onClose }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewForm, setReviewForm] = useState({
        reviewer_name: '',
        rating: 5,
        review_description: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchReviews();
    }, [venue.id]);

    const fetchReviews = async () => {
        try {
            const { data } = await api.get(`/venues/${venue.id}/reviews`);
            if (data.success) {
                setReviews(data.data.reviews);
            }
        } catch (err) {
            console.error('Error fetching reviews:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const { data } = await api.post('/reviews', {
                venue_id: venue.id,
                ...reviewForm
            });

            if (data.success) {
                setReviewForm({ reviewer_name: '', rating: 5, review_description: '' });
                setShowReviewForm(false);
                fetchReviews(); // Refresh reviews
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit review');
        } finally {
            setSubmitting(false);
        }
    };

    // Close on backdrop click
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-content venue-modal">
                <button className="modal-close" onClick={onClose}>×</button>
                
                {/* Venue Image */}
                <div className="venue-modal-image">
                    <img 
                        src={venue.venue_picture || '/defaults/court-placeholder.jpg'} 
                        alt={venue.venue_name}
                    />
                </div>

                {/* Venue Details */}
                <div className="venue-modal-details">
                    <h2>{venue.venue_name}</h2>
                    
                    <p className="venue-modal-location">
                        <span>📍</span> {venue.location}
                    </p>

                    <div className="venue-modal-info">
                        <div className="info-item">
                            <strong>Courts:</strong> {venue.number_of_courts}
                        </div>
                        {venue.price && (
                            <div className="info-item">
                                <strong>Price:</strong> {venue.price}
                            </div>
                        )}
                    </div>

                    {/* Contact Information */}
                    <div className="venue-modal-contact">
                        <h4>Contact Information</h4>
                        {venue.facebook_page && (
                            <a href={venue.facebook_page} target="_blank" rel="noopener noreferrer">
                                📘 Facebook Page
                            </a>
                        )}
                        {venue.instagram && (
                            <a href={venue.instagram} target="_blank" rel="noopener noreferrer">
                                📷 Instagram
                            </a>
                        )}
                        {venue.viber && (
                            <p>📱 Viber: {venue.viber}</p>
                        )}
                        {venue.telephone_number && (
                            <p>📞 Tel: {venue.telephone_number}</p>
                        )}
                        {venue.mobile_number && (
                            <p>📱 Mobile: {venue.mobile_number}</p>
                        )}
                    </div>

                    {/* Reviews Section */}
                    <div className="venue-modal-reviews">
                        <div className="reviews-header">
                            <h4>Reviews ({reviews.length})</h4>
                            <button 
                                className="btn btn-secondary btn-sm"
                                onClick={() => setShowReviewForm(!showReviewForm)}
                            >
                                {showReviewForm ? 'Cancel' : 'Write a Review'}
                            </button>
                        </div>

                        {/* Review Form */}
                        {showReviewForm && (
                            <form className="review-form" onSubmit={handleReviewSubmit}>
                                {error && <p className="error-message">{error}</p>}
                                
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={reviewForm.reviewer_name}
                                    onChange={(e) => setReviewForm({...reviewForm, reviewer_name: e.target.value})}
                                    required
                                />
                                
                                <div className="rating-input">
                                    <label>Rating:</label>
                                    <select 
                                        value={reviewForm.rating}
                                        onChange={(e) => setReviewForm({...reviewForm, rating: parseInt(e.target.value)})}
                                    >
                                        <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                                        <option value={4}>⭐⭐⭐⭐ (4)</option>
                                        <option value={3}>⭐⭐⭐ (3)</option>
                                        <option value={2}>⭐⭐ (2)</option>
                                        <option value={1}>⭐ (1)</option>
                                    </select>
                                </div>
                                
                                <textarea
                                    placeholder="Write your review..."
                                    value={reviewForm.review_description}
                                    onChange={(e) => setReviewForm({...reviewForm, review_description: e.target.value})}
                                    required
                                    rows={4}
                                />
                                
                                <button type="submit" className="btn btn-primary" disabled={submitting}>
                                    {submitting ? 'Submitting...' : 'Submit Review'}
                                </button>
                            </form>
                        )}

                        {/* Reviews List */}
                        <div className="reviews-list">
                            {loading ? (
                                <p>Loading reviews...</p>
                            ) : reviews.length === 0 ? (
                                <p className="no-reviews">No reviews yet. Be the first to review!</p>
                            ) : (
                                reviews.map((review) => (
                                    <div key={review.id} className="review-item">
                                        <div className="review-header">
                                            <strong>{review.reviewer_name}</strong>
                                            <span className="review-rating">
                                                {'⭐'.repeat(review.rating)}
                                            </span>
                                        </div>
                                        <p className="review-text">{review.review_description}</p>
                                        <span className="review-date">
                                            {new Date(review.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VenueModal;
