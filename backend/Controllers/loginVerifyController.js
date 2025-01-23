const loginVerify = require ('../Models/loginVerify');

const loginVerifyData = async (req, res) => {
  try {
    // Call the function to create the database and collection
    const result = await loginVerify(req.body);

    if (result.success) {
      res.status(200).json({
        message: "Verified",
        data: req.body,
      });
    } else {
      res.status(400).json({
        message: result.message,
      });
    }
  } catch (error) {
    console.error("Error handling user data:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { loginVerifyData };
