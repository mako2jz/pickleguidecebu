import db from '../config/db.js';

// Get all courts
export const getAllCourts = async (req, res) => {
  try {
    // Ordered by venue_name for a better list
    const [rows] = await db.query('SELECT * FROM courts ORDER BY venue_name ASC');
    res.json({ success: true, data: rows });
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