const { Router } = require("express");
const getEvents = require("../Controllers/GetEvents");
const createEvents = require("../Controllers/createEvents");
const getEventById = require("../Controllers/GetEventById");
const router = Router();

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/eventcreate", createEvents);

module.exports = router;
