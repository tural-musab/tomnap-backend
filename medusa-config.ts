import "dotenv/config"
import { defineConfig } from "@medusajs/framework/utils"

// Helper function to get environment variable with fallback
const getEnvVar = (key: string, fallback?: string): string => {
  const value = process.env[key] || fallback
  if (!value) {
    throw new Error(`Environment variable ${key} is required`)
  }
  return value
}

// Database URL parsing to handle Railway environment
const getDatabaseUrl = (): string => {
  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl) {
    throw new Error("DATABASE_URL environment variable is required")
  }
  
  // Log for debugging (remove in production)
  console.log("DATABASE_URL:", dbUrl.replace(/:[^:@]*@/, ':***@'))
  
  return dbUrl
}

// Redis URL parsing to handle Railway environment  
const getRedisUrl = (): string => {
  const redisUrl = process.env.REDIS_URL
  if (!redisUrl) {
    throw new Error("REDIS_URL environment variable is required")
  }
  
  // Log for debugging (remove in production)
  console.log("REDIS_URL:", redisUrl.replace(/:[^:@]*@/, ':***@'))
  
  return redisUrl
}

export default defineConfig({
  projectConfig: {
    databaseUrl: getDatabaseUrl(),
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:8000",
      adminCors: process.env.ADMIN_CORS || "http://localhost:7001",
      authCors: process.env.STORE_CORS || "http://localhost:8000"
    },
    redisUrl: getRedisUrl(),
    workerMode: "shared"
  },
  admin: {
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true" ? true : false,
  },
    // Feature flags ekleyin
    featureFlags: {
      publishable_api_keys: false  // Publishable key kontrolünü kapat
    },
  modules: [
    {
      resolve: "@medusajs/medusa/cache-redis",
      options: { 
        redisUrl: getRedisUrl(),
      },
    },
    {
      resolve: "@medusajs/medusa/event-bus-redis", 
      options: { 
        redisUrl: getRedisUrl(),
      },
    },
    {
      resolve: "@medusajs/medusa/workflow-engine-redis",
      options: { 
        redis: { 
          url: getRedisUrl(),
        },
      },
    },
  ]
})