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
        auto_return: 'approved',
        //notification_url:'http://localhost:3001/payments/notifications',
    };

    try {
        const paymentPreference = await mercadopago.preferences.create(preference);
        res.status(200).json({ MPlink: paymentPreference.body.init_point });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports=createPayment