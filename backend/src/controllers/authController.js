class AuthController {
  async registerController(req, res) {
    res.send(`Welcome ${req.body.username}`);
  }

  async failRegisterController(req, res) {
    res.json({ message: "Fail to register" });
  }

  async loginController(req, res) {
    res.json({ message: `Welcome ${req.user.username}`, info: req.user });
  }

  async failLoginController(req, res) {
    res.json({ message: "Invalid credentials" });
  }

  async logoutController(req, res) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.send(`See you soon, ${req.user.username}`);
    });
  }
}

const authController = new AuthController();
export default authController;
