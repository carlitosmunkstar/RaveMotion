const {Op} = require('sequelize');
const {Event} = require('../../db.js');
const moment = require('moment');

/* eslint-disable max-len */
const getEventByFilter = async (req, res)=>{
  const producer = req.query.producer;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  const validationDate = moment(startDate, 'YYYY-MM-DD');
  const StartDateCurrent = validationDate.isSameOrAfter(validationDate, 'day');

  let filter = {};
  try {
    if (StartDateCurrent) {
      if (producer && startDate && endDate) {
        filter = {
          [Op.and]: [
            {date: {[Op.gte]: moment(startDate, 'YYYY-MM-DD').toDate()}},
            {date: {[Op.lte]: moment(endDate, 'YYYY-MM-DD').add(1, 'days').toDate()}},
          ],
          producer: producer,
        };
      } else if (!producer && startDate && !endDate) {
        filter = {
          [Op.and]: [
            {date: {[Op.gte]: moment(startDate, 'YYYY-MM-DD').toDate()}},
          ],
        };
      } else if (producer && startDate && !endDate) {
        filter = {
          [Op.and]: [
            {date: {[Op.gte]: moment(startDate, 'YYYY-MM-DD').toDate()}},
          ],
          producer: producer,
        };
      } else if (producer) {
        filter = {
          producer: producer,
        };
      } else if (startDate && endDate) {
        filter = {
          [Op.and]: [
            {date: {[Op.gte]: moment(startDate, 'YYYY-MM-DD').toDate()}},
            {date: {[Op.lte]: moment(endDate, 'YYYY-MM-DD').add(1, 'days').toDate()}},
          ],
        };
      }
    } else {
      res.status(500).json({error: 'La fecha ingresada debe ser actual o futura'});
    }

    const FilterEvents = await Event.findAll({
      where: filter,
    });

    res.status(200).json(FilterEvents);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports =getEventByFilter;
