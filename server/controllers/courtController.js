import db from '../config/db.js';

// Get all courts with pagination
export const getAllCourts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    // Get total count for pagination
    const [countResult] = await db.query('SELECT COUNT(*) as total FROM courts');
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    // Get paginated courts with their average ratings
    const [rows] = await db.query(`
      SELECT 
        c.*,
        COALESCE(AVG(r.rating), 0) as averageRating,
        COUNT(r.id) as reviewCount
      FROM courts c
      LEFT JOIN reviews r ON c.id = r.venue_id
      GROUP BY c.id
      ORDER BY c.venue_name ASC
      LIMIT ? OFFSET ?
    `, [limit, offset]);

    res.json({ 
      success: true, 
      data: {
        venues: rows,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: total,
          itemsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Error fetching courts:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get single court by ID
export const getCourtById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM courts WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Court not found' });
    }
    
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error fetching court:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};