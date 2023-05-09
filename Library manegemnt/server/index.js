require ("dotenv").config();
const express = require('express');
const app = express();
const loginRouter = require("./api/user/login.router");
const signupRouter = require("./api/user/signup.router");
const librarianRouter = require("./api/librarian/librarian.router");
const memberRouter = require("./api/member/member.router");
const authMiddleware = require("./api/auth/token_validation");
const cors = require("cors");

// app.use(cors({ credentials: true, origin: "http://localhost:4000", }));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,PATCH');
      return res.sendStatus(200);
    }
    next();
  });

// app.use((req,res,next) =>{
//     res.header('Access-Control-Allow-Origin','*')
// });

app.use(express.json());

app.use("/login",loginRouter)
app.use("/signup",signupRouter);
app.use("/librarian",authMiddleware.checkToken,librarianRouter);
app.use("/member",authMiddleware.checkToken,memberRouter);

app.listen(process.env.APP_PORT,()=>{
    console.log("Server running on port:", process.env.APP_PORT);
})