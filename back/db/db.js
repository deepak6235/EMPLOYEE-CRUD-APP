import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",        
  password: "123456789",        
  database: "employee_db"
});

db.connect((err) => {
  if (err) {
    console.error("sqlconnection error:", err);
    return;
  }
  console.log("connected to sql");
});

export default db;
