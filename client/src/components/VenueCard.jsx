const VenueCard = ({ venue, onClick }) => {
    return (
        <div 
            className="venue-card"
            onClick={() => onClick(venue)}
        >
            <div className="venue-card-image">
                <img 
                    src={venue.venue_picture || '/defaults/court-placeholder.jpg'} 
                    alt={venue.venue_name}
                />
            </div>
            
            <div className="venue-card-content">
                <div className="venue-card-header">
                    <h3 className="venue-name">{venue.venue_name}</h3>
                    {venue.averageRating > 0 && (
                        <span className="venue-rating">
                            ⭐ {venue.averageRating}
                        </span>
                    )}
                </div>
                
                <p className="venue-location">
                    <span className="location-icon">📍</span>
                    {venue.location}
                </p>
                
                <div className="venue-card-footer">
                    <span className="venue-courts">
                        {venue.number_of_courts} {venue.number_of_courts === 1 ? 'Court' : 'Courts'}
                    </span>
                    {venue.price && (
                        <span className="venue-price">{venue.price}</span>
                    )}
                </div>
                
                {venue.reviewCount > 0 && (
                    <p className="venue-reviews">
                        {venue.reviewCount} {venue.reviewCount === 1 ? 'review' : 'reviews'}
                    </p>
                )}
            </div>
        </div>
    );
};

export default VenueCard;
