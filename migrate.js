
const { Pool } = require("pg");
const fs = require("fs");

const env = fs.readFileSync(".env", "utf-8");
const dbUrl = env.match(/DATABASE_URL=(.*)/)[1].trim();

const pool = new Pool({
  connectionString: dbUrl,
});

pool.query("ALTER TABLE \"user\" RENAME COLUMN \"id_proof_url\" TO \"image_url\";")
  .then(() => {
    console.log("Renamed column successfully.");
    process.exit(0);
  })
  .catch((err) => {
    if (err.message.includes("does not exist") && err.message.includes("id_proof_url")) {
      console.log("id_proof_url already renamed or does not exist.");
      process.exit(0);
    } else if (err.message.includes("already exists") && err.message.includes("image_url")) {
      console.log("image_url already exists.");
      process.exit(0);
    } else {
      console.error("Migration error:", err.message);
      process.exit(1);
    }
  });

