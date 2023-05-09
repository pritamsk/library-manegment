const { createUser } = require("./signup.service");
const { hashSync, genSaltSync,} = require("bcrypt");


module.exports = {
    signup: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        createUser(body, (err, results) => {
          if (err) {
            return res.status(500).json({
              success: 0,
              message: "Error in Signup"
            });
          }
          return res.status(200).json({
            success: 1,
            data: results
          });
        });
      },
};