const { checkToken } = require("../auth/token_validation");
const {addBook,editBookDetail,deleteBook,addMember,updateMember,deleteMember} = require("./librarian.controller");
const router = require("express").Router();

router.post("/addbook",checkToken,addBook);//creates a new book record in the book table.
router.patch("/editbook",checkToken,editBookDetail);//edit book detail of book.
router.delete("/deletebook",checkToken,deleteBook);//delete book data for books table.
router.post("/addmember",checkToken,addMember);//add new member in to the system.
router.patch("/updatemember",checkToken,updateMember);//edit member details.
router.delete("/deletemember",checkToken,deleteMember);//delete member data from system.

module.exports = router;