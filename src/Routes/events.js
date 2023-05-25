const {Router} = require('express');
const getEvents = require('../Controllers/Events/GetEvents');
const getEventByName= require('../Controllers/Events/GetEventByName');
const createEvents = require('../Controllers/Events/createEvents');
const getEventById = require('../Controllers/Events/GetEventById');
const deleteEvents = require('../Controllers/Events/DeleteEvents');
const putEvents = require('../Controllers/Events/PutEvents');

const getEventByFilter = require('../Controllers/Events/getEventsFilters');
const getDeletedEvents = require('../Controllers/Events/GetDeleted');
const getEventByUserId =require('../Controllers/Events/getEventsByUserId');
/* eslint-disable-next-line*/
const router = Router();


router.get('/', getEvents);
router.get('/name', getEventByName);
router.get('/deleted', getDeletedEvents);
router.get('/filter', getEventByFilter); // FUTUROS FILTROS COMBINADOS
router.get('/:id', getEventById);
router.post('/eventcreate', createEvents);
router.put('/:id', putEvents);
router.delete('/eventsdelete/:id', deleteEvents);
router.get('/eventbyuserid/:userId', getEventByUserId);

module.exports = router;
