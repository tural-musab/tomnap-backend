import { MedusaContainer } from "@medusajs/framework/types"

export default async function createApiKey(container: MedusaContainer) {
  try {
    console.log("🔑 Creating publishable API key...")
    
    const apiKeyModuleService = container.resolve("apiKeyModuleService") as any
    
    const apiKey = await apiKeyModuleService.create({
      title: "Frontend Store Key",
      type: "publishable",
      created_by: "system"
    })
    
    console.log("✅ SUCCESS! Publishable API key created:")
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    console.log(`🔑 API Key: ${apiKey.token}`)
    console.log(`📝 Title: ${apiKey.title}`)
    console.log(`🏷️  Type: ${apiKey.type}`)
    console.log(`🆔 ID: ${apiKey.id}`)
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    console.log("")
    console.log("🎯 Next steps:")
    console.log("1. Copy the API key above")
    console.log("2. Update Vercel environment variable:")
    console.log("   vercel env add NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY production")
    console.log("3. Paste the API key when prompted")
    console.log("4. Redeploy frontend: vercel --prod")
    console.log("")
    
    return apiKey
  } catch (error) {
    console.error("❌ ERROR creating API key:", error)
    throw error
  }
} 