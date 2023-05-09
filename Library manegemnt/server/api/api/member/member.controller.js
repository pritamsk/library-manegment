const {viewBooks,borroweBooks,returnBooks,viewBorrowedBooks} = require("./member.service")
module.exports = {
viewBooks:(req,res) =>{
    const body = req.body;
    viewBooks(body,(err,results) =>{
        if(err){
            console.log(err);
            return res.status(500).json({
                success: 0,
                message:"Unable to get books"
            });
        }
        console.log(results);
        return res.status(200).json(results)
    });
},
borroweBooks:(req,res) =>{
    const body = req.body;
    borroweBooks(body,(err,results) =>{
        if(err){
            console.log(err);
            return res.status(500).json({
                success: 0,
                message:"Unable to borrowe book"
            });
        }
        console.log(results);
        return res.status(200).json(results)
    });
},
returnBooks:(req,res) =>{
    const body = req.body;
    returnBooks(body,(err,results) =>{
        if(err){
            console.log(err);
            return res.status(500).json({
                success: 0,
                message:"Unable to return book"
            });
        }
        console.log(results);
        return res.status(200).json(results)
    });
},
viewBorrowedBooks:(req,res) =>{
    const body = req.body;
    viewBorrowedBooks(body,(err,results) =>{
        if(err){
            console.log(err);
            return res.status(500).json({
                success: 0,
                message:"Unable to show borrowed books"
            });
        }
        console.log(results);
        return res.status(200).json(results)
    });
}
}