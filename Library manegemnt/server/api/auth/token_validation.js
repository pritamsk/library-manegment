const jwt = require("jsonwebtoken");
module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      // Remove Bearer from string
      token = token.slice(7);
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            success: 0,
            message: "Invalid Token..."
          });
        } else {
          req.decoded = decoded;
          const role  = decoded.result.role;
          if (role === "Librarian"){
            // User has the Librarian role, allow access
            next();
          } else if (role === "Member") {
            // User has the Member role, allow access to member page
            req.userRole = role;
            next();
          } else {
            return res.status(403).json({
              success: 0,
              message: "Access Denied! Unauthorized User"
            });
        }
      }
      });
    } else {
      return res.status(401).json({
        success: 0,
        message: "Access Denied! Unauthorized User"
      });
    }
  }
};
