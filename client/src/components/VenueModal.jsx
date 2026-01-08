import { useState, useEffect } from 'react';
import {
    MapPin,
    Users,
    DollarSign,
    Phone,
    Smartphone,
    Facebook,
    Instagram,
    MessageCircle,
    Star,
    X,
} from "lucide-react";
import api from '../api/axios';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const VenueModal = ({ venue, onClose }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
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
                fetchReviews();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit review');
        } finally {
            setSubmitting(false);
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const averageRating = reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 overflow-y-auto"
            onClick={handleBackdropClick}
        >
            <div className="min-h-screen px-4 py-8 flex items-center justify-center">
                <div className="bg-background rounded-lg shadow-xl max-w-4xl w-full mx-auto relative border border-border">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="absolute right-4 top-4 z-10 bg-background/90 hover:bg-secondary"
                    >
                        <X className="w-5 h-5" />
                    </Button>

                    <div className="aspect-[21/9] overflow-hidden rounded-t-lg">
                        <img
                            src={venue.venue_picture || '/defaults/court-placeholder.jpg'}
                            alt={venue.venue_name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h2 className="text-3xl font-bold mb-2 text-foreground">
                                    {venue.venue_name}
                                </h2>
                                <div className="flex items-center gap-2 text-foreground/70">
                                    <MapPin className="w-4 h-4" />
                                    <span>{venue.location}</span>
                                </div>
                            </div>
                            {averageRating > 0 && (
                                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg border border-border">
                                    <Star className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                                    <div>
                                        <div className="font-bold text-lg text-[#D4AF37]">
                                            {averageRating.toFixed(1)}
                                        </div>
                                        <div className="text-xs text-foreground/60">
                                            {reviews.length}{" "}
                                            {reviews.length === 1 ? "review" : "reviews"}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Separator className="my-6 bg-border" />

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg text-foreground">
                                    Venue Information
                                </h3>

                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5 text-primary" />
                                    <div>
                                        <div className="text-sm text-foreground/60">
                                            Number of Courts
                                        </div>
                                        <div className="font-medium text-foreground">
                                            {venue.number_of_courts}
                                        </div>
                                    </div>
                                </div>

                                {venue.price && (
                                    <div className="flex items-center gap-3">
                                        <DollarSign className="w-5 h-5 text-primary" />
                                        <div>
                                            <div className="text-sm text-foreground/60">
                                                Pricing
                                            </div>
                                            <div className="font-medium text-foreground">
                                                {venue.price}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg text-foreground">
                                    Contact Information
                                </h3>

                                {venue.mobile_number && (
                                    <div className="flex items-center gap-3">
                                        <Smartphone className="w-5 h-5 text-primary" />
                                        <div>
                                            <div className="text-sm text-foreground/60">
                                                Mobile
                                            </div>
                                            <a
                                                href={`tel:${venue.mobile_number}`}
                                                className="font-medium text-foreground hover:text-primary"
                                            >
                                                {venue.mobile_number}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {venue.telephone_number && (
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5 text-primary" />
                                        <div>
                                            <div className="text-sm text-foreground/60">
                                                Telephone
                                            </div>
                                            <a
                                                href={`tel:${venue.telephone_number}`}
                                                className="font-medium text-foreground hover:text-primary"
                                            >
                                                {venue.telephone_number}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {venue.viber && (
                                    <div className="flex items-center gap-3">
                                        <MessageCircle className="w-5 h-5 text-primary" />
                                        <div>
                                            <div className="text-sm text-foreground/60">
                                                Viber
                                            </div>
                                            <div className="font-medium text-foreground">
                                                {venue.viber}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-3 mt-4">
                                    {venue.facebook_page && (
                                        <a
                                            href={venue.facebook_page}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-3 py-2 bg-[#1877F2] text-white rounded-md hover:bg-[#0C63D4] transition-colors"
                                        >
                                            <Facebook className="w-4 h-4" />
                                            <span className="text-sm">Facebook</span>
                                        </a>
                                    )}
                                    {venue.instagram && (
                                        <a
                                            href={venue.instagram.startsWith('http') ? venue.instagram : `https://instagram.com/${venue.instagram.replace("@", "")}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white rounded-md hover:opacity-90 transition-opacity"
                                        >
                                            <Instagram className="w-4 h-4" />
                                            <span className="text-sm">Instagram</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Separator className="my-6 bg-border" />

                        <Tabs defaultValue="reviews" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 bg-secondary">
                                <TabsTrigger value="reviews">
                                    Reviews ({reviews.length})
                                </TabsTrigger>
                                <TabsTrigger value="write-review">
                                    Write a Review
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="reviews" className="mt-6">
                                {loading ? (
                                    <p className="text-foreground/60">Loading reviews...</p>
                                ) : reviews.length === 0 ? (
                                    <p className="text-foreground/60">No reviews yet. Be the first to review!</p>
                                ) : (
                                    <div className="space-y-4">
                                        {reviews.map((review) => (
                                            <div key={review.id} className="bg-card p-4 rounded-lg border border-border">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-semibold text-foreground">{review.reviewer_name}</span>
                                                    <div className="flex items-center gap-1 text-[#D4AF37]">
                                                        {[...Array(review.rating)].map((_, i) => (
                                                            <Star key={i} className="w-4 h-4 fill-current" />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-foreground/80 mb-2">{review.review_description}</p>
                                                <span className="text-xs text-foreground/50">
                                                    {new Date(review.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </TabsContent>
                            <TabsContent value="write-review" className="mt-6">
                                <form onSubmit={handleReviewSubmit} className="space-y-4">
                                    {error && <p className="text-destructive text-sm">{error}</p>}
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter your name"
                                            value={reviewForm.reviewer_name}
                                            onChange={(e) => setReviewForm({...reviewForm, reviewer_name: e.target.value})}
                                            required
                                            className="w-full px-3 py-2 border border-border rounded-md bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1">
                                            Rating
                                        </label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setReviewForm({...reviewForm, rating: star})}
                                                    className="focus:outline-none"
                                                >
                                                    <Star 
                                                        className={`w-6 h-6 ${star <= reviewForm.rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-border'}`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1">
                                            Your Review
                                        </label>
                                        <textarea
                                            placeholder="Write your review..."
                                            value={reviewForm.review_description}
                                            onChange={(e) => setReviewForm({...reviewForm, review_description: e.target.value})}
                                            required
                                            rows={4}
                                            className="w-full px-3 py-2 border border-border rounded-md bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                        />
                                    </div>
                                    
                                    <Button type="submit" disabled={submitting} className="w-full">
                                        {submitting ? 'Submitting...' : 'Submit Review'}
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VenueModal;
