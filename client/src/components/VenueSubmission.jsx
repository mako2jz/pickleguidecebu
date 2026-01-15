import { useState } from 'react';
import {
    MapPin,
    Users,
    DollarSign,
    Phone,
    Smartphone,
    Facebook,
    Instagram,
    MessageCircle,
    X,
    CheckCircle,
    Building2,
} from "lucide-react";
import api from '../api/axios';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import AnimatedContent from './AnimatedContent';

const VenueSubmission = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
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
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const { data } = await api.post('/submissions', {
                ...formData,
                number_of_courts: parseInt(formData.number_of_courts)
            });

            if (data.success) {
                setSuccess(true);
                setFormData({
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
                // Auto-close after 3 seconds
                setTimeout(() => {
                    setSuccess(false);
                    onClose();
                }, 3000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit venue. Please try again.');
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
                                    <Building2 className="w-6 h-6 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold text-[#393F36]">
                                    Submit a Venue
                                </h2>
                            </div>
                            <p className="text-foreground/70 mb-6">
                                Know a pickleball court in Cebu? Help the community by submitting it!
                            </p>

                            {success ? (
                                <div className="text-center py-12">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                        <CheckCircle className="w-10 h-10 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-[#393F36] mb-2">Thank You!</h3>
                                    <p className="text-foreground/70">
                                        Your submission has been received and is pending admin approval.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {error && (
                                        <p className="text-destructive text-sm bg-destructive/10 p-3 rounded-md">
                                            {error}
                                        </p>
                                    )}
                                    
                                    {/* Required Fields */}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-lg text-[#5C6657] flex items-center gap-2">
                                            <Building2 className="w-5 h-5" />
                                            Venue Information
                                        </h3>

                                        <div>
                                            <label className="block text-sm font-medium text-[#5C6657] mb-1">
                                                Venue Name *
                                            </label>
                                            <div className="relative">
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

                                    {/* Contact Information */}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-lg text-[#5C6657] flex items-center gap-2">
                                            <Phone className="w-5 h-5" />
                                            Contact Information (Optional)
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
                                        {submitting ? 'Submitting...' : 'Submit Venue'}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                </AnimatedContent>
            </div>
        </div>
    );
};

export default VenueSubmission;
