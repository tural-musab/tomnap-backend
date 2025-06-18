import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { ProductStatus } from "@medusajs/framework/utils"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")
    
    const query = req.scope.resolve("query")
    
    const { data: products } = await query.graph({
      entity: "product",
      fields: [
        "*",
        "variants.*",
        "variants.prices.*",
        "variants.price_set.*",
        "images.*",
        "sales_channels.*"
      ],
      filters: {
        status: ["published"] as any
      }
    })
    
    res.json({ 
      products: products || [],
      count: products?.length || 0
    })
  } catch (error) {
    console.error("Custom products endpoint error:", error)
    res.status(500).json({ 
      error: "Failed to fetch products",
      message: error.message 
    })
  }
}

export const OPTIONS = async (req: MedusaRequest, res: MedusaResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  res.status(200).end()
} 