const {Event}=require('../../db');

const getEventById=async(req,res)=>{
    const {id}=req.params;
    try {
        const event=await Event.findByPk(id);
        if(event){
            res.status(200).json(event)
        }else{
            res.status(400).json("Evento no encontrado");
        }
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

module.exports=getEventById;