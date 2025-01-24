// Import required modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

// Import custom modules and routes
const authRoute = require("./routes/auth");
const userInfo = require("./routes/userInfo");
const otpRoutes = require("./routes/otp");
const loginVerifyRoutes = require("./routes/loginVerify");
const fetchUserData = require("./Models/fetchUserData");
const passportStrategy = require("./passport"); // Ensure passport is configured properly here

// Initialize Express app
const app = express();

// Middleware configuration
app.use(bodyParser.json()); // Parse JSON body
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded body

// Cookie session configuration
app.use(
    cookieSession({
        name: "session",
        keys: ["cyberwolve"], // Use secure keys
        maxAge: 24 * 60 * 60 * 1000, // Session expires in 24 hours
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Enable CORS
app.use(
    cors({
        origin: "http://localhost:5173", // Adjust this to match your frontend URL
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

// Store user data globally (use a more robust solution like Redis in production)
let storedUserData = null;

// Routes
app.post("/fetchUserData", async (req, res) => {
    try {
        const result = await fetchUserData(req.body);
        if (result.success) {
            storedUserData = result.data; // Store fetched user data
            res.status(200).json(result.data);
        } else {
            res.status(404).json(result);
        }
    } catch (err) {
        console.error("Error fetching user data:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.get("/userData", (req, res) => {
    res.json(storedUserData); // Respond with the stored user data
});

app.use("/auth", authRoute);
app.use("/user_info", userInfo);
app.use("/otp", otpRoutes);
app.use("/login/verify", loginVerifyRoutes);

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
