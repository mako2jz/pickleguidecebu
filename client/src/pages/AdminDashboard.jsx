import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import {
    LogOut,
    Building2,
    ClipboardList,
    MessageSquare,
    Trash2,
    Edit,
    Check,
    X,
    MapPin,
    Users,
    DollarSign,
    Phone,
    Smartphone,
    Facebook,
    Instagram,
    MessageCircle,
    Star,
    Image,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import AnimatedContent from '../components/AnimatedContent';
import { toast } from 'sonner';

// Edit Court Modal Component
const EditCourtModal = ({ court, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        venue_picture: '',
        venue_name: '',
        location: '',
        number_of_courts: '',
        price: '',
        facebook_page: '',
        instagram: '',
        viber: '',
        telephone_number: '',
        mobile_number: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (court) {
            setFormData({
                venue_picture: court.venue_picture || '',
                venue_name: court.venue_name || '',
                location: court.location || '',
                number_of_courts: court.number_of_courts || '',
                price: court.price || '',
                facebook_page: court.facebook_page || '',
                instagram: court.instagram || '',
                viber: court.viber || '',
                telephone_number: court.telephone_number || '',
                mobile_number: court.mobile_number || ''
            });
        }
    }, [court]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const { data } = await api.put(`/admin/courts/${court.id}`, {
                ...formData,
                number_of_courts: parseInt(formData.number_of_courts)
            });

            if (data.success) {
                toast.success('Court updated successfully!');
                onSave();
                onClose();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update court.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 overflow-y-auto"
            onClick={handleBackdropClick}
        >
            <div className="min-h-screen px-4 py-8 flex items-center justify-center">
                <AnimatedContent
                    distance={80}
                    direction="vertical"
                    reverse={false}
                    duration={0.4}
                    ease="power3.out"
                    initialOpacity={0}
                    animateOpacity
                    scale={0.95}
                    threshold={0}
                    className="w-full max-w-2xl"
                >
                    <div className="bg-background rounded-lg shadow-xl w-full mx-auto relative border border-border">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="absolute right-4 top-4 z-10 bg-background/90 hover:bg-secondary"
                        >
                            <X className="w-5 h-5" />
                        </Button>

                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Edit className="w-6 h-6 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold text-[#393F36]">
                                    Edit Court
                                </h2>
                            </div>
                            <p className="text-foreground/70 mb-6">
                                Update the venue information below.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {error && (
                                    <p className="text-destructive text-sm bg-destructive/10 p-3 rounded-md">
                                        {error}
                                    </p>
                                )}
                                
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-lg text-[#5C6657] flex items-center gap-2">
                                        <Building2 className="w-5 h-5" />
                                        Venue Information
                                    </h3>

                                    <div>
                                        <label className="block text-sm font-medium text-[#5C6657] mb-1">
                                            Venue Picture URL *
                                        </label>
                                        <div className="relative">
                                            <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
                                            <input
                                                type="url"
                                                name="venue_picture"
                                                value={formData.venue_picture}
                                                onChange={handleChange}
                                                placeholder="https://example.com/image.jpg"
                                                required
                                                className="w-full pl-10 pr-3 py-2 border border-border rounded-md bg-input-background text-[#5C6657] focus:outline-none focus:ring-2 focus:ring-ring"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[#5C6657] mb-1">
                                            Venue Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="venue_name"
                                            value={formData.venue_name}
                                            onChange={handleChange}
                                            placeholder="e.g., Cebu Sports Hub"
                                            required
                                            className="w-full px-3 py-2 border border-border rounded-md bg-input-background text-[#5C6657] focus:outline-none focus:ring-2 focus:ring-ring"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[#5C6657] mb-1">
                                            Location *
                                        </label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
                                            <input
                                                type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleChange}
                                                placeholder="e.g., IT Park, Apas, Cebu City"
                                                required
                                                className="w-full pl-10 pr-3 py-2 border border-border rounded-md bg-input-background text-[#5C6657] focus:outline-none focus:ring-2 focus:ring-ring"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-[#5C6657] mb-1">
                                                Number of Courts *
                                            </label>
                                            <div className="relative">
                                                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
                                                <input
                                                    type="number"
                                                    name="number_of_courts"
                                                    value={formData.number_of_courts}
                                                    onChange={handleChange}
                                                    placeholder="e.g., 4"
                                                    min="1"
                                                    required
                                                    className="w-full pl-10 pr-3 py-2 border border-border rounded-md bg-input-background text-[#5C6657] focus:outline-none focus:ring-2 focus:ring-ring"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-[#5C6657] mb-1">
                                                Price
                                            </label>
                                            <div className="relative">
                                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
                                                <input
                                                    type="text"
                                                    name="price"
                                                    value={formData.price}
                                                    onChange={handleChange}
                                                    placeholder="e.g., ₱300/hour"
                                                    className="w-full pl-10 pr-3 py-2 border border-border rounded-md bg-input-background text-[#5C6657] focus:outline-none focus:ring-2 focus:ring-ring"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="my-6 bg-border" />

                                <div className="space-y-4">
                                    <h3 className="font-semibold text-lg text-[#5C6657] flex items-center gap-2">
                                        <Phone className="w-5 h-5" />
                                        Contact Information
                                    </h3>

                                    <div>
                                        <label className="block text-sm font-medium text-[#5C6657] mb-1">
                                            Facebook Page
                                        </label>
                                        <div className="relative">
                                            <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
                                            <input
                                                type="url"
                                                name="facebook_page"
                                                value={formData.facebook_page}
                                                onChange={handleChange}
                                                placeholder="https://facebook.com/..."
                                                className="w-full pl-10 pr-3 py-2 border border-border rounded-md bg-input-background text-[#5C6657] focus:outline-none focus:ring-2 focus:ring-ring"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[#5C6657] mb-1">
                                            Instagram
                                        </label>
                                        <div className="relative">
                                            <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
                                            <input
                                                type="url"
                                                name="instagram"
                                                value={formData.instagram}
                                                onChange={handleChange}
                                                placeholder="https://instagram.com/..."
                                                className="w-full pl-10 pr-3 py-2 border border-border rounded-md bg-input-background text-[#5C6657] focus:outline-none focus:ring-2 focus:ring-ring"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-[#5C6657] mb-1">
                                                Viber
                                            </label>
                                            <div className="relative">
                                                <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
                                                <input
                                                    type="text"
                                                    name="viber"
                                                    value={formData.viber}
                                                    onChange={handleChange}
                                                    placeholder="e.g., 09171234567"
                                                    className="w-full pl-10 pr-3 py-2 border border-border rounded-md bg-input-background text-[#5C6657] focus:outline-none focus:ring-2 focus:ring-ring"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-[#5C6657] mb-1">
                                                Mobile Number
                                            </label>
                                            <div className="relative">
                                                <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
                                                <input
                                                    type="text"
                                                    name="mobile_number"
                                                    value={formData.mobile_number}
                                                    onChange={handleChange}
                                                    placeholder="e.g., 09171234567"
                                                    className="w-full pl-10 pr-3 py-2 border border-border rounded-md bg-input-background text-[#5C6657] focus:outline-none focus:ring-2 focus:ring-ring"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[#5C6657] mb-1">
                                            Telephone Number
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
                                            <input
                                                type="text"
                                                name="telephone_number"
                                                value={formData.telephone_number}
                                                onChange={handleChange}
                                                placeholder="e.g., (032) 123-4567"
                                                className="w-full pl-10 pr-3 py-2 border border-border rounded-md bg-input-background text-[#5C6657] focus:outline-none focus:ring-2 focus:ring-ring"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Button 
                                    type="submit" 
                                    disabled={submitting}
                                    className="w-full mt-6"
                                    variant="pickleballgreen"
                                >
                                    {submitting ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </form>
                        </div>
                    </div>
                </AnimatedContent>
            </div>
        </div>
    );
};

// Reviews Modal Component
const ReviewsModal = ({ court, isOpen, onClose }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen && court) {
            fetchReviews();
        }
    }, [isOpen, court]);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/venues/${court.id}/reviews`);
            if (data.success) {
                setReviews(data.data.reviews);
            }
        } catch (err) {
            console.error('Error fetching reviews:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        if (!confirm('Are you sure you want to delete this review?')) return;

        try {
            const { data } = await api.delete(`/reviews/${reviewId}`);
            if (data.success) {
                setReviews(reviews.filter(r => r.id !== reviewId));
                toast.success('Review deleted successfully');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to delete review');
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 overflow-y-auto"
            onClick={handleBackdropClick}
        >
            <div className="min-h-screen px-4 py-8 flex items-center justify-center">
                <AnimatedContent
                    distance={80}
                    direction="vertical"
                    reverse={false}
                    duration={0.4}
                    ease="power3.out"
                    initialOpacity={0}
                    animateOpacity
                    scale={0.95}
                    threshold={0}
                    className="w-full max-w-2xl"
                >
                    <div className="bg-background rounded-lg shadow-xl w-full mx-auto relative border border-border max-h-[80vh] flex flex-col">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="absolute right-4 top-4 z-10 bg-background/90 hover:bg-secondary"
                        >
                            <X className="w-5 h-5" />
                        </Button>

                        <div className="p-6 border-b border-border">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <MessageSquare className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-[#393F36]">
                                        Reviews
                                    </h2>
                                    <p className="text-foreground/70">
                                        {court?.venue_name}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 overflow-y-auto flex-1">
                            {loading ? (
                                <p className="text-foreground/60 text-center py-8">Loading reviews...</p>
                            ) : reviews.length === 0 ? (
                                <p className="text-foreground/60 text-center py-8">No reviews for this venue.</p>
                            ) : (
                                <div className="space-y-4">
                                    {reviews.map((review) => (
                                        <div key={review.id} className="bg-card p-4 rounded-lg border border-border">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <span className="font-semibold text-[#5C6657]">{review.reviewer_name}</span>
                                                    <div className="flex items-center gap-1 text-[#D4AF37] mt-1">
                                                        {[...Array(review.rating)].map((_, i) => (
                                                            <Star key={i} className="w-4 h-4 fill-current" />
                                                        ))}
                                                        {[...Array(5 - review.rating)].map((_, i) => (
                                                            <Star key={i} className="w-4 h-4 text-border" />
                                                        ))}
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDeleteReview(review.id)}
                                                    className="text-destructive hover:bg-destructive/10"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <p className="text-foreground/80 mb-2">{review.review_description}</p>
                                            <span className="text-xs text-foreground/50">
                                                {new Date(review.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </AnimatedContent>
            </div>
        </div>
    );
};

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    
    const [courts, setCourts] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingCourt, setEditingCourt] = useState(null);
    const [reviewsCourt, setReviewsCourt] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [courtsRes, submissionsRes] = await Promise.all([
                api.get('/admin/courts'),
                api.get('/admin/submissions')
            ]);
            
            if (courtsRes.data.success) setCourts(courtsRes.data.data);
            if (submissionsRes.data.success) setSubmissions(submissionsRes.data.data);
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const handleApprove = async (id) => {
        if (!confirm('Approve this submission?')) return;
        
        try {
            const { data } = await api.post(`/admin/submissions/${id}/approve`);
            if (data.success) {
                toast.success('Submission approved!');
                fetchData();
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to approve');
        }
    };

    const handleDecline = async (id) => {
        if (!confirm('Decline and delete this submission?')) return;
        
        try {
            const { data } = await api.delete(`/admin/submissions/${id}/decline`);
            if (data.success) {
                toast.success('Submission declined');
                setSubmissions(submissions.filter(s => s.id !== id));
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to decline');
        }
    };

    const handleDeleteCourt = async (id) => {
        if (!confirm('Are you sure you want to delete this court? This action cannot be undone.')) return;
        
        try {
            const { data } = await api.delete(`/admin/courts/${id}`);
            if (data.success) {
                toast.success('Court deleted successfully');
                setCourts(courts.filter(c => c.id !== id));
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to delete court');
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Admin Header */}
            <header className="bg-card border-b border-border sticky top-0 z-40">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Building2 className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-[#393F36]">Admin Dashboard</h1>
                                <p className="text-sm text-foreground/60">Pickle Guide Cebu</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-[#5C6657]">{user?.username}</p>
                                <Badge variant="secondary" className="bg-[#A2AF9B] text-white">
                                    {user?.role}
                                </Badge>
                            </div>
                            <Button variant="outline" size="sm" onClick={handleLogout}>
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <Tabs defaultValue="courts" className="w-full">
                    <TabsList className="grid w-full max-w-md grid-cols-2 bg-secondary mb-8">
                        <TabsTrigger value="courts" className="flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            Courts ({courts.length})
                        </TabsTrigger>
                        <TabsTrigger value="submissions" className="flex items-center gap-2">
                            <ClipboardList className="w-4 h-4" />
                            Pending ({submissions.length})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="courts">
                        {loading ? (
                            <div className="text-center py-12 text-foreground/60">Loading courts...</div>
                        ) : courts.length === 0 ? (
                            <Card>
                                <CardContent className="py-12 text-center text-foreground/60">
                                    <Building2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                    <p>No courts yet. Approve submissions to add courts.</p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid gap-4">
                                {courts.map((court) => (
                                    <Card key={court.id} className="overflow-hidden">
                                        <CardContent className="p-0">
                                            <div className="flex flex-col md:flex-row">
                                                <div className="w-full md:w-48 h-32 md:h-auto flex-shrink-0">
                                                    <img
                                                        src={court.venue_picture || '/defaults/court-placeholder.jpg'}
                                                        alt={court.venue_name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 p-4">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <h3 className="font-semibold text-lg text-[#393F36]">
                                                                {court.venue_name}
                                                            </h3>
                                                            <div className="flex items-center gap-2 text-sm text-foreground/60 mt-1">
                                                                <MapPin className="w-4 h-4" />
                                                                {court.location}
                                                            </div>
                                                        </div>
                                                        <Badge variant="secondary" className="bg-[#A2AF9B] text-white">
                                                            ID: {court.id}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-[#5C6657]">
                                                        <div className="flex items-center gap-1">
                                                            <Users className="w-4 h-4" />
                                                            {court.number_of_courts} courts
                                                        </div>
                                                        {court.price && (
                                                            <div className="flex items-center gap-1">
                                                                <DollarSign className="w-4 h-4" />
                                                                {court.price}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <Separator className="my-3" />
                                                    <div className="flex flex-wrap gap-2">
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm"
                                                            onClick={() => setEditingCourt(court)}
                                                        >
                                                            <Edit className="w-4 h-4 mr-1" />
                                                            Edit
                                                        </Button>
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm"
                                                            onClick={() => setReviewsCourt(court)}
                                                        >
                                                            <MessageSquare className="w-4 h-4 mr-1" />
                                                            Reviews
                                                        </Button>
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm"
                                                            className="text-destructive hover:bg-destructive/10"
                                                            onClick={() => handleDeleteCourt(court.id)}
                                                        >
                                                            <Trash2 className="w-4 h-4 mr-1" />
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="submissions">
                        {loading ? (
                            <div className="text-center py-12 text-foreground/60">Loading submissions...</div>
                        ) : submissions.length === 0 ? (
                            <Card>
                                <CardContent className="py-12 text-center text-foreground/60">
                                    <ClipboardList className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                    <p>No pending submissions.</p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid gap-4">
                                {submissions.map((submission) => (
                                    <Card key={submission.id} className="border-l-4 border-l-[#D4AF37]">
                                        <CardContent className="p-4">
                                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg text-[#393F36] mb-2">
                                                        {submission.venue_name}
                                                    </h3>
                                                    <div className="grid gap-2 text-sm">
                                                        <div className="flex items-center gap-2 text-foreground/70">
                                                            <MapPin className="w-4 h-4 flex-shrink-0" />
                                                            {submission.location}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-foreground/70">
                                                            <Users className="w-4 h-4 flex-shrink-0" />
                                                            {submission.number_of_courts} court{submission.number_of_courts > 1 ? 's' : ''}
                                                        </div>
                                                        {submission.price && (
                                                            <div className="flex items-center gap-2 text-foreground/70">
                                                                <DollarSign className="w-4 h-4 flex-shrink-0" />
                                                                {submission.price}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-foreground/50 mt-3">
                                                        Submitted: {new Date(submission.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2 md:flex-col">
                                                    <Button 
                                                        variant="pickleballgreen"
                                                        size="sm"
                                                        onClick={() => handleApprove(submission.id)}
                                                        className="flex-1 md:flex-none"
                                                    >
                                                        <Check className="w-4 h-4 mr-1" />
                                                        Approve
                                                    </Button>
                                                    <Button 
                                                        variant="outline"
                                                        size="sm"
                                                        className="flex-1 md:flex-none text-destructive hover:bg-destructive/10"
                                                        onClick={() => handleDecline(submission.id)}
                                                    >
                                                        <X className="w-4 h-4 mr-1" />
                                                        Decline
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </main>

            {/* Edit Court Modal */}
            <EditCourtModal
                court={editingCourt}
                isOpen={!!editingCourt}
                onClose={() => setEditingCourt(null)}
                onSave={fetchData}
            />

            {/* Reviews Modal */}
            <ReviewsModal
                court={reviewsCourt}
                isOpen={!!reviewsCourt}
                onClose={() => setReviewsCourt(null)}
            />
        </div>
    );
};

export default AdminDashboard;
