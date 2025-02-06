import "dotenv/config";

const port = process.env.PORT;
const user = process.env.PGUSER;
const host = process.env.PGHOST;
const password = process.env.PGPASSWORD;
const db = process.env.PGDATABASE;
const pgPort = process.env.PGPORT;

export { port, user, host, password, db, pgPort };
