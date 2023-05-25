require('dotenv').config();
const {ToPayMP}=require('../db')
const axios=require('axios')
const mercadopago=require('mercadopago')
const BACKEND_URL = process.env.BACKEND_URL;

const notifications=async(req,res)=>{
    try {
        if(req.query.topic==='merchant_order'){
            const mpResponse= await mercadopago.merchant_orders.findById(req.query.id)
            const {preference_id, order_status}=mpResponse.response
            console.log(order_status)
            console.log(mpResponse.response)
            if(order_status==='paid'){
                const response=await ToPayMP.findByPk(preference_id);
                const {tickets, send}=response.dataValues
                if(!send){
                    await axios.post(`${BACKEND_URL}/userTickets/newUserTickets`, {tickets:tickets})
                    await response.update({send:true})
                }
            }
        }
        res.status(200).send('OK') 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports=notifications;
