import { useState } from 'react';
import api from '../api/axios';

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
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-content submission-modal">
                <button className="modal-close" onClick={onClose}>×</button>
                
                <h2>Submit a Venue</h2>
                <p className="submission-subtitle">
                    Know a pickleball court in Cebu? Help the community by submitting it!
                </p>

                {success ? (
                    <div className="submission-success">
                        <span className="success-icon">✅</span>
                        <h3>Thank You!</h3>
                        <p>Your submission has been received and is pending admin approval.</p>
                    </div>
                ) : (
                    <form className="submission-form" onSubmit={handleSubmit}>
                        {error && <p className="error-message">{error}</p>}
                        
                        {/* Required Fields */}
                        <div className="form-group">
                            <label htmlFor="venue_name">Venue Name *</label>
                            <input
                                type="text"
                                id="venue_name"
                                name="venue_name"
                                value={formData.venue_name}
                                onChange={handleChange}
                                placeholder="e.g., Cebu Sports Hub"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="location">Location *</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g., IT Park, Apas, Cebu City"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="number_of_courts">Number of Courts *</label>
                                <input
                                    type="number"
                                    id="number_of_courts"
                                    name="number_of_courts"
                                    value={formData.number_of_courts}
                                    onChange={handleChange}
                                    placeholder="e.g., 4"
                                    min="1"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <input
                                    type="text"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="e.g., ₱300/hour per court"
                                />
                            </div>
                        </div>

                        {/* Contact Information */}
                        <h4 className="form-section-title">Contact Information (Optional)</h4>

                        <div className="form-group">
                            <label htmlFor="facebook_page">Facebook Page</label>
                            <input
                                type="url"
                                id="facebook_page"
                                name="facebook_page"
                                value={formData.facebook_page}
                                onChange={handleChange}
                                placeholder="https://facebook.com/..."
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="instagram">Instagram</label>
                            <input
                                type="url"
                                id="instagram"
                                name="instagram"
                                value={formData.instagram}
                                onChange={handleChange}
                                placeholder="https://instagram.com/..."
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="viber">Viber</label>
                                <input
                                    type="text"
                                    id="viber"
                                    name="viber"
                                    value={formData.viber}
                                    onChange={handleChange}
                                    placeholder="e.g., 09171234567"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="mobile_number">Mobile Number</label>
                                <input
                                    type="text"
                                    id="mobile_number"
                                    name="mobile_number"
                                    value={formData.mobile_number}
                                    onChange={handleChange}
                                    placeholder="e.g., 09171234567"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="telephone_number">Telephone Number</label>
                            <input
                                type="text"
                                id="telephone_number"
                                name="telephone_number"
                                value={formData.telephone_number}
                                onChange={handleChange}
                                placeholder="e.g., (032) 123-4567"
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary btn-full"
                            disabled={submitting}
                        >
                            {submitting ? 'Submitting...' : 'Submit Venue'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default VenueSubmission;
