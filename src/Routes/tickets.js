const { Router } = require("express");
const PostTickets = require("../Controllers/Tickets/PostTickets");
const getTickets = require("../Controllers/Tickets/GetTickets");

const router=Router();

router.get("/", getTickets)
router.post("/newTickets", PostTickets)

module.exports=router;