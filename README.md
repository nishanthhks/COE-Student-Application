# COE-Student-Application
---
# Application Setup

---

### Create a new DATABASE in PostgreSQL

```sql
COE
```

### Change Password

`server.js`

```sql
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "COE",
  password: **YOUR_PASSWORD**,
  port: 5432,
});
```

### Run the below Query (in database COE)

```sql
CREATE TABLE Student (
    id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    USN VARCHAR(50) NOT NULL UNIQUE,
    Aadhar_Number VARCHAR(12) NOT NULL,
    Semester INT NOT NULL,
    Section CHAR(1) NOT NULL,
    Branch VARCHAR(50) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Tenth_Markscard BYTEA,
    Twelfth_Markscard BYTEA,
    Address TEXT NOT NULL,
    Fathers_Name VARCHAR(255),
    Fathers_Occupation VARCHAR(255),
    Fathers_Phone_Number VARCHAR(20),
    Mothers_Name VARCHAR(255),
    Mothers_Occupation VARCHAR(255),
    Mothers_Phone_Number VARCHAR(20)
);
```

---

## FRONTEND

`/frontend`

```bash
npm run dev
```

## BACKEND

`/backend`

```bash
nodemon server.js
```