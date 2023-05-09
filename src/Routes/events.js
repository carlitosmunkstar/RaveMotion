const { Router } = require("express");
const getEvents = require("../Controllers/Events/GetEvents");
const getEventByName= require("../Controllers/Events/GetEventByName")
const createEvents = require("../Controllers/Events/createEvents");
const getEventById = require("../Controllers/Events/GetEventById");
const deleteEvents = require("../Controllers/Events/DeleteEvents");
const putEvents = require("../Controllers/Events/PutEvents");

const router = Router();


router.get("/", getEvents);
router.get("/name", getEventByName);
router.get("/:id", getEventById);
router.post("/eventcreate", createEvents);
router.put("/:id", putEvents);
router.delete("/eventsdelete/:id", deleteEvents);

module.exports = router;
