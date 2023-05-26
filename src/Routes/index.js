const {Router} = require('express');
const events=require('./events');
const users=require('./users');
const tickets=require('./tickets');
const userTickets=require('./userTickets');
const payments=require('./payments');
/* eslint-disable-next-line*/
const router = Router();


router.use('/events', events);
router.use('/users', users);
router.use('/tickets', tickets);
router.use('/userTickets', userTickets);
router.use('/payments', payments);



module.exports = router;
