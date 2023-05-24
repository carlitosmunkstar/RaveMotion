const { Router } = require("express");
const singUp1 = require("../Controllers/Users/SingUp1");
const singUp2 = require("../Controllers/Users/SingUp2");
const singUp3 = require("../Controllers/Users/SingUp3");
const singIn = require("../Controllers/Users/SingIn");
const SingInSession = require("../Controllers/Users/SingInSession");
const ResetPassword = require("../Controllers/Users/ResetPassword");
const ConfirmResetPassword = require("../Controllers/Users/ConfirmResetPassword");
const signOut = require("../Controllers/Users/SignOut");
const Logingoogle = require("../Controllers/Users/LoginGoogle")
const router = Router();

router.get("/signout", signOut);
router.post("/signin", singIn);
router.post("/signinsession", SingInSession);
router.post("/resetpassword", ResetPassword);
router.post("/resetpassword/2", ConfirmResetPassword);
router.post("/signup1", singUp1);
router.post("/signup2", singUp2);
router.post("/signup3", singUp3);
router.post("/logingoogle", Logingoogle)

module.exports = router;









