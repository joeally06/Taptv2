import { createClient } from '@libsql/client';
import { mkdir, chmod, writeFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// Ensure data directory exists with correct permissions
const dataDir = join(process.cwd(), 'data');
const dbPath = join(dataDir, 'conference.db');

// Initialize database and directory
async function initializeDatabase() {
  try {
    // Create data directory if it doesn't exist
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }
    
    // Set directory permissions to 755
    await chmod(dataDir, 0o755);
    
    // Create empty database file if it doesn't exist
    if (!existsSync(dbPath)) {
      await writeFile(dbPath, '');
      await chmod(dbPath, 0o644);
    }
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

// Initialize database before creating client
await initializeDatabase();

const db = createClient({
  url: `file:${dbPath}`
});

// Initialize database with required tables
let transactionStarted = false;
try {
  console.log('Initializing database...');
  // Start transaction
  await db.execute('BEGIN');
  transactionStarted = true;
  
  // Create tables one at a time to better handle errors
  await db.execute(`
    CREATE TABLE IF NOT EXISTS conferences (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      location TEXT NOT NULL,
      description TEXT,
      price NUMERIC NOT NULL DEFAULT 0,
      max_attendees INTEGER
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS registrations (
      id TEXT PRIMARY KEY,
      organization TEXT NOT NULL,
      total_attendees INTEGER NOT NULL,
      total_amount NUMERIC NOT NULL,
      conference_id TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (conference_id) REFERENCES conferences (id)
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS attendees (
      id TEXT PRIMARY KEY,
      registration_id TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      zip TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      FOREIGN KEY (registration_id) REFERENCES registrations (id)
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS luncheon_events (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      location TEXT NOT NULL,
      city TEXT NOT NULL,
      address TEXT NOT NULL,
      max_attendees INTEGER,
      notes TEXT
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS luncheon_registrations (
      id TEXT PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      job_title TEXT NOT NULL,
      district TEXT NOT NULL,
      department_location TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      group_size INTEGER NOT NULL,
      event_id TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (event_id) REFERENCES luncheon_events (id)
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS hall_of_fame_nominations (
      id TEXT PRIMARY KEY,
      supervisor_first_name TEXT NOT NULL,
      supervisor_last_name TEXT NOT NULL,
      supervisor_email TEXT NOT NULL,
      district TEXT NOT NULL,
      nominee_first_name TEXT NOT NULL,
      nominee_last_name TEXT NOT NULL,
      nominee_city TEXT NOT NULL,
      years_of_service INTEGER,
      region TEXT NOT NULL,
      is_tapt_member BOOLEAN NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'pending'
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS scholarship_applications (
      id TEXT PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      birth_date TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      zip TEXT NOT NULL,
      gender TEXT,
      is_us_citizen BOOLEAN,
      current_status TEXT,
      is_first_gen BOOLEAN,
      major TEXT,
      career_objective TEXT,
      high_school TEXT NOT NULL,
      school_district TEXT NOT NULL,
      graduation_year INTEGER NOT NULL,
      gpa NUMERIC,
      activities TEXT,
      act_year INTEGER,
      act_score INTEGER,
      essay TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'pending'
    )
  `);

  await db.execute('COMMIT');
  transactionStarted = false;

  // Insert sample conference if none exists
  console.log('Checking for existing conferences...');
  const conferenceCount = await db.execute('SELECT COUNT(*) as count FROM conferences');
  console.log('Conference count:', conferenceCount.rows[0].count);
  if (conferenceCount.rows[0].count === 0) {
    console.log('Creating sample conference...');
    await db.execute({
      sql: `
        INSERT INTO conferences (id, name, start_date, end_date, location, description, price, max_attendees)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        'conf-2025',
        '2025 TAPT Conference & Trade Show',
        '2025-06-02',
        '2025-06-04',
        'Music Road Hotel, Pigeon Forge-Gatlinburg',
        'Join us for the annual Tennessee Association of Pupil Transportation Conference and Trade Show.',
        175.00,
        200
      ]
    });
  }

  // Insert sample luncheon events if none exist
  const luncheonCount = await db.execute('SELECT COUNT(*) as count FROM luncheon_events');
  if (luncheonCount.rows[0].count === 0) {
    const events = [
      {
        id: 'lunch-1',
        date: '2025-04-25',
        time: '10:30 AM',
        location: "Logan's Roadhouse",
        city: 'Cookeville',
        address: '1395 Interstate Dr, Cookeville, TN 38501',
        max_attendees: 50
      },
      {
        id: 'lunch-2',
        date: '2025-05-01',
        time: '10:00 AM',
        location: 'Greene Technical Center',
        city: 'Greeneville',
        address: '1121 Hal Henard Rd, Greeneville, TN 37743',
        max_attendees: 50,
        notes: 'Catered by Top Choice BBQ'
      },
      {
        id: 'lunch-3',
        date: '2025-05-02',
        time: '10:00 AM',
        location: "Calhoun's at the Marina",
        city: 'Lenoir City',
        address: '4550 City Park Dr, Lenoir City, TN 37772',
        max_attendees: 50
      }
    ];

    for (const event of events) {
      await db.execute({
        sql: `
          INSERT INTO luncheon_events (id, date, time, location, city, address, max_attendees, notes)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        args: [
          event.id,
          event.date,
          event.time,
          event.location,
          event.city,
          event.address,
          event.max_attendees,
          event.notes || null
        ]
      });
    }
  }
} catch (error) {
  // Only attempt rollback if a transaction is active
  if (transactionStarted) {
    await db.execute('ROLLBACK');
  }
  console.error('Database initialization error:', error);
  throw error;
}

export const getLatestConference = async () => {
  const result = await db.execute('SELECT * FROM conferences ORDER BY start_date ASC LIMIT 1');
  return result.rows[0];
};

export const createRegistration = async (data: {
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
}) => {
  console.log('Creating registration with data:', data);
  
  // Validate all required fields are present and not undefined
  if (!data.organization) {
    throw new Error('Organization is required');
  }

  if (!Array.isArray(data.attendees) || data.attendees.length === 0) {
    throw new Error('At least one attendee is required');
  }

  // Validate each attendee has all required fields
  for (const attendee of data.attendees) {
    const requiredFields = ['firstName', 'lastName', 'address', 'city', 'state', 'zip', 'email', 'phone'];
    for (const field of requiredFields) {
      if (!attendee[field as keyof typeof attendee]) {
        throw new Error(`Attendee ${field} is required`);
      }
    }
  }
  
  // Check for duplicates
  await checkDuplicateRegistration(data);
  
  const registrationId = 'reg-' + Math.random().toString(36).substr(2, 9);
  
  // Begin transaction
  console.log('Starting transaction...');
  await db.execute('BEGIN');

  try {
    // Insert registration
    await db.execute({
      sql: `
        INSERT INTO registrations (id, organization, total_attendees, total_amount, conference_id)
        VALUES (?, ?, ?, ?, ?)
      `,
      args: [
        registrationId,
        data.organization,
        data.attendees.length,
        data.totalAmount,
        data.conferenceId
      ]
    });

    // Insert attendees
    for (let i = 0; i < data.attendees.length; i++) {
      const attendee = data.attendees[i];
      const attendeeId = `att-${registrationId}-${i + 1}`;
      
      // Log the attendee data before insertion
      console.log('Inserting attendee:', {
        id: attendeeId,
        registration_id: registrationId,
        ...attendee
      });

      await db.execute({
        sql: `
          INSERT INTO attendees (
            id, registration_id, first_name, last_name,
            address, city, state, zip, email, phone
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        args: [
          attendeeId,
          registrationId,
          attendee.firstName,
          attendee.lastName,
          attendee.address,
          attendee.city,
          attendee.state,
          attendee.zip,
          attendee.email,
          attendee.phone
        ]
      });
    }

    // Commit transaction
    await db.execute('COMMIT');
    return { id: registrationId };
  } catch (error) {
    // Rollback on error
    await db.execute('ROLLBACK');
    throw error;
  }
};

export const createLuncheonRegistration = async (data: {
  firstName: string;
  lastName: string;
  jobTitle: string;
  district: string;
  departmentLocation: string;
  email: string;
  phone: string;
  groupSize: number;
  location: string;
}) => {
  console.log('Creating luncheon registration with data:', data);
  
  // Check for duplicates
  await checkDuplicateLuncheon(data);
  
  const id = 'lunch-reg-' + Math.random().toString(36).substr(2, 9);
  
  // Begin transaction
  console.log('Starting transaction...');
  await db.execute('BEGIN');

  try {
    // First verify the event exists
    const [city, location] = data.location.split('-');
    const event = await db.execute({
      sql: 'SELECT id FROM luncheon_events WHERE location = ? AND city = ?',
      args: [location, city]
    });

    if (!event.rows[0]) {
      throw new Error('Invalid luncheon event selected');
    }

    // Insert registration
    await db.execute({
      sql: `
        INSERT INTO luncheon_registrations (
          id, first_name, last_name, job_title, district,
          department_location, email, phone, group_size, event_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        id,
        data.firstName,
        data.lastName,
        data.jobTitle,
        data.district,
        data.departmentLocation,
        data.email,
        data.phone,
        data.groupSize,
        event.rows[0].id
      ]
    });

    // Commit transaction
    await db.execute('COMMIT');
    return { id };
  } catch (error) {
    // Rollback on error
    await db.execute('ROLLBACK');
    throw error;
  }
};

export const createHallOfFameNomination = async (data: {
  supervisorFirstName: string;
  supervisorLastName: string;
  supervisorEmail: string;
  district: string;
  nomineeFirstName: string;
  nomineeLastName: string;
  nomineeCity: string;
  yearsOfService?: number;
  region: string;
  isTAPTMember: 'yes' | 'no';
}) => {
  console.log('Creating Hall of Fame nomination with data:', data);
  
  // Check for duplicates
  await checkDuplicateHOFNomination(data);
  
  const id = 'hof-' + Math.random().toString(36).substr(2, 9);

  // Begin transaction
  console.log('Starting transaction...');
  await db.execute('BEGIN');

  try {
    await db.execute({
      sql: `
        INSERT INTO hall_of_fame_nominations (
          id, supervisor_first_name, supervisor_last_name, supervisor_email,
          district, nominee_first_name, nominee_last_name, nominee_city,
          years_of_service, region, is_tapt_member
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        id,
        data.supervisorFirstName,
        data.supervisorLastName,
        data.supervisorEmail,
        data.district,
        data.nomineeFirstName,
        data.nomineeLastName,
        data.nomineeCity,
        data.yearsOfService || null,
        data.region,
        data.isTAPTMember === 'yes'
      ]
    });

    // Commit transaction
    await db.execute('COMMIT');
    return { id };
  } catch (error) {
    // Rollback on error
    await db.execute('ROLLBACK');
    throw error;
  }
};

export const createScholarshipApplication = async (data: {
  firstName: string;
  lastName: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  email: string;
  mobile: string;
  address1: string;
  address2?: string;
  city: string;
  zipCode: string;
  gender?: string;
  usCitizen: 'yes' | 'no';
  currentStatus?: string;
  firstGen: 'yes' | 'no';
  major?: string;
  careerObjective?: string;
  highSchool: string;
  schoolDistrict: string;
  graduationYear: number;
  gpa?: number;
  activities?: string;
  actYear?: number;
  actScore?: number;
  essay: string;
}) => {
  console.log('Creating scholarship application with data:', data);
  
  // Check for duplicates
  await checkDuplicateScholarship(data);
  
  const id = 'scholar-' + Math.random().toString(36).substr(2, 9);
  
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const birthDate = `${data.birthYear}-${String(months.indexOf(data.birthMonth) + 1).padStart(2, '0')}-${String(data.birthDay).padStart(2, '0')}`;

  // Begin transaction
  console.log('Starting transaction...');
  await db.execute('BEGIN');

  try {
    await db.execute({
      sql: `
        INSERT INTO scholarship_applications (
          id, first_name, last_name, birth_date, email, phone,
          address, city, state, zip, gender, is_us_citizen,
          current_status, is_first_gen, major, career_objective,
          high_school, school_district, graduation_year, gpa,
          activities, act_year, act_score, essay
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        id,
        data.firstName,
        data.lastName,
        birthDate,
        data.email,
        data.mobile,
        data.address1 + (data.address2 ? ' ' + data.address2 : ''),
        data.city,
        'TN',
        data.zipCode,
        data.gender || null,
        data.usCitizen === 'yes',
        data.currentStatus || null,
        data.firstGen === 'yes',
        data.major || null,
        data.careerObjective || null,
        data.highSchool,
        data.schoolDistrict,
        data.graduationYear,
        data.gpa || null,
        data.activities || null,
        data.actYear || null,
        data.actScore || null,
        data.essay
      ]
    });

    // Commit transaction
    await db.execute('COMMIT');
    return { id };
  } catch (error) {
    // Rollback on error
    await db.execute('ROLLBACK');
    throw error;
  }
};

export const authenticateUser = async (email: string, password: string) => {
  const result = await db.execute({
    sql: 'SELECT * FROM users WHERE email = ? AND password = ?',
    args: [email, password] // Note: In production, use proper password hashing
  });
  
  return result.rows[0] || null;
};

// Duplicate checking functions
export const checkDuplicateRegistration = async (data: {
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
}) => {
  // Check for same organization registering same attendee with same address
  for (const attendee of data.attendees) {
    const result = await db.execute({
      sql: `
        SELECT r.id 
        FROM registrations r
        JOIN attendees a ON r.id = a.registration_id
        WHERE r.organization = ?
        AND a.first_name = ? 
        AND a.last_name = ?
        AND a.address = ?
        AND a.city = ?
        AND a.state = ?
        AND a.zip = ?
      `,
      args: [
        data.organization,
        attendee.firstName,
        attendee.lastName,
        attendee.address,
        attendee.city,
        attendee.state,
        attendee.zip
      ]
    });
    
    if (result.rows.length > 0) {
      throw new Error(`${attendee.firstName} ${attendee.lastName} is already registered with the same address for this organization. If this is a different person with the same name, please use a different address.`);
    }
  }
};

export const checkDuplicateLuncheon = async (data: {
  email: string;
  location: string;
}) => {
  const [city, location] = data.location.split('-');
  const result = await db.execute({
    sql: `
      SELECT lr.id
      FROM luncheon_registrations lr
      JOIN luncheon_events le ON lr.event_id = le.id
      WHERE lr.email = ?
      AND le.location = ?
      AND le.city = ?
    `,
    args: [data.email, location, city]
  });

  if (result.rows.length > 0) {
    throw new Error('You have already registered for this luncheon event');
  }
};

export const checkDuplicateHOFNomination = async (data: {
  nomineeFirstName: string;
  nomineeLastName: string;
  district: string;
}) => {
  const result = await db.execute({
    sql: `
      SELECT id
      FROM hall_of_fame_nominations
      WHERE nominee_first_name = ?
      AND nominee_last_name = ?
      AND district = ?
    `,
    args: [data.nomineeFirstName, data.nomineeLastName, data.district]
  });

  if (result.rows.length > 0) {
    throw new Error('This nominee has already been nominated from this district');
  }
};

export const checkDuplicateScholarship = async (data: {
  email: string;
  firstName: string;
  lastName: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
}) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const birthDate = `${data.birthYear}-${String(months.indexOf(data.birthMonth) + 1).padStart(2, '0')}-${String(data.birthDay).padStart(2, '0')}`;

  const result = await db.execute({
    sql: `
      SELECT id
      FROM scholarship_applications
      WHERE (email = ?)
      OR (first_name = ? AND last_name = ? AND birth_date = ?)
    `,
    args: [data.email, data.firstName, data.lastName, birthDate]
  });

  if (result.rows.length > 0) {
    throw new Error('An application has already been submitted for this student');
  }
};