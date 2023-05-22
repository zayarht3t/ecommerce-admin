import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import {buffer} from 'micro'

const stripe = require('stripe')(process.env.STRIPE_SK);
const endpointSecret = "whsec_85a9430e8f4544448f8794ceb1a7a041b282a9dc1cc8d12f1f1080dc999f0399";

export default async function handler(req,res){
    await mongooseConnect();
    const sig = req.headers['stripe-signature'];

    let event;
  
    try {
      event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const data = event.data.object;
        const orderId = data.metadata.orderId;
        const paid = data.payment_status === 'paid';
        if (orderId && paid) {
            await Order.findByIdAndUpdate(orderId,{
                paid: true
            })
        }
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).send('ok');
}

export const config = {
    api: {
        bodyParser: false
    }
}