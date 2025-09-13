// src/middleware/index.js
import helmet from 'helmet'
import compression from 'compression'
import hpp from 'hpp'
import express from 'express'

import { buildCors } from '../configs/cors.js'
import { generalLimiter } from './rateLimit.js'

export function applyMiddlewares(app) {
  app.set('trust proxy', 1)

  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
//   app.use(helmet.hsts({ maxAge: 15552000 })) 
  app.use(
    helmet.contentSecurityPolicy({
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'"],
        "connect-src": ["'self'", process.env.CORS_ORIGINS || 'http://localhost:5173'],
        "img-src": ["'self'", "data:"],
        "style-src": ["'self'", "'unsafe-inline'"]
      }
    })
  )

  // CORS
  app.use(buildCors())

  app.use(compression())
  app.use(hpp())

  app.use(express.json({ limit: '200kb' }))
  app.use(express.urlencoded({ extended: false, limit: '200kb' }))

  app.use('/api/v1', generalLimiter)
  
}
