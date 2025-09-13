import { pool } from '../configs/db.js'

export async function listUsers(_req, res, next) {
  try {
    const [rows] = await pool.query('SELECT id, name, email, status FROM users ORDER BY id')
    res.json(rows)
  } catch (err) { next(err) }
}

export async function getUser(req, res, next) {
  try {
    const { id } = req.validated.params
    const [rows] = await pool.query('SELECT id, name, email, status FROM users WHERE id=?', [id])
    if (!rows.length) return res.status(404).json({ error: 'Not found' })
    res.json(rows[0])
  } catch (err) { next(err) }
}

export async function createUser(req, res, next) {
  try {
    const { name, email, status } = req.validated.body
    const [r] = await pool.query('INSERT INTO users (name, email, status) VALUES (?, ?, ?)', [name, email, status])
    const [rows] = await pool.query('SELECT id, name, email, status FROM users WHERE id=?', [r.insertId])
    res.status(201).json(rows[0])
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Email already exists' })
    next(err)
  }
}

export async function updateUser(req, res, next) {
  try {
    const { id } = req.validated.params
    const { name, email, status } = req.validated.body
    const fields = []; const params = []
    if (name !== undefined) { fields.push('name=?'); params.push(name) }
    if (email !== undefined) { fields.push('email=?'); params.push(email) }
    if (status !== undefined) { fields.push('status=?'); params.push(status) }
    params.push(id)
    const [r] = await pool.query(`UPDATE users SET ${fields.join(', ')} WHERE id=?`, params)
    if (!r.affectedRows) return res.status(404).json({ error: 'Not found' })
    const [rows] = await pool.query('SELECT id, name, email, status FROM users WHERE id=?', [id])
    res.json(rows[0])
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Email already exists' })
    next(err)
  }
}

export async function deleteUser(req, res, next) {
  try {
    const { id } = req.validated.params
    const [r] = await pool.query('DELETE FROM users WHERE id=?', [id])
    if (!r.affectedRows) return res.status(404).json({ error: 'Not found' })
    res.json({ ok: true })
  } catch (err) { next(err) }
}
