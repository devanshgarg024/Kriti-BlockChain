const userData = async (req, res) => {
    // console.log("Info Received:", req.body);
  
    // Send the received data back as the response
    res.status(200).json({
      message: "Account created successfully",
      data: req.body,
    });
  };
  
  module.exports = { userData };
  