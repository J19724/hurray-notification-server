const express = require("express");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});const app = express();
app.use(express.json());

app.post("/sendNotification", async (req, res) => {

    try {

        const {
            token,
            title,
            message,
            image,
            videolink,
            name
        } = req.body;

        const response = await admin.messaging().send({

            token: token,

            notification: {
                title: title,
                body: message
            },

            data: {
                title: title || "",
                message: message || "",
                image: image || "",
                videolink: videolink || "",
                name: name || ""
            },

            android: {
                priority: "high",
                notification: {
                    sound: "default"
                }
            }

        });

        console.log("Notification Sent:", response);

        res.json({
            success: true,
            response: response
        });

    } catch (e) {

        console.log(e);

        res.status(500).json({
            success: false,
            error: e.message
        });

    }

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
