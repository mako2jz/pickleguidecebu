import { useState, useEffect } from 'react';
import api from '../api/axios';
import VenueCard from './VenueCard';
import VenueModal from './VenueModal';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from './ui/pagination';

const Venues = () => {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 6
    });

    useEffect(() => {
        fetchVenues(pagination.currentPage);
    }, []);

    const fetchVenues = async (page = 1) => {
        setLoading(true);
        try {
            const { data } = await api.get(`/courts?page=${page}&limit=6`);
            if (data.success) {
                setVenues(data.data.venues);
                setPagination(data.data.pagination);
            }
        } catch (err) {
            setError('Failed to load venues');
            console.error('Error fetching venues:', err);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= pagination.totalPages) {
            fetchVenues(page);
            // Scroll to venues section
            document.getElementById('venues')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleVenueClick = (venue) => {
        setSelectedVenue(venue);
    };

    const handleCloseModal = () => {
        setSelectedVenue(null);
    };

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        const { currentPage, totalPages } = pagination;
        
        if (totalPages <= 5) {
            // Show all pages if 5 or less
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);
            
            if (currentPage > 3) {
                pages.push('ellipsis-start');
            }
            
            // Show pages around current page
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            
            for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) {
                    pages.push(i);
                }
            }
            
            if (currentPage < totalPages - 2) {
                pages.push('ellipsis-end');
            }
            
            // Always show last page
            if (!pages.includes(totalPages)) {
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    if (loading && venues.length === 0) {
        return (
            <section id="venues" className="py-8 px-4">
                <div className="container mx-auto">
                    <div className="text-center py-12 text-foreground/60">Loading venues...</div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="venues" className="py-8 px-4">
                <div className="container mx-auto">
                    <div className="text-center py-12 text-destructive">{error}</div>
                </div>
            </section>
        );
    }

    return (
        <section id="venues" className="py-8 px-4">
            <div className="container mx-auto">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-[#393F36]">Available Venues</h2>
                    <p className="text-[#5C6657]">
                        Browse through {pagination.totalItems} pickleball venue{pagination.totalItems !== 1 ? 's' : ''} in Cebu
                    </p>
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

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className="mt-8">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious 
                                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                                        className={pagination.hasPrevPage ? 'cursor-pointer' : 'pointer-events-none opacity-50'}
                                    />
                                </PaginationItem>
                                
                                {getPageNumbers().map((page, index) => (
                                    <PaginationItem key={index}>
                                        {page === 'ellipsis-start' || page === 'ellipsis-end' ? (
                                            <PaginationEllipsis />
                                        ) : (
                                            <PaginationLink
                                                onClick={() => handlePageChange(page)}
                                                isActive={pagination.currentPage === page}
                                                className="cursor-pointer"
                                            >
                                                {page}
                                            </PaginationLink>
                                        )}
                                    </PaginationItem>
                                ))}
                                
                                <PaginationItem>
                                    <PaginationNext 
                                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                                        className={pagination.hasNextPage ? 'cursor-pointer' : 'pointer-events-none opacity-50'}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
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
                <p className="text-foreground/70">Don't see a venue you know of? Submit one! 
                    <a href="#hero" className="text-primary hover:underline"> Submit a Venue</a>
                </p>
            </div>
        </section>
    );
};

export default Venues;
