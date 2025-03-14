import { neonConfig, Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { WebSocket } from 'ws'

// Example Supabase pooled connection string (must use Supavisor)
const connectionString =process.env.DATABASE_URL
const url = new URL(connectionString as string | URL)
if (url.hostname === 'localhost') {
  // Disable SSL for local connections
  neonConfig.useSecureWebSocket = false
  // WebSocket proxy is hosted on `4000` locally, so add port. Does not work in production.
  neonConfig.wsProxy = (host, port) => `${host}:${port}/v2`
}

// Only Neon hosts support this -- non-deterministic errors otherwise
neonConfig.pipelineConnect = false

// So it can also work in Node.js
neonConfig.webSocketConstructor = WebSocket

const pool = new Pool({
  connectionString,
})
const adapter = new PrismaNeon(pool)
export const prisma = new PrismaClient({
  adapter,
}).$extends(withAccelerate())