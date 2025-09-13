import rateLimit from 'express-rate-limit'

//rate Limiter for all requests
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false
})

