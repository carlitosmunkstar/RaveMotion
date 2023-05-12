const { Router } = require("express");
const singUp = require("../Controllers/Users/SingUp");
const singIn = require("../Controllers/Users/SingIn");
const  ResetPassword  = require("../Controllers/Users/ResetPassword");
const ConfirmResetPassword= require("../Controllers/Users/ConfirmResetPassword")
const signOut= require("../Controllers/Users/SignOut")
const router = Router();

router.post("/logout",signOut);
router.post("/login", singIn);
router.post("/singUp", singUp);
router.post("/resetpassword",ResetPassword)
router.post("/resetpassword/:resetPasswordToken",ConfirmResetPassword)

module.exports = router;
