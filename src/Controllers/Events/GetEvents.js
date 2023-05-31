const {Event}=require('../../db.js');
const {Op}=require('sequelize');
const getEvents=async (req, res)=>{
  try {
    const events=await Event.findAll( {where: {
      [Op.and]:[
          {current: true},
          {status:true}
      ]}});
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

module.exports=getEvents;

