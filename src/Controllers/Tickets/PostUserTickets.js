const {TicketsVendidos}=require('../../db');

const PostTickets=async(req,res)=>{
    const {tickets}=req.body;
    try {
        const createdTickets = await TicketsVendidos.bulkCreate(tickets);
        if(createdTickets){
            res.status(200).json(createdTickets);
        }else{
            res.status(400).json("Error al comprar los tickets")
        }
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

module.exports=PostTickets;