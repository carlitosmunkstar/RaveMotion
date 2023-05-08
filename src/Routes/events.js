const { Router } = require("express");
const getEvents = require("../Controllers/GetEvents");
const createEvents = require("../Controllers/createEvents");
const getEventById = require("../Controllers/GetEventById");
const deleteEvents = require("../Controllers/DeleteEvents");
const router = Router();

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/eventcreate", createEvents);

router.delete("/eventsdelete/:id", deleteEvents);

module.exports = router;
