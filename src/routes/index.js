const { Router } = require("express");
const events=require('./events')
const users=require('./users')
const router = Router();

router.use("/events", events);
router.use("/users", users);

module.exports = router;
