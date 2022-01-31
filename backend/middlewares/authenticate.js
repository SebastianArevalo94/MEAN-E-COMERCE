var jwt = require("jwt-simple");
var moment = require("moment");

exports.auth = function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "No Headers Error" });
  }

  let token = req.headers.authorization.replace(/['"]+/g, "");
  let segment = token.split(".");

  if (segment.length != 3) {
    return res.status(403).send({ message: "Invalid Token" });
  } else {
    try {
        var payload = jwt.decode(token,'secretKey');
        if(payload.exp<=moment().unix()){
            return res.status(403).send({ message: "Token Expirado" }); 
        }
    } catch (error) {
      return res.status(403).send({ message: "Invalid Token" });
    }
  }
  req.user = payload;
  next();
};
