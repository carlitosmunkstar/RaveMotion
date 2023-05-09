const { Router } = require("express");
const singUp = require("../Controllers/Users/SingUp");
const postUser = require("../Controllers/Users/createUser");
const putUsers = require("../Controllers/Users/PutUsers");
const  {resetPassword}  = require("../Controllers/Users/ResetPassword");
const {sendRecoveryCode}= require("../Controllers/Users/ResetPassword")
const router = Router();
router.post("/singUpp", postUser);
router.get("/singUp", singUp);
router.put("/:email", putUsers);
router.post("/sendRecoveryCode", sendRecoveryCode);
router.post("/reset-password", resetPassword);
module.exports = router;