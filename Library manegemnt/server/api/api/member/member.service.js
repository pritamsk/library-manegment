const pool = require("../config/database");

module.exports = {
    viewBooks: (data,callback) =>{
        pool.query(
            `select * from books`,
            [],
            (error,results) =>{
                if(error){
                    return callback(error);

                }
                return callback(null, results);
            }
        );
    },
    borroweBooks: (data,callback) =>{
        pool.query(
            `INSERT INTO borrowed_books (user_id, book_id, borrowed_date)
            VALUES (?,?,?);
            UPDATE books
            SET status = 'BORROWED'
            WHERE book_id = ?;
            `,
            [
                data.user_id,
                data.book_id,
                data.borrowed_date,
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
    returnBooks: (data,callback) =>{
        pool.query(
            `UPDATE books
            SET status = 'AVAILABLE'
            WHERE book_id = ?;

            UPDATE borrowed_books
            SET returned_date = ?
            WHERE user_id = ? AND book_id = ?;
            `,
            [data.book_id,data.return_date,data.user_id,data.book_id],
            (error,results) =>{
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    viewBorrowedBooks: (data,callback) =>{
        pool.query(
            `SELECT borrowed_id, books.book_id, title, author
            FROM borrowed_books
            INNER JOIN books ON borrowed_books.book_id = books.book_id
            WHERE user_id = ?;
            `,
            [data.user_id],
            (error,results) =>{
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
}