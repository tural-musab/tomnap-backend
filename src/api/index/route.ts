import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  res.status(200).json({
    message: "🚀 Medusa v2 E-commerce Backend API",
    status: "running",
    version: "2.0.0",
    endpoints: {
      health: "/health",
      store: "/store",
      admin: "/admin",
      docs: "/docs"
    },
    timestamp: new Date().toISOString()
  })
} 