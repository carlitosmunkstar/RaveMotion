const { Router } = require("express");
const getEvents = require("../Controllers/GetEvents");
const createEvents = require("../Controllers/createEvents");
const router = Router();

router.get("/", getEvents);
router.post("/eventcreate", createEvents);

module.exports = router;
