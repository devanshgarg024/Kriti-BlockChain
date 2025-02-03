const router = require("express").Router();
const passport = require("passport");


// Route for successful login
router.get("/login/success", (req, res) => {
    console.log("Session:", req.session);
    console.log("User:", req.user);

    if (req.user) {
        res.status(200).json({
            error: false,
            message: "Successfully Logged In",
            user: req.user,
        });
    } else {
        console.log("helo");
        res.status(403).json({
            error: true,
            message: "Not Authorized",
        });
    }
});

// Route for failed login
router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "Login failure",
    });
});

// Route for Google authentication
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

// Google authentication callback route
router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: "http://localhost:5173/dashboard",
        failureRedirect: "/login/failed",
    })
);

// Local strategy login route
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            console.log("s");
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
        if (!user) {
            console.log(`spassport ${info.message}`);

            return res.status(401).json({ success: false, message: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
            console.log(`spassport logIN`);
                return res.status(500).json({ success: false, message: "Login failed" });
            }
            console.log(`spassport success`);

			return res.status(200).json({ success: true, message: "Login successful", user });

        });
    })(req, res, next);
});

// Route for logout
router.get("/logout", (req, res) => {
    req.session = null; // Clear the session
    res.clearCookie("session"); // Explicitly clear the cookie

    console.log("User logged out successfully");
    return res.status(200).json({ success: true, message: "Logged out successfully" });
});

module.exports = router;


