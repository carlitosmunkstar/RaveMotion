const { Router } = require('express');
const getEvents = require('../Controllers/GetEvents');

const router=Router();

router.get('/', getEvents)

module.exports=router;