const { Router } = require("express");
const getEvents = require("../Controllers/GetEvents");
const getEventByName= require("../Controllers/GetEventByName")
const createEvents = require("../Controllers/createEvents");
const putEvents= require("../Controllers/PutEvents")
const router = Router();

router.get("/", getEvents);
router.get("/name", getEventByName);
router.post("/eventcreate", createEvents);
router.put("/:id", putEvents);

module.exports = router;
