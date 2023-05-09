const pool = require("../config/database");

module.exports={
createUser: (data, callBack) => {
  pool.query(
    `insert into user (username,password,role) values(?,?,?)`,
    [data.username, data.password,data.role],
    (error, results) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
  );
},
};
