import { pool } from '../configs/db.js'

function buildDateWindowClause(months) {
  if (!months) return { where: '', params: [] }
  // Filter expenses to last N months from "today"
  return { where: 'WHERE e.date >= DATE_SUB(CURDATE(), INTERVAL ? MONTH)', params: [months] }
}

export async function getTopDays(req, res, next) {
  try {
    const months = req.validated?.query?.months
    const { where, params } = buildDateWindowClause(months)

    const sql = `
      WITH day_totals AS (
        SELECT e.user_id, DATE(e.date) AS spend_date, SUM(e.amount) AS day_total
        FROM expenses e
        ${where}
        GROUP BY e.user_id, DATE(e.date)
      ),
      ranked AS (
        SELECT
          dt.user_id, dt.spend_date, dt.day_total,
          ROW_NUMBER() OVER (PARTITION BY dt.user_id ORDER BY dt.day_total DESC, dt.spend_date DESC) AS rn
        FROM day_totals dt
      )
      SELECT r.user_id, u.name AS user_name, r.spend_date, r.day_total
      FROM ranked r
      JOIN users u ON u.id = r.user_id
      WHERE r.rn <= 3
      ORDER BY r.user_id, r.day_total DESC, r.spend_date DESC
    `
    const [rows] = await pool.query(sql, params)
    res.json(rows)
  } catch (err) { next(err) }
}

export async function getMonthlyChange(req, res, next) {
  try {
    const months = req.validated?.query?.months
    const { where, params } = buildDateWindowClause(months)

    const sql = `
      WITH monthly AS (
        SELECT
          e.user_id,
          DATE_FORMAT(e.date, '%Y-%m-01') AS month_start,
          SUM(e.amount) AS month_total
        FROM expenses e
        ${where}
        GROUP BY e.user_id, DATE_FORMAT(e.date, '%Y-%m-01')
      ),
      with_prev AS (
        SELECT
          m.*,
          LAG(m.month_total) OVER (PARTITION BY m.user_id ORDER BY m.month_start) AS prev_total
        FROM monthly m
      )
      SELECT
        wp.user_id,
        u.name AS user_name,
        wp.month_start,
        wp.month_total,
        CASE
          WHEN wp.prev_total IS NULL OR wp.prev_total = 0 THEN NULL
          ELSE ROUND(((wp.month_total - wp.prev_total) / wp.prev_total) * 100, 2)
        END AS pct_change
      FROM with_prev wp
      JOIN users u ON u.id = wp.user_id
      ORDER BY wp.user_id, wp.month_start
    `
    const [rows] = await pool.query(sql, params)
    res.json(rows)
  } catch (err) { next(err) }
}

//  * If window has <3 months, we average what’s available (1–2 months).

export async function getPrediction(req, res, next) {
  try {
    const months = req.validated?.query?.months
    const { where, params } = buildDateWindowClause(months)

    const sql = `
      WITH monthly AS (
        SELECT
          e.user_id,
          DATE_FORMAT(e.date, '%Y-%m-01') AS month_start,
          SUM(e.amount) AS month_total
        FROM expenses e
        ${where}
        GROUP BY e.user_id, DATE_FORMAT(e.date, '%Y-%m-01')
      ),
      lastN AS (
        SELECT
          m.user_id, m.month_start, m.month_total,
          ROW_NUMBER() OVER (PARTITION BY m.user_id ORDER BY m.month_start DESC) AS rn_desc
        FROM monthly m
      )
      SELECT
        l.user_id,
        u.name AS user_name,
        ROUND(AVG(CASE WHEN l.rn_desc BETWEEN 1 AND 3 THEN l.month_total END), 2) AS predicted_next_month
      FROM lastN l
      JOIN users u ON u.id = l.user_id
      WHERE l.rn_desc BETWEEN 1 AND 3
      GROUP BY l.user_id, u.name
      ORDER BY l.user_id
    `
    const [rows] = await pool.query(sql, params)
    res.json(rows)
  } catch (err) { next(err) }
}

/** GET /api/v1/stats/summary?months=N — bundle the three in one response */
export async function getStatsSummary(req, res, next) {
  try {
    const months = req.validated?.query?.months
    const { where, params } = buildDateWindowClause(months)

    const topDaysSql = `
      WITH day_totals AS (
        SELECT e.user_id, DATE(e.date) AS spend_date, SUM(e.amount) AS day_total
        FROM expenses e
        ${where}
        GROUP BY e.user_id, DATE(e.date)
      ),
      ranked AS (
        SELECT
          dt.user_id, dt.spend_date, dt.day_total,
          ROW_NUMBER() OVER (PARTITION BY dt.user_id ORDER BY dt.day_total DESC, dt.spend_date DESC) AS rn
        FROM day_totals dt
      )
      SELECT r.user_id, u.name AS user_name, r.spend_date, r.day_total
      FROM ranked r
      JOIN users u ON u.id = r.user_id
      WHERE r.rn <= 3
      ORDER BY r.user_id, r.day_total DESC, r.spend_date DESC
    `

    const monthlyChangeSql = `
      WITH monthly AS (
        SELECT
          e.user_id,
          DATE_FORMAT(e.date, '%Y-%m-01') AS month_start,
          SUM(e.amount) AS month_total
        FROM expenses e
        ${where}
        GROUP BY e.user_id, DATE_FORMAT(e.date, '%Y-%m-01')
      ),
      with_prev AS (
        SELECT
          m.*,
          LAG(m.month_total) OVER (PARTITION BY m.user_id ORDER BY m.month_start) AS prev_total
        FROM monthly m
      )
      SELECT
        wp.user_id,
        u.name AS user_name,
        wp.month_start,
        wp.month_total,
        CASE
          WHEN wp.prev_total IS NULL OR wp.prev_total = 0 THEN NULL
          ELSE ROUND(((wp.month_total - wp.prev_total) / wp.prev_total) * 100, 2)
        END AS pct_change
      FROM with_prev wp
      JOIN users u ON u.id = wp.user_id
      ORDER BY wp.user_id, wp.month_start
    `

    const predictionSql = `
      WITH monthly AS (
        SELECT
          e.user_id,
          DATE_FORMAT(e.date, '%Y-%m-01') AS month_start,
          SUM(e.amount) AS month_total
        FROM expenses e
        ${where}
        GROUP BY e.user_id, DATE_FORMAT(e.date, '%Y-%m-01')
      ),
      lastN AS (
        SELECT
          m.user_id, m.month_start, m.month_total,
          ROW_NUMBER() OVER (PARTITION BY m.user_id ORDER BY m.month_start DESC) AS rn_desc
        FROM monthly m
      )
      SELECT
        l.user_id,
        u.name AS user_name,
        ROUND(AVG(CASE WHEN l.rn_desc BETWEEN 1 AND 3 THEN l.month_total END), 2) AS predicted_next_month
      FROM lastN l
      JOIN users u ON u.id = l.user_id
      WHERE l.rn_desc BETWEEN 1 AND 3
      GROUP BY l.user_id, u.name
      ORDER BY l.user_id
    `

    const [topDays, monthlyChange, prediction] = await Promise.all([
      pool.query(topDaysSql, params).then(([rows]) => rows),
      pool.query(monthlyChangeSql, params).then(([rows]) => rows),
      pool.query(predictionSql, params).then(([rows]) => rows)
    ])

    res.json({ topDays, monthlyChange, prediction })
  } catch (err) { next(err) }
}
