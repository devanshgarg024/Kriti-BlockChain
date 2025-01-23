require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const userInfo = require("./routes/userInfo");
const otpRoutes = require("./routes/otp");
const loginVerifyRoutes = require("./routes/loginVerify");
const fetchUserData = require("./Models/fetchUserData");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const app = express();

app.use(bodyParser.json()); // Parse JSON body
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded body

app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "http://localhost:5173",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);
app.use(express.json());

let storedUserData = null;
app.post("/fetchUserData", async (req, res) => {
	try {
	  const result = await fetchUserData(req.body);
	  if (result.success) {
		storedUserData = result.data; // Store the result.data
		res.status(200).json(result.data);
	  } else {
		res.status(404).json(result);
	  }
	} catch (err) {
	  res.status(500).json({ success: false, message: "Internal Server Error" });
	}
  });
app.use("/auth", authRoute);
app.use("/user_info", userInfo);
app.use("/otp", otpRoutes);
app.use("/login/verify", loginVerifyRoutes);
app.get("/userData", (req, res) => {
    res.json(storedUserData); // Respond with the stored userData
});


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
