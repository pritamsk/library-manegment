const {addBook,editBookDetail,deleteBook,addMember,updateMember,deleteMember} = require("./librarian.service");
const { hashSync, genSaltSync,} = require("bcrypt");

module.exports={
    addBook:(req,res) =>{
        const body = req.body;
        addBook(body,(err,results) =>{
            console.log(results);
            if(err){
                console.log(err);
                return res.status(500).json({
                    message:"Error in adding Book"
                });
            }
            return res.status(200).json(results)
        });
    },
    editBookDetail:(req,res) =>{
        const body = req.body;
        editBookDetail(body,(err,results) =>{
            if(err){
                console.log(err);
                return false;
            }
            if(!results){
                return res.json({
                    message:"Failed to update Book data"
                });
            }
            return res.status(200).json(results)
        });
},
deleteBook:(req,res) =>{
    const body = req.body;
    console.log("Body",body)
    deleteBook(body,(err,results) =>{
        if(err){
            console.log(err);
            return res.status(500).json({
                message:"Error in deleteing Book"
            });
        }
        return res.status(200).json(results)
    });
},

addMember: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    addMember(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({

          message: "Error in adding user"
        });
      }
      return res.status(200).json(results);
    });
  },
  updateMember: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateMember(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Error in updating user"
        });
      }
      return res.status(200).json(results);
    });
  },
  deleteMember:(req,res) =>{
    const body = req.body;
    deleteMember(body,(err,results) =>{
        if(err){
            console.log(err);
            return res.status(500).json({
                message:"Error in deleteing user"
            });
        }
        return res.status(200).json(results)
    });
},
}