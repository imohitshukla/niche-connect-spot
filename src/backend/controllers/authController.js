import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import client from '../config/database.js';

export const registerCreator = async (c) => {
  const { name, email, password, portfolio_link } = c.req.valid('json');
  
  try {
    // Check if user exists
    const userExists = await client.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (userExists.rows.length > 0) {
      return c.json({ error: 'User already exists' }, 400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Start transaction
    await client.query('BEGIN');

    // Create user
    const newUser = await client.query(
      'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id',
      [email, hashedPassword, 'creator']
    );

    const userId = newUser.rows[0].id;

    // Create creator profile
    await client.query(
      `INSERT INTO creator_profiles (user_id, name, portfolio_links) 
       VALUES ($1, $2, $3)`,
      [userId, name, [portfolio_link]]
    );

    await client.query('COMMIT');

    // Generate JWT
    const token = jwt.sign(
      { id: userId, email, role: 'creator' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return c.json({
      token,
      user: { id: userId, email, role: 'creator', name }
    }, 201);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    return c.json({ error: 'Internal server error' }, 500);
  }
};

// Add registerBrand and login functions similarly