const { Router } = require("express");
const singUp = require("../Controllers/Users/SingUp");
const postUser = require("../Controllers/Users/createUser");
const putUsers = require("../Controllers/Users/PutUsers");

const router = Router();

router.get("/singUp", singUp);
router.post("/singUp", postUser);
router.put("/:email", putUsers);
module.exports = router;
