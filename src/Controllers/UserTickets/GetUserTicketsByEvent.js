const {TicketsSold, Event}=require('../../db');

const getTickets=async(req,res)=>{
    const {eventId}=req.params
    try {
        const tickets=await TicketsSold.findAll({
            include: [
                {model: Event,
                where: { id: eventId }}
            ]});
        if(tickets){
            res.status(200).json(tickets)    
        }else{
            res.status(400).json("No se encontraron tickets vendidos para ese evento")
        }
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports=getTickets;