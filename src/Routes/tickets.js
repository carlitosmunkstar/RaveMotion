const { Router } = require("express");
const getTickets = require("../Controllers/Tickets/GetTickets");
const createTickets = require("../Controllers/Tickets/CreateTickets");

const router = Router();

router.get("/", getTickets);
router.post("/createtickets", createTickets);

module.exports = router;
