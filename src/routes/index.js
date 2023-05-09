const { Router } = require("express");
const events=require('./events')
const users=require('./users')
const router = Router();
const tickets = require("./tickets");

router.use("/events", events);
router.use("/users", users);
router.use("/tickets", tickets);

module.exports = router;
