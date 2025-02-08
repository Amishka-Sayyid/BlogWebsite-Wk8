//setting up connection pool

import pg from "pg";

//accessing the connection string I stored in the .env.local file
const dbConnectionString = process.env.NEXT_PUBLIC_DATABASE_URL;

//setting up a pool
export const db = new pg.Pool({
  connectionString: dbConnectionString,
});
