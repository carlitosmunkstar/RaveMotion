const {Router} = require('express');
const getTickets = require('../Controllers/Tickets/GetTickets');
const createTickets = require('../Controllers/Tickets/CreateTickets');
const getTicketsById = require('../Controllers/Tickets/GetTicketsById');
const PutTickets =require('../Controllers/Tickets/PutTickets');
const setTicketsStock = require('../Controllers/Tickets/setTicketsStock');
const subStrackSells = require('../Controllers/Tickets/subtractSetSells');
const getTicketsSells = require('../Controllers/Tickets/getSellsTickets');
const deleteTicket = require('../Controllers/Tickets/DeleteTicket');
/* eslint-disable-next-line*/
const router = Router();

router.get('/', getTickets);
router.get('/sellstickets/:userId', getTicketsSells);
router.get('/ticketsByEvent/:eventId', getTicketsById);
router.post('/createtickets', createTickets);
router.put('/updatetickets/:ticketId', PutTickets);
router.delete('/ticketdelete/:id', deleteTicket)
// control de Stock
router.put('/setsumstock', setTicketsStock);
router.put('/substracksells/:ticketId', subStrackSells);


module.exports = router;
