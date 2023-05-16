const { Router } = require("express");
const getTickets = require("../Controllers/Tickets/GetTickets");
const createTickets = require("../Controllers/Tickets/CreateTickets");
const getTicketsById = require("../Controllers/Tickets/GetTicketsById");
const PutTickets =require("../Controllers/Tickets/PutTickets");
 
const router = Router();

router.get("/", getTickets);
router.get("/ticketsByEvent/:eventId", getTicketsById);
router.post("/createtickets", createTickets);
router.put("/updatetickets/:ticketId", PutTickets);

module.exports = router;
