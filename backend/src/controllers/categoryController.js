import { pool } from '../configs/db.js'

export async function listCategories(_req, res, next) {
  try {
    const [rows] = await pool.query('SELECT id, name FROM categories ORDER BY id')
    res.json(rows)
  } catch (err) { next(err) }
}

export async function getCategory(req, res, next) {
  try {
    const { id } = req.validated.params
    const [rows] = await pool.query('SELECT id, name FROM categories WHERE id=?', [id])
    if (!rows.length) return res.status(404).json({ error: 'Not found' })
    res.json(rows[0])
  } catch (err) { next(err) }
}

export async function createCategory(req, res, next) {
  try {
    const { name } = req.validated.body
    const [r] = await pool.query('INSERT INTO categories (name) VALUES (?)', [name])
    const [rows] = await pool.query('SELECT id, name FROM categories WHERE id=?', [r.insertId])
    res.status(201).json(rows[0])
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Category already exists' })
    next(err)
  }
}

export async function updateCategory(req, res, next) {
  try {
    const { id } = req.validated.params
    const { name } = req.validated.body
    const [r] = await pool.query('UPDATE categories SET name=? WHERE id=?', [name, id])
    if (!r.affectedRows) return res.status(404).json({ error: 'Not found' })
    const [rows] = await pool.query('SELECT id, name FROM categories WHERE id=?', [id])
    res.json(rows[0])
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Category already exists' })
    next(err)
  }
}

export async function deleteCategory(req, res, next) {
  try {
    const { id } = req.validated.params
    const [r] = await pool.query('DELETE FROM categories WHERE id=?', [id])
    if (!r.affectedRows) return res.status(404).json({ error: 'Not found' })
    res.json({ ok: true })
  } catch (err) { next(err) }
}
