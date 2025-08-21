import express from "express";
import cors from "cors";
import mysql from "mysql2";
import db from './db/db.js'

const app = express();
app.use(cors());
app.use(express.json());


app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log("Error fetching employees:", err);
      return res.status(500).json({ error: "Database error" });
    }
    return res.json(result);
  });
});






app.get("/employees/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM employees WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ error: "Employee not found" });
    res.json(result[0]);
  });
});

app.post("/employees", (req, res) => {
  const { name, email, position, salary } = req.body;
  if (!name || !email || !position || !salary)
    return res.status(400).json({ error: "All fields are required" });

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) return res.status(400).json({ error: "Invalid email" });

  const sql = "INSERT INTO employees (name, email, position, salary) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, position, salary], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") return res.status(400).json({ error: "Email exists" });
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Employee added", id: result.insertId });
  });
});

app.put("/employees/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, position, salary } = req.body;
  const sql = "UPDATE employees SET name=?, email=?, position=?, salary=? WHERE id=?";
  db.query(sql, [name, email, position, salary, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Employee updated" });
  });
});

app.delete("/employees/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM employees WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Employee deleted" });
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
