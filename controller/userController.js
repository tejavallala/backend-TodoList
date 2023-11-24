// Import necessary modules
const express = require("express");
const userModel = require("../model/userModel");
const userRoute = express.Router();

// Create User route
userRoute.post("/create-user", (req, res) => {
    userModel.create(req.body, (err, data) => {
        if (err)
            return err;
        else
            res.json(data);
    });
});

// Get all users route
userRoute.get("/", (req, res) => {
    userModel.find((err, data) => {
        if (err)
            return err;
        else
            res.json(data);
    });
});

// Update User route
userRoute.route("/update-user/:id")
    .get((req, res) => {
        userModel.findById(req.params.id, (err, data) => {
            if (err)
                return err;
            else
                res.json(data);
        });
    })
    .put((req, res) => {
        userModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err, data) => {
            if (err)
                return err;
            else
                res.json(data);
        });
    });

// Delete User route
userRoute.delete("/delete-user/:id", (req, res) => {
    userModel.findByIdAndRemove(req.params.id, (err, data) => {
        if (err)
            return err;
        else
            res.json(data);
    });
});

// Update Password route based on email
userRoute.put("/update-password", async (req, res) => {
    const { email, newPassword, confirmPassword } = req.body;

    try {
        // Check if newPassword and confirmPassword match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "New password and confirm password do not match" });
        }

        // Find the user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user's password
        user.password = newPassword;

        // Save the updated user to the database
        const updatedUser = await user.save();

        res.status(200).json({ message: "Password updated successfully", user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Login route
userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email, password });
        if (user) {
            res.status(200).json({ message: "Login successful", user });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get User Details route
userRoute.get("/getUserDetails", async (req, res) => {
    try {
        const user = req.user;
        if (user) {
            res.status(200).json({ message: "User details retrieved successfully", user });
        } else {
            res.status(401).json({ message: "User not authenticated" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = userRoute;
