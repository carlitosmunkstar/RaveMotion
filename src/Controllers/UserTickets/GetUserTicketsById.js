const {TicketsSold, Ticket, Event}=require('../../db');

const getTicketsById=async(req,res)=>{
    const {id}=req.params;
    try {
        const ticket=await TicketsSold.findByPk(id,
            {include:[
                {model:Ticket,
                attributes:['name','accessType']
                },
                {model:Event,
                attributes:['name']
                }
            ]});

        if(ticket){
            res.status(200).json(ticket)
        }else{
            res.status(400).json('No se encontro un ticket')
        }
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports=getTicketsById;