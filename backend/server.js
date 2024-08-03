import express from 'express';
import multer from 'multer';
import pkg from 'pg';
import cors from 'cors';

const { Pool } = pkg;

// Initialize Express
const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' })); // Add CORS support

// Initialize PostgreSQL client
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'COE',
  password: 'navshar0923',
  port: 5432,
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Set up file upload
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

app.get('/students', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Student');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching student data:', error);
    res.status(500).json({ error: 'Error fetching student data' });
  }
});

// New search endpoint
app.get('/students/search', async (req, res) => {
  const { semester, section, branch, usn } = req.query;

  console.log(req.query);


  let query = 'SELECT * FROM Student WHERE 1=1';
  const queryParams = [];

  if (semester) {
    queryParams.push(semester);
    query += ` AND Semester = $${queryParams.length}`;
  }

  if (section) {
    queryParams.push(section);
    query += ` AND Section = $${queryParams.length}`;
  }

  if (branch) {
    queryParams.push(branch);
    query += ` AND Branch = $${queryParams.length}`;
  }

  if (usn) {
    queryParams.push(usn);
    query += ` AND USN = $${queryParams.length}`;
  }

  try {
    // If no query parameters are provided, return all students
    const result = queryParams.length === 0 
      ? await pool.query('SELECT * FROM Student')
      : await pool.query(query, queryParams);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Error fetching search results' });
  }
});

// Endpoint to handle form submissions
app.post('/submit', upload.fields([{ name: 'tenthMarks' }, { name: 'twelfthMarks' }]), async (req, res) => {
  const { name, usn, semester, section, aadharNumber, email, address, branch } = req.body;
  const tenthMarks = req.files['tenthMarks'] ? req.files['tenthMarks'][0].buffer : null;
  const twelfthMarks = req.files['twelfthMarks'] ? req.files['twelfthMarks'][0].buffer : null;

  try {
    // Check if the USN or email already exists
    const checkQuery = `
      SELECT 1 FROM Student WHERE USN = $1 OR Email = $2
    `;
    const checkValues = [usn, email];
    const result = await pool.query(checkQuery, checkValues);

    if (result.rowCount > 0) {
      // If a record is found, send a response indicating a duplicate error
      return res.status(400).json({ error: 'USN or email already exists' });
    }

    // Insert new record if no duplicates found
    const query = `
      INSERT INTO Student (Name, USN, Aadhar_Number, Semester, Section, Branch, Email, Tenth_Markscard, Twelfth_Markscard, Address)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `;
    const values = [name, usn, aadharNumber, semester, section, branch, email, tenthMarks, twelfthMarks, address];

    await pool.query(query, values);

    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Error saving data' });
  }
});

app.get('/pdf/:type/:usn', async (req, res) => {
  const { type, usn } = req.params;
  const column = type === 'tenth' ? 'Tenth_Markscard' : 'Twelfth_Markscard';

  try {
    const result = await pool.query(
      `SELECT ${column} FROM Student WHERE USN = $1`,
      [usn]
    );

    if (result.rows.length > 0) {
      const pdfData = result.rows[0][column];
      if (pdfData) {
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfData);
      } else {
        res.status(404).send('PDF data not found');
      }
    } else {
      res.status(404).send('Student not found');
    }
  } catch (error) {
    console.error('Error fetching PDF:', error);
    res.status(500).send('Error fetching PDF');
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
