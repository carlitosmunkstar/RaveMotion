const { Router } = require("express");
const singUp = require("../Controllers/SingUp");

const router=Router();

router.get("/singUp", singUp);

module.exports=router;