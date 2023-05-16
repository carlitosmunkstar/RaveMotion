const { Router } = require("express");
const PostUserTickets = require("../Controllers/UserTickets/PostUserTickets");
const getUserTicketsByUserID = require("../Controllers/UserTickets/GetUserTicketsByUserId");
const getUserTicketsByEvent = require("../Controllers/UserTickets/GetUserTicketsByEvent");
const getUserTicketsByTanda = require("../Controllers/UserTickets/GetUserTicketsByTanda");
const getUserTicketsByID = require("../Controllers/UserTickets/GetUserTicketsById");
const router=Router();

router.get("/eventUserTickets/:eventId", getUserTicketsByEvent);
router.get("/ticketsInfo/:id", getUserTicketsByID)
router.get("/ticketsByUser/:userId", getUserTicketsByUserID);
router.get("/ticketsTanda/:ticketId", getUserTicketsByTanda);
router.post("/newUserTickets", PostUserTickets);

module.exports=router;