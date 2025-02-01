const fetchSellOrderFromDatabase = require("../Models/fetchSellOrder");

const fetchSellOrder = async (req, res) => {
  try {
    // Call the function to create the database and collection
    const result = await fetchSellOrderFromDatabase();
    
    if (result.success) {
      return res.status(200).json({ // ✅ Single Response
        message: "Order fetched successfully",
        data: result.data, // Ensure correct data is sent
      });
    } else {
      return res.status(400).json({ // ✅ Return prevents multiple responses
        message: result.message,
      });
    }
  } catch (error) {
    console.error("Error fetching Sell Order:", error);
    
    if (!res.headersSent) { // ✅ Prevents sending response if already sent
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
};

module.exports = { fetchSellOrder };
