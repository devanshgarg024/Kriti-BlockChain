const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const { client } = require("./Config/db");
const createDatabaseForUser=require("./Models/createDatabaseForUser")

// Google Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"],
        },
        function (accessToken, refreshToken, profile, callback) {
            const userData={
                username: profile.displayName,
                email: profile.emails[0].value
            }
            console.log(userData.email);
            createDatabaseForUser(userData);
            callback(null, userData); // Save or find the user in the database
        }
    )
);

// Local Strategy
passport.use(
    new LocalStrategy(
        { usernameField: "email", passwordField: "password" },
        async (email, password, done) => {
            try {
            console.log(`Local strategy`);

				// Ensure database connection
                if (!client.topology?.isConnected()) {
					await client.connect();
                }
            console.log(`Local strategy db connectd`);

                const database = client.db("KritiUserData");
                const collection = database.collection(email); // Generic user collection
                const user = await collection.findOne({email});
				
                if (!user) {
            console.log(`Local strategy user not found`);

					return done(null, false, { message: "Invalid email or password" });
                }
				
                // Validate password using bcrypt
                const isPasswordValid = (password ===user.password);
                if (!isPasswordValid) {
            console.log(`Local strategy pasword error`);

					return done(null, false, { message: "Invalid email or password" });
                }
                // Successful authentication
                console.log(`returned lcoal strategy`);

                return done(null, user);
            } catch (error) {
            console.log("Error during authentication:", error);

                console.error("Error during authentication:", error);
                return done(error);
            }
        }
    )
);

// Serialization and Deserialization
passport.serializeUser((user, done) => {
	done(null, user.email); // Serialize only the email
});

passport.deserializeUser(async (email, done) => {
    try {
        const database = client.db("KritiUserData");
        const collection = database.collection(email);
        const documents = await collection.find({}).toArray();
        if (documents) {
            done(null, documents);
        } else {
            done(null, false);
        }
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;
