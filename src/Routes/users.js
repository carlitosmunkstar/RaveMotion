const { Router } = require("express");
const singUp = require("../Controllers/SingUp");
const postUser = require("../Controllers/createUser")

const router=Router();

router.get("/singUp", singUp);
router.post("/singUp", postUser)

module.exports=router;