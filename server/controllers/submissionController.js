import db from '../config/db.js';

// Submit a new court (pending approval)
export const submitCourt = async (req, res) => {
  try {
    const { 
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

    // Validate request based on court_submissions schema
    if (!venue_name || !location || !number_of_courts) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: venue_name, location, or number_of_courts' 
      });
    }

    const query = `
      INSERT INTO court_submissions (
        venue_name, location, number_of_courts, price, 
        facebook_page, instagram, viber, telephone_number, mobile_number, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `;

    const values = [
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
      message: 'Court submission received successfully. Pending admin approval.',
      data: { id: result.insertId }
    });
  } catch (error) {
    console.error('Error submitting court:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};