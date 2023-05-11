const { Router } = require("express");
const getTickets = require("../Controllers/Tickets/GetTickets");
const createTickets = require("../Controllers/Tickets/CreateTickets");
const getTicketsById = require("../Controllers/Tickets/GetTicketsById");

const router = Router();

router.get("/", getTickets);
router.get("/ticketsByEvent/:id", getTicketsById);
router.post("/createtickets", createTickets);

module.exports = router;
