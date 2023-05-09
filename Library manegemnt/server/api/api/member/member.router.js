const { checkToken } = require("../auth/token_validation");
const {viewBooks,borroweBooks,returnBooks,viewBorrowedBooks} = require("./member.controller");
const router = require("express").Router();

router.get("/viewbooks",checkToken,viewBooks);
router.post("/borrowebook",checkToken,borroweBooks);
router.post("/returnbook",checkToken,returnBooks);
router.get("/borrowedbooks",checkToken,viewBorrowedBooks);
module.exports = router;