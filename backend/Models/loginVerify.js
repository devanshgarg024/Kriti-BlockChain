const { client } = require('../Config/db');

async function loginVerify(userData) {
  try {
    // Ensure the client is connected
    if (!client.topology?.isConnected()) {
      await client.connect();
    }

    // Access the specific database for users
    const database = client.db("KritiUserData");

    // Check if the collection exists
    const collections = await database.listCollections().toArray();
    const collectionExists = collections.some(
      (collection) => collection.name === userData.email
    );

    if (!collectionExists) {
      return { success: false, message: "No user found." };
    }

    // Access the collection where user data is stored (e.g., by user's email)
    const collection = database.collection(userData.email);

    // Find the user by email
    const user = await collection.findOne({ email: userData.email });

    if (user) {
      // If the user exists, check if the password matches
         return user;
    } else {
      return { success: false, message: "No user found." };
    }
  } catch (err) {
    console.error("Error during login:", err);
    return { success: false, message: "An error occurred during login." };
  }
}

module.exports = loginVerify;
