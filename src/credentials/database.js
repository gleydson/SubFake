import 'dotenv/config';

module.exports = {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  db_url: process.env.DB_URL,
  db_port: process.env.DB_PORT,
  db_name: process.env.DB_NAME,
};
