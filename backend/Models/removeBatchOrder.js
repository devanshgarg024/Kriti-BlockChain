const { client } = require('../Config/db');

async function removeBatchOrder(data) {
  try {
    // Ensure the client is connected
    if (!client.topology?.isConnected()) {
      await client.connect();
    }

    // Access the specific database
    const database = client.db("KritiUserData");
    const collection = database.collection("AllSellTransactions");

    console.log("Connected to database, processing batch orders...");
// console.log(data);
    // Iterate over all orders in the batch
    for (let i = 0; i < data.orderIds.length; i++) {
      const orderId = data.orderIds[i];
      const amountToSubtract = data.amountsToBuy[i];

      // Ensure orderId is correctly formatted
      const parsedOrderId = typeof orderId === "number" ? orderId : parseInt(orderId);

      // Fetch the current order from MongoDB
      const order = await collection.findOne({ orderId: parsedOrderId });

      if (!order) {
        console.log(`Order ${parsedOrderId} not found.`);
        continue; // Skip to the next order
      }

      // Calculate new amountToSell after subtracting the purchased amount
      const newAmountToSell = order.amountToSell - amountToSubtract;

      if (newAmountToSell <= 0) {
        // Remove the order from the database if the amount is 0 or less
        await collection.deleteOne({ orderId: parsedOrderId });
        console.log(`Order ${parsedOrderId} fully bought, removed from database.`);
      } else {
        // Update the order with the new amount
        await collection.updateOne(
          { orderId: parsedOrderId },
          { $set: { amountToSell: newAmountToSell } }
        );
        console.log(`Order ${parsedOrderId} updated with new amountToSell: ${newAmountToSell}`);
      }
    }

    return { success: true, message: "Batch order processing complete." };

  } catch (err) {
    console.error("Error processing batch orders:", err);
    return { success: false, message: "An error occurred while processing batch orders." };
  }
}

module.exports = removeBatchOrder;
