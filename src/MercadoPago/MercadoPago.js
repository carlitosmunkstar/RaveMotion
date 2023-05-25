require('dotenv').config();
const {ToPayMP}=require('../db')
const mercadopago=require('mercadopago')
const { MP_TOKEN } = process.env;
const BACKEND_URL = process.env.BACKEND_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;


mercadopago.configure({access_token:MP_TOKEN})

const createPayment=async (req,res)=>{

    const {tickets, name, price}=req.body;
    let preference={
        items:[
            {
                title:name,
                unit_price: price,
                quantity:1
            }
        ],
        back_urls:{
            success: `http://localhost:5173/tickets`,// va a los tickes del usuario
			failure: `${FRONTEND_URL}`,// aca deberia ir el home 
        },
        //auto_return: 'approved',
        binary_mode: true,
        notification_url:`${BACKEND_URL}/payments/notifications`,
    };

    try {
        const paymentPreference = await mercadopago.preferences.create(preference);
        const [newEntry, created]=await ToPayMP.findOrCreate({
            where:{id:paymentPreference.body.id},
            defaults:{
                id:paymentPreference.body.id,
                tickets:tickets
            }
        })
        if(created){
            return res.status(200).json({ preference_id: paymentPreference.body.id, new:newEntry, url:paymentPreference.body });
        }
        res.status(400).json('Error al subir la compra')
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports=createPayment