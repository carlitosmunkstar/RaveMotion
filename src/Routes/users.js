const { Router } = require("express");
const singUp = require("../Controllers/Users/SingUp");
const singIn = require("../Controllers/Users/SingIn");
const ResetPassword = require("../Controllers/Users/ResetPassword");
const ConfirmResetPassword = require("../Controllers/Users/ConfirmResetPassword");
const signOut = require("../Controllers/Users/SignOut");
const router = Router();

router.get("/logout", signOut);
router.get("/login", singIn);
router.get("/resetpassword", ResetPassword);
router.get("/resetpassword/:resetPasswordToken", ConfirmResetPassword);
router.post("/signup", singUp);

module.exports = router;
