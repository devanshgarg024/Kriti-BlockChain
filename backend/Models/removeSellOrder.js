const { client } = require('../Config/db');

async function removeSellOrder(orderId) {
  try {
    // Ensure the client is connected
    if (!client.topology?.isConnected()) {
      await client.connect();
    }

    // Access the specific database
    const database = client.db("KritiUserData");
    const collection = database.collection("AllSellTransactions");

    console.log("Connected to database, attempting to remove order...");

    // Ensure orderId is correctly formatted (string vs. number)
    const parsedOrderId = typeof orderId === "number" ? orderId : parseInt(orderId);

    // Perform the delete operation
    const result = await collection.deleteOne({ orderId: parsedOrderId });

    if (result.deletedCount > 0) {
      console.log(`Successfully removed orderId: ${parsedOrderId}`);
      return { success: true, message: `Order ${parsedOrderId} removed successfully.` };
    } else {
      console.log("No matching orderId found.");
      return { success: false, message: "Order not found." };
    }
  } catch (err) {
    console.error("Error deleting order:", err);
    return { success: false, message: "An error occurred while deleting order." };
  }
}

module.exports = removeSellOrder;
