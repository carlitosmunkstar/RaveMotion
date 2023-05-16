const {Event, Ticket}=require('../../db.js')

const getEvents=async(req,res)=>{
    try {
        const events=await Event.findAll({where:{status:true}})
        res.status(200).json(events)
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

module.exports=getEvents;