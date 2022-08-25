import { fork } from "child_process";

class RandomNumbersController {
  getRandomNumbers(req, res) {
    try {
      const forked = fork("./src/helpers/child.js");
      const cant = req.query.cant ? parseInt(req.query.cant) : 100000000;
      forked.on("message", (msg) => {
        if(msg === "done"){
          forked.send(cant);
        }else {
          return res.json(msg);
        }
      })
    } catch (err) {
      console.log(err);
    }
  }
}

const randomNumbersController = new RandomNumbersController();
export default randomNumbersController;
