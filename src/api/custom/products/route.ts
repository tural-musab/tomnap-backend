import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { ProductStatus } from "@medusajs/framework/utils"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
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
        status: ProductStatus.PUBLISHED
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