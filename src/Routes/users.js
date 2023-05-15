const { Router } = require("express");
const singUp1 = require("../Controllers/Users/SingUp1");
const singUp2 = require("../Controllers/Users/SingUp2");
const singUp3 = require("../Controllers/Users/SingUp3");
const singIn = require("../Controllers/Users/SingIn");
const  ResetPassword  = require("../Controllers/Users/ResetPassword");
const ConfirmResetPassword= require("../Controllers/Users/ConfirmResetPassword")
const signOut= require("../Controllers/Users/SignOut")
const router = Router();

router.post("/logout",signOut);
router.post("/login", singIn);
router.post("/singUp1", singUp1);
router.post("/singUp2", singUp2);
router.post("/singUp3", singUp3);
router.post("/resetpassword",ResetPassword)
router.post("/resetpassword/:resetPasswordToken",ConfirmResetPassword)

module.exports = router;
