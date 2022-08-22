
class AuthController {
  
  async registerController(req, res) {
    res.send(`Welcome ${req.body.username}`)
  }

  async failRegisterController(req, res) {
    res.json({message: 'Fail to register'})
  }

  async loginController(req, res) {
    const user = req.user
    res.json({message: `Welcome ${user.username}`, info: user})
  }

  async failLoginController(req, res) {
    res.json({message: 'Invalid credentials'})
  }

  async logoutController(req, res) {
    const user = req.user
    req.logout(function(err) {
      if (err) { return next(err); }
      res.send(`See you soon, ${user.username}`)
    })
    
  }
  
}

const authController = new AuthController();
export default authController;
