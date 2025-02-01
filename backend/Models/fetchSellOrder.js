const { client } = require('../Config/db');

async function fetchSellOrderFromDatabase() {
  try {
    // Ensure the client is connected
    if (!client.topology?.isConnected()) {
      await client.connect();
    }

    // Access the specific database for users
    const database = client.db("KritiUserData");

    // Access the collection where user data is stored
    const collection = database.collection("AllSellTransactions");

    // Retrieve all documents in the collection
    const documents = await collection.find({}).toArray();

    if (documents) {
      // Return the documents along with a success message
      return { success: true, message: "Documents Retrieved", data: documents };
    } else {
      // No documents found
      return { success: false, message: "No user found." };
    }
  } catch (err) {
    console.error("Error during fetching data:", err);
    return { success: false, message: "An error occurred during fetching data." };
  }
}

module.exports = fetchSellOrderFromDatabase;
