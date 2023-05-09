const router = require("express").Router();
const {signup} = require("./signup.controller");

router.post("/",signup);

module.exports = router;