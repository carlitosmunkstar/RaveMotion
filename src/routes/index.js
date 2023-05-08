const { Router } = require("express");
const router = Router();
const events=require('./events');
const users=require('./users')

router.use("/events", events);
router.use("/users", users);

module.exports = router;
