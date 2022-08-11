import Mongo from "../../services/mongo.js";

class SessionsMongo extends Mongo {
  constructor() {
    super("sessions", {});
  }
}

export default SessionsMongo;
