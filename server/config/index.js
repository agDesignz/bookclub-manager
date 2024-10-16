const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT,
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  db: process.env.PGDATABASE,
  pgPort: process.env.PGPORT
}