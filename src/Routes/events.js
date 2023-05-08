const { Router } = require("express");
const getEvents = require("../Controllers/GetEvents");
const getEventByName= require("../Controllers/GetEventByName")
const createEvents = require("../Controllers/createEvents");
const getEventById = require("../Controllers/GetEventById");
const putEvents = require("../Controllers/PutEvents")
const router = Router();

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/eventcreate", createEvents);
router.put("/:id", putEvents);
router.get("/name", getEventByName);

module.exports = router;
