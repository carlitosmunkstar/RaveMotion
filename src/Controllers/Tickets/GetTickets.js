
const {TicketsVendidos}=require('../../db');

const getTickets=async(req,res)=>{
    try {
        const tickets=await TicketsVendidos.findAll();
        res.status(200).json(tickets)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports=getTickets;

const { Tickets } = require("../../db");

const getTickets = async (req, res) => {
  try {
    const tickets = await Tickets.findAll();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTickets;

