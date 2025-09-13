import { ZodError } from 'zod'

export function validate(schema) {
  return (req, res, next) => {
    try {
      req.validated = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query
      })
      next()
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          issues: err.issues.map(i => ({ path: i.path.join('.'), message: i.message }))
        })
      }
      next(err)
    }
  }
}
