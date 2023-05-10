const { Router } = require("express");
const PostUserTickets = require("../Controllers/UserTickets/PostUserTickets");
const getUserTickets = require("../Controllers/UserTickets/GetUserTickets");
const getTickets = require("../Controllers/Tickets/GetTickets");
const createTickets = require("../Controllers/Tickets/CreateTickets");
const getTicketsById = require("../Controllers/Tickets/GetTicketsById");
const getUserTicketsByID = require("../Controllers/UserTickets/GetUserTicketsById");
const router = Router();

router.get("/", getTickets);
router.get("/ticketsByEvent/:id", getTicketsById);
router.get("/ticketsByUser/:id", getUserTicketsByID);
router.get("/userTickets", getUserTickets);
router.post("/newUserTickets", PostUserTickets);
router.post("/createtickets", createTickets);

module.exports = router;
