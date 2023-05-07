const { Router } = require("express");
const router = Router();
const createEvents = require("../Controllers/createEvents");

router.post("/events", createEvents);

module.exports = router;
