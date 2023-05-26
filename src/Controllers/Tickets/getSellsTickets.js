const {Ticket,Event}=require('../../db')

const getTicketsSells = async (req, res) => {
    const {userId} = req.params;
    const allTicketsEvents = []
    const allSells=[]
    const totalAmountPerBatch=[]
    const totalSells = []
    const totalAmount = []
    const allSellsLastDate=[]
    try {
        const events = await Event.findAll({
            where: {userId: userId},
        });
        await Promise.all(events.map( async e => {
        let tickets = await Ticket.findAll({where: { eventId:e.dataValues.id}});
        tickets.forEach((t) => {
            allTicketsEvents.push(t.dataValues);
            allSells.push({[e.name+": "+t.dataValues.name]:t.dataValues.sells})
            totalSells.push(t.dataValues.sells)
            totalAmountPerBatch.push({[e.name+": "+t.dataValues.name]:t.dataValues.sells * t.dataValues.price})
            totalAmount.push(t.dataValues.sells * t.dataValues.price)
          });
        }))
        const totalSellsRedu =await totalSells.reduce((acc, valor) => acc + valor, 0);
        const totalAmountRedu =await totalAmount.reduce((acc, valor) => acc + valor, 0);
      res.status(200).json({alltickets: allTicketsEvents, allSells: allSells, totalSells: totalSellsRedu, totalAmountPerBatch:totalAmountPerBatch, totalAmount:totalAmountRedu});
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  };
  
  module.exports = getTicketsSells;