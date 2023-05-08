const { Router } = require('express')
const eventsRouter=require('./events')
const router=Router();

router.use("/events", eventsRouter)


module.exports=router;