const {User, Event}=require('../../db')

const getUserEvents=async(req,res)=>{
    const {userId}=req.params;
    try {
        const response=[]
        const userEvents=await Event.findAll({
            where:{userId:userId}
        })
        userEvents.map(event=>{
            response.push(event.id)
        })
        if(userEvents&&response.length){
            res.status(200).json(response)
        }else{
            res.status(400).json('El usuario no tiene eventos')
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

module.exports=getUserEvents