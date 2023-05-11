const {TicketsSold, Ticket}=require('../../db')

const getUserTicketsByTanda=async(req,res)=>{
    const{ticketId}=req.params;
    try {
        const birdTickets=await TicketsSold.findAll({
            where:{ticketId:ticketId},
            include:[Ticket]
        })
        if(birdTickets){
            res.status(200).json(birdTickets);
        }else{
            res.status(400).json('No se encontraron tickets vendidos para esta tanda')
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

module.exports=getUserTicketsByTanda;