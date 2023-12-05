const express = require("express");
const router = express.Router();

const {authenticateUser,checkAuthenticated,logout} 
= require("../middleware/authMiddleware");


router.get("/", (req, res) => {
  if (req.session.authenticated) {
    res.redirect("/home"); // Redirect authenticated user to home page
  } else {
    res.render("login"); // Render login page with no error initially
  }
});

router.get("/login", checkAuthenticated, (req, res) => {
  res.redirect("/home"); // Redirect authenticated user to home page
});

router.post("/login", authenticateUser, (req, res) => {
  if (req.session.authenticated) {
    res.redirect("/home"); // Redirect authenticated user to home page
  } else {
    res.render("login", { error: "Invalid credentials. Access denied." }); 
    // Render login with error for failed login attempts
  }
});

router.get("/home", checkAuthenticated, (req, res) => {
  res.render("home");
});

router.get("/about", checkAuthenticated, (req, res) => {
  res.render("about");
});

router.get("/logout", logout);
module.exports = router;
