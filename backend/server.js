import express from 'express';
import multer from 'multer';
import pkg from 'pg';
import cors from 'cors';

const { Pool } = pkg;
// Initialize Express
const app = express();
app.use(express.json());
app.use(cors()); // Add CORS support

// Initialize PostgreSQL client
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'COE',
  password: 'navshar0923',
  port: 5432,
});
pool.connect();

// Set up file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint to handle form submissions
app.post('/submit', upload.fields([{ name: 'tenthMarks' }, { name: 'twelfthMarks' }]), async (req, res) => {
  const { name, usn, semester, section, aadharNumber, email, address, branch } = req.body;
  const tenthMarks = req.files['tenthMarks'] ? req.files['tenthMarks'][0].buffer : null;
  const twelfthMarks = req.files['twelfthMarks'] ? req.files['twelfthMarks'][0].buffer : null;

  try {
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

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log("Server running on port ${PORT}");
});