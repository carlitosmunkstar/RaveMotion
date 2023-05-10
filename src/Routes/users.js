const { Router } = require("express");
const singUp = require("../Controllers/Users/SingUp");
const postUser = require("../Controllers/Users/createUser");
const putUsers = require("../Controllers/Users/PutUsers");

const router = Router();

router.get("/Loging", singUp);
router.post("/singUp", postUser);
router.put("/edit", putUsers);

module.exports = router;
