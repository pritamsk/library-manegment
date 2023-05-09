const pool = require("../config/database");

module.exports = {
    addBook: (data,callback) =>{
        pool.query(
            `insert into books (title, author) values (?,?)`,
            [
                data.title,
                data.author,
            ],
            (error,results) =>{
                if(error){
                    return callback(error);

                }
                return callback(null, results);
            }
        );
    },

    editBookDetail: (data,callback) =>{
        pool.query(
            `UPDATE books
            SET title = ?, author = ?, status = ?
            WHERE book_id = ?;`,
            [
                data.title,
                data.author,
                data.status,
                data.book_id,
            ],
            (error,results) =>{
                if(error){
                    return callback(error);

                }
                return callback(null, results);
            }
        );
    },
    deleteBook: (data,callback) =>{
        console.log(data)
        pool.query(
            `DELETE FROM books WHERE book_id= ?`,
            [data.book_id],
            (error,results) =>{
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    addMember: (data, callBack) => {
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
      updateMember: (data,callback) =>{
        pool.query(
            `UPDATE user
            SET username = ?, password = ?, role = ?
            WHERE user_id = ?;`,
            [
                data.username,
                data.password,
                data.role,
                data.user_id,
            ],
            (error,results) =>{
                if(error){
                    return callback(error);

                }
                return callback(null, results);
            }
        );
    },
    deleteMember: (data,callback) =>{
        pool.query(
            `DELETE FROM user WHERE user_id= ?`,
            [data.user_id],
            (error,results) =>{
                if(error){
                    return callback(error);

                }
                return callback(null, results);
            }
        );
    },
};