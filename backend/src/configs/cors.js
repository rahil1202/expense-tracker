import cors from 'cors'

export function buildCors() {
  const allowed = (process.env.FRONTEND_URL|| 'http://localhost:5173')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)

  return cors({
    origin(origin, cb) {
      // for testing
      if (!origin) return cb(null, true)
      return allowed.includes(origin)
        ? cb(null, true)
        : cb(new Error('Not allowed by CORS'))
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
}
