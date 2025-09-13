import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

export let pool

export async function initDb() {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    })

    // checking db connection
    const [rows] = await pool.query('SELECT 1 AS ok')
    if (rows[0].ok !== 1) throw new Error('DB ping failed')

    console.log('✅ Database connected')
  } catch (err) {
    console.error('❌ Database connection failed:', err.message)
    process.exit(1)
  }
}
