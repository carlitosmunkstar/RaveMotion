const { Router } = require("express");
const events=require('./events')
const users=require('./users')
const tickets=require('./tickets')
const userTickets=require('./userTickets')
const router = Router();


router.use("/events", events);
router.use("/users", users);
router.use("/tickets", tickets);
router.use("/userTickets", userTickets)


module.exports = router;
