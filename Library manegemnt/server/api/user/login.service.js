const pool = require("../config/database");

module.exports = {
  getUserByUserName: (username, callBack) => {
    pool.query(
      `select * from user where username = ?`,
      [username],
      (error, results) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
