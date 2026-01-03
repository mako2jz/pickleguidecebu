import db from '../config/db.js';

// Example controller for courts
export const getAllCourts = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM courts');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching courts:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

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

export const createCourt = async (req, res) => {
  try {
    const { name, location, description, price } = req.body;
    const [result] = await db.query(
      'INSERT INTO courts (name, location, description, price) VALUES (?, ?, ?, ?)',
      [name, location, description, price]
    );
    
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
