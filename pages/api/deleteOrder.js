import { mongooseConnect } from "@/lib/mongoose"
import { Order } from "@/models/Order";

export default async function handler(req,res){
    await mongooseConnect();
    await Order.findByIdAndDelete(req.body.id);
    res.status(200).json('ok');
}