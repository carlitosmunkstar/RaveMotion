const { Router } = require("express");
const events=require('./events')
const users=require('./users')
const tickets=require('./tickets')
const router = Router();

router.use("/events", events);
router.use("/users", users);
router.use("/tickets", tickets)

module.exports = router;
