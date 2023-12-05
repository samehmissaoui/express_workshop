const fakeUser = {
  email: "sameh@gmail.com",
  password: "123456",
};
const authenticateUser = (req, res, next) => {
  const { email, password } = req.body;
  if (email === fakeUser.email && password === fakeUser.password) {
    req.session.authenticated = true; // Using session for authentication
    next();
  } else {
    res.status(401).send("Invalid credentials. Access denied.");
  }
};

const checkAuthenticated = (req, res, next) => {
  if (req.session.authenticated) {
    next();
  } else {
    res.redirect("/");
  }
};
const logout = (req, res) => {
  req.session.authenticated = false;
  res.redirect("/");
};

module.exports = { authenticateUser, checkAuthenticated, logout };
