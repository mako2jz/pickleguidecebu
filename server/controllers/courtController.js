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

// Create a new court
export const createCourt = async (req, res) => {
  try {
    const { 
      venue_picture,
      venue_name, 
      location, 
      number_of_courts, 
      price,
      facebook_page,
      instagram,
      viber,
      telephone_number,
      mobile_number
    } = req.body;

    // Validate request against NOT NULL schema constraints
    if (!venue_picture || !venue_name || !location || !number_of_courts) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: venue_picture, venue_name, location, or number_of_courts' 
      });
    }

    const query = `
      INSERT INTO courts (
        venue_picture, venue_name, location, number_of_courts, price, 
        facebook_page, instagram, viber, telephone_number, mobile_number
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      venue_picture,
      venue_name, 
      location, 
      number_of_courts, 
      price || null,
      facebook_page || null,
      instagram || null,
      viber || null,
      telephone_number || null,
      mobile_number || null
    ];

    const [result] = await db.query(query, values);
    
    res.status(201).json({ 
      success: true, 
      message: 'Court created successfully',
      data: { id: result.insertId }
    });
  } catch (error) {
    console.error('Error creating court:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

