const { client } = require('../Config/db');

async function storeSellOrderToDatabase(userData) {
    try {
        // Ensure the client is connected
        if (!client.topology?.isConnected()) {
          await client.connect();
        }
    
        // Create a new database for the user
        const database = client.db("KritiUserData");
    
        // List all collections in the database
    
          const collection = database.collection("AllSellTransactions");
    
          // Insert a default document (optional)
          const defaultDocument = {
            ...userData,
            createdAt: new Date(),
          };
          await collection.insertOne(defaultDocument);
    
          console.log(`Database stored for OrderId: ${userData.orderId}`);
          return { success: true, message: `Database stored for OrderId: ${userData.orderId}` };
      } catch (err) {
        console.error("An error occurred while storing sell data", err);
        return { success: false, message: "An error occurred while storing sell data" };
      }
}

module.exports = storeSellOrderToDatabase;
