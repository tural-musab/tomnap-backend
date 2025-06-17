const { MedusaApp } = require("@medusajs/modules-sdk");

async function createApiKey() {
  try {
    console.log("Initializing Medusa app...");
    const { container } = await MedusaApp();
    
    console.log("Getting API key module...");
    const apiKeyModuleService = container.resolve("apiKeyModuleService");
    
    console.log("Creating publishable API key...");
    const apiKey = await apiKeyModuleService.create({
      title: "Frontend Store Key",
      type: "publishable",
      created_by: "system"
    });
    
    console.log("✅ SUCCESS! Publishable API key created:");
    console.log("API Key:", apiKey.token);
    console.log("ID:", apiKey.id);
    console.log("Title:", apiKey.title);
    console.log("Type:", apiKey.type);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ ERROR creating API key:", error.message);
    process.exit(1);
  }
}

createApiKey(); 