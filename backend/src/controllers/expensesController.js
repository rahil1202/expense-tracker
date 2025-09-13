import { pool } from '../configs/db.js'

export async function listExpenses(req, res, next) {
  try {
    const { user_id, category, start_date, end_date, limit, offset } = req.validated.query
    const where = []; const params = []
    if (user_id) { where.push('e.user_id = ?'); params.push(user_id) }
    if (category) { where.push('e.category = ?'); params.push(category) }
    if (start_date) { where.push('e.date >= ?'); params.push(start_date) }
    if (end_date) { where.push('e.date <= ?'); params.push(end_date) }

    const sql = `
      SELECT e.id, e.user_id, u.name AS user_name, e.category, c.name AS category_name,
             e.amount, e.date, e.description
      FROM expenses e
      JOIN users u ON u.id = e.user_id
      JOIN categories c ON c.id = e.category
      ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
      ORDER BY e.date DESC
      ${limit ? 'LIMIT ?' : ''} ${offset ? 'OFFSET ?' : ''}
    `
    if (limit) params.push(Number(limit))
    if (offset) params.push(Number(offset))

    const [rows] = await pool.query(sql, params)
    res.json(rows)
  } catch (err) { next(err) }
}

export async function getExpense(req, res, next) {
  try {
    const { id } = req.validated.params
    const [rows] = await pool.query(`
      SELECT e.id, e.user_id, u.name AS user_name, e.category, c.name AS category_name,
             e.amount, e.date, e.description
      FROM expenses e
      JOIN users u ON u.id = e.user_id
      JOIN categories c ON c.id = e.category
      WHERE e.id=?`, [id])
    if (!rows.length) return res.status(404).json({ error: 'Not found' })
    res.json(rows[0])
  } catch (err) { next(err) }
}

export async function createExpense(req, res, next) {
  try {
    const { user_id, category, amount, date, description } = req.validated.body
    const [r] = await pool.query(
      'INSERT INTO expenses (user_id, category, amount, date, description) VALUES (?, ?, ?, ?, ?)',
      [Number(user_id), Number(category), Number(amount), date, description ?? null]
    )
    const [rows] = await pool.query(`
      SELECT e.id, e.user_id, u.name AS user_name, e.category, c.name AS category_name,
             e.amount, e.date, e.description
      FROM expenses e
      JOIN users u ON u.id = e.user_id
      JOIN categories c ON c.id = e.category
      WHERE e.id=?`, [r.insertId])
    res.status(201).json(rows[0])
  } catch (err) {
    if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.code === 'ER_NO_REFERENCED_ROW') {
      return res.status(400).json({ error: 'Invalid user_id or category (foreign key)' })
    }
    next(err)
  }
}

export async function updateExpense(req, res, next) {
  try {
    const { id } = req.validated.params
    const { user_id, category, amount, date, description } = req.validated.body
    const fields = []; const params = []
    if (user_id !== undefined) { fields.push('user_id=?'); params.push(Number(user_id)) }
    if (category !== undefined) { fields.push('category=?'); params.push(Number(category)) }
    if (amount !== undefined) { fields.push('amount=?'); params.push(Number(amount)) }
    if (date !== undefined) { fields.push('date=?'); params.push(date) }
    if (description !== undefined) { fields.push('description=?'); params.push(description ?? null) }
    params.push(id)

    const [r] = await pool.query(`UPDATE expenses SET ${fields.join(', ')} WHERE id=?`, params)
    if (!r.affectedRows) return res.status(404).json({ error: 'Not found' })
    const [rows] = await pool.query(`
      SELECT e.id, e.user_id, u.name AS user_name, e.category, c.name AS category_name,
             e.amount, e.date, e.description
      FROM expenses e
      JOIN users u ON u.id = e.user_id
      JOIN categories c ON c.id = e.category
      WHERE e.id=?`, [id])
    res.json(rows[0])
  } catch (err) {
    if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.code === 'ER_NO_REFERENCED_ROW') {
      return res.status(400).json({ error: 'Invalid user_id or category (foreign key)' })
    }
    next(err)
  }
}

export async function deleteExpense(req, res, next) {
  try {
    const { id } = req.validated.params
    const [r] = await pool.query('DELETE FROM expenses WHERE id=?', [id])
    if (!r.affectedRows) return res.status(404).json({ error: 'Not found' })
    res.json({ ok: true })
  } catch (err) { next(err) }
}
