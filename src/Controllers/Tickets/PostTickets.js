const {TicketsVendidos}=require('../../db');

const PostTickets=async(req,res)=>{
    const {tickets}=req.body;
    try {
        const createdTickets = await TicketsVendidos.bulkCreate(tickets);
        res.status(200).json(createdTickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

module.exports=PostTickets;