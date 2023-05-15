const { Router } = require("express");
const singUp1 = require("../Controllers/Users/SingUp1");
const singUp2 = require("../Controllers/Users/SingUp2");
const singUp3 = require("../Controllers/Users/SingUp3");
const singIn = require("../Controllers/Users/SingIn");
const ResetPassword = require("../Controllers/Users/ResetPassword");
const ConfirmResetPassword = require("../Controllers/Users/ConfirmResetPassword");
const signOut = require("../Controllers/Users/SignOut");
const router = Router();

router.get("/signout", signOut);
router.post("/signin", singIn);
router.get("/resetpassword", ResetPassword);
router.get("/resetpassword/:resetPasswordToken", ConfirmResetPassword);
router.post("/signup1", singUp1);
router.post("/signup2", singUp2);
router.post("/signup3", singUp3);

module.exports = router;
