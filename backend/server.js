import express from "express";
import multer from "multer";
import pkg from "pg";
import cors from "cors";

const { Pool } = pkg;

// Initialize Express
const app = express();
app.use(express.json());
app.use(cors()); // Add CORS support

// Initialize PostgreSQL client
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "COE",
  password: "nishanth",
  port: 5432,
});
pool.connect();

// Set up file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint to handle form submissions
app.post(
  "/submit",
  upload.fields([{ name: "tenthMarks" }, { name: "twelfthMarks" }]),
  async (req, res) => {
    const {
      name,
      usn,
      semester,
      section,
      aadharNumber,
      email,
      address,
      branch,
      fatherName,
      fatherOccupation,
      fatherPhoneNumber,
      motherName,
      motherOccupation,
      motherPhoneNumber,
    } = req.body;
    console.log(req.body);

    const tenthMarks = req.files["tenthMarks"]
      ? req.files["tenthMarks"][0].buffer
      : null;
    const twelfthMarks = req.files["twelfthMarks"]
      ? req.files["twelfthMarks"][0].buffer
      : null;

    try {
      const query = `
      INSERT INTO Student (Name, USN, Aadhar_Number, Semester, Section, Branch, Email, Tenth_Markscard, Twelfth_Markscard, Address,
      Fathers_Name, Fathers_Occupation, Fathers_Phone_Number, Mothers_Name, Mothers_Occupation, Mothers_Phone_Number)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
    `;
      const values = [
        name,
        usn,
        aadharNumber,
        semester,
        section,
        branch,
        email,
        tenthMarks,
        twelfthMarks,
        address,
        fatherName,
        fatherOccupation,
        fatherPhoneNumber,
        motherName,
        motherOccupation,
        motherPhoneNumber,
      ];
      console.log(values);

      await pool.query(query, values);

      res.status(200).json({ message: "Data saved successfully" });
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).json({ error: "Error saving data" });
    }
  }
);

// Endpoint to fetch student data based on query parameters
app.get("/students", async (req, res) => {
  const { semester, section, branch, usn } = req.query;

  let query = "SELECT * FROM Student WHERE 1=1"; // Base query

  const values = [];
  let index = 1;

  if (semester) {
    query += ` AND Semester = $${index++}`;
    values.push(semester);
  }
  if (section) {
    query += ` AND Section = $${index++}`;
    values.push(section);
  }
  if (branch) {
    query += ` AND Branch = $${index++}`;
    values.push(branch);
  }
  if (usn) {
    query += ` AND USN = $${index++}`;
    values.push(usn);
  }

  try {
    const result = await pool.query(query, values);
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

// Endpoint to serve PDF files
app.get("/pdf/:id/:type", async (req, res) => {
  const { id, type } = req.params;

  const column = type === "tenth" ? "tenth_markscard" : "twelfth_markscard";

  try {
    const result = await pool.query(
      `SELECT ${column} FROM Student WHERE id = $1`,
      [id]
    );
    const pdf = result.rows[0][column];

    if (pdf) {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${type}-marks.pdf`
      );
      res.send(Buffer.from(pdf, "binary")); // Ensure correct buffer conversion
    } else {
      res.status(404).send("File not found");
    }
  } catch (error) {
    console.error("Error fetching PDF:", error);
    res.status(500).send("Error fetching PDF");
  }
});

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
