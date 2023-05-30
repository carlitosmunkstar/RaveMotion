const {Event,TicketsSold}=require('../../db')
const {Op}=require('sequelize')

const rateEvent = async(req,res) => {
    const {userId,id,rating} = req.body;

    try {
        const isBuyer = await TicketsSold.findAll({
            where:{
                [Op.and]: [
                    { userId: userId },
                    { eventId: id }
                  ]
            }
        });
        if(isBuyer.length){
            const rate=await Event.findByPk(id);
            rate.rating=rate.rating+rating;
            rate.critics++;
            await rate.save();
            res.status(200).json(rate);
        }else{
            res.status(400).json('El usuario no compro entradas para este evento')
        }
    } catch (error) {
        console.error("Caught an error:", error);  // This will log the full error, not just the message
        res.status(500).json({error: error.message})
    }
}

module.exports=rateEvent;
