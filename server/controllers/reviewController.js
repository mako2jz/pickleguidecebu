import db from '../config/db.js';

// Create a new review (Public)
export const createReview = async (req, res) => {
  try {
    const { venue_id, rating, reviewer_name, review_description } = req.body;

    // Validate required fields
    if (!venue_id || !rating || !reviewer_name || !review_description) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: venue_id, rating, reviewer_name, or review_description'
      });
    }

    // Validate rating range (1-5)
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    // Check if venue exists
    const [courts] = await db.query('SELECT id FROM courts WHERE id = ?', [venue_id]);
    if (courts.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Venue not found'
      });
    }

    const query = `
      INSERT INTO reviews (venue_id, rating, reviewer_name, review_description)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [venue_id, rating, reviewer_name, review_description]);

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      data: { id: result.insertId }
    });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all reviews for a specific venue (Public)
export const getReviewsByVenue = async (req, res) => {
  try {
    const { venueId } = req.params;

    const [reviews] = await db.query(
      'SELECT * FROM reviews WHERE venue_id = ? ORDER BY created_at DESC',
      [venueId]
    );

    // Calculate average rating
    let averageRating = 0;
    if (reviews.length > 0) {
      const total = reviews.reduce((sum, review) => sum + review.rating, 0);
      averageRating = (total / reviews.length).toFixed(1);
    }

    res.json({
      success: true,
      data: {
        reviews,
        count: reviews.length,
        averageRating: parseFloat(averageRating)
      }
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get a single review by ID
export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const [reviews] = await db.query('SELECT * FROM reviews WHERE id = ?', [id]);

    if (reviews.length === 0) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.json({ success: true, data: reviews[0] });
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete a review (Admin only - moderation)
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query('DELETE FROM reviews WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
