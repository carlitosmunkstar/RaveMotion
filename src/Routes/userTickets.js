const {Router} = require('express');
const PostUserTickets = require('../Controllers/UserTickets/PostUserTickets');
/* eslint-disable-next-line*/
const getUserTicketsByUserID = require('../Controllers/UserTickets/GetUserTicketsByUserId');
/* eslint-disable-next-line*/
const getUserTicketsByEvent = require('../Controllers/UserTickets/GetUserTicketsByEvent');
/* eslint-disable-next-line*/
const getUserTicketsByTanda = require('../Controllers/UserTickets/GetUserTicketsByTanda');
/* eslint-disable-next-line*/
const getUserTicketsByID = require('../Controllers/UserTickets/GetUserTicketsById');
/* eslint-disable-next-line*/
const createPayment = require('../MercadoPago/MercadoPago');
/* eslint-disable-next-line*/
const notifications = require('../MercadoPago/Notifications');
/* eslint-disable-next-line*/
const router=Router();

router.get('/eventUserTickets/:eventId', getUserTicketsByEvent);
router.get('/ticketsInfo/:id', getUserTicketsByID);
router.get('/ticketsByUser/:userId', getUserTicketsByUserID);
router.get('/ticketsTanda/:ticketId', getUserTicketsByTanda);
router.post('/newUserTickets', PostUserTickets);


module.exports=router;
