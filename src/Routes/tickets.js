const {Router} = require('express');
const getTickets = require('../Controllers/Tickets/GetTickets');
const createTickets = require('../Controllers/Tickets/CreateTickets');
const getTicketsById = require('../Controllers/Tickets/GetTicketsById');
const PutTickets =require('../Controllers/Tickets/PutTickets');
const setTicketsStock = require('../Controllers/Tickets/setTicketsStock');
const subStrackSells = require('../Controllers/Tickets/subtractSetSells');
/* eslint-disable-next-line*/
const router = Router();

router.get('/', getTickets);
router.get('/ticketsByEvent/:eventId', getTicketsById);
router.post('/createtickets', createTickets);
router.put('/updatetickets/:ticketId', PutTickets);

// control de Stock
router.put('/setsumstock/:ticketId', setTicketsStock);
router.put('/substracksells/:ticketId', subStrackSells);


module.exports = router;
