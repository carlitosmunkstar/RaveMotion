const { Op } = require('sequelize');
const { Event } = require('../../db.js');
const moment = require('moment');

const getEventByFilter = async (req, res)=>{

const producer = req.query.producer;
const startDate = req.query.startDate;
const endDate = req.query.endDate;

let filter = {};
try{
 if (producer && startDate && endDate) {
     filter = {
      status:true,
      [Op.and]: [
            { date: { [Op.gte]: moment(startDate, 'YYYY-MM-DD').toDate() } },
            { date: { [Op.lte]: moment(endDate, 'YYYY-MM-DD').toDate() } }
          ],
      producer: producer
  };
} else if (producer) {
  filter = {
    status:true,
    producer: producer
  };
} else if (startDate && endDate) {
  filter = {
    status:true,
    [Op.and]: [
        { date: { [Op.gte]: moment(startDate, 'YYYY-MM-DD').toDate() } },
        { date: { [Op.lte]: moment(endDate, 'YYYY-MM-DD').toDate() } }
      ]
  };
}

const FilterEvents = await Event.findAll({
  where: filter
})
res.status(200).json(FilterEvents);
}
catch(error){
    res.status(500).json(error);
}}

module.exports =getEventByFilter;