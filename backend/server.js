import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const app = express();
const port = process.env.PORT || 5000;
const upload = multer({ dest: 'uploads/' });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/student', upload.fields([{ name: 'tenthMarks' }, { name: 'twelfthMarks' }]), async (req, res) => {
  const { name, usn, semester, section, aadharNumber, address, email } = req.body;
  const tenthMarks = req.files['tenthMarks'][0];
  const twelfthMarks = req.files['twelfthMarks'][0];

  try {
    const result = await pool.query(
      'INSERT INTO public."Student" (Name, USN, Sem, Section, Aadhaar_No, Address, Email, Tenth_Markscard, Twelth_Markscard) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [name, usn, semester, section, aadharNumber, address, email, tenthMarks.path, twelfthMarks.path]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting data:', err);
    console.log('Data:', {
      name,
      usn,
      semester,
      section,
      aadharNumber,
      address,
      email,
      tenthMarksPath: tenthMarks.path,
      twelfthMarksPath: twelfthMarks.path,
    });
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
