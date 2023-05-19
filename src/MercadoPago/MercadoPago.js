const mercadopago=require('mercadopago')
const axios=require('axios')
const { MP_TOKEN } = process.env;

mercadopago.configure({access_token:MP_TOKEN})

const createPayment=async (req,res)=>{

    const {tickets, name, price}=req.body;
console.log(tickets);
    let preference={
        items:[
            {
                title:name,
                unit_price: price,
                quantity:1
            }
        ],
        back_urls:{
            success: 'http://localhost:3001/userTickets/newUserTickets',
			failure: "",
        }
    };

    try {
        const paymentPreference = await mercadopago.preferences.create(preference);
        //await axios.post(preference.back_urls.success, tickets);
        res.status(200).json({ MPlink: paymentPreference.body.init_point });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports=createPayment