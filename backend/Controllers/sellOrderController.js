const storeSellOrderToDatabase = require("../Models/addSellOrder");

const sellOrder = async (req, res) => {
  try {
    // Call the function to create the database and collection
    const result = await storeSellOrderToDatabase(req.body);

    if (result.success) {
      res.status(200).json({
        message: "Sell Order Stored",
        data: req.body,
      });
    } else {
      res.status(400).json({
        message: result.message,
      });
    }
  } catch (error) {
    console.error("Error Storing Sell Order:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { sellOrder };
