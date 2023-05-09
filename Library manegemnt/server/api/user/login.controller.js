const { getUserByUserName } = require("./login.service");
const { compareSync } = require("bcrypt");

const { sign } = require("jsonwebtoken");

module.exports = {
  login: (req, res) => {
    const body = req.body;
    getUserByUserName(body.username, (err, results) => {
      // console.log(results);
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Internal server error",
        });
      }
      if (!results) {
        return res.status(404).json({
          success: 0,
          message: "Invalid username or password",
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, "8237266", {
          expiresIn: "1h",
        });
        return res.status(200).json({
          message: "Login successful",
          token: jsontoken,
          role: results.role,
          userid:results.user_id
        });
      } else {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }
    });
  },
};
