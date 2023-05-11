const { Router } = require("express");
const PostUserTickets = require("../Controllers/UserTickets/PostUserTickets");
const getUserTicketsByID = require("../Controllers/UserTickets/GetUserTicketsById");
const getUserTicketsByEvent = require("../Controllers/UserTickets/GetUserTicketsByEvent");
const getUserTicketsByTanda = require("../Controllers/UserTickets/GetUserTicketsByTanda");
const router=Router();

router.get("/eventUserTickets/:eventId", getUserTicketsByEvent);
router.get("/ticketsByUser/:userId", getUserTicketsByID);
router.get("/ticketsTanda/:ticketId", getUserTicketsByTanda)
router.post("/newUserTickets", PostUserTickets);

module.exports=router;