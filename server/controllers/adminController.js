import db from '../config/db.js';

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

// Get a single court by ID
export const getCourtById = async (req, res) => {
  try {
    const { id } = req.params;
    const [courts] = await db.query('SELECT * FROM courts WHERE id = ?', [id]);
    
    if (courts.length === 0) {
      return res.status(404).json({ success: false, message: 'Court not found' });
    }

    res.json({ success: true, data: courts[0] });
  } catch (error) {
    console.error('Error fetching court:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all courts
export const getAllCourts = async (req, res) => {
  try {
    const [courts] = await db.query('SELECT * FROM courts ORDER BY created_at DESC');
    res.json({ success: true, data: courts });
  } catch (error) {
    console.error('Error fetching courts:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update a court
export const updateCourt = async (req, res) => {
  try {
    const { id } = req.params;
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

    const query = `
      UPDATE courts 
      SET venue_picture = ?, venue_name = ?, location = ?, number_of_courts = ?, 
          price = ?, facebook_page = ?, instagram = ?, viber = ?, 
          telephone_number = ?, mobile_number = ?
      WHERE id = ?
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
      mobile_number || null,
      id
    ];

    const [result] = await db.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Court not found' });
    }

    res.json({ success: true, message: 'Court updated successfully' });
  } catch (error) {
    console.error('Error updating court:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete a court
export const deleteCourt = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM courts WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Court not found' });
    }

    res.json({ success: true, message: 'Court deleted successfully' });
  } catch (error) {
    console.error('Error deleting court:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Approve a submission
export const approveSubmission = async (req, res) => {
  let connection;
  try {
    const { id } = req.params;
    const reviewerId = req.user ? req.user.id : null;

    connection = await db.getConnection();
    await connection.beginTransaction();

    // 1. Fetch submission
    const [submissions] = await connection.query(
      'SELECT * FROM court_submissions WHERE id = ? AND status = "pending"', 
      [id]
    );

    if (submissions.length === 0) {
      await connection.rollback();
      return res.status(404).json({ success: false, message: 'Submission not found or already processed' });
    }

    const submission = submissions[0];

    // 2. Insert into courts (using default picture)
    const defaultPicture = '/defaults/court-placeholder.jpg';
    
    const insertQuery = `
      INSERT INTO courts (
        venue_picture, venue_name, location, number_of_courts, price, 
        facebook_page, instagram, viber, telephone_number, mobile_number
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      defaultPicture,
      submission.venue_name, 
      submission.location, 
      submission.number_of_courts, 
      submission.price,
      submission.facebook_page,
      submission.instagram,
      submission.viber,
      submission.telephone_number,
      submission.mobile_number
    ];

    const [insertResult] = await connection.query(insertQuery, values);

    // 3. Mark approved
    await connection.query(
      'UPDATE court_submissions SET status = "approved", reviewed_by = ?, reviewed_at = NOW() WHERE id = ?',
      [reviewerId, id]
    );

    await connection.commit();

    res.json({ 
      success: true, 
      message: 'Submission approved', 
      data: { courtId: insertResult.insertId }
    });

  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Error approving submission:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  } finally {
    if (connection) connection.release();
  }
};

// Decline a submission (Hard Delete)
export const declineSubmission = async (req, res) => {
  try {
    const { id } = req.params;

    // Hard delete: completely remove the record
    const [result] = await db.query('DELETE FROM court_submissions WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Submission not found' });
    }

    res.json({ success: true, message: 'Submission declined and removed' });
  } catch (error) {
    console.error('Error declining submission:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all pending submissions (for admin review queue)
export const getPendingSubmissions = async (req, res) => {
  try {
    const [submissions] = await db.query(
      'SELECT * FROM court_submissions WHERE status = "pending" ORDER BY created_at ASC'
    );
    res.json({ success: true, data: submissions });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};