require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const userInfo = require("./routes/userInfo");
const otpRoutes = require("./routes/otp");
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
let userData = {};
app.use("/user_info",(req, res, next) => {
    if (req.method === 'POST') {
		userData=req.body;
    }
    next(); // Pass control to the next middleware or route handler
});

app.use("/auth", authRoute);
app.use("/user_info", userInfo);
app.use("/otp", otpRoutes);
app.get("/userData", (req, res) => {
    res.json(userData); // Respond with the stored userData
});


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
