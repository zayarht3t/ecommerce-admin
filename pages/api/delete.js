import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handler(req, res){
    const {method} = req;
    await isAdminRequest(req,res);
    const {id} = req.body;
    await mongooseConnect();
    if(method === 'POST'){
        await Product.deleteOne({_id: id})
        res.status(200).json('success');
    }
}