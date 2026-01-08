import { MapPin, Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

const VenueCard = ({ venue, onClick }) => {
    return (
        <Card
            className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 border-border/50 bg-card"
            onClick={() => onClick(venue)}
        >
            <div className="aspect-[16/9] overflow-hidden">
                <img
                    src={venue.venue_picture || '/defaults/court-placeholder.jpg'}
                    alt={venue.venue_name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>
            <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-foreground">
                        {venue.venue_name}
                    </h3>
                    {venue.averageRating > 0 && (
                        <div className="flex items-center gap-1 text-[#D4AF37]">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-medium">
                                {venue.averageRating.toFixed(1)}
                            </span>
                        </div>
                    )}
                </div>
                <div className="flex items-start gap-2 text-sm text-foreground/70 mb-3">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{venue.location}</span>
                </div>
                <div className="flex items-center justify-between">
                    <Badge
                        variant="secondary"
                        className="bg-secondary text-secondary-foreground border-border/50"
                    >
                        {venue.number_of_courts}{" "}
                        {venue.number_of_courts === 1 ? "Court" : "Courts"}
                    </Badge>
                    {venue.price && (
                        <span className="text-sm font-medium text-primary">
                            {venue.price}
                        </span>
                    )}
                </div>
                {venue.reviewCount > 0 && (
                    <div className="mt-2 text-xs text-foreground/60">
                        {venue.reviewCount}{" "}
                        {venue.reviewCount === 1 ? "review" : "reviews"}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default VenueCard;
