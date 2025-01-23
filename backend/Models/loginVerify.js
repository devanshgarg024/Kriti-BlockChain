const { client } = require('../Config/db');

async function loginVerify(userData) {
  try {
    // Ensure the client is connected
    if (!client.topology?.isConnected()) {
      await client.connect();
    }
    // console.log(userData.password);
    // Access the specific database for users
    const database = client.db("KritiUserData");

    // Access the collection where user data is stored (e.g., 'users')
    const collection = database.collection(userData.email);

    // Find the user by email
    const user = await collection.findOne({ email: userData.email });

    if (user) {
      // If the user exists, check if the password matches
      if (user.password === userData.password) {
        return { success: true, message: "User logged in successfully.",email:userData.email };
      } else {
        return { success: false, message: "Wrong password." };
      }
    } else {
      return { success: false, message: "No user found." };
    }
  } catch (err) {
    console.error("Error during login:", err);
    return { success: false, message: "An error occurred during login." };
  }
}

module.exports = loginVerify;
