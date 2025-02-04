const { client } = require('../Config/db');

async function createDatabaseForUser(userData) {
  try {
    // Ensure the client is connected
    if (!client.topology?.isConnected()) {
      await client.connect();
    }

    // Create a new database for the user
    const database = client.db("KritiUserData");

    // List all collections in the database
    const collections = await database.listCollections({}, { nameOnly: true }).toArray();

    // Check if the collection exists
    const collectionExists = collections.some(
      (collection) => collection.name === userData.email
    );

    if (collectionExists) {
      console.log(`Collection '${userData.email}' already exists.`);
      return { success: true, message: `user present` };
    } else {
      const collection = database.collection(userData.email);

      // Insert a default document (optional)
      const defaultDocument = {
        ...userData,
        createdAt: new Date(),
      };
      await collection.insertOne(defaultDocument);

      console.log(`Database and collection created for user: ${userData.email}`);
      return { success: true, message: `Database and collection created for user: ${userData.email}` };
    }
  } catch (err) {
    console.error("Error creating database for user:", err);
    return { success: false, message: "An error occurred while creating the database." };
  }
}

module.exports = createDatabaseForUser;
