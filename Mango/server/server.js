const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "SuperUserForSuperEarth4fr33d0m!",
  database: "restaurant",
  waitForConnections: true,
  connectionLimit: 10,
});

app.get("/api/foods", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM food");
    res.json(rows);
  } catch (error) {
    console.error("Помилка:", error);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

app.get("/api/personal", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, name, CAST(is_eom AS UNSIGNED) as is_eom, image_url FROM personal");
    res.json(rows);
  } catch (error) {
    console.error("Помилка:", error);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

app.post("/api/personal", async (req, res) => {
  try {
    const { name, phone, email, birth_date } = req.body;
    const [result] = await pool.query(
      "INSERT INTO personal (name, phone, email, birth_date, is_eom, image_url) VALUES (?, ?, ?, ?, 0, '/default_avatar.png')",
      [name, phone, email, birth_date]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error("Помилка:", error);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущений на http://localhost:${PORT}`);
});