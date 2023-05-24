const {ToPayMP}=require('../db')
const mercadopago=require('mercadopago')
const { MP_TOKEN } = process.env;

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
            success: 'http://localhost:5173/',
			failure: "http://localhost:5173/",
        },
        //auto_return: 'approved',
        binary_mode: true,
        notification_url:'https://8d38-190-190-121-52.sa.ngrok.io/payments/notifications',
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