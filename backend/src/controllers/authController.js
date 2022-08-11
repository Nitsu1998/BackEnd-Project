
class AuthController {
  async registerController(req, res) {
    req.session.user = req.body.user
    res.send(`Bienvenido ${req.body.user}`)
  }

  async logoutController(req, res) {
    const user = req.session.user
    req.session.destroy((err)=>{
        if(!err){
            return res.send(`See you soon, ${user}`)
        }
        res.status(500).json({error: err})
    })
  }
  
}

const authController = new AuthController();
export default authController;
