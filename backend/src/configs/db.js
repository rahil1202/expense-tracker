// db.js
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

export let pool

function getCACert() {
  if (process.env.DB_CA_PEM) return process.env.DB_CA_PEM.trim()
  if (process.env.DB_CA_B64) {
    return Buffer.from(process.env.DB_CA_B64, 'base64').toString('utf8').trim()
  }
  return undefined
}

export async function initDb() {
  try {
    const isProd = process.env.NODE_ENV === 'production'

    const baseConfig = {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: Number(process.env.DB_POOL_SIZE || 10),
      queueLimit: 0,
    }

    pool = mysql.createPool(
      isProd
        ? {
            ...baseConfig,
            ssl: {
              ca: getCACert(),
              rejectUnauthorized: true,
            },
          }
        : baseConfig
    )

    const [rows] = await pool.query('SELECT 1 AS ok')
    if (!rows?.[0] || Number(rows[0].ok) !== 1) {
      throw new Error('DB ping failed')
    }

    console.log(`✅ Database connected (${isProd ? 'production with SSL' : 'local without SSL'})`)
  } catch (err) {
    console.error('❌ Database connection failed:', err.message || err)
    process.exit(1)
  }
}
