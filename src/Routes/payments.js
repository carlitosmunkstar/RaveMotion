const {Router}=require('express');
const createPayment = require('../MercadoPago/MercadoPago');
const notifications = require('../MercadoPago/Notifications');
/* eslint-disable-next-line*/
const router=Router();

router.post('/', createPayment);
router.post('/notifications', notifications);


module.exports=router;
