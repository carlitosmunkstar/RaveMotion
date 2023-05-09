const { Router } = require("express");
const PostUserTickets = require("../Controllers/Tickets/PostUserTickets");
const getUserTickets = require("../Controllers/Tickets/GetUserTickets");
const getTickets = require("../Controllers/Tickets/GetTickets");
const createTickets = require("../Controllers/Tickets/CreateTickets");
const router = Router();


router.get("/", getTickets);
router.get("/userTickets", getUserTickets)
router.post("/newUserTickets", PostUserTickets)
router.post("/createtickets", createTickets);

module.exports = router;
