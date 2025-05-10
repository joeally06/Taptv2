import { Pool } from 'pg';
import { dbConfig } from './db-config.js';

// Test database connection immediately
async function testConnection() {
  const pool = new Pool(dbConfig);
  try {
    const client = await pool.connect();
    console.log('Successfully connected to PostgreSQL database');
    client.release();
    return true;
  } catch (err) {
    console.error('Failed to connect to database:', err);
    return false;
  }
}

// Test connection on startup
testConnection();

// First connect to default database
const defaultPool = new Pool({
  ...dbConfig,
  database: 'postgres' // Connect to default database first
});

async function createDatabase() {
  try {
    // Create the tap_conference database if it doesn't exist
    await defaultPool.query(`
      CREATE DATABASE tap_conference
      WITH 
      OWNER = postgres
      ENCODING = 'UTF8'
      LC_COLLATE = 'English_United States.1252'
      LC_CTYPE = 'English_United States.1252'
      TABLESPACE = pg_default
      CONNECTION LIMIT = -1;
    `);
    console.log('Database tap_conference created successfully');
  } catch (error: any) {
    if (error.code === '42P04') { // Database already exists error code
      console.log('Database tap_conference already exists');
    } else {
      console.error('Error creating database:', error);
      throw error;
    }
  } finally {
    await defaultPool.end();
  }
}

// Create database then connect to it
await createDatabase();

// Connect to tap_conference database
const pool = new Pool({
  ...dbConfig,
  database: 'tap_conference'
});

// Initialize database with required tables
async function initializeDatabase() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
      // Create tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user'
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS conferences (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        location TEXT NOT NULL,
        description TEXT,
        registration_open BOOLEAN DEFAULT true
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS registrations (
        id TEXT PRIMARY KEY,
        organization TEXT NOT NULL,
        conference_id TEXT NOT NULL REFERENCES conferences(id),
        total_amount NUMERIC NOT NULL
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS attendees (
        id TEXT PRIMARY KEY,
        registration_id TEXT NOT NULL REFERENCES registrations(id),
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        zip TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL
      )
    `);

    // Check if we need to insert sample conference
    const result = await client.query('SELECT COUNT(*) as count FROM conferences');
    if (parseInt(result.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO conferences (id, name, start_date, end_date, location, description, registration_open)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [
        'conf-2024',
        'TAPT Annual Conference 2024',
        '2024-06-07',
        '2024-06-09',
        'Franklin, TN',
        'Annual Tennessee Association for Pupil Transportation Conference',
        true
      ]);
      console.log('Sample conference data inserted');
    }    // Conference table is already created and sample data inserted above

    await client.query('COMMIT');
    console.log('Database initialized successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Failed to initialize database:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Initialize database schema
await initializeDatabase();

export async function getLatestConference() {
  try {
    const result = await pool.query(`
      SELECT * FROM conferences 
      ORDER BY start_date DESC 
      LIMIT 1
    `);
    
    if (!result.rows[0]) {
      // Insert a default conference if none exists
      const defaultConference = {
        id: 'conf-2024',
        name: 'TAPT Annual Conference 2024',
        start_date: '2024-06-07',
        end_date: '2024-06-09',
        location: 'Franklin, TN',
        description: 'Annual Tennessee Association for Pupil Transportation Conference',
        registration_open: true
      };
      
      await pool.query(`
        INSERT INTO conferences (id, name, start_date, end_date, location, description, registration_open)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, Object.values(defaultConference));
      
      return defaultConference;
    }
    
    return result.rows[0];
  } catch (error) {
    console.error('Error getting latest conference:', error);
    return null;
  }
}

export async function createRegistration(data: {
  organization: string;
  attendees: Array<{
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    email: string;
    phone: string;
  }>;
  totalAmount: number;
  conferenceId: string;
}) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Create registration
    const registrationId = 'reg-' + Math.random().toString(36).substr(2, 9);
    await client.query(`
      INSERT INTO registrations (id, organization, conference_id, total_amount)
      VALUES ($1, $2, $3, $4)
    `, [registrationId, data.organization, data.conferenceId, data.totalAmount]);

    // Create attendees
    for (const attendee of data.attendees) {
      await client.query(`
        INSERT INTO attendees (
          id, registration_id, first_name, last_name, 
          address, city, state, zip, email, phone
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
        'att-' + Math.random().toString(36).substr(2, 9),
        registrationId,
        attendee.firstName,
        attendee.lastName,
        attendee.address,
        attendee.city,
        attendee.state,
        attendee.zip,
        attendee.email,
        attendee.phone
      ]);
    }

    await client.query('COMMIT');
    return { registrationId };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export const db = pool;